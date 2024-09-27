import styles from './InvestmentListBar.module.css';

export default function InvestmentListBar() {
  return (
    <div className={styles.bar}>
      <p>순위</p>
      <p>기업 명</p>
      <p>기업 소개</p>
      <p>카테고리</p>
      <p>View My Startup 투자 금액</p>
      <p>실제 누적 투자 금액</p>
    </div>
  );
}
