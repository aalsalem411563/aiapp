import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ReportGenerator from './components/ReportGenerator';
import QRCodeGenerator from './components/QRCodeGenerator';
import AITools from './components/AITools';
import AIChat from './components/AIChat';
import LoginPage from './components/LoginPage';
import { PAGES } from './constants';
import type { Page } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(PAGES.HOME);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage(PAGES.HOME); // Reset to home page on logout
  };

  const renderPage = () => {
    switch (currentPage) {
      case PAGES.HOME:
        return <HomePage setCurrentPage={setCurrentPage} />;
      case PAGES.REPORTS:
        return <ReportGenerator setCurrentPage={setCurrentPage} />;
      case PAGES.QR_CODE:
        return <QRCodeGenerator setCurrentPage={setCurrentPage} />;
      case PAGES.AI_TOOLS:
        return <AITools setCurrentPage={setCurrentPage} />;
      case PAGES.AI_CHAT:
        return <AIChat setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header onLogoClick={() => setCurrentPage(PAGES.HOME)} onLogout={handleLogout} />
      <main className="pt-20">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
