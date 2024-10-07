import { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

const COMPARISON_API_BASE_URL = 'http://localhost:3000/api/comparisons';

// const sessionId = localStorage.getItem('sessionId') || uuidv4();
// localStorage.setItem('sessionId', sessionId);

export default function useFetchRecent() {
  const [recentStartups, setRecentStartups] = useState([]);

  const fetchRecentStartups = async () => {
    try {
      const response = await fetch(
        `${COMPARISON_API_BASE_URL}/recent-selection`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.list);
      setRecentStartups(data.list);
    } catch (err) {
      console.error('Failed to fetch startups', err);
    }
  };

  useEffect(() => {
    fetchRecentStartups();
  }, []);

  return {
    recentStartups
  };
}
