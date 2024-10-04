import SearchInput from '../Common/SearchInput';
import StartupDropdown from './StartupDropdown';
import styles from './StartupHeader.module.css';

export default function StartupHeader({ setSearchKeyword }) {
  return (
    <div className={styles.header}>
      <h1>전체 스타트업 목록</h1>
      <div className={styles.searchDropdownContainer}>
        <SearchInput setSearchKeyword={setSearchKeyword}/>
        <StartupDropdown />
      </div>
    </div>
  )
}