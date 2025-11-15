import React from 'react';
import type { Page } from '../types';
import { PAGES } from '../constants';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const HomePageCard = ({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) => (
  <div
    onClick={onClick}
    className="bg-slate-800/50 p-6 rounded-xl shadow-lg hover:shadow-purple-500/20 border border-slate-700 hover:border-purple-500 transition-all duration-300 cursor-pointer flex flex-col items-center text-center group"
  >
    <div className="mb-4 text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{description}</p>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <HomePageCard
          onClick={() => setCurrentPage(PAGES.REPORTS)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          title="إنشاء التقارير"
          description="صمم تقارير احترافية باستخدام قوالب متنوعة وجاهزة."
        />
        <HomePageCard
          onClick={() => setCurrentPage(PAGES.QR_CODE)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /><path d="M3 10h4V6H3v4zm5 0h4V6H8v4zm5 0h4V6h-4v4zM3 15h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4z" /></svg>}
          title="مولد رموز QR"
          description="أنشئ رموز QR بسرعة وسهولة للنصوص والروابط."
        />
        <HomePageCard
          onClick={() => setCurrentPage(PAGES.AI_TOOLS)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M12 21v-1m-6.364-1.636l.707-.707" /></svg>}
          title="أدوات الذكاء الاصطناعي"
          description="اكتشف أفضل أدوات الذكاء الاصطناعي لدعم مهامك التعليمية."
        />
        <HomePageCard
          onClick={() => setCurrentPage(PAGES.AI_CHAT)}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
          title="مساعد AI التعليمي"
          description="تحدث مع Deep Seek للحصول على إجابات واستشارات تعليمية."
        />
      </div>
    </div>
  );
};

export default HomePage;
