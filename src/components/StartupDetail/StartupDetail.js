import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getStartup } from '../../api/StartupDetailService';
import StartupDetailHeader from './StartupDetailHeader';
import StartupDetailInfo from './StartupDetailInfo';
import StartupDetailInvest from './StartupDetailInvest';

export default function StartupDetail() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [mockInvestor, setMockInvestor] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const data = await getStartup(id);
        setStartup(data.startup);
        setMockInvestor(data.mockInvestors);
      } catch (err) {
        setError('기업 정보를 불러오는 데 실패했습니다.');
      }
    };
    fetchStartup();
  }, [id]);
  return (
    <>
      {error && <div style={{ color: 'var(--error-color)' }}>{error}</div>}
      <StartupDetailHeader startup={startup} />
      <StartupDetailInfo startup={startup} />
      <StartupDetailInvest startup={startup} mockInvestor={mockInvestor} />
    </>
  );
}
