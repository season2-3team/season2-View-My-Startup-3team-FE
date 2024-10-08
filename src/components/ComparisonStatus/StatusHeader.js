import SearchInput from '../Common/SearchInput';
import StartupDropdown from './StartupDropdown';
import styles from './StatusHeader.module.css';

export default function StatusHeader({ setSearchKeyword, setSortOption }) {
  return (
    <div className={styles.header}>
      <h1>비교 현황</h1>
      <div className={styles.searchDropdownContainer}>
        <SearchInput setSearchKeyword={setSearchKeyword} />
        <StartupDropdown setSortOption={setSortOption} />
      </div>
    </div>
  )
}