import React, { useState } from 'react';
import { Chapter, MCQ } from '../types/study';
import { useStudyStreak } from '../hooks/useStudyStreak';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ChevronRight, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface PracticeQuizModalProps {
  chapters: Chapter[];
  defaultChapterId?: number;
}

export const PracticeQuizModal: React.FC<PracticeQuizModalProps> = ({
  chapters,
  defaultChapterId = 1
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<number>(defaultChapterId);
  const currentChapter = chapters.find(c => c.id === selectedChapterId) || chapters[0];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentQuestions: MCQ[] = currentChapter.mcqs;
  const currentQ = currentQuestions[currentIdx];

  const handleSelectOption = (optKey: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: optKey }));
  };

  const calculateScore = () => {
    let score = 0;
    currentQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctOption) {
        score++;
      }
    });
    return score;
  };

  const { recordActivity } = useStudyStreak();

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    const finalScore = calculateScore();
    const finalPercentage = Math.round((finalScore / currentQuestions.length) * 100);
    recordActivity(
      'quiz',
      `पाठ ${currentChapter.chapterNumber}: ${currentChapter.titleHindi} क्विज़ पूर्ण की`,
      `स्कोर: ${finalScore}/${currentQuestions.length} (${finalPercentage}%)`
    );
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  const changeChapter = (chapId: number) => {
    setSelectedChapterId(chapId);
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / currentQuestions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
                <HelpCircle className="w-5 h-5 text-purple-200" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                स्व-मूल्यांकन एवं परीक्षा अभ्यास (Self Practice Quiz)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              अध्यायवार वस्तुनिष्ठ टेस्ट (Objective MCQs)
            </h1>
            <p className="text-xs sm:text-sm text-purple-200 max-w-xl mt-1">
              पाठ्यपुस्तक के सभी बहुचयनात्मक प्रश्नों पर अपनी तैयारी परखें और तुरंत स्कोर व व्याख्या देखें।
            </p>
          </div>

          {/* Chapter Selector */}
          <div className="shrink-0">
            <label className="text-xs text-purple-200 block mb-1 font-medium">पाठ का चयन करें:</label>
            <select
              value={selectedChapterId}
              onChange={(e) => changeChapter(Number(e.target.value))}
              className="text-xs font-bold bg-white/10 border border-white/30 text-white rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {chapters.map(ch => (
                <option key={ch.id} value={ch.id} className="text-slate-900">
                  पाठ {ch.chapterNumber}: {ch.titleHindi}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        {/* Progress header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 text-xs">
          <span className="font-bold text-slate-500">
            पाठ {currentChapter.chapterNumber}: प्रश्न {currentIdx + 1} / {currentQuestions.length}
          </span>
          <span className="font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
            उत्तर दिए: {Object.keys(userAnswers).length} / {currentQuestions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6 overflow-hidden">
          <div 
            className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / currentQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question View */}
        {currentQ && (
          <div className="space-y-5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              <span className="text-purple-600 font-extrabold mr-2">प्र. {currentIdx + 1}.</span>
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {Object.entries(currentQ.options).map(([optKey, optVal]) => {
                const isSelected = userAnswers[currentQ.id] === optKey;
                const isCorrect = currentQ.correctOption === optKey;

                let optClass = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                if (isSubmitted) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optClass = 'bg-rose-50 border-rose-400 text-rose-950 line-through';
                  }
                } else if (isSelected) {
                  optClass = 'bg-purple-50 border-purple-500 text-purple-950 font-semibold ring-2 ring-purple-200';
                }

                return (
                  <button
                    key={optKey}
                    onClick={() => handleSelectOption(optKey)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs sm:text-sm ${optClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white border border-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {optKey}
                      </span>
                      <span>{optVal}</span>
                    </div>

                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation if submitted */}
            {isSubmitted && currentQ.explanation && (
              <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
                💡 <strong>व्याख्या:</strong> {currentQ.explanation}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100"
              >
                पिछला प्रश्न
              </button>

              <div className="flex items-center gap-2">
                {currentIdx < currentQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(prev => Math.min(currentQuestions.length - 1, prev + 1))}
                    className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <span>अगला प्रश्न</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  !isSubmitted && (
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                    >
                      परिणाम देखें (Submit Quiz)
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* Score Card when submitted */}
        {isSubmitted && (
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className={`p-6 rounded-2xl text-center border ${
              percentage >= 80 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : percentage >= 50
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}>
              <div className="w-12 h-12 rounded-full bg-white mx-auto flex items-center justify-center mb-2 shadow-xs">
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              <h4 className="text-lg font-extrabold mb-1">
                आपका स्कोर: {score} / {currentQuestions.length} ({percentage}%)
              </h4>
              <p className="text-xs font-medium mb-4 max-w-md mx-auto">
                {percentage >= 80 
                  ? 'उत्कृष्ट तैयारी! आपने पाठ के सभी प्रमुख तथ्यों को भली-भांति याद कर लिया है।'
                  : percentage >= 50
                  ? 'संतोषजनक! कुछ प्रश्नों के उत्तर पुनः दोहराने के लिए नोट्स टैब का अवलोकन करें।'
                  : 'आपको इस पाठ के नोट्स व महत्वपूर्ण बिंदुओं को एक बार पुनः ध्यानपूर्वक पढ़ने की आवश्यकता है।'}
              </p>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>पुनः अभ्यास करें</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
