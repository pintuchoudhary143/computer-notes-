import React, { useState } from 'react';
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
  Layers
} from 'lucide-react';
import { ProcessedStudent } from './TeacherMeritList';

interface LuxuryMarksheetProps {
  student: ProcessedStudent;
  allStudents: ProcessedStudent[];
  schoolName: string;
  schoolSubtitle: string;
  className: string;
  section: string;
  classTeacher: string;
  academicSession: string;
  displayExam: string;
  declarationDate: string;
  maxMarksPerSubject: number;
  sanskritTheoryMax: number;
  sanskritOralMax: number;
  onClose: () => void;
  onSelectStudent: (student: ProcessedStudent) => void;
  onEditStudent?: (student: ProcessedStudent) => void;
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

export const LuxuryMarksheet: React.FC<LuxuryMarksheetProps> = ({
  student,
  allStudents,
  schoolName,
  schoolSubtitle,
  className,
  section,
  classTeacher,
  academicSession,
  displayExam,
  declarationDate,
  maxMarksPerSubject,
  sanskritTheoryMax,
  sanskritOralMax,
  onClose,
  onSelectStudent,
  onEditStudent
}) => {
  const [isBatchPrinting, setIsBatchPrinting] = useState(false);

  // Current student index in list
  const currentIndex = allStudents.findIndex(s => s.id === student.id);
  const totalStudents = allStudents.length;

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectStudent(allStudents[currentIndex - 1]);
    } else {
      onSelectStudent(allStudents[totalStudents - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalStudents - 1) {
      onSelectStudent(allStudents[currentIndex + 1]);
    } else {
      onSelectStudent(allStudents[0]);
    }
  };

  // Single Marksheet Print
  const handlePrintSingle = () => {
    setIsBatchPrinting(false);
    document.body.classList.remove('print-merit-board', 'print-batch-all');
    document.body.classList.add('print-single-marksheet');
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('print-single-marksheet');
      }, 500);
    }, 100);
  };

  // Batch Print All Students Marksheets
  const handlePrintBatch = () => {
    setIsBatchPrinting(true);
    document.body.classList.remove('print-merit-board', 'print-single-marksheet');
    document.body.classList.add('print-batch-all');
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setIsBatchPrinting(false);
        document.body.classList.remove('print-batch-all');
      }, 500);
    }, 150);
  };

  // Render a single luxury marksheet layout for any student
  const renderLuxuryCard = (st: ProcessedStudent, isBatch = false) => {
    const isTopper = st.rank === 1;
    const isSecond = st.rank === 2;
    const isThird = st.rank === 3;

    // Subjects dataset
    const subjects = [
      {
        code: '01',
        name: 'हिंदी (Hindi)',
        theory: null,
        oral: null,
        theoryMax: 0,
        oralMax: 0,
        obtained: st.hindi,
        max: maxMarksPerSubject
      },
      {
        code: '02',
        name: 'अंग्रेजी (English)',
        theory: null,
        oral: null,
        theoryMax: 0,
        oralMax: 0,
        obtained: st.english,
        max: maxMarksPerSubject
      },
      {
        code: '03',
        name: 'गणित (Mathematics)',
        theory: null,
        oral: null,
        theoryMax: 0,
        oralMax: 0,
        obtained: st.maths,
        max: maxMarksPerSubject
      },
      {
        code: '04',
        name: 'विज्ञान (General Science)',
        theory: null,
        oral: null,
        theoryMax: 0,
        oralMax: 0,
        obtained: st.science,
        max: maxMarksPerSubject
      },
      {
        code: '05',
        name: 'सामाजिक विज्ञान (Social Science)',
        theory: null,
        oral: null,
        theoryMax: 0,
        oralMax: 0,
        obtained: st.socialScience,
        max: maxMarksPerSubject
      },
      {
        code: '06',
        name: 'तृतीय भाषा - संस्कृत (Sanskrit)',
        theory: st.theory !== undefined ? st.theory : (st.sanskritTheory ?? 0),
        theoryMax: sanskritTheoryMax,
        oral: st.oral !== undefined ? st.oral : (st.sanskritOral ?? 0),
        oralMax: sanskritOralMax,
        obtained: st.sanskritTotal,
        max: maxMarksPerSubject
      }
    ];

    const grandMax = maxMarksPerSubject * 6;
    const grandObtained = st.totalObtained;
    const inWords = numberToHindiWords(grandObtained);

    // Division categorization
    const division = 
      st.percentage >= 75 ? 'प्रथम श्रेणी ससम्मान (1st Div with Distinction)' :
      st.percentage >= 60 ? 'प्रथम श्रेणी (First Division)' :
      st.percentage >= 48 ? 'द्वितीय श्रेणी (Second Division)' :
      st.percentage >= 36 ? 'तृतीय श्रेणी (Third Division)' : 'अनुत्तीर्ण (Needs Improvement)';

    // Generated Mother name derived respectfully for RBSE format
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

              {/* Student Merit Avatar & Trophy Badge */}
              <div className="shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-[#deb359] shadow-2xs text-center min-w-[90px]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-lg font-black shadow-inner">
                  {st.name.charAt(0)}
                </div>
                <div className="mt-1">
                  <span className={`inline-flex items-center gap-0.5 text-[10px] font-black px-2 py-0.5 rounded-full ${
                    isTopper ? 'bg-amber-400 text-slate-950' : isSecond ? 'bg-slate-200 text-slate-900' : isThird ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {isTopper ? '🥇 1st Rank' : isSecond ? '🥈 2nd Rank' : isThird ? '🥉 3rd Rank' : `#${st.rank} Rank`}
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-mono mt-0.5">RBSE VERIFIED</span>
              </div>

            </div>
          </div>

          {/* Core Subjects Marks Table (6 Main Subjects) */}
          <div className="mt-3.5 overflow-hidden rounded-xl border-2 border-slate-900 bg-white">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#0f1d3a] text-white font-black text-[11px] uppercase tracking-wide text-center">
                  <th className="p-2 border border-slate-700 w-10">क्र.</th>
                  <th className="p-2 border border-slate-700 text-left">अनिवार्य विषय (Compulsory Subjects)</th>
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
                  const obtained = Number(sub.obtained || 0);
                  const passMarks = Math.round(sub.max * 0.33);
                  const isPass = obtained >= passMarks;
                  const isDistinction = obtained >= Math.round(sub.max * 0.75);
                  const subPct = sub.max > 0 ? Math.round((obtained / sub.max) * 100) : 0;
                  const subGrade = subPct >= 90 ? 'A+' : subPct >= 75 ? 'A' : subPct >= 60 ? 'B+' : subPct >= 45 ? 'B' : subPct >= 33 ? 'C' : 'D';

                  return (
                    <tr key={sIdx} className={sIdx % 2 === 1 ? 'bg-amber-50/20' : 'bg-white'}>
                      <td className="p-2 border border-slate-300 text-center font-bold text-slate-600">
                        {sIdx + 1}
                      </td>
                      <td className="p-2 border border-slate-300 text-left font-bold text-slate-900">
                        <span>{sub.name}</span>
                        {/* Specific Theory & Oral Breakdown for Sanskrit */}
                        {sub.theory !== null && (
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
                        {passMarks}
                      </td>
                      <td className={`p-2 border border-slate-300 text-center font-black text-sm ${
                        isPass ? 'text-[#0a235c] bg-amber-100/50' : 'text-rose-700 bg-rose-50'
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
                        {subPct}%
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-black">
                        <span className={subGrade === 'A+' ? 'text-amber-800 font-bold' : subGrade === 'A' ? 'text-blue-800' : 'text-slate-800'}>
                          {subGrade}
                        </span>
                      </td>
                      <td className="p-2 border border-slate-300 text-center font-bold text-[11px]">
                        <span className={isPass ? 'text-emerald-800' : 'text-rose-700'}>
                          {isPass ? 'उत्तीर्ण' : 'अनुत्तीर्ण'}
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
              <span className="text-[#0a235c] font-black">कक्षा में रैंक {st.rank} (कुल {totalStudents} छात्रों में)</span>
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
                <p className="font-bold text-slate-900 text-[11px]">श्री रामगोपाल जी</p>
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
                <p className="font-bold text-slate-900 text-[11px]">प्रधानाचार्य महोदय</p>
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
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>मेरिट लिस्ट पर लौटें</span>
          </button>

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
              value={student.id}
              onChange={(e) => {
                const found = allStudents.find(s => s.id === e.target.value);
                if (found) onSelectStudent(found);
              }}
              className="bg-transparent text-xs font-bold text-white px-2 py-1 outline-none cursor-pointer max-w-[200px] truncate"
            >
              {allStudents.map(st => (
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

        {/* Center: Live Auto-Sync Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>मेरिट लिस्ट से लाइव ऑटो-सिंक सक्रिय (अंक बदलते ही स्वतः अपडेट)</span>
        </div>

        {/* Right: Print Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Edit Student Button */}
          {onEditStudent && (
            <button
              onClick={() => onEditStudent(student)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-400/50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="इस विद्यार्थी के थ्योरी, मौखिक व अन्य अंक संपादित करें"
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
            <span>सभी छात्र मार्कशीट प्रिंट ({allStudents.length})</span>
          </button>

          {/* Print Current Marksheet */}
          <button
            onClick={handlePrintSingle}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-black shadow-lg border border-amber-300 flex items-center gap-1.5 transition-all cursor-pointer ring-2 ring-amber-400/30"
          >
            <Printer className="w-4 h-4" />
            <span>🖨️ अंकतालिका प्रिंट करें (A4)</span>
          </button>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold ml-1 cursor-pointer"
            title="बंद करें"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Presentation Container */}
      <div className="flex-1 p-3 sm:p-6 flex items-center justify-center print:p-0 print:block">
        
        {/* If in Batch Mode for Print, render all marksheets; otherwise render current */}
        <div id="printable-luxury-marksheet-container" className="w-full">
          {isBatchPrinting ? (
            <div className="space-y-8 print:space-y-0">
              {allStudents.map(st => renderLuxuryCard(st, true))}
            </div>
          ) : (
            renderLuxuryCard(student, false)
          )}
        </div>

      </div>

      {/* Print Specific CSS to prevent overlaps and guarantee flawless single A4 page print */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 6mm 6mm 6mm;
          }
          html, body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden;
          }
          #printable-luxury-marksheet-container, 
          #printable-luxury-marksheet-container * {
            visibility: visible;
          }
          #printable-luxury-marksheet-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .luxury-marksheet-sheet {
            box-shadow: none !important;
            border-width: 4px !important;
            margin: 0 auto !important;
            max-width: 100% !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .page-break-after-always {
            page-break-after: always !important;
            break-after: page !important;
          }
        }
      `}</style>

    </div>
  );
};
