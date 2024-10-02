import styles from './InvestmentDropdown.module.css';

const InvestmentDropdown = ({ sortOption, setSortOption }) => {
  return (
    <div>
      <select
        className={styles.menu}
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="invest_amount_desc">
          View My Startup 투자 금액 높은 순
        </option>
        <option value="invest_amount_asc">
          View My Startup 투자 금액 낮은 순
        </option>
        <option value="actual_invest_desc">실제 투자 금액 높은 순</option>
        <option value="actual_invest_asc">실제 투자 금액 낮은 순</option>
      </select>
    </div>
  );
};

export default InvestmentDropdown;
