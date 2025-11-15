import React, { useState, useCallback, useRef } from 'react';
import type { Page, ReportData, TemplateType } from '../types';
import ReportPreview from './ReportPreview';
import TemplateSelection from './TemplateSelection';
import { generateReportContent, generateAnnouncementContent } from '../services/geminiService';
import { TEMPLATES } from '../constants';

interface ReportGeneratorProps {
  setCurrentPage: (page: Page) => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ setCurrentPage }) => {
  const [reportData, setReportData] = useState<ReportData>({
    class: '',
    location: '',
    beneficiaries: '',
    beneficiaryCount: '',
    date: '',
    goals: '',
    description: '',
    evidence: [null, null, null, null, null, null],
    title: '',
    body: '',
    schoolPrincipal: '',
  });
  const [showPreview, setShowPreview] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState<TemplateType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportData(prev => ({ ...prev, [name]: value }));
  };

  const handleFilesUpload = (files: FileList | null) => {
    if (!files) return;

    const currentEvidence = reportData.evidence.filter(Boolean);
    const availableSlots = 6 - currentEvidence.length;

    if (availableSlots <= 0) {
      alert("يمكنك رفع 6 صور كحد أقصى.");
      return;
    }

    const filesToProcess = Array.from(files).slice(0, availableSlots);

    const fileReadPromises = filesToProcess.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target?.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReadPromises).then(newBase64Strings => {
      const newEvidence = [...reportData.evidence];
      let newStringIndex = 0;
      for (let i = 0; i < newEvidence.length; i++) {
        if (newEvidence[i] === null && newStringIndex < newBase64Strings.length) {
          newEvidence[i] = newBase64Strings[newStringIndex];
          newStringIndex++;
        }
      }
      setReportData(prev => ({ ...prev, evidence: newEvidence }));
    }).catch(error => {
      console.error("Error reading files:", error);
      alert("حدث خطأ أثناء قراءة الملفات.");
    });
  };
  
  const handleRemoveEvidence = (indexToRemove: number) => {
    setReportData(prev => {
        const newEvidence = [...prev.evidence];
        newEvidence[indexToRemove] = null;
        return { ...prev, evidence: newEvidence };
    });
  };

  const handleGenerateWithAI = useCallback(async () => {
    setIsGenerating(true);
    try {
      if (activeTemplate === 'ANNOUNCEMENT') {
        if (!reportData.title?.trim()) {
          alert('يرجى إدخال عنوان الخبر أو الإعلان أولاً لتوليد المحتوى.');
          setIsGenerating(false);
          return;
        }
        const prompt = `بناءً على العنوان التالي: "${reportData.title}"، قم بصياغة نص لخبر أو إعلان مدرسي. يجب أن يكون النص جذابًا ومناسبًا للطلاب وأولياء الأمور.`;
        const response = await generateAnnouncementContent(prompt);
        const parsed = JSON.parse(response.text);
        setReportData(prev => ({
          ...prev,
          body: parsed.body || prev.body,
        }));
      } else {
        const prompt = `
          بناءً على التفاصيل التالية، قم بإنشاء محتوى لتقرير نشاط مدرسي باللغة العربية:
          - الصف/المادة: ${reportData.class || 'غير محدد'}
          - مكان التنفيذ: ${reportData.location || 'غير محدد'}
          - المستفيدون: ${reportData.beneficiaries || 'غير محدد'}
          - تاريخ التنفيذ: ${reportData.date || 'غير محدد'}

          مهمتك هي صياغة "وصف" جذاب للنشاط و "أهداف" واضحة ومحددة.
          بالنسبة لـ "الأهداف"، قدمها كنص واحد يحتوي على قائمة نقاط مفصولة بسطر جديد.
        `;
        const response = await generateReportContent(prompt);
        const parsed = JSON.parse(response.text);
        setReportData(prev => ({
          ...prev,
          description: parsed.description || prev.description,
          goals: parsed.goals || prev.goals,
        }));
      }
    } catch (error) {
        console.error('Failed to parse AI response:', error);
        alert('حدث خطأ أثناء توليد المحتوى. يرجى المحاولة مرة أخرى.');
    } finally {
        setIsGenerating(false);
    }
  }, [activeTemplate, reportData.class, reportData.location, reportData.beneficiaries, reportData.date, reportData.title]);


  const renderForm = () => (
    <div className="space-y-6">
      {activeTemplate === 'ANNOUNCEMENT' ? (
        <>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">عنوان الخبر/الإعلان</label>
              <input type="text" name="title" id="title" value={reportData.title} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500" />
            </div>
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-slate-300 mb-1">نص الخبر/الإعلان</label>
              <textarea name="body" id="body" rows={8} value={reportData.body} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500"></textarea>
            </div>
        </>
      ) : (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-slate-300 mb-1">الصف/المادة</label>
            <input type="text" name="class" id="class" value={reportData.class} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500" />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1">مكان التنفيذ</label>
            <input type="text" name="location" id="location" value={reportData.location} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500" />
          </div>
          <div>
            <label htmlFor="beneficiaries" className="block text-sm font-medium text-slate-300 mb-1">المستفيدون</label>
            <input type="text" name="beneficiaries" id="beneficiaries" value={reportData.beneficiaries} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500" />
          </div>
          <div>
            <label htmlFor="beneficiaryCount" className="block text-sm font-medium text-slate-300 mb-1">عدد المستفيدين</label>
            <input type="text" name="beneficiaryCount" id="beneficiaryCount" value={reportData.beneficiaryCount} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500" />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-300 mb-1">تاريخ التنفيذ</label>
            <input type="date" name="date" id="date" value={reportData.date} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500" />
          </div>
          {(activeTemplate === 'TEMPLATE_2' || activeTemplate === 'TEMPLATE_2_IMAGES') && (
            <div>
              <label htmlFor="schoolPrincipal" className="block text-sm font-medium text-slate-300 mb-1">مدير المدرسة</label>
              <input type="text" name="schoolPrincipal" id="schoolPrincipal" value={reportData.schoolPrincipal} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500" />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="goals" className="block text-sm font-medium text-slate-300 mb-1">الأهداف</label>
          <textarea name="goals" id="goals" rows={4} value={reportData.goals} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500"></textarea>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">وصف البرنامج</label>
          <textarea name="description" id="description" rows={6} value={reportData.description} onChange={handleInputChange} className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-2 text-white focus:ring-purple-500 focus:border-purple-500"></textarea>
        </div>
        </>
      )}

      <div>
        <h3 className="text-lg font-medium text-slate-200 mb-2">الشواهد (صور/مرفقات) - حتى 6 صور</h3>
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFilesUpload(e.dataTransfer.files);
          }}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-purple-500 bg-slate-700/50' : 'hover:border-purple-400'}`}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFilesUpload(e.target.files)}
            className="hidden"
            ref={fileInputRef}
          />
          <div className="flex flex-col items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <p className="mt-2 text-sm text-slate-400">
              اسحب وأفلت الملفات هنا، أو <span className="font-semibold text-purple-400">انقر للاختيار</span>
            </p>
          </div>
        </div>

        {reportData.evidence.some(e => e) && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {reportData.evidence.map((evidence, index) => (
              evidence ? (
                <div key={index} className="relative group aspect-square">
                  <img src={evidence} alt={`شاهد ${index + 1}`} className="h-full w-full object-cover rounded-md" />
                  <button
                    onClick={() => handleRemoveEvidence(index)}
                    className="absolute top-1 right-1 bg-red-600/70 text-white rounded-full p-1 leading-none opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`إزالة الشاهد ${index + 1}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : null
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-700">
        <button onClick={handleGenerateWithAI} disabled={isGenerating} className="flex-1 min-w-[200px] bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-700 transition duration-300 disabled:bg-pink-800 disabled:cursor-not-allowed">
          {isGenerating ? 'جاري التوليد...' : '✨ توليد المحتوى بالذكاء الاصطناعي'}
        </button>
        <button onClick={() => setShowPreview(true)} className="flex-1 min-w-[200px] bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300">
          معاينة التقرير
        </button>
        <button onClick={() => setActiveTemplate(null)} className="flex-1 min-w-[200px] bg-slate-600 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-700 transition duration-300">
          تغيير القالب
        </button>
      </div>
    </div>
  );

  if (showPreview && activeTemplate) {
    return <ReportPreview data={reportData} onBack={() => setShowPreview(false)} template={activeTemplate} />;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {!activeTemplate ?
            <TemplateSelection onSelectTemplate={setActiveTemplate} onBack={() => setCurrentPage('HOME')} /> :
            <div className="max-w-4xl mx-auto bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-purple-900/10 border border-slate-700">
              <h2 className="text-2xl font-bold text-center text-slate-100 mb-6">تعبئة بيانات: {TEMPLATES[activeTemplate].name}</h2>
              {renderForm()}
            </div>
        }
    </div>
  );
};

export default ReportGenerator;