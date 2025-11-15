import React from 'react';
import { TEMPLATES } from '../constants';
import type { TemplateType } from '../types';

interface TemplateSelectionProps {
    onSelectTemplate: (template: TemplateType) => void;
    onBack: () => void;
}

const TemplateCard: React.FC<{ title: string, onClick: () => void }> = ({ title, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-purple-500/20 border border-slate-700 hover:border-purple-500 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center group"
        >
            <h3 className="text-xl font-bold text-slate-100 group-hover:text-pink-400 transition-colors">{title}</h3>
        </div>
    );
};


const TemplateSelection: React.FC<TemplateSelectionProps> = ({ onSelectTemplate, onBack }) => {
    return (
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-100 mb-2">اختر قالب التقرير</h2>
            <p className="text-slate-400 mb-8">ابدأ باختيار التصميم الذي يناسب محتوى تقريرك.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.values(TEMPLATES).map(template => (
                    <TemplateCard 
                        key={template.id}
                        title={template.name}
                        onClick={() => onSelectTemplate(template.id as TemplateType)}
                    />
                ))}
            </div>
             <div className="text-center mt-12">
                <button onClick={onBack} className="bg-slate-700 text-slate-300 font-bold py-2 px-6 rounded-md hover:bg-slate-600 transition duration-300">
                    العودة إلى الرئيسية
                </button>
            </div>
        </div>
    );
};

export default TemplateSelection;