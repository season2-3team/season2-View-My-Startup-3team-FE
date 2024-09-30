import InvestmentList from '../components/Investment/InvestmentList';
import InvestmentHeader from '../components/Investment/InvestmentHeader';

export default function InvestmentPage() {
  return (
    <div>
      <InvestmentHeader />
      <InvestmentList />
      <div
        style={{
          width: '368px',
          height: '48px',
          margin: '16px auto',
          backgroundColor: 'grey',
          textAlign: 'center'
        }}
      >
        페이지네이션 자리
      </div>
    </div>
  );
}
