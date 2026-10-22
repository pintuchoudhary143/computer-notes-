import { useSyncExternalStore, useCallback } from 'react';

export const STREAK_STORAGE_KEY = 'rbse_class9_study_streak_v1';

export interface StreakActivity {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  type: 'notes' | 'quiz' | 'exam' | 'checkin';
  title: string;
  details?: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  activeDates: string[]; // List of unique YYYY-MM-DD
  history: StreakActivity[];
}

// Helper to get local date in YYYY-MM-DD
export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper to calculate difference in calendar days
export function getDaysDifference(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(dateStr1 + 'T00:00:00');
  const d2 = new Date(dateStr2 + 'T00:00:00');
  const diffTime = d1.getTime() - d2.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

const defaultStreakData: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  activeDates: [],
  history: []
};

function readStreakFromStorage(): StreakData {
  try {
    const saved = localStorage.getItem(STREAK_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load study streak from localStorage:', e);
  }
  return defaultStreakData;
}

// Shared singleton store state
let streakStore: StreakData = readStreakFromStorage();
const listeners = new Set<() => void>();

function notifyListeners() {
  queueMicrotask(() => {
    listeners.forEach(listener => {
      try {
        listener();
      } catch (e) {
        console.warn('Error in streak listener:', e);
      }
    });
  });
}

function updateStreakStore(newData: StreakData) {
  streakStore = newData;
  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(newData));
  } catch (e) {
    console.warn('Failed to save study streak:', e);
  }
  notifyListeners();
}

// Cross-tab storage event listener
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STREAK_STORAGE_KEY && e.newValue) {
      try {
        streakStore = JSON.parse(e.newValue);
        notifyListeners();
      } catch (err) {
        console.warn('Failed to parse storage update:', err);
      }
    }
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): StreakData {
  return streakStore;
}

export function useStudyStreak() {
  const streakData = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const todayStr = getLocalDateString();

  const effectiveCurrentStreak = (() => {
    if (!streakData.lastActiveDate) return 0;
    const diff = getDaysDifference(todayStr, streakData.lastActiveDate);
    if (diff === 0) {
      return streakData.currentStreak;
    } else if (diff === 1) {
      return streakData.currentStreak;
    } else {
      return 0;
    }
  })();

  const isTodayLogged = Boolean(
    streakData.lastActiveDate === todayStr || streakData.activeDates?.includes(todayStr)
  );

  const recordActivity = useCallback((
    type: 'notes' | 'quiz' | 'exam' | 'checkin',
    title: string = 'अध्ययन गतिविधि',
    details?: string
  ) => {
    const today = getLocalDateString();
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const prev = streakStore;
    const activeDatesSet = new Set(prev.activeDates || []);
    activeDatesSet.add(today);
    const newActiveDates = Array.from(activeDatesSet).sort();

    let newCurrentStreak = prev.currentStreak;

    if (!prev.lastActiveDate) {
      newCurrentStreak = 1;
    } else {
      const diff = getDaysDifference(today, prev.lastActiveDate);
      if (diff === 0) {
        newCurrentStreak = prev.currentStreak > 0 ? prev.currentStreak : 1;
      } else if (diff === 1) {
        newCurrentStreak = (prev.currentStreak > 0 ? prev.currentStreak : 0) + 1;
      } else {
        newCurrentStreak = 1;
      }
    }

    const newLongestStreak = Math.max(prev.longestStreak || 0, newCurrentStreak);

    const newActivity: StreakActivity = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      date: today,
      time: timeStr,
      type,
      title,
      details
    };

    const updatedHistory = [newActivity, ...(prev.history || [])].slice(0, 30);

    const updated: StreakData = {
      currentStreak: newCurrentStreak,
      longestStreak: newLongestStreak,
      lastActiveDate: today,
      activeDates: newActiveDates,
      history: updatedHistory
    };

    updateStreakStore(updated);
  }, []);

  const logTodayManually = useCallback(() => {
    recordActivity('checkin', 'दैनिक उपस्थिति दर्ज की गई', 'विद्यार्थी ने आज पोर्टल पर अध्ययन उपस्थिति दर्ज की');
  }, [recordActivity]);

  const resetStreak = useCallback(() => {
    if (window.confirm('क्या आप अपनी स्टडी स्ट्रीक (Study Streak) डेटा रीसेट करना चाहते हैं?')) {
      const resetState: StreakData = {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
        activeDates: [],
        history: []
      };
      updateStreakStore(resetState);
    }
  }, []);

  const getWeeklyStatus = useCallback(() => {
    const daysHindi = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
    const result = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = getLocalDateString(d);
      const isToday = dateStr === todayStr;
      const isActive = streakData.activeDates?.includes(dateStr) || false;

      result.push({
        dateStr,
        dayName: daysHindi[d.getDay()],
        dayNumber: d.getDate(),
        monthNumber: d.getMonth() + 1,
        isToday,
        isActive
      });
    }

    return result;
  }, [streakData.activeDates, todayStr]);

  return {
    streakData,
    currentStreak: effectiveCurrentStreak,
    longestStreak: streakData.longestStreak,
    isTodayLogged,
    totalActiveDays: streakData.activeDates?.length || 0,
    history: streakData.history || [],
    recordActivity,
    logTodayManually,
    resetStreak,
    getWeeklyStatus
  };
}
