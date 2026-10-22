import React, { useState } from 'react';
import { techModulesData, TechModule } from '../data/techModulesData';
import { ExcelFormulaMaster } from './ExcelFormulaMaster';
import { 
  FileText, 
  Table, 
  Presentation, 
  Code, 
  Palette, 
  Braces, 
  Terminal, 
  Database,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp,
  Bookmark,
  FileCheck,
  BookOpen,
  Zap,
  ListOrdered
} from 'lucide-react';

interface TechModulesViewProps {
  onTakeCertExam: (moduleId?: string) => void;
}

export const TechModulesView: React.FC<TechModulesViewProps> = ({ onTakeCertExam }) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('ms-word');
  const [activeTab, setActiveTab] = useState<'notes' | 'qa' | 'quiz' | 'summary' | 'formulas'>('notes');
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<string | null>(null);
  
  // Interactive Quiz state
  const [userQuizAnswers, setUserQuizAnswers] = useState<{ [qId: number]: string }>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  // Q&A accordion states
  const [expandedQA, setExpandedQA] = useState<{ [key: string]: boolean }>({});

  const currentModule = techModulesData.find(m => m.id === selectedModuleId) || techModulesData[0];

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(id);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const toggleQA = (key: string) => {
    setExpandedQA(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getModuleIcon = (id: string, className = "w-5 h-5") => {
    switch (id) {
      case 'ms-word': return <FileText className={`${className} text-blue-600`} />;
      case 'ms-excel': return <Table className={`${className} text-emerald-600`} />;
      case 'ms-powerpoint': return <Presentation className={`${className} text-orange-600`} />;
      case 'html': return <Code className={`${className} text-rose-600`} />;
      case 'css': return <Palette className={`${className} text-indigo-600`} />;
      case 'javascript': return <Braces className={`${className} text-amber-600`} />;
      case 'python': return <Terminal className={`${className} text-cyan-600`} />;
      case 'database': return <Database className={`${className} text-purple-600`} />;
      default: return <Code className={`${className} text-slate-600`} />;
    }
  };

  const calculateScore = () => {
    let score = 0;
    currentModule.quiz.forEach(q => {
      if (userQuizAnswers[q.id] === q.correctOption) score++;
    });
    return score;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>प्रैक्टिकल ऑफिस टूल्स एवं आधुनिक कोडिंग पाठ्यक्रम</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              MS Office, Web Development, Python & Database
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              अध्यायों की तरह ही सम्पूर्ण विस्तृत नोट्स, कोड सिंटेक्स, शॉर्टकट टेबल्स, वस्तुनिष्ठ प्रश्न, अतिलघु, लघु व दीर्घउत्तरात्मक प्रश्नोत्तर बैंक।
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              onClick={() => {
                setSelectedModuleId('ms-excel');
                setActiveTab('formulas');
              }}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Table className="w-4 h-4 text-emerald-950" />
              <span>🧮 एक्सेल फॉर्मूला महाकोश (100+ Formulas)</span>
            </button>

            <button
              onClick={() => onTakeCertExam(currentModule.id)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-lg transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Award className="w-4 h-4 text-amber-950" />
              <span>स्कूल प्रमाण-पत्र परीक्षा दें</span>
            </button>
          </div>
        </div>

        {/* 8 Tech Modules Grid Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mt-6 pt-5 border-t border-white/10">
          {techModulesData.map(mod => {
            const isSelected = mod.id === selectedModuleId;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  setSelectedModuleId(mod.id);
                  setUserQuizAnswers({});
                  setShowQuizResults(false);
                }}
                className={`p-2.5 rounded-xl text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white text-slate-950 shadow-lg font-bold scale-[1.03] ring-2 ring-amber-400'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="mb-2">
                  {getModuleIcon(mod.id)}
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">
                    {mod.badge}
                  </span>
                  <span className="text-xs font-bold truncate block">
                    {mod.name.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Module Header Bar */}
        <div className="p-6 sm:p-8 bg-slate-50/70 border-b border-slate-200/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
                {getModuleIcon(currentModule.id, "w-7 h-7")}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-md">
                    {currentModule.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {currentModule.name}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentModule.hindiName}
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-1 max-w-3xl leading-relaxed">
                  {currentModule.overview}
                </p>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-2 self-start md:self-auto bg-white px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
              <span>{currentModule.sections.length} मुख्य खंड</span>
              <span>•</span>
              <span>{currentModule.shortcutsTable.length} शॉर्टकट्स</span>
              <span>•</span>
              <span className="text-blue-700">{currentModule.mcqs.length + currentModule.veryShortQuestions.length + currentModule.shortQuestions.length + currentModule.longQuestions.length} प्रश्नोत्तर</span>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pt-2 border-t border-slate-200/60">
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'notes'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>संपूर्ण पाठ नोट्स (Notes)</span>
            </button>

            <button
              onClick={() => setActiveTab('qa')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'qa'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>प्रश्नोत्तर बैंक (Q&A Bank)</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'quiz'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>प्रैक्टिस क्विज़ (Quiz)</span>
            </button>

            <button
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === 'summary'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>मुख्य स्मरणीय बिंदु (Key Points)</span>
            </button>

            {selectedModuleId === 'ms-excel' && (
              <button
                onClick={() => setActiveTab('formulas')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  activeTab === 'formulas'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-sm ring-2 ring-emerald-400/40'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold'
                }`}
              >
                <Table className="w-3.5 h-3.5 text-emerald-600" />
                <span>🧮 फॉर्मूला महाकोश (100+ Formulas)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Detailed Notes */}
        {activeTab === 'notes' && (
          <div className="p-6 sm:p-8 space-y-8">
            {/* Sections */}
            {currentModule.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-5 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {sIdx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {section.title}
                  </h3>
                </div>

                {/* Subsections if present */}
                {section.subsections && section.subsections.length > 0 ? (
                  <div className="space-y-5 pl-2 sm:pl-4">
                    {section.subsections.map((sub, subIdx) => (
                      <div key={subIdx} className="space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                        <h4 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          <span>{sub.subtitle}</span>
                        </h4>

                        <div className="space-y-1.5 pl-3">
                          {sub.content.map((point, pIdx) => (
                            <p key={pIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                              {point}
                            </p>
                          ))}
                        </div>

                        {/* Callout box */}
                        {sub.callout && (
                          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-semibold text-amber-900 flex items-center gap-2 mt-2">
                            <span>💡</span>
                            <span>{sub.callout}</span>
                          </div>
                        )}

                        {/* Code Snippet */}
                        {sub.codeSnippet && (
                          <div className="mt-3 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-200">
                            <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                              <span>कोड सिंटेक्स / फॉर्मूला</span>
                              <button
                                onClick={() => handleCopy(sub.codeSnippet!, `sub-${sIdx}-${subIdx}`)}
                                className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-sans"
                              >
                                {copiedCodeIndex === `sub-${sIdx}-${subIdx}` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400">कॉपी हुआ!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>कॉपी करें</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <pre className="p-3.5 text-xs font-mono overflow-x-auto leading-relaxed text-emerald-400">
                              <code>{sub.codeSnippet}</code>
                            </pre>
                          </div>
                        )}

                        {/* Structured Table */}
                        {sub.table && (
                          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                                <tr>
                                  {sub.table.headers.map((h, hIdx) => (
                                    <th key={hIdx} className="p-2.5">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white">
                                {sub.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className="hover:bg-slate-50">
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className="p-2.5 text-slate-700 font-medium">
                                        {cell}
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
                ) : (
                  /* Direct points fallback */
                  section.points && (
                    <div className="space-y-2 pl-4">
                      {section.points.map((p, pIdx) => (
                        <p key={pIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  )
                )}
              </div>
            ))}

            {/* Shortcuts & Command Table */}
            {currentModule.shortcutsTable && currentModule.shortcutsTable.length > 0 && (
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    प्रमुख शॉर्टकट कुंजियाँ एवं कमांड्स तालिका
                  </h3>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-white font-bold">
                      <tr>
                        <th className="p-3 w-1/4">कुंजी / कमांड (Shortcut)</th>
                        <th className="p-3 w-1/3">कार्य (Action)</th>
                        <th className="p-3">विवरण (Description)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-medium">
                      {currentModule.shortcutsTable.map((item, idx) => (
                        <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                          <td className="p-3 font-mono font-bold text-blue-700">
                            <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {item.shortcut}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">{item.action}</td>
                          <td className="p-3 text-slate-600">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Full Q&A Bank */}
        {activeTab === 'qa' && (
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* 1. Multiple Choice Questions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <ListOrdered className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  खण्ड 'अ': वस्तुनिष्ठ / बहुचयनात्मक प्रश्न (MCQs)
                </h3>
              </div>

              <div className="space-y-4">
                {currentModule.mcqs.map((mcq, idx) => {
                  const qaKey = `mcq-${mcq.id}`;
                  const isAnswerVisible = expandedQA[qaKey];

                  return (
                    <div key={mcq.id} className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all shadow-xs space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                          <span className="text-blue-600 mr-1.5">प्र. {idx + 1}.</span>
                          {mcq.question}
                        </h4>
                        <button
                          onClick={() => toggleQA(qaKey)}
                          className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1"
                        >
                          <span>{isAnswerVisible ? 'उत्तर छुपाएँ' : 'उत्तर देखें'}</span>
                          {isAnswerVisible ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {Object.entries(mcq.options).map(([optKey, optVal]) => (
                          <div 
                            key={optKey} 
                            className={`p-2 rounded-lg border font-medium ${
                              isAnswerVisible && optKey === mcq.correctOption 
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' 
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="font-bold mr-1.5">({optKey})</span>
                            {optVal}
                          </div>
                        ))}
                      </div>

                      {isAnswerVisible && (
                        <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium">
                          <p className="font-bold text-emerald-900">
                            सही उत्तर: ({mcq.correctOption}) - {mcq.options[mcq.correctOption]}
                          </p>
                          <p className="mt-1 text-slate-700">
                            <strong>व्याख्या:</strong> {mcq.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Very Short Questions */}
            {currentModule.veryShortQuestions.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <FileCheck className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    खण्ड 'ब': अतिलघुउत्तरात्मक प्रश्नोत्तर (Very Short Answer Type)
                  </h3>
                </div>

                <div className="space-y-3">
                  {currentModule.veryShortQuestions.map((q, idx) => {
                    const qaKey = `vs-${q.id}`;
                    const isOpen = expandedQA[qaKey] !== false; // default open

                    return (
                      <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            <span className="text-indigo-600 mr-1.5">प्र. {idx + 1}.</span>
                            {q.question}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 font-medium pl-4 border-l-2 border-indigo-400 bg-white p-2.5 rounded-r-lg">
                          <strong>उत्तर:</strong> {q.answer}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Short Questions */}
            {currentModule.shortQuestions.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    खण्ड 'स': लघुउत्तरात्मक प्रश्नोत्तर (Short Answer Type)
                  </h3>
                </div>

                <div className="space-y-3">
                  {currentModule.shortQuestions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        <span className="text-amber-600 mr-1.5">प्र. {idx + 1}.</span>
                        {q.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        {q.answer}
                      </p>
                      {q.points && q.points.length > 0 && (
                        <div className="space-y-1 pl-4 mt-2 border-l-2 border-amber-300">
                          {q.points.map((p, pIdx) => (
                            <p key={pIdx} className="text-xs text-slate-700">
                              {p}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Long Essay Questions */}
            {currentModule.longQuestions.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <Award className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    खण्ड 'द': दीर्घउत्तरात्मक / निबंधात्मक प्रश्नोत्तर (Essay Type)
                  </h3>
                </div>

                <div className="space-y-4">
                  {currentModule.longQuestions.map((q, idx) => (
                    <div key={q.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                      <h4 className="text-sm font-bold text-slate-900">
                        <span className="text-emerald-700 mr-1.5">प्र. {idx + 1}.</span>
                        {q.question}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-700 font-medium">
                        {q.answer}
                      </p>
                      {q.points && q.points.length > 0 && (
                        <div className="space-y-2 pl-4 border-l-2 border-emerald-400 bg-emerald-50/30 p-3 rounded-r-xl">
                          {q.points.map((p, pIdx) => (
                            <p key={pIdx} className="text-xs text-slate-800 leading-relaxed">
                              {p}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Tab 3: Interactive Practice Quiz */}
        {activeTab === 'quiz' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {currentModule.name} - ऑनलाइन स्व-मूल्यांकन क्विज़
                </h3>
                <p className="text-xs text-slate-500">
                  सभी प्रश्नों के उत्तर देकर तुरंत अपना परिणाम और फीडबैक देखें।
                </p>
              </div>

              {showQuizResults && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    स्कोर: {calculateScore()} / {currentModule.quiz.length}
                  </span>
                  <button
                    onClick={() => {
                      setUserQuizAnswers({});
                      setShowQuizResults(false);
                    }}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    पुनः प्रयास करें
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {currentModule.quiz.map((q, idx) => (
                <div key={q.id} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    <span className="text-blue-600 mr-2">प्रश्न {idx + 1}.</span>
                    {q.question}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {Object.entries(q.options).map(([optKey, optVal]) => {
                      const isSelected = userQuizAnswers[q.id] === optKey;
                      const isCorrect = optKey === q.correctOption;

                      let btnStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';
                      if (isSelected) {
                        btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-bold';
                      }
                      if (showQuizResults) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through';
                        }
                      }

                      return (
                        <button
                          key={optKey}
                          onClick={() => {
                            if (!showQuizResults) {
                              setUserQuizAnswers(prev => ({ ...prev, [q.id]: optKey }));
                            }
                          }}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <div>
                            <span className="font-bold mr-2">({optKey})</span>
                            <span>{optVal}</span>
                          </div>
                          {showQuizResults && isCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {showQuizResults && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                      <strong>व्याख्या:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-xs text-slate-500">
                उत्तर दिए गए: {Object.keys(userQuizAnswers).length} / {currentModule.quiz.length}
              </span>

              {!showQuizResults ? (
                <button
                  onClick={() => setShowQuizResults(true)}
                  disabled={Object.keys(userQuizAnswers).length === 0}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold shadow-md transition-all"
                >
                  परिणाम देखें (Submit Quiz)
                </button>
              ) : (
                <button
                  onClick={() => onTakeCertExam(currentModule.id)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>प्रमाण-पत्र प्राप्त करें</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Summary & Key Points */}
        {activeTab === 'summary' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Zap className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900">
                {currentModule.hindiName} - मुख्य स्मरणीय सूत्र व बिंदु
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {currentModule.keyPoints.map((point, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Excel Formulas Encyclopedia */}
        {activeTab === 'formulas' && (
          <div className="p-2 sm:p-6 bg-slate-50/50">
            <ExcelFormulaMaster onBackToNotes={() => setActiveTab('notes')} />
          </div>
        )}

      </div>
    </div>
  );
};
