import React, { useState, useEffect } from 'react';
import { Chapter, StudyLanguage, StudySubject } from '../types/study';
import { getChapterInLanguage } from '../data/chapters';
import { DiagramViewer } from './DiagramViewer';
import { QuestionAnswerBank } from './QuestionAnswerBank';
import { ChapterProgress } from '../hooks/useStudyProgress';
import { useWebSpeech } from '../hooks/useWebSpeech';
import { SpeechPlayerBar } from './SpeechPlayerBar';
import { 
  BookOpen, 
  BarChart3, 
  ListChecks, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Circle,
  Printer, 
  CheckSquare, 
  RotateCcw,
  Languages,
  Award,
  Volume2,
  VolumeX,
  Play
} from 'lucide-react';

interface ChapterNotesViewProps {
  chapter: Chapter;
  currentSubject?: StudySubject;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onPrintChapter: () => void;
  chapterProgress: ChapterProgress;
  isTopicCompleted: (chapterId: number, sectionIdx: number, subIdx: number) => boolean;
  onToggleTopic: (chapterId: number, sectionIdx: number, subIdx: number) => void;
  onMarkChapterAll: (chapter: Chapter, markAsDone: boolean) => void;
  initialLanguage?: StudyLanguage;
  onLanguageChange?: (lang: StudyLanguage) => void;
  onOpenCertificate?: () => void;
}

export const ChapterNotesView: React.FC<ChapterNotesViewProps> = ({
  chapter,
  currentSubject,
  onPrevChapter,
  onNextChapter,
  hasPrev,
  hasNext,
  onPrintChapter,
  chapterProgress,
  isTopicCompleted,
  onToggleTopic,
  onMarkChapterAll,
  initialLanguage,
  onLanguageChange,
  onOpenCertificate
}) => {
  const isSanskrit = chapter.subject === 'sanskrit' || chapter.id >= 100 || currentSubject === 'sanskrit';
  const [subTab, setSubTab] = useState<'notes' | 'diagrams' | 'summary' | 'questions'>('notes');
  const [lang, setLang] = useState<StudyLanguage>(() => {
    if (initialLanguage) return initialLanguage;
    try {
      const saved = localStorage.getItem('rbse_study_preferred_language') as StudyLanguage;
      if (saved && (saved === 'hi' || saved === 'en' || saved === 'bilingual')) {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'hi';
  });

  // Web Speech API Hook
  const speech = useWebSpeech({ defaultRate: 1.0 });

  const handleLanguageSelect = (newLang: StudyLanguage) => {
    speech.stop();
    setLang(newLang);
    try {
      localStorage.setItem('rbse_study_preferred_language', newLang);
    } catch (e) {
      // ignore
    }
    if (onLanguageChange) onLanguageChange(newLang);
  };

  // Stop reading when chapter or subTab changes
  useEffect(() => {
    speech.stop();
  }, [chapter.id, subTab]);

  // Stop reading on component unmount
  useEffect(() => {
    return () => {
      speech.stop();
    };
  }, []);

  // Get active chapter in current language (handles both Computer and Sanskrit)
  const activeChapter = (chapter.id >= 100 || isSanskrit)
    ? chapter
    : getChapterInLanguage(chapter.id, lang);

  // Read Entire Chapter Aloud
  const handleReadAloudChapter = () => {
    if (speech.isSpeaking) {
      speech.stop();
      return;
    }

    const targetLang: 'hi' | 'en' = lang === 'en' ? 'en' : 'hi';
    const chapterHeading = lang === 'en' 
      ? `Chapter ${activeChapter.chapterNumber}: ${activeChapter.titleEnglish}.`
      : `पाठ ${activeChapter.chapterNumber}: ${activeChapter.titleHindi}.`;

    const overviewText = lang === 'en' 
      ? (activeChapter.overviewEnglish || activeChapter.overview) 
      : activeChapter.overview;

    const sectionsText = activeChapter.sections.map((sec, idx) => {
      const secTitle = `${lang === 'en' ? 'Section' : 'खंड'} ${idx + 1}: ${sec.title}.`;
      const subText = sec.subsections?.map(sub => {
        return `${sub.subtitle}. ${sub.content.join('. ')}.`;
      }).join(' ') || '';
      return `${secTitle} ${subText}`;
    }).join(' ');

    const fullText = `${chapterHeading} ${overviewText}. ${sectionsText}`;
    speech.speak(fullText, chapterHeading, targetLang);
  };

  // Read Chapter Overview Aloud
  const handleReadAloudOverview = () => {
    const targetLang: 'hi' | 'en' = lang === 'en' ? 'en' : 'hi';
    const title = lang === 'en' ? `${activeChapter.titleEnglish} - Overview` : `${activeChapter.titleHindi} - परिचय`;
    const overviewText = lang === 'en' 
      ? (activeChapter.overviewEnglish || activeChapter.overview) 
      : activeChapter.overview;
    speech.speak(overviewText, title, targetLang);
  };

  // Read Section Aloud
  const handleReadAloudSection = (secTitle: string, subsections: any[]) => {
    const targetLang: 'hi' | 'en' = lang === 'en' ? 'en' : 'hi';
    const subText = subsections?.map(sub => `${sub.subtitle}. ${sub.content.join('. ')}.`).join(' ') || '';
    const fullText = `${secTitle}. ${subText}`;
    speech.speak(fullText, secTitle, targetLang);
  };

  // Read Single Topic / Subsection Aloud
  const handleReadAloudTopic = (subTitle: string, points: string[], callout?: string) => {
    const targetLang: 'hi' | 'en' = lang === 'en' ? 'en' : 'hi';
    const calloutText = callout ? `विशेष ध्यान दें: ${callout}.` : '';
    const fullText = `${subTitle}. ${points.join('. ')}. ${calloutText}`;
    speech.speak(fullText, subTitle, targetLang);
  };

  // Read Key Points Summary Aloud
  const handleReadAloudSummary = () => {
    const targetLang: 'hi' | 'en' = lang === 'en' ? 'en' : 'hi';
    const title = lang === 'en' ? 'Key Revision Points' : 'मुख्य रिवीज़न बिंदु';
    const pointsText = activeChapter.keyPoints.join('. ');
    speech.speak(`${title}. ${pointsText}`, title, targetLang);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Chapter Banner with Executive Luxury Styling */}
      <div className="bg-white border-2 border-slate-200/90 hover:border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-sm mb-6 transition-all relative overflow-hidden">
        {/* Subtle royal gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-amber-400 to-indigo-600" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Subject Badge Chip */}
            {isSanskrit ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold border border-amber-300 shadow-2xs">
                <span>🕉️</span>
                <span>संस्कृत विषय</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-extrabold border border-blue-200 shadow-2xs">
                <span>💻</span>
                <span>कम्प्यूटर विषय</span>
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
              {lang === 'en' ? (activeChapter.unitEnglish || activeChapter.unitName) : activeChapter.unitHindi}
            </span>
            <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              पृष्ठ: {activeChapter.pageRange}
            </span>
            {lang === 'en' && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold border border-emerald-300">
                🇬🇧 English Notes Mode Active
              </span>
            )}
            {lang === 'bilingual' && (
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[10px] font-extrabold border border-purple-300">
                📖 Bilingual (द्विभाषी) Mode Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Language Selector Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-300 shadow-inner">
              <span className="text-[11px] font-bold text-slate-600 px-2 flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">भाषा:</span>
              </span>
              <button
                type="button"
                onClick={() => handleLanguageSelect('hi')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'hi'
                    ? 'bg-white text-blue-950 shadow-sm border border-slate-300 font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="हिंदी में नोट्स देखें"
              >
                🇮🇳 हिंदी
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSelect('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View complete notes in English"
              >
                🇬🇧 English
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSelect('bilingual')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'bilingual'
                    ? 'bg-indigo-600 text-white shadow-sm font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="हिंदी + English दोनों साथ देखें"
              >
                📖 द्विभाषी
              </button>
            </div>

            {/* WEB SPEECH API: Master Read Aloud Button */}
            <button
              onClick={handleReadAloudChapter}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                speech.isSpeaking
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 border-amber-300 ring-2 ring-amber-300/70 animate-pulse'
                  : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-600 text-white border-blue-400'
              }`}
              title={speech.isSpeaking ? 'वाचन बंद करें (Stop Read Aloud)' : 'पूरा अध्याय बोलकर सुनें (Read Aloud Chapter)'}
            >
              {speech.isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-950" />
                  <span>वाचन बंद करें</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>🎧 बोलकर सुनें (Read Aloud)</span>
                </>
              )}
            </button>

            <button
              onClick={onPrintChapter}
              className="px-3.5 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              title="इस पाठ को प्रिंट करें या PDF सेव करें"
            >
              <Printer className="w-3.5 h-3.5 text-blue-600" />
              <span>पाठ प्रिंट</span>
            </button>

            {onOpenCertificate && (
              <button
                onClick={onOpenCertificate}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-sm border border-amber-300 transition-all cursor-pointer"
                title="स्कूल प्रमाण-पत्र प्रिंट करें"
              >
                <Award className="w-3.5 h-3.5 text-slate-950" />
                <span>🎓 सर्टिफिकेट प्रिंट</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
                {lang === 'en' 
                  ? `Chapter ${activeChapter.chapterNumber}: ${activeChapter.titleEnglish}`
                  : `पाठ ${activeChapter.chapterNumber}: ${activeChapter.titleHindi}`}
              </h1>
              {/* Small Colored Subject Badge next to Chapter Title */}
              {isSanskrit ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs">
                  <span>🕉️</span>
                  <span>संस्कृत (Sanskrit)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 shadow-2xs">
                  <span>💻</span>
                  <span>कम्प्यूटर (Computer)</span>
                </span>
              )}
            </div>
            <p className="text-sm font-bold text-blue-700 mb-2">
              {lang === 'en' ? activeChapter.titleHindi : activeChapter.titleEnglish}
            </p>
          </div>

          {/* Quick Voice Read for Overview */}
          <button
            onClick={handleReadAloudOverview}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
            title="इस पाठ का परिचय बोलकर सुनें"
          >
            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
            <span>परिचय सुनें</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-5 whitespace-pre-line">
          {lang === 'en' ? (activeChapter.overviewEnglish || activeChapter.overview) : activeChapter.overview}
        </p>

        {/* Visual Progress Tracker Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {lang === 'en' ? 'Chapter Study Progress:' : 'अध्याय अध्ययन प्रगति (Study Progress):'}
                </span>
              </span>
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                chapterProgress.percentage === 100
                  ? 'bg-emerald-100 text-emerald-800'
                  : chapterProgress.percentage > 0
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-200 text-slate-700'
              }`}>
                {chapterProgress.completed} / {chapterProgress.total} {lang === 'en' ? 'topics completed' : 'विषय पूरे'} ({chapterProgress.percentage}%)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {chapterProgress.percentage < 100 ? (
                <button
                  onClick={() => onMarkChapterAll(chapter, true)}
                  className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 bg-white hover:bg-blue-50 px-2.5 py-1 rounded-md border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>{lang === 'en' ? 'Mark All Done' : 'सभी विषय पूरे मार्क करें'}</span>
                </button>
              ) : (
                <button
                  onClick={() => onMarkChapterAll(chapter, false)}
                  className="text-[11px] font-semibold text-slate-600 hover:text-slate-800 bg-white hover:bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lang === 'en' ? 'Reset Progress' : 'प्रगति रीसेट करें'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full transition-all duration-500 ${
                chapterProgress.percentage === 100
                  ? 'bg-emerald-600'
                  : chapterProgress.percentage >= 50
                  ? 'bg-blue-600'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${chapterProgress.percentage}%` }}
            />
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-100 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSubTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              subTab === 'notes'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Detailed Notes' : 'विस्तृत नोट्स (Master Notes)'}</span>
          </button>

          {activeChapter.diagrams.length > 0 && (
            <button
              onClick={() => setSubTab('diagrams')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                subTab === 'diagrams'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? `Diagrams (${activeChapter.diagrams.length})` : `रेखाचित्र (${activeChapter.diagrams.length})`}</span>
            </button>
          )}

          <button
            onClick={() => setSubTab('summary')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              subTab === 'summary'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ListChecks className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? `Key Points (${activeChapter.keyPoints.length})` : `महत्वपूर्ण बिंदु (${activeChapter.keyPoints.length})`}</span>
          </button>

          <button
            onClick={() => setSubTab('questions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              subTab === 'questions'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>
              {lang === 'en' 
                ? `Practice Q&A (${activeChapter.mcqs.length + activeChapter.veryShortQuestions.length + activeChapter.shortQuestions.length + activeChapter.longQuestions.length})`
                : `अभ्यास प्रश्नोत्तर (${activeChapter.mcqs.length + activeChapter.veryShortQuestions.length + activeChapter.shortQuestions.length + activeChapter.longQuestions.length})`}
            </span>
          </button>
        </div>
      </div>

      {/* 1. Sub-Tab: Detailed Notes */}
      {subTab === 'notes' && (
        <div className="space-y-8">
          {activeChapter.sections.map((section, sIdx) => (
            <div key={sIdx} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between gap-3 pb-3 mb-5 border-b border-slate-200 flex-wrap">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 text-sm font-bold flex items-center justify-center shrink-0">
                    {sIdx + 1}
                  </span>
                  <span>{section.title}</span>
                </h2>

                {/* Read Aloud Entire Section */}
                <button
                  onClick={() => handleReadAloudSection(section.title, section.subsections || [])}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
                  title="इस पूरे खंड को बोलकर सुनें"
                >
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{lang === 'en' ? 'Read Section' : 'खंड सुनें'}</span>
                </button>
              </div>

              <div className="space-y-6">
                {section.subsections?.map((sub, subIdx) => {
                  const completed = isTopicCompleted(activeChapter.id, sIdx, subIdx);

                  return (
                    <div 
                      key={subIdx} 
                      className={`space-y-3 p-4 rounded-xl border transition-all ${
                        completed 
                          ? 'bg-emerald-50/30 border-emerald-200' 
                          : 'bg-transparent border-transparent hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${completed ? 'bg-emerald-600' : 'bg-blue-600'}`} />
                          <span className={completed ? 'text-emerald-950 font-extrabold' : 'text-slate-900'}>
                            {sub.subtitle}
                          </span>
                        </h3>

                        <div className="flex items-center gap-2 shrink-0">
                          {/* Read Aloud This Topic */}
                          <button
                            onClick={() => handleReadAloudTopic(sub.subtitle, sub.content, sub.callout)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-blue-50 border border-slate-200 transition-colors cursor-pointer"
                            title="इस विषय को बोलकर सुनें (Read Aloud)"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Interactive "Mark as Studied" checkbox button */}
                          <button
                            onClick={() => onToggleTopic(activeChapter.id, sIdx, subIdx)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                              completed
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                            }`}
                            title={completed ? 'अध्ययन पूर्ण चिह्नित (क्लिक कर पूर्ववत करें)' : 'इसे पढ़ा गया चिह्नित करें'}
                          >
                            {completed ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                <span>{lang === 'en' ? 'Studied ✓' : 'पढ़ा गया ✓'}</span>
                              </>
                            ) : (
                              <>
                                <Circle className="w-3.5 h-3.5 text-slate-400" />
                                <span>{lang === 'en' ? 'Mark Done?' : 'पढ़ लिया?'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Bullet Points */}
                      <div className="space-y-2 pl-4">
                        {sub.content.map((point, pIdx) => (
                          <p key={pIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                            {point}
                          </p>
                        ))}
                      </div>

                      {/* Callout if any */}
                      {sub.callout && (
                        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                          💡 {sub.callout}
                        </div>
                      )}

                      {/* Table if any */}
                      {sub.table && (
                        <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                                {sub.table.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {sub.table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-3 text-slate-700 align-top whitespace-pre-line">
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
                  );
                })}
              </div>
            </div>
          ))}

          {/* Inline Diagrams if available for chapter */}
          {activeChapter.diagrams.map(diag => (
            <div key={diag.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <DiagramViewer diagram={diag} />
            </div>
          ))}
        </div>
      )}

      {/* 2. Sub-Tab: Diagrams */}
      {subTab === 'diagrams' && (
        <div className="space-y-6">
          {activeChapter.diagrams.map(diag => (
            <div key={diag.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
              <DiagramViewer diagram={diag} />
            </div>
          ))}
        </div>
      )}

      {/* 3. Sub-Tab: Key Points (महत्वपूर्ण बिंदु) */}
      {subTab === 'summary' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                📌
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'en' 
                    ? `Chapter ${activeChapter.chapterNumber} Key Revision Points`
                    : `पाठ ${activeChapter.chapterNumber} के महत्वपूर्ण बिंदु (Key Revision Points)`}
                </h2>
                <p className="text-xs text-slate-500">
                  {lang === 'en' ? 'Core facts for quick revision before examination' : 'परीक्षा से पूर्व तीव्र पुनरावलोकन हेतु उपयोगी तथ्य'}
                </p>
              </div>
            </div>

            {/* Read Aloud All Key Points */}
            <button
              onClick={handleReadAloudSummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-colors cursor-pointer"
              title="सभी मुख्य बिंदु बोलकर सुनें"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
              <span>{lang === 'en' ? 'Read All Points' : 'सभी बिंदु सुनें'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeChapter.keyPoints.map((point, idx) => (
              <div 
                key={idx} 
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 hover:bg-amber-50/50 hover:border-amber-200 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-amber-200/70 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Sub-Tab: Question & Answer Bank */}
      {subTab === 'questions' && (
        <QuestionAnswerBank
          chapterTitle={lang === 'en' ? activeChapter.titleEnglish : activeChapter.titleHindi}
          chapterNumber={activeChapter.chapterNumber}
          mcqs={activeChapter.mcqs}
          veryShort={activeChapter.veryShortQuestions}
          short={activeChapter.shortQuestions}
          longQuestions={activeChapter.longQuestions}
        />
      )}

      {/* Chapter Next / Previous Footer Navigation */}
      <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200">
        <button
          onClick={onPrevChapter}
          disabled={!hasPrev}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
            hasPrev
              ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-xs'
              : 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{lang === 'en' ? 'Previous Chapter' : 'पिछला पाठ (Previous)'}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Quick print this chapter */}
          <button
            onClick={onPrintChapter}
            className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>{lang === 'en' ? 'Print Chapter' : 'पाठ प्रिंट करें'}</span>
          </button>
        </div>

        <button
          onClick={onNextChapter}
          disabled={!hasNext}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
            hasNext
              ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-xs'
              : 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
          }`}
        >
          <span>{lang === 'en' ? 'Next Chapter' : 'अगला पाठ (Next)'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Web Speech Audio Player Bar */}
      <SpeechPlayerBar speech={speech} />
    </div>
  );
};
