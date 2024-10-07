import styles from './MySelection.module.css';
import btn_plus from '../../assets/btn_plus.svg';
import MySelectionModal from './MySelectionModal';
import CompareSelectionModal from './CompareSelectionModal';
import { useState } from 'react';
import ic_minus from '../../assets/ic_minus.svg';
import ic_restart from '../../assets/ic_restart.svg';

export default function MySelection() {
  const [isModal, setIsModal] = useState(false);
  const [isComparedModal, setIsComparedModal] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState([]);
  const [compareSelectedStartups, setCompareSelectedStartups] = useState([]);

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

  const handleOpenComparedModal = () => {
    setIsComparedModal(true);
  };

  const handleCloseComparedModal = () => {
    setIsComparedModal(false);
  };

  const handleCompareSelectStartups = (startups) => {
    setCompareSelectedStartups(startups);
  };

  const handleCompareRemoveStartups = (id) => {
    setCompareSelectedStartups((prev) =>
      prev.filter((startup) => startup.id !== id)
    );
  };

  const handleResetAll = () => {
    setSelectedStartup([]);
    setCompareSelectedStartups([]);
  };

  return (
    <div className={styles.section}>
      <div className={styles.myNav}>
        <h2 className={styles.headerTxt}>나의 기업을 선택해주세요!</h2>
        {compareSelectedStartups.length > 0 && (
          <button className={styles.resetBtn} onClick={handleResetAll}>
            <img
              src={ic_restart}
              alt="loadingLogo"
              className={styles.loadingLogo}
            />
            전체 초기화
          </button>
        )}
      </div>
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
      {selectedStartup.length > 0 && (
        <div className={styles.section}>
          <div className={styles.selectedHeader}>
            <span>어떤 기업이 궁금하세요?</span>
            <button
              onClick={handleOpenComparedModal}
              className={`${styles.addBtn} ${
                compareSelectedStartups.length >= 5
                  ? styles.disabledBtn
                  : styles.addBtn
              }`}
              disabled={compareSelectedStartups.length >= 5}
            >
              기업 추가하기
            </button>
          </div>
          <div className={styles.borderBox}>
            <div className={styles.innerBox}>
              {compareSelectedStartups.length === 0 ? (
                <h2>
                  아직 추가된 기업이 없어요. <br /> 버튼을 눌러 기업을
                  추가해보세요!
                </h2>
              ) : (
                compareSelectedStartups.map((startup) => (
                  <div
                    key={startup.id}
                    className={styles.compareSelectedStartup}
                  >
                    <img
                      src={ic_minus}
                      alt="minus"
                      className={styles.minusIcon}
                      onClick={() => handleCompareRemoveStartups(startup.id)}
                    />
                    <img
                      src={startup.image}
                      alt="startupImg"
                      className={styles.startupImg}
                    />
                    <span className={styles.startupName}>{startup.name}</span>
                    <span className={styles.startupCategory}>
                      {startup.category.category}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      <button
        className={`${styles.compareBtn} ${
          selectedStartup.length > 0 && compareSelectedStartups.length > 0
            ? styles.compareActiveBtn
            : styles.compareBtn
        }`}
        disabled={
          selectedStartup.length > 0 && compareSelectedStartups > 0
            ? 'false'
            : 'true'
        }
      >
        기업 비교하기
      </button>
      {isModal && (
        <MySelectionModal
          onClose={handleCloseModal}
          onSelectStartup={handleSelectStartup}
        />
      )}
      {isComparedModal && (
        <CompareSelectionModal
          onSelectStartup={handleCompareSelectStartups}
          onClose={handleCloseComparedModal}
        />
      )}
    </div>
  );
}
