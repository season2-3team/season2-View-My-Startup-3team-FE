import styles from './InvestmentList.module.css';
import noImageIcon from '../../assets/no-image.png';
import { getInvestmentList } from '../../api/InvestmentService';
import useQuery from '../../hooks/useQuery';
import { useState, useCallback } from 'react';
import { useSort } from '../../contexts/SortContext';
import { formatAmount } from '../../utils/formatAmount';
import Pagination from '../Common/Pagination';

export default function InvestmentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { sortOption } = useSort();

  // 데이터 불러오기
  const fetchInvestmentList = useCallback(async () => {
    return await getInvestmentList({
      page: currentPage,
      limit: pageSize,
      order: sortOption
    });
  }, [currentPage, pageSize, sortOption]);

  const [data, isLoading, error] = useQuery(fetchInvestmentList, [currentPage]);

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

    return sortValues[sortOption] || 0;
  });

  // 페이지네이션
  const totalPages = Math.ceil(data.totalCount / pageSize);

  return (
    <div>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>순위</th>
              <th>기업 명</th>
              <th style={{ width: '30.4rem' }}>기업 소개</th>
              <th>카테고리</th>
              <th>View My Startup 누적 투자 금액</th>
              <th>실제 누적 투자 금액</th>
            </tr>
          </thead>
          <tbody>
            {sortedList.map((item, index) => (
              <tr key={item.id || index}>
                <td>{(currentPage - 1) * pageSize + index + 1}위</td>
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
                <td>{item.startup.category.category}</td>
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
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
