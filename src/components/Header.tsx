import React from 'react';
import { 
  BookOpen, 
  Printer, 
  Search, 
  Zap, 
  HelpCircle, 
  Calculator, 
  Sparkles, 
  Calendar, 
  Flame, 
  Table, 
  Award, 
  Languages, 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck,
  Crown,
  ChevronDown,
  FileSpreadsheet,
  Layers
} from 'lucide-react';
import { Chapter, StudyLanguage, StudySubject } from '../types/study';
import { ChapterProgress } from '../hooks/useStudyProgress';

interface HeaderProps {
  activeTab: 'index' | 'notes' | 'tech' | 'certificate' | 'revision' | 'converter' | 'quiz' | 'print' | 'excel' | 'merit' | 'flashcards';
  setActiveTab: (tab: 'index' | 'notes' | 'tech' | 'certificate' | 'revision' | 'converter' | 'quiz' | 'print' | 'excel' | 'merit' | 'flashcards') => void;
  selectedChapter: Chapter;
  setSelectedChapter: (chapter: Chapter) => void;
  allChapters: Chapter[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPrintClick: () => void;
  overallProgress?: ChapterProgress;
  currentStreak?: number;
  isTodayLogged?: boolean;
  studyLanguage?: StudyLanguage;
  onLanguageChange?: (lang: StudyLanguage) => void;
  currentSubject?: StudySubject;
  onSubjectChange?: (subject: StudySubject) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedChapter,
  setSelectedChapter,
  allChapters,
  searchQuery,
  setSearchQuery,
  onPrintClick,
  overallProgress,
  currentStreak = 0,
  isTodayLogged = false,
  studyLanguage = 'hi',
  onLanguageChange,
  currentSubject = 'computer',
  onSubjectChange
}) => {

  const handleLanguageClick = (lang: StudyLanguage) => {
    if (onLanguageChange) {
      onLanguageChange(lang);
    } else {
      try {
        localStorage.setItem('rbse_study_preferred_language', lang);
      } catch (e) {}
    }
    // Switch to notes or print to immediately reflect language choice
    if (activeTab !== 'notes' && activeTab !== 'print') {
      setActiveTab('notes');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-md print:hidden">
      
      {/* =========================================================================
          TIER 0: TOPMOST ROYAL MICRO-BAR (Icon-Driven Clean Quick Status)
          ========================================================================= */}
      <div className="bg-gradient-to-r from-[#02050e] via-[#071128] to-[#02050e] text-slate-300 px-3 sm:px-4 py-1 border-b border-[#d4af37]/30 text-[11px] font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Left: Traditional Sacred Motto & Affiliations (Icon Badges) */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span 
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/35 text-[#fef08a] font-serif font-bold text-[10px] sm:text-[11px] shadow-2xs cursor-default"
              title="॥ सा विद्या या विमुक्तये ॥ - विद्या भारती"
            >
              <img src="/assets/school-logo.svg" alt="Vidya Bharati Logo" className="w-3.5 h-3.5 object-contain shrink-0" />
              <span className="hidden sm:inline">॥ सा विद्या या विमुक्तये ॥</span>
            </span>
            
            <span 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold"
              title="माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE) सम्बद्ध"
            >
              <GraduationCap className="w-3 h-3 text-amber-400 shrink-0" />
              <span>RBSE</span>
            </span>

            <span 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-amber-300/90 font-mono text-[10px]"
              title="SEMIS CODE: 08211102601"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="hidden md:inline">SEMIS:</span>
              <span>08211102601</span>
            </span>
          </div>

          {/* Right: Location, Session & Daily Streak (Icon Badges) */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300 text-[11px]">
            <span 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px]"
              title="केकड़ी (राजस्थान)"
            >
              <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="hidden md:inline">केकड़ी</span>
            </span>

            <span 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-amber-300 font-semibold text-[10px]"
              title="शैक्षणिक सत्र 2026-27"
            >
              <Calendar className="w-3 h-3 text-blue-400 shrink-0" />
              <span>2026-27</span>
            </span>

            {/* Streak Tracker Button */}
            <button
              onClick={() => setActiveTab('index')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] transition-all cursor-pointer ${
                isTodayLogged 
                  ? 'text-amber-300 bg-amber-500/15 border border-amber-400/40 shadow-xs' 
                  : 'text-orange-400 bg-orange-500/10 border border-orange-500/30'
              }`}
              title="दैनिक अध्ययन स्ट्रीक ट्रैकर"
            >
              <Flame className={`w-3 h-3 text-orange-400 ${!isTodayLogged ? 'animate-bounce' : ''}`} />
              <span>{currentStreak}🔥</span>
            </button>
          </div>

        </div>
      </div>

      {/* =========================================================================
          TIER 1: GRAND ROYAL INSTITUTIONAL HERO BANNER (Luxury Gold & Sapphire Navy)
          ========================================================================= */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#020617] via-[#091535] to-[#03081a] text-white px-4 py-3 sm:py-4 border-b-2 border-[#d4af37]/50 shadow-xl">
        
        {/* Luxury Background Glows & Metallic Gold Guilloché Sheen */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 12% 50%, #d4af37 0%, transparent 45%),
              radial-gradient(ellipse at 88% 50%, #1e40af 0%, transparent 45%),
              linear-gradient(180deg, rgba(212, 175, 55, 0.08) 0%, transparent 100%)
            `
          }}
        />

        {/* Delicate Golden Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#fde047] to-transparent opacity-70" />

        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3.5 relative z-10">
          
          {/* School Crest & Prestigious Academic Identity */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            
            {/* 3D Royal Gold Coin Medallion with User's Official School Logo */}
            <div className="relative shrink-0 group cursor-pointer" onClick={() => setActiveTab('index')}>
              <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#92400e] via-[#f59e0b] to-[#fef08a] p-[2.5px] shadow-[0_0_20px_rgba(245,158,11,0.45)] flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
                <div className="w-full h-full rounded-2xl bg-gradient-to-b from-[#08122c] to-[#02050e] p-1 flex items-center justify-center overflow-hidden border border-[#ca8a04]/70">
                  <img
                    src="/assets/school-logo.svg"
                    alt="पटेल आदर्श विद्या निकेतन (विद्या भारती) विद्यालय लोगो"
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-full p-1 border border-white shadow-md">
                <ShieldCheck className="w-3 h-3 text-slate-950" />
              </div>
            </div>

            {/* School Typography Hierarchy */}
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-xl md:text-2xl font-black font-serif tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-gradient-to-r from-amber-100 via-white to-amber-200 bg-clip-text text-transparent">
                  पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय
                </h1>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400/40 tracking-wider shadow-2xs">
                  केकड़ी (राजस्थान)
                </span>
              </div>

              {/* Sub-heading in crisp golden font */}
              <p className="text-[10px] sm:text-[11.5px] font-mono tracking-[0.16em] text-[#d4af37] font-semibold uppercase mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>PATEL ADARSH VIDHYA NIKETAN HIGHER SECONDARY SCHOOL</span>
                <span className="text-amber-500/70 hidden sm:inline">❖</span>
                <span className="text-slate-300 font-sans normal-case tracking-normal text-[11px] font-normal hidden md:inline">
                  स्थापना: 1998 (RBSE Code: 08211102601)
                </span>
              </p>

              {/* Subject, Class & Progress badges */}
              <div className="flex items-center gap-2 text-xs text-slate-300 mt-1.5 flex-wrap">
                {currentSubject === 'sanskrit' ? (
                  <span className="font-bold text-amber-200 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-500/40 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>कक्षा 9th संस्कृतम् (शेमुषी प्रथमो भागः)</span>
                  </span>
                ) : (
                  <span className="font-bold text-cyan-200 bg-blue-950/60 px-2.5 py-0.5 rounded border border-cyan-500/40 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>कक्षा 9th कम्प्यूटर (सूचना प्रौद्योगिकी - I)</span>
                  </span>
                )}
                <span className="text-slate-500 hidden sm:inline">·</span>
                <span className="text-slate-300 hidden md:inline text-[11px]">
                  {currentSubject === 'sanskrit' 
                    ? 'सम्पूर्ण 8 पाठ + व्याकरण (सन्धि, समास, प्रत्यय) + 3D फ्लैशकार्ड्स' 
                    : 'सम्पूर्ण 8 पाठ + 110+ MS Excel फॉर्मूले + 3D फ्लैशकार्ड्स'}
                </span>
                {overallProgress && overallProgress.total > 0 && (
                  <>
                    <span className="text-slate-500 hidden sm:inline">·</span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 font-bold bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/50 shadow-2xs">
                      <span>प्रगति: {overallProgress.completed}/{overallProgress.total}</span>
                      <span className="text-emerald-400 font-black">({overallProgress.percentage}%)</span>
                    </span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Luxury Executive Action Toolbar (Clean Icon Buttons & Prominent Subject Switcher) */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap shrink-0 pt-2 xl:pt-0">
            
            {/* 0. PROMINENT VISUAL SUBJECT SWITCHER (Computer Science vs Sanskrit) */}
            <div className="inline-flex items-center p-1 rounded-2xl bg-[#030712]/95 border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]">
              <button
                type="button"
                onClick={() => onSubjectChange && onSubjectChange('computer')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  currentSubject === 'computer'
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-[0_0_15px_rgba(37,99,235,0.7)] ring-2 ring-cyan-300 scale-102'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                title="कम्प्यूटर विज्ञान पाठ्यक्रम सक्रिय करें"
              >
                <span className="text-sm sm:text-base">💻</span>
                <span>कम्प्यूटर</span>
                {currentSubject === 'computer' && (
                  <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                )}
              </button>

              <button
                type="button"
                onClick={() => onSubjectChange && onSubjectChange('sanskrit')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-black transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  currentSubject === 'sanskrit'
                    ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-amber-700 text-white shadow-[0_0_15px_rgba(245,158,11,0.7)] ring-2 ring-amber-300 scale-102'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                title="संस्कृत वाङ्मय पाठ्यक्रम सक्रिय करें"
              >
                <span className="text-sm sm:text-base">🕉️</span>
                <span>संस्कृत</span>
                {currentSubject === 'sanskrit' && (
                  <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
                )}
              </button>
            </div>

            {/* 1. LANGUAGE SELECTOR (Clean Flag Icons with Tooltips) */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-amber-400/30 shadow-inner">
              <button
                type="button"
                onClick={() => handleLanguageClick('hi')}
                className={`px-2.5 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                  studyLanguage === 'hi'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-xs ring-1 ring-amber-300 scale-105'
                    : 'hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
                title="हिंदी माध्यम (Hindi Notes)"
              >
                🇮🇳
              </button>

              <button
                type="button"
                onClick={() => handleLanguageClick('en')}
                className={`px-2.5 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                  studyLanguage === 'en'
                    ? 'bg-blue-600 text-white font-black shadow-xs ring-1 ring-blue-300 scale-105'
                    : 'hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
                title="English Medium (English Notes)"
              >
                🇬🇧
              </button>

              <button
                type="button"
                onClick={() => handleLanguageClick('bilingual')}
                className={`px-2.5 py-1.5 rounded-lg text-sm transition-all cursor-pointer ${
                  studyLanguage === 'bilingual'
                    ? 'bg-purple-600 text-white font-black shadow-xs ring-1 ring-purple-300 scale-105'
                    : 'hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
                title="द्विभाषी (Bilingual Hindi + English)"
              >
                📖
              </button>
            </div>

            {/* 2. 3D FLASHCARDS ICON BUTTON */}
            <button
              onClick={() => {
                setActiveTab('flashcards');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                activeTab === 'flashcards'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-300 ring-2 ring-indigo-400/50 shadow-md'
                  : 'bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border-indigo-500/40'
              }`}
              title="🗂️ 3D फ्लिप फ्लैशकार्ड्स (शब्दावली एवं सूत्र संवर्धक)"
            >
              <Layers className="w-4 h-4 text-indigo-200" />
            </button>

            {/* 3. CERTIFICATE PRINT ICON BUTTON */}
            <button
              onClick={() => {
                setActiveTab('certificate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (activeTab === 'certificate') {
                  setTimeout(() => window.print(), 100);
                }
              }}
              className={`p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                activeTab === 'certificate'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-300 ring-2 ring-amber-400/50 shadow-md'
                  : 'bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border-amber-500/40'
              }`}
              title="🎓 आधिकारिक प्रमाण-पत्र प्रिंट एवं परीक्षा केंद्र"
            >
              <Award className="w-4 h-4 text-amber-300" />
            </button>

            {/* 4. TEACHERS MERIT LIST ICON BUTTON */}
            <button
              onClick={() => {
                setActiveTab('merit');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                activeTab === 'merit'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white border-emerald-300 ring-2 ring-emerald-400/50 shadow-md'
                  : 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border-emerald-500/40'
              }`}
              title="📊 कक्षा मेरिट लिस्ट व एक्सेल शीट (शिक्षक पोर्टल)"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-300" />
            </button>

            {/* 5. A4 PRINT ICON BUTTON */}
            <button
              onClick={() => setActiveTab('print')}
              className={`p-2.5 rounded-xl border transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                activeTab === 'print'
                  ? 'bg-blue-600 text-white border-blue-300 ring-2 ring-blue-400/50 shadow-md'
                  : 'bg-slate-800/90 hover:bg-slate-700 text-slate-300 border-slate-600'
              }`}
              title="🖨️ A4 प्रिंटेबल PDF नोट्स डाउनलोड व प्रिंट"
            >
              <Printer className="w-4 h-4 text-blue-300" />
            </button>

            {/* 6. DAILY CHALLENGE ICON BUTTON */}
            <button
              onClick={() => {
                setActiveTab('index');
                setTimeout(() => {
                  window.scrollTo({ top: 380, behavior: 'smooth' });
                }, 100);
              }}
              className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
              title="✨ आज की दैनिक चुनौती (Daily Challenge)"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>

          </div>

        </div>
      </div>

      {/* =========================================================================
          TIER 2: EXECUTIVE NAVIGATION BAR & CHAPTER CONTROLS (Crisp Luxury Layout)
          ========================================================================= */}
      <div className="bg-slate-50/95 backdrop-blur-xs px-4 py-2 border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
          
          {/* Main Navigation Tabs */}
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            
            <button
              onClick={() => setActiveTab('index')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'index'
                  ? 'bg-[#08122c] text-white shadow-sm border-b-2 border-amber-400'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>डैशबोर्ड व प्लानर</span>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'notes'
                  ? 'bg-[#08122c] text-white shadow-sm border-b-2 border-amber-400'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>
                अध्याय नोट्स ({studyLanguage === 'en' ? 'English' : studyLanguage === 'bilingual' ? 'द्विभाषी' : 'हिंदी'})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'flashcards'
                  ? 'bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white shadow-md border-b-2 border-indigo-300 ring-2 ring-indigo-400/50'
                  : 'text-indigo-950 bg-indigo-50/90 border border-indigo-300 hover:bg-indigo-100 hover:text-indigo-900'
              }`}
              title="3D फ्लिप फ्लैशकार्ड्स (शब्दावली एवं सूत्र)"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>🗂️ 3D फ्लैशकार्ड्स</span>
            </button>

            <button
              onClick={() => setActiveTab('tech')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'tech'
                  ? 'bg-[#08122c] text-white shadow-sm border-b-2 border-amber-400'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>कोडिंग व ऑफिस टूल्स</span>
            </button>

            <button
              onClick={() => setActiveTab('excel')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'excel'
                  ? 'bg-emerald-800 text-white shadow-sm border-b-2 border-emerald-300'
                  : 'text-emerald-900 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-emerald-600" />
              <span>MS Excel फॉर्मूले (110+)</span>
            </button>

            <button
              onClick={() => setActiveTab('merit')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'merit'
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md border-b-2 border-emerald-300 ring-1 ring-emerald-400/50'
                  : 'text-emerald-950 bg-emerald-100/90 border border-emerald-400 hover:bg-emerald-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
              <span>📊 कक्षा मेरिट लिस्ट व लक्ज़री मार्कशीट (Teachers)</span>
            </button>

            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'certificate'
                  ? 'bg-gradient-to-r from-[#92400e] to-[#b45309] text-white shadow-md border-b-2 border-amber-300'
                  : 'text-amber-950 bg-amber-100/70 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>सर्टिफिकेट प्रिंट व परीक्षा</span>
            </button>

            <button
              onClick={() => setActiveTab('revision')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'revision'
                  ? 'bg-[#08122c] text-white shadow-sm border-b-2 border-amber-400'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>क्विक रिवीज़न</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-[#08122c] text-white shadow-sm border-b-2 border-amber-400'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>अभ्यास टेस्ट</span>
            </button>

            <button
              onClick={() => setActiveTab('converter')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'converter'
                  ? 'bg-[#08122c] text-white shadow-sm border-b-2 border-amber-400'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/70'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-teal-500" />
              <span>संख्या कनवर्टर</span>
            </button>

          </nav>

          {/* Chapter Quick Switcher & Global Search Bar */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            {activeTab === 'notes' && (
              <div className="relative">
                <select
                  value={selectedChapter.id}
                  onChange={(e) => {
                    const found = allChapters.find(c => c.id === Number(e.target.value));
                    if (found) setSelectedChapter(found);
                  }}
                  className="text-xs border border-amber-400/60 rounded-xl pl-3 pr-7 py-1.5 bg-amber-50/60 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 max-w-[210px] truncate shadow-2xs appearance-none cursor-pointer"
                >
                  {allChapters.map(ch => (
                    <option key={ch.id} value={ch.id}>
                      पाठ {ch.chapterNumber}: {studyLanguage === 'en' ? ch.titleEnglish : ch.titleHindi}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-amber-700 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            )}

            <div className="relative flex-1 lg:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="सर्च करें (पाठ, फॉर्मूला, प्रश्न)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-2xs text-slate-800 font-medium placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

    </header>
  );
};
