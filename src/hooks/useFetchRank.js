import { useCallback, useEffect, useState } from 'react';

const API_HOST = "http://localhost:3000";  //https://season2-view-my-startup-3team-be.onrender.com
const RANK_API_BASE_URL =
  `${API_HOST}/api/startups`;

export default function useFetchRank(
  startupId,
  initialOrder = 'revenue',
  initialSort = 'desc'
) {
  const [rankData, setRankData] = useState([]);
  const [orderBy, setOrderBy] = useState(initialOrder);
  const [sortBy, setSortBy] = useState(initialSort);

  const fetchStartupRank = useCallback(async () => {
    try {
      const response = await fetch(
        `${RANK_API_BASE_URL}/${startupId}/rank?order=${orderBy}&sort=${sortBy}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setRankData(data.list);
      setOrderBy(orderBy);
      setSortBy(sortBy);
    } catch (err) {
      console.error('Failed to fetch startups', err);
    }
  }, [startupId, orderBy, sortBy]);

  useEffect(() => {
    if (startupId) {
      fetchStartupRank();
    }
  }, [startupId, orderBy, sortBy, fetchStartupRank]);

  return {
    rankData,
    setRankData,
    fetchStartupRank,
    setOrderBy,
    setSortBy,
    orderBy,
    sortBy
  };
}
