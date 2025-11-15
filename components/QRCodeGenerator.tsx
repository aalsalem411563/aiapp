import React, { useState } from 'react';
import type { Page } from '../types';
import { PAGES } from '../constants';
import qrcode from 'qrcode-generator';

// A simple QR Code generation logic. For a real app, a library like 'qrcode' would be used.
// This is a simplified SVG generator for demonstration purposes.
const generateQrCodeSvg = (text: string) => {
  if (!text) return '';
  // FIX: Replaced `require` with an ES module `import` to resolve the TypeScript error.
  const qr = qrcode(0, 'L');
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({
    cellSize: 8,
    margin: 4,
    // Using modern SVG attributes for colors
    svgStyle: 'width="100%" height="100%"',
    pathStyle: 'fill="#e2e8f0"', // slate-200
    bgStyle: 'fill="#1e293b"', // slate-800
  });
};

const QRCodeGenerator: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => {
  const [text, setText] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleGenerate = () => {
    setQrCode(generateQrCodeSvg(text));
  };

  const handleDownload = () => {
    const svg = qrCode;
    if (!svg) return;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-slate-800 p-8 rounded-2xl shadow-2xl shadow-purple-900/10 border border-slate-700">
        <h2 className="text-3xl font-bold text-center text-slate-100 mb-6">مولد رموز QR</h2>
        <div className="space-y-6">
          <textarea
            className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-3 text-white focus:ring-purple-500 focus:border-purple-500 transition duration-300"
            rows={4}
            placeholder="أدخل النص أو الرابط هنا..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300 disabled:bg-purple-800 disabled:cursor-not-allowed"
            disabled={!text}
          >
            إنشاء الرمز
          </button>

          {qrCode && (
            <div className="mt-8 p-6 bg-slate-900 rounded-lg border border-slate-700 flex flex-col items-center gap-6">
              <div className="w-64 h-64 bg-slate-800 p-4 rounded-md" dangerouslySetInnerHTML={{ __html: qrCode }} />
              <button
                onClick={handleDownload}
                className="w-full bg-pink-600 text-white font-bold py-3 px-4 rounded-md hover:bg-pink-700 transition duration-300"
              >
                تحميل SVG
              </button>
            </div>
          )}
        </div>
      </div>
      <button onClick={() => setCurrentPage(PAGES.HOME)} className="mt-8 bg-slate-700 text-slate-300 font-bold py-2 px-6 rounded-md hover:bg-slate-600 transition duration-300">
        العودة إلى الرئيسية
      </button>
    </div>
  );
};

export default QRCodeGenerator;