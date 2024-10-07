import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './StartupList.module.css';
import useFetchStartups from '../../hooks/useFetchStartups';
import Pagination from '../Common/Pagination';
import noImageIcon from '../../assets/no-image.png';
import { formatAmount } from '../../utils/formatAmount';
import StartupHeader from './StartupHeader';

const MAX_ITEMS = 10;

export default function StartupList() {
  const maxItems = MAX_ITEMS;
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOption, setSortOption] = useState('total_investment_desc');  // 기본 정렬 옵션 추가
  const [currentPage, setCurrentPage] = useState(1);            // currentPage 상태를 여기서 관리

  const {
    startups,
    error,
    setOrder,
    setSort,
    totalCount,
    setSearch,
    showLoading,
  } = useFetchStartups(currentPage, maxItems, 'total_investment', 'desc');  // currentPage를 인자로 전달

  const totalPages = Math.ceil(totalCount / maxItems);

  useEffect(() => {
    setSearch(searchKeyword);
  }, [searchKeyword, setSearch]);

  useEffect(() => {
    // 마지막 언더바를 기준으로 나누기 위해 정규식 사용
    const [order, sort] = sortOption.split(/_(?=[^_]*$)/);
    setOrder(order);
    setSort(sort);
  }, [sortOption, setOrder, setSort]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (error) {
    return <div className='error-message'>{error}</div>;
  }

  return (
    <>
      <StartupHeader setSearchKeyword={setSearchKeyword} setSortOption={setSortOption} />

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '6.8rem' }}>순위</th>
              <th style={{ width: '21.3rem' }}>기업명</th>
              <th style={{ width: '30.4rem' }}>기업소개</th>
              <th style={{ width: '15.4rem' }}>카테고리</th>
              <th style={{ width: '15.4rem' }}>누적 투자 금액</th>
              <th style={{ width: '15.4rem' }}>매출액</th>
              <th style={{ width: '15.4rem' }}>고용 인원</th>
            </tr>
          </thead>
          <tbody>
            {showLoading ? (
              <tr>
                <td colSpan='7'>목록을 불러오는 중입니다....</td>
              </tr>
            ) : (
              startups.map((startup) => (
                <tr key={startup.id}>
                  <td>{startup.rank}위</td>
                  <td style={{ textAlign: 'left' }}>
                    <Link to={`/${startup.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        <img
                          src={startup.image || noImageIcon}
                          alt={`${startup.name} 로고`}
                          style={{
                            width: '3.2rem',
                            height: '3.2rem',
                            marginRight: '0.8rem',
                            verticalAlign: 'middle',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            objectFit: 'cover',
                          }}
                        />
                      </span>
                      <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                        {startup.name}
                      </span>
                    </Link>
                  </td>
                  <td className={styles.description}>{startup.description}</td>
                  <td>{startup.categoryName}</td>
                  <td style={{ textAlign: 'center' }}>{formatAmount(startup.simInvest)} 원</td>
                  <td style={{ textAlign: 'center' }}>{formatAmount(startup.revenue)} 원</td>
                  <td style={{ textAlign: 'right', paddingRight: '5rem' }}>
                    {formatAmount(startup.employees)} 명
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  );
}
