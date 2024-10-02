import styles from './MySelection.module.css';
import btn_plus from '../../assets/btn_plus.svg';
import MySelectionModal from './MySelectionModal';

export default function MySelection() {
  return (
    <div className={styles.section}>
      <h2 className={styles.headerTxt}>나의 기업을 선택해주세요!</h2>
      <div className={styles.borderBox}>
        <div className={styles.innerBox}>
          <div>
            <img className={styles.plusBtnImg} src={btn_plus} alt="btn_plus" />
            <h3>기업 추가</h3>
          </div>
        </div>
      </div>
      <button className={styles.compareBtn}>기업 비교하기</button>
    </div>
  );
}
