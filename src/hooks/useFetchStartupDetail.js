import { useEffect, useState } from 'react';
import { getStartup } from '../api/StartupDetailService';

const useFetchStartup = (id) => {
  const [startup, setStartup] = useState(null);
  const [error, setError] = useState(null);

  const [showLoading, setShowLoading] = useState(false); // 로딩 화면을 표시할지 여부

  const MIN_LOADING_TIME = 1000; // 최소 로딩 시간, 로딩 화면이 짧게 깜빡이는 것을 방지

  useEffect(() => {
    const fetchStartup = async () => {
      const loadingTimer = setTimeout(() => {
        setShowLoading(true); // 최소 로딩시간이 지나면 로딩 화면 표시
      }, MIN_LOADING_TIME);

      try {
        const startupData = await getStartup(id);
        setStartup(startupData || {});
      } catch (e) {
        setError('스타트업 정보를 불러오는 데 실패하였습니다');
      } finally {
        clearTimeout(loadingTimer);
        setShowLoading(false);
      }
    };

    if (id) {
      fetchStartup();
    }
  }, [id]);

  return {
    startup,
    error,
    showLoading
  };
};

export default useFetchStartup;
