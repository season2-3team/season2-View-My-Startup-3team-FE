import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Main.css';
import StartupPage from './pages/StartupPage';
import MyComparisonPage from './pages/MyComparisonPage';
import ComparisonPage from './pages/ComparisonPage';
import InvestmentPage from './pages/InvestmentPage';
import App from './components/App.js';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<StartupPage />} />
          <Route path="/my-comparison" element={<MyComparisonPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/investment" element={<InvestmentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
