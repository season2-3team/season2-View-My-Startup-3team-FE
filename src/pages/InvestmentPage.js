import InvestmentList from '../components/Investment/InvestmentList';
import InvestmentHeader from '../components/Investment/InvestmentHeader';
import { SortProvider } from '../contexts/SortContext';

export default function InvestmentPage() {
  return (
    <div>
      <SortProvider>
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
      </SortProvider>
    </div>
  );
}
