import { useEffect, useState } from 'react';

const API_HOST = "http://localhost:3000";  //https://season2-view-my-startup-3team-be.onrender.com
const SELECTION_API_BASE_URL =
  `${API_HOST}/api/selections`;

export default function useFetchMySelection(id) {
  const [updateStartup, setUpdateStartup] = useState(null);
  const [newSelection, setNewSelection] = useState(null);

  const fetchMySelection = async (id) => {
    const sessionId = sessionStorage.getItem('sessionId');
    try {
      const response = await fetch(`${SELECTION_API_BASE_URL}/my-startups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id,
          sessionId: sessionId
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUpdateStartup(data.updateStartup);
      setNewSelection(data.newSelection);
    } catch (err) {
      console.error('Failed to fetch startups', err);
    }
  };

  useEffect(() => {
    if (id) {
      /* //buff */
      //fetchMySelection();
      fetchMySelection(id);
    }
  }, [id]);

  return { updateStartup, newSelection, fetchMySelection };
}
