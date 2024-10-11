import { useEffect, useState } from 'react';
const API_HOST = "http://localhost:3000";  //https://season2-view-my-startup-3team-be.onrender.com
const SELECTION_API_BASE_URL =
  `${API_HOST}/api/selections`;

export default function useFetchCompare(ids) {
  const [cancelStartups, setCancelStartups] = useState(null);
  const [beforeComparisons, setBeforeComparisons] = useState(null);

  const fetchCancelComparison = async (ids) => {
    const sessionId = sessionStorage.getItem('sessionId');
    try {
      const response = await fetch(
        `${SELECTION_API_BASE_URL}/cancel-comparison-startups`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ids,
            sessionId: sessionId
          })
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCancelStartups(data.cancelStartups);
      setBeforeComparisons(data.beforeComparisons);
    } catch (err) {
      console.error('Failed to fetch startups', err);
    }
  };

  useEffect(() => {
    if (ids) {
      fetchCancelComparison(ids);
    }
  }, [ids]);

  return { cancelStartups, beforeComparisons, fetchCancelComparison };
}
