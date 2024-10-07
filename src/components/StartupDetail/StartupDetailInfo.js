import styles from "./StartupDetailInfo.module.css";
import { formatAmount } from "../../utils/formatAmount";
import useFetchStartups from "../../hooks/useFetchStartups";

export default function StartupDetailInfo() {
  const { startups } = useFetchStartups(1, "total_investment", "desc");

  return (
    <>
      <div className={styles.body}>
        <div className={styles.info}>누적 투자 금액 {} 원</div>
        <div className={styles.info}>매출액</div>
        <div className={styles.info}>고용 인원</div>
      </div>{" "}
      <div className={styles.description}>기업 소개</div>
    </>
  );
}
