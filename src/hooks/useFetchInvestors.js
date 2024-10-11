import { useEffect, useState } from 'react';
import { getInvestors } from '../api/StartupDetailService';

const useFetchInvestors = (
  id,
  currentPage,
  maxItems = 5,
  initialOrder = 'invest_amount',
  initialSort = 'desc'
) => {
  const [investors, setInvestors] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(initialOrder);
  const [sort, setSort] = useState(initialSort);
  const [totalCount, setTotalCount] = useState(0);

  const [showLoading, setShowLoading] = useState(false); // 로딩 화면을 표시할지 여부

  const MIN_LOADING_TIME = 1000; // 최소 로딩 시간, 로딩 화면이 짧게 깜빡이는 것을 방지

  useEffect(() => {
    const fetchInvestors = async () => {
      const loadingTimer = setTimeout(() => {
        setShowLoading(true); // 최소 로딩시간이 지나면 로딩 화면 표시
      }, MIN_LOADING_TIME);

      try {
        const investorList = await getInvestors(
          id,
          currentPage,
          maxItems,
          order,
          sort
        );
        setInvestors(investorList.mockInvestors || []);
        setTotalCount(investorList.mockInvestors.totalCount || 0);
      } catch (e) {
        setError('스타트업 정보를 불러오는 데 실패하였습니다');
      } finally {
        clearTimeout(loadingTimer);
        setShowLoading(false);
      }
    };
    fetchInvestors();
  }, [id, currentPage, maxItems]);

  return {
    investors,
    error,
    order,
    setOrder,
    sort,
    setSort,
    totalCount,
    showLoading
  };
};

export default useFetchInvestors;
