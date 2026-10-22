import React, { useState } from 'react';
import { useDailyChallenge } from '../hooks/useDailyChallenge';
import { useStudyStreak } from '../hooks/useStudyStreak';
import { Chapter } from '../types/study';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Flame, 
  Calendar, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  Copy, 
  Check, 
  Award,
  Lightbulb,
  Shuffle
} from 'lucide-react';

interface DailyChallengeWidgetProps {
  chapters: Chapter[];
  onSelectChapter: (chapter: Chapter) => void;
}

export const DailyChallengeWidget: React.FC<DailyChallengeWidgetProps> = ({
  chapters,
  onSelectChapter
}) => {
  const {
    todayFormattedHindi,
    currentQuestion,
    currentIndex,
    totalQuestions,
    isViewingToday,
    isTodayAnswered,
    todaySelectedOption,
    todayIsCorrect,
    streak,
    totalSolved,
    correctCount,
    submitAnswer,
    showNextQuestion,
    showPrevQuestion,
    showTodayQuestion,
    showRandomQuestion
  } = useDailyChallenge();

  const { recordActivity } = useStudyStreak();

  // Local selection state for active question if not answered yet
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // If viewing today's question and it's already answered, use today's recorded answer
  const isAnswered = isViewingToday ? isTodayAnswered : submitted;
  const chosenOption = isViewingToday && isTodayAnswered 
    ? todaySelectedOption 
    : selectedOption;
  const isCorrect = isViewingToday && isTodayAnswered 
    ? todayIsCorrect 
    : (chosenOption === currentQuestion.correctOption);

  // Handle option click
  const handleSelectOption = (optKey: string) => {
    if (isAnswered) return;
    setSelectedOption(optKey);
  };

  // Handle submit
  const handleSubmit = () => {
    if (!selectedOption) return;
    
    if (isViewingToday) {
      submitAnswer(selectedOption);
      // Record in Study Streak
      recordActivity('quiz', `दैनिक चुनौती (Daily Challenge): पाठ ${currentQuestion.chapterNumber} का प्रश्न हल किया`);
    } else {
      setSubmitted(true);
    }
  };

  // Reset when moving to another question
  const handleNext = () => {
    setSelectedOption(null);
    setSubmitted(false);
    showNextQuestion();
  };

  const handleRandom = () => {
    setSelectedOption(null);
    setSubmitted(false);
    showRandomQuestion();
  };

  const handleReturnToday = () => {
    setSelectedOption(null);
    setSubmitted(false);
    showTodayQuestion();
  };

  // Jump to Chapter Notes
  const handleReadChapterNotes = () => {
    const targetChapter = chapters.find(c => c.chapterNumber === currentQuestion.chapterNumber) || chapters[0];
    onSelectChapter(targetChapter);
  };

  // Copy question text to share with classmates
  const handleCopyQuestion = () => {
    const textToCopy = `📝 [RBSE कक्षा 9 कम्प्यूटर दैनिक चुनौती - ${todayFormattedHindi}]\n` +
      `📖 पाठ ${currentQuestion.chapterNumber}: ${currentQuestion.chapterTitleHindi}\n\n` +
      `❓ प्रश्न: ${currentQuestion.question}\n\n` +
      Object.entries(currentQuestion.options).map(([k, v]) => `(${k}) ${v}`).join('\n') +
      `\n\n💡 उत्तर: (${currentQuestion.correctOption})\nव्याख्या: ${currentQuestion.explanation}`;

    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2200);
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-purple-500/5 to-blue-500/10 border border-amber-200/90 rounded-3xl p-5 sm:p-7 shadow-sm mb-6 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b border-amber-200/60">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300">
                ⭐ दैनिक स्मृति चुनौती (Daily Challenge)
              </span>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{todayFormattedHindi}</span>
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              आज का पाठ्यक्रम प्रश्न (Question of the Day)
            </h3>
          </div>
        </div>

        {/* Status & Streak Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-extrabold shadow-xs">
            <Flame className="w-4 h-4 text-orange-500" />
            <span>{streak} दिन चैलेंज स्ट्रीक</span>
          </div>

          {isViewingToday && isTodayAnswered ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>आज का चैलेंज पूरा! 🎉</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold animate-pulse">
              <span>⏳ हल करें (+1 स्ट्रीक)</span>
            </span>
          )}
        </div>
      </div>

      {/* Question Context Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 rounded-lg bg-blue-100/80 text-blue-900 border border-blue-200">
            📖 पाठ {currentQuestion.chapterNumber}: {currentQuestion.chapterTitleHindi}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
            {currentQuestion.unitHindi}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
            🎯 {currentQuestion.examFrequency}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isViewingToday && (
            <button
              onClick={handleReturnToday}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-100/70 hover:bg-amber-100 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>आज के प्रश्न पर लौटें</span>
            </button>
          )}
          <span className="text-xs text-slate-500 font-bold">
            प्रश्न {currentIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Question Box */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-5">
        <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed mb-5">
          {currentQuestion.question}
        </p>

        {/* 4 Interactive Option Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {Object.entries(currentQuestion.options).map(([optKey, optVal]) => {
            const isThisChosen = chosenOption === optKey;
            const isThisCorrect = optKey === currentQuestion.correctOption;

            let btnStyle = 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 text-slate-800 bg-slate-50/60';

            if (isAnswered) {
              if (isThisCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-400 font-bold';
              } else if (isThisChosen && !isThisCorrect) {
                btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 ring-2 ring-rose-400 font-semibold';
              } else {
                btnStyle = 'border-slate-200 opacity-60 text-slate-600 bg-white';
              }
            } else if (isThisChosen) {
              btnStyle = 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-400 font-bold';
            }

            return (
              <button
                key={optKey}
                onClick={() => handleSelectOption(optKey)}
                disabled={isAnswered}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 text-sm ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    isAnswered && isThisCorrect 
                      ? 'bg-emerald-600 text-white' 
                      : isAnswered && isThisChosen && !isThisCorrect
                      ? 'bg-rose-600 text-white'
                      : isThisChosen
                      ? 'bg-amber-500 text-white'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}>
                    {optKey}
                  </span>
                  <span className="leading-snug">{optVal}</span>
                </div>

                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isThisChosen && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button: Check Answer if not submitted */}
        {!isAnswered ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              💡 किसी एक विकल्प पर क्लिक कर <span className="font-bold text-slate-700">"उत्तर जाँचें"</span> दबाएँ।
            </span>
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 ${
                selectedOption
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white cursor-pointer scale-[1.02]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>उत्तर जाँचें एवं व्याख्या देखें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Result Feedback Banner */
          <div className={`p-4 rounded-xl border mb-2 flex items-start gap-3 ${
            isCorrect 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="shrink-0 mt-0.5">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600" />
              )}
            </div>
            <div>
              <p className="text-sm font-extrabold">
                {isCorrect ? '🎉 शाबाश! आपका उत्तर शत-प्रतिशत सही है।' : `❌ आपका उत्तर गलत था। सही विकल्प: (${currentQuestion.correctOption})`}
              </p>
              <p className="text-xs mt-0.5 opacity-90">
                {isCorrect 
                  ? 'आपकी अवधारणा बिल्कुल स्पष्ट है। नीचे दिया गया स्मृति सूत्र भी दोहरा लें!' 
                  : 'चिंता न करें, यही अभ्यास का उद्देश्य है। नीचे दिए गए स्मृति सूत्र को ध्यान से पढ़ें।'}
              </p>
            </div>
          </div>
        )}

        {/* Memory Reinforcement Anchor & Explanation Box */}
        {isAnswered && (
          <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-3">
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-xs mb-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>स्मृति सूत्र (Memory Anchor) - परीक्षा में कभी न भूलें:</span>
              </div>
              <p className="text-xs text-amber-950 font-medium leading-relaxed pl-6">
                {currentQuestion.memoryAnchor}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs mb-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>विस्तृत पाठ्यक्रम व्याख्या (Syllabus Concept):</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pl-6">
                {currentQuestion.explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Quick Controls & Social Reinforcement */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={handleReadChapterNotes}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>पाठ {currentQuestion.chapterNumber} के पूरे नोट्स पढ़ें</span>
          </button>

          <button
            onClick={handleCopyQuestion}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-medium border border-slate-200 transition-colors"
            title="साथियों के साथ अभ्यास हेतु प्रश्न कॉपी करें"
          >
            {copySuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">कॉपी हो गया!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>प्रश्न कॉपी करें</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 transition-colors"
          >
            <span>अगला प्रश्न</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleRandom}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 font-semibold border border-purple-200 transition-colors"
            title="पाठ्यक्रम से कोई भी यादृच्छिक प्रश्न निकालें"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-600" />
            <span>रैंडम प्रश्न</span>
          </button>
        </div>
      </div>
    </div>
  );
};
