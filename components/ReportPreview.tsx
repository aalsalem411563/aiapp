import React, { useRef } from 'react';
import type { ReportData, TemplateType } from '../types';
import qrcode from 'qrcode-generator';

interface ReportPreviewProps {
  data: ReportData;
  onBack: () => void;
  template: TemplateType;
}

const generateQrCodeForPrint = (text: string) => {
  if (!text) return '';
  const qr = qrcode(0, 'M'); // Medium error correction
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({
    cellSize: 2,
    margin: 0,
    svgStyle: 'width="100%" height="100%"',
    pathStyle: 'fill="#000000"',
    bgStyle: 'fill="#ffffff"',
  });
};


const ReportField: React.FC<{ label: string; value: string | undefined }> = ({ label, value }) => (
  <div className="border border-gray-300 rounded-lg p-2 flex justify-between items-center text-sm bg-white">
    <span className="font-bold text-teal-900">{label}:</span>
    <span className="text-gray-600 text-left">{value || ''}</span>
  </div>
);

const Template1: React.FC<{ data: ReportData }> = ({ data }) => {
  const qrText = `البرنامج: ${data.class || ''}\nالمكان: ${data.location || ''}\nالتاريخ: ${data.date || ''}\nالمستفيدون: ${data.beneficiaries || ''} ( العدد: ${data.beneficiaryCount || 'غير محدد'})`;
  const qrCodeSvg = generateQrCodeForPrint(qrText);
  return (
  <div className="bg-gray-200 p-2 rounded-3xl shadow-lg printable-wrapper">
    <div className="bg-white rounded-[20px] overflow-hidden w-[400px] text-gray-800 printable-report">
      <header className="bg-teal-800 p-4 text-center">
        <p className="text-white font-bold text-lg">وزارة التعليم</p>
        <p className="text-white text-xs">MINISTRY OF EDUCATION</p>
      </header>
      <main className="p-4 bg-white space-y-3">
        <div className="bg-teal-600 h-8 rounded-md"></div>
        <div className="bg-teal-600 h-6 rounded-md w-3/4"></div>

        <div className="flex gap-3" style={{ direction: 'rtl' }}>
          <div className="w-1/2 space-y-3">
            <div className="bg-gray-100 p-3 rounded-lg h-full">
              <h3 className="font-bold text-teal-800 mb-2">الأهداف:</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{data.goals}</p>
            </div>
          </div>
          <div className="w-1/2 space-y-2">
            <ReportField label="الصف" value={data.class} />
            <ReportField label="مكان التنفيذ" value={data.location} />
            <ReportField label="المستفيدون" value={data.beneficiaries} />
            <ReportField label="عدد المستفيدين" value={data.beneficiaryCount} />
            <ReportField label="تاريخ التنفيذ" value={data.date} />
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-teal-800 my-2 text-center">شواهد:</h3>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, index) => (
              data.evidence[index] ? (
                <img key={index} src={data.evidence[index] as string} className="w-full h-24 object-cover rounded-lg" alt={`شاهد ${index + 1}`} />
              ) : <div key={index} className="bg-gray-200 w-full h-24 rounded-lg flex items-center justify-center text-gray-500 text-xs">شاهد {index + 1}</div>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gradient-to-t from-teal-600 to-teal-400 p-4 flex justify-center items-center">
        {qrCodeSvg && <div className="w-16 h-16 bg-white p-1 rounded-sm" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />}
      </footer>
    </div>
  </div>
)};

const Template2: React.FC<{ data: ReportData }> = ({ data }) => {
    const qrText = `البرنامج: ${data.class || ''}\nالمكان: ${data.location || ''}\nالتاريخ: ${data.date || ''}\nالمستفيدون: ${data.beneficiaries || ''} ( العدد: ${data.beneficiaryCount || 'غير محدد'})`;
    const qrCodeSvg = generateQrCodeForPrint(qrText);
    return (
    <div className="bg-gray-200 p-2 rounded-3xl shadow-lg printable-wrapper">
     <div className="bg-white rounded-[20px] overflow-hidden w-[400px] text-gray-800 printable-report">
      <header className="bg-teal-800 p-4 text-center">
        <p className="text-white font-bold text-lg">وزارة التعليم</p>
        <p className="text-white text-xs">MINISTRY OF EDUCATION</p>
      </header>
      <main className="p-4 bg-white space-y-3" style={{ direction: 'rtl' }}>
        <div className="bg-teal-600 h-8 rounded-md w-3/4 mx-auto"></div>
        <div className="grid grid-cols-2 gap-2">
            <ReportField label="الصف" value={data.class} />
            <ReportField label="مكان التنفيذ" value={data.location} />
            <ReportField label="المستفيدون" value={data.beneficiaries} />
            <ReportField label="تاريخ التنفيذ" value={data.date} />
            <ReportField label="عدد المستفيدين" value={data.beneficiaryCount} />
            <ReportField label="مدير المدرسة" value={data.schoolPrincipal} />
        </div>
        <div className="bg-gray-100 p-2 rounded-lg">
            <h3 className="font-bold text-teal-800 text-sm mb-1">الأهداف:</h3>
            <p className="text-xs text-gray-600 whitespace-pre-wrap">{data.goals}</p>
        </div>
            <div className="bg-gray-100 p-2 rounded-lg">
            <h3 className="font-bold text-teal-800 text-sm mb-1">وصف البرنامج:</h3>
            <p className="text-xs text-gray-600 whitespace-pre-wrap">{data.description}</p>
        </div>
        <div>
            <h3 className="font-bold text-teal-800 my-2 text-center">شواهد:</h3>
            <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, index) => (
                data.evidence[index] ? (
                <img key={index} src={data.evidence[index] as string} className="w-full h-24 object-cover rounded-lg" alt={`شاهد ${index + 1}`} />
                ) : <div key={index} className="bg-gray-200 w-full h-24 rounded-lg flex items-center justify-center text-gray-500 text-xs">شاهد {index + 1}</div>
            ))}
            </div>
        </div>
      </main>
      <footer className="bg-gradient-to-t from-blue-600 to-teal-400 p-4 flex justify-center items-center">
        {qrCodeSvg && <div className="w-16 h-16 bg-white p-1 rounded-sm" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />}
      </footer>
    </div>
  </div>
);
};

const Template2Images: React.FC<{ data: ReportData }> = ({ data }) => {
    const qrText = `البرنامج: ${data.class || ''}\nالمكان: ${data.location || ''}\nالتاريخ: ${data.date || ''}\nالمستفيدون: ${data.beneficiaries || ''} ( العدد: ${data.beneficiaryCount || 'غير محدد'})`;
    const qrCodeSvg = generateQrCodeForPrint(qrText);
    return (
    <div className="bg-gray-200 p-2 rounded-3xl shadow-lg printable-wrapper">
     <div className="bg-white rounded-[20px] overflow-hidden w-[400px] text-gray-800 printable-report">
      <header className="bg-teal-800 p-4 text-center">
        <p className="text-white font-bold text-lg">وزارة التعليم</p>
        <p className="text-white text-xs">MINISTRY OF EDUCATION</p>
      </header>
      <main className="p-4 bg-white space-y-3" style={{ direction: 'rtl' }}>
        <div className="bg-gradient-to-r from-teal-500 to-green-400 h-10 rounded-md"></div>
        <div className="flex gap-3">
          <div className="w-1/2 space-y-3">
             <div className="bg-gray-100 p-3 rounded-lg h-full">
              <h3 className="font-bold text-teal-800 mb-2">الأهداف:</h3>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{data.goals}</p>
            </div>
          </div>
          <div className="w-1/2 space-y-2">
            <ReportField label="الصف" value={data.class} />
            <ReportField label="مكان التنفيذ" value={data.location} />
            <ReportField label="المستفيدون" value={data.beneficiaries} />
            <ReportField label="تاريخ التنفيذ" value={data.date} />
            <ReportField label="مدير المدرسة" value={data.schoolPrincipal} />
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <h3 className="font-bold text-teal-800 mb-2">وصف البرنامج:</h3>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{data.description}</p>
        </div>
        <div>
          <h3 className="font-bold text-teal-800 mb-2 text-center">شواهد:</h3>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, index) => (
                data.evidence[index] ? (
                <img key={index} src={data.evidence[index] as string} className="w-full h-24 object-cover rounded-lg" alt={`شاهد ${index + 1}`} />
                ) : <div key={index} className="bg-gray-200 w-full h-24 rounded-lg flex items-center justify-center text-gray-500 text-xs">شاهد {index + 1}</div>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-gradient-to-t from-teal-600 to-green-500 p-4 flex justify-center items-center">
        {qrCodeSvg && <div className="w-16 h-16 bg-white p-1 rounded-sm" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />}
      </footer>
    </div>
  </div>
);
};

const Announcement: React.FC<{ data: ReportData }> = ({ data }) => {
  const qrText = `إعلان: ${data.title || 'بدون عنوان'}\n${data.body?.substring(0, 150) || ''}`;
  const qrCodeSvg = generateQrCodeForPrint(qrText);
  return (
    <div className="bg-gray-200 p-2 rounded-3xl shadow-lg printable-wrapper">
     <div className="bg-white rounded-[20px] overflow-hidden w-[400px] text-gray-800 printable-report">
      <header className="bg-teal-800 p-4 text-center">
        <p className="text-white font-bold text-lg">وزارة التعليم</p>
        <p className="text-white text-xs">MINISTRY OF EDUCATION</p>
      </header>
      <main className="p-4 bg-white space-y-3" style={{ direction: 'rtl' }}>
        <div>
          <h3 className="font-bold text-teal-800 mb-2 text-center">شواهد:</h3>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, index) => (
                data.evidence[index] ? (
                <img key={index} src={data.evidence[index] as string} className="w-full h-24 object-cover rounded-lg" alt={`شاهد ${index + 1}`} />
                ) : <div key={index} className="bg-gray-200 w-full h-24 rounded-lg flex items-center justify-center text-gray-500 text-xs">شاهد {index + 1}</div>
            ))}
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner relative pt-8">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 bg-gradient-to-r from-teal-500 to-green-400 h-10 rounded-md shadow-lg text-white flex items-center justify-center font-bold text-lg">
             {data.title}
           </div>
           <p className="text-gray-700 mt-2 whitespace-pre-wrap">{data.body}</p>
        </div>
      </main>
      <footer className="bg-gradient-to-t from-blue-600 to-cyan-400 p-4 flex justify-center items-center">
        {qrCodeSvg && <div className="w-16 h-16 bg-white p-1 rounded-sm" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />}
      </footer>
    </div>
  </div>
  );
};

const ReportPreview: React.FC<ReportPreviewProps> = ({ data, onBack, template }) => {
  const printableRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printableElement = printableRef.current;
    if (!printableElement) {
      console.error("Printable element not found!");
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("يرجى السماح بالنوافذ المنبثقة لطباعة التقرير.");
      return;
    }

    const reportHtml = printableElement.innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>طباعة التقرير</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Cairo', sans-serif;
              direction: rtl;
            }
            @media print {
              @page {
                size: A4 portrait;
                margin: 0;
              }
              body {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                background-color: white;
              }
               /* Center the content on the page for printing */
              body > div {
                 margin: 0 auto;
              }
            }
          </style>
        </head>
        <body style="display: flex; justify-content: center; align-items: flex-start; padding-top: 20px; background-color: #f1f5f9;">
          ${reportHtml}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };


  const renderTemplate = () => {
    switch(template) {
        case 'TEMPLATE_1': return <Template1 data={data} />;
        case 'TEMPLATE_2': return <Template2 data={data} />;
        case 'TEMPLATE_2_IMAGES': return <Template2Images data={data} />;
        case 'ANNOUNCEMENT': return <Announcement data={data} />;
        default: return <p>قالب غير معروف</p>
    }
  }

  return (
    <div className="container mx-auto p-4 bg-slate-100 rounded-lg">
      <div id="printable-area" ref={printableRef} className="flex justify-center">
        {renderTemplate()}
      </div>
      <div className="flex justify-center gap-4 mt-8 print:hidden">
        <button onClick={onBack} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-md hover:bg-slate-700 transition duration-300">
          رجوع للتعديل
        </button>
        <button onClick={handlePrint} className="bg-purple-600 text-white font-bold py-2 px-6 rounded-md hover:bg-purple-700 transition duration-300">
          طباعة / حفظ PDF
        </button>
      </div>
    </div>
  );
};

export default ReportPreview;