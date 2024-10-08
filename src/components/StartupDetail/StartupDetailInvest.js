import styles from './StartupDetailInvest.module.css';
import kebab from '../../assets/ic_kebab.svg';
import { useState } from 'react';
import Pagination from '../Common/Pagination';
import { formatAmount } from '../../utils/formatAmount';
import InvestmentCreate from '../Investment/InvestmentCreate';
import InvestmentPatch from '../Investment/InvestmentPatch';
import InvestmentDelete from '../Investment/InvestmentDelete';
import InvestmentComplete from '../Investment/InvestmentComplete';

const MAX_ITEMS = 5;

export default function StartupDetailInvest({ startup, mockInvestor }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!startup) {
    return <div>Loading...</div>;
  }

  if (!mockInvestor.list) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>View My Startup에서 받은 투자</h1>
        <button onClick={handleOpenModal}>기업 투자하기</button>
      </div>
      <div>
        <h1>총 {formatAmount(startup.simInvest)}원</h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '8.4rem' }}>투자자 이름</th>
              <th style={{ width: '8.4rem' }}>순위</th>
              <th style={{ width: '8.4rem' }}>투자 금액</th>
              <th style={{ width: '8.84rem' }}>투자 코멘트</th>
              <th style={{ width: '6.4rem' }}> </th>
            </tr>
          </thead>
          <tbody>
            {mockInvestor.list.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.rank}위</td>
                <td>{formatAmount(item.investAmount)} 원</td>
                <td style={{ textAlign: 'left' }}>{item.comment}</td>
                <td>
                  <img src={kebab} alt="더보기 아이콘" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <InvestmentCreate onClose={handleCloseModal} />}
    </div>
  );
}
