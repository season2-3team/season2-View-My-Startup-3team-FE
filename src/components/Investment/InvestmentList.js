import styles from './InvestmentList.module.css';

export default function InvestmentList() {
  return (
    <div className={styles.list}>
      {Array.from({ length: 10 }).map((_, index) => (
        <ul key={index}>
          <li>
            <p>{index + 1}</p>
            <p>기업 {index + 1}</p>
            <p>기업 소개 {index + 1}</p>
            <p>카테고리 {index + 1}</p>
            <p>투자 금액 {index + 1}</p>
            <p>실제 누적 투자 금액 {index + 1}</p>
          </li>
        </ul>
      ))}
    </div>
  );
}
