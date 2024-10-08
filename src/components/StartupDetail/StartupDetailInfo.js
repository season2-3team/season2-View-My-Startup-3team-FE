import styles from './StartupDetailInfo.module.css';
import { formatAmount } from '../../utils/formatAmount';
import useFetchStartups from '../../hooks/useFetchStartups';

export default function StartupDetailInfo({ startup }) {
  if (!startup) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className={styles.body}>
        <div className={styles.info}>
          누적 투자 금액 {formatAmount(startup.simInvest)} 원
        </div>
        <div className={styles.info}>
          매출액 {formatAmount(startup.revenue)}
        </div>
        <div className={styles.info}>고용 인원 {startup.employees}명</div>
      </div>
      <div className={styles.description}>기업 소개 {startup.description}</div>
    </>
  );
}
