import { useState, useEffect, useCallback } from 'react';
import { Chapter } from '../types/study';

const STORAGE_KEY = 'rbse_class9_computer_study_progress_v1';

export interface ChapterProgress {
  completed: number;
  total: number;
  percentage: number;
}

export function useStudyProgress(allChapters: Chapter[]) {
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn('Failed to read study progress from localStorage:', e);
      return {};
    }
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completedTopics));
    } catch (e) {
      console.warn('Failed to save study progress to localStorage:', e);
    }
  }, [completedTopics]);

  const getTopicKey = (chapterId: number, sectionIdx: number, subIdx: number) => {
    return `ch${chapterId}_s${sectionIdx}_sub${subIdx}`;
  };

  const isTopicCompleted = useCallback((chapterId: number, sectionIdx: number, subIdx: number) => {
    return Boolean(completedTopics[getTopicKey(chapterId, sectionIdx, subIdx)]);
  }, [completedTopics]);

  const toggleTopic = useCallback((chapterId: number, sectionIdx: number, subIdx: number) => {
    const key = getTopicKey(chapterId, sectionIdx, subIdx);
    setCompletedTopics(prev => {
      const updated = { ...prev };
      if (updated[key]) {
        delete updated[key];
      } else {
        updated[key] = true;
      }
      return updated;
    });
  }, []);

  const getChapterProgress = useCallback((chapter: Chapter): ChapterProgress => {
    let total = 0;
    let completed = 0;

    chapter.sections.forEach((sec, sIdx) => {
      if (sec.subsections && sec.subsections.length > 0) {
        sec.subsections.forEach((_, subIdx) => {
          total++;
          if (completedTopics[getTopicKey(chapter.id, sIdx, subIdx)]) {
            completed++;
          }
        });
      } else {
        total++;
        if (completedTopics[`ch${chapter.id}_s${sIdx}_sub0`]) {
          completed++;
        }
      }
    });

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }, [completedTopics]);

  const getOverallProgress = useCallback((): ChapterProgress => {
    let total = 0;
    let completed = 0;

    allChapters.forEach(chapter => {
      const cp = getChapterProgress(chapter);
      total += cp.total;
      completed += cp.completed;
    });

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }, [allChapters, getChapterProgress]);

  const markChapterAll = useCallback((chapter: Chapter, markAsDone: boolean) => {
    setCompletedTopics(prev => {
      const updated = { ...prev };
      chapter.sections.forEach((sec, sIdx) => {
        if (sec.subsections && sec.subsections.length > 0) {
          sec.subsections.forEach((_, subIdx) => {
            const key = getTopicKey(chapter.id, sIdx, subIdx);
            if (markAsDone) {
              updated[key] = true;
            } else {
              delete updated[key];
            }
          });
        }
      });
      return updated;
    });
  }, []);

  const resetAllProgress = useCallback(() => {
    if (window.confirm('क्या आप सभी पाठों की अध्ययन प्रगति रीसेट करना चाहते हैं?')) {
      setCompletedTopics({});
    }
  }, []);

  return {
    completedTopics,
    isTopicCompleted,
    toggleTopic,
    getChapterProgress,
    getOverallProgress,
    markChapterAll,
    resetAllProgress
  };
}
