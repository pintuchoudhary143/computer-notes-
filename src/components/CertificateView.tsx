import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Edit3, 
  ArrowLeft,
  Sparkles,
  FileCheck
} from 'lucide-react';
import html2canvas from 'html2canvas';

export interface StudentCertificateData {
  studentName: string;
  fatherName: string;
  motherName: string;
  studentClass: string;
  rollNo: string;
  subjectName: string;
  scorePercentage: number;
  issueDate: string;
  certificateId: string;
}

interface CertificateViewProps {
  data: StudentCertificateData;
  onClose?: () => void;
  onEdit?: (updated: StudentCertificateData) => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ data, onClose, onEdit }) => {
  const [certData, setCertData] = useState<StudentCertificateData>(data);
  const [isEditing, setIsEditing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    const certElement = document.getElementById('printable-certificate');
    if (!certElement) {
      window.print();
      return;
    }

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#fffdf9'
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      const cleanName = certData.studentName.replace(/\s+/g, '_') || 'Student';
      link.download = `Patel_Adarsh_Vidhya_Niketan_Certificate_${cleanName}_${certData.rollNo}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Certificate download error:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const getGrade = (pct: number) => {
    if (pct >= 90) return { grade: 'A+ (सर्वोत्कृष्ट / Outstanding)', color: 'text-amber-900', badge: 'GOLD MEDALIST' };
    if (pct >= 75) return { grade: 'A (अति उत्तम / Excellent)', color: 'text-blue-900', badge: 'DISTINCTION' };
    if (pct >= 60) return { grade: 'B+ (उत्तम / Very Good)', color: 'text-indigo-900', badge: 'FIRST CLASS' };
    return { grade: 'B (संतोषप्रद / Pass)', color: 'text-slate-800', badge: 'PASSED' };
  };

  const gradeInfo = getGrade(certData.scorePercentage);

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    if (onEdit) onEdit(certData);
    try {
      localStorage.setItem('pavn_student_certificate_data', JSON.stringify(certData));
    } catch (err) {
      console.warn('Failed to save edited certificate:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Print Specific CSS: Clean A4 Landscape Isolation */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 4mm;
          }
          html, body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden;
          }
          #printable-certificate, #printable-certificate * {
            visibility: visible;
          }
          #printable-certificate {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 16px !important;
            box-shadow: none !important;
            border-width: 8px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            background: #fffdf9 !important;
            border-color: #8b6508 !important;
          }
        }
      `}</style>

      {/* Primary Action & Controls Bar (Hidden in Print) */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 via-white to-amber-50 rounded-2xl border-2 border-amber-400 shadow-md print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black tracking-wide shadow-xs">
                  ✓ प्रिंट ऑप्शन चालू है (PRINT OPTION ACTIVE)
                </span>
                <span className="text-xs text-slate-600 font-mono font-bold">
                  प्रमाण-पत्र संख्या: {certData.certificateId}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 mt-1 font-serif">
                पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय - छात्र: {certData.studentName} ({certData.studentClass})
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                🖨️ A4 Landscape साइज में रंगीन प्रिंट निकालें अथवा हाई-रेज़ोल्यूशन इमेज डाउनलोड करें।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* 1. Direct Print Dialog Button */}
            <button
              onClick={handlePrint}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#92400e] via-[#d97706] to-[#b45309] hover:from-[#78350f] hover:to-[#92400e] text-white text-xs font-black shadow-[0_0_15px_rgba(217,119,6,0.45)] border border-[#fef08a] transition-all flex items-center gap-2 active:scale-95 cursor-pointer ring-2 ring-amber-400"
              title="सर्टिफिकेट तुरंत A4 Landscape में प्रिंट करें"
            >
              <Printer className="w-4 h-4 text-[#fef08a]" />
              <span>🖨️ अभी A4 प्रिंट करें (Print Now)</span>
            </button>

            {/* 2. Download Image Button (Instant PNG) */}
            <button
              onClick={handleDownloadImage}
              disabled={isDownloading}
              className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 active:scale-95 cursor-pointer disabled:opacity-50"
              title="प्रमाण-पत्र की हाई-क्वालिटी PNG इमेज फाइल डाउनलोड करें"
            >
              <Download className="w-4 h-4 text-blue-200" />
              <span>{isDownloading ? 'तैयार हो रहा है...' : '📥 इमेज डाउनलोड करें'}</span>
            </button>

            {/* 3. Edit Details Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer bg-white"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-600" />
              <span>{isEditing ? 'संपादन बंद करें' : '✏️ नाम बदलें'}</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1 cursor-pointer bg-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>फॉर्म</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Quick Edit Panel (Hidden in Print) */}
      {isEditing && (
        <form onSubmit={handleSaveEdit} className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 print:hidden space-y-4">
          <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <Edit3 className="w-4 h-4 text-amber-700" />
            <span>सर्टिफिकेट विवरण तुरंत संशोधित करें (Live Certificate Editor)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">विद्यार्थी का नाम *</label>
              <input
                type="text"
                value={certData.studentName}
                onChange={e => setCertData({ ...certData, studentName: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">पिता का नाम *</label>
              <input
                type="text"
                value={certData.fatherName}
                onChange={e => setCertData({ ...certData, fatherName: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">माता का नाम *</label>
              <input
                type="text"
                value={certData.motherName}
                onChange={e => setCertData({ ...certData, motherName: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">कक्षा (Class) *</label>
              <input
                type="text"
                value={certData.studentClass}
                onChange={e => setCertData({ ...certData, studentClass: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">रोल नंबर (Roll No.) *</label>
              <input
                type="text"
                value={certData.rollNo}
                onChange={e => setCertData({ ...certData, rollNo: e.target.value })}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-0.5">प्राप्तांक प्रतिशत (%) *</label>
              <input
                type="number"
                min="33"
                max="100"
                value={certData.scorePercentage}
                onChange={e => setCertData({ ...certData, scorePercentage: Number(e.target.value) })}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-bold text-blue-900"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-700 text-white text-xs font-bold hover:bg-blue-800"
            >
              सर्टिफिकेट में अपडेट करें
            </button>
          </div>
        </form>
      )}

      {/* Luxury Certificate Canvas (A4 Landscape Formatted) */}
      <div className="w-full overflow-x-auto pb-6">
        <div 
          id="printable-certificate"
          className="certificate-luxury-sheet w-[1000px] mx-auto bg-[#fffdf9] p-7 rounded-2xl shadow-2xl border-[12px] border-double border-[#8b6508] relative text-slate-900 font-serif print:shadow-none print:w-full print:border-[10px] print:p-6 print:m-0 print:rounded-none"
          style={{
            backgroundImage: 'radial-gradient(#d4af37 0.75px, transparent 0.75px), radial-gradient(#d4af37 0.75px, #fffdf9 0.75px)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px'
          }}
        >
          {/* Inner Ornate Gold Border Frame */}
          <div className="border-[3px] border-[#c59b27] p-6 rounded-lg relative bg-[#ffffff]/90 backdrop-blur-xs shadow-inner">
            
            {/* Watermark Logo centered behind certificate content */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] pointer-events-none select-none">
              <img 
                src="/assets/school-logo.svg" 
                alt="Vidya Bharati Watermark" 
                className="w-96 h-96 object-contain"
              />
            </div>

            {/* Corner Luxury Rosettes */}
            <div className="absolute top-1.5 left-1.5 text-[#8b6508] text-2xl select-none leading-none">❖</div>
            <div className="absolute top-1.5 right-1.5 text-[#8b6508] text-2xl select-none leading-none">❖</div>
            <div className="absolute bottom-1.5 left-1.5 text-[#8b6508] text-2xl select-none leading-none">❖</div>
            <div className="absolute bottom-1.5 right-1.5 text-[#8b6508] text-2xl select-none leading-none">❖</div>

            {/* Ornate Header with Dual Logos (Left & Right) */}
            <div className="flex items-center justify-between gap-4 pb-4 border-b-2 border-[#b8860b]/40 mb-4">
              
              {/* Left School Logo (User Uploaded Vidya Bharati Logo) */}
              <div className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 flex items-center justify-center p-1 bg-white rounded-2xl shadow-md border-2 border-amber-500/50">
                <img
                  src="/assets/school-logo.svg"
                  alt="पटेल आदर्श विद्या निकेतन (विद्या भारती) विद्यालय लोगो"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Center School Details */}
              <div className="text-center flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-0.5 rounded-full bg-amber-100/80 border border-amber-400 text-amber-900 text-[11px] font-bold tracking-widest uppercase mb-1 font-sans">
                  <span>॥ सा विद्या या विमुक्तये ॥ विद्या भारती</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1a2b4c] uppercase font-serif drop-shadow-xs">
                  PATEL ADARSH VIDHYA NIKETAN HIGHER SECONDARY SCHOOL, KEKRI
                </h1>
                
                <p className="text-sm sm:text-base font-extrabold text-[#7c2d12] mt-0.5">
                  पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी (अजमेर / केकड़ी, राज.)
                </p>
                
                <div className="flex items-center justify-center gap-4 text-[11px] font-sans font-semibold text-slate-600 mt-1">
                  <span>SEMIS CODE: <strong>08211102601</strong></span>
                  <span>•</span>
                  <span>माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE) से सम्बद्ध</span>
                  <span>•</span>
                  <span>कम्प्यूटर विज्ञान एवं सूचना प्रौद्योगिकी संकाय</span>
                </div>
              </div>

              {/* Right School Logo (User Uploaded Vidya Bharati Logo) */}
              <div className="w-20 h-24 sm:w-24 sm:h-28 shrink-0 flex items-center justify-center p-1 bg-white rounded-2xl shadow-md border-2 border-amber-500/50">
                <img
                  src="/assets/school-logo.svg"
                  alt="पटेल आदर्श विद्या निकेतन (विद्या भारती) विद्यालय लोगो"
                  className="w-full h-full object-contain"
                />
              </div>

            </div>

            {/* Certificate Title Banner */}
            <div className="text-center my-3 relative">
              <div className="inline-block relative">
                <div className="bg-gradient-to-r from-[#78350f] via-[#b45309] to-[#78350f] text-[#fef3c7] px-10 py-1.5 rounded-md shadow-md border border-[#fde68a]">
                  <h2 className="text-base sm:text-lg font-bold tracking-widest uppercase font-serif">
                    CERTIFICATE OF MERIT & INFORMATION TECHNOLOGY EXCELLENCE
                  </h2>
                </div>
              </div>
              <p className="text-xs font-bold text-amber-900 mt-1 italic font-sans">
                (कम्प्यूटर अध्ययन, एमएस ऑफिस एवं आधुनिक कोडिंग कौशल प्रवीणता प्रमाण-पत्र)
              </p>
            </div>

            {/* Certificate Body Text with Student, Parents & Academic Details */}
            <div className="text-center my-5 space-y-3 font-sans relative z-10">
              
              <p className="text-xs text-slate-600 italic">
                यह प्रमाणित किया जाता है कि (This is to proudly certify that)
              </p>

              {/* Student Name */}
              <div className="my-1">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0f172a] px-8 py-0.5 border-b-2 border-dashed border-[#b8860b] inline-block font-serif tracking-wide text-indigo-950">
                  {certData.studentName}
                </span>
              </div>

              {/* Parents' Details (Father & Mother) */}
              <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-slate-800 font-medium">
                <span>आत्मज / आत्मजा (S/o, D/o):</span>
                <span>
                  पिता: <strong className="text-slate-950 font-bold">श्री {certData.fatherName || '___________'}</strong>
                </span>
                <span>एवं</span>
                <span>
                  माता: <strong className="text-slate-950 font-bold">श्रीमती {certData.motherName || '___________'}</strong>
                </span>
              </div>

              {/* Class, Roll Number & Certificate ID */}
              <div className="flex items-center justify-center gap-6 text-xs sm:text-sm text-slate-800 font-semibold bg-amber-50/70 py-1.5 px-4 rounded-xl border border-amber-200/60 max-w-2xl mx-auto flex-wrap">
                <span>कक्षा (Class): <strong className="text-blue-900">{certData.studentClass}</strong></span>
                <span>•</span>
                <span>रोल नंबर (Roll No.): <strong className="text-blue-900 font-mono">{certData.rollNo}</strong></span>
                <span>•</span>
                <span>प्रमाण-पत्र क्रमांक: <strong className="text-blue-900 font-mono">{certData.certificateId}</strong></span>
              </div>

              {/* Achievement Statement */}
              <p className="text-xs sm:text-sm text-slate-700 max-w-3xl mx-auto leading-relaxed pt-2">
                ने सत्र 2026 में <strong>{certData.subjectName}</strong> के अंतर्गत सूचना प्रौद्योगिकी की अवधारणा-I (कम्प्यूटर मूल बातें, इनपुट/आउटपुट युक्तियाँ, नेटवर्किंग, इंटरनेट) तथा <strong>MS Word, MS Excel, MS PowerPoint, HTML, CSS, JavaScript, Python एवं SQL डेटाबेस</strong> की व्यापक मूल्यांकन परीक्षा में भाग लेकर
                <span className="inline-block bg-amber-100 px-2 py-0.5 mx-1.5 rounded-md font-extrabold text-blue-950 border border-amber-300">
                  {certData.scorePercentage}% अंक
                </span> 
                प्राप्त किए हैं तथा 
                <span className={`mx-1.5 font-black text-sm ${gradeInfo.color}`}>
                  {gradeInfo.grade}
                </span> 
                अर्जित की है। इनके उज्ज्वल भविष्य की कामना की जाती है।
              </p>
            </div>

            {/* Bottom Footer: Date/Verification, Luxury Seal, Principal Stamp & Signature */}
            <div className="grid grid-cols-3 items-end pt-5 border-t border-[#b8860b]/30 mt-6 relative z-10">
              
              {/* Left Column: Date & Digital Badge */}
              <div className="text-left font-sans text-xs space-y-1">
                <p className="text-slate-500 font-medium">जारी दिनांक (Date of Issue):</p>
                <p className="font-bold text-slate-900">{certData.issueDate}</p>
                
                <div className="inline-flex items-center gap-1.5 text-[10px] text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 font-semibold mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>प्रमाणित डिजिटल रिकॉर्ड (Verified Record)</span>
                </div>
              </div>

              {/* Center Column: 3D Luxury Gold Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#92400e] via-[#fde047] to-[#78350f] p-1.5 shadow-xl flex items-center justify-center border border-[#ca8a04]">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-[#854d0e] bg-gradient-to-b from-[#fefce8] to-[#fef08a] flex flex-col items-center justify-center text-amber-950 shadow-inner">
                    <Award className="w-6 h-6 text-[#854d0e] drop-shadow-xs" />
                    <span className="text-[7px] font-black uppercase tracking-tighter text-[#713f12]">
                      {gradeInfo.badge}
                    </span>
                    <span className="text-[6px] font-bold text-slate-600">PAVN KEKRI</span>
                  </div>
                </div>
                <span className="text-[9px] font-sans font-black text-[#854d0e] mt-1 tracking-widest uppercase">
                  OFFICIAL GOLD SEAL
                </span>
              </div>

              {/* Right Column: User's Uploaded Principal Signature & Seal */}
              <div className="text-center font-sans">
                <div className="h-20 flex items-center justify-center">
                  <img
                    src="/assets/aistudio/1792464198738.jpg-removebg-preview_93d1da9c.png"
                    alt="Principal Signature & Seal - Patel Adarsh Vidhya Niketan Higher Secondary School, Kekri"
                    className="max-h-20 max-w-[210px] object-contain drop-shadow-xs"
                  />
                </div>
                <div className="pt-1 border-t-2 border-slate-400 mt-1">
                  <p className="text-xs font-black text-[#1a2b4c]">प्रधानाचार्य (Principal)</p>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
