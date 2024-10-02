import styles from './InvestmentList.module.css';
import { getInvestmentList } from '../../api/InvestmentService';
import useQuery from '../../hooks/useQuery';
import { useState } from 'react';
import { useSort } from '../../contexts/SortContext';

export default function InvestmentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = useState(10);
  const { sortOption } = useSort();

  // 데이터 불러오기
  const fetchInvestmentList = async () => {
    return await getInvestmentList({
      page: currentPage,
      limit: pageSize,
      order: sortOption
    });
  };

  const [data, isLoading, error] = useQuery(fetchInvestmentList);

  // 조건부 렌더링
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.length === 0) return <div>아직 투자 현황이 없어요.</div>;

  // 데이터 정렬
  const sortedList = data.sort((a, b) => {
    const sortValues = {
      invest_amount_asc: a.investAmount - b.investAmount,
      invest_amount_desc: b.investAmount - a.investAmount,
      actual_invest_asc: a.startup.actualInvest - b.startup.actualInvest,
      actual_invest_desc: b.startup.actualInvest - a.startup.actualInvest
    };

    return sortValues[sortOption] || 0;
  });

  // 페이지네이션
  const totalPages = Math.ceil(sortedList.length / pageSize);

  const currentItems = sortedList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: '6.8rem' }}>순위</th>
            <th style={{ width: '21.3rem' }}>기업 명</th>
            <th style={{ width: '30.4rem' }}>기업 소개</th>
            <th style={{ width: '15.375rem' }}>카테고리</th>
            <th>View My Startup 투자 금액</th>
            <th>실제 누적 투자 금액</th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}위</td>
              <td>
                <div className={styles.name}>
                  {item.startup.image && (
                    <img src={item.startup.image} alt={item.startup.name} />
                  )}
                  {item.startup.name}
                </div>
              </td>
              <td className={styles.description}>{item.startup.description}</td>
              <td>{item.startup.category.category}</td>
              <td>{item.investAmount}</td>
              <td>{item.startup.actualInvest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
