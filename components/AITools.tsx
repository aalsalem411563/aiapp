import React from 'react';
import type { Page } from '../types';
import { PAGES } from '../constants';

interface AITool {
  name: string;
  description: string;
  url: string;
  icon: string;
}

const tools: AITool[] = [
  {
    name: 'Gamma AI',
    description: 'إنشاء عروض تقديمية ومستندات احترافية باستخدام الذكاء الاصطناعي.',
    url: 'https://gamma.app/',
    icon: 'プレゼンテーション',
  },
  {
    name: 'ChatGPT',
    description: 'نموذج لغوي قوي للمحادثة، كتابة النصوص، والإجابة على الأسئلة.',
    url: 'https://chat.openai.com/',
    icon: 'チャット',
  },
  {
    name: 'Canva',
    description: 'تصميم جرافيك، عروض تقديمية، ومحتوى بصري بسهولة مع أدوات AI.',
    url: 'https://www.canva.com/',
    icon: 'デザイン',
  },
  {
    name: 'Tome',
    description: 'أداة سرد قصص وعروض تقديمية مدعومة بالذكاء الاصطناعي التوليدي.',
    url: 'https://tome.app/',
    icon: 'ストーリー',
  },
];

const AITools: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-100 mb-8">أدوات الذكاء الاصطناعي للمعلم</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <a
              key={index}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-purple-500/20 border border-slate-700 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="text-4xl">{tool.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-pink-400 transition-colors">{tool.name}</h3>
                  <p className="text-slate-400">{tool.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-12">
            <button onClick={() => setCurrentPage(PAGES.HOME)} className="bg-slate-700 text-slate-300 font-bold py-2 px-6 rounded-md hover:bg-slate-600 transition duration-300">
                العودة إلى الرئيسية
            </button>
        </div>
      </div>
    </div>
  );
};

export default AITools;
