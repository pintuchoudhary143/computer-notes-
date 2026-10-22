import React, { useState, useMemo } from 'react';
import { 
  allExcelFormulas, 
  excelCategories, 
  excelErrorGuide, 
  ExcelFormula 
} from '../data/excelFormulasData';
import { 
  Table, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Calculator, 
  HelpCircle, 
  AlertTriangle, 
  ChevronRight, 
  BookOpen, 
  Filter, 
  Layers, 
  ExternalLink,
  Code,
  Flame,
  X
} from 'lucide-react';

interface ExcelFormulaMasterProps {
  onBackToNotes?: () => void;
}

export const ExcelFormulaMaster: React.FC<ExcelFormulaMasterProps> = ({
  onBackToNotes
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activePlaygroundTab, setActivePlaygroundTab] = useState<'stats' | 'grade' | 'emi' | 'text' | 'age'>('stats');

  // Playground state
  const [statNumbers, setStatNumbers] = useState<string>('85, 92, 78, 95, 88');
  const [statFunc, setStatFunc] = useState<'SUM' | 'AVERAGE' | 'MAX' | 'MIN' | 'COUNT' | 'PRODUCT'>('SUM');

  const [studentMarks, setStudentMarks] = useState<number>(78);

  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [loanRate, setLoanRate] = useState<number>(9);
  const [loanYears, setLoanYears] = useState<number>(5);

  const [firstName, setFirstName] = useState<string>('राहुल');
  const [lastName, setLastName] = useState<string>('शर्मा');

  const [birthYear, setBirthYear] = useState<number>(2010);
  const [birthMonth, setBirthMonth] = useState<number>(8);
  const [birthDay, setBirthDay] = useState<number>(15);

  // Copy handler
  const handleCopy = (formulaText: string, id: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Filtered Formulas
  const filteredFormulas = useMemo(() => {
    return allExcelFormulas.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesPurpose = item.purposeHindi.toLowerCase().includes(q) || item.purposeEnglish.toLowerCase().includes(q);
        const matchesSyntax = item.syntax.toLowerCase().includes(q);
        const matchesExample = item.example.toLowerCase().includes(q) || item.exampleDescription.toLowerCase().includes(q);
        const matchesTip = item.hotTip.toLowerCase().includes(q);
        return matchesName || matchesPurpose || matchesSyntax || matchesExample || matchesTip;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  // Calculations for Playground
  const statsResult = useMemo(() => {
    const nums = statNumbers
      .split(',')
      .map(s => parseFloat(s.trim()))
      .filter(n => !isNaN(n));

    if (nums.length === 0) return 0;

    switch (statFunc) {
      case 'SUM':
        return nums.reduce((a, b) => a + b, 0);
      case 'AVERAGE':
        return +(nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2);
      case 'MAX':
        return Math.max(...nums);
      case 'MIN':
        return Math.min(...nums);
      case 'COUNT':
        return nums.length;
      case 'PRODUCT':
        return nums.reduce((a, b) => a * b, 1);
      default:
        return 0;
    }
  }, [statNumbers, statFunc]);

  // EMI Calculator using PMT formula
  const calculatedEMI = useMemo(() => {
    const p = loanAmount;
    const r = (loanRate / 100) / 12; // monthly rate
    const n = loanYears * 12; // total months
    if (p <= 0 || r <= 0 || n <= 0) return 0;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  }, [loanAmount, loanRate, loanYears]);

  // Grade Evaluator
  const gradeResult = useMemo(() => {
    if (studentMarks >= 75) return { grade: 'Distinction (विशेष योग्यता)', div: '1st Division with Honours', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
    if (studentMarks >= 60) return { grade: '1st Division (प्रथम श्रेणी)', div: 'First Division', color: 'text-blue-700 bg-blue-50 border-blue-300' };
    if (studentMarks >= 48) return { grade: '2nd Division (द्वितीय श्रेणी)', div: 'Second Division', color: 'text-amber-700 bg-amber-50 border-amber-300' };
    if (studentMarks >= 33) return { grade: '3rd Division (तृतीय श्रेणी / उत्तीर्ण)', div: 'Third Division', color: 'text-purple-700 bg-purple-50 border-purple-300' };
    return { grade: 'Fail (अनुत्तीर्ण)', div: 'Needs Improvement', color: 'text-rose-700 bg-rose-50 border-rose-300' };
  }, [studentMarks]);

  // Age Calculator
  const calculatedAge = useMemo(() => {
    const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months -= 1;
      days += 30;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months, days };
  }, [birthYear, birthMonth, birthDay]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Breadcrumb / Return */}
      {onBackToNotes && (
        <button
          onClick={onBackToNotes}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-700 transition-colors"
        >
          <span>← वापस अध्याय नोट्स पर जाएं</span>
        </button>
      )}

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-24 bottom-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5" />
              <span>MS Excel Master Formula Encyclopedia</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              100+ आवश्यक सूत्र एवं उदाहरण
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/10 text-slate-200">
              कक्षा 9 एवं व्यावसायिक स्तर
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
            माइक्रोसॉफ्ट एक्सेल: संपूर्ण फॉर्मूला महाकोश
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
            एक्सेल के सभी प्रमुख गणितीय, सांख्यिकीय, तार्किक (IF), लुकअप (VLOOKUP, XLOOKUP, INDEX+MATCH), टेक्स्ट, दिनांक-समय, वित्तीय (EMI PMT) एवं आधुनिक 365 डायनेमिक एरे सूत्रों का हिंदी सिंटेक्स, व्यावहारिक उदाहरण व लाइव कैलकुलेटर।
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-emerald-700/50 text-xs">
            <div>
              <p className="text-emerald-300/80 font-medium">कुल फॉर्मूले</p>
              <p className="text-lg font-black text-white">{allExcelFormulas.length}+ सूत्र</p>
            </div>
            <div>
              <p className="text-emerald-300/80 font-medium">प्रमुख श्रेणियाँ</p>
              <p className="text-lg font-black text-white">9 श्रेणियाँ</p>
            </div>
            <div>
              <p className="text-emerald-300/80 font-medium">त्रुटि समाधान</p>
              <p className="text-lg font-black text-white">7 एरर कोड गाइड</p>
            </div>
            <div>
              <p className="text-emerald-300/80 font-medium">इंटरएक्टिव लैब</p>
              <p className="text-lg font-black text-white">5 लाइव कैलकुलेटर</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Live Formula Playground */}
      <div className="bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-7 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>🧪 लाइव एक्सेल फॉर्मूला लैब (Interactive Playground)</span>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  लाइव कैलकुलेशन
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                अपनी संख्याएँ या मान दर्ज करके देखें कि एक्सेल फॉर्मूला बैकएंड में कैसे गणना करता है
              </p>
            </div>
          </div>

          {/* Playground Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActivePlaygroundTab('stats')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activePlaygroundTab === 'stats'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              📊 गणित व सांख्यिकी
            </button>
            <button
              onClick={() => setActivePlaygroundTab('grade')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activePlaygroundTab === 'grade'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🎓 =IF() ग्रेडिंग
            </button>
            <button
              onClick={() => setActivePlaygroundTab('emi')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activePlaygroundTab === 'emi'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              💰 =PMT() लोन EMI
            </button>
            <button
              onClick={() => setActivePlaygroundTab('text')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activePlaygroundTab === 'text'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🔤 =CONCAT() टेक्स्ट
            </button>
            <button
              onClick={() => setActivePlaygroundTab('age')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activePlaygroundTab === 'age'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🎂 =DATEDIF() आयु
            </button>
          </div>
        </div>

        {/* Tab 1: Stats Lab */}
        {activePlaygroundTab === 'stats' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  संख्याएँ दर्ज करें (कॉमा द्वारा अलग करें):
                </label>
                <input
                  type="text"
                  value={statNumbers}
                  onChange={(e) => setStatNumbers(e.target.value)}
                  className="w-full text-xs font-mono font-medium p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="उदा. 85, 92, 78, 95, 88"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  लागू किया जाने वाला एक्सेल फंक्शन:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['SUM', 'AVERAGE', 'MAX', 'MIN', 'COUNT', 'PRODUCT'] as const).map(fn => (
                    <button
                      key={fn}
                      onClick={() => setStatFunc(fn)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold border transition-all ${
                        statFunc === fn
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-400 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ={fn}()
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Result Box */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-5 rounded-2xl border border-emerald-800 shadow-inner">
              <div className="text-[11px] font-mono text-emerald-400 mb-1 flex items-center justify-between">
                <span>एक्सेल फॉर्मूला बार:</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-slate-300">Live Result</span>
              </div>
              <div className="font-mono text-sm sm:text-base bg-black/40 p-2.5 rounded-xl border border-white/10 mb-3 text-emerald-200 break-all">
                ={statFunc}({statNumbers})
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-white/10">
                <span className="text-xs text-slate-300 font-medium">गणना परिणाम (Evaluated Value):</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
                  {statsResult}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Grade Evaluator */}
        {activePlaygroundTab === 'grade' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">विद्यार्थी के कुल प्राप्तांक (%):</label>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {studentMarks}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={studentMarks}
                  onChange={(e) => setStudentMarks(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>0% (Fail)</span>
                  <span>33% (3rd)</span>
                  <span>48% (2nd)</span>
                  <span>60% (1st)</span>
                  <span>75%+ (Dist.)</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">लागू किया गया नेस्टेड IF सूत्र:</p>
                <code className="text-[11px] font-mono text-blue-700 block bg-white p-2 rounded border border-slate-200 overflow-x-auto">
                  =IF(A1&gt;=75, "Distinction", IF(A1&gt;=60, "1st Div", IF(A1&gt;=48, "2nd Div", IF(A1&gt;=33, "3rd Div", "Fail"))))
                </code>
              </div>
            </div>

            {/* Grade Result */}
            <div className={`p-6 rounded-2xl border-2 text-center transition-all ${gradeResult.color}`}>
              <span className="text-xs uppercase tracking-wider font-extrabold opacity-75">
                एक्सेल द्वारा निर्गत श्रेणी
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-1 mb-1">
                {gradeResult.grade}
              </h3>
              <p className="text-xs font-bold opacity-80">
                प्राप्तांक: {studentMarks}% | {gradeResult.div}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: EMI Calculator */}
        {activePlaygroundTab === 'emi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">ऋण राशि (PV)</label>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full text-xs font-mono p-2 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">वार्षिक ब्याज %</label>
                  <input
                    type="number"
                    step="0.5"
                    value={loanRate}
                    onChange={(e) => setLoanRate(Number(e.target.value))}
                    className="w-full text-xs font-mono p-2 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">अवधि (वर्ष)</label>
                  <input
                    type="number"
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full text-xs font-mono p-2 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                <p className="font-bold text-slate-700 mb-0.5">सटीक एक्सेल सूत्र:</p>
                <code className="text-[11px] font-mono text-emerald-800">
                  =PMT({loanRate}%/12, {loanYears}*12, -{loanAmount})
                </code>
              </div>
            </div>

            {/* EMI Result Card */}
            <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-5 rounded-2xl border border-emerald-700 text-center">
              <span className="text-xs uppercase font-extrabold text-emerald-300 tracking-wider">
                मासिक किस्त (Monthly EMI)
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-amber-300 font-mono my-1">
                ₹{calculatedEMI.toLocaleString('en-IN')}
              </h3>
              <p className="text-[11px] text-slate-300">
                कुल भुगतान: ₹{(calculatedEMI * loanYears * 12).toLocaleString('en-IN')} (कुल किस्तें: {loanYears * 12})
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Text Lab */}
        {activePlaygroundTab === 'text' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">प्रथम नाम (First Name):</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full text-xs font-medium p-2 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">उपनाम (Last Name):</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full text-xs font-medium p-2 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-600">=CONCAT(A1, " ", B1):</span>
                <span className="font-extrabold text-slate-900 font-mono">{firstName} {lastName}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-slate-600">=UPPER(full_name):</span>
                <span className="font-extrabold text-blue-700 font-mono uppercase">{firstName} {lastName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-600">=LEN(full_name):</span>
                <span className="font-extrabold text-emerald-700 font-mono">{`${firstName} ${lastName}`.length} अक्षर</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Age Lab */}
        {activePlaygroundTab === 'age' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">जन्मतिथि दर्ज करें (Date of Birth):</label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block">दिन (Day)</span>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={birthDay}
                    onChange={(e) => setBirthDay(Number(e.target.value))}
                    className="w-full text-xs font-mono p-2 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">माह (Month)</span>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(Number(e.target.value))}
                    className="w-full text-xs font-mono p-2 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">वर्ष (Year)</span>
                  <input
                    type="number"
                    min="1950"
                    max="2026"
                    value={birthYear}
                    onChange={(e) => setBirthYear(Number(e.target.value))}
                    className="w-full text-xs font-mono p-2 border border-slate-300 rounded-lg bg-slate-50"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white p-5 rounded-2xl border border-indigo-700 text-center">
              <span className="text-xs uppercase font-extrabold text-indigo-300 tracking-wider">
                =DATEDIF() द्वारा परिकलित आयु
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-300 my-1">
                {calculatedAge.years} वर्ष, {calculatedAge.months} माह, {calculatedAge.days} दिन
              </h3>
              <p className="text-[11px] text-slate-300 font-mono">
                =DATEDIF("{birthDay}-{birthMonth}-{birthYear}", TODAY(), "Y") &amp; " वर्ष"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar & Category Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="फॉर्मूला नाम, श्रेणी या हिंदी कार्य से खोजें (उदा. VLOOKUP, SUM, औसत, ईएमआई, आयु)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Difficulty Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-bold text-slate-600">कठिनाई स्तर:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">सभी स्तर (All Levels)</option>
              <option value="Basic">सरल (Basic)</option>
              <option value="Intermediate">मध्यम (Intermediate)</option>
              <option value="Advanced">उन्नत (Advanced / Pro)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {excelCategories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.key
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{cat.label}</span>
              {selectedCategory === cat.key && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 mt-3 border-t border-slate-100 font-medium">
          <span>
            प्रदर्शित हो रहे फॉर्मूले: <strong className="text-emerald-700 font-bold">{filteredFormulas.length}</strong> / {allExcelFormulas.length}
          </span>
          {(searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="text-emerald-600 hover:text-emerald-800 font-bold transition-colors"
            >
              फ़िल्टर रीसेट करें
            </button>
          )}
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {filteredFormulas.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">कोई फॉर्मूला नहीं मिला</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              कृपया अन्य कीवर्ड से खोजें अथवा श्रेणी फ़िल्टर बदलकर पुनः प्रयास करें।
            </p>
          </div>
        ) : (
          filteredFormulas.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-emerald-400 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Name + Badges + Copy */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base sm:text-lg font-black font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
                      ={item.name}()
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {item.categoryHindi}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      item.difficulty === 'Basic'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : item.difficulty === 'Intermediate'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {item.difficulty === 'Basic' ? 'सरल' : item.difficulty === 'Intermediate' ? 'मध्यम' : 'उन्नत'}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.example, item.id)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 transition-colors shrink-0"
                    title="उदाहरण सूत्र कॉपी करें"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Purpose in Hindi & English */}
                <p className="text-xs font-semibold text-slate-800 mb-1 leading-relaxed">
                  {item.purposeHindi}
                </p>
                <p className="text-[11px] text-slate-500 mb-3 italic">
                  {item.purposeEnglish}
                </p>

                {/* Syntax Box */}
                <div className="bg-slate-900 text-emerald-300 p-2.5 rounded-xl font-mono text-xs mb-3 overflow-x-auto shadow-inner">
                  <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold tracking-wider mb-0.5">
                    सिंटेक्स (Syntax):
                  </span>
                  {item.syntax}
                </div>

                {/* Example with Result */}
                <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3 mb-3 text-xs space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono font-bold text-emerald-900 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                      {item.example}
                    </span>
                    <span className="font-extrabold font-mono text-emerald-950 bg-emerald-200 px-2 py-0.5 rounded-md">
                      = {item.result}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    • {item.exampleDescription}
                  </p>
                </div>
              </div>

              {/* Hot Tip Footer */}
              <div className="pt-2.5 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-amber-900 bg-amber-50/70 p-2 rounded-xl">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong>युक्ति (Pro Tip):</strong> {item.hotTip}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Excel Errors Guide Section */}
      <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 shadow-xs mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              एक्सेल त्रुटि कोड एवं समाधान गाइड (Excel Errors Cheat Sheet)
            </h3>
            <p className="text-xs text-slate-500">
              फॉर्मूला लगाते समय आने वाली सामान्य त्रुटियों (Errors) के कारण व उन्हें ठीक करने के अचूक उपाय
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {excelErrorGuide.map((err, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 transition-all text-xs"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono font-black text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200 text-sm">
                  {err.error}
                </span>
                <span className="text-[10px] font-bold text-slate-500">
                  {err.name}
                </span>
              </div>
              <p className="text-slate-700 font-medium mb-2 leading-relaxed">
                <strong>कारण:</strong> {err.reasonHindi}
              </p>
              <div className="bg-white p-2 rounded-xl border border-slate-200 text-emerald-800">
                <strong>समाधान:</strong> {err.solutionHindi}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
