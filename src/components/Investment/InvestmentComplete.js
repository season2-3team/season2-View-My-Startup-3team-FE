import styles from './InvestmentComplete.module.css';
import X from '../../assets/ic_x.svg';
import Modal from '../Common/Modal';

export default function InvestmentComplete() {
  return (
    <Modal>
      <div className={styles.content}>
        <img
          src={X}
          // onClick={onClose}
          style={{ cursor: 'pointer' }}
          alt="close btn"
        />
        <span>투자가 완료되었어요!</span>
        <button className={styles.complete}>확인</button>
      </div>
    </Modal>
  );
}
