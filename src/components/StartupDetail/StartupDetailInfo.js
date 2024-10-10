import styles from "./StartupDetailInfo.module.css";
import { formatAmount } from "../../utils/formatAmount";

export default function StartupDetailInfo({ startup }) {
  if (!startup) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className={styles.body}>
        <div className={styles.info}>
          누적 투자 금액 <h1>{formatAmount(startup.simInvest)} 원</h1>
        </div>
        <div className={styles.info}>
          매출액 <h1>{formatAmount(startup.revenue)} 원</h1>
        </div>
        <div className={styles.info}>
          고용 인원 <h1>{startup.employees}명</h1>
        </div>
      </div>
      <div className={styles.description}>
        <h1>기업 소개</h1> {startup.description}
      </div>
    </>
  );
}
