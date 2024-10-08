import { useEffect, useState } from 'react';

const COMPARISON_API_BASE_URL = 'http://localhost:3000/api/comparisons';

export default function useFetchCompareResult() {
  const [allResults, setAllRestults] = useState([]);

  const fetchResult = async (orderBy = 'asc', sortBy = 'actualInvest') => {
    const sessionId = sessionStorage.getItem('sessionId');
    try {
      const response = await fetch(
        `${COMPARISON_API_BASE_URL}/compare?sessionId=${sessionId}&orderBy=${orderBy}&sortBy=${sortBy}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setAllRestults(data);
    } catch (err) {
      console.error('Failed to fetch startups', err);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  return {
    allResults,
    fetchResult
  };
}
