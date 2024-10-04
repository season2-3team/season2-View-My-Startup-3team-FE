import styles from './InvestmentHeader.module.css';
import InvestmentDropdown from './InvestmentDropdown';
import { useSort } from '../../contexts/SortContext';

export default function InvestmentHeader() {
  const { setSortOption } = useSort();

  return (
    <div className={styles.header}>
      <h1>투자 현황</h1>
      <InvestmentDropdown setSortOption={setSortOption} />
    </div>
  );
}
