import styles from './InvestmentList.module.css';

export default function InvestmentList() {
  // 임시 하드코딩 데이터
  const data = [
    {
      rank: 1,
      name: '기업 이름',
      description: '기업 소개',
      category: '카테고리',
      simInvest: 1000,
      actualInvest: 1000
    },
    {
      rank: 2,
      name: '기업 이름',
      description: '기업 소개',
      category: '카테고리',
      simInvest: 1000,
      actualInvest: 1000
    },
    {
      rank: 3,
      name: '기업 이름',
      description: '기업 소개',
      category: '카테고리',
      simInvest: 1000,
      actualInvest: 1000
    },
    {
      rank: 4,
      name: '기업 이름',
      description: '기업 소개',
      category: '카테고리',
      simInvest: 1000,
      actualInvest: 1000
    },
    {
      rank: 5,
      name: '기업 이름',
      description: '기업 소개',
      category: '카테고리',
      simInvest: 1000,
      actualInvest: 1000
    },
    {
      rank: 6,
      name: '기업 이름',
      description: '기업 소개',
      category: '카테고리',
      simInvest: 1000,
      actualInvest: 1000
    },
    {
      rank: 7,
      name: '기업 이름',
      description: '기업 소개',
      category: '카테고리',
      simInvest: 1000,
      actualInvest: 1000
    },
    {
      rank: 8,
      name: '기업 이름',
      description: '기업 소개',
      category: '카테고리',
      simInvest: 1000,
      actualInvest: 1000
    },
    {
      rank: 9,
      name: '기업 이름',
      description: '기업 소개',
      category: '카테고리',
      simInvest: 1000,
      actualInvest: 1000
    },
    {
      rank: 10,
      name: '기업 이름',
      description: '기업 소개',
      category: '카테고리',
      simInvest: 1000,
      actualInvest: 1000
    }
  ];
  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th>순위</th>
            <th>기업 명</th>
            <th>기업 소개</th>
            <th>카테고리</th>
            <th>View My Startup 투자 금액</th>
            <th>실제 누적 투자 금액</th>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {data.map((item) => (
            <tr key={item.id} className={styles.tr}>
              <td>{item.rank}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.simInvest}</td>
              <td>{item.actualInvest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
