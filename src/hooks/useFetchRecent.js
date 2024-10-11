import { useEffect, useState } from 'react';

const API_HOST = "http://localhost:3000";  //https://season2-view-my-startup-3team-be.onrender.com
const COMPARISON_API_BASE_URL =
  `${API_HOST}/api/comparisons`;

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
