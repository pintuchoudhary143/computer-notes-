export type StudyLanguage = 'hi' | 'en' | 'bilingual';
export type StudySubject = 'computer' | 'sanskrit';

export interface MCQ {
  id: number;
  question: string;
  questionEnglish?: string;
  options: { [key: string]: string };
  optionsEnglish?: { [key: string]: string };
  correctOption: string;
  explanation?: string;
  explanationEnglish?: string;
}

export interface QAItem {
  id: number;
  question: string;
  questionEnglish?: string;
  answer: string;
  answerEnglish?: string;
  points?: string[];
  pointsEnglish?: string[];
}

export interface ChapterSection {
  title: string;
  titleEnglish?: string;
  subsections?: {
    subtitle: string;
    subtitleEnglish?: string;
    content: string[];
    contentEnglish?: string[];
    table?: {
      headers: string[];
      headersEnglish?: string[];
      rows: string[][];
      rowsEnglish?: string[][];
    };
    callout?: string;
    calloutEnglish?: string;
  }[];
}

export interface Diagram {
  id: string;
  title: string;
  titleEnglish?: string;
  caption: string;
  captionEnglish?: string;
  type: 'block-diagram' | 'network-topology' | 'cables' | 'memory-units' | 'number-system' | 'internet-arch' | 'e-governance' | 'ipr-pillars';
  description: string;
  descriptionEnglish?: string;
}

export interface Chapter {
  id: number;
  subject?: StudySubject;
  unitId: number;
  unitName: string;
  unitHindi: string;
  unitEnglish?: string;
  chapterNumber: number;
  titleHindi: string;
  titleEnglish: string;
  pageRange: string;
  overview: string;
  overviewEnglish?: string;
  sections: ChapterSection[];
  diagrams: Diagram[];
  keyPoints: string[];
  keyPointsEnglish?: string[];
  mcqs: MCQ[];
  veryShortQuestions: QAItem[];
  shortQuestions: QAItem[];
  longQuestions: QAItem[];
}
