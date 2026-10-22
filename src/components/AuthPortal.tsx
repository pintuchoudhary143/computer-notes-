import React, { useState } from 'react';
import { 
  GraduationCap, 
  Lock, 
  Mail, 
  User, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  FileSpreadsheet, 
  Award, 
  ShieldCheck, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  School
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/auth';

export const AuthPortal: React.FC = () => {
  const { login, signup } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');

  // Form fields
  const [identity, setIdentity] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Signup fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [designation, setDesignation] = useState('');

  // Feedback states
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState<{ username: string; message: string } | null>(null);
  const [copiedUsername, setCopiedUsername] = useState(false);

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!identity.trim() || !password) {
      setErrorMessage('कृपया अपना यूजरनेम या ईमेल आईडी एवं पासवर्ड दर्ज करें!');
      return;
    }

    const result = login(identity, password);
    if (!result.success) {
      setErrorMessage(result.message);
    }
  };

  // Handle Signup
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMessage('कृपया सभी अनिवार्य फ़ील्ड भरें!');
      return;
    }

    const result = signup({
      fullName,
      email,
      password,
      role: selectedRole,
      rollNo: selectedRole === 'student' ? rollNo : undefined,
      designation: selectedRole === 'teacher' ? (designation || 'वरिष्ठ अध्यापक') : undefined
    });

    if (result.success) {
      setSuccessInfo({
        username: result.username,
        message: result.message
      });
    } else {
      setErrorMessage(result.message);
    }
  };

  // Quick Demo Login
  const handleDemoLogin = (role: 'teacher' | 'student') => {
    setErrorMessage('');
    if (role === 'teacher') {
      login('teacher', 'teacher123');
    } else {
      login('student', 'student123');
    }
  };

  const handleCopyUsername = (uname: string) => {
    navigator.clipboard.writeText(uname);
    setCopiedUsername(true);
    setTimeout(() => setCopiedUsername(false), 2500);
  };

  return (
    <div className="min-h-screen bg-radial from-[#071330] via-[#040c20] to-[#020612] text-white flex flex-col justify-center items-center p-4 sm:p-6 font-sans relative overflow-hidden">
      
      {/* Decorative Gold & Indigo Background Ambience */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container Card */}
      <div className="w-full max-w-xl bg-white/95 text-slate-900 rounded-3xl shadow-2xl border-2 border-amber-400/50 backdrop-blur-md overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Royal School Top Header Banner */}
        <div className="bg-gradient-to-r from-[#030a1c] via-[#09183d] to-[#030a1c] p-6 text-center border-b-2 border-amber-400 relative">
          
          {/* Sacred Motto */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[11px] font-black tracking-widest text-amber-300 uppercase font-serif">
              ॥ सा विद्या या विमुक्तये ॥ विद्या भारती अखिल भारतीय शिक्षा संस्थान
            </span>
          </div>

          {/* School Logo & Title */}
          <div className="flex items-center justify-center gap-3.5 mb-2">
            <div className="w-13 h-13 rounded-2xl bg-[#091533] border-2 border-amber-400 p-1 flex items-center justify-center shadow-md">
              <img 
                src="/assets/school-logo.svg" 
                alt="School Logo" 
                className="w-full h-full object-contain filter drop-shadow-md" 
              />
            </div>
            <div className="text-left">
              <h1 className="text-lg sm:text-xl font-black font-serif text-white uppercase tracking-tight">
                पटेल आदर्श विद्या निकेतन
              </h1>
              <p className="text-[11px] font-semibold text-amber-300">
                उच्च माध्यमिक विद्यालय, केकड़ी (राजस्थान)
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto">
            माध्यमिक शिक्षा बोर्ड राजस्थान (RBSE) सम्बद्ध · संस्थागत डिजिटल शिक्षण एवं मेरिट मूल्यांकन पोर्टल
          </p>

          {/* Mode Switcher Pills: Login vs Signup */}
          <div className="flex items-center justify-center gap-2 mt-5 bg-black/40 p-1 rounded-2xl max-w-xs mx-auto border border-white/10">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMessage('');
                setSuccessInfo(null);
              }}
              className={`flex-1 py-1.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🔐 लॉगिन (Login)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMessage('');
                setSuccessInfo(null);
              }}
              className={`flex-1 py-1.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-amber-400 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              📝 नया पंजीकरण (Sign Up)
            </button>
          </div>

        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">

          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-slate-700 mb-2">
              लॉगिन प्रकार चुनें (Select Portal Role):
            </label>
            <div className="grid grid-cols-2 gap-3">
              
              {/* Teacher Role Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('teacher')}
                className={`p-3.5 rounded-2xl border-2 transition-all text-left flex items-start gap-3 cursor-pointer ${
                  selectedRole === 'teacher'
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-400/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedRole === 'teacher' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 block">
                    👨‍🏫 शिक्षक लॉगिन (Teacher)
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
                    मेरिट लिस्ट, एक्सेल शीट, अंक संशोधन व प्रिंट अधिकार
                  </span>
                </div>
              </button>

              {/* Student Role Card */}
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`p-3.5 rounded-2xl border-2 transition-all text-left flex items-start gap-3 cursor-pointer ${
                  selectedRole === 'student'
                    ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-2 ring-amber-400/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedRole === 'student' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-600'
                }`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900 block">
                    👨‍🎓 विद्यार्थी लॉगिन (Student)
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">
                    पाठ्यक्रम नोट्स, क्विज व अपनी मार्कशीट देखें
                  </span>
                </div>
              </button>

            </div>
          </div>

          {/* Success Banner (e.g. after Signup) */}
          {successInfo && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950">
              <div className="flex items-center gap-2 mb-1.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-black">{successInfo.message}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-300 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] text-slate-500 block">आपका आधिकारिक यूजरनेम:</span>
                  <span className="text-base font-black font-mono text-indigo-900 tracking-wider">
                    {successInfo.username}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyUsername(successInfo.username)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedUsername ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUsername ? 'कॉपी हुआ!' : 'कॉपी करें'}</span>
                </button>
              </div>
              <p className="text-[11px] text-emerald-800 mt-2">
                💡 आप इस यूजरनेम अथवा अपनी पंजीकृत ईमेल आईडी से कभी भी लॉगिन कर सकते हैं।
              </p>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* =========================================================================
              LOGIN FORM (Username or Email + Password)
              ========================================================================= */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  यूजरनेम अथवा ईमेल आईडी (Username or Email) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder={selectedRole === 'teacher' ? 'उदा. teacher अथवा registered ईमेल' : 'उदा. student अथवा registered ईमेल'}
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  पंजीकरण के समय मिला यूजरनेम (उदा. TEACHER_7821) अथवा ईमेल आईडी भरें
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  पासवर्ड (Password) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="अपना गुप्त पासवर्ड दर्ज करें"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedRole === 'teacher'
                    ? 'bg-gradient-to-r from-indigo-700 via-indigo-800 to-blue-900 hover:from-indigo-800 hover:to-blue-950 text-white shadow-indigo-500/20'
                    : 'bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 shadow-amber-500/20'
                }`}
              >
                <span>
                  {selectedRole === 'teacher' ? '👨‍🏫 शिक्षक पोर्टल में प्रवेश करें' : '👨‍🎓 विद्यार्थी पोर्टल में प्रवेश करें'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Quick Demo Login Credentials Bar */}
              <div className="pt-4 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 block mb-2 text-center">
                  त्वरित परीक्षण हेतु 1-क्लिक डेमो लॉगिन:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('teacher')}
                    className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-indigo-50 text-indigo-900 border border-slate-200 hover:border-indigo-300 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="शिक्षक डेमो लॉगिन करें (Username: teacher, Password: teacher123)"
                  >
                    <span>⚡ शिक्षक डेमो (teacher)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin('student')}
                    className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-amber-50 text-amber-950 border border-slate-200 hover:border-amber-300 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                    title="विद्यार्थी डेमो लॉगिन करें (Username: student, Password: student123)"
                  >
                    <span>⚡ छात्र डेमो (student)</span>
                  </button>
                </div>
              </div>

            </form>
          ) : (
            /* =========================================================================
               SIGNUP FORM (Registers Email, Name, and Assigns Official Username)
               ========================================================================= */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  पूरा नाम (Full Name) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="उदा. श्री सुरेश चन्द शर्मा / राहुल शर्मा"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ईमेल आईडी (Email ID) * <span className="text-[10px] text-blue-700 font-semibold">(इसी ईमेल से आपकी आईडी खुलेगी)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="उदा. teacher@pavn.edu अथवा personal email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {selectedRole === 'student' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    कक्षा रोल नंबर (Roll No)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. 901"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    पदनाम / विषय (Designation)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. वरिष्ठ अध्यापक (कक्षा 9th A)"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  सुरक्षित पासवर्ड सेट करें (Set Password) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="न्यूनतम 6 अक्षरों का पासवर्ड"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-300 text-[11px] text-amber-950">
                <span>🛡️ पंजीकरण करने पर आपको तुरंत एक आधिकारिक <b>यूजरनेम (Username)</b> प्रदान किया जाएगा। भविष्य में आप अपने यूजरनेम अथवा ईमेल आईडी दोनों में से किसी से भी लॉगिन कर सकेंगे।</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>खाता बनाएं एवं आधिकारिक यूजरनेम प्राप्त करें</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>

      </div>

      {/* Footer Branding */}
      <div className="mt-4 text-center text-xs text-slate-400 relative z-10">
        <p>© 2026-2027 पटेल आदर्श विद्या निकेतन उच्च माध्यमिक विद्यालय, केकड़ी · सर्वाधिकार सुरक्षित</p>
      </div>

    </div>
  );
};
