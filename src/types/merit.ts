export interface SubjectConfig {
  id: string;              // unique key, e.g. 'hindi', 'english', 'maths', 'science', 'socialScience', 'sanskrit', 'comp_1', etc.
  code: string;            // e.g. '01', '02', '03'
  name: string;            // e.g. 'हिंदी (Hindi)', 'कंप्यूटर (Computer)'
  shortName: string;       // e.g. 'हिंदी', 'कंप्यूटर'
  maxMarks: number;        // e.g. 100, 70, 50, 20
  passMarks?: number;      // e.g. 33%
  hasTheoryOralSplit: boolean; // true if separated into Theory + Oral/Practical
  theoryMax?: number;      // e.g. 70
  oralMax?: number;        // e.g. 30
}

export interface StudentMarkRecord {
  id: string;
  rollNo: string;
  name: string;
  fatherName: string;
  photoUrl?: string; // Student profile photo (Base64 or image URL)
  // Specific legacy direct fields
  hindi?: number;
  english?: number;
  maths?: number;
  science?: number;
  socialScience?: number;
  theory?: number;
  oral?: number;
  sanskritTheory?: number;
  sanskritOral?: number;
  // Dynamic mark values mapped by subjectId
  marks?: Record<string, number>;
  theoryMarks?: Record<string, number>;
  oralMarks?: Record<string, number>;
}

export interface ProcessedStudentSubjectMark {
  subjectId: string;
  code: string;
  name: string;
  shortName: string;
  max: number;
  passMarks: number;
  hasTheoryOralSplit: boolean;
  theory: number | null;
  oral: number | null;
  theoryMax: number;
  oralMax: number;
  obtained: number;
  percentage: number;
  grade: string;
  isPass: boolean;
}

export interface ProcessedStudent extends StudentMarkRecord {
  theory: number;
  oral: number;
  sanskritTotal: number;
  subjectScores: ProcessedStudentSubjectMark[]; // list of scores for all configured active subjects
  totalObtained: number;
  totalMax: number;
  percentage: number;
  grade: string;
  resultStatus: string;
  failedSubjects: number;
  rank: number;
}

export const DEFAULT_SUBJECTS: SubjectConfig[] = [
  { id: 'hindi', code: '01', name: 'हिंदी (Hindi)', shortName: 'हिंदी', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: false },
  { id: 'english', code: '02', name: 'अंग्रेजी (English)', shortName: 'अंग्रेजी', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: false },
  { id: 'maths', code: '03', name: 'गणित (Mathematics)', shortName: 'गणित', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: false },
  { id: 'science', code: '04', name: 'विज्ञान (General Science)', shortName: 'विज्ञान', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: false },
  { id: 'socialScience', code: '05', name: 'सामाजिक विज्ञान (Social Science)', shortName: 'सा.वि.', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: false },
  { id: 'sanskrit', code: '06', name: 'तृतीय भाषा - संस्कृत (Sanskrit)', shortName: 'संस्कृत', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: true, theoryMax: 70, oralMax: 30 }
];
