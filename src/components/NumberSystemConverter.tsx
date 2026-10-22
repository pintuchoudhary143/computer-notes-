import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, Sparkles, Check, HelpCircle } from 'lucide-react';

export const NumberSystemConverter: React.FC = () => {
  const [decimalVal, setDecimalVal] = useState<string>('25');
  const [binaryVal, setBinaryVal] = useState<string>('11001');
  const [octalVal, setOctalVal] = useState<string>('31');
  const [hexVal, setHexVal] = useState<string>('19');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const updateFromDecimal = (val: string) => {
    setDecimalVal(val);
    setErrorMsg(null);
    if (!val || isNaN(Number(val))) {
      setBinaryVal('');
      setOctalVal('');
      setHexVal('');
      return;
    }
    const num = parseInt(val, 10);
    if (num < 0) {
      setErrorMsg('कृपया धनात्मक संख्या प्रविष्ट करें');
      return;
    }
    setBinaryVal(num.toString(2));
    setOctalVal(num.toString(8));
    setHexVal(num.toString(16).toUpperCase());
  };

  const updateFromBinary = (val: string) => {
    setBinaryVal(val);
    setErrorMsg(null);
    if (!val) {
      setDecimalVal('');
      setOctalVal('');
      setHexVal('');
      return;
    }
    if (!/^[01]+$/.test(val)) {
      setErrorMsg('बाइनरी में केवल 0 और 1 अंक ही मान्य हैं!');
      return;
    }
    const num = parseInt(val, 2);
    setDecimalVal(num.toString(10));
    setOctalVal(num.toString(8));
    setHexVal(num.toString(16).toUpperCase());
  };

  const updateFromOctal = (val: string) => {
    setOctalVal(val);
    setErrorMsg(null);
    if (!val) {
      setDecimalVal('');
      setBinaryVal('');
      setHexVal('');
      return;
    }
    if (!/^[0-7]+$/.test(val)) {
      setErrorMsg('ऑक्टल में केवल 0 से 7 तक के अंक ही मान्य हैं!');
      return;
    }
    const num = parseInt(val, 8);
    setDecimalVal(num.toString(10));
    setBinaryVal(num.toString(2));
    setHexVal(num.toString(16).toUpperCase());
  };

  const updateFromHex = (val: string) => {
    setHexVal(val.toUpperCase());
    setErrorMsg(null);
    if (!val) {
      setDecimalVal('');
      setBinaryVal('');
      setOctalVal('');
      return;
    }
    if (!/^[0-9A-Fa-f]+$/.test(val)) {
      setErrorMsg('हेक्साडेसिमल में 0-9 तथा A, B, C, D, E, F मान्य हैं!');
      return;
    }
    const num = parseInt(val, 16);
    setDecimalVal(num.toString(10));
    setBinaryVal(num.toString(2));
    setOctalVal(num.toString(8));
  };

  const setPreset = (dec: number) => {
    updateFromDecimal(dec.toString());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
            <Calculator className="w-5 h-5 text-teal-200" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
            पाठ 1: संख्या प्रणाली कनवर्टर (Number System Calculator)
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          बाइनरी, दशमलव, अष्टक एवं षोडश आधारी त्वरित रूपांतरक
        </h1>
        <p className="text-xs sm:text-sm text-teal-100 max-w-2xl leading-relaxed">
          किसी भी एक खाने में संख्या टाइप करें, यह टूल स्वतः अन्य तीनों संख्या प्रणालियों में गणना कर चरणबद्ध रूपांतरण प्रदर्शित करेगा।
        </p>
      </div>

      {/* Converter Interactive Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-800 flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Decimal */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800">
                दशमलव (Decimal System)
              </label>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                Base 10 (0 - 9)
              </span>
            </div>
            <input
              type="text"
              value={decimalVal}
              onChange={(e) => updateFromDecimal(e.target.value)}
              placeholder="उदा. 25"
              className="w-full text-base font-mono font-bold text-slate-900 bg-white border border-slate-300 rounded-lg p-2.5 focus:outline-none"
            />
          </div>

          {/* Binary */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800">
                द्विआधारी (Binary System)
              </label>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                Base 2 (0, 1)
              </span>
            </div>
            <input
              type="text"
              value={binaryVal}
              onChange={(e) => updateFromBinary(e.target.value)}
              placeholder="उदा. 11001"
              className="w-full text-base font-mono font-bold text-blue-800 bg-white border border-slate-300 rounded-lg p-2.5 focus:outline-none"
            />
          </div>

          {/* Octal */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800">
                अष्टक (Octal System)
              </label>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Base 8 (0 - 7)
              </span>
            </div>
            <input
              type="text"
              value={octalVal}
              onChange={(e) => updateFromOctal(e.target.value)}
              placeholder="उदा. 31"
              className="w-full text-base font-mono font-bold text-amber-900 bg-white border border-slate-300 rounded-lg p-2.5 focus:outline-none"
            />
          </div>

          {/* Hexadecimal */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800">
                षोडश आधारी (Hexadecimal System)
              </label>
              <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                Base 16 (0-9, A-F)
              </span>
            </div>
            <input
              type="text"
              value={hexVal}
              onChange={(e) => updateFromHex(e.target.value)}
              placeholder="उदा. 19"
              className="w-full text-base font-mono font-bold text-purple-900 bg-white border border-slate-300 rounded-lg p-2.5 focus:outline-none"
            />
          </div>
        </div>

        {/* Textbook Practice Presets */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-600 block mb-2">
            📚 पाठ्यपुस्तक के अभ्यास प्रश्न उदाहरण टेस्ट करें:
          </span>
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <button
              onClick={() => setPreset(25)}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-medium border border-slate-200 transition-all"
            >
              (25)₁₀ = (11001)₂
            </button>
            <button
              onClick={() => setPreset(42)}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-medium border border-slate-200 transition-all"
            >
              (42)₁₀ = (101010)₂
            </button>
            <button
              onClick={() => setPreset(428)}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-medium border border-slate-200 transition-all"
            >
              (428)₁₀ = (1AC)₁₆
            </button>
            <button
              onClick={() => setPreset(2502)}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-medium border border-slate-200 transition-all"
            >
              (4706)₈ = (2502)₁₀
            </button>
          </div>
        </div>

        {/* Step-by-Step Educational Explanation */}
        {decimalVal && !isNaN(Number(decimalVal)) && (
          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200 text-xs text-slate-800 space-y-2">
            <h4 className="font-bold text-teal-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>रूपांतरण विधि (Step-by-Step Explanation):</span>
            </h4>
            <p>
              • <strong>दशमलव से बाइनरी:</strong> {decimalVal} को 2 से भाग देने पर शेषफल नीचे से ऊपर क्रम में एकत्र करने पर 
              <span className="font-mono font-bold text-teal-800 ml-1">({binaryVal})₂</span> प्राप्त होता है।
            </p>
            <p>
              • <strong>बाइनरी से दशमलव:</strong> {binaryVal} के प्रत्येक बिट को 2 के स्थानीय मान (2⁰, 2¹, 2²...) से गुणा करने पर 
              <span className="font-mono font-bold text-teal-800 ml-1">{decimalVal}₁₀</span> प्राप्त होता है।
            </p>
            <p>
              • <strong>हेक्साडेसिमल प्रतीक मान:</strong> A = 10, B = 11, C = 12, D = 13, E = 14, F = 15।
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
