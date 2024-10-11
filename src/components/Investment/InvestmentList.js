import styles from './InvestmentList.module.css';
import noImageIcon from '../../assets/no-image.png';
import { getInvestmentList } from '../../api/InvestmentService';
import useQuery from '../../hooks/useQuery';
import { useState, useCallback } from 'react';
import { useSort } from '../../contexts/SortContext';
import { formatAmount } from '../../utils/formatAmount';
import Pagination from '../Common/Pagination';
import { useNavigate } from 'react-router-dom';

export default function InvestmentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { orderBy } = useSort();
  const navigate = useNavigate();

  // 데이터 불러오기
  const fetchInvestmentList = useCallback(() => {
    return getInvestmentList({ page: currentPage, limit: pageSize, orderBy });
  }, [currentPage, pageSize, orderBy]);

  const [data, isLoading, error] = useQuery(fetchInvestmentList, [
    currentPage,
    pageSize,
    orderBy
  ]);

  // 조건부 렌더링
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.list.length === 0)
    return <div className={styles.null}>아직 투자 현황이 없어요.</div>;

  // 데이터 정렬
  const sortedList = data.list.sort((a, b) => {
    const sortValues = {
      sim_invest_asc: a.startup.simInvest - b.startup.simInvest,
      sim_invest_desc: b.startup.simInvest - a.startup.simInvest,
      actual_invest_asc: a.startup.actualInvest - b.startup.actualInvest,
      actual_invest_desc: b.startup.actualInvest - a.startup.actualInvest
    };

    return sortValues[orderBy] || 0;
  });

  // 순위 계산
  let rank = null;
  let previousValue = null;

  const rankedList = sortedList.map((item, index) => {
    const currentValue =
      item.startup[orderBy.includes('sim') ? 'simInvest' : 'actualInvest'];

    if (previousValue === currentValue) {
      return { ...item, rank };
    } else {
      rank = index + 1; // 전체 데이터에 대한 순위
      previousValue = currentValue;
      return { ...item, rank };
    }
  });

  // 페이지네이션
  const totalPages = Math.ceil(data.totalCount / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStartupClick = (item) => {
    navigate(`/startup/${item.startup.id}`);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '6.8rem' }}>순위</th>
              <th style={{ width: '21.3rem' }}>기업 명</th>
              <th style={{ width: '30.4rem' }}>기업 소개</th>
              <th style={{ width: '15.4rem' }}>카테고리</th>
              <th style={{ width: '23.1rem' }}>
                View My Startup
                <br className={styles.br} /> 누적 투자 금액
              </th>
              <th style={{ width: '23rem' }}>실제 누적 투자 금액</th>
            </tr>
          </thead>
          <tbody>
            {rankedList.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleStartupClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <td>{item.rank}위</td>
                <td>
                  <div className={styles.name}>
                    <img
                      src={item.startup.image || noImageIcon}
                      alt={item.startup.name}
                    />
                    {item.startup.name}
                  </div>
                </td>
                <td className={styles.description}>
                  {item.startup.description}
                </td>
                <td>{item.startup.categoryName}</td>
                <td>{formatAmount(item.startup.simInvest)} 원</td>
                <td>{formatAmount(item.startup.actualInvest)} 원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
