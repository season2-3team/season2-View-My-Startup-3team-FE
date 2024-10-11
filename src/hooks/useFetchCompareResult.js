import { useCallback, useEffect, useState } from 'react';

const API_HOST = "http://localhost:3000";  //https://season2-view-my-startup-3team-be.onrender.com
const COMPARISON_API_BASE_URL =
  `${API_HOST}/api/comparisons`;

export default function useFetchCompareResult(
  initialOrder = 'desc',
  initialSort = 'simInvest'
) {
  const [allResults, setAllResults] = useState([]);
  const [order, setOrder] = useState(initialOrder);
  const [sort, setSort] = useState(initialSort);

  const fetchResult = useCallback(
    async (orderBy = order, sortBy = sort) => {
      const sessionId = sessionStorage.getItem('sessionId');
      try {
        const response = await fetch(
          `${COMPARISON_API_BASE_URL}/compare-result?sessionId=${sessionId}&orderBy=${orderBy}&sortBy=${sortBy}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAllResults(data);
        setOrder(orderBy);
        setSort(sortBy);
      } catch (err) {
        console.error('Failed to fetch startups', err);
      }
    },
    [order, sort]
  );

  useEffect(() => {
    fetchResult(order, sort);
  }, [order, sort, fetchResult]);

  return {
    allResults,
    fetchResult,
    order,
    sort,
    setOrder,
    setSort
  };
}
