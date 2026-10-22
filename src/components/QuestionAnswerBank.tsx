import React, { useState } from 'react';
import { MCQ, QAItem } from '../types/study';
import { 
  CheckCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Bookmark, 
  FileCheck,
  Search
} from 'lucide-react';

interface QuestionAnswerBankProps {
  chapterTitle: string;
  chapterNumber: number;
  mcqs: MCQ[];
  veryShort: QAItem[];
  short: QAItem[];
  longQuestions: QAItem[];
}

export const QuestionAnswerBank: React.FC<QuestionAnswerBankProps> = ({
  chapterTitle,
  chapterNumber,
  mcqs,
  veryShort,
  short,
  longQuestions
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'mcq' | 'vshort' | 'short' | 'long'>('all');
  const [revealedMCQs, setRevealedMCQs] = useState<{ [id: number]: boolean }>({});
  const [selectedUserOptions, setSelectedUserOptions] = useState<{ [id: number]: string }>({});
  const [expandedItems, setExpandedItems] = useState<{ [id: string]: boolean }>({});
  const [bookmarked, setBookmarked] = useState<{ [key: string]: boolean }>({});

  const toggleMCQReveal = (id: number) => {
    setRevealedMCQs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const selectOption = (mcqId: number, optionKey: string) => {
    setSelectedUserOptions(prev => ({ ...prev, [mcqId]: optionKey }));
    setRevealedMCQs(prev => ({ ...prev, [mcqId]: true }));
  };

  const toggleExpand = (key: string) => {
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleBookmark = (key: string) => {
    setBookmarked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalQuestions = mcqs.length + veryShort.length + short.length + longQuestions.length;

  return (
    <div className="space-y-6">
      {/* Q&A Section Header */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/60 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              अभ्यासार्थ प्रश्नोत्तर बैंक
            </span>
            <span className="text-xs text-slate-500 font-medium">
              पाठ्यपुस्तक के शत-प्रतिशत हल
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            पाठ {chapterNumber}: अभ्यास प्रश्न एवं आदर्श उत्तर
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            कुल {totalQuestions} प्रश्न: बहुचयनात्मक ({mcqs.length}), अतिलघुत्तरात्मक ({veryShort.length}), लघुत्तरात्मक ({short.length}), निबंधात्मक ({longQuestions.length})
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            सभी प्रश्न ({totalQuestions})
          </button>
          <button
            onClick={() => setActiveCategory('mcq')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'mcq'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            वस्तुनिष्ठ MCQ ({mcqs.length})
          </button>
          <button
            onClick={() => setActiveCategory('vshort')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'vshort'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            अतिलघु ({veryShort.length})
          </button>
          <button
            onClick={() => setActiveCategory('short')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'short'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            लघुत्तरात्मक ({short.length})
          </button>
          <button
            onClick={() => setActiveCategory('long')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'long'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            निबंधात्मक ({longQuestions.length})
          </button>
        </div>
      </div>

      {/* 1. Multiple Choice Questions (MCQs) */}
      {(activeCategory === 'all' || activeCategory === 'mcq') && mcqs.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
              A
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              1. बहुचयनात्मक प्रश्न (Multiple Choice Questions)
            </h4>
          </div>

          <div className="space-y-5">
            {mcqs.map((mcq, idx) => {
              const isRevealed = revealedMCQs[mcq.id];
              const userOpt = selectedUserOptions[mcq.id];
              const isCorrect = userOpt === mcq.correctOption;

              return (
                <div key={mcq.id} className="p-4 rounded-xl bg-slate-50/70 border border-slate-200">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                      <span className="text-blue-600 font-bold mr-1.5">प्र. {idx + 1}.</span>
                      {mcq.question}
                    </p>
                    <button
                      onClick={() => toggleBookmark(`mcq-${mcq.id}`)}
                      className={`text-slate-400 hover:text-amber-500 transition-colors shrink-0 p-1 ${
                        bookmarked[`mcq-${mcq.id}`] ? 'text-amber-500' : ''
                      }`}
                      title="महत्वपूर्ण मार्क करें"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {Object.entries(mcq.options).map(([key, val]) => {
                      const isOptionSelected = userOpt === key;
                      const isOptionAnswer = isRevealed && key === mcq.correctOption;
                      const isWrongSelected = isRevealed && isOptionSelected && !isCorrect;

                      return (
                        <button
                          key={key}
                          onClick={() => selectOption(mcq.id, key)}
                          className={`p-2.5 rounded-lg text-xs text-left transition-all flex items-center justify-between border ${
                            isOptionAnswer
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold'
                              : isWrongSelected
                              ? 'bg-rose-50 border-rose-300 text-rose-900 line-through'
                              : isOptionSelected
                              ? 'bg-blue-50 border-blue-400 text-blue-900 font-medium'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center shrink-0">
                              {key}
                            </span>
                            <span>{val}</span>
                          </span>
                          {isOptionAnswer && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Answer reveal toggle & explanation */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                    <button
                      onClick={() => toggleMCQReveal(mcq.id)}
                      className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                    >
                      <span>{isRevealed ? 'उत्तर छिपाएं' : 'सही उत्तर देखें'}</span>
                      {isRevealed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isRevealed && (
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        सही उत्तर: ({mcq.correctOption}) {mcq.options[mcq.correctOption]}
                      </span>
                    )}
                  </div>

                  {isRevealed && mcq.explanation && (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-xs text-blue-900">
                      💡 <strong>व्याख्या:</strong> {mcq.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Very Short Answer Questions */}
      {(activeCategory === 'all' || activeCategory === 'vshort') && veryShort.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
              B
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              2. अतिलघुत्तरात्मक प्रश्न (Very Short Answer Questions)
            </h4>
          </div>

          <div className="divide-y divide-slate-100 space-y-4">
            {veryShort.map((item, idx) => (
              <div key={item.id} className="pt-3 first:pt-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                    <span className="text-amber-700 mr-1.5">प्र. {idx + 1}.</span>
                    {item.question}
                  </h5>
                  <button
                    onClick={() => toggleBookmark(`vs-${item.id}`)}
                    className={`text-slate-400 hover:text-amber-500 p-0.5 ${
                      bookmarked[`vs-${item.id}`] ? 'text-amber-500' : ''
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium">
                  <span className="font-bold text-emerald-700 mr-1">उत्तर:</span>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Short Answer Questions */}
      {(activeCategory === 'all' || activeCategory === 'short') && short.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
              C
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              3. लघुत्तरात्मक प्रश्न (Short Answer Questions)
            </h4>
          </div>

          <div className="space-y-4">
            {short.map((item, idx) => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                    <span className="text-indigo-600 mr-1.5">प्र. {idx + 1}.</span>
                    {item.question}
                  </h5>
                  <button
                    onClick={() => toggleBookmark(`s-${item.id}`)}
                    className={`text-slate-400 hover:text-amber-500 p-0.5 ${
                      bookmarked[`s-${item.id}`] ? 'text-amber-500' : ''
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  <strong className="text-indigo-800 block mb-1">आदर्श उत्तर:</strong>
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Long / Essay Type Questions */}
      {(activeCategory === 'all' || activeCategory === 'long') && longQuestions.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
              D
            </span>
            <h4 className="text-sm font-bold text-slate-900">
              4. निबंधात्मक प्रश्न (Long Answer / Essay Type Questions)
            </h4>
          </div>

          <div className="space-y-5">
            {longQuestions.map((item, idx) => {
              const isExp = expandedItems[`long-${item.id}`] ?? true;

              return (
                <div key={item.id} className="rounded-xl border border-purple-200 overflow-hidden bg-purple-50/20">
                  <div 
                    onClick={() => toggleExpand(`long-${item.id}`)}
                    className="p-4 bg-purple-50/80 border-b border-purple-200 flex items-center justify-between cursor-pointer hover:bg-purple-100/70 transition-colors"
                  >
                    <h5 className="text-xs sm:text-sm font-bold text-purple-950 flex items-center gap-2">
                      <span className="text-purple-700 font-extrabold">प्र. {idx + 1}.</span>
                      <span>{item.question}</span>
                    </h5>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(`l-${item.id}`);
                        }}
                        className={`text-slate-400 hover:text-amber-500 p-1 ${
                          bookmarked[`l-${item.id}`] ? 'text-amber-500' : ''
                        }`}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                      {isExp ? <ChevronUp className="w-4 h-4 text-purple-700" /> : <ChevronDown className="w-4 h-4 text-purple-700" />}
                    </div>
                  </div>

                  {isExp && (
                    <div className="p-5 bg-white text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                      <strong className="text-purple-800 font-bold block mb-2 pb-1 border-b border-slate-100">
                        विस्तृत मॉडल उत्तर (Detailed Model Answer):
                      </strong>
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
