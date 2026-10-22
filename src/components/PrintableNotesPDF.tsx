import React, { useState } from 'react';
import { Chapter, StudyLanguage } from '../types/study';
import { getAllChaptersInLanguage } from '../data/chapters';
import { CertificateView, StudentCertificateData } from './CertificateView';
import { 
  fullFormsList, 
  shortcutsList, 
  indianIPRActs 
} from '../data/quickRevisionData';
import { techModulesData } from '../data/techModulesData';
import { allExcelFormulas, excelErrorGuide } from '../data/excelFormulasData';
import { 
  Printer, 
  Download, 
  FileCheck, 
  ArrowLeft, 
  CheckCircle,
  BookOpen,
  Award,
  Languages
} from 'lucide-react';

interface PrintableNotesPDFProps {
  chapters: Chapter[];
  onBack: () => void;
}

export const PrintableNotesPDF: React.FC<PrintableNotesPDFProps> = ({
  chapters,
  onBack
}) => {
  const [exportMode, setExportMode] = useState<'all' | 'single' | 'tech' | 'excel' | 'revision' | 'certificate'>('all');
  const [selectedChapId, setSelectedChapId] = useState<number>(1);
  const [lang, setLang] = useState<StudyLanguage>('hi');

  // Load saved certificate or provide default
  const [certData] = useState<StudentCertificateData>(() => {
    try {
      const saved = localStorage.getItem('pavn_student_certificate_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      studentName: 'राहुल शर्मा',
      fatherName: 'श्री जगदीश प्रसाद शर्मा',
      motherName: 'श्रीमती सुमित्रा देवी',
      studentClass: 'कक्षा 9th - \'A\'',
      rollNo: '9042',
      subjectName: 'कम्प्यूटर विज्ञान एवं सूचना प्रौद्योगिकी (IT Proficiency)',
      scorePercentage: 96,
      issueDate: new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      certificateId: 'PAVN/IT/2026/8421'
    };
  });

  const handlePrint = () => {
    window.print();
  };

  const localizedChapters = getAllChaptersInLanguage(lang);
  const selectedChapter = localizedChapters.find(c => c.id === selectedChapId) || localizedChapters[0];
  const chaptersToPrint = exportMode === 'all' 
    ? localizedChapters 
    : exportMode === 'single' 
    ? [selectedChapter] 
    : [];

  return (
    <div className="bg-slate-100 min-h-screen py-6 px-4 print:p-0 print:bg-white text-slate-900 font-sans">
      {/* Print Control Toolbar (Hidden during print) */}
      <div className="max-w-5xl mx-auto mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-md print:hidden flex flex-col md:flex-row items-center justify-between gap-4 sticky top-4 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 text-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>वापस पोर्टल पर जाएँ</span>
          </button>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              प्रिंटेबल A4 PDF प्रारूप (Print & PDF Export Mode)
            </h2>
            <p className="text-[11px] text-slate-500">
              नीचे दिया गया प्रारूप सीधे प्रिंटर तथा "Save as PDF" के लिए अनुकूलित है।
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Language Selector for Printing */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-300">
            <span className="text-[11px] font-bold text-slate-600 px-1.5 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              <span>भाषा:</span>
            </span>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'hi'
                  ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇮🇳 हिंदी
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'en'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇬🇧 English Notes
            </button>
            <button
              type="button"
              onClick={() => setLang('bilingual')}
              className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                lang === 'bilingual'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              📖 द्विभाषी
            </button>
          </div>

          <select
            value={exportMode}
            onChange={(e) => setExportMode(e.target.value as any)}
            className="text-xs font-semibold border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-none"
          >
            <option value="all">📚 संपूर्ण पुस्तक ({lang === 'en' ? 'All 8 English Chapters' : 'सभी 8 पाठ'})</option>
            <option value="single">📖 केवल एक पाठ ({lang === 'en' ? 'Single English Chapter' : 'चयनित पाठ'})</option>
            <option value="certificate">🎓 आधिकारिक स्कूल प्रमाण-पत्र (Certificate of Excellence)</option>
            <option value="tech">💻 ऑफिस टूल्स एवं कोडिंग नोट्स (8 मॉड्यूल्स)</option>
            <option value="excel">🧮 एमएस एक्सेल संपूर्ण फॉर्मूला महाकोश (100+ Formulas)</option>
            <option value="revision">⚡ केवल क्विक रिवीज़न शीट</option>
          </select>

          {exportMode === 'single' && (
            <select
              value={selectedChapId}
              onChange={(e) => setSelectedChapId(Number(e.target.value))}
              className="text-xs font-medium border border-slate-300 rounded-lg px-2.5 py-1.5 bg-slate-50 text-slate-800 focus:outline-none max-w-[200px] truncate"
            >
              {localizedChapters.map(ch => (
                <option key={ch.id} value={ch.id}>
                  पाठ {ch.chapterNumber}: {lang === 'en' ? ch.titleEnglish : ch.titleHindi}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>प्रिंट करें / PDF सेव करें</span>
          </button>
        </div>
      </div>

      {/* Actual Printable Document Container (A4 layout styling) */}
      <div className={`mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-slate-200 print:shadow-none print:border-none print:p-0 print:max-w-none ${
        exportMode === 'certificate' ? 'max-w-[1050px]' : 'max-w-[850px]'
      }`}>
        {exportMode === 'certificate' ? (
          <div className="py-4">
            <CertificateView data={certData} />
          </div>
        ) : (
          <>
        {/* Cover Page */}
        {(exportMode === 'all' || exportMode === 'revision') && (
          <div className="text-center py-10 border-b-2 border-slate-900 mb-10 print:page-break-after">
            
            {/* School Official Logo & Institutional Name */}
            <div className="flex justify-center mb-3">
              <img
                src="/assets/school-logo.svg"
                alt="पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी"
                className="w-20 h-24 sm:w-24 sm:h-28 object-contain drop-shadow-sm"
              />
            </div>

            <div className="text-base sm:text-lg font-black text-[#1a2b4c] tracking-tight uppercase mb-0.5">
              पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी
            </div>
            <div className="text-xs font-bold text-amber-800 tracking-wider mb-2">
              ॥ सा विद्या या विमुक्तये ॥ विद्या भारती (SEMIS CODE: 08211102601)
            </div>

            <div className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-2">
              माध्यमिक शिक्षा बोर्ड राजस्थान, अजमेर (RBSE)
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-2">
              कम्प्यूटर: सूचना प्रौद्योगिकी की अवधारणा - I
            </h1>
            <div className="text-base font-bold text-blue-900 mb-4">
              कक्षा - 9 (Class 9th Computer Study Guide)
            </div>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />

            <div className="max-w-xl mx-auto text-xs text-slate-700 leading-relaxed mb-8 bg-slate-50 p-4 rounded-xl border border-slate-300">
              <p className="font-bold text-slate-900 mb-1">विशेष अध्ययन नोट्स एवं प्रश्नोत्तर संग्रह:</p>
              <ul className="text-left list-disc list-inside space-y-1 text-[11px] text-slate-600">
                <li>संपूर्ण 8 पाठों के बिंदुवार मास्टर नोट्स व तुलनात्मक सारणियाँ</li>
                <li>कम्प्यूटर ब्लॉक डायग्राम, मेमोरी सोपान, केबल्स व टोपोलॉजी के मुख्य आरेख</li>
                <li>पाठ्यपुस्तक के सभी अभ्यास प्रश्न (बहुचयनात्मक, अतिलघु, लघु, निबंधात्मक) के प्रामाणिक उत्तर</li>
                <li>परीक्षा से पूर्व त्वरित स्मरण हेतु फुल फॉर्म्स, शॉर्टकट कीज व क्विक रिवीज़न सेक्शन</li>
              </ul>
            </div>

            <div className="text-[11px] text-slate-500 font-medium">
              विद्यार्थियों के अध्ययन व परीक्षा तैयारी हेतु समर्पित | स्वच्छ व स्पष्ट प्रिंटेबल प्रारूप
            </div>
          </div>
        )}

        {/* Index Page (विषय सूची) */}
        {exportMode === 'all' && (
          <div className="mb-12 border-b border-slate-300 pb-8 print:page-break-after">
            <h2 className="text-xl font-bold text-slate-900 pb-2 mb-4 border-b-2 border-slate-900 flex items-center justify-between">
              <span>विषय सूची (INDEX)</span>
              <span className="text-xs font-normal text-slate-600">कक्षा - 9</span>
            </h2>

            <div className="space-y-4">
              {chapters.map(ch => (
                <div key={ch.id} className="flex items-baseline justify-between text-xs py-1.5 border-b border-dotted border-slate-300">
                  <div className="font-bold text-slate-900 flex items-baseline gap-2">
                    <span className="text-blue-900 w-12 shrink-0">पाठ {ch.chapterNumber}</span>
                    <span>{ch.titleHindi}</span>
                    <span className="text-slate-500 font-normal">({ch.titleEnglish})</span>
                  </div>
                  <div className="text-slate-600 font-mono text-[11px] shrink-0">
                    पृष्ठ: {ch.pageRange}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chapter-by-Chapter Content */}
        {chaptersToPrint.map((ch, chIdx) => (
          <div key={ch.id} className="mb-14 print:page-break-before">
            {/* Chapter Header */}
            <div className="border-b-2 border-slate-900 pb-3 mb-6">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span className="font-bold text-blue-900">{ch.unitHindi}</span>
                <span>पाठ्यपुस्तक पृष्ठ: {ch.pageRange}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-950">
                पाठ - {ch.chapterNumber}: {ch.titleHindi}
              </h2>
              <div className="text-sm font-semibold text-slate-600">
                {ch.titleEnglish}
              </div>
            </div>

            {/* Overview Box */}
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-300 text-xs text-slate-800 leading-relaxed mb-6 font-medium">
              <strong>पाठ सारांश:</strong> {ch.overview}
            </div>

            {/* Sections & Notes */}
            <div className="space-y-6 mb-8">
              {ch.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-950 pb-1 border-b border-slate-300">
                    {sec.title}
                  </h3>

                  {sec.subsections?.map((sub, subIdx) => (
                    <div key={subIdx} className="space-y-2 pl-2">
                      <h4 className="text-xs font-bold text-blue-950">
                        • {sub.subtitle}
                      </h4>
                      <div className="space-y-1.5 pl-3">
                        {sub.content.map((point, pIdx) => (
                          <p key={pIdx} className="text-xs text-slate-800 leading-relaxed">
                            {point}
                          </p>
                        ))}
                      </div>

                      {/* Tables */}
                      {sub.table && (
                        <div className="my-3 overflow-hidden rounded border border-slate-300">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-900">
                                {sub.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-2 border-r border-slate-300 last:border-r-0">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sub.table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="border-b border-slate-200 last:border-b-0">
                                  {row.map((c, cIdx) => (
                                    <td key={cIdx} className="p-2 border-r border-slate-200 last:border-r-0 text-slate-800 align-top whitespace-pre-line">
                                      {c}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Key Revision Points */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-300 mb-8 print:avoid-break">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <span>📌 महत्वपूर्ण बिन्दु (Key Summary Points)</span>
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-800 list-disc list-inside">
                {ch.keyPoints.map((kp, kIdx) => (
                  <li key={kIdx} className="leading-relaxed">
                    {kp}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chapter Exercises: Questions & Answers */}
            <div className="space-y-6 pt-4 border-t-2 border-slate-400">
              <h3 className="text-base font-bold text-slate-950 flex items-center justify-between pb-1 border-b border-slate-300">
                <span>अभ्यासार्थ प्रश्न एवं आदर्श उत्तर</span>
                <span className="text-xs font-normal text-slate-600">पाठ {ch.chapterNumber}</span>
              </h3>

              {/* MCQs */}
              {ch.mcqs.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-blue-900 uppercase">
                    1. बहुचयनात्मक प्रश्न (Objective MCQs)
                  </h4>
                  <div className="space-y-2">
                    {ch.mcqs.map((mcq, mIdx) => (
                      <div key={mcq.id} className="p-2.5 bg-white border border-slate-200 rounded text-xs print:avoid-break">
                        <p className="font-semibold text-slate-900 mb-1">
                          प्र. {mIdx + 1}. {mcq.question}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[11px] text-slate-700 pl-4 mb-1">
                          {Object.entries(mcq.options).map(([k, v]) => (
                            <span key={k}>({k}) {v}</span>
                          ))}
                        </div>
                        <div className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                          उत्तर: ({mcq.correctOption}) {mcq.options[mcq.correctOption]}
                          {mcq.explanation && <span className="font-normal text-slate-600 ml-2">[{mcq.explanation}]</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Very Short */}
              {ch.veryShortQuestions.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-amber-900 uppercase">
                    2. अतिलघुत्तरात्मक प्रश्न
                  </h4>
                  <div className="space-y-2">
                    {ch.veryShortQuestions.map((q, qIdx) => (
                      <div key={q.id} className="text-xs print:avoid-break pl-2 border-l-2 border-slate-300">
                        <p className="font-bold text-slate-900">
                          प्र. {qIdx + 1}. {q.question}
                        </p>
                        <p className="text-slate-800 font-medium mt-0.5">
                          <span className="font-bold text-emerald-700">उत्तर: </span>
                          {q.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Short Questions */}
              {ch.shortQuestions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-indigo-900 uppercase">
                    3. लघुत्तरात्मक प्रश्न
                  </h4>
                  <div className="space-y-3">
                    {ch.shortQuestions.map((q, qIdx) => (
                      <div key={q.id} className="p-3 bg-slate-50 border border-slate-200 rounded text-xs print:avoid-break">
                        <p className="font-bold text-slate-900 mb-1">
                          प्र. {qIdx + 1}. {q.question}
                        </p>
                        <p className="text-slate-800 leading-relaxed whitespace-pre-line">
                          <strong className="text-indigo-900">उत्तर: </strong>
                          {q.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Long Questions */}
              {ch.longQuestions.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-purple-900 uppercase">
                    4. निबंधात्मक प्रश्न (विस्तृत मॉडल उत्तर)
                  </h4>
                  <div className="space-y-4">
                    {ch.longQuestions.map((q, qIdx) => (
                      <div key={q.id} className="p-4 bg-white border border-slate-300 rounded text-xs print:avoid-break">
                        <p className="font-bold text-slate-950 mb-2 pb-1 border-b border-slate-200">
                          प्र. {qIdx + 1}. {q.question}
                        </p>
                        <p className="text-slate-800 leading-relaxed whitespace-pre-line font-normal">
                          <strong className="text-purple-900 block mb-1">आदर्श उत्तर:</strong>
                          {q.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Cover Page for Tech Modules */}
        {exportMode === 'tech' && (
          <div className="text-center py-12 border-b-2 border-slate-900 mb-10 print:page-break-after">
            <div className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-2">
              पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-2">
              ऑफिस टूल्स एवं आधुनिक कोडिंग अध्ययन सामग्री
            </h1>
            <div className="text-base font-bold text-blue-900 mb-4">
              MS Office, Web Development, Python & Database (Class 9 - 12)
            </div>
            <div className="w-24 h-1 bg-amber-500 mx-auto mb-6" />

            <div className="max-w-xl mx-auto text-xs text-slate-700 leading-relaxed mb-8 bg-slate-50 p-4 rounded-xl border border-slate-300">
              <p className="font-bold text-slate-900 mb-2">सम्मिलित 8 महत्वपूर्ण तकनीकी विषय (Complete 8 Modules):</p>
              <div className="grid grid-cols-2 text-left gap-1.5 text-[11px] text-slate-700 font-semibold">
                <div>1. Microsoft Word (वर्ड प्रोसेसिंग)</div>
                <div>2. Microsoft Excel (स्प्रेडशीट व सूत्र)</div>
                <div>3. Microsoft PowerPoint (प्रस्तुतीकरण)</div>
                <div>4. HTML (वेब संरचना व टैग्स)</div>
                <div>5. CSS (स्टाइलिंग व बॉक्स मॉडल)</div>
                <div>6. JavaScript (डायनामिक प्रोग्रामिंग)</div>
                <div>7. Python (सरल व आधुनिक कोडिंग)</div>
                <div>8. Database & SQL (RDBMS व क्वेरीज़)</div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 font-medium">
              विस्तृत बिंदुवार नोट्स • शॉर्टकट कुंजियाँ • बहुचयनात्मक, अतिलघु, लघु व निबंधात्मक प्रश्नोत्तर संग्रह
            </div>
          </div>
        )}

        {/* Tech Modules Printable Sections */}
        {exportMode === 'tech' && (
          <div className="space-y-12">
            {techModulesData.map((mod, modIdx) => (
              <div key={mod.id} className="print:page-break-after border-b-2 border-slate-400 pb-10 mb-10 last:border-b-0">
                {/* Module Header */}
                <div className="border-b-2 border-slate-800 pb-3 mb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase mb-1">
                    <span>तकनीकी मॉड्यूल {modIdx + 1} / {techModulesData.length}</span>
                    <span className="text-blue-900 font-mono">{mod.badge}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-950">
                    {mod.hindiName}
                  </h2>
                  <p className="text-xs text-slate-700 mt-1 italic">
                    {mod.overview}
                  </p>
                </div>

                {/* Module Sections */}
                <div className="space-y-6">
                  {mod.sections.map((sec, secIdx) => (
                    <div key={secIdx} className="space-y-3">
                      <h3 className="text-sm font-bold text-blue-950 pb-1 border-b border-slate-200">
                        {sec.title}
                      </h3>

                      {sec.subsections && sec.subsections.length > 0 ? (
                        <div className="space-y-4 pl-3">
                          {sec.subsections.map((sub, sIdx) => (
                            <div key={sIdx} className="space-y-1.5">
                              <h4 className="text-xs font-bold text-slate-900">
                                {sub.subtitle}
                              </h4>
                              <div className="space-y-1 pl-2">
                                {sub.content.map((point, pIdx) => (
                                  <p key={pIdx} className="text-xs text-slate-700 leading-relaxed">
                                    {point}
                                  </p>
                                ))}
                              </div>
                              {sub.codeSnippet && (
                                <pre className="p-2.5 bg-slate-100 rounded border border-slate-300 font-mono text-[11px] text-slate-800 overflow-x-auto my-1">
                                  <code>{sub.codeSnippet}</code>
                                </pre>
                              )}
                              {sub.table && (
                                <div className="overflow-x-auto my-2 border border-slate-300 rounded">
                                  <table className="w-full text-left text-[11px]">
                                    <thead className="bg-slate-100 font-bold border-b border-slate-300">
                                      <tr>
                                        {sub.table.headers.map((h, hIdx) => (
                                          <th key={hIdx} className="p-1.5">{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200">
                                      {sub.table.rows.map((row, rIdx) => (
                                        <tr key={rIdx}>
                                          {row.map((cell, cIdx) => (
                                            <td key={cIdx} className="p-1.5 text-slate-700">{cell}</td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        sec.points && (
                          <div className="space-y-1 pl-3">
                            {sec.points.map((p, pIdx) => (
                              <p key={pIdx} className="text-xs text-slate-700 leading-relaxed">
                                {p}
                              </p>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                  ))}

                  {/* Shortcuts Table */}
                  {mod.shortcutsTable && mod.shortcutsTable.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-300">
                      <h4 className="text-xs font-bold text-slate-900 mb-2">
                        महत्वपूर्ण शॉर्टकट कुंजियाँ एवं कमांड्स:
                      </h4>
                      <table className="w-full text-left text-[11px] border border-slate-300 border-collapse">
                        <thead className="bg-slate-100 font-bold border-b border-slate-300">
                          <tr>
                            <th className="p-1.5 w-1/4">कुंजी / कमांड</th>
                            <th className="p-1.5 w-1/3">कार्य</th>
                            <th className="p-1.5">विवरण</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {mod.shortcutsTable.map((item, idx) => (
                            <tr key={idx}>
                              <td className="p-1.5 font-bold font-mono text-blue-900">{item.shortcut}</td>
                              <td className="p-1.5 font-medium">{item.action}</td>
                              <td className="p-1.5 text-slate-600">{item.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Q&A Section */}
                  <div className="mt-6 pt-4 border-t-2 border-slate-300 space-y-4">
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">
                      {mod.hindiName} - महत्वपूर्ण प्रश्नोत्तर संग्रह
                    </h4>

                    {/* MCQs */}
                    {mod.mcqs.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-blue-900">वस्तुनिष्ठ प्रश्न:</p>
                        {mod.mcqs.map((m, idx) => (
                          <div key={m.id} className="text-xs pl-2 border-l-2 border-blue-200">
                            <p className="font-semibold text-slate-900">
                              प्र. {idx + 1}. {m.question}
                            </p>
                            <p className="text-emerald-800 font-bold mt-0.5">
                              उत्तर: ({m.correctOption}) - {m.options[m.correctOption]} 
                              <span className="text-slate-600 font-normal ml-2">({m.explanation})</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Very Short & Short */}
                    {mod.veryShortQuestions.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <p className="text-xs font-bold text-indigo-900">अतिलघुउत्तरात्मक प्रश्नोत्तर:</p>
                        {mod.veryShortQuestions.map((q, idx) => (
                          <div key={q.id} className="text-xs pl-2 border-l-2 border-indigo-200">
                            <p className="font-semibold text-slate-900">प्र. {idx + 1}. {q.question}</p>
                            <p className="text-slate-700 mt-0.5"><strong>उत्तर:</strong> {q.answer}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {mod.shortQuestions.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <p className="text-xs font-bold text-amber-900">लघुउत्तरात्मक प्रश्नोत्तर:</p>
                        {mod.shortQuestions.map((q, idx) => (
                          <div key={q.id} className="text-xs pl-2 border-l-2 border-amber-200">
                            <p className="font-semibold text-slate-900">प्र. {idx + 1}. {q.question}</p>
                            <p className="text-slate-700 mt-0.5"><strong>उत्तर:</strong> {q.answer}</p>
                            {q.points && (
                              <ul className="list-disc list-inside pl-2 text-[11px] text-slate-700 mt-1">
                                {q.points.map((p, pIdx) => (
                                  <li key={pIdx}>{p}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Excel Formulas Encyclopedia Printable View */}
        {exportMode === 'excel' && (
          <div className="py-6">
            {/* Header */}
            <div className="text-center py-8 border-b-2 border-slate-900 mb-8">
              <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-1">
                पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी
              </div>
              <h1 className="text-2xl font-black text-slate-950 mb-1">
                माइक्रोसॉफ्ट एक्सेल (MS Excel): संपूर्ण फॉर्मूला महाकोश
              </h1>
              <p className="text-xs font-semibold text-slate-700">
                100+ आवश्यक एक्सेल सूत्र, सिंटेक्स, हिंदी विवरण, व्यावहारिक उदाहरण, शॉर्टकट्स व त्रुटि समाधान गाइड
              </p>
            </div>

            {/* Error Guide Table */}
            <div className="mb-8 p-4 bg-slate-50 border border-slate-300 rounded-xl">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                एक्सेल सामान्य त्रुटियाँ एवं उनके समाधान (Excel Errors Cheat Sheet)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-300">
                  <thead className="bg-slate-200">
                    <tr>
                      <th className="border border-slate-300 p-1.5 w-24">एरर कोड</th>
                      <th className="border border-slate-300 p-1.5">त्रुटि का कारण</th>
                      <th className="border border-slate-300 p-1.5">निवारण / समाधान</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excelErrorGuide.map((err, i) => (
                      <tr key={i} className="border-b border-slate-200">
                        <td className="border border-slate-300 p-1.5 font-mono font-bold text-rose-800">{err.error}</td>
                        <td className="border border-slate-300 p-1.5">{err.reasonHindi}</td>
                        <td className="border border-slate-300 p-1.5 font-medium text-emerald-900">{err.solutionHindi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Formulas Table */}
            <div className="space-y-6">
              <h3 className="text-sm font-extrabold text-slate-950 border-b border-slate-400 pb-1">
                एक्सेल प्रमुख 100+ सूत्रों की विस्तृत तालिका (Formula Reference Table)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-300">
                  <thead className="bg-slate-100 font-bold text-slate-900">
                    <tr>
                      <th className="border border-slate-300 p-2 w-28">सूत्र नाम</th>
                      <th className="border border-slate-300 p-2 w-20">श्रेणी</th>
                      <th className="border border-slate-300 p-2">कार्य विवरण (हिंदी)</th>
                      <th className="border border-slate-300 p-2 font-mono">सिंटेक्स (Syntax)</th>
                      <th className="border border-slate-300 p-2 font-mono">उदाहरण व परिणाम</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {allExcelFormulas.map((f) => (
                      <tr key={f.id} className="hover:bg-slate-50 print:break-inside-avoid">
                        <td className="border border-slate-300 p-1.5 font-mono font-extrabold text-blue-900">
                          ={f.name}()
                        </td>
                        <td className="border border-slate-300 p-1.5 text-[11px] font-semibold text-slate-600">
                          {f.categoryHindi}
                        </td>
                        <td className="border border-slate-300 p-1.5 text-slate-800 font-medium">
                          {f.purposeHindi}
                          <div className="text-[10px] text-amber-900 mt-0.5">💡 {f.hotTip}</div>
                        </td>
                        <td className="border border-slate-300 p-1.5 font-mono text-[11px] text-slate-900 bg-slate-50">
                          {f.syntax}
                        </td>
                        <td className="border border-slate-300 p-1.5 font-mono text-[11px] text-emerald-900">
                          {f.example} = <strong>{f.result}</strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-[10px] text-slate-500 pt-8 mt-6 border-t border-slate-300">
              पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी | कम्प्यूटर विज्ञान एवं स्प्रेडशीट कौशल संदर्भ
            </div>
          </div>
        )}

        {/* Quick Revision Section at the end of PDF */}
        {(exportMode === 'all' || exportMode === 'revision') && (
          <div className="pt-8 border-t-2 border-slate-900 print:page-break-before space-y-8">
            <div className="text-center pb-2 border-b-2 border-slate-800">
              <h2 className="text-xl font-black text-slate-950">
                परिशिष्ट: त्वरित स्मरण एवं परीक्षा सूत्र तालिका
              </h2>
              <p className="text-xs text-slate-600">
                सम्पूर्ण पुस्तक के महत्वपूर्ण संक्षिप्ताक्षर, शॉर्टकट कीज एवं भारतीय IPR अधिनियम
              </p>
            </div>

            {/* Full Forms Table */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                1. महत्वपूर्ण संक्षिप्ताक्षर (Important Full Forms)
              </h3>
              <div className="overflow-hidden rounded border border-slate-300">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-900">
                      <th className="p-2 w-24">संक्षिप्त नाम</th>
                      <th className="p-2">पूर्ण रूप (Full Form)</th>
                      <th className="p-2">विवरण व कार्य</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {fullFormsList.slice(0, 32).map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-1.5 font-bold text-blue-900">{item.abbr}</td>
                        <td className="p-1.5 font-semibold text-slate-900">{item.fullForm}</td>
                        <td className="p-1.5 text-slate-700">{item.hindiMeaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shortcuts */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                2. महत्वपूर्ण शॉर्टकट कुंजियाँ (Key Keyboard Shortcuts)
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {shortcutsList.slice(0, 18).map((s, idx) => (
                  <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded flex justify-between items-center">
                    <span className="text-slate-800">{s.action}</span>
                    <span className="font-mono font-bold text-blue-900 bg-white px-2 py-0.5 border border-slate-300 rounded text-[11px]">
                      {s.key}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indian IPR Acts */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                3. भारत के 8 बौद्धिक सम्पदा अधिकार अधिनियम (Indian IPR Acts)
              </h3>
              <div className="overflow-hidden rounded border border-slate-300">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-900">
                      <th className="p-2 w-10">क्र.</th>
                      <th className="p-2">अधिनियम का नाम (Act Name)</th>
                      <th className="p-2">संरक्षण का क्षेत्र</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {indianIPRActs.map(act => (
                      <tr key={act.no}>
                        <td className="p-1.5 text-center font-bold text-slate-500">{act.no}</td>
                        <td className="p-1.5 font-semibold text-slate-900">{act.hindi} ({act.act})</td>
                        <td className="p-1.5 text-slate-700">{act.scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer note */}
            <div className="text-center text-[10px] text-slate-500 pt-6 border-t border-slate-300">
              कक्षा 9 कम्प्यूटर (सूचना प्रौद्योगिकी की अवधारणा-I) | राजस्थान माध्यमिक शिक्षा बोर्ड अजमेर | सम्पूर्ण अध्ययन सामग्री
            </div>
          </div>
        )}
        </>
      )}
      </div>
    </div>
  );
};
