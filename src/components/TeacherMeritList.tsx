import React, { useState, useMemo, useEffect } from 'react';
import { 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Award, 
  TrendingUp, 
  FileSpreadsheet, 
  CheckCircle2, 
  Users, 
  Sparkles, 
  HelpCircle, 
  ArrowUpDown, 
  School, 
  Save, 
  BookOpen, 
  Calendar, 
  Search, 
  FileText, 
  X, 
  ExternalLink, 
  Copy, 
  Check,
  Edit3,
  Layers,
  Star,
  Settings,
  PlusCircle,
  Eye,
  SlidersHorizontal,
  BookmarkCheck
} from 'lucide-react';
import { LuxuryMarksheet } from './LuxuryMarksheet';
import { PremiumMarksheetView } from './PremiumMarksheetView';
import { 
  SubjectConfig, 
  DEFAULT_SUBJECTS, 
  StudentMarkRecord, 
  ProcessedStudent, 
  ProcessedStudentSubjectMark 
} from '../types/merit';
import { printElementDirectly } from '../utils/printHelper';

export { PremiumMarksheetView };
export type { StudentMarkRecord, ProcessedStudent, SubjectConfig, ProcessedStudentSubjectMark };


export const EXAM_OPTIONS = [
  'वार्षिक मुख्य परीक्षा (Annual Examination - मार्च/अप्रैल)',
  'अर्द्धवार्षिक परीक्षा (Half-Yearly Examination - दिसम्बर)',
  'प्रथम परख / टेस्ट (1st Assessment Test - अगस्त)',
  'द्वितीय परख / टेस्ट (2nd Assessment Test - अक्टूबर)',
  'तृतीय परख / टेस्ट (3rd Assessment Test - जनवरी)',
  'प्री-बोर्ड परीक्षा (Pre-Board Examination - फरवरी)',
  'त्रैमासिक परीक्षा (Quarterly Examination - सितम्बर)',
  'प्रथम सत्रांक परीक्षा (1st Terminal Examination)',
  'द्वितीय सत्रांक परीक्षा (2nd Terminal Examination)',
  'मासिक मूल्यांकन टेस्ट 1 (Monthly Evaluation Test 1)',
  'मासिक मूल्यांकन टेस्ट 2 (Monthly Evaluation Test 2)',
  'सतत एवं व्यापक मूल्यांकन (CCE Periodic Evaluation)',
  'प्रायोगिक एवं मौखिक परीक्षा (Practical & Oral Viva Assessment)'
];

const INITIAL_STUDENTS: StudentMarkRecord[] = [
  { id: '1', rollNo: '901', name: 'राहुल शर्मा', fatherName: 'श्री जगदीश प्रसाद शर्मा', hindi: 92, english: 88, maths: 98, science: 95, socialScience: 91, theory: 68, oral: 29, sanskritTheory: 68, sanskritOral: 29 },
  { id: '2', rollNo: '902', name: 'प्रिया चौधरी', fatherName: 'श्री रामेश्वर लाल चौधरी', hindi: 95, english: 92, maths: 94, science: 96, socialScience: 94, theory: 69, oral: 28, sanskritTheory: 69, sanskritOral: 28 },
  { id: '3', rollNo: '903', name: 'अमित कुमार वैष्णव', fatherName: 'श्री सत्यनारायण वैष्णव', hindi: 84, english: 80, maths: 91, science: 88, socialScience: 82, theory: 66, oral: 27, sanskritTheory: 66, sanskritOral: 27 },
  { id: '4', rollNo: '904', name: 'दीक्षा जांगिड़', fatherName: 'श्री कैलाश चन्द जांगिड़', hindi: 89, english: 86, maths: 88, science: 90, socialScience: 87, theory: 65, oral: 27, sanskritTheory: 65, sanskritOral: 27 },
  { id: '5', rollNo: '905', name: 'रोहित सिंह राठौड़', fatherName: 'श्री भंवर सिंह राठौड़', hindi: 78, english: 74, maths: 85, science: 80, socialScience: 79, theory: 61, oral: 26, sanskritTheory: 61, sanskritOral: 26 },
  { id: '6', rollNo: '906', name: 'अंजली सैनी', fatherName: 'श्री ओमप्रकाश सैनी', hindi: 88, english: 85, maths: 82, science: 84, socialScience: 86, theory: 64, oral: 26, sanskritTheory: 64, sanskritOral: 26 },
  { id: '7', rollNo: '907', name: 'विकास कुमावत', fatherName: 'श्री गोपी लाल कुमावत', hindi: 72, english: 68, maths: 76, science: 74, socialScience: 70, theory: 56, oral: 24, sanskritTheory: 56, sanskritOral: 24 },
  { id: '8', rollNo: '908', name: 'पूजा पारीक', fatherName: 'श्री महेश चन्द पारीक', hindi: 91, english: 89, maths: 93, science: 92, socialScience: 90, theory: 67, oral: 28, sanskritTheory: 67, sanskritOral: 28 },
  { id: '9', rollNo: '909', name: 'मनीष गुर्जर', fatherName: 'श्री रामदेव गुर्जर', hindi: 65, english: 60, maths: 70, science: 68, socialScience: 64, theory: 52, oral: 23, sanskritTheory: 52, sanskritOral: 23 },
  { id: '10', rollNo: '910', name: 'नेहा सोनी', fatherName: 'श्री दिनेश चन्द सोनी', hindi: 86, english: 82, maths: 89, science: 85, socialScience: 84, theory: 63, oral: 26, sanskritTheory: 63, sanskritOral: 26 }
];

export const TeacherMeritList: React.FC = () => {
  // School & Institutional Branding
  const [schoolName, setSchoolName] = useState<string>('पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी (राजस्थान)');
  const [schoolSubtitle, setSchoolSubtitle] = useState<string>('माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE) सम्बद्ध · SEMIS CODE: 08211102601');
  
  // Class & Exam Header Details
  const [examName, setExamName] = useState<string>(EXAM_OPTIONS[4]);
  const [customExamName, setCustomExamName] = useState<string>('');
  const [isCustomExam, setIsCustomExam] = useState<boolean>(false);
  const [className, setClassName] = useState<string>('कक्षा 9th (Class IX)');
  const [section, setSection] = useState<string>('A');
  const [classTeacher, setClassTeacher] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('pavn_class_teacher_name');
      if (saved) return saved;
    } catch (e) {}
    return 'श्री सुरेश चन्द शर्मा (वरिष्ठ अध्यापक)';
  });
  const [examIncharge, setExamIncharge] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('pavn_exam_incharge_name');
      if (saved) return saved;
    } catch (e) {}
    return 'श्री मदन लाल जी शर्मा (परीक्षा प्रभारी)';
  });
  const [principalName, setPrincipalName] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('pavn_principal_name');
      if (saved) return saved;
    } catch (e) {}
    return 'श्री राधेश्याम जी पारीक (प्रधानाचार्य)';
  });
  const [academicSession, setAcademicSession] = useState<string>('2026-2027');
  const [maxMarksPerSubject, setMaxMarksPerSubject] = useState<number>(100);
  const [sanskritTheoryMax, setSanskritTheoryMax] = useState<number>(70);
  const [sanskritOralMax, setSanskritOralMax] = useState<number>(30);
  const [declarationDate, setDeclarationDate] = useState<string>(() => {
    return new Date().toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  });

  const handleClassTeacherChange = (val: string) => {
    setClassTeacher(val);
    try { localStorage.setItem('pavn_class_teacher_name', val); } catch (e) {}
  };

  const handleExamInchargeChange = (val: string) => {
    setExamIncharge(val);
    try { localStorage.setItem('pavn_exam_incharge_name', val); } catch (e) {}
  };

  const handlePrincipalNameChange = (val: string) => {
    setPrincipalName(val);
    try { localStorage.setItem('pavn_principal_name', val); } catch (e) {}
  };


  // Students Data with localStorage migration
  const [students, setStudents] = useState<StudentMarkRecord[]>(() => {
    try {
      const saved = localStorage.getItem('pavn_teacher_merit_students');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((s: any) => {
            const comp = Number(s.computer || 80);
            const oral = s.oral !== undefined ? Number(s.oral) : (s.sanskritOral !== undefined ? Number(s.sanskritOral) : Math.min(30, Math.round(comp * 0.3)));
            const theory = s.theory !== undefined ? Number(s.theory) : (s.sanskritTheory !== undefined ? Number(s.sanskritTheory) : comp - oral);
            const { computer, ...rest } = s;
            return {
              ...rest,
              theory,
              oral,
              sanskritTheory: theory,
              sanskritOral: oral
            };
          });
        }
      }
    } catch (e) {}
    return INITIAL_STUDENTS;
  });

  // Dynamic Subject Configuration (Stored in localStorage for persistent teacher settings)
  const [subjects, setSubjects] = useState<SubjectConfig[]>(() => {
    try {
      const saved = localStorage.getItem('pavn_merit_subject_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_SUBJECTS;
  });

  // UI State for Subject Manager & Modals
  const [showSubjectModal, setShowSubjectModal] = useState<boolean>(false);
  const [newSubName, setNewSubName] = useState('');
  const [newSubShortName, setNewSubShortName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubMax, setNewSubMax] = useState<number>(100);
  const [newSubHasSplit, setNewSubHasSplit] = useState<boolean>(false);
  const [newSubTheoryMax, setNewSubTheoryMax] = useState<number>(70);
  const [newSubOralMax, setNewSubOralMax] = useState<number>(30);

  const [searchFilter, setSearchFilter] = useState('');
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [selectedStudentForReportCard, setSelectedStudentForReportCard] = useState<ProcessedStudent | null>(null);
  const [editingStudent, setEditingStudent] = useState<StudentMarkRecord | null>(null);
  const [selectedStudentForLuxuryMarksheet, setSelectedStudentForLuxuryMarksheet] = useState<ProcessedStudent | null>(null);
  const [showLuxuryMarksheet, setShowLuxuryMarksheet] = useState<boolean>(false);
  const [copiedFormulaIndex, setCopiedFormulaIndex] = useState<number | null>(null);

  // Save subject configuration
  const handleSaveSubjects = (newSubs: SubjectConfig[]) => {
    setSubjects(newSubs);
    try {
      localStorage.setItem('pavn_merit_subject_config', JSON.stringify(newSubs));
      window.dispatchEvent(new Event('merit-list-updated'));
    } catch (e) {
      console.warn('Failed to save subjects:', e);
    }
  };

  // Add custom subject
  const handleAddCustomSubject = () => {
    if (!newSubName.trim()) {
      alert('कृपया विषय का नाम दर्ज करें!');
      return;
    }
    const id = 'sub_' + Date.now();
    const code = newSubCode.trim() || String(subjects.length + 1).padStart(2, '0');
    const shortName = newSubShortName.trim() || newSubName.trim().slice(0, 8);
    const max = Number(newSubMax) || 100;
    const thMax = newSubHasSplit ? (Number(newSubTheoryMax) || 70) : undefined;
    const orMax = newSubHasSplit ? (Number(newSubOralMax) || 30) : undefined;
    const passMarks = Math.round(max * 0.33);

    const newSub: SubjectConfig = {
      id,
      code,
      name: newSubName.trim(),
      shortName,
      maxMarks: max,
      passMarks,
      hasTheoryOralSplit: newSubHasSplit,
      theoryMax: thMax,
      oralMax: orMax
    };

    const updatedSubs = [...subjects, newSub];
    handleSaveSubjects(updatedSubs);
    setNewSubName('');
    setNewSubShortName('');
    setNewSubCode('');
    setNewSubHasSplit(false);
  };

  // Remove subject
  const handleRemoveSubject = (id: string) => {
    if (subjects.length <= 1) {
      alert('कम से कम एक विषय मेरिट लिस्ट में होना अनिवार्य है!');
      return;
    }
    const subToRemove = subjects.find(s => s.id === id);
    if (confirm(`क्या आप विषय "${subToRemove?.name || id}" को मेरिट लिस्ट और अंकतालिका से हटाना चाहते हैं?`)) {
      const updated = subjects.filter(s => s.id !== id);
      handleSaveSubjects(updated);
    }
  };

  // Add preset subject
  const handleAddPresetSubject = (preset: { code: string; name: string; shortName: string; maxMarks: number; passMarks?: number; hasTheoryOralSplit: boolean; theoryMax?: number; oralMax?: number }) => {
    const id = 'preset_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    const newSub: SubjectConfig = {
      ...preset,
      id
    };
    const updated = [...subjects, newSub];
    handleSaveSubjects(updated);
  };

  // Reset subjects to default 6
  const handleResetSubjectsToDefault = () => {
    if (confirm('क्या आप विषयों को पुनः राजस्थान बोर्ड के मानक 6 मुख्य विषयों (हिंदी, अंग्रेजी, गणित, विज्ञान, सामाजिक विज्ञान, संस्कृत) में रीसेट करना चाहते हैं?')) {
      handleSaveSubjects(DEFAULT_SUBJECTS);
    }
  };

  // Save students to localStorage
  const handleSaveToLocal = (dataToSave: StudentMarkRecord[]) => {
    try {
      localStorage.setItem('pavn_teacher_merit_students', JSON.stringify(dataToSave));
      window.dispatchEvent(new Event('merit-list-updated'));
    } catch (e) {
      console.warn('Failed to save students:', e);
    }
  };

  // Dynamic Subject Score Change Handler (supports standard marks, theory, and oral)
  const handleSubjectScoreChange = (
    studentId: string, 
    subjectId: string, 
    type: 'mark' | 'theory' | 'oral', 
    val: any,
    maxLimit: number
  ) => {
    const numVal = Math.max(0, Math.min(maxLimit, Number(val) || 0));
    const updated = students.map(s => {
      if (s.id !== studentId) return s;
      const copy: StudentMarkRecord = {
        ...s,
        marks: { ...(s.marks || {}) },
        theoryMarks: { ...(s.theoryMarks || {}) },
        oralMarks: { ...(s.oralMarks || {}) }
      };

      if (type === 'mark') {
        copy.marks![subjectId] = numVal;
        if (subjectId === 'hindi') copy.hindi = numVal;
        if (subjectId === 'english') copy.english = numVal;
        if (subjectId === 'maths') copy.maths = numVal;
        if (subjectId === 'science') copy.science = numVal;
        if (subjectId === 'socialScience') copy.socialScience = numVal;
      } else if (type === 'theory') {
        copy.theoryMarks![subjectId] = numVal;
        if (subjectId === 'sanskrit') {
          copy.theory = numVal;
          copy.sanskritTheory = numVal;
        }
      } else if (type === 'oral') {
        copy.oralMarks![subjectId] = numVal;
        if (subjectId === 'sanskrit') {
          copy.oral = numVal;
          copy.sanskritOral = numVal;
        }
      }
      return copy;
    });
    setStudents(updated);
    handleSaveToLocal(updated);
  };

  // Update a single student field (Roll No, Name, Father Name, or legacy theory/oral)
  const handleFieldChange = (id: string, field: keyof StudentMarkRecord | 'theory' | 'oral', val: any) => {
    const updated = students.map(s => {
      if (s.id === id) {
        if (field === 'name' || field === 'fatherName' || field === 'rollNo') {
          return { ...s, [field]: val };
        }

        let fieldMax = maxMarksPerSubject;
        if (field === 'sanskritTheory' || field === 'theory') fieldMax = sanskritTheoryMax;
        else if (field === 'sanskritOral' || field === 'oral') fieldMax = sanskritOralMax;

        const numVal = Math.max(0, Math.min(fieldMax, Number(val) || 0));

        if (field === 'theory' || field === 'sanskritTheory') {
          const tm = { ...(s.theoryMarks || {}) };
          tm['sanskrit'] = numVal;
          return {
            ...s,
            theory: numVal,
            sanskritTheory: numVal,
            theoryMarks: tm
          };
        }

        if (field === 'oral' || field === 'sanskritOral') {
          const om = { ...(s.oralMarks || {}) };
          om['sanskrit'] = numVal;
          return {
            ...s,
            oral: numVal,
            sanskritOral: numVal,
            oralMarks: om
          };
        }

        const m = { ...(s.marks || {}) };
        m[field as string] = numVal;
        return {
          ...s,
          [field]: numVal,
          marks: m
        };
      }
      return s;
    });
    setStudents(updated);
    handleSaveToLocal(updated);
  };

  // Calculate Totals, Percentages, Grades, and Ranks dynamically based on ONLY active subjects
  const processedStudents: ProcessedStudent[] = useMemo(() => {
    const grandMax = subjects.reduce((sum, s) => sum + s.maxMarks, 0);

    const mapped = students.map(student => {
      let grandObtained = 0;
      let failedCount = 0;

      const subjectScores: ProcessedStudentSubjectMark[] = subjects.map(sub => {
        let obtained = 0;
        let theory: number | null = null;
        let oral: number | null = null;
        const thMax = sub.theoryMax ?? 70;
        const orMax = sub.oralMax ?? 30;

        if (sub.hasTheoryOralSplit) {
          theory = student.theoryMarks?.[sub.id] ?? 
            (sub.id === 'sanskrit' ? (student.theory !== undefined ? student.theory : (student.sanskritTheory ?? 0)) : Math.round(thMax * 0.75));
          oral = student.oralMarks?.[sub.id] ?? 
            (sub.id === 'sanskrit' ? (student.oral !== undefined ? student.oral : (student.sanskritOral ?? 0)) : Math.round(orMax * 0.8));
          obtained = (theory || 0) + (oral || 0);
        } else {
          obtained = student.marks?.[sub.id] ?? 
            (student[sub.id as keyof StudentMarkRecord] as number) ?? 70;
        }

        const passMark = sub.passMarks ?? Math.round(sub.maxMarks * 0.33);
        const isPass = obtained >= passMark;
        if (!isPass) failedCount++;

        const pct = sub.maxMarks > 0 ? Math.round((obtained / sub.maxMarks) * 100) : 0;
        const subGrade = pct >= 90 ? 'A+' : pct >= 75 ? 'A' : pct >= 60 ? 'B+' : pct >= 45 ? 'B' : pct >= 33 ? 'C' : 'D';

        grandObtained += obtained;

        return {
          subjectId: sub.id,
          code: sub.code,
          name: sub.name,
          shortName: sub.shortName,
          max: sub.maxMarks,
          passMarks: passMark,
          hasTheoryOralSplit: sub.hasTheoryOralSplit,
          theory,
          oral,
          theoryMax: thMax,
          oralMax: orMax,
          obtained,
          percentage: pct,
          grade: subGrade,
          isPass
        };
      });

      const percentage = grandMax > 0 ? Math.round((grandObtained / grandMax) * 10000) / 100 : 0;

      let grade = 'D';
      if (percentage >= 90) grade = 'A+';
      else if (percentage >= 75) grade = 'A';
      else if (percentage >= 60) grade = 'B+';
      else if (percentage >= 45) grade = 'B';
      else if (percentage >= 33) grade = 'C';

      let resultStatus = 'उत्तीर्ण (Pass)';
      if (failedCount === 1 || failedCount === 2) {
        resultStatus = 'सप्लीमेंट्री (Comp.)';
      } else if (failedCount > 2 || percentage < 33) {
        resultStatus = 'अनुत्तीर्ण (Fail)';
      }

      // Legacy fallback extraction for Sanskrit / general theory-oral
      const sanskritScore = subjectScores.find(s => s.subjectId === 'sanskrit');
      const fallbackTheory = sanskritScore?.theory ?? (student.theory !== undefined ? student.theory : student.sanskritTheory || 0);
      const fallbackOral = sanskritScore?.oral ?? (student.oral !== undefined ? student.oral : student.sanskritOral || 0);

      return {
        ...student,
        theory: fallbackTheory,
        oral: fallbackOral,
        sanskritTheory: fallbackTheory,
        sanskritOral: fallbackOral,
        sanskritTotal: fallbackTheory + fallbackOral,
        subjectScores,
        totalObtained: grandObtained,
        totalMax: grandMax,
        percentage,
        grade,
        resultStatus,
        failedSubjects: failedCount,
        rank: 0
      };
    });

    // Compute Rank using standard competition ranking
    const sortedByScore = [...mapped].sort((a, b) => b.totalObtained - a.totalObtained);

    const rankMap = new Map<string, number>();
    let currentRank = 1;
    for (let i = 0; i < sortedByScore.length; i++) {
      if (i > 0 && sortedByScore[i].totalObtained < sortedByScore[i - 1].totalObtained) {
        currentRank = i + 1;
      }
      rankMap.set(sortedByScore[i].id, currentRank);
    }

    return mapped.map(s => ({
      ...s,
      rank: rankMap.get(s.id) || 1
    }));
  }, [students, subjects]);

  // Sort by Merit Rank
  const handleSortByMerit = () => {
    const sorted = [...students].sort((a, b) => {
      const getStudentTotal = (st: StudentMarkRecord) => {
        return subjects.reduce((sum, sub) => {
          if (sub.hasTheoryOralSplit) {
            const th = st.theoryMarks?.[sub.id] ?? (sub.id === 'sanskrit' ? (st.theory ?? st.sanskritTheory ?? 0) : 0);
            const or = st.oralMarks?.[sub.id] ?? (sub.id === 'sanskrit' ? (st.oral ?? st.sanskritOral ?? 0) : 0);
            return sum + th + or;
          }
          return sum + (st.marks?.[sub.id] ?? (st[sub.id as keyof StudentMarkRecord] as number) ?? 0);
        }, 0);
      };
      return getStudentTotal(b) - getStudentTotal(a);
    });
    setStudents(sorted);
    handleSaveToLocal(sorted);
  };

  // Sort by Roll Number
  const handleSortByRollNo = () => {
    const sorted = [...students].sort((a, b) => Number(a.rollNo) - Number(b.rollNo));
    setStudents(sorted);
    handleSaveToLocal(sorted);
  };

  // Add new student row
  const handleAddStudent = () => {
    const nextRoll = students.length > 0 
      ? String(Math.max(...students.map(s => Number(s.rollNo) || 0)) + 1)
      : '901';

    const defaultMarks: Record<string, number> = {};
    const defaultTheory: Record<string, number> = {};
    const defaultOral: Record<string, number> = {};

    subjects.forEach(sub => {
      if (sub.hasTheoryOralSplit) {
        defaultTheory[sub.id] = Math.round((sub.theoryMax ?? 70) * 0.75);
        defaultOral[sub.id] = Math.round((sub.oralMax ?? 30) * 0.8);
      } else {
        defaultMarks[sub.id] = Math.round(sub.maxMarks * 0.7);
      }
    });

    const sanskritTh = defaultTheory['sanskrit'] ?? Math.round(sanskritTheoryMax * 0.75);
    const sanskritOr = defaultOral['sanskrit'] ?? Math.round(sanskritOralMax * 0.8);

    const newRow: StudentMarkRecord = {
      id: String(Date.now()),
      rollNo: nextRoll,
      name: 'नया विद्यार्थी',
      fatherName: 'श्री अभिभावक का नाम',
      hindi: defaultMarks['hindi'] ?? 70,
      english: defaultMarks['english'] ?? 70,
      maths: defaultMarks['maths'] ?? 70,
      science: defaultMarks['science'] ?? 70,
      socialScience: defaultMarks['socialScience'] ?? 70,
      theory: sanskritTh,
      oral: sanskritOr,
      sanskritTheory: sanskritTh,
      sanskritOral: sanskritOr,
      marks: defaultMarks,
      theoryMarks: defaultTheory,
      oralMarks: defaultOral
    };

    const updated = [...students, newRow];
    setStudents(updated);
    handleSaveToLocal(updated);
  };

  // Delete student row
  const handleDeleteStudent = (id: string) => {
    if (students.length <= 1) {
      if (confirm('क्या आप इस अंतिम रिकॉर्ड को खाली करना चाहते हैं?')) {
        const cleared: StudentMarkRecord = {
          id: String(Date.now()),
          rollNo: '101',
          name: '',
          fatherName: '',
          marks: {},
          theoryMarks: {},
          oralMarks: {}
        };
        setStudents([cleared]);
        handleSaveToLocal([cleared]);
      }
      return;
    }
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    handleSaveToLocal(updated);
  };

  // Start with a completely Blank Merit List
  const handleStartBlankMeritList = () => {
    if (confirm('क्या आप बिल्कुल नई खाली मेरिट लिस्ट (Blank Merit List) शुरू करना चाहते हैं?\n\nइसमें पुराने सैंपल रिकॉर्ड्स हट जाएंगे और आप केवल अपनी कक्षा के वास्तविक छात्र, रोल नंबर, नाम, पिता का नाम और अंक जोड़ सकेंगे।')) {
      const blankRow: StudentMarkRecord = {
        id: String(Date.now()),
        rollNo: '101',
        name: '',
        fatherName: '',
        marks: {},
        theoryMarks: {},
        oralMarks: {}
      };
      setStudents([blankRow]);
      handleSaveToLocal([blankRow]);
    }
  };

  // Student Photo Upload Handler (Converts to Base64)
  const handleStudentPhotoUpload = (studentId: string, file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('कृपया केवल वैध फोटो फाइल (JPG, PNG) चुनें!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const updated = students.map(s => s.id === studentId ? { ...s, photoUrl: base64 } : s);
      setStudents(updated);
      handleSaveToLocal(updated);
      if (editingStudent && editingStudent.id === studentId) {
        setEditingStudent({ ...editingStudent, photoUrl: base64 });
      }
    };
    reader.readAsDataURL(file);
  };

  // Reset to initial sample data
  const handleResetSample = () => {
    if (confirm('क्या आप सभी डेटा को डिफ़ॉल्ट 10 विद्यार्थियों की मेरिट लिस्ट में रीसेट करना चाहते हैं?')) {
      setStudents(INITIAL_STUDENTS);
      handleSaveToLocal(INITIAL_STUDENTS);
    }
  };


  const displayExam = isCustomExam ? customExamName : examName;

  // Helper for Excel Column Letter (0 = A, 1 = B, 26 = AA, etc.)
  const getExcelCol = (colIndex: number): string => {
    let temp = colIndex;
    let letter = '';
    while (temp >= 0) {
      letter = String.fromCharCode((temp % 26) + 65) + letter;
      temp = Math.floor(temp / 26) - 1;
    }
    return letter;
  };

  // Export to Real Excel .XLS with Dynamic Formulas (=SUM, =AVERAGE, =RANK)
  const handleExportExcelWithFormulas = () => {
    const grandMax = subjects.reduce((sum, s) => sum + s.maxMarks, 0);
    const startRow = 5; // header rows before data in excel
    const lastRow = startRow + processedStudents.length - 1;

    // Build subject column headers and track their column letters
    interface ExcelSubjectCol {
      sub: SubjectConfig;
      type: 'single' | 'split';
      theoryCol?: string;
      oralCol?: string;
      totalCol: string;
    }

    let currentColIdx = 4; // 0=A(S.No), 1=B(Roll), 2=C(Name), 3=D(Father)
    const subjectColMeta: ExcelSubjectCol[] = [];
    let subjectHeadersHtml = '';

    subjects.forEach(sub => {
      if (sub.hasTheoryOralSplit) {
        const thCol = getExcelCol(currentColIdx++);
        const orCol = getExcelCol(currentColIdx++);
        const totCol = getExcelCol(currentColIdx++);
        subjectColMeta.push({
          sub,
          type: 'split',
          theoryCol: thCol,
          oralCol: orCol,
          totalCol: totCol
        });
        subjectHeadersHtml += `
          <th>${sub.shortName} सैद्धांतिक (${sub.theoryMax ?? 70})</th>
          <th>${sub.shortName} मौखिक (${sub.oralMax ?? 30})</th>
          <th style="background-color: #fef08a; color: #713f12;">${sub.shortName} कुल योग (${sub.maxMarks})</th>
        `;
      } else {
        const totCol = getExcelCol(currentColIdx++);
        subjectColMeta.push({
          sub,
          type: 'single',
          totalCol: totCol
        });
        subjectHeadersHtml += `
          <th>${sub.shortName} (${sub.maxMarks})</th>
        `;
      }
    });

    const grandTotalCol = getExcelCol(currentColIdx++);
    const pctCol = getExcelCol(currentColIdx++);
    const rankCol = getExcelCol(currentColIdx++);
    const gradeCol = getExcelCol(currentColIdx++);
    const resultCol = getExcelCol(currentColIdx++);
    const totalColsCount = currentColIdx;

    let tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>कक्षा मेरिट लिस्ट</x:Name>
                <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          th { background-color: #1e3a8a; color: #ffffff; font-weight: bold; text-align: center; border: 1px solid #000; font-size: 10pt; }
          td { border: 1px solid #d1d5db; text-align: center; font-family: sans-serif; font-size: 10pt; }
          .title { font-size: 16pt; font-weight: bold; text-align: center; color: #1e1b4b; }
          .sub { font-size: 11pt; text-align: center; color: #475569; }
          .formula-col { background-color: #dcfce7; font-weight: bold; color: #064e3b; }
          .rank-col { background-color: #fef3c7; font-weight: bold; color: #78350f; }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <td colspan="${totalColsCount}" class="title">${schoolName}</td>
          </tr>
          <tr>
            <td colspan="${totalColsCount}" class="sub">${schoolSubtitle}</td>
          </tr>
          <tr>
            <td colspan="${totalColsCount}" class="sub">
              <b>परीक्षा:</b> ${displayExam} | <b>कक्षा:</b> ${className} (${section}) | <b>सत्र:</b> ${academicSession} | <b>कक्षाध्यापक:</b> ${classTeacher} | <b>दिनांक:</b> ${declarationDate} | <b>कुल विषय:</b> ${subjects.length} (पूर्णांक: ${grandMax})
            </td>
          </tr>
          <tr></tr>
          <tr>
            <th>क्र. (S.No)</th>
            <th>रोल नंबर (Roll No)</th>
            <th>विद्यार्थी का नाम (Name)</th>
            <th>पिता का नाम (Father Name)</th>
            ${subjectHeadersHtml}
            <th class="formula-col">कुल प्राप्तांक (=SUM)</th>
            <th class="formula-col">प्रतिशत (=%)</th>
            <th class="rank-col">मेरिट रैंक (=RANK)</th>
            <th>ग्रेड (Grade)</th>
            <th>परिणाम (Result)</th>
          </tr>
    `;

    processedStudents.forEach((s, idx) => {
      const rowNum = startRow + idx;
      let subjectCellsHtml = '';
      const subjectTotalCells: string[] = [];

      subjectColMeta.forEach(meta => {
        const subScore = s.subjectScores.find(item => item.subjectId === meta.sub.id);
        if (meta.type === 'split') {
          const th = subScore?.theory ?? 0;
          const or = subScore?.oral ?? 0;
          const splitFormula = `=SUM(${meta.theoryCol}${rowNum}:${meta.oralCol}${rowNum})`;
          subjectCellsHtml += `
            <td>${th}</td>
            <td>${or}</td>
            <td style="background-color: #fef9c3; font-weight: bold;">${splitFormula}</td>
          `;
          subjectTotalCells.push(`${meta.totalCol}${rowNum}`);
        } else {
          const obtained = subScore?.obtained ?? 0;
          subjectCellsHtml += `<td>${obtained}</td>`;
          subjectTotalCells.push(`${meta.totalCol}${rowNum}`);
        }
      });

      // Excel formulas
      const grandSumFormula = subjectTotalCells.length > 0 ? `=${subjectTotalCells.join('+')}` : '=0';
      const pctFormula = `=ROUND((${grandTotalCol}${rowNum}/${grandMax})*100, 2)`;
      const rankFormula = `=RANK(${grandTotalCol}${rowNum}, $${grandTotalCol}$${startRow}:$${grandTotalCol}$${lastRow}, 0)`;

      tableHtml += `
        <tr>
          <td>${idx + 1}</td>
          <td style="mso-number-format:'\\@';">${s.rollNo}</td>
          <td style="text-align: left; font-weight: bold;">${s.name}</td>
          <td style="text-align: left;">${s.fatherName}</td>
          ${subjectCellsHtml}
          <td class="formula-col">${grandSumFormula}</td>
          <td class="formula-col">${pctFormula}</td>
          <td class="rank-col">${rankFormula}</td>
          <td>${s.grade}</td>
          <td>${s.resultStatus}</td>
        </tr>
      `;
    });

    // Summary row
    const summaryRow = lastRow + 1;
    tableHtml += `
        <tr>
          <td colspan="4" style="font-weight: bold; text-align: right;">कक्षा औसत (Class Average):</td>
          <td colspan="${currentColIdx - 8}" style="background-color: #f1f5f9; font-weight: bold;">-</td>
          <td class="formula-col">=ROUND(AVERAGE(${grandTotalCol}${startRow}:${grandTotalCol}${lastRow}), 2)</td>
          <td class="formula-col">=ROUND(AVERAGE(${pctCol}${startRow}:${pctCol}${lastRow}), 2)</td>
          <td colspan="3"></td>
        </tr>
      </table>
      </body>
      </html>
    `;

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Merit_Sheet_${className.replace(/\s+/g, '_')}_Sec_${section}_${displayExam.replace(/\s+/g, '_')}_with_Formulas.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to Excel CSV (Dynamic Subjects)
  const handleExportCSV = () => {
    const grandMax = subjects.reduce((sum, s) => sum + s.maxMarks, 0);
    const headerRow = [
      'क्रमांक (S.No)',
      'रोल नंबर (Roll No)',
      'विद्यार्थी का नाम (Student Name)',
      'पिता का नाम (Father Name)'
    ];

    subjects.forEach(sub => {
      if (sub.hasTheoryOralSplit) {
        headerRow.push(`${sub.shortName} सैद्धांतिक (Theory / ${sub.theoryMax ?? 70})`);
        headerRow.push(`${sub.shortName} मौखिक (Oral / ${sub.oralMax ?? 30})`);
        headerRow.push(`${sub.shortName} कुल (Total / ${sub.maxMarks})`);
      } else {
        headerRow.push(`${sub.name} (${sub.maxMarks})`);
      }
    });

    headerRow.push(`कुल प्राप्तांक (Total Marks / ${grandMax})`);
    headerRow.push('प्रतिशत (Percentage %)');
    headerRow.push('मेरिट रैंक (Rank)');
    headerRow.push('ग्रेड (Grade)');
    headerRow.push('परिणाम (Result)');

    const dataRows = processedStudents.map((s, idx) => {
      const row: (string | number)[] = [
        idx + 1,
        `"${s.rollNo}"`,
        `"${s.name}"`,
        `"${s.fatherName}"`
      ];

      subjects.forEach(sub => {
        const subScore = s.subjectScores.find(item => item.subjectId === sub.id);
        if (sub.hasTheoryOralSplit) {
          row.push(subScore?.theory ?? 0);
          row.push(subScore?.oral ?? 0);
          row.push(subScore?.obtained ?? 0);
        } else {
          row.push(subScore?.obtained ?? 0);
        }
      });

      row.push(s.totalObtained);
      row.push(`${s.percentage}%`);
      row.push(s.rank);
      row.push(s.grade);
      row.push(`"${s.resultStatus}"`);

      return row;
    });

    const csvContent = 
      `\uFEFF` + // UTF-8 BOM for proper Hindi characters in Microsoft Excel
      `"${schoolName}"\n` +
      `"${schoolSubtitle}"\n` +
      `"परीक्षा: ${displayExam} | ${className} - सेक्शन '${section}' | सत्र: ${academicSession}"\n` +
      `"कक्षा अध्यापक: ${classTeacher} | परिणाम तिथि: ${declarationDate} | कुल विषय: ${subjects.length}"\n\n` +
      [headerRow.join(','), ...dataRows.map(r => r.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Merit_List_${className.replace(/\s+/g, '_')}_Sec_${section}_${displayExam.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Trigger Full Class Merit List Print (Guaranteed Bulletproof Iframe Print Engine)
  const handlePrintMeritList = () => {
    printElementDirectly(
      'printable-merit-board',
      `${schoolName} - कक्षा मेरिट सूची - ${displayExam}`,
      true // Landscape for full merit spreadsheet
    );
  };

  // Class Statistics Summary
  const stats = useMemo(() => {
    const count = processedStudents.length;
    if (count === 0) return { avg: 0, topper: '-', passCount: 0, passPct: 0, distinctionCount: 0 };

    const totalPctSum = processedStudents.reduce((sum, s) => sum + s.percentage, 0);
    const avg = Math.round((totalPctSum / count) * 10) / 10;
    const sorted = [...processedStudents].sort((a, b) => b.totalObtained - a.totalObtained);
    const topper = sorted[0];
    const passCount = processedStudents.filter(s => s.resultStatus.includes('उत्तीर्ण')).length;
    const passPct = Math.round((passCount / count) * 100);
    const distinctionCount = processedStudents.filter(s => s.percentage >= 75).length;

    return {
      avg,
      topper: topper ? `${topper.name} (${topper.percentage}%)` : '-',
      passCount,
      passPct,
      distinctionCount
    };
  }, [processedStudents]);


  // Filtered list
  const filteredStudents = useMemo(() => {
    if (!searchFilter.trim()) return processedStudents;
    const q = searchFilter.toLowerCase();
    return processedStudents.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.rollNo.toLowerCase().includes(q) ||
      s.fatherName.toLowerCase().includes(q)
    );
  }, [processedStudents, searchFilter]);

  const copyFormula = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedFormulaIndex(index);
    setTimeout(() => setCopiedFormulaIndex(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
      
      {/* Print Specific CSS for A4 Landscape Notice Board */}
      <style>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 5mm;
          }
          body.print-merit-board {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body.print-merit-board * {
            visibility: hidden;
          }
          body.print-merit-board #printable-merit-board, 
          body.print-merit-board #printable-merit-board * {
            visibility: visible;
          }
          body.print-merit-board #printable-merit-board {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 8px !important;
            box-shadow: none !important;
            border: 2px solid #000 !important;
          }
          .no-print, header, nav, .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

      {/* TOP HEADER HERO (Hidden in Print) */}
      <div className="bg-gradient-to-r from-[#030919] via-[#09173a] to-[#040c21] text-white rounded-3xl p-6 shadow-xl border-2 border-amber-400/40 mb-6 print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-[#08122c] border-2 border-amber-400 p-1 flex items-center justify-center shrink-0 shadow-md">
              <img
                src="/assets/school-logo.svg"
                alt="School Logo"
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40 mb-1">
                <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
                <span>शिक्षक मूल्यांकन एवं मेरिट लिस्ट पोर्टल (Teachers Portal)</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black font-serif tracking-tight text-white">
                कक्षा मेरिट लिस्ट व सम्पूर्ण मार्कशीट जनरेटर (Excel Formulas सहित)
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 font-normal">
                {schoolName} · स्वचालित योग, प्रतिशत, मेरिट रैंक व A4 प्रिंट
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Subject Manager Trigger */}
            <button
              onClick={() => setShowSubjectModal(true)}
              className="px-3.5 py-2 rounded-xl bg-indigo-900/70 hover:bg-indigo-800 text-indigo-200 text-xs font-bold border border-indigo-400/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ring-1 ring-indigo-400/30"
              title="मेरिट लिस्ट में नए विषय जोड़ें या हटाएं (Add / Remove Subjects)"
            >
              <SlidersHorizontal className="w-4 h-4 text-indigo-300" />
              <span>📚 विषय जोड़ें/हटाएं ({subjects.length})</span>
            </button>

            {/* View Formulas Modal Trigger */}
            <button
              onClick={() => setShowFormulaModal(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-bold border border-purple-400/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="एक्सेल शीट में प्रयुक्त सभी फॉर्मूले देखें"
            >
              <HelpCircle className="w-4 h-4 text-purple-300" />
              <span>फॉर्मूले देखें (fx)</span>
            </button>

            {/* Export Real Excel with Formulas */}
            <button
              onClick={handleExportExcelWithFormulas}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold border border-emerald-400/50 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title="Microsoft Excel / Google Sheets हेतु लाइव फॉर्मूलों सहित फाइल डाउनलोड करें"
            >
              <Download className="w-4 h-4 text-emerald-200" />
              <span>Excel (.xls फॉर्मूला सहित)</span>
            </button>

            {/* Export CSV */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 flex items-center gap-1.5 transition-all cursor-pointer"
              title="साधारण CSV फाइल डाउनलोड करें"
            >
              <span>CSV डेटा</span>
            </button>

            {/* Open Best Luxury Premium Marksheet */}
            <button
              onClick={() => {
                setSelectedStudentForLuxuryMarksheet(processedStudents[0] || null);
                setShowLuxuryMarksheet(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 text-xs font-black border border-amber-300 flex items-center gap-1.5 transition-all cursor-pointer shadow-lg ring-2 ring-amber-300/40"
              title="विद्यार्थियों की सर्वोत्कृष्ट लक्ज़री प्रीमियम अंकतालिका देखें व प्रिंट करें"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>👑 लक्ज़री मार्कशीट (A4)</span>
            </button>

            {/* Print Merit List */}
            <button
              onClick={handlePrintMeritList}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black border border-amber-300 flex items-center gap-2 transition-all cursor-pointer shadow-lg ring-2 ring-amber-300/40 active:scale-95"
              title="सम्पूर्ण मेरिट लिस्ट को नोटिस बोर्ड या प्रिंट हेतु A4 Landscape में प्रिंट करें"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>🖨️ मेरिट लिस्ट प्रिंट (A4)</span>
            </button>
          </div>

        </div>


        {/* Live Class Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-5 mt-5 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
            <span className="text-[11px] text-slate-400 block font-medium">कुल विद्यार्थी</span>
            <span className="text-lg font-black text-white">{processedStudents.length} छात्र</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-amber-400/20">
            <span className="text-[11px] text-amber-300/80 block font-medium">कक्षा टॉपर (रैंक 1)</span>
            <span className="text-sm font-black text-amber-300 truncate block">{stats.topper}</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-blue-400/20">
            <span className="text-[11px] text-blue-300/80 block font-medium">कक्षा औसत प्रतिशत</span>
            <span className="text-lg font-black text-blue-300">{stats.avg}%</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-emerald-400/20">
            <span className="text-[11px] text-emerald-300/80 block font-medium">उत्तीर्ण परिणाम</span>
            <span className="text-lg font-black text-emerald-300">{stats.passCount} / {processedStudents.length} ({stats.passPct}%)</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-purple-400/20 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-purple-300/80 block font-medium">विशेष योग्यता (75%+)</span>
            <span className="text-lg font-black text-purple-300">{stats.distinctionCount} छात्र</span>
          </div>
        </div>
      </div>

      {/* TEACHER'S CONFIGURATION BAR (Hidden in Print) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-6 print:hidden">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 flex-wrap gap-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>परीक्षा, कक्षा एवं विद्यालय सेटिंग्स (Exam & Class Details)</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            शिक्षक आवश्यकतानुसार सभी विकल्प बदल सकते हैं
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* School Name */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              विद्यालय का नाम (School Name) *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="विद्यालय का नाम..."
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 font-serif"
              />
              <button
                type="button"
                onClick={() => setSchoolName('प्रकाश आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय')}
                className="px-2.5 py-1 text-[11px] font-bold rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap"
                title="प्रकाश आदर्श विद्या निकेतन नाम सेट करें"
              >
                प्रकाश निकेतन
              </button>
            </div>
          </div>

          {/* School Subtitle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              बोर्ड सम्बद्धता / विवरण *
            </label>
            <input
              type="text"
              value={schoolSubtitle}
              onChange={(e) => setSchoolSubtitle(e.target.value)}
              placeholder="माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE) सम्बद्ध..."
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Exam Name Selector (All Academic Year Exams) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              परीक्षा का नाम (Select Exam) *
            </label>
            <select
              value={isCustomExam ? 'CUSTOM' : examName}
              onChange={(e) => {
                if (e.target.value === 'CUSTOM') {
                  setIsCustomExam(true);
                } else {
                  setIsCustomExam(false);
                  setExamName(e.target.value);
                }
              }}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
            >
              {EXAM_OPTIONS.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
              <option value="CUSTOM">✏️ अन्य परीक्षा का नाम लिखें (Custom)...</option>
            </select>

            {isCustomExam && (
              <input
                type="text"
                placeholder="परीक्षा का नाम दर्ज करें (उदा. मासिक टेस्ट)..."
                value={customExamName}
                onChange={(e) => setCustomExamName(e.target.value)}
                className="mt-2 w-full text-xs p-2 rounded-xl border border-amber-400 bg-amber-50/50 font-bold text-slate-800 focus:outline-none"
              />
            )}
          </div>

          {/* Class and Section */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                कक्षा (Class) *
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="कक्षा 9th"
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                सेक्शन *
              </label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="A / B / C"
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white uppercase font-mono"
              />
            </div>
          </div>

          {/* Class Teacher Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              कक्षा अध्यापक का नाम (Class Teacher) *
            </label>
            <input
              type="text"
              value={classTeacher}
              onChange={(e) => setClassTeacher(e.target.value)}
              placeholder="श्री सुरेश चन्द शर्मा"
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Academic Session & Max Marks */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                शैक्षणिक सत्र *
              </label>
              <input
                type="text"
                value={academicSession}
                onChange={(e) => setAcademicSession(e.target.value)}
                placeholder="2026-2027"
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                पूर्णांक/विषय *
              </label>
              <select
                value={maxMarksPerSubject}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMaxMarksPerSubject(val);
                  if (val === 100) {
                    setSanskritTheoryMax(70);
                    setSanskritOralMax(30);
                  } else if (val === 70) {
                    setSanskritTheoryMax(50);
                    setSanskritOralMax(20);
                  } else if (val === 50) {
                    setSanskritTheoryMax(35);
                    setSanskritOralMax(15);
                  } else if (val === 20) {
                    setSanskritTheoryMax(15);
                    setSanskritOralMax(5);
                  } else if (val === 10) {
                    setSanskritTheoryMax(8);
                    setSanskritOralMax(2);
                  }
                }}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
              >
                <option value={100}>100 अंक (वार्षिक/अर्द्धवार्षिक)</option>
                <option value={70}>70 अंक (थ्योरी मुख्य)</option>
                <option value={50}>50 अंक (सत्र परीक्षा)</option>
                <option value={20}>20 अंक (परख / यूनिट टेस्ट)</option>
                <option value={10}>10 अंक (मासिक टेस्ट)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Sanskrit Theory & Oral Assessment Breakdown Controls */}
        <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-amber-50/70 p-3 rounded-xl border border-amber-300/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
              <span>🕉️</span>
              <span>तृतीय भाषा - संस्कृत अंक विभाजन (Sanskrit Assessment):</span>
            </span>
            <span className="text-[11px] text-amber-800 font-medium">
              सैद्धांतिक ({sanskritTheoryMax}) + मौखिक ({sanskritOralMax}) = कुल {maxMarksPerSubject} अंक
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
              <label>📝 सैद्धांतिक (Theory Max):</label>
              <input
                type="number"
                min="1"
                max={maxMarksPerSubject}
                value={sanskritTheoryMax}
                onChange={(e) => {
                  const th = Math.max(1, Number(e.target.value) || 0);
                  setSanskritTheoryMax(th);
                  if (th <= maxMarksPerSubject) {
                    setSanskritOralMax(maxMarksPerSubject - th);
                  }
                }}
                className="w-16 p-1 text-center font-black rounded-lg border border-amber-400 bg-white text-xs focus:ring-1 focus:ring-amber-500 shadow-2xs"
                title="संस्कृत सैद्धांतिक (लिखित) परीक्षा का अधिकतम पूर्णांक"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
              <label>🗣️ मौखिक (Oral Max):</label>
              <input
                type="number"
                min="0"
                max={maxMarksPerSubject}
                value={sanskritOralMax}
                onChange={(e) => {
                  const or = Math.max(0, Number(e.target.value) || 0);
                  setSanskritOralMax(or);
                  if (or <= maxMarksPerSubject) {
                    setSanskritTheoryMax(maxMarksPerSubject - or);
                  }
                }}
                className="w-16 p-1 text-center font-black rounded-lg border border-amber-400 bg-white text-xs focus:ring-1 focus:ring-amber-500 shadow-2xs"
                title="संस्कृत मौखिक (सत्रांक / Viva) परीक्षा का अधिकतम पूर्णांक"
              />
            </div>
          </div>
        </div>

        {/* Active Subjects Banner & Quick Manage */}
        <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-black text-slate-800 flex items-center gap-1 mr-1">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>मेरिट लिस्ट में शामिल विषय ({subjects.length}):</span>
            </span>
            {subjects.map(s => (
              <span 
                key={s.id} 
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors"
              >
                <span>{s.shortName}</span>
                <span className="text-[10px] text-slate-500 font-mono">({s.maxMarks})</span>
                {s.hasTheoryOralSplit && (
                  <span className="text-[9px] px-1 py-0.2 bg-amber-200 text-amber-950 rounded font-semibold">T+O</span>
                )}
                {subjects.length > 1 && (
                  <button 
                    onClick={() => handleRemoveSubject(s.id)}
                    className="text-slate-400 hover:text-rose-600 font-bold ml-0.5 cursor-pointer"
                    title={`विषय '${s.name}' हटाएं`}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSubjectModal(true)}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-xl border border-indigo-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <PlusCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>विषय जोड़ें / बदलें</span>
            </button>
            <button
              onClick={handleResetSubjectsToDefault}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="पुनः मानक 6 विषय लोड करें"
            >
              <span>रीसेट (6 विषय)</span>
            </button>
          </div>
        </div>
      </div>


      {/* QUICK TABLE TOOLBAR (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 print:hidden">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Add Student Button */}
          <button
            onClick={handleAddStudent}
            className="px-3.5 py-1.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>नया विद्यार्थी जोड़ें</span>
          </button>

          {/* Sort by Merit Rank */}
          <button
            onClick={handleSortByMerit}
            className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="रैंक 1 से लेकर अंतिम रैंक तक क्रमबद्ध करें"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-600" />
            <span>मेरिट क्रम (Rank 1 to End)</span>
          </button>

          {/* Sort by Roll Number */}
          <button
            onClick={handleSortByRollNo}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>रोल नंबर क्रम</span>
          </button>

          {/* Reset to Sample Data */}
          <button
            onClick={handleResetSample}
            className="px-3 py-1.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            title="डिफ़ॉल्ट 10 छात्रों का डेटा पुनः लोड करें"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>डिफ़ॉल्ट डेटा</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="नाम या रोल नंबर से खोजें..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* =========================================================================
          ACTUAL PRINTABLE MERIT LIST & MARKSHEET SPREADSHEET (Notice Board Ready)
          ========================================================================= */}
      <div 
        id="printable-merit-board"
        className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm p-4 sm:p-6 text-slate-900 overflow-x-auto"
      >
        {/* Printable Institution Header with School Logo */}
        <div className="border-b-2 border-slate-900 pb-4 mb-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left Official Logo */}
            <div className="w-16 h-18 sm:w-20 sm:h-22 shrink-0 flex items-center justify-center p-1 bg-white">
              <img
                src="/assets/school-logo.svg"
                alt="School Logo"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Center School Details */}
            <div className="text-center flex-1">
              <p className="text-[11px] font-bold text-amber-800 tracking-widest uppercase font-serif">
                ॥ सा विद्या या विमुक्तये ॥ विद्या भारती अखिल भारतीय शिक्षा संस्थान
              </p>
              <h1 className="text-xl sm:text-2xl font-black font-serif uppercase tracking-tight text-slate-950 mt-0.5">
                {schoolName}
              </h1>
              <p className="text-xs font-bold text-slate-700">
                {schoolSubtitle}
              </p>
              
              <div className="inline-block mt-1 px-4 py-0.5 bg-slate-100 rounded-md border border-slate-300">
                <span className="text-sm font-black text-blue-900 tracking-wide uppercase">
                  कक्षा मेरिट सूची एवं परीक्षा फल (CLASS MERIT & AWARD SHEET)
                </span>
              </div>
            </div>

            {/* Right Official Logo */}
            <div className="w-16 h-18 sm:w-20 sm:h-22 shrink-0 flex items-center justify-center p-1 bg-white">
              <img
                src="/assets/school-logo.svg"
                alt="School Logo"
                className="w-full h-full object-contain"
              />
            </div>

          </div>

          {/* Academic Info Banner */}
          <div className="flex items-center justify-between gap-3 text-xs font-bold text-slate-800 mt-3 pt-2 border-t border-slate-300 flex-wrap">
            <div>
              <span>परीक्षा: </span>
              <span className="text-blue-900 underline font-extrabold">{displayExam}</span>
            </div>
            <div>
              <span>कक्षा: </span>
              <span className="text-blue-900 font-extrabold">{className}</span>
              <span className="ml-2">वर्ग (Section): </span>
              <span className="text-blue-900 font-extrabold">'{section}'</span>
            </div>
            <div>
              <span>सत्र: </span>
              <span className="font-extrabold font-mono">{academicSession}</span>
            </div>
            <div>
              <span>कक्षाध्यापक: </span>
              <span className="font-extrabold">{classTeacher}</span>
            </div>
            <div>
              <span>परिणाम तिथि: </span>
              <span className="font-extrabold">{declarationDate}</span>
            </div>
          </div>
        </div>

        {/* The Spreadsheet Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-2 border-slate-900 text-slate-950 font-black text-[11px] uppercase tracking-wide">
                <th className="p-2 border border-slate-400 text-center w-12">क्र.</th>
                <th className="p-2 border border-slate-400 text-center w-16">रोल नं.</th>
                <th className="p-2 border border-slate-400 min-w-[130px]">विद्यार्थी का नाम</th>
                <th className="p-2 border border-slate-400 min-w-[130px] hidden sm:table-cell">पिता का नाम</th>
                {subjects.map(sub => {
                  if (sub.hasTheoryOralSplit) {
                    const thMax = sub.theoryMax ?? 70;
                    const orMax = sub.oralMax ?? 30;
                    return (
                      <React.Fragment key={sub.id}>
                        <th className="p-1.5 border border-slate-400 text-center w-16 bg-amber-100/90 text-amber-950 font-black" title={`${sub.name} सैद्धांतिक परीक्षा (Theory, अधिकतम ${thMax} अंक)`}>
                          {sub.shortName} थ्योरी ({thMax})
                        </th>
                        <th className="p-1.5 border border-slate-400 text-center w-16 bg-amber-50/90 text-amber-900 font-bold" title={`${sub.name} मौखिक परीक्षा (Oral, अधिकतम ${orMax} अंक)`}>
                          {sub.shortName} मौखिक ({orMax})
                        </th>
                        <th className="p-1.5 border border-slate-400 text-center w-16 bg-amber-200/90 text-amber-950 font-black" title={`${sub.name} कुल प्राप्तांक (सैद्धांतिक Theory + मौखिक Oral)`}>
                          {sub.shortName} कुल ({sub.maxMarks})
                        </th>
                      </React.Fragment>
                    );
                  }
                  return (
                    <th key={sub.id} className="p-2 border border-slate-400 text-center min-w-[65px] bg-blue-50/70">
                      {sub.shortName} ({sub.maxMarks})
                    </th>
                  );
                })}
                <th className="p-2 border border-slate-400 text-center w-16 bg-emerald-100 font-black">
                  कुल प्राप्तांक ({subjects.reduce((sum, s) => sum + s.maxMarks, 0)})
                </th>
                <th className="p-2 border border-slate-400 text-center w-14 bg-emerald-50 font-black">प्रतिशत (%)</th>
                <th className="p-2 border border-slate-400 text-center w-14 bg-amber-100 font-black">मेरिट रैंक</th>
                <th className="p-2 border border-slate-400 text-center w-12">ग्रेड</th>
                <th className="p-2 border border-slate-400 text-center w-20">परिणाम</th>
                <th className="p-2 border border-slate-400 text-center w-28 print:hidden no-print">कार्य (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {filteredStudents.map((student, idx) => {
                const isTopper = student.rank === 1;
                const isSecond = student.rank === 2;
                const isThird = student.rank === 3;

                return (
                  <tr 
                    key={student.id} 
                    className={`border border-slate-300 transition-colors ${
                      isTopper 
                        ? 'bg-amber-100/60 font-semibold' 
                        : isSecond || isThird 
                        ? 'bg-amber-50/30' 
                        : idx % 2 === 1 
                        ? 'bg-slate-50/60' 
                        : 'bg-white'
                    }`}
                  >
                    {/* S.No */}
                    <td className="p-2 border border-slate-300 text-center font-bold text-slate-600">
                      {idx + 1}
                    </td>

                    {/* Roll No */}
                    <td className="p-1 border border-slate-300 text-center">
                      <input
                        type="text"
                        value={student.rollNo}
                        onChange={(e) => handleFieldChange(student.id, 'rollNo', e.target.value)}
                        className="w-full text-center font-bold font-mono text-xs p-1 bg-transparent border-0 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded"
                      />
                    </td>

                    {/* Student Name */}
                    <td className="p-1 border border-slate-300">
                      <input
                        type="text"
                        value={student.name}
                        onChange={(e) => handleFieldChange(student.id, 'name', e.target.value)}
                        className="w-full font-bold text-xs p-1 bg-transparent border-0 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded text-slate-900"
                      />
                    </td>

                    {/* Father's Name */}
                    <td className="p-1 border border-slate-300 hidden sm:table-cell">
                      <input
                        type="text"
                        value={student.fatherName}
                        onChange={(e) => handleFieldChange(student.id, 'fatherName', e.target.value)}
                        className="w-full text-xs p-1 bg-transparent border-0 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded text-slate-600"
                      />
                    </td>

                    {/* Dynamic Subjects Data Cells */}
                    {subjects.map(sub => {
                      const subScore = student.subjectScores.find(item => item.subjectId === sub.id);
                      if (sub.hasTheoryOralSplit) {
                        const thMax = sub.theoryMax ?? 70;
                        const orMax = sub.oralMax ?? 30;
                        const curTh = subScore?.theory ?? (sub.id === 'sanskrit' ? (student.theory ?? student.sanskritTheory ?? 0) : 0);
                        const curOr = subScore?.oral ?? (sub.id === 'sanskrit' ? (student.oral ?? student.sanskritOral ?? 0) : 0);
                        const curTot = curTh + curOr;

                        return (
                          <React.Fragment key={sub.id}>
                            {/* Theory */}
                            <td className="p-1 border border-slate-300 text-center bg-amber-50/60">
                              <input
                                type="number"
                                min="0"
                                max={thMax}
                                name={sub.id === 'sanskrit' ? 'theory' : undefined}
                                aria-label={sub.id === 'sanskrit' ? 'Theory' : `${sub.shortName} Theory`}
                                placeholder="Theory"
                                data-testid={`input-theory-${student.id}`}
                                value={curTh}
                                onChange={(e) => handleSubjectScoreChange(student.id, sub.id, 'theory', e.target.value, thMax)}
                                className="w-12 text-center text-xs p-1 bg-transparent font-bold text-amber-950 border-0 focus:bg-white focus:ring-1 focus:ring-amber-500 rounded"
                                title={`${sub.name} सैद्धांतिक (Theory) अंक [0-${thMax}]`}
                              />
                            </td>
                            {/* Oral */}
                            <td className="p-1 border border-slate-300 text-center bg-amber-50/40">
                              <input
                                type="number"
                                min="0"
                                max={orMax}
                                name={sub.id === 'sanskrit' ? 'oral' : undefined}
                                aria-label={sub.id === 'sanskrit' ? 'Oral' : `${sub.shortName} Oral`}
                                placeholder="Oral"
                                data-testid={`input-oral-${student.id}`}
                                value={curOr}
                                onChange={(e) => handleSubjectScoreChange(student.id, sub.id, 'oral', e.target.value, orMax)}
                                className="w-12 text-center text-xs p-1 bg-transparent font-bold text-amber-900 border-0 focus:bg-white focus:ring-1 focus:ring-amber-500 rounded"
                                title={`${sub.name} मौखिक (Oral / सत्रांक) अंक [0-${orMax}]`}
                              />
                            </td>
                            {/* Auto-Sum */}
                            <td className="p-1 border border-slate-300 text-center bg-amber-100/70 font-black text-xs text-amber-950">
                              {curTot}
                            </td>
                          </React.Fragment>
                        );
                      }

                      const curMark = subScore?.obtained ?? (student.marks?.[sub.id] ?? (student[sub.id as keyof StudentMarkRecord] as number) ?? 0);
                      return (
                        <td key={sub.id} className="p-1 border border-slate-300 text-center">
                          <input
                            type="number"
                            min="0"
                            max={sub.maxMarks}
                            value={curMark}
                            onChange={(e) => handleSubjectScoreChange(student.id, sub.id, 'mark', e.target.value, sub.maxMarks)}
                            className="w-12 text-center text-xs p-1 bg-transparent font-medium border-0 focus:bg-white focus:ring-1 focus:ring-blue-500 rounded"
                            title={`${sub.name} अंक [0-${sub.maxMarks}]`}
                          />
                        </td>
                      );
                    })}


                    {/* Total Marks (Calculated by Formula =SUM(E2:J2)) */}
                    <td className="p-2 border border-slate-300 text-center font-black text-xs text-blue-950 bg-emerald-100/50">
                      {student.totalObtained}
                    </td>

                    {/* Percentage (Formula =(Total/Max)*100) */}
                    <td className="p-2 border border-slate-300 text-center font-black text-xs text-emerald-900 bg-emerald-50/60">
                      {student.percentage}%
                    </td>

                    {/* Rank (Formula =RANK(Total, Range)) */}
                    <td className="p-2 border border-slate-300 text-center font-black text-xs">
                      <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full ${
                        isTopper
                          ? 'bg-amber-500 text-slate-950 ring-1 ring-amber-300 font-extrabold'
                          : isSecond
                          ? 'bg-slate-300 text-slate-950 font-bold'
                          : isThird
                          ? 'bg-amber-700 text-white font-bold'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {isTopper ? '🥇 1st' : isSecond ? '🥈 2nd' : isThird ? '🥉 3rd' : `#${student.rank}`}
                      </span>
                    </td>

                    {/* Grade (Formula =IFS(...)) */}
                    <td className="p-2 border border-slate-300 text-center font-black text-xs">
                      <span className={
                        student.grade === 'A+' ? 'text-amber-800 font-bold' :
                        student.grade === 'A' ? 'text-blue-800' :
                        student.grade === 'B+' ? 'text-indigo-800' : 'text-slate-800'
                      }>
                        {student.grade}
                      </span>
                    </td>

                    {/* Result Status */}
                    <td className="p-2 border border-slate-300 text-center text-[11px] font-bold">
                      <span className={
                        student.resultStatus.includes('Pass') ? 'text-emerald-800' :
                        student.resultStatus.includes('Comp') ? 'text-amber-800' : 'text-rose-800'
                      }>
                        {student.resultStatus}
                      </span>
                    </td>

                    {/* Actions: Luxury Marksheet, Edit, Individual Marksheet & Delete */}
                    <td className="p-1 border border-slate-300 text-center print:hidden no-print">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedStudentForLuxuryMarksheet(student);
                            setShowLuxuryMarksheet(true);
                          }}
                          className="px-2 py-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black rounded-lg text-[10px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                          title="इस विद्यार्थी की लक्ज़री प्रीमियम अंकतालिका देखें व प्रिंट करें"
                        >
                          <Award className="w-3 h-3 text-slate-950" />
                          <span>मार्कशीट</span>
                        </button>
                        <button
                          onClick={() => setEditingStudent(student)}
                          className="p-1 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded transition-colors cursor-pointer"
                          title="इस विद्यार्थी के थ्योरी, मौखिक व अन्य अंक संपादित करें"
                          aria-label={`Edit ${student.name}`}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setSelectedStudentForReportCard(student)}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                          title="इस छात्र की व्यक्तिगत अंकतालिका देखें व प्रिंट करें"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          title="इस विद्यार्थी को हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Printable Official Signatures & Seal Section */}
        <div className="pt-8 mt-6 border-t-2 border-slate-800 flex items-end justify-between text-center px-4 font-sans text-xs">
          
          <div className="text-center">
            <div className="h-10 flex items-center justify-center">
              <span className="text-slate-400 italic">हस्ताक्षर कक्षाध्यापक</span>
            </div>
            <div className="border-t border-slate-600 pt-1 w-44">
              <p className="font-bold text-slate-900">{classTeacher}</p>
              <p className="text-[10px] text-slate-600">कक्षाध्यापक (Class Teacher)</p>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full border border-dashed border-slate-400 flex items-center justify-center mx-auto mb-1 text-[10px] text-slate-400 font-serif">
              विद्यालय सील
            </div>
            <p className="text-[10px] text-slate-500 font-serif">आधिकारिक मुहर (Office Seal)</p>
          </div>

          <div className="text-center">
            <div className="h-10 flex items-center justify-center">
              <img
                src="/assets/aistudio/1792464198738.jpg-removebg-preview_93d1da9c.png"
                alt="Principal Seal"
                className="max-h-12 max-w-[140px] object-contain"
              />
            </div>
            <div className="border-t border-slate-600 pt-1 w-48">
              <p className="font-bold text-slate-900">प्रधानाचार्य महोदय</p>
              <p className="text-[10px] text-slate-600">{schoolName}</p>
            </div>
          </div>

        </div>

      </div>

      {/* =========================================================================
          INDIVIDUAL STUDENT MARKSHEET MODAL (Report Card with Print)
          ========================================================================= */}
      {selectedStudentForReportCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs print:p-0 print:bg-white animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-amber-400 print:border-none print:shadow-none print:max-w-none print:p-0">
            
            {/* Modal Controls (Hidden in Print) */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  विद्यार्थी प्रगति पत्रक / अंकतालिका (Student Report Card)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>अंकतालिका प्रिंट करें</span>
                </button>
                <button
                  onClick={() => setSelectedStudentForReportCard(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* The Actual Printable Marksheet */}
            <div id="printable-student-report" className="border-2 border-slate-800 p-6 rounded-2xl bg-white text-slate-900">
              
              {/* Header with Logo */}
              <div className="text-center border-b-2 border-slate-800 pb-4 mb-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="w-16 h-18 shrink-0 flex items-center justify-center">
                    <img src="/assets/school-logo.svg" alt="School Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-amber-800 tracking-widest uppercase">
                      ॥ सा विद्या या विमुक्तये ॥ विद्या भारती अखिल भारतीय शिक्षा संस्थान
                    </p>
                    <h2 className="text-lg sm:text-xl font-black font-serif uppercase tracking-tight text-slate-950">
                      {schoolName}
                    </h2>
                    <p className="text-[11px] font-bold text-slate-600">
                      {schoolSubtitle}
                    </p>
                    <div className="inline-block mt-1 px-3 py-0.5 bg-slate-100 rounded-md border border-slate-300">
                      <span className="text-xs font-black text-blue-950 tracking-wider uppercase">
                        विद्यार्थी अंकतालिका एवं प्रगति पत्रक (STUDENT MARKSHEET)
                      </span>
                    </div>
                  </div>
                  <div className="w-16 h-18 shrink-0 flex items-center justify-center">
                    <img src="/assets/school-logo.svg" alt="School Logo" className="w-full h-full object-contain" />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-slate-800 mt-3 pt-2 border-t border-slate-200 text-left">
                  <div><span>रोल नंबर: </span><span className="text-blue-900 font-mono font-black">{selectedStudentForReportCard.rollNo}</span></div>
                  <div><span>कक्षा: </span><span className="text-blue-900">{className} - '{section}'</span></div>
                  <div><span>परीक्षा: </span><span className="text-blue-900">{displayExam}</span></div>
                  <div><span>सत्र: </span><span className="font-mono">{academicSession}</span></div>
                  <div className="col-span-2"><span>विद्यार्थी का नाम: </span><span className="text-blue-950 font-black">{selectedStudentForReportCard.name}</span></div>
                  <div className="col-span-2"><span>पिता का नाम: </span><span>{selectedStudentForReportCard.fatherName}</span></div>
                </div>
              </div>

              {/* Subject Marks Table */}
              <table className="w-full text-left border-collapse text-xs mb-4">
                <thead>
                  <tr className="bg-slate-100 border border-slate-800 text-slate-900 font-black text-center">
                    <th className="p-2 border border-slate-400 w-12">क्र.</th>
                    <th className="p-2 border border-slate-400 text-left">विषय (Subject)</th>
                    <th className="p-2 border border-slate-400 w-24">पूर्णांक (Max)</th>
                    <th className="p-2 border border-slate-400 w-24">उत्तीर्णांक (Min)</th>
                    <th className="p-2 border border-slate-400 w-24 bg-blue-50">प्राप्तांक (Marks)</th>
                    <th className="p-2 border border-slate-400 w-20">ग्रेड (Grade)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {[
                    { 
                      name: 'हिंदी (Hindi)', 
                      theory: null, 
                      oral: null, 
                      theoryMax: 0,
                      oralMax: 0,
                      marks: selectedStudentForReportCard.hindi, 
                      max: maxMarksPerSubject 
                    },
                    { 
                      name: 'अंग्रेजी (English)', 
                      theory: null, 
                      oral: null, 
                      theoryMax: 0,
                      oralMax: 0,
                      marks: selectedStudentForReportCard.english, 
                      max: maxMarksPerSubject 
                    },
                    { 
                      name: 'गणित (Mathematics)', 
                      theory: null, 
                      oral: null, 
                      theoryMax: 0,
                      oralMax: 0,
                      marks: selectedStudentForReportCard.maths, 
                      max: maxMarksPerSubject 
                    },
                    { 
                      name: 'विज्ञान (General Science)', 
                      theory: null, 
                      oral: null, 
                      theoryMax: 0,
                      oralMax: 0,
                      marks: selectedStudentForReportCard.science, 
                      max: maxMarksPerSubject 
                    },
                    { 
                      name: 'सामाजिक विज्ञान (Social Science)', 
                      theory: null, 
                      oral: null, 
                      theoryMax: 0,
                      oralMax: 0,
                      marks: selectedStudentForReportCard.socialScience, 
                      max: maxMarksPerSubject 
                    },
                    { 
                      name: 'तृतीय भाषा - संस्कृत (Sanskrit)', 
                      theory: selectedStudentForReportCard.theory !== undefined ? selectedStudentForReportCard.theory : (selectedStudentForReportCard.sanskritTheory ?? 0), 
                      theoryMax: sanskritTheoryMax,
                      oral: selectedStudentForReportCard.oral !== undefined ? selectedStudentForReportCard.oral : (selectedStudentForReportCard.sanskritOral ?? 0), 
                      oralMax: sanskritOralMax,
                      marks: selectedStudentForReportCard.sanskritTotal, 
                      max: maxMarksPerSubject 
                    }
                  ].map((sub, sIdx) => {
                    const marksVal = Number(sub.marks || 0);
                    const passMarks = Math.round(sub.max * 0.33);
                    const isPass = marksVal >= passMarks;
                    const subPct = sub.max > 0 ? (marksVal / sub.max) * 100 : 0;
                    const subGrade = subPct >= 90 ? 'A+' : subPct >= 75 ? 'A' : subPct >= 60 ? 'B+' : subPct >= 45 ? 'B' : subPct >= 33 ? 'C' : 'D';

                    return (
                      <tr key={sIdx} className="text-center">
                        <td className="p-2 border border-slate-300 text-slate-600 font-bold">{sIdx + 1}</td>
                        <td className="p-2 border border-slate-300 text-left">
                          <span className="font-bold text-slate-900 block">{sub.name}</span>
                          {sub.theory !== null && (
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100/90 text-amber-950 border border-amber-300 shadow-2xs">
                                📝 सैद्धांतिक (Theory): {sub.theory} / {sub.theoryMax}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                                🗣️ मौखिक (Oral): {sub.oral} / {sub.oralMax}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="p-2 border border-slate-300">{sub.max}</td>
                        <td className="p-2 border border-slate-300 text-slate-500">{passMarks}</td>
                        <td className={`p-2 border border-slate-300 font-black ${isPass ? 'text-blue-950 bg-blue-50/40' : 'text-rose-700 bg-rose-50'}`}>
                          {sub.marks}
                        </td>
                        <td className="p-2 border border-slate-300 font-bold">{subGrade}</td>
                      </tr>
                    );
                  })}
                  <tr className="bg-slate-100 font-black border-2 border-slate-800 text-center">
                    <td colSpan={2} className="p-2 text-right">कुल योग (Total):</td>
                    <td className="p-2 border border-slate-400">{selectedStudentForReportCard.totalMax}</td>
                    <td className="p-2 border border-slate-400">{Math.round(selectedStudentForReportCard.totalMax * 0.33)}</td>
                    <td className="p-2 border border-slate-400 text-emerald-900 bg-emerald-100 font-black text-sm">
                      {selectedStudentForReportCard.totalObtained}
                    </td>
                    <td className="p-2 border border-slate-400 text-sm font-black text-blue-900">
                      {selectedStudentForReportCard.grade}
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Performance Summary Banner */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-300 rounded-xl mb-6 text-center text-xs">
                <div>
                  <span className="text-slate-500 block">प्रतिशत (Percentage):</span>
                  <span className="text-base font-black text-emerald-800">{selectedStudentForReportCard.percentage}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">कक्षा मेरिट रैंक (Rank):</span>
                  <span className="text-base font-black text-amber-700">
                    {selectedStudentForReportCard.rank === 1 ? '🥇 1st Rank' : selectedStudentForReportCard.rank === 2 ? '🥈 2nd Rank' : selectedStudentForReportCard.rank === 3 ? '🥉 3rd Rank' : `#${selectedStudentForReportCard.rank} Rank`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">अंतिम परिणाम (Result):</span>
                  <span className="text-base font-black text-blue-900">{selectedStudentForReportCard.resultStatus}</span>
                </div>
              </div>

              {/* Remarks */}
              <div className="mb-6 p-2.5 border border-dashed border-slate-300 rounded-lg text-xs">
                <span className="font-bold text-slate-800">कक्षाध्यापक टिप्पणी: </span>
                <span className="italic text-slate-600">
                  {selectedStudentForReportCard.percentage >= 85 ? 'उत्कृष्ट प्रदर्शन! विद्यालय का गौरव बढ़ाया है।' : selectedStudentForReportCard.percentage >= 60 ? 'सराहनीय प्रयास, और अधिक अभ्यास से उच्च स्थान प्राप्त कर सकते हैं।' : 'नियमित अध्ययन एवं अभ्यास की आवश्यकता है।'}
                </span>
              </div>

              {/* Signatures */}
              <div className="pt-6 border-t-2 border-slate-800 flex items-end justify-between text-center px-4 text-xs">
                <div className="w-36">
                  <div className="h-8"></div>
                  <div className="border-t border-slate-600 pt-1">
                    <p className="font-bold text-slate-900">{classTeacher}</p>
                    <p className="text-[10px] text-slate-500">कक्षाध्यापक हस्ताक्षर</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full border border-dashed border-slate-400 flex items-center justify-center mx-auto mb-1 text-[9px] text-slate-400 font-serif">
                    सील
                  </div>
                </div>
                <div className="w-44">
                  <div className="h-8 flex items-center justify-center">
                    <img
                      src="/assets/aistudio/1792464198738.jpg-removebg-preview_93d1da9c.png"
                      alt="Principal Seal"
                      className="max-h-10 max-w-[120px] object-contain"
                    />
                  </div>
                  <div className="border-t border-slate-600 pt-1">
                    <p className="font-bold text-slate-900">प्रधानाचार्य</p>
                    <p className="text-[10px] text-slate-500">कार्यालय हस्ताक्षर व मुहर</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          EXCEL FORMULAS MODAL (Dedicated Reference for Teachers)
          ========================================================================= */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs print:hidden animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border-2 border-amber-400">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Microsoft Excel एवं Google Sheets फॉर्मूला संदर्भ (Formula Guide)
                </h3>
              </div>
              <button
                onClick={() => setShowFormulaModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              शिक्षकों की सुविधा हेतु इस मेरिट शीट में प्रयुक्त सभी प्रामाणिक एक्सेल फॉर्मूले नीचे दिए गए हैं। आप इन्हें सीधे कॉपी करके अपनी एक्सेल फाइल में भी प्रयोग कर सकते हैं:
            </p>

            <div className="space-y-3">
              
              {/* Formula 1: Total */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-900">1. कुल प्राप्तांक (Total Marks Formula):</span>
                  <button
                    onClick={() => copyFormula('=SUM(E2:I2)+L2', 1)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedFormulaIndex === 1 ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedFormulaIndex === 1 ? 'कॉपी हुआ!' : 'कॉपी करें'}</span>
                  </button>
                </div>
                <code className="block text-xs font-mono bg-slate-900 text-emerald-300 p-2 rounded-lg font-bold">
                  =SUM(E2:I2)+L2   [या =SUM(E2:K2)]
                </code>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  हिंदी (E2) से लेकर संस्कृत सैद्धांतिक (J2), मौखिक (K2) व कुल (L2) तक सभी 6 विषयों के प्राप्तांकों का कुल योग निकालता है।
                </span>
              </div>

              {/* Formula 2: Percentage */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-900">2. प्रतिशत (Percentage % Formula):</span>
                  <button
                    onClick={() => copyFormula('=ROUND((M2/600)*100, 2)', 2)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedFormulaIndex === 2 ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedFormulaIndex === 2 ? 'कॉपी हुआ!' : 'कॉपी करें'}</span>
                  </button>
                </div>
                <code className="block text-xs font-mono bg-slate-900 text-emerald-300 p-2 rounded-lg font-bold">
                  =(M2/600)*100   [या =ROUND((M2/600)*100, 2)]
                </code>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  कुल प्राप्तांक (M2) को पूर्णांक (600) से भाग देकर 100 से गुणा करता है।
                </span>
              </div>

              {/* Formula 3: Rank */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-900">3. मेरिट रैंक (Competition Rank Formula):</span>
                  <button
                    onClick={() => copyFormula('=RANK(M2, $M$2:$M$11, 0)', 3)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedFormulaIndex === 3 ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedFormulaIndex === 3 ? 'कॉपी हुआ!' : 'कॉपी करें'}</span>
                  </button>
                </div>
                <code className="block text-xs font-mono bg-slate-900 text-emerald-300 p-2 rounded-lg font-bold">
                  =RANK(M2, $M$2:$M$11, 0)
                </code>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  पूरी कक्षा के प्राप्तांकों की रेंज ($M$2:$M$11) में विद्यार्थी की सटीक मेरिट रैंक निकालता है (0 = घटते क्रम में)।
                </span>
              </div>

              {/* Formula 4: Grade */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-900">4. ग्रेड निर्धारण (Grade Formula):</span>
                  <button
                    onClick={() => copyFormula('=IFS(N2>=90, "A+", N2>=75, "A", N2>=60, "B+", N2>=45, "B", N2>=33, "C", TRUE, "D")', 4)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedFormulaIndex === 4 ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedFormulaIndex === 4 ? 'कॉपी हुआ!' : 'कॉपी करें'}</span>
                  </button>
                </div>
                <code className="block text-xs font-mono bg-slate-900 text-emerald-300 p-2 rounded-lg font-bold leading-relaxed whitespace-pre-wrap">
                  =IFS(N2&gt;=90, "A+", N2&gt;=75, "A", N2&gt;=60, "B+", N2&gt;=45, "B", N2&gt;=33, "C", TRUE, "D")
                </code>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  प्रतिशत (N2) के आधार पर 90%+ को A+, 75%+ को A, 60%+ को B+, 45%+ को B, 33%+ को C प्रदान करता है।
                </span>
              </div>

              {/* Formula 5: Result Status */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-blue-900">5. परिणाम (Pass / Fail / Compartment):</span>
                  <button
                    onClick={() => copyFormula('=IF(COUNTIF(E2:I2, "<33")=0, "उत्तीर्ण (Pass)", IF(COUNTIF(E2:I2, "<33")<=2, "सप्लीमेंट्री", "अनुत्तीर्ण"))', 5)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedFormulaIndex === 5 ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedFormulaIndex === 5 ? 'कॉपी हुआ!' : 'कॉपी करें'}</span>
                  </button>
                </div>
                <code className="block text-xs font-mono bg-slate-900 text-emerald-300 p-2 rounded-lg font-bold whitespace-pre-wrap">
                  =IF(COUNTIF(E2:I2, "&lt;33")=0, "उत्तीर्ण (Pass)", IF(COUNTIF(E2:I2, "&lt;33")&lt;=2, "सप्लीमेंट्री", "अनुत्तीर्ण"))
                </code>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  यदि किसी भी विषय में 33 से कम नहीं हैं तो Pass, 1-2 विषयों में कम होने पर Compartment, अधिक होने पर Fail घोषित करता है।
                </span>
              </div>

            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                समझ गया (Close)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          STUDENT SCORE EDIT MODAL (Explicit Theory & Oral Score Fields)
          ========================================================================= */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs print:hidden animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-amber-400">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">
                  विद्यार्थी प्राप्तांक संशोधन (Edit Student Scores)
                </h3>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Student Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">रोल नंबर (Roll No)</label>
                  <input
                    type="text"
                    value={editingStudent.rollNo}
                    onChange={(e) => setEditingStudent({ ...editingStudent, rollNo: e.target.value })}
                    className="w-full text-xs font-bold p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">विद्यार्थी का नाम</label>
                  <input
                    type="text"
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    className="w-full text-xs font-bold p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">पिता का नाम</label>
                  <input
                    type="text"
                    value={editingStudent.fatherName}
                    onChange={(e) => setEditingStudent({ ...editingStudent, fatherName: e.target.value })}
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Core Subjects */}
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">अनिवार्य विषय प्राप्तांक (Core Subjects - Max {maxMarksPerSubject}):</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">हिंदी</label>
                    <input
                      type="number"
                      min="0"
                      max={maxMarksPerSubject}
                      value={editingStudent.hindi}
                      onChange={(e) => setEditingStudent({ ...editingStudent, hindi: Math.max(0, Math.min(maxMarksPerSubject, Number(e.target.value) || 0)) })}
                      className="w-full text-center text-xs font-bold p-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">अंग्रेजी</label>
                    <input
                      type="number"
                      min="0"
                      max={maxMarksPerSubject}
                      value={editingStudent.english}
                      onChange={(e) => setEditingStudent({ ...editingStudent, english: Math.max(0, Math.min(maxMarksPerSubject, Number(e.target.value) || 0)) })}
                      className="w-full text-center text-xs font-bold p-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">गणित</label>
                    <input
                      type="number"
                      min="0"
                      max={maxMarksPerSubject}
                      value={editingStudent.maths}
                      onChange={(e) => setEditingStudent({ ...editingStudent, maths: Math.max(0, Math.min(maxMarksPerSubject, Number(e.target.value) || 0)) })}
                      className="w-full text-center text-xs font-bold p-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">विज्ञान</label>
                    <input
                      type="number"
                      min="0"
                      max={maxMarksPerSubject}
                      value={editingStudent.science}
                      onChange={(e) => setEditingStudent({ ...editingStudent, science: Math.max(0, Math.min(maxMarksPerSubject, Number(e.target.value) || 0)) })}
                      className="w-full text-center text-xs font-bold p-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-600 mb-0.5">सा. विज्ञान</label>
                    <input
                      type="number"
                      min="0"
                      max={maxMarksPerSubject}
                      value={editingStudent.socialScience}
                      onChange={(e) => setEditingStudent({ ...editingStudent, socialScience: Math.max(0, Math.min(maxMarksPerSubject, Number(e.target.value) || 0)) })}
                      className="w-full text-center text-xs font-bold p-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* SPECIFIC THEORY & ORAL INPUT SCORE FIELDS */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-amber-600" />
                    संस्कृत विषय प्राप्तांक (Sanskrit Theory & Oral Scores)
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">
                    कुल: {Number(editingStudent.theory || 0) + Number(editingStudent.oral || 0)} / {maxMarksPerSubject}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Theory Input Score Field */}
                  <div className="bg-white p-3 rounded-xl border border-amber-300 shadow-2xs">
                    <label className="block text-xs font-extrabold text-amber-950 mb-1">
                      📝 थ्योरी अंक (Theory)
                    </label>
                    <span className="text-[10px] text-amber-800/80 block mb-1.5">
                      सैद्धांतिक लिखित परीक्षा (अधिकतम: {sanskritTheoryMax})
                    </span>
                    <input
                      type="number"
                      min="0"
                      max={sanskritTheoryMax}
                      name="theory"
                      aria-label="Theory"
                      placeholder="Theory"
                      data-testid="modal-input-theory"
                      value={editingStudent.theory ?? 0}
                      onChange={(e) => {
                        const val = Math.max(0, Math.min(sanskritTheoryMax, Number(e.target.value) || 0));
                        setEditingStudent({
                          ...editingStudent,
                          theory: val,
                          sanskritTheory: val
                        });
                      }}
                      className="w-full text-center text-base font-black p-2 bg-amber-50/50 border border-amber-300 rounded-lg text-amber-950 focus:bg-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Oral Input Score Field */}
                  <div className="bg-white p-3 rounded-xl border border-amber-300 shadow-2xs">
                    <label className="block text-xs font-extrabold text-amber-950 mb-1">
                      🗣️ मौखिक अंक (Oral)
                    </label>
                    <span className="text-[10px] text-amber-800/80 block mb-1.5">
                      मौखिक परीक्षा / सत्रांक (अधिकतम: {sanskritOralMax})
                    </span>
                    <input
                      type="number"
                      min="0"
                      max={sanskritOralMax}
                      name="oral"
                      aria-label="Oral"
                      placeholder="Oral"
                      data-testid="modal-input-oral"
                      value={editingStudent.oral ?? 0}
                      onChange={(e) => {
                        const val = Math.max(0, Math.min(sanskritOralMax, Number(e.target.value) || 0));
                        setEditingStudent({
                          ...editingStudent,
                          oral: val,
                          sanskritOral: val
                        });
                      }}
                      className="w-full text-center text-base font-black p-2 bg-amber-50/50 border border-amber-300 rounded-lg text-amber-950 focus:bg-white focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Calculated Summary in Modal */}
              {(() => {
                const totalObtained = 
                  Number(editingStudent.hindi || 0) +
                  Number(editingStudent.english || 0) +
                  Number(editingStudent.maths || 0) +
                  Number(editingStudent.science || 0) +
                  Number(editingStudent.socialScience || 0) +
                  Number(editingStudent.theory || 0) +
                  Number(editingStudent.oral || 0);
                const grandMax = maxMarksPerSubject * 6;
                const pct = grandMax > 0 ? ((totalObtained / grandMax) * 100).toFixed(2) : '0';

                return (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-600">अपेक्षित कुल प्राप्तांक: </span>
                      <span className="font-black text-emerald-950">
                        {totalObtained} / {grandMax}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600">प्रतिशत: </span>
                      <span className="font-black text-emerald-900">
                        {pct}%
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>


            {/* Modal Actions */}
            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                रद्द करें (Cancel)
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated = students.map(s => s.id === editingStudent.id ? editingStudent : s);
                  setStudents(updated);
                  handleSaveToLocal(updated);
                  setEditingStudent(null);
                }}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>संशोधन सुरक्षित करें (Save Changes)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SUBJECT MANAGEMENT MODAL (Add / Remove Custom Subjects & Presets)
          ========================================================================= */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs print:hidden animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-indigo-400">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    विषय प्रबंधन (Manage Subjects in Merit List & Marksheet)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    आप जो भी विषय जोड़ेंगे या हटाएंगे, वही मेरिट लिस्ट, एक्सेल और मार्कशीट में स्वतः सिंक होंगे।
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSubjectModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Current Active Subjects Table */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800">वर्तमान सक्रिय विषय ({subjects.length}):</span>
                <span className="text-[11px] text-slate-500 font-mono">कुल पूर्णांक: {subjects.reduce((sum, s) => sum + s.maxMarks, 0)}</span>
              </div>
              <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200">
                {subjects.map((sub, idx) => (
                  <div key={sub.id} className="p-3 bg-slate-50/70 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-900 font-mono font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-xs font-black text-slate-900">{sub.name}</span>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                          <span>संक्षिप्त: <b className="text-slate-700">{sub.shortName}</b></span>
                          <span>•</span>
                          <span>कोड: <b className="font-mono text-slate-700">{sub.code}</b></span>
                          <span>•</span>
                          <span>पूर्णांक: <b className="text-blue-800">{sub.maxMarks}</b></span>
                          {sub.hasTheoryOralSplit && (
                            <span className="text-amber-800 font-bold bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300">
                              (थ्योरी: {sub.theoryMax ?? 70} + मौखिक: {sub.oralMax ?? 30})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {subjects.length > 1 ? (
                        <button
                          onClick={() => handleRemoveSubject(sub.id)}
                          className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold border border-rose-200 flex items-center gap-1 transition-colors cursor-pointer"
                          title="इस विषय को मेरिट लिस्ट से हटाएं"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>हटाएं</span>
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-400 italic">अनिवार्य</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Presets Section */}
            <div className="mb-5 p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200">
              <span className="text-xs font-bold text-indigo-950 block mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>त्वरित लोकप्रिय विषय जोड़ें (1-Click Quick Add):</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { code: '07', name: 'कंप्यूटर विज्ञान (Computer Science)', shortName: 'कंप्यूटर', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: true, theoryMax: 70, oralMax: 30 },
                  { code: '08', name: 'चित्रकला / ड्राइंग (Drawing & Arts)', shortName: 'चित्रकला', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: false },
                  { code: '09', name: 'शारीरिक एवं स्वास्थ्य शिक्षा (Physical Edu)', shortName: 'शारीरिक शिक्षा', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: true, theoryMax: 60, oralMax: 40 },
                  { code: '10', name: 'उर्दू साहित्य (Urdu)', shortName: 'उर्दू', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: false },
                  { code: '11', name: 'समाज उपयोगी उत्पादक कार्य (SUPW)', shortName: 'SUPW', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: false },
                  { code: '12', name: 'पर्यावरण एवं सड़क सुरक्षा (Env & Safety)', shortName: 'पर्यावरण', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: false },
                  { code: '13', name: 'नैतिक शिक्षा एवं सामान्य ज्ञान (Moral & GK)', shortName: 'नैतिक शिक्षा', maxMarks: 50, passMarks: 17, hasTheoryOralSplit: false },
                  { code: '06', name: 'तृतीय भाषा - संस्कृत (Sanskrit)', shortName: 'संस्कृत', maxMarks: 100, passMarks: 33, hasTheoryOralSplit: true, theoryMax: 70, oralMax: 30 }
                ].filter(p => !subjects.some(s => s.shortName === p.shortName || s.name.includes(p.shortName))).map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleAddPresetSubject(preset)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-600 hover:text-white text-indigo-900 border border-indigo-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>+ {preset.shortName} ({preset.maxMarks})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Subject Form */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
              <span className="text-xs font-bold text-slate-800 block mb-3 flex items-center gap-1.5">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>नया कस्टम विषय जोड़ें (Add Custom Subject):</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">विषय का नाम (जैसे: कंप्यूटर, संगीत, कला) *</label>
                  <input
                    type="text"
                    placeholder="उदा. गृह विज्ञान / संगीत / कृषि"
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    className="w-full text-xs font-bold p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">संक्षिप्त नाम (Short)</label>
                  <input
                    type="text"
                    placeholder="उदा. गृह वि."
                    value={newSubShortName}
                    onChange={(e) => setNewSubShortName(e.target.value)}
                    className="w-full text-xs font-bold p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">विषय कोड</label>
                  <input
                    type="text"
                    placeholder="07"
                    value={newSubCode}
                    onChange={(e) => setNewSubCode(e.target.value)}
                    className="w-full text-xs font-mono font-bold p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">पूर्णांक (Max Marks)</label>
                  <input
                    type="number"
                    min="10"
                    max="500"
                    value={newSubMax}
                    onChange={(e) => {
                      const m = Number(e.target.value) || 100;
                      setNewSubMax(m);
                      if (newSubHasSplit) {
                        setNewSubTheoryMax(Math.round(m * 0.7));
                        setNewSubOralMax(Math.round(m * 0.3));
                      }
                    }}
                    className="w-full text-xs font-bold p-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-2 flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={newSubHasSplit}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setNewSubHasSplit(checked);
                        if (checked) {
                          setNewSubTheoryMax(Math.round(newSubMax * 0.7));
                          setNewSubOralMax(Math.round(newSubMax * 0.3));
                        }
                      }}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span>थ्योरी + मौखिक/प्रैक्टिकल विभाजन?</span>
                  </label>
                </div>
              </div>

              {newSubHasSplit && (
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200 mb-3">
                  <div>
                    <label className="block text-[10px] font-bold text-amber-950 mb-1">सैद्धांतिक (Theory Max)</label>
                    <input
                      type="number"
                      min="1"
                      max={newSubMax}
                      value={newSubTheoryMax}
                      onChange={(e) => {
                        const th = Number(e.target.value) || 0;
                        setNewSubTheoryMax(th);
                        if (th <= newSubMax) setNewSubOralMax(newSubMax - th);
                      }}
                      className="w-full text-xs font-bold p-2 bg-white border border-amber-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-amber-950 mb-1">मौखिक/प्रायोगिक (Oral/Practical Max)</label>
                    <input
                      type="number"
                      min="0"
                      max={newSubMax}
                      value={newSubOralMax}
                      onChange={(e) => {
                        const or = Number(e.target.value) || 0;
                        setNewSubOralMax(or);
                        if (or <= newSubMax) setNewSubTheoryMax(newSubMax - or);
                      }}
                      className="w-full text-xs font-bold p-2 bg-white border border-amber-300 rounded-xl"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleAddCustomSubject}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>यह विषय मेरिट लिस्ट में जोड़ें</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={handleResetSubjectsToDefault}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                🔄 मूल 6 विषय रीसेट करें
              </button>
              <button
                onClick={() => setShowSubjectModal(false)}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                पूर्ण (Done)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          BEST LUXURY PREMIUM MARKSHEET MODAL & FULL A4 PRINTER (PremiumMarksheetView)
          ========================================================================= */}
      {showLuxuryMarksheet && selectedStudentForLuxuryMarksheet && (
        <PremiumMarksheetView
          student={
            processedStudents.find(s => s.id === selectedStudentForLuxuryMarksheet.id) || selectedStudentForLuxuryMarksheet
          }
          allStudents={processedStudents}
          subjects={subjects}
          schoolName={schoolName}
          schoolSubtitle={schoolSubtitle}
          className={className}
          section={section}
          classTeacher={classTeacher}
          academicSession={academicSession}
          displayExam={displayExam}
          declarationDate={declarationDate}
          maxMarksPerSubject={maxMarksPerSubject}
          sanskritTheoryMax={sanskritTheoryMax}
          sanskritOralMax={sanskritOralMax}
          onClose={() => setShowLuxuryMarksheet(false)}
          onSelectStudent={(st) => setSelectedStudentForLuxuryMarksheet(st)}
          onEditStudent={(st) => {
            setEditingStudent(st);
          }}
        />
      )}

    </div>
  );
};
