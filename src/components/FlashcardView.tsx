import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Layers, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  CheckCircle2, 
  Bookmark, 
  Sparkles, 
  Volume2, 
  Search, 
  Filter, 
  GraduationCap, 
  BookOpen, 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  HelpCircle, 
  Lightbulb,
  ExternalLink,
  Flame,
  ArrowRight,
  Award
} from 'lucide-react';
import { flashcardsData, FlashcardItem } from '../data/flashcardsData';
import { StudySubject, Chapter } from '../types/study';

interface FlashcardViewProps {
  currentSubject?: StudySubject;
  allChapters?: Chapter[];
  onOpenChapterNotes?: (chapterId: number) => void;
  onSubjectChange?: (subject: StudySubject) => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  currentSubject = 'computer',
  allChapters = [],
  onOpenChapterNotes,
  onSubjectChange
}) => {
  // Selected Subject filter (default to currentSubject)
  const [selectedSubject, setSelectedSubject] = useState<StudySubject | 'all'>(currentSubject);

  // Sync with prop when prop changes
  useEffect(() => {
    if (currentSubject) {
      setSelectedSubject(currentSubject);
    }
  }, [currentSubject]);

  // Chapter filter: 0 = all chapters
  const [selectedChapterId, setSelectedChapterId] = useState<number>(0);
  
  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Only show unmastered cards
  const [onlyUnmastered, setOnlyUnmastered] = useState<boolean>(false);

  // Flip State
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Active Card Index
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Mastered Card IDs (saved in localStorage)
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rbse_study_flashcards_mastered');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Bookmarked Card IDs
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rbse_study_flashcards_bookmarked');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Slideshow auto-play state
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Grid overview view
  const [showGridView, setShowGridView] = useState<boolean>(false);

  // Save mastered cards to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rbse_study_flashcards_mastered', JSON.stringify(masteredIds));
    } catch (e) {}
  }, [masteredIds]);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rbse_study_flashcards_bookmarked', JSON.stringify(bookmarkedIds));
    } catch (e) {}
  }, [bookmarkedIds]);

  // Filtered Cards Deck
  const filteredCards = useMemo(() => {
    return flashcardsData.filter(card => {
      // Subject filter
      if (selectedSubject !== 'all' && card.subject !== selectedSubject) {
        return false;
      }
      // Chapter filter
      if (selectedChapterId !== 0 && card.chapterId !== selectedChapterId) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && card.category !== selectedCategory) {
        return false;
      }
      // Only unmastered
      if (onlyUnmastered && masteredIds.includes(card.id)) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTerm = card.term.toLowerCase().includes(q);
        const inEn = card.termEnglish.toLowerCase().includes(q);
        const inDef = card.definition.toLowerCase().includes(q);
        const inCat = card.category.toLowerCase().includes(q);
        const inTag = card.tags.some(t => t.toLowerCase().includes(q));
        if (!inTerm && !inEn && !inDef && !inCat && !inTag) {
          return false;
        }
      }
      return true;
    });
  }, [selectedSubject, selectedChapterId, selectedCategory, onlyUnmastered, searchQuery, masteredIds]);

  // Ensure current index is within bounds
  useEffect(() => {
    if (currentIndex >= filteredCards.length) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  }, [filteredCards.length, currentIndex]);

  const currentCard: FlashcardItem | undefined = filteredCards[currentIndex];

  // Available categories for current filtered subject
  const availableCategories = useMemo(() => {
    const cards = selectedSubject === 'all' 
      ? flashcardsData 
      : flashcardsData.filter(c => c.subject === selectedSubject);
    const cats = Array.from(new Set(cards.map(c => c.category)));
    return ['all', ...cats];
  }, [selectedSubject]);

  // Available chapters for filter
  const availableChapters = useMemo(() => {
    const cards = selectedSubject === 'all'
      ? flashcardsData
      : flashcardsData.filter(c => c.subject === selectedSubject);
    const map = new Map<number, { id: number; number: number; title: string }>();
    cards.forEach(c => {
      if (!map.has(c.chapterId)) {
        map.set(c.chapterId, { id: c.chapterId, number: c.chapterNumber, title: c.chapterTitle });
      }
    });
    return Array.from(map.values()).sort((a, b) => a.number - b.number);
  }, [selectedSubject]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  }, [filteredCards.length]);

  const handlePrev = useCallback(() => {
    if (filteredCards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  }, [filteredCards.length]);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleShuffle = () => {
    if (filteredCards.length <= 1) return;
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const toggleMastered = (cardId: string) => {
    setMasteredIds(prev => 
      prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
    );
  };

  const toggleBookmark = (cardId: string) => {
    setBookmarkedIds(prev =>
      prev.includes(cardId) ? prev.filter(id => id !== cardId) : [...prev, cardId]
    );
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev]);

  // Slideshow auto-play effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying && filteredCards.length > 0) {
      timer = setInterval(() => {
        setIsFlipped(prev => {
          if (!prev) {
            return true; // flip to back
          } else {
            handleNext(); // move to next
            return false;
          }
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, filteredCards.length, handleNext]);

  // Text to Speech
  const speakTerm = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      // Prefer Hindi voice if available
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('IN'));
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  // Calculations for progress
  const totalDeckCount = flashcardsData.filter(c => selectedSubject === 'all' || c.subject === selectedSubject).length;
  const masteredInCurrentDeck = flashcardsData.filter(
    c => (selectedSubject === 'all' || c.subject === selectedSubject) && masteredIds.includes(c.id)
  ).length;
  const progressPercent = totalDeckCount > 0 ? Math.round((masteredInCurrentDeck / totalDeckCount) * 100) : 0;

  const isCurrentCardMastered = currentCard ? masteredIds.includes(currentCard.id) : false;
  const isCurrentCardBookmarked = currentCard ? bookmarkedIds.includes(currentCard.id) : false;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-6">
      
      {/* =========================================================================
          HERO BANNER & MASTERY STATUS HEADER
          ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#060d1f] via-[#0c1a3b] to-[#040814] text-white p-6 sm:p-8 border border-amber-400/30 shadow-xl">
        {/* Glow ambient background lights */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>स्मृति एवं शब्दावली संवर्धक (Interactive 3D Flashcards)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white flex items-center gap-2.5">
              <span>महत्वपूर्ण शब्दावली एवं सूत्र फ्लैशकार्ड्स</span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              पाठों के मुख्य पारिभाषिक शब्दों, सूत्रों व नियमों को 3D फ्लिप कार्ड्स के माध्यम से याद करें। 
              कार्ड पर क्लिक करके उत्तर देखें तथा <span className="text-emerald-400 font-bold">"कंठस्थ"</span> मार्क करके अपनी प्रगति मापें।
            </p>
          </div>

          {/* Quick Mastery Gauge Card */}
          <div className="shrink-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-4 min-w-[240px]">
            <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-white/10"
                  fill="transparent"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-amber-400 transition-all duration-700 ease-out"
                  fill="transparent"
                  strokeDasharray={163.36}
                  strokeDashoffset={163.36 - (163.36 * progressPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-sm font-black text-amber-300 font-mono">
                {progressPercent}%
              </span>
            </div>

            <div>
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                कंठस्थ प्रगति (Mastery)
              </div>
              <div className="text-lg font-black text-white mt-0.5">
                {masteredInCurrentDeck} <span className="text-xs font-medium text-slate-400">/ {totalDeckCount} कार्ड्स</span>
              </div>
              <div className="text-[10px] text-amber-300/80 font-medium mt-0.5 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                <span>स्मृति सुदृढ़ रखें</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CONTROLS & FILTER BAR
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Subject Switcher Pill Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            <button
              onClick={() => {
                setSelectedSubject('computer');
                if (onSubjectChange) onSubjectChange('computer');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                selectedSubject === 'computer'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>💻 कम्प्यूटर विज्ञान</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedSubject === 'computer' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {flashcardsData.filter(c => c.subject === 'computer').length}
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedSubject('sanskrit');
                if (onSubjectChange) onSubjectChange('sanskrit');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                selectedSubject === 'sanskrit'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>🕉️ संस्कृत वाङ्मय</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedSubject === 'sanskrit' ? 'bg-amber-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {flashcardsData.filter(c => c.subject === 'sanskrit').length}
              </span>
            </button>

            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                selectedSubject === 'all'
                  ? 'bg-[#08122c] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <span>सभी ({flashcardsData.length})</span>
            </button>
          </div>

          {/* Quick Actions (Grid View, Auto Play, Shuffle) */}
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={handleShuffle}
              className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
              title="कार्ड्स को यादृच्छिक क्रम में बदलें (Shuffle)"
            >
              <Shuffle className="w-3.5 h-3.5 text-indigo-600" />
              <span>शफ़ल</span>
            </button>

            <button
              onClick={() => setIsAutoPlaying(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                isAutoPlaying
                  ? 'bg-emerald-600 text-white border-emerald-700 animate-pulse'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title="स्लाइडशो मोड (ऑटो फ्लिप व स्वतः अगला)"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-white" />
                  <span>रुकें</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                  <span>ऑटो प्ले</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowGridView(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                showGridView
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>{showGridView ? 'कार्ड मोड' : 'सभी कार्ड्स ग्रिड'}</span>
            </button>
          </div>
        </div>

        {/* Secondary Filters (Chapter, Category, Only Unmastered, Search) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100">
          
          {/* Chapter Selector */}
          <div>
            <select
              value={selectedChapterId}
              onChange={e => {
                setSelectedChapterId(Number(e.target.value));
                setCurrentIndex(0);
              }}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value={0}>📚 समस्त अध्याय ({availableChapters.length} पाठ)</option>
              {availableChapters.map(ch => (
                <option key={ch.id} value={ch.id}>
                  पाठ {ch.number}: {ch.title}
                </option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">🏷️ सभी श्रेणियाँ (All Categories)</option>
              {availableCategories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Real-time search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
              }}
              placeholder="खोजें (CPU, सन्धि, RAM...)"
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Only Unmastered Checkbox */}
          <div className="flex items-center">
            <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer px-2 py-1.5 rounded-lg hover:bg-slate-50">
              <input
                type="checkbox"
                checked={onlyUnmastered}
                onChange={e => {
                  setOnlyUnmastered(e.target.checked);
                  setCurrentIndex(0);
                }}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span>केवल शेष (Unmastered) कार्ड्स</span>
            </label>
          </div>

        </div>
      </div>

      {/* =========================================================================
          MAIN INTERACTIVE 3D FLIP CARD CONTAINER
          ========================================================================= */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">कोई फ्लैशकार्ड नहीं मिला</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            आपके द्वारा चुने गए फ़िल्टर (विषय, अध्याय या सर्च कीवर्ड) के अनुसार कोई कार्ड उपलब्ध नहीं है।
          </p>
          <button
            onClick={() => {
              setSelectedSubject('all');
              setSelectedChapterId(0);
              setSelectedCategory('all');
              setSearchQuery('');
              setOnlyUnmastered(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition cursor-pointer"
          >
            फ़िल्टर रीसेट करें
          </button>
        </div>
      ) : showGridView ? (
        /* =========================================================================
            GRID OVERVIEW OF ALL CARDS
            ========================================================================= */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>समस्त {filteredCards.length} फ्लैशकार्ड्स ग्रिड दृश्य</span>
            </h3>
            <span className="text-xs text-slate-500">कार्ड पर क्लिक करके अभ्यास खोलें</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {filteredCards.map((card, idx) => {
              const isMastered = masteredIds.includes(card.id);
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowGridView(false);
                    setIsFlipped(false);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 hover:shadow-md ${
                    idx === currentIndex
                      ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-400/40'
                      : isMastered
                      ? 'border-emerald-200 bg-emerald-50/30 hover:border-emerald-300'
                      : 'border-slate-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      पाठ {card.chapterNumber}
                    </span>
                    {isMastered && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3 text-emerald-600" />
                        कंठस्थ
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-black text-slate-900 line-clamp-1">
                    {card.term}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {card.definition}
                  </p>

                  <div className="text-[10px] font-medium text-slate-400 pt-1 flex items-center justify-between border-t border-slate-100">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">{card.category}</span>
                    <span className="text-blue-600 font-bold flex items-center gap-0.5">
                      अभ्यास <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* =========================================================================
            3D FLIP CARD INTERFACE
            ========================================================================= */
        currentCard && (
          <div className="space-y-4">
            
            {/* Top Deck Indicators */}
            <div className="flex items-center justify-between text-xs px-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-700 bg-slate-200/80 px-2.5 py-1 rounded-lg">
                  कार्ड {currentIndex + 1} / {filteredCards.length}
                </span>
                <span className="text-slate-400 hidden sm:inline">•</span>
                <span className="text-slate-600 font-medium hidden sm:inline">
                  पाठ {currentCard.chapterNumber}: {currentCard.chapterTitle}
                </span>
              </div>

              {/* Card Mastery & Bookmark Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(currentCard.id);
                  }}
                  className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                    isCurrentCardBookmarked
                      ? 'bg-amber-100 text-amber-700 border-amber-300'
                      : 'bg-white text-slate-400 hover:text-slate-700 border-slate-200'
                  }`}
                  title="बुकमार्क करें"
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered(currentCard.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                    isCurrentCardMastered
                      ? 'bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-300'
                      : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                  title="कंठस्थ मार्क करें"
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCurrentCardMastered ? 'text-white' : 'text-emerald-600'}`} />
                  <span>{isCurrentCardMastered ? 'कंठस्थ ✅' : 'याद हो गया'}</span>
                </button>
              </div>
            </div>

            {/* 3D Flip Card Scene */}
            <div
              className="perspective-1000 w-full min-h-[360px] sm:min-h-[400px] cursor-pointer select-none"
              onClick={handleFlip}
            >
              <div
                className={`relative w-full h-full min-h-[360px] sm:min-h-[400px] rounded-3xl transition-transform duration-500 ease-out transform-style-preserve-3d shadow-xl ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                
                {/* -------------------------------------------------------------
                    FRONT FACE (Question / Key Term View)
                    ------------------------------------------------------------- */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-3xl backface-hidden p-6 sm:p-10 flex flex-col justify-between border-2 transition-colors ${
                    isCurrentCardMastered
                      ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 border-emerald-500/50 text-white'
                      : currentCard.subject === 'sanskrit'
                      ? 'bg-gradient-to-br from-[#1a0a00] via-[#2c1200] to-[#120500] border-amber-500/60 text-white'
                      : 'bg-gradient-to-br from-[#07132e] via-[#0b1d44] to-[#030914] border-blue-500/50 text-white'
                  }`}
                >
                  {/* Subtle decorative background watermarks */}
                  <div className="absolute top-4 right-4 text-white/5 pointer-events-none">
                    <GraduationCap className="w-32 h-32 transform rotate-12" />
                  </div>

                  {/* Top Bar of Front Card */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border shadow-2xs ${
                        currentCard.subject === 'sanskrit'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                          : 'bg-blue-500/20 text-blue-300 border-blue-400/40'
                      }`}>
                        {currentCard.subject === 'sanskrit' ? '🕉️ संस्कृत वाङ्मय' : '💻 कम्प्यूटर विज्ञान'}
                      </span>

                      <span className="text-[11px] font-semibold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                        {currentCard.category}
                      </span>
                    </div>

                    {/* Audio pronunciation speaker button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakTerm(currentCard.pronounceText || currentCard.term);
                      }}
                      className={`p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer text-amber-300 ${
                        isSpeaking ? 'ring-2 ring-amber-400 animate-pulse' : ''
                      }`}
                      title="उच्चारण सुनें (Pronounce)"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Center Term Content */}
                  <div className="my-auto py-6 text-center space-y-3 relative z-10">
                    <div className="inline-block text-[11px] font-bold text-amber-400/90 tracking-widest uppercase">
                      पारिभाषिक पद (KEY TERM)
                    </div>

                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white drop-shadow-md">
                      {currentCard.term}
                    </h2>

                    {currentCard.termEnglish && (
                      <p className="text-xs sm:text-base font-mono font-medium text-amber-200/80">
                        {currentCard.termEnglish}
                      </p>
                    )}

                    {/* Tags preview */}
                    <div className="flex items-center justify-center gap-1.5 pt-2 flex-wrap">
                      {currentCard.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-medium text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Interactive Flip Prompt */}
                  <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>अर्थ व सूत्र जानने हेतु कार्ड पलटें</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 text-white font-bold text-[11px] hover:bg-white/20 transition">
                      <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                      <span>क्लिक / Space (Flip)</span>
                    </span>
                  </div>

                </div>

                {/* -------------------------------------------------------------
                    BACK FACE (Explanation / Formula / Exam Tips View)
                    ------------------------------------------------------------- */}
                <div
                  className={`absolute inset-0 w-full h-full rounded-3xl backface-hidden rotate-y-180 p-6 sm:p-10 flex flex-col justify-between border-2 transition-colors overflow-y-auto ${
                    isCurrentCardMastered
                      ? 'bg-gradient-to-br from-[#06241a] via-[#041a12] to-[#020e09] border-emerald-400 text-white'
                      : currentCard.subject === 'sanskrit'
                      ? 'bg-gradient-to-br from-[#240e04] via-[#1a0a03] to-[#0d0401] border-amber-400/80 text-white'
                      : 'bg-gradient-to-br from-[#04162e] via-[#081f42] to-[#020b18] border-blue-400/80 text-white'
                  }`}
                >
                  {/* Top Bar of Back Card */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div>
                      <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                        विस्तृत अर्थ एवं परीक्षा सूत्र
                      </div>
                      <h3 className="text-base sm:text-xl font-black text-white font-serif">
                        {currentCard.term}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlip();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-slate-300 font-semibold cursor-pointer"
                    >
                      <RotateCw className="w-3 h-3 text-amber-400" />
                      <span>पुनः पलटें</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-4 my-auto py-3">
                    
                    {/* Definition */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4">
                      <div className="text-[11px] font-bold text-emerald-300 uppercase flex items-center gap-1.5 mb-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>प्रामाणिक परिभाषा (Standard Definition):</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                        {currentCard.definition}
                      </p>
                    </div>

                    {/* Key Exam Fact / Rule */}
                    <div className="bg-amber-500/10 border border-amber-400/30 rounded-2xl p-3.5 sm:p-4">
                      <div className="text-[11px] font-bold text-amber-300 uppercase flex items-center gap-1.5 mb-1">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>परीक्षा महत्वपूर्ण बिंदु / पाणिनीय नियम:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
                        {currentCard.keyFact}
                      </p>
                    </div>

                    {/* Real world Example or Formula */}
                    {currentCard.example && (
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 sm:p-4">
                        <div className="text-[11px] font-bold text-blue-300 uppercase flex items-center gap-1.5 mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                          <span>उदाहरण / अनुप्रयोग (Example / Formula):</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 font-mono">
                          {currentCard.example}
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Bottom Actions on Back Face */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    {onOpenChapterNotes ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenChapterNotes(currentCard.chapterId);
                        }}
                        className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold underline cursor-pointer"
                      >
                        <span>पाठ {currentCard.chapterNumber} के पूरे नोट्स खोलें</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    ) : (
                      <span className="text-slate-400">पाठ {currentCard.chapterNumber}</span>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMastered(currentCard.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 cursor-pointer transition ${
                        isCurrentCardMastered
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/15 text-white hover:bg-white/25'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isCurrentCardMastered ? 'कंठस्थ (याद है)' : 'मुझे याद हो गया'}</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* Bottom Navigation Toolbar (Prev, Flip, Next, Shortcuts) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
                title="पिछला कार्ड (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>पिछला कार्ड (←)</span>
              </button>

              {/* Flip Button */}
              <button
                onClick={handleFlip}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white text-xs font-black flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
              >
                <RotateCw className="w-4 h-4" />
                <span>{isFlipped ? 'सामने का पद देखें (Front)' : 'उत्तर व व्याख्या देखें (Flip)'}</span>
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
                title="अगला कार्ड (Right Arrow)"
              >
                <span>अगला कार्ड (→)</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>

            {/* Subtle Keyboard Helper */}
            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium">
              <span>कीबोर्ड शॉर्टकट: <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700 font-mono">Space</kbd> = पलटें</span>
              <span>•</span>
              <span><kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700 font-mono">←</kbd> / <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-700 font-mono">→</kbd> = नेविगेट करें</span>
            </div>

          </div>
        )
      )}

    </div>
  );
};
