import InvestmentList from '../components/Investment/InvestmentList';
import InvestmentHeader from '../components/Investment/InvestmentHeader';
import { SortProvider } from '../contexts/SortContext';

export default function InvestmentPage() {
  return (
    <div>
      <SortProvider>
        <InvestmentHeader />
        <InvestmentList />
      </SortProvider>
    </div>
  );
}
