import React, { useState, useEffect } from 'react';
import { CertificateView, StudentCertificateData } from './CertificateView';
import { 
  Award, 
  UserCheck, 
  FileCheck, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  Sparkles,
  School,
  ArrowRight,
  Zap,
  RotateCcw
} from 'lucide-react';

interface CertificationCenterProps {
  initialModuleId?: string;
  initialMode?: 'direct' | 'exam';
}

interface ExamQuestion {
  id: number;
  subject: string;
  question: string;
  options: { [key: string]: string };
  correctOption: string;
  explanation: string;
}

const certificationQuestions: ExamQuestion[] = [
  {
    id: 1,
    subject: 'Computer Basics',
    question: 'कम्प्यूटर का कौनसा भाग "कम्प्यूटर का दिमाग" कहलाता है और समस्त गणनाएं व नियंत्रण करता है?',
    options: { 'A': 'मॉनिटर', 'B': 'CPU (Central Processing Unit)', 'C': 'रैम (RAM)', 'D': 'हार्ड डिस्क' },
    correctOption: 'B',
    explanation: 'CPU कम्प्यूटर का मस्तिष्क है जिसके तीन भाग CU, ALU और मेमोरी होते हैं।'
  },
  {
    id: 2,
    subject: 'MS Word',
    question: 'एमएस वर्ड में किसी शब्द के अक्षरों को गहरा (Bold) करने हेतु कौनसी शॉर्टकट कुंजी प्रयुक्त होती है?',
    options: { 'A': 'Ctrl + B', 'B': 'Ctrl + I', 'C': 'Ctrl + U', 'D': 'Ctrl + J' },
    correctOption: 'A',
    explanation: 'Ctrl + B से टेक्स्ट बोल्ड होता है।'
  },
  {
    id: 3,
    subject: 'MS Excel',
    question: 'एमएस एक्सेल में सेल A1 से लेकर A10 तक की सभी संख्याओं का योग करने का सही फार्मूला कौनसा है?',
    options: { 'A': '=TOTAL(A1:A10)', 'B': '=SUM(A1:A10)', 'C': '=ADD(A1:A10)', 'D': '=COUNT(A1:A10)' },
    correctOption: 'B',
    explanation: '=SUM() संख्याओं का योग करने का मानक एक्सेल फंक्शन है।'
  },
  {
    id: 4,
    subject: 'MS PowerPoint',
    question: 'पावरप्वाइंट में स्लाइड शो को पहली स्लाइड से फुल स्क्रीन में शुरू करने की शॉर्टकट कुंजी क्या है?',
    options: { 'A': 'F2', 'B': 'F5', 'C': 'Ctrl + M', 'D': 'Esc' },
    correctOption: 'B',
    explanation: 'F5 कुंजी से स्लाइड शो प्रारंभ होता है।'
  },
  {
    id: 5,
    subject: 'HTML',
    question: 'HTML में वेब पेज पर हाइपरलिंक (Hyperlink) बनाने के लिए किस टैग का उपयोग किया जाता है?',
    options: { 'A': '<link>', 'B': '<a> (Anchor tag)', 'C': '<href>', 'D': '<url>' },
    correctOption: 'B',
    explanation: '<a> टैग href एट्रिब्यूट के साथ हाइपरलिंक बनाता है।'
  },
  {
    id: 6,
    subject: 'CSS',
    question: 'CSS बॉक्स मॉडल में सामग्री (Content) और सीमा रेखा (Border) के मध्य के आंतरिक रिक्त स्थान को क्या कहते हैं?',
    options: { 'A': 'Margin', 'B': 'Padding', 'C': 'Outline', 'D': 'Spacing' },
    correctOption: 'B',
    explanation: 'बॉर्डर और कंटेंट के बीच का आंतरिक स्थान Padding कहलाता है।'
  },
  {
    id: 7,
    subject: 'JavaScript',
    question: 'जावास्क्रिप्ट में अपरिवर्तनीय (Constant) मान संचित करने हेतु कौनसा कीवर्ड प्रयुक्त होता है?',
    options: { 'A': 'let', 'B': 'var', 'C': 'const', 'D': 'static' },
    correctOption: 'C',
    explanation: 'const कीवर्ड से घोषित वेरिएबल का मान बदला नहीं जा सकता।'
  },
  {
    id: 8,
    subject: 'Python',
    question: 'पायथन प्रोग्रामिंग में कोड ब्लॉक्स (जैसे if या loop) की सीमा तय करने के लिए किसका प्रयोग होता है?',
    options: { 'A': 'इंडेंटेशन (Indentation / 4 Spaces)', 'B': 'कर्ली ब्रैकेट { }', 'C': 'सेमीकॉलन ;', 'D': 'Begin/End' },
    correctOption: 'A',
    explanation: 'पायथन में कोष्ठकों के स्थान पर इंडेंटेशन अनिवार्य नियम है।'
  },
  {
    id: 9,
    subject: 'Database',
    question: 'रिलेशनल डेटाबेस टेबल में प्रत्येक रो (रिकॉर्ड) को विशिष्ट (Unique) रूप से पहचानने वाले फील्ड को क्या कहते हैं?',
    options: { 'A': 'फॉरेन की (Foreign Key)', 'B': 'प्राइमरी की (Primary Key)', 'C': 'इंडेक्स की', 'D': 'कम्पोजिट की' },
    correctOption: 'B',
    explanation: 'प्राइमरी की अद्वितीय पहचान सुनिश्चित करती है और यह कभी रिक्त (Null) नहीं हो सकती।'
  },
  {
    id: 10,
    subject: 'Database SQL',
    question: 'SQL में टेबल से डेटा रिकॉर्ड्स खोजने व देखने के लिए कौनसी कमांड काम आती है?',
    options: { 'A': 'GET', 'B': 'SELECT', 'C': 'FIND', 'D': 'QUERY' },
    correctOption: 'B',
    explanation: 'SELECT * FROM TableName द्वारा रिकॉर्ड्स प्राप्त किए जाते हैं।'
  },
  {
    id: 11,
    subject: 'Networking',
    question: '100 MB/s से 2 GB/s गति तथा पूर्ण आंतरिक परावर्तन (TIR) पर आधारित तार संचरण माध्यम कौनसा है?',
    options: { 'A': 'ट्विस्टेड पेयर', 'B': 'कोएक्सिअल केबल', 'C': 'ऑप्टिकल फाइबर केबल (OFC)', 'D': 'टेलीफोन तार' },
    correctOption: 'C',
    explanation: 'OFC कांच के तंतु में प्रकाश तरंगों द्वारा सबसे तीव्र व सुरक्षित संचरण करती है।'
  },
  {
    id: 12,
    subject: 'Internet',
    question: 'मानव-पठनीय डोमेन नाम (जैसे google.com) को कंप्यूटर के संख्यात्मक IP पते में अनुवाद करने वाला सिस्टम है-',
    options: { 'A': 'HTML', 'B': 'DNS (Domain Name System)', 'C': 'URL', 'D': 'ISP' },
    correctOption: 'B',
    explanation: 'DNS इंटरनेट की फोनबुक है जो डोमेन को IP में बदलती है।'
  },
  {
    id: 13,
    subject: 'Cyber Security',
    question: 'किसी दूसरे लेखक की रचना या शोध को बिना संदर्भ दिए अपने नाम से प्रकाशित करना क्या कहलाता है?',
    options: { 'A': 'सत्यनिष्ठा', 'B': 'साहित्यिक चोरी (Plagiarism)', 'C': 'अधिप्रमाणन', 'D': 'ओपन सोर्स' },
    correctOption: 'B',
    explanation: 'बिना संदर्भ दूसरे की कृति की नकल साहित्यिक चोरी कहलाती है।'
  },
  {
    id: 14,
    subject: 'Memory',
    question: '1 किलोबाइट (KB) में कितने बाइट्स होते हैं?',
    options: { 'A': '1000 Bytes', 'B': '1024 Bytes', 'C': '1048 Bytes', 'D': '8 Bytes' },
    correctOption: 'B',
    explanation: '1 KB = 1024 Bytes होता है।'
  },
  {
    id: 15,
    subject: 'Supercomputer',
    question: 'भारत का पहला स्वदेशी सुपर कम्प्यूटर "परम" (PARAM) किस भारतीय संस्था द्वारा विकसित किया गया?',
    options: { 'A': 'इसरो (ISRO)', 'B': 'डीआरडीओ (DRDO)', 'C': 'सी-डैक (C-DAC, पुणे)', 'D': 'आईआईटी दिल्ली' },
    correctOption: 'C',
    explanation: 'C-DAC पुणे द्वारा 1991 में परम 8000 का निर्माण किया गया था।'
  }
];

const defaultCert: StudentCertificateData = {
  studentName: 'राहुल शर्मा',
  fatherName: 'श्री जगदीश प्रसाद शर्मा',
  motherName: 'श्रीमती सुमित्रा देवी',
  studentClass: "कक्षा 9th - 'A'",
  rollNo: '9042',
  subjectName: 'कम्प्यूटर विज्ञान एवं सूचना प्रौद्योगिकी (IT Proficiency)',
  scorePercentage: 96,
  issueDate: new Date().toLocaleDateString('hi-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }),
  certificateId: 'PAVN/IT/2026/8941'
};

export const CertificationCenter: React.FC<CertificationCenterProps> = ({ initialMode = 'direct' }) => {
  const [certMode, setCertMode] = useState<'direct' | 'exam'>(initialMode);
  
  // Student Form State
  const [studentName, setStudentName] = useState<string>('राहुल शर्मा');
  const [fatherName, setFatherName] = useState<string>('श्री जगदीश प्रसाद शर्मा');
  const [motherName, setMotherName] = useState<string>('श्रीमती सुमित्रा देवी');
  const [studentClass, setStudentClass] = useState<string>("कक्षा 9th - 'A'");
  const [rollNo, setRollNo] = useState<string>('9042');
  const [customScore, setCustomScore] = useState<number>(96);
  const [subjectTitle, setSubjectTitle] = useState<string>('कम्प्यूटर विज्ञान एवं सूचना प्रौद्योगिकी (IT Proficiency)');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Certificate State: Defaults to Ready & Active
  const [certificateData, setCertificateData] = useState<StudentCertificateData>(() => {
    try {
      const saved = localStorage.getItem('pavn_student_certificate_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.studentName) return parsed;
      }
    } catch (e) {}
    return defaultCert;
  });

  // Default step: 'certificate' so user IMMEDIATELY sees and prints the certificate
  const [step, setStep] = useState<'register' | 'exam' | 'certificate'>('certificate');

  // Exam state
  const [userAnswers, setUserAnswers] = useState<{ [qId: number]: string }>({});
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);

  // Load existing certificate if stored in localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pavn_student_certificate_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.studentName) {
          setCertificateData(parsed);
          setStudentName(parsed.studentName || '');
          setFatherName(parsed.fatherName || '');
          setMotherName(parsed.motherName || '');
          setStudentClass(parsed.studentClass || 'कक्षा 9th');
          setRollNo(parsed.rollNo || '');
          if (parsed.scorePercentage) setCustomScore(parsed.scorePercentage);
          if (parsed.subjectName) setSubjectTitle(parsed.subjectName);
        }
      }
    } catch (e) {
      console.warn('Failed to load saved certificate:', e);
    }
  }, []);

  const handleFillSample = () => {
    setStudentName('राहुल शर्मा');
    setFatherName('श्री जगदीश प्रसाद शर्मा');
    setMotherName('श्रीमती सुमित्रा देवी');
    setStudentClass('कक्षा 9th - \'A\'');
    setRollNo('9042');
    setCustomScore(96);
    setErrorMsg(null);
  };

  const handleDirectGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMsg('कृपया विद्यार्थी का नाम दर्ज करें!');
      return;
    }
    if (!fatherName.trim()) {
      setErrorMsg('कृपया पिता का नाम दर्ज करें!');
      return;
    }
    if (!motherName.trim()) {
      setErrorMsg('कृपया माता का नाम दर्ज करें!');
      return;
    }
    if (!studentClass.trim()) {
      setErrorMsg('कृपया कक्षा दर्ज करें!');
      return;
    }
    if (!rollNo.trim()) {
      setErrorMsg('कृपया रोल नंबर दर्ज करें!');
      return;
    }

    const today = new Date().toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    const certId = `PAVN/IT/2026/${randomSerial}`;

    const newCert: StudentCertificateData = {
      studentName: studentName.trim(),
      fatherName: fatherName.trim(),
      motherName: motherName.trim(),
      studentClass: studentClass.trim(),
      rollNo: rollNo.trim(),
      subjectName: subjectTitle,
      scorePercentage: customScore,
      issueDate: today,
      certificateId: certId
    };

    setCertificateData(newCert);
    try {
      localStorage.setItem('pavn_student_certificate_data', JSON.stringify(newCert));
    } catch (err) {
      console.warn('Failed to save certificate:', err);
    }

    setStep('certificate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setErrorMsg('कृपया अपना पूरा नाम दर्ज करें!');
      return;
    }
    if (!fatherName.trim()) {
      setErrorMsg('कृपया पिता का नाम दर्ज करें!');
      return;
    }
    if (!motherName.trim()) {
      setErrorMsg('कृपया माता का नाम दर्ज करें!');
      return;
    }
    if (!studentClass.trim()) {
      setErrorMsg('कृपया अपनी कक्षा दर्ज करें!');
      return;
    }
    if (!rollNo.trim()) {
      setErrorMsg('कृपया अपना रोल नंबर दर्ज करें!');
      return;
    }

    setErrorMsg(null);
    setUserAnswers({});
    setCurrentQIndex(0);
    setStep('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnswer = (qId: number, optKey: string) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optKey }));
  };

  const handleSubmitExam = () => {
    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < certificationQuestions.length) {
      if (!window.confirm(`आपने केवल ${answeredCount} प्रश्नों के उत्तर दिए हैं। क्या आप अभी परीक्षा सबमिट करना चाहते हैं?`)) {
        return;
      }
    }

    let correctCount = 0;
    certificationQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctOption) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / certificationQuestions.length) * 100);
    const today = new Date().toLocaleDateString('hi-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const randomSerial = Math.floor(1000 + Math.random() * 9000);
    const certId = `PAVN/IT/2026/${randomSerial}`;

    const newCert: StudentCertificateData = {
      studentName: studentName.trim(),
      fatherName: fatherName.trim(),
      motherName: motherName.trim(),
      studentClass: studentClass.trim(),
      rollNo: rollNo.trim(),
      subjectName: subjectTitle,
      scorePercentage: percentage,
      issueDate: today,
      certificateId: certId
    };

    setCertificateData(newCert);
    try {
      localStorage.setItem('pavn_student_certificate_data', JSON.stringify(newCert));
    } catch (e) {
      console.warn('Failed to save certificate:', e);
    }

    setStep('certificate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 1. Step 1: Student Registration Form & Direct Print Mode */}
      {step === 'register' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-400/30">
              <School className="w-4 h-4" />
              <span>पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-3">
              कम्प्यूटर एवं सूचना प्रौद्योगिकी प्रमाण-पत्र केंद्र
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              प्रधानाचार्य महोदय के डिजिटल हस्ताक्षर, विद्यालय सील एवं आधिकारिक गोल्ड मेडल युक्त प्रीमियम A4 प्रमाण-पत्र। आप सीधे अपना विवरण दर्ज कर तुरंत सर्टिफिकेट प्रिंट कर सकते हैं अथवा 15-प्रश्नों की परीक्षा देकर इसे अर्जित कर सकते हैं।
            </p>

            {/* Mode Selector Tabs */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={() => setCertMode('direct')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  certMode === 'direct'
                    ? 'bg-amber-400 text-slate-950 shadow-lg ring-2 ring-amber-300 font-extrabold'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Printer className="w-4 h-4" />
                <span>🖨️ सीधा प्रमाण-पत्र प्रिंट ऑप्शन (ON)</span>
              </button>

              <button
                type="button"
                onClick={() => setCertMode('exam')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  certMode === 'exam'
                    ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300 font-extrabold'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <FileCheck className="w-4 h-4" />
                <span>📝 15-प्रश्न ऑनलाइन मूल्यांकन परीक्षा</span>
              </button>
            </div>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-600" />
                <h2 className="text-base font-bold text-slate-900">
                  {certMode === 'direct' 
                    ? 'विद्यार्थी विवरण - त्वरित सर्टिफिकेट प्रिंटर' 
                    : 'विद्यार्थी विवरण - परीक्षा फॉर्म'}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleFillSample}
                className="text-[11px] font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                title="नमूना डेटा लोड करें"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>नमूना डेटा भरें</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800">
                ⚠️ {errorMsg}
              </div>
            )}

            <form onSubmit={certMode === 'direct' ? handleDirectGenerate : handleStartExam} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  विद्यार्थी का पूरा नाम (Student's Full Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल शर्मा"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full text-sm font-medium border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Parents' Details (Father & Mother) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    पिता का नाम (Father's Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. श्री जगदीश प्रसाद शर्मा"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    className="w-full text-sm font-medium border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    माता का नाम (Mother's Name) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. श्रीमती सुमित्रा देवी"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                    className="w-full text-sm font-medium border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    कक्षा (Class) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. 9th - 'A'"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full text-sm font-medium border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    रोल नंबर (Roll No.) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. 9042"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="w-full text-sm font-mono font-medium border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {certMode === 'direct' && (
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    सर्टिफिकेट प्राप्तांक प्रतिशत (Score % / Grade)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="60"
                      max="100"
                      step="1"
                      value={customScore}
                      onChange={(e) => setCustomScore(Number(e.target.value))}
                      className="flex-1 accent-amber-600"
                    />
                    <span className="w-16 text-center py-1 rounded-lg bg-amber-100 border border-amber-300 font-extrabold text-xs text-amber-950">
                      {customScore}%
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  मूल्यांकन विषय (Evaluation Subject)
                </label>
                <select
                  value={subjectTitle}
                  onChange={(e) => setSubjectTitle(e.target.value)}
                  className="w-full text-xs font-medium border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none"
                >
                  <option value="कम्प्यूटर विज्ञान एवं सूचना प्रौद्योगिकी (IT Proficiency)">
                    कम्प्यूटर विज्ञान एवं सूचना प्रौद्योगिकी (सम्पूर्ण पाठ्यक्रम)
                  </option>
                  <option value="माइक्रोसॉफ्ट ऑफिस दक्षता (Word, Excel & PowerPoint)">
                    माइक्रोसॉफ्ट ऑफिस दक्षता (Word, Excel & PowerPoint)
                  </option>
                  <option value="वेब टेक्नोलॉजी एवं कोडिंग (HTML, CSS, JS, Python & DB)">
                    वेब टेक्नोलॉजी एवं कोडिंग (HTML, CSS, JS, Python & DB)
                  </option>
                </select>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                🏫 <strong>विद्यालय:</strong> पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी<br />
                🖨️ <strong>प्रिंट सुविधा:</strong> पूर्ण रूप से चालू (ON) - सीधे A4 Landscape PDF में डाउनलोड करें।
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                {certificateData && (
                  <button
                    type="button"
                    onClick={() => setStep('certificate')}
                    className="px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>पूर्व प्रमाण-पत्र देखें</span>
                  </button>
                )}

                {certMode === 'direct' ? (
                  <button
                    type="submit"
                    className="w-full sm:w-auto ml-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-extrabold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>सर्टिफिकेट तैयार करें एवं प्रिंट करें</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full sm:w-auto ml-auto px-6 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>परीक्षा प्रारंभ करें</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Step 2: Online Examination */}
      {step === 'exam' && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Exam Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                परीक्षार्थी: {studentName} ({studentClass}, रोल नं: {rollNo})
              </span>
              <h2 className="text-base font-bold text-slate-900 mt-1">
                प्रमाणपत्र परीक्षा: प्रश्न {currentQIndex + 1} / {certificationQuestions.length}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-600">
                उत्तर दिए: {Object.keys(userAnswers).length} / {certificationQuestions.length}
              </span>
              <button
                onClick={handleSubmitExam}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                परीक्षा पूर्ण करें
              </button>
            </div>
          </div>

          {/* Question Box */}
          {certificationQuestions[currentQIndex] && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span className="font-semibold text-purple-700">
                  विषय: {certificationQuestions[currentQIndex].subject}
                </span>
                <span>प्रश्न क्रमांक {currentQIndex + 1}</span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-relaxed">
                <span className="text-blue-600 mr-2">Q{currentQIndex + 1}.</span>
                {certificationQuestions[currentQIndex].question}
              </h3>

              <div className="space-y-2.5">
                {Object.entries(certificationQuestions[currentQIndex].options).map(([optKey, optVal]) => {
                  const isSelected = userAnswers[certificationQuestions[currentQIndex].id] === optKey;
                  return (
                    <button
                      key={optKey}
                      onClick={() => handleSelectAnswer(certificationQuestions[currentQIndex].id, optKey)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs sm:text-sm ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold ring-2 ring-blue-200'
                          : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-white border border-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {optKey}
                        </span>
                        <span>{optVal}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="px-4 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50"
                >
                  पिछला प्रश्न
                </button>

                <div className="flex items-center gap-2">
                  {currentQIndex < certificationQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQIndex(prev => Math.min(certificationQuestions.length - 1, prev + 1))}
                      className="px-5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
                    >
                      अगला प्रश्न
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitExam}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                    >
                      सबमिट करें एवं सर्टिफिकेट बनाएं
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Question Pallet */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <span className="text-xs font-bold text-slate-700 block mb-2">प्रश्न चयन पैलेट:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {certificationQuestions.map((q, idx) => {
                const isAnswered = Boolean(userAnswers[q.id]);
                const isCurrent = currentQIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'ring-2 ring-blue-500 bg-blue-600 text-white'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. Step 3: Official Certificate View (Instant Print Ready) */}
      {step === 'certificate' && certificateData && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#031124] via-[#092244] to-[#031124] text-white border-2 border-emerald-500/50 shadow-xl print:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-400/20 text-emerald-300 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-emerald-400/50">
                    ✓ प्रमाण-पत्र प्रिंट ऑप्शन चालू है (Print Option ON)
                  </span>
                  <span className="text-slate-300 text-xs font-mono hidden md:inline">
                    A4 Landscape प्रारूप
                  </span>
                </div>
                <p className="text-xs text-slate-200 font-bold mt-0.5">
                  पटेल आदर्श विद्या निकेतन - विद्यार्थी: <span className="text-amber-300">{certificateData.studentName}</span> | रोल नंबर: <span className="text-amber-300">{certificateData.rollNo}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black shadow-lg flex items-center gap-1.5 transition-all cursor-pointer ring-2 ring-amber-300 active:scale-95"
                title="सर्टिफिकेट A4 Landscape में प्रिंट करें"
              >
                <Printer className="w-4 h-4 text-slate-950" />
                <span>🖨️ अभी प्रिंट करें (Print)</span>
              </button>

              <button
                onClick={() => setStep('register')}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>✏️ विद्यार्थी का नाम / विवरण बदलें</span>
              </button>

              <button
                onClick={() => {
                  setCertMode('exam');
                  setStep('register');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600/80 hover:bg-blue-600 text-white text-xs font-bold border border-blue-400/40 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>📝 15-प्रश्न परीक्षा दें</span>
              </button>
            </div>
          </div>

          <CertificateView
            data={certificateData}
            onClose={() => setStep('register')}
            onEdit={(updated) => setCertificateData(updated)}
          />
        </div>
      )}
    </div>
  );
};
