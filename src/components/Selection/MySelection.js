import styles from './MySelection.module.css';
import btn_plus from '../../assets/btn_plus.svg';
import MySelectionModal from './MySelectionModal';
import { useState } from 'react';

export default function MySelection() {
  const [isModal, setIsModal] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState([]);

  const handleOpenModal = () => {
    setIsModal(true);
  };

  const handleCloseModal = () => {
    setIsModal(false);
  };

  const handleSelectStartup = (startup) => {
    setSelectedStartup((prev) => [...prev, startup]);
  };

  const handleRemoveStartup = (id) => {
    setSelectedStartup((prev) => prev.filter((startup) => startup.id !== id));
  };

  return (
    <div className={styles.section}>
      <h2 className={styles.headerTxt}>나의 기업을 선택해주세요!</h2>
      <div className={styles.borderBox}>
        <div className={styles.innerBox}>
          {selectedStartup.map((startup) => (
            <div key={startup.id} className={styles.selectedStartup}>
              <img
                src={startup.image}
                alt="startupImg"
                className={styles.startupImg}
              />
              <span className={styles.startupName}>{startup.name}</span>
              <span className={styles.startupCategory}>
                {startup.category.category}
              </span>
              <button
                className={styles.removeBtn}
                onClick={() => handleRemoveStartup(startup.id)}
              >
                선택 취소
              </button>
            </div>
          ))}
          {selectedStartup.length === 0 && (
            <div>
              <img
                className={styles.plusBtnImg}
                src={btn_plus}
                alt="Add startup"
                onClick={handleOpenModal}
              />
              <h3>기업 추가</h3>
            </div>
          )}
        </div>
      </div>
      <button className={styles.compareBtn}>기업 비교하기</button>
      {isModal && (
        <MySelectionModal
          onClose={handleCloseModal}
          onSelectStartup={handleSelectStartup}
        />
      )}
    </div>
  );
}
