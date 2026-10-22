import React from 'react';
import { Chapter, StudySubject } from '../types/study';
import { ChapterProgress } from '../hooks/useStudyProgress';
import { DailyChallengeWidget } from './DailyChallengeWidget';
import { StudyPlannerWidget } from './StudyPlannerWidget';
import { StudyStreakWidget } from './StudyStreakWidget';
import { 
  BookOpen, 
  ChevronRight, 
  FileText, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  BarChart3,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

interface TableOfContentsProps {
  chapters: Chapter[];
  currentSubject?: StudySubject;
  onSelectChapter: (chapter: Chapter) => void;
  onOpenRevision: () => void;
  onOpenPrint: () => void;
  onOpenQuiz?: () => void;
  onOpenExcelFormulas?: () => void;
  onOpenCertificate?: () => void;
  onOpenMeritList?: () => void;
  onOpenFlashcards?: () => void;
  getChapterProgress: (chapter: Chapter) => ChapterProgress;
  overallProgress: ChapterProgress;
  onResetAllProgress: () => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  chapters,
  currentSubject,
  onSelectChapter,
  onOpenRevision,
  onOpenPrint,
  onOpenQuiz,
  onOpenExcelFormulas,
  onOpenCertificate,
  onOpenMeritList,
  onOpenFlashcards,
  getChapterProgress,
  overallProgress,
  onResetAllProgress
}) => {
  // Group chapters by unit
  const unitsMap = new Map<number, { title: string; chapters: Chapter[] }>();
  
  chapters.forEach(ch => {
    if (!unitsMap.has(ch.unitId)) {
      unitsMap.set(ch.unitId, {
        title: ch.unitName,
        chapters: []
      });
    }
    unitsMap.get(ch.unitId)!.chapters.push(ch);
  });

  const totalMCQs = chapters.reduce((sum, ch) => sum + ch.mcqs.length, 0);
  const totalQuestions = chapters.reduce(
    (sum, ch) => sum + ch.mcqs.length + ch.veryShortQuestions.length + ch.shortQuestions.length + ch.longQuestions.length, 
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Luxury Royal Textbook Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#091535] to-[#04091a] rounded-3xl p-6 md:p-9 text-white shadow-2xl mb-8 border-2 border-[#d4af37]/45">
        {/* Subtle Luxury Radial Gold & Blue Glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'radial-gradient(ellipse at 15% 20%, #d4af37 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, #3b82f6 0%, transparent 50%)'
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
            <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold border border-amber-400/35 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>माध्यमिक शिक्षा बोर्ड राजस्थान, अजमेर (RBSE)</span>
              </div>
              {/* Subject Indicator Badge */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border shadow-xs ${
                currentSubject === 'sanskrit'
                  ? 'bg-amber-400/25 text-amber-200 border-amber-400/50'
                  : 'bg-blue-500/20 text-blue-200 border-blue-400/50'
              }`}>
                <span>{currentSubject === 'sanskrit' ? '🕉️ सक्रिय विषय: संस्कृत (शेमुषी)' : '💻 सक्रिय विषय: कम्प्यूटर (सूचना प्रौद्योगिकी)'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-bold border border-blue-400/30">
                <span>पटेल आदर्श विद्या निकेतन, केकड़ी (सत्र 2026-27)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <span>{currentSubject === 'sanskrit' ? '🕉️ संस्कृत व हिन्दी व्याख्या' : '🇬🇧 English & 🇮🇳 हिंदी नोट्स उपलब्ध'}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2.5 bg-gradient-to-r from-amber-100 via-white to-amber-200 bg-clip-text text-transparent">
              {currentSubject === 'sanskrit'
                ? 'शेमुषी - प्रथमो भागः (कक्षा 9 संस्कृत)'
                : 'सूचना प्रौद्योगिकी की अवधारणा - I (कक्षा 9)'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mb-5 leading-relaxed font-normal">
              {currentSubject === 'sanskrit'
                ? 'सम्पूर्ण 8 संस्कृत अध्यायों के अन्वय, सरल हिन्दी भावार्थ, शब्दार्थ, व्याकरण ज्ञान एवं वार्षिक परीक्षा हेतु प्रामाणिक प्रश्नोत्तर संग्रह।'
                : 'सम्पूर्ण 8 अध्यायों के विस्तृत नोट्स, स्पष्ट आरेख, 110+ MS Excel फॉर्मूले, त्वरित रिवीज़न तालिकाएं एवं वार्षिक परीक्षा हेतु प्रामाणिक प्रश्नोत्तर संग्रह।'}
            </p>

            {/* Quick Action Buttons inside Hero */}
            <div className="flex items-center gap-2.5 flex-wrap mb-4">
              <button
                onClick={onOpenCertificate}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#78350f] hover:from-[#d97706] hover:to-[#92400e] text-white text-xs font-extrabold shadow-lg border border-[#fef08a] transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>🎓 स्कूल प्रमाण-पत्र प्रिंट करें (Certificate ON)</span>
              </button>

              <button
                onClick={onOpenPrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 shadow-sm transition-all cursor-pointer"
              >
                <span>🖨️ सम्पूर्ण पुस्तक PDF प्रिंट</span>
              </button>

              {onOpenExcelFormulas && (
                <button
                  onClick={onOpenExcelFormulas}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-sm transition-all cursor-pointer"
                >
                  <span>📊 MS Excel फॉर्मूले (110+)</span>
                </button>
              )}

              {onOpenMeritList && (
                <button
                  onClick={onOpenMeritList}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold border border-emerald-400/50 shadow-md transition-all cursor-pointer ring-1 ring-emerald-300/40"
                  title="शिक्षकों हेतु कक्षा मेरिट लिस्ट व सम्पूर्ण मार्कशीट जनरेटर"
                >
                  <span>📋 कक्षा मेरिट लिस्ट व मार्कशीट</span>
                </button>
              )}

              {onOpenFlashcards && (
                <button
                  onClick={onOpenFlashcards}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 text-indigo-200 text-xs font-bold border border-indigo-400/50 shadow-md transition-all cursor-pointer ring-1 ring-indigo-300/40"
                  title="3D फ्लिप फ्लैशकार्ड्स (शब्दावली एवं सूत्र)"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>🗂️ 3D फ्लैशकार्ड्स</span>
                </button>
              )}
            </div>
          </div>

          {/* School Official Logo Medallion Badge */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#030919]/60 border-2 border-amber-400/40 backdrop-blur-md shadow-2xl shrink-0 self-center md:self-start">
            <img
              src="/assets/school-logo.svg"
              alt="पटेल आदर्श विद्या निकेतन (विद्या भारती) विद्यालय लोगो"
              className="w-20 h-24 sm:w-24 sm:h-28 object-contain filter drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]"
            />
            <span className="text-[10px] font-bold text-amber-300 mt-1.5 font-mono tracking-widest uppercase">विद्या भारती</span>
          </div>
        </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
            <div className="bg-white/5 rounded-2xl p-3.5 backdrop-blur-xs border border-white/10 shadow-xs">
              <span className="text-xs text-slate-400 block font-medium">कुल इकाइयाँ</span>
              <span className="text-xl font-black text-white">4 Units</span>
            </div>
            <div className="bg-white/5 rounded-2xl p-3.5 backdrop-blur-xs border border-amber-400/20 shadow-xs">
              <span className="text-xs text-amber-300/80 block font-medium">कुल अध्याय</span>
              <span className="text-xl font-black text-amber-400">8 Chapters</span>
            </div>
            <div className="bg-white/5 rounded-2xl p-3.5 backdrop-blur-xs border border-emerald-400/20 shadow-xs">
              <span className="text-xs text-emerald-300/80 block font-medium">हल प्रश्नोत्तर</span>
              <span className="text-xl font-black text-emerald-400">{totalQuestions}+ प्रश्न</span>
            </div>
            <div className="bg-white/5 rounded-2xl p-3.5 backdrop-blur-xs border border-blue-400/20 shadow-xs">
              <span className="text-xs text-blue-300/80 block font-medium">अध्ययन प्रगति</span>
              <span className="text-xl font-black text-emerald-300">{overallProgress.percentage}% पूर्ण</span>
            </div>
          </div>
        </div>

        {/* Decorative background ambient glows */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-20 top-0 w-60 h-60 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Overall Study Progress Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                आपकी संपूर्ण अध्ययन प्रगति (Overall Study Tracker)
              </h3>
              <p className="text-xs text-slate-500">
                कुल {overallProgress.total} विषयों में से {overallProgress.completed} विषय पढ़े जा चुके हैं
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
              {overallProgress.percentage}% पूर्ण
            </span>
            {overallProgress.completed > 0 && (
              <button
                onClick={onResetAllProgress}
                className="text-[11px] text-slate-400 hover:text-rose-600 p-1 flex items-center gap-1 transition-colors"
                title="सभी पाठों की प्रगति रीसेट करें"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">रीसेट</span>
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-600 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress.percentage}%` }}
          />
        </div>
      </div>

      {/* Daily Challenge Feature (One random question from entire syllabus each day to reinforce memory) */}
      <DailyChallengeWidget
        chapters={chapters}
        onSelectChapter={onSelectChapter}
      />

      {/* Study Streak Tracker (Consecutive Days Tracking & Milestones) */}
      <StudyStreakWidget
        onOpenNotes={() => onSelectChapter(chapters[0])}
        onOpenQuiz={onOpenQuiz}
      />

      {/* Study Planner Widget (7-Day / 14-Day Timeline with Daily Notifications) */}
      <StudyPlannerWidget
        chapters={chapters}
        onSelectChapter={onSelectChapter}
      />

      {/* Index Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-700" />
          <h2 className="text-base font-bold text-slate-900">
            विषय सूची (Table of Contents & Index)
          </h2>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenExcelFormulas}
            className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-950 text-xs font-bold transition-colors flex items-center gap-1.5 border border-emerald-300"
          >
            <span>🧮 एक्सेल फॉर्मूले</span>
          </button>
          {onOpenCertificate && (
            <button
              onClick={onOpenCertificate}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 text-xs font-black transition-all flex items-center gap-1.5 shadow-xs"
              title="पटेल आदर्श विद्या निकेतन का आधिकारिक प्रमाण-पत्र प्रिंट करें"
            >
              <span>🖨️ प्रमाण-पत्र प्रिंट (ON)</span>
            </button>
          )}
          <button
            onClick={onOpenRevision}
            className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>⚡ क्विक रिवीज़न शीट</span>
          </button>
          <button
            onClick={onOpenPrint}
            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>🖨️ संपूर्ण बुक PDF</span>
          </button>
        </div>
      </div>

      {/* Chapters list by Unit */}
      <div className="space-y-6">
        {Array.from(unitsMap.entries()).map(([unitId, unitData]) => (
          <div key={unitId} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            {/* Unit Header */}
            <div className="bg-slate-100/80 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  U{unitId}
                </span>
                <h3 className="text-sm font-bold text-slate-800">
                  {unitData.title}
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {unitData.chapters.length} पाठ
              </span>
            </div>

            {/* Chapters Grid */}
            <div className="divide-y divide-slate-100">
              {unitData.chapters.map(ch => {
                const totalQ = ch.mcqs.length + ch.veryShortQuestions.length + ch.shortQuestions.length + ch.longQuestions.length;
                const prog = getChapterProgress(ch);
                const isSanskritChapter = ch.subject === 'sanskrit' || ch.id >= 100 || currentSubject === 'sanskrit';

                return (
                  <div
                    key={ch.id}
                    onClick={() => onSelectChapter(ch)}
                    className="p-5 hover:bg-blue-50/40 transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-10 h-10 rounded-xl font-extrabold flex items-center justify-center shrink-0 transition-colors shadow-xs ${
                        isSanskritChapter
                          ? 'bg-amber-100 text-amber-900 group-hover:bg-amber-600 group-hover:text-white'
                          : 'bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white'
                      }`}>
                        {ch.chapterNumber}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                            isSanskritChapter ? 'text-amber-900 bg-amber-50' : 'text-blue-600 bg-blue-50'
                          }`}>
                            पाठ {ch.chapterNumber}
                          </span>
                          {/* Small Subject Badge next to chapter number */}
                          {isSanskritChapter ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              <span>🕉️</span>
                              <span>संस्कृत</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                              <span>💻</span>
                              <span>कम्प्यूटर</span>
                            </span>
                          )}
                          <span className="text-xs text-slate-400">
                            पृष्ठ संख्या: {ch.pageRange}
                          </span>
                          {/* Chapter progress badge */}
                          {prog.percentage > 0 && (
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                              prog.percentage === 100 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {prog.percentage === 100 ? '✓ पूर्ण' : `${prog.completed}/${prog.total} विषय (${prog.percentage}%)`}
                            </span>
                          )}
                        </div>

                        {/* Chapter Title with small colored Subject Badge directly next to it */}
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {ch.titleHindi}
                          </h4>
                          {isSanskritChapter ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
                              <span className="text-xs">🕉️</span>
                              <span>संस्कृत</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs">
                              <span className="text-xs">💻</span>
                              <span>कम्प्यूटर</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium mb-2">
                          {ch.titleEnglish}
                        </p>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-2">
                          {ch.overview}
                        </p>

                        {/* Mini Progress Bar for Chapter */}
                        <div className="w-48 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all ${
                              prog.percentage === 100 ? 'bg-emerald-600' : 'bg-blue-500'
                            }`}
                            style={{ width: `${prog.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stats & Jump Action */}
                    <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 justify-between md:justify-end">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                          <FileText className="w-3 h-3 text-slate-400" />
                          {ch.sections.length} विषय
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                          <HelpCircle className="w-3 h-3 text-emerald-500" />
                          {totalQ} प्रश्न
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

