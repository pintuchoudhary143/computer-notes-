import React, { useState, useMemo, useEffect } from 'react';
import { allChapters } from './data/chapters';
import { sanskritChapters } from './data/sanskritChaptersData';
import { Chapter, StudyLanguage, StudySubject } from './types/study';
import { useStudyProgress } from './hooks/useStudyProgress';
import { Header } from './components/Header';
import { TableOfContents } from './components/TableOfContents';
import { ChapterNotesView } from './components/ChapterNotesView';
import { QuickRevisionSection } from './components/QuickRevisionSection';
import { NumberSystemConverter } from './components/NumberSystemConverter';
import { PracticeQuizModal } from './components/PracticeQuizModal';
import { PrintableNotesPDF } from './components/PrintableNotesPDF';
import { TechModulesView } from './components/TechModulesView';
import { CertificationCenter } from './components/CertificationCenter';
import { ExcelFormulaMaster } from './components/ExcelFormulaMaster';
import { TeacherMeritList } from './components/TeacherMeritList';
import { FlashcardView } from './components/FlashcardView';
import { useStudyStreak } from './hooks/useStudyStreak';
import { 
  BookOpen, 
  Search, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  Printer, 
  ChevronRight 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'index' | 'notes' | 'tech' | 'certificate' | 'revision' | 'converter' | 'quiz' | 'print' | 'excel' | 'merit' | 'flashcards'>('index');
  
  // Persistent Subject State ('computer' | 'sanskrit')
  const [currentSubject, setCurrentSubject] = useState<StudySubject>(() => {
    try {
      const saved = localStorage.getItem('rbse_study_current_subject') as StudySubject;
      if (saved === 'computer' || saved === 'sanskrit') {
        return saved;
      }
    } catch (e) {}
    return 'computer';
  });

  // Active curriculum chapters depending on current subject
  const activeChapters = useMemo(() => {
    return currentSubject === 'sanskrit' ? sanskritChapters : allChapters;
  }, [currentSubject]);

  const [selectedChapter, setSelectedChapter] = useState<Chapter>(() => {
    try {
      const savedSubject = localStorage.getItem('rbse_study_current_subject');
      if (savedSubject === 'sanskrit') {
        return sanskritChapters[0];
      }
    } catch (e) {}
    return allChapters[0];
  });

  const handleSubjectChange = (newSubject: StudySubject) => {
    setCurrentSubject(newSubject);
    try {
      localStorage.setItem('rbse_study_current_subject', newSubject);
    } catch (e) {}
    if (newSubject === 'sanskrit') {
      setSelectedChapter(sanskritChapters[0]);
    } else {
      setSelectedChapter(allChapters[0]);
    }
  };

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [studyLanguage, setStudyLanguage] = useState<StudyLanguage>(() => {
    try {
      const saved = localStorage.getItem('rbse_study_preferred_language') as StudyLanguage;
      if (saved && (saved === 'hi' || saved === 'en' || saved === 'bilingual')) {
        return saved;
      }
    } catch (e) {}
    return 'hi';
  });

  const handleLanguageChange = (newLang: StudyLanguage) => {
    setStudyLanguage(newLang);
    try {
      localStorage.setItem('rbse_study_preferred_language', newLang);
    } catch (e) {}
  };

  // Progress Tracker Hook based on active curriculum
  const {
    isTopicCompleted,
    toggleTopic,
    getChapterProgress,
    getOverallProgress,
    markChapterAll,
    resetAllProgress
  } = useStudyProgress(activeChapters);

  const overallProgress = getOverallProgress();
  const currentChapterProgress = getChapterProgress(selectedChapter);

  const currentChapterIndex = activeChapters.findIndex(c => c.id === selectedChapter.id);
  const hasPrev = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < activeChapters.length - 1;

  const handlePrevChapter = () => {
    if (hasPrev) {
      setSelectedChapter(activeChapters[currentChapterIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextChapter = () => {
    if (hasNext) {
      setSelectedChapter(activeChapters[currentChapterIndex + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Study Streak Tracker Hook
  const { recordActivity, currentStreak, isTodayLogged } = useStudyStreak();

  // Record study activity when active tab or chapter changes
  useEffect(() => {
    if (activeTab === 'notes') {
      recordActivity('notes', `पाठ ${selectedChapter.chapterNumber}: ${selectedChapter.titleHindi} का अध्ययन`);
    } else if (activeTab === 'quiz') {
      recordActivity('quiz', 'अभ्यास टेस्ट का अध्ययन');
    } else if (activeTab === 'tech') {
      recordActivity('notes', 'कोडिंग एवं ऑफिस टूल्स नोट्स का अध्ययन');
    } else if (activeTab === 'certificate') {
      recordActivity('exam', 'प्रमाण-पत्र परीक्षा केंद्र खोला');
    } else if (activeTab === 'excel') {
      recordActivity('notes', 'एक्सेल फॉर्मूला महाकोश का अध्ययन');
    } else if (activeTab === 'flashcards') {
      recordActivity('notes', '3D शब्दावली एवं सूत्र फ्लैशकार्ड्स का अभ्यास');
    }
  }, [activeTab, selectedChapter.id, selectedChapter.chapterNumber, selectedChapter.titleHindi, recordActivity]);

  const handleSetActiveTab = (tab: 'index' | 'notes' | 'tech' | 'certificate' | 'revision' | 'converter' | 'quiz' | 'print' | 'excel' | 'merit' | 'flashcards') => {
    setActiveTab(tab);
  };

  const handleSelectChapterFromIndex = (ch: Chapter) => {
    setSelectedChapter(ch);
    setActiveTab('notes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTopic = (chapterId: number, sectionIdx: number, subIdx: number) => {
    toggleTopic(chapterId, sectionIdx, subIdx);
    const wasCompleted = isTopicCompleted(chapterId, sectionIdx, subIdx);
    if (!wasCompleted) {
      recordActivity('notes', `पाठ ${selectedChapter.chapterNumber} का अध्ययन विषय पूर्ण किया`);
    }
  };

  const handlePrintClick = () => {
    setActiveTab('print');
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Search Results filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();

    return allChapters.map(ch => {
      let matchCount = 0;
      const matchedSnippets: string[] = [];

      if (ch.titleHindi.toLowerCase().includes(query) || ch.titleEnglish.toLowerCase().includes(query)) {
        matchCount += 3;
        matchedSnippets.push(`शीर्षक: ${ch.titleHindi} (${ch.titleEnglish})`);
      }

      ch.sections.forEach(sec => {
        if (sec.title.toLowerCase().includes(query)) {
          matchCount += 2;
          matchedSnippets.push(`विषय: ${sec.title}`);
        }
        sec.subsections?.forEach(sub => {
          sub.content.forEach(p => {
            if (p.toLowerCase().includes(query)) {
              matchCount++;
              if (matchedSnippets.length < 3) {
                matchedSnippets.push(p);
              }
            }
          });
        });
      });

      ch.mcqs.forEach(m => {
        if (m.question.toLowerCase().includes(query)) {
          matchCount++;
          if (matchedSnippets.length < 3) {
            matchedSnippets.push(`MCQ: ${m.question}`);
          }
        }
      });

      ch.veryShortQuestions.forEach(q => {
        if (q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query)) {
          matchCount++;
          if (matchedSnippets.length < 3) {
            matchedSnippets.push(`अतिलघु: ${q.question}`);
          }
        }
      });

      ch.shortQuestions.forEach(q => {
        if (q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query)) {
          matchCount++;
          if (matchedSnippets.length < 3) {
            matchedSnippets.push(`लघुत्तरात्मक: ${q.question}`);
          }
        }
      });

      return {
        chapter: ch,
        matchCount,
        snippets: matchedSnippets
      };
    }).filter(r => r.matchCount > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 print:bg-white print:p-0 print:m-0">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        selectedChapter={selectedChapter}
        setSelectedChapter={setSelectedChapter}
        allChapters={activeChapters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onPrintClick={handlePrintClick}
        overallProgress={overallProgress}
        currentStreak={currentStreak}
        isTodayLogged={isTodayLogged}
        studyLanguage={studyLanguage}
        onLanguageChange={handleLanguageChange}
        currentSubject={currentSubject}
        onSubjectChange={handleSubjectChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 print:p-0 print:m-0 print:pb-0">
        {/* If user is searching and query is not empty, show Search Results view */}
        {searchQuery.trim().length > 0 ? (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  खोज परिणाम: "{searchQuery}"
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {searchResults.length} पाठों में परिणाम मिले
              </span>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-600">
                <p className="text-sm font-semibold mb-1">कोई परिणाम नहीं मिला।</p>
                <p className="text-xs text-slate-400">कृपया अन्य कीवर्ड से खोजें।</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map(({ chapter, matchCount, snippets }) => (
                  <div
                    key={chapter.id}
                    onClick={() => {
                      setSelectedChapter(chapter);
                      handleSetActiveTab('notes');
                      setSearchQuery('');
                    }}
                    className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                        पाठ {chapter.chapterNumber}: {chapter.titleHindi}
                      </span>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1 group-hover:text-blue-600">
                        <span>पाठ खोलें</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="space-y-1.5 pl-1">
                      {snippets.map((snip, sIdx) => (
                        <p key={sIdx} className="text-xs text-slate-700 line-clamp-2">
                          • {snip}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Normal Tab Content */
          <>
            {activeTab === 'index' && (
              <TableOfContents
                chapters={activeChapters}
                currentSubject={currentSubject}
                onSelectChapter={handleSelectChapterFromIndex}
                onOpenRevision={() => handleSetActiveTab('revision')}
                onOpenPrint={() => handleSetActiveTab('print')}
                onOpenQuiz={() => handleSetActiveTab('quiz')}
                onOpenExcelFormulas={() => handleSetActiveTab('excel')}
                onOpenCertificate={() => handleSetActiveTab('certificate')}
                onOpenMeritList={() => handleSetActiveTab('merit')}
                onOpenFlashcards={() => handleSetActiveTab('flashcards')}
                getChapterProgress={getChapterProgress}
                overallProgress={overallProgress}
                onResetAllProgress={resetAllProgress}
              />
            )}

            {activeTab === 'notes' && (
              <ChapterNotesView
                chapter={selectedChapter}
                currentSubject={currentSubject}
                onPrevChapter={handlePrevChapter}
                onNextChapter={handleNextChapter}
                hasPrev={hasPrev}
                hasNext={hasNext}
                onPrintChapter={() => {
                  handleSetActiveTab('print');
                }}
                chapterProgress={currentChapterProgress}
                isTopicCompleted={isTopicCompleted}
                onToggleTopic={handleToggleTopic}
                onMarkChapterAll={markChapterAll}
                onOpenCertificate={() => handleSetActiveTab('certificate')}
                initialLanguage={studyLanguage}
                onLanguageChange={handleLanguageChange}
              />
            )}

            {activeTab === 'flashcards' && (
              <FlashcardView
                currentSubject={currentSubject}
                allChapters={activeChapters}
                onSubjectChange={handleSubjectChange}
                onOpenChapterNotes={(chId) => {
                  const found = activeChapters.find(c => c.id === chId) || allChapters.find(c => c.id === chId) || sanskritChapters.find(c => c.id === chId);
                  if (found) {
                    setSelectedChapter(found);
                    handleSetActiveTab('notes');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              />
            )}

            {activeTab === 'tech' && (
              <TechModulesView
                onTakeCertExam={() => setActiveTab('certificate')}
              />
            )}

            {activeTab === 'excel' && (
              <ExcelFormulaMaster
                onBackToNotes={() => handleSetActiveTab('notes')}
              />
            )}

            {activeTab === 'merit' && (
              <TeacherMeritList />
            )}

            {activeTab === 'certificate' && (
              <CertificationCenter />
            )}

            {activeTab === 'revision' && (
              <QuickRevisionSection />
            )}

            {activeTab === 'converter' && (
              <NumberSystemConverter />
            )}

            {activeTab === 'quiz' && (
              <PracticeQuizModal
                chapters={activeChapters}
                defaultChapterId={selectedChapter.id}
              />
            )}

            {activeTab === 'print' && (
              <PrintableNotesPDF
                chapters={activeChapters}
                onBack={() => setActiveTab('notes')}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-8 px-4 border-t border-slate-800 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-slate-200">
              {currentSubject === 'sanskrit'
                ? 'कक्षा 9 संस्कृतम्: शेमुषी प्रथमो भागः (RBSE अजमेर)'
                : 'कक्षा 9 कम्प्यूटर: सूचना प्रौद्योगिकी की अवधारणा - I (RBSE अजमेर)'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              विद्यार्थियों के अध्ययन, 3D फ्लैशकार्ड्स, त्वरित पुनरावलोकन एवं परीक्षा अभ्यास हेतु समर्पित मास्टर पोर्टल
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px] flex-wrap justify-center sm:justify-end">
            <button
              onClick={() => setActiveTab('index')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              विषय सूची
            </button>
            <button
              onClick={() => handleSetActiveTab('flashcards')}
              className="hover:text-indigo-300 transition-colors font-bold text-indigo-400 cursor-pointer"
            >
              🗂️ 3D फ्लैशकार्ड्स
            </button>
            <button
              onClick={() => handleSetActiveTab('merit')}
              className="hover:text-emerald-300 transition-colors font-bold text-emerald-400 cursor-pointer"
            >
              📊 मेरिट लिस्ट (शिक्षक)
            </button>
            <button
              onClick={() => handleSetActiveTab('tech')}
              className="hover:text-white transition-colors font-medium text-emerald-400 cursor-pointer"
            >
              कोडिंग व टूल्स
            </button>
            <button
              onClick={() => handleSetActiveTab('excel')}
              className="hover:text-white transition-colors font-bold text-teal-300 cursor-pointer"
            >
              एक्सेल फॉर्मूले (110+)
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className="hover:text-white transition-colors font-bold text-amber-400 cursor-pointer"
            >
              सर्टिफिकेट परीक्षा
            </button>
            <button
              onClick={() => setActiveTab('revision')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              रिवीज़न सूत्र
            </button>
            <button
              onClick={() => setActiveTab('print')}
              className="hover:text-white transition-colors font-semibold text-blue-400 cursor-pointer"
            >
              प्रिंटेबल PDF
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
