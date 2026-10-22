import { Chapter, StudyLanguage } from '../../types/study';
import { chapter1 } from './chapter1';
import { chapter2 } from './chapter2';
import { chapter3 } from './chapter3';
import { chapter4 } from './chapter4';
import { chapter5 } from './chapter5';
import { chapter6 } from './chapter6';
import { chapter7 } from './chapter7';
import { chapter8 } from './chapter8';
import { englishChapters } from '../englishChaptersData';
import { sanskritChapters } from '../sanskritChaptersData';

export const allChapters: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8
];

export {
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8
};

export function getChapterInLanguage(chapterId: number, lang: StudyLanguage = 'hi'): Chapter {
  if (chapterId >= 100) {
    const sanskrit = sanskritChapters.find(c => c.id === chapterId);
    if (sanskrit) return sanskrit;
  }
  const baseHindi = allChapters.find(c => c.id === chapterId) || allChapters[0];
  const english = englishChapters[chapterId];

  if (lang === 'en' && english) {
    return {
      ...english,
      diagrams: baseHindi.diagrams // Keep diagrams available
    };
  }

  if (lang === 'bilingual' && english) {
    return {
      ...baseHindi,
      titleHindi: `${baseHindi.titleHindi} (${baseHindi.titleEnglish})`,
      overview: `${baseHindi.overview}\n\n[English Overview]: ${english.overviewEnglish || english.overview}`,
      keyPoints: [
        ...baseHindi.keyPoints.map(p => `[HI] ${p}`),
        ...(english.keyPointsEnglish || []).map(p => `[EN] ${p}`)
      ],
      sections: baseHindi.sections.map((sec, sIdx) => {
        const engSec = english.sections[sIdx];
        return {
          ...sec,
          title: engSec ? `${sec.title} / ${engSec.titleEnglish || engSec.title}` : sec.title,
          subsections: sec.subsections?.map((sub, subIdx) => {
            const engSub = engSec?.subsections?.[subIdx];
            return {
              ...sub,
              subtitle: engSub ? `${sub.subtitle} (${engSub.subtitleEnglish || engSub.subtitle})` : sub.subtitle,
              content: [
                ...sub.content.map(c => `[HI] ${c}`),
                ...(engSub?.content || []).map(c => `[EN] ${c}`)
              ],
              callout: sub.callout 
                ? (engSub?.callout ? `[HI] ${sub.callout} | [EN] ${engSub.callout}` : sub.callout)
                : engSub?.callout
            };
          })
        };
      }),
      mcqs: baseHindi.mcqs.map((m, mIdx) => {
        const engM = english.mcqs[mIdx];
        return {
          ...m,
          question: engM ? `${m.question}\n[EN]: ${engM.questionEnglish || engM.question}` : m.question,
          options: engM ? {
            ...m.options,
            ...Object.fromEntries(
              Object.entries(m.options).map(([k, v]) => [k, engM.options[k] ? `${v} (${engM.options[k]})` : v])
            )
          } : m.options
        };
      }),
      veryShortQuestions: baseHindi.veryShortQuestions.map((q, qIdx) => {
        const engQ = english.veryShortQuestions[qIdx];
        return {
          ...q,
          question: engQ ? `${q.question} / ${engQ.questionEnglish || engQ.question}` : q.question,
          answer: engQ ? `${q.answer}\n[EN]: ${engQ.answerEnglish || engQ.answer}` : q.answer
        };
      }),
      shortQuestions: baseHindi.shortQuestions.map((q, qIdx) => {
        const engQ = english.shortQuestions[qIdx];
        return {
          ...q,
          question: engQ ? `${q.question} / ${engQ.questionEnglish || engQ.question}` : q.question,
          answer: engQ ? `${q.answer}\n[EN]: ${engQ.answerEnglish || engQ.answer}` : q.answer
        };
      }),
      longQuestions: baseHindi.longQuestions.map((q, qIdx) => {
        const engQ = english.longQuestions[qIdx];
        return {
          ...q,
          question: engQ ? `${q.question} / ${engQ.questionEnglish || engQ.question}` : q.question,
          answer: engQ ? `${q.answer}\n[EN]: ${engQ.answerEnglish || engQ.answer}` : q.answer
        };
      })
    };
  }

  return baseHindi;
}

export function getAllChaptersInLanguage(lang: StudyLanguage = 'hi'): Chapter[] {
  if (lang === 'hi') return allChapters;
  return allChapters.map(ch => getChapterInLanguage(ch.id, lang));
}
