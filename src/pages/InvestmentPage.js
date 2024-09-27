import '../styles/reset.css';
import '../styles/variables.css';
import InvestmentList from '../components/Investment/InvestmentList';
import InvestmentHeader from '../components/Investment/InvestmentHeader';
import InvestmentListBar from '../components/Investment/InvestmentListBar';

export default function InvestmentPage() {
  return (
    <div>
      <InvestmentHeader />
      <InvestmentListBar />
      <InvestmentList />
      <div
        style={{
          width: '368px',
          height: '48px',
          margin: '10px auto',
          backgroundColor: 'grey',
          textAlign: 'center'
        }}
      >
        페이지네이션 자리
      </div>
    </div>
  );
}
