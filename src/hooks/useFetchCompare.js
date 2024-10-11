import { useEffect, useState } from 'react';

const API_HOST = "http://localhost:3000";  //https://season2-view-my-startup-3team-be.onrender.com
const SELECTION_API_BASE_URL =
  `${API_HOST}/api/selections`;

export default function useFetchCompare(ids) {
  const [updateStartups, setUpdateStartups] = useState(null);
  const [newComparisons, setNewComparisons] = useState(null);

  const fetchComparison = async (ids) => {
    const sessionId = sessionStorage.getItem('sessionId');
    try {
      const response = await fetch(
        `${SELECTION_API_BASE_URL}/comparison-startups`,
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
      setUpdateStartups(data.updateStartups);
      setNewComparisons(data.newComparisons);
    } catch (err) {
      console.error('Failed to fetch startups', err);
    }
  };

  useEffect(() => {
    if (ids) {
      fetchComparison(ids);
    }
  }, [ids]);

  return { updateStartups, newComparisons, fetchComparison };
}
