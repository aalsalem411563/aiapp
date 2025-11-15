import React from 'react';

interface HeaderProps {
    onLogoClick: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm shadow-md shadow-purple-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-4 cursor-pointer"
            onClick={onLogoClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.747h18" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.799 12.522a8.03 8.03 0 01-1.258.974c-1.332.8-3.033 1.156-4.79.917-2.126-.288-3.92-1.42-4.9-3.153a5.836 5.836 0 01-.01-5.526c.98-1.733 2.774-2.865 4.9-3.153 1.757-.239 3.458.117 4.79.917a8.03 8.03 0 011.258.974" />
            </svg>
            <h1 className="text-xl font-bold text-slate-100">تقارير المعلم AI</h1>
          </div>
          <div className="flex items-center">
            <button
              onClick={onLogout}
              className="bg-pink-600 text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-pink-700 transition duration-300"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
