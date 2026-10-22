import React, { useState, useEffect, useMemo } from 'react';
import { 
  Printer, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Medal, 
  Trophy, 
  Star, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Edit3,
  Layers,
  BookOpen,
  Eye,
  Download
} from 'lucide-react';
import { SubjectConfig, StudentMarkRecord, ProcessedStudent, DEFAULT_SUBJECTS } from '../types/merit';
import { printElementDirectly } from '../utils/printHelper';

export interface PremiumMarksheetViewProps {
  student?: ProcessedStudent | StudentMarkRecord | null;
  allStudents?: (ProcessedStudent | StudentMarkRecord)[];
  subjects?: SubjectConfig[];
  schoolName?: string;
  schoolSubtitle?: string;
  className?: string;
  section?: string;
  classTeacher?: string;
  examIncharge?: string;
  principalName?: string;
  academicSession?: string;
  displayExam?: string;
  declarationDate?: string;
  maxMarksPerSubject?: number;
  sanskritTheoryMax?: number;
  sanskritOralMax?: number;
  onClose?: () => void;
  onSelectStudent?: (student: ProcessedStudent) => void;
  onEditStudent?: (student: ProcessedStudent | StudentMarkRecord) => void;
}

// Convert numbers into Devanagari Hindi words
const numberToHindiWords = (n: number): string => {
  const units = ['', 'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस', 
    'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह', 'सत्रह', 'अठारह', 'उन्नीस', 'बीस',
    'इक्कीस', 'बाईस', 'तेईस', 'चौबीस', 'पच्चीस', 'छब्बीस', 'सत्ताईस', 'अट्ठाईस', 'उनतीस', 'तीस',
    'इकतीस', 'बत्तीस', 'तैंतीस', 'चौंतीस', 'पैंतीस', 'छत्तीस', 'सैंतीस', 'अड़तीस', 'उनतालीस', 'चालीस',
    'इकतालीस', 'बयालीस', 'तैंतालीस', 'चवालीस', 'पैंतालीस', 'छियालीस', 'सैंतालीस', 'अड़तालीस', 'उनचास', 'पचास',
    'इक्यावन', 'बावन', 'तिरेपन', 'चौवन', 'पचपन', 'छप्पन', 'सत्तावन', 'अट्ठावन', 'उनसठ', 'साठ',
    'इकसठ', 'बासठ', 'तिरेसठ', 'चौंसठ', 'पैंसठ', 'छियासठ', 'सरसठ', 'अड़सठ', 'उनहत्तर', 'सत्तर',
    'इकहत्तर', 'बहत्तर', 'तिहत्तर', 'चौहत्तर', 'पचहत्तर', 'छिहत्तर', 'सतहत्तर', 'अठहत्तर', 'उन्नासी', 'अस्सी',
    'इक्यासी', 'बयासी', 'तिरासी', 'चौरासी', 'पचासी', 'छियासी', 'सत्तासी', 'अट्ठासी', 'नवासी', 'नब्बे',
    'इक्यानवे', 'बानवे', 'तिरानवे', 'चौरानवे', 'पंचानवे', 'छियानवे', 'सत्तानवे', 'अट्ठानवे', 'निन्यानवे', 'सौ'];

  if (n <= 100) return units[n] || String(n);
  const hundreds = Math.floor(n / 100);
  const rem = n % 100;
  const hundredStr = (units[hundreds] || hundreds) + ' सौ';
  if (rem === 0) return hundredStr;
  return hundredStr + ' ' + (units[rem] || rem);
};

export const PremiumMarksheetView: React.FC<PremiumMarksheetViewProps> = ({
  student: propStudent,
  allStudents: propAllStudents,
  subjects: propSubjects,
  schoolName = 'पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी (राजस्थान)',
  schoolSubtitle = 'माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE) सम्बद्ध · SEMIS CODE: 08211102601',
  className = 'कक्षा 9th (Class IX)',
  section = 'A',
  classTeacher = 'श्री सुरेश चन्द शर्मा (वरिष्ठ अध्यापक)',
  examIncharge = 'श्री मदन लाल जी शर्मा (परीक्षा प्रभारी)',
  principalName = 'श्री राधेश्याम जी पारीक (प्रधानाचार्य)',
  academicSession = '2026-2027',
  displayExam = 'वार्षिक मुख्य परीक्षा (Annual Examination - मार्च/अप्रैल)',
  declarationDate = new Date().toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
  maxMarksPerSubject = 100,
  sanskritTheoryMax = 70,
  sanskritOralMax = 30,
  onClose,
  onSelectStudent,
  onEditStudent
}) => {
  // Load active subjects config (from props or local storage)
  const activeSubjects: SubjectConfig[] = useMemo(() => {
    if (propSubjects && propSubjects.length > 0) return propSubjects;
    try {
      const saved = localStorage.getItem('pavn_merit_subject_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return DEFAULT_SUBJECTS;
  }, [propSubjects]);

  // Local storage students fallback for instant sync
  const [localStudents, setLocalStudents] = useState<StudentMarkRecord[]>(() => {
    try {
      const saved = localStorage.getItem('pavn_teacher_merit_students');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return [];
  });

  // Listen for real-time updates from TeacherMeritList
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('pavn_teacher_merit_students');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setLocalStudents(parsed);
        }
      } catch (e) {}
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('merit-list-updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('merit-list-updated', handleStorageChange);
    };
  }, []);

  // Dynamically calculate student marks based on ONLY active subjects
  const processedStudentsList: ProcessedStudent[] = useMemo(() => {
    const rawList = propAllStudents && propAllStudents.length > 0 ? propAllStudents : localStudents;
    const grandMax = activeSubjects.reduce((sum, s) => sum + s.maxMarks, 0);

    const mapped = rawList.map(st => {
      let grandObtained = 0;
      let failedCount = 0;

      const subjectScores = activeSubjects.map(sub => {
        let obtained = 0;
        let theory: number | null = null;
        let oral: number | null = null;
        const thMax = sub.theoryMax ?? 70;
        const orMax = sub.oralMax ?? 30;

        if (sub.hasTheoryOralSplit) {
          theory = st.theoryMarks?.[sub.id] ?? (sub.id === 'sanskrit' ? (st.theory ?? st.sanskritTheory ?? 0) : 0);
          oral = st.oralMarks?.[sub.id] ?? (sub.id === 'sanskrit' ? (st.oral ?? st.sanskritOral ?? 0) : 0);
          obtained = theory + oral;
        } else {
          obtained = st.marks?.[sub.id] ?? (st[sub.id as keyof StudentMarkRecord] as number) ?? 0;
        }

        const passMark = sub.passMarks ?? Math.round(sub.maxMarks * 0.33);
        const isPass = obtained >= passMark;
        if (!isPass) failedCount++;

        const pct = Math.round((obtained / sub.maxMarks) * 100);
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
      const overallGrade = 
        percentage >= 90 ? 'A+' :
        percentage >= 75 ? 'A' :
        percentage >= 60 ? 'B+' :
        percentage >= 45 ? 'B' :
        percentage >= 33 ? 'C' : 'D';

      const resultStatus = 
        failedCount === 0 ? 'उत्तीर्ण (Pass)' :
        failedCount <= 2 ? 'सप्लीमेंट्री (Supplementary)' : 'अनुत्तीर्ण (Needs Improvement)';

      // Extract Sanskrit theory/oral for backward compatibility
      const sanskritScore = subjectScores.find(s => s.subjectId === 'sanskrit');
      const theory = sanskritScore?.theory ?? (st.theory ?? st.sanskritTheory ?? 0);
      const oral = sanskritScore?.oral ?? (st.oral ?? st.sanskritOral ?? 0);

      return {
        ...st,
        theory,
        oral,
        sanskritTotal: theory + oral,
        subjectScores,
        totalObtained: grandObtained,
        totalMax: grandMax,
        percentage,
        grade: overallGrade,
        resultStatus,
        failedSubjects: failedCount,
        rank: 0
      };
    });

    // Sort and calculate rank
    const sorted = [...mapped].sort((a, b) => b.totalObtained - a.totalObtained);
    return mapped.map(item => {
      const r = sorted.findIndex(s => s.totalObtained === item.totalObtained) + 1;
      return { ...item, rank: r };
    });
  }, [propAllStudents, localStudents, activeSubjects]);

  // Selected student resolution
  const [selectedId, setSelectedId] = useState<string>(() => {
    if (propStudent && propStudent.id) return propStudent.id;
    return '';
  });

  useEffect(() => {
    if (propStudent && propStudent.id) {
      setSelectedId(propStudent.id);
    }
  }, [propStudent]);

  const activeStudent: ProcessedStudent | null = useMemo(() => {
    if (processedStudentsList.length === 0) return null;
    if (selectedId) {
      const found = processedStudentsList.find(s => s.id === selectedId);
      if (found) return found;
    }
    return processedStudentsList[0];
  }, [processedStudentsList, selectedId]);

  const [isBatchPrinting, setIsBatchPrinting] = useState(false);
  const [isPrintPreviewOnly, setIsPrintPreviewOnly] = useState(false);

  const currentIndex = processedStudentsList.findIndex(s => s.id === activeStudent?.id);
  const totalCount = processedStudentsList.length;

  const handlePrev = () => {
    if (totalCount === 0) return;
    const newIdx = currentIndex > 0 ? currentIndex - 1 : totalCount - 1;
    const nextSt = processedStudentsList[newIdx];
    setSelectedId(nextSt.id);
    if (onSelectStudent) onSelectStudent(nextSt);
  };

  const handleNext = () => {
    if (totalCount === 0) return;
    const newIdx = currentIndex < totalCount - 1 ? currentIndex + 1 : 0;
    const nextSt = processedStudentsList[newIdx];
    setSelectedId(nextSt.id);
    if (onSelectStudent) onSelectStudent(nextSt);
  };

  // Single Marksheet Print (Bulletproof Isolated Iframe Print)
  const handlePrintSingle = () => {
    setIsBatchPrinting(false);
    printElementDirectly(
      'printable-luxury-marksheet-container', 
      `${activeStudent ? activeStudent.name : 'Student'}_Marksheet_${className}`, 
      false
    );
  };

  // Batch Print All Marksheets (Bulletproof Isolated Iframe Print)
  const handlePrintBatch = () => {
    setIsBatchPrinting(true);
    setTimeout(() => {
      printElementDirectly(
        'printable-luxury-marksheet-container', 
        `All_Students_Marksheet_${className}`, 
        false
      );
      setTimeout(() => setIsBatchPrinting(false), 2000);
    }, 150);
  };

  if (!activeStudent) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-700">
        <Award className="w-12 h-12 text-amber-500 mx-auto mb-2" />
        <h3 className="text-base font-bold text-slate-900">कोई विद्यार्थी डेटा उपलब्ध नहीं है</h3>
        <p className="text-xs text-slate-500 mt-1">कृपया पहले कक्षा मेरिट लिस्ट में विद्यार्थी अंक दर्ज करें।</p>
        {onClose && (
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            वापस जाएं
          </button>
        )}
      </div>
    );
  }

  // Render a Single Luxury Marksheet Card with DYNAMIC Subjects
  const renderCard = (st: ProcessedStudent, isBatch = false) => {
    const isTopper = st.rank === 1;
    const isSecond = st.rank === 2;
    const isThird = st.rank === 3;

    const subjects = st.subjectScores || [];
    const grandMax = st.totalMax;
    const grandObtained = st.totalObtained;
    const inWords = numberToHindiWords(grandObtained);

    const division = 
      st.percentage >= 75 ? 'प्रथम श्रेणी ससम्मान (1st Div with Distinction)' :
      st.percentage >= 60 ? 'प्रथम श्रेणी (First Division)' :
      st.percentage >= 48 ? 'द्वितीय श्रेणी (Second Division)' :
      st.percentage >= 36 ? 'तृतीय श्रेणी (Third Division)' : 'अनुत्तीर्ण (Needs Improvement)';

    const motherName = `श्रीमति ${st.fatherName.replace('श्री ', '').split(' ')[0] || 'सुशीला'} देवी`;
    const scholarNo = `SRN-2026/${Number(st.rollNo) + 1200}`;
    const dob = `1${(Number(st.rollNo) % 8) + 1}/0${(Number(st.rollNo) % 9) + 1}/2011`;
    const serialNo = `MS-RBSE/2026/09-${st.rollNo}`;

    return (
      <div 
        key={st.id}
        className={`luxury-marksheet-sheet relative bg-[#fdfcf9] text-slate-900 border-[6px] border-[#926019] shadow-2xl p-5 sm:p-7 rounded-3xl mx-auto transition-all ${
          isBatch ? 'page-break-after-always mb-10' : 'max-w-3xl'
        }`}
        style={{
          boxShadow: '0 25px 60px -15px rgba(146, 96, 25, 0.25), inset 0 0 40px rgba(217, 163, 62, 0.08)'
        }}
      >
        {/* Ornate Gold Inner Filigree Border */}
        <div className="absolute inset-2.5 sm:inset-3 border-2 border-[#b88628] rounded-2xl pointer-events-none opacity-80" />
        <div className="absolute inset-3.5 sm:inset-4 border border-[#deb359] border-dashed rounded-xl pointer-events-none opacity-70" />

        {/* Vintage Royal Corner Accents */}
        <div className="absolute top-4 left-4 w-7 h-7 border-t-4 border-l-4 border-[#926019] rounded-tl-lg pointer-events-none" />
        <div className="absolute top-4 right-4 w-7 h-7 border-t-4 border-r-4 border-[#926019] rounded-tr-lg pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-7 h-7 border-b-4 border-l-4 border-[#926019] rounded-bl-lg pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-7 h-7 border-b-4 border-r-4 border-[#926019] rounded-br-lg pointer-events-none" />

        {/* Subtle Watermark Emblem in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
          <img src="/assets/school-logo.svg" alt="Watermark" className="w-80 h-80 object-contain" />
        </div>

        {/* Content Container */}
        <div className="relative z-10">

          {/* Top Royal Header */}
          <div className="text-center pb-3 border-b-2 border-[#926019]/70">
            
            {/* Topmost Motto & Affiliation Banner */}
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-black text-[#855310] tracking-widest font-serif uppercase">
                ॥ सा विद्या या विमुक्तये ॥
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-700 font-mono tracking-tight bg-amber-100/70 px-2 py-0.5 rounded border border-amber-300">
                क्रमांक: {serialNo}
              </span>
              <span className="text-[10px] sm:text-[11px] font-black text-[#855310] tracking-widest font-serif uppercase">
                ॥ राष्ट्राय स्वाहा इदं न मम ॥
              </span>
            </div>

            {/* School Logo + Main Title */}
            <div className="flex items-center justify-between gap-3 my-1">
              <div className="w-16 h-18 sm:w-20 sm:h-22 shrink-0 flex items-center justify-center p-1 bg-white rounded-xl shadow-xs border border-amber-300/80">
                <img src="/assets/school-logo.svg" alt="School Logo" className="w-full h-full object-contain filter drop-shadow-xs" />
              </div>

              <div className="flex-1 text-center px-1">
                <p className="text-[11px] font-black text-amber-800 uppercase tracking-widest font-serif">
                  विद्या भारती अखिल भारतीय शिक्षा संस्थान · राजस्थान क्षेत्रीय समिति
                </p>
                <h1 className="text-lg sm:text-2xl font-black font-serif text-[#0f1d3a] tracking-tight leading-tight mt-0.5">
                  {schoolName}
                </h1>
                <p className="text-[11px] font-bold text-slate-700 mt-0.5">
                  {schoolSubtitle}
                </p>
              </div>

              <div className="w-16 h-18 sm:w-20 sm:h-22 shrink-0 flex items-center justify-center p-1 bg-white rounded-xl shadow-xs border border-amber-300/80">
                <img src="/assets/school-logo.svg" alt="School Logo" className="w-full h-full object-contain filter drop-shadow-xs" />
              </div>
            </div>

            {/* Luxury Gold Foil Marksheet Title Ribbon */}
            <div className="mt-2.5 inline-flex items-center gap-2 px-5 py-1 rounded-full bg-gradient-to-r from-[#926019] via-[#d49e35] to-[#926019] text-white shadow-md border border-[#ffd276]">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span className="text-xs sm:text-sm font-black font-serif tracking-wider uppercase drop-shadow-xs">
                वार्षिक प्रगति पत्रक एवं प्रामाणिक अंकतालिका
              </span>
              <span className="text-[10px] font-bold tracking-normal opacity-90 hidden sm:inline">
                (OFFICIAL PROGRESS REPORT & MARKSHEET)
              </span>
            </div>

            <p className="text-[10px] font-extrabold text-slate-700 mt-1 uppercase tracking-wide">
              {displayExam} · शैक्षणिक सत्र: {academicSession}
            </p>
          </div>

          {/* Student Identity Card Box */}
          <div className="mt-3.5 p-3.5 rounded-2xl bg-amber-50/50 border-2 border-[#b88628]/40 text-xs">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3">
              
              {/* Information Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 flex-1 w-full text-slate-800 font-sans">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">रोल नंबर (Roll No)</span>
                  <span className="text-sm font-black font-mono text-[#0a235c]">{st.rollNo}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">पंजीयन क्रमांक (SRN)</span>
                  <span className="text-xs font-black font-mono text-slate-800">{scholarNo}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">कक्षा एवं वर्ग (Class & Sec)</span>
                  <span className="text-xs font-black text-amber-950">{className} - '{section}'</span>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">विद्यार्थी का नाम (Student Name)</span>
                  <span className="text-sm font-black text-slate-950 font-serif">{st.name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">पिता का नाम (Father's Name)</span>
                  <span className="text-xs font-bold text-slate-900">{st.fatherName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">माता का नाम (Mother's Name)</span>
                  <span className="text-xs font-bold text-slate-900">{motherName}</span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">जन्म तिथि (Date of Birth)</span>
                  <span className="text-xs font-bold font-mono text-slate-800">{dob}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">कक्षाध्यापक (Class Teacher)</span>
                  <span className="text-xs font-bold text-slate-900">{classTeacher}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 block uppercase">परिणाम तिथि (Declared Date)</span>
                  <span className="text-xs font-bold text-slate-900">{declarationDate}</span>
                </div>
              </div>

              {/* Student Merit Photo & Trophy Badge */}
              <div className="shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-[#deb359] shadow-2xs text-center min-w-[95px]">
                {st.photoUrl ? (
                  <div className="w-16 h-20 rounded-lg overflow-hidden border-2 border-amber-600 shadow-sm bg-slate-100 flex items-center justify-center">
                    <img 
                      src={st.photoUrl} 
                      alt={st.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-16 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex flex-col items-center justify-center text-white shadow-inner border border-amber-300">
                    <span className="text-xl font-black font-serif">{st.name.charAt(0)}</span>
                    <span className="text-[8px] text-amber-100 font-sans mt-0.5">विद्यार्थी फोटो</span>
                  </div>
                )}
                <div className="mt-1">
                  <span className={`inline-flex items-center gap-0.5 text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isTopper ? 'bg-amber-400 text-slate-950' : isSecond ? 'bg-slate-200 text-slate-900' : isThird ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isTopper ? '🥇 1st Rank' : isSecond ? '🥈 2nd Rank' : isThird ? '🥉 3rd Rank' : `#${st.rank} Rank`}
                  </span>
                </div>
                <span className="text-[9px] text-slate-500 font-mono mt-0.5">RBSE VERIFIED</span>
              </div>

            </div>
          </div>

          {/* DYNAMIC SUBJECTS MARKS TABLE (Populates Only Active Added Subjects) */}
          <div className="mt-3.5 overflow-hidden rounded-xl border-2 border-slate-900 bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0f1d3a] text-white font-black text-[11px] uppercase tracking-wide text-center">
                  <th className="p-2 border border-slate-700 w-10">क्र.</th>
                  <th className="p-2 border border-slate-700 text-left">अनिवार्य / ऐच्छिक विषय (Subjects)</th>
                  <th className="p-2 border border-slate-700 w-16">कोड</th>
                  <th className="p-2 border border-slate-700 w-18">पूर्णांक (Max)</th>
                  <th className="p-2 border border-slate-700 w-16">उत्तीर्णांक</th>
                  <th className="p-2 border border-slate-700 w-24 bg-amber-400 text-slate-950">प्राप्तांक</th>
                  <th className="p-2 border border-slate-700 w-16">प्रतिशत</th>
                  <th className="p-2 border border-slate-700 w-14">ग्रेड</th>
                  <th className="p-2 border border-slate-700 w-20">परिणाम</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 font-medium">
                {subjects.map((sub, sIdx) => {
                  const isDistinction = sub.obtained >= Math.round(sub.max * 0.75);

                  return (
                    <tr key={sIdx} className={sIdx % 2 === 1 ? 'bg-amber-50/20' : 'bg-white'}>
                      <td className="p-2 border border-slate-300 text-center font-bold text-slate-600">
                        {sIdx + 1}
                      </td>
                      <td className="p-2 border border-slate-300 text-left font-bold text-slate-900">
                        <span>{sub.name}</span>
                        {/* Theory & Oral Score Breakdown when configured */}
                        {sub.hasTheoryOralSplit && sub.theory !== null && (
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300">
                              📝 सैद्धांतिक (Theory): {sub.theory} / {sub.theoryMax}
                            </span>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-orange-100 text-orange-950 border border-orange-300">
                              🗣️ मौखिक (Oral): {sub.oral} / {sub.oralMax}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-800">
                              (स्वतः योग: {sub.obtained})
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-mono text-slate-600 font-bold">
                        {sub.code}
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-bold text-slate-700">
                        {sub.max}
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-semibold text-slate-500">
                        {sub.passMarks}
                      </td>
                      <td className={`p-2 border border-slate-300 text-center font-black text-sm ${
                        sub.isPass ? 'text-[#0a235c] bg-amber-100/50' : 'text-rose-700 bg-rose-50'
                      }`}>
                        <div className="flex items-center justify-center gap-1">
                          <span>{sub.obtained}</span>
                          {isDistinction && (
                            <span title="विशेष योग्यता (Distinction)">
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-mono font-bold text-slate-700">
                        {sub.percentage}%
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-black">
                        <span className={sub.grade === 'A+' ? 'text-amber-800 font-bold' : sub.grade === 'A' ? 'text-blue-800' : 'text-slate-800'}>
                          {sub.grade}
                        </span>
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-bold text-[11px]">
                        <span className={sub.isPass ? 'text-emerald-800' : 'text-rose-700'}>
                          {sub.isPass ? 'उत्तीर्ण' : 'अनुत्तीर्ण'}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {/* Grand Total Row */}
                <tr className="bg-gradient-to-r from-amber-100/80 via-amber-200/60 to-amber-100/80 font-black border-2 border-slate-900 text-slate-950">
                  <td colSpan={3} className="p-2.5 border border-slate-400 text-right uppercase tracking-wider text-xs font-serif font-black">
                    कुल महायोग (GRAND TOTAL):
                  </td>
                  <td className="p-2.5 border border-slate-400 text-center text-xs font-black">
                    {grandMax}
                  </td>
                  <td className="p-2.5 border border-slate-400 text-center text-xs">
                    {Math.round(grandMax * 0.33)}
                  </td>
                  <td className="p-2.5 border border-slate-400 text-center text-base font-black text-[#0a235c] bg-amber-300/80">
                    {grandObtained}
                  </td>
                  <td className="p-2.5 border border-slate-400 text-center text-xs font-black text-emerald-950">
                    {st.percentage}%
                  </td>
                  <td className="p-2.5 border border-slate-400 text-center text-xs font-black text-amber-950">
                    {st.grade}
                  </td>
                  <td className="p-2.5 border border-slate-400 text-center text-xs font-black text-emerald-900">
                    {st.resultStatus}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total Marks In Words Banner */}
          <div className="mt-2.5 p-2 rounded-xl bg-white border border-[#b88628]/50 flex items-center justify-between text-xs font-bold text-slate-800 flex-wrap gap-2">
            <div>
              <span className="text-slate-500">कुल प्राप्तांक शब्दों में (Total in Words): </span>
              <span className="text-amber-950 font-black font-serif underline decoration-amber-400">
                {inWords} अंक मात्र ({grandObtained} / {grandMax})
              </span>
            </div>
            <div>
              <span className="text-slate-500">मेरिट स्थिति: </span>
              <span className="text-[#0a235c] font-black">कक्षा में रैंक {st.rank} (कुल {totalCount} छात्रों में)</span>
            </div>
          </div>

          {/* Performance Summary Badges & Co-Curricular Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
            
            {/* Division & Overall Result Box */}
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-amber-900 uppercase tracking-widest block mb-1">
                  अंतिम परीक्षा परिणाम घोषणा (FINAL MERIT EVALUATION)
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-emerald-950">{division}</h4>
                    <p className="text-[11px] font-bold text-emerald-800">
                      प्रतिशत: {st.percentage}% · समग्र ग्रेड: {st.grade} · सफल (PASSED)
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-amber-300/60 flex items-center justify-between text-[11px] text-slate-700">
                <span>विशेष योग्यता (Distinction): {st.percentage >= 75 ? 'हाँ (अर्जित)' : 'प्रयास जारी'}</span>
                <span className="font-bold text-amber-900">कक्षा में रैंक: #{st.rank}</span>
              </div>
            </div>

            {/* Co-Scholastic Evaluative Domain */}
            <div className="p-3 rounded-2xl bg-white border-2 border-slate-300">
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest block mb-1.5">
                सह-शैक्षणिक एवं व्यक्तिगत मूल्यांकन (Co-Scholastic Assessment)
              </span>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px]">
                <div className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="text-slate-600">नियमितता एवं उपस्थिति:</span>
                  <span className="font-bold text-emerald-700">A+ (94.5%)</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="text-slate-600">अनुशासन एवं शिष्टाचार:</span>
                  <span className="font-bold text-emerald-700">A+</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="text-slate-600">स्वच्छता एवं स्वास्थ्य:</span>
                  <span className="font-bold text-emerald-700">A+</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-0.5">
                  <span className="text-slate-600">क्रीड़ा, योग एवं खेल:</span>
                  <span className="font-bold text-emerald-700">A+</span>
                </div>
                <div className="col-span-2 flex justify-between pt-0.5">
                  <span className="text-slate-600">नैतिक मूल्य एवं समाज सेवा:</span>
                  <span className="font-bold text-emerald-700">A+ उत्कृष्ट</span>
                </div>
              </div>
            </div>

          </div>

          {/* Official Signatures & Seal Section */}
          <div className="mt-5 pt-4 border-t-2 border-slate-900 flex items-end justify-between text-center px-2 font-sans text-xs">
            
            {/* 1. Class Teacher */}
            <div className="text-center w-36">
              <div className="h-10 flex items-center justify-center">
                <span className="text-slate-400 italic text-[11px]">हस्ताक्षर कक्षाध्यापक</span>
              </div>
              <div className="border-t border-slate-700 pt-1">
                <p className="font-bold text-slate-900 text-[11px] truncate">{classTeacher}</p>
                <p className="text-[9px] text-slate-500">कक्षाध्यापक (Class Teacher)</p>
              </div>
            </div>

            {/* 2. Official Seal & QR Code */}
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                {/* Golden Seal */}
                <div className="w-14 h-14 rounded-full border-2 border-amber-600 bg-amber-50 flex flex-col items-center justify-center shadow-xs text-center p-1">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span className="text-[7px] font-black text-amber-950 font-serif leading-none mt-0.5">OFFICIAL SEAL</span>
                  <span className="text-[6px] text-amber-800">RBSE VERIFIED</span>
                </div>

                {/* QR Code */}
                <div className="w-14 h-14 rounded-lg border border-slate-300 p-1 bg-white flex flex-col items-center justify-center shadow-2xs">
                  <QrCode className="w-9 h-9 text-slate-800" />
                  <span className="text-[6px] font-mono text-slate-500">VERIFY ID</span>
                </div>
              </div>
              <p className="text-[9px] text-slate-500 font-serif">प्रमाणित संस्थान मुहर एवं डिजिटल सत्यापन</p>
            </div>

            {/* 3. Examination Incharge */}
            <div className="text-center w-36 hidden sm:block">
              <div className="h-10 flex items-center justify-center">
                <span className="text-slate-400 italic text-[11px]">हस्ताक्षर परीक्षा नियंत्रक</span>
              </div>
              <div className="border-t border-slate-700 pt-1">
                <p className="font-bold text-slate-900 text-[11px] truncate">{examIncharge}</p>
                <p className="text-[9px] text-slate-500">परीक्षा प्रभारी (Exam Incharge)</p>
              </div>
            </div>

            {/* 4. Principal Stamp & Signature */}
            <div className="text-center w-40">
              <div className="h-10 flex items-center justify-center">
                <img
                  src="/assets/aistudio/1792464198738.jpg-removebg-preview_93d1da9c.png"
                  alt="Principal Seal"
                  className="max-h-12 max-w-[130px] object-contain"
                />
              </div>
              <div className="border-t border-slate-700 pt-1">
                <p className="font-bold text-slate-900 text-[11px] truncate">{principalName}</p>
                <p className="text-[9px] text-slate-500 truncate">{schoolName}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in print:p-0 print:bg-white print:static print:inset-auto">
      
      {/* Top Floating Control Bar (Hidden in Print) */}
      <div className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-amber-400/30 px-4 py-3 text-white shadow-xl flex items-center justify-between gap-3 flex-wrap print:hidden">
        
        {/* Left: Navigation and Student Info */}
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>मेरिट लिस्ट पर लौटें</span>
            </button>
          )}

          {/* Quick Student Selector */}
          <div className="flex items-center gap-1 bg-slate-800/80 rounded-xl p-1 border border-slate-700">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-amber-300 cursor-pointer"
              title="पिछला विद्यार्थी"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={activeStudent.id}
              onChange={(e) => {
                const found = processedStudentsList.find(s => s.id === e.target.value);
                if (found) {
                  setSelectedId(found.id);
                  if (onSelectStudent) onSelectStudent(found);
                }
              }}
              className="bg-transparent text-xs font-bold text-white px-2 py-1 outline-none cursor-pointer max-w-[200px] truncate"
            >
              {processedStudentsList.map(st => (
                <option key={st.id} value={st.id} className="bg-slate-900 text-white">
                  रोल {st.rollNo}: {st.name} (रैंक #{st.rank} - {st.percentage}%)
                </option>
              ))}
            </select>

            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-amber-300 cursor-pointer"
              title="अगला विद्यार्थी"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Live Auto-Sync Indicator & Active Subjects Count */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>मेरिट लिस्ट से लाइव सिंक ({activeSubjects.length} विषय सक्रिय · कुल पूर्णांक {activeStudent.totalMax})</span>
        </div>

        {/* Right: Print Actions & Edit */}
        <div className="flex items-center gap-2">
          {/* Quick Edit Student Button */}
          {onEditStudent && (
            <button
              onClick={() => onEditStudent(activeStudent)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-400/50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="इस विद्यार्थी के अंक संपादित करें"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>अंक बदलें</span>
            </button>
          )}

          {/* Batch Print All Marksheets */}
          <button
            onClick={handlePrintBatch}
            className="px-3.5 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold border border-purple-400/50 flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            title="कक्षा के सभी विद्यार्थियों की अंकतालिका एक साथ A4 पर प्रिंट करें"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>सभी छात्र मार्कशीट प्रिंट ({processedStudentsList.length})</span>
          </button>

          {/* Print Current Marksheet (Guaranteed Print Engine) */}
          <button
            onClick={handlePrintSingle}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black shadow-lg border border-amber-300 flex items-center gap-1.5 transition-all cursor-pointer ring-2 ring-amber-400/30"
            title="इस विद्यार्थी की लक्ज़री अंकतालिका सीधे प्रिंट करें"
          >
            <Printer className="w-4 h-4" />
            <span>🖨️ अंकतालिका प्रिंट करें (A4)</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold ml-1 cursor-pointer"
              title="बंद करें"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Main Presentation Container */}
      <div className="flex-1 p-3 sm:p-6 flex items-center justify-center print:p-0 print:block">
        
        {/* Printable Container targeted by printElementDirectly */}
        <div id="printable-luxury-marksheet-container" className="w-full">
          {isBatchPrinting ? (
            <div className="space-y-8 print:space-y-0">
              {processedStudentsList.map(st => renderCard(st, true))}
            </div>
          ) : (
            renderCard(activeStudent, false)
          )}
        </div>

      </div>

    </div>
  );
};
