import styles from './StartupDetailInfo.module.css';
import { formatAmount } from '../../utils/formatAmount';
import useFetchStartup from '../../hooks/useFetchStartupDetail';
import Warn from '../Warn';
import { useParams } from 'react-router-dom';

export default function StartupDetailInfo() {
  const { id } = useParams();
  const { startup, error, showLoading } = useFetchStartup(id);

  if (error) {
    return <Warn variant="error" title="오류발생" description={error} />;
  }

  if (showLoading) {
    return <div>목록을 불러오는 중입니다....</div>;
  }

  if (!startup) {
    return;
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.info}>
          누적 투자 금액 <h1>{formatAmount(startup.startup.simInvest)} 원</h1>
        </div>
        <div className={styles.info}>
          매출액 <h1>{formatAmount(startup.startup.revenue)} 원</h1>
        </div>
        <div className={styles.info}>
          고용 인원 <h1>{startup.startup.employees}명</h1>
        </div>
      </div>
      <div className={styles.description}>
        <h1>기업 소개</h1> {startup.startup.description}
      </div>
    </>
  );
}
