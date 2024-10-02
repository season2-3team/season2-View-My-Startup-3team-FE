import styles from './MySelectionModal.module.css';
import ic_X from '../../assets/ic_x.svg';
import ic_search from '../../assets/ic_search.svg';
import ic_x_circle_small from '../../assets/ic_x_circle_small.svg';
import useFetchRecent from '../../hooks/useFetchRecent';
import { useState } from 'react';

export default function MySelectionModal({ onClose, onSelectStartup }) {
  const { startups } = useFetchRecent();
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    // 검색기능
  };

  const handelClear = () => {
    setSearchText('');
  };

  const handleSelect = (startup) => {
    onSelectStartup(startup);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <form className={styles.form}>
        <div className={styles.header}>
          <h2>나의 기업 선택하기</h2>
          <img src={ic_X} alt="ic_X" onClick={onClose} />
        </div>
        <label className={styles.search}>
          <input
            type="text"
            value={searchText}
            onChange={handleChange}
            placeholder="검색어를 입력해주세요"
          />
          <div className={styles.searchImgBlock}>
            {searchText && (
              <>
                <img
                  src={ic_x_circle_small}
                  alt="ic_x_circle_small"
                  onClick={handelClear}
                />
                <img src={ic_search} alt="ic_search" onClick={handleSearch} />
              </>
            )}
          </div>
        </label>
        <div>
          <h3 className={styles.title}>최근 선택된 기업 ({startups.length})</h3>
          <ul>
            {startups.map((startup) => (
              <li className={styles.list} key={startup.id}>
                <div className={styles.listStartup}>
                  <img src={startup.image} alt="startupImage" />
                  <span className={styles.name}>{startup.name}</span>
                  <span className={styles.category}>
                    {startup.category.category}
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.selectionBtn}
                  onClick={() => handleSelect(startup)}
                >
                  선택하기
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}
