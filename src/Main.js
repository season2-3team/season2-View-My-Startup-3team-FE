import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartupPage from './pages/StartupPage';
import StartupDetailPage from './pages/StartupDetailPage.js';
import MyComparisonPage from './pages/MyComparisonPage';
import ComparisonPage from './pages/ComparisonPage';
import InvestmentPage from './pages/InvestmentPage';
import App from './components/App.js';
import NotFoundPage from './pages/NotFoundPage.js';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<StartupPage />} />
          <Route path="/startup/:id" element={<StartupDetailPage />} />
          <Route path="/my-comparison" element={<MyComparisonPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
          <Route path="/investment" element={<InvestmentPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
