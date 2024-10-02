import StartupDropdown from './StartupDropdown';
import styles from './StartupHeader.module.css';

export default function StartupHeader() {
  return (
    <div className={styles.header}>
      <h1>전체 스타트업 목록</h1>
      <StartupDropdown />
    </div>
  )
}