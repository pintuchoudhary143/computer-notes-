import { useState, useEffect, useCallback } from 'react';
import { 
  dailyChallengeQuestions, 
  DailyChallengeItem, 
  getTodayChallengeIndex 
} from '../data/dailyChallengeQuestions';

export const DAILY_CHALLENGE_STORAGE_KEY = 'rbse_class9_daily_challenge_v2';

export interface DailyChallengeState {
  completedDates: string[]; // List of YYYY-MM-DD
  history: Record<string, {
    questionId: string;
    selectedOption: string;
    isCorrect: boolean;
    timestamp: string;
  }>;
  streak: number;
  totalSolved: number;
  correctCount: number;
}

const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0];
};

const getHindiDateString = (dateStr?: string): string => {
  const d = dateStr ? new Date(dateStr) : new Date();
  const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
  const months = [
    'जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
    'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
  ];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export function useDailyChallenge() {
  const todayStr = getTodayDateString();
  const todayIndex = getTodayChallengeIndex(dailyChallengeQuestions.length, todayStr);
  const todayQuestion = dailyChallengeQuestions[todayIndex] || dailyChallengeQuestions[0];

  const [currentIndex, setCurrentIndex] = useState<number>(todayIndex);
  const [challengeData, setChallengeData] = useState<DailyChallengeState>(() => {
    try {
      const saved = localStorage.getItem(DAILY_CHALLENGE_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return {
      completedDates: [],
      history: {},
      streak: 0,
      totalSolved: 0,
      correctCount: 0
    };
  });

  // Save to localStorage whenever state updates
  useEffect(() => {
    try {
      localStorage.setItem(DAILY_CHALLENGE_STORAGE_KEY, JSON.stringify(challengeData));
    } catch {
      // ignore
    }
  }, [challengeData]);

  // Check if today is answered
  const todayRecord = challengeData.history[todayStr];
  const isTodayAnswered = Boolean(todayRecord);
  const todaySelectedOption = todayRecord ? todayRecord.selectedOption : null;
  const todayIsCorrect = todayRecord ? todayRecord.isCorrect : null;

  // Active question currently displayed in UI
  const currentQuestion = dailyChallengeQuestions[currentIndex] || todayQuestion;
  const isViewingToday = currentIndex === todayIndex;

  // Record for current active question if viewing today or another question
  const activeRecord = isViewingToday ? todayRecord : null;
  const activeSelectedOption = activeRecord ? activeRecord.selectedOption : null;

  // Submit answer
  const submitAnswer = useCallback((selectedOption: string) => {
    const isCorrect = selectedOption === currentQuestion.correctOption;

    setChallengeData(prev => {
      const alreadyAnsweredToday = prev.completedDates.includes(todayStr);
      const newCompleted = alreadyAnsweredToday 
        ? prev.completedDates 
        : [...prev.completedDates, todayStr];

      // Calculate streak
      let updatedStreak = prev.streak;
      if (!alreadyAnsweredToday) {
        // check yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yStr = yesterday.toISOString().split('T')[0];
        if (prev.completedDates.includes(yStr) || prev.streak === 0) {
          updatedStreak += 1;
        } else {
          updatedStreak = 1;
        }
      }

      const updatedHistory = {
        ...prev.history,
        [todayStr]: {
          questionId: currentQuestion.id,
          selectedOption,
          isCorrect,
          timestamp: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
        }
      };

      return {
        completedDates: newCompleted,
        history: updatedHistory,
        streak: updatedStreak,
        totalSolved: prev.totalSolved + (alreadyAnsweredToday ? 0 : 1),
        correctCount: prev.correctCount + (isCorrect && !alreadyAnsweredToday ? 1 : 0)
      };
    });

    return {
      isCorrect,
      correctOption: currentQuestion.correctOption,
      explanation: currentQuestion.explanation,
      memoryAnchor: currentQuestion.memoryAnchor
    };
  }, [currentQuestion, todayStr]);

  const showNextQuestion = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % dailyChallengeQuestions.length);
  }, []);

  const showPrevQuestion = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + dailyChallengeQuestions.length) % dailyChallengeQuestions.length);
  }, []);

  const showTodayQuestion = useCallback(() => {
    setCurrentIndex(todayIndex);
  }, [todayIndex]);

  const showRandomQuestion = useCallback(() => {
    const nextIdx = Math.floor(Math.random() * dailyChallengeQuestions.length);
    setCurrentIndex(nextIdx);
  }, []);

  return {
    todayDateString: todayStr,
    todayFormattedHindi: getHindiDateString(todayStr),
    todayQuestion,
    currentQuestion,
    currentIndex,
    totalQuestions: dailyChallengeQuestions.length,
    isViewingToday,
    isTodayAnswered,
    todaySelectedOption,
    todayIsCorrect,
    activeSelectedOption,
    streak: challengeData.streak,
    totalSolved: challengeData.totalSolved,
    correctCount: challengeData.correctCount,
    submitAnswer,
    showNextQuestion,
    showPrevQuestion,
    showTodayQuestion,
    showRandomQuestion
  };
}
