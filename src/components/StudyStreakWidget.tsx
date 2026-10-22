import React, { useState } from 'react';
import { useStudyStreak } from '../hooks/useStudyStreak';
import { 
  Flame, 
  Trophy, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw,
  BookOpen,
  HelpCircle,
  Check
} from 'lucide-react';

interface StudyStreakWidgetProps {
  onOpenNotes?: () => void;
  onOpenQuiz?: () => void;
}

export const StudyStreakWidget: React.FC<StudyStreakWidgetProps> = ({
  onOpenNotes,
  onOpenQuiz
}) => {
  const {
    currentStreak,
    longestStreak,
    isTodayLogged,
    totalActiveDays,
    history,
    logTodayManually,
    resetStreak,
    getWeeklyStatus
  } = useStudyStreak();

  const [showHistory, setShowHistory] = useState(false);
  const [justLoggedFeedback, setJustLoggedFeedback] = useState(false);

  const weeklyDays = getWeeklyStatus();

  const handleManualCheckin = () => {
    logTodayManually();
    setJustLoggedFeedback(true);
    setTimeout(() => {
      setJustLoggedFeedback(false);
    }, 3000);
  };

  // Milestones calculation
  const milestones = [
    { target: 3, title: '3-दिवसीय आरंभक', badge: '🥉', desc: 'लगातार 3 दिन अध्ययन' },
    { target: 7, title: '7-दिवसीय चैंपियन', badge: '🥈', desc: '1 सप्ताह निरंतरता' },
    { target: 14, title: '14-दिवसीय विद्वान', badge: '🥇', desc: '2 सप्ताह कठोर अनुशासन' },
    { target: 30, title: '30-दिवसीय मास्टर', badge: '👑', desc: 'महीने भर की महारत' },
  ];

  const nextMilestone = milestones.find(m => m.target > currentStreak) || milestones[milestones.length - 1];
  const progressToNext = Math.min(100, Math.round((currentStreak / nextMilestone.target) * 100));

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 border-2 border-orange-200 rounded-3xl p-5 sm:p-7 mb-8 shadow-xs relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-400/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/25">
            <Flame className="w-7 h-7 animate-pulse text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                स्टडी स्ट्रीक ट्रैकर (Daily Study Streak)
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200 uppercase tracking-wider">
                दैनिक निरंतरता
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              प्रतिदिन अध्याय नोट्स पढ़ने एवं क्विज़ हल करने की अटूट शृंखला
            </p>
          </div>
        </div>

        {/* Action / Reset */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {totalActiveDays > 0 && (
            <button
              onClick={resetStreak}
              className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors p-1.5 flex items-center gap-1 rounded-lg hover:bg-white/80"
              title="स्ट्रीक डेटा रीसेट करें"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">रीसेट</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Streak display + Weekly mini-calendar + Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 relative z-10">
        
        {/* Left Column: Big Flame & Current Streak Number (4 cols) */}
        <div className="lg:col-span-4 bg-white/90 backdrop-blur-xs border border-orange-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                वर्तमान स्ट्रीक (Current Streak)
              </span>
              {currentStreak >= 3 ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xs">
                  <Sparkles className="w-3 h-3" />
                  फायर मोड!
                </span>
              ) : (
                <span className="text-[11px] font-semibold text-slate-400">
                  लक्ष्य: 7 दिन
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl sm:text-6xl font-black bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                {currentStreak}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-700">
                दिन लगातार
              </span>
            </div>

            {/* Motivational message */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentStreak === 0 && 'आज ही कोई पाठ या क्विज़ खोलकर अपनी स्ट्रीक शुरू करें!'}
              {currentStreak === 1 && 'शाबाश! पहला कदम उठा लिया है। कल भी पढ़कर स्ट्रीक 2 दिन करें!'}
              {currentStreak >= 2 && currentStreak < 7 && `गज़ब! लगातार ${currentStreak} दिनों से आप नियमित अध्ययन कर रहे हैं।`}
              {currentStreak >= 7 && `अद्भुत समर्पण! ${currentStreak} दिन की निरंतरता आपको टॉपर बनाएगी!`}
            </p>
          </div>

          {/* Today Status Badge & Quick Action Button */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            {isTodayLogged ? (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>आज का अध्ययन दर्ज हो चुका है! आपकी स्ट्रीक सुरक्षित है।</span>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    आज का अध्ययन अभी दर्ज नहीं हुआ! स्ट्रीक टूटने से बचाने के लिए नीचे दर्ज करें या कोई पाठ पढ़ें।
                  </span>
                </div>

                <button
                  onClick={handleManualCheckin}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <Flame className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>🔥 आज का अध्ययन दर्ज करें (Log Today)</span>
                </button>
              </div>
            )}

            {justLoggedFeedback && (
              <div className="mt-2 text-center text-xs font-bold text-emerald-700 bg-emerald-100/90 py-1.5 px-2 rounded-lg animate-bounce">
                🎉 बधाई! आज की अध्ययन उपस्थिति सफलतापूर्वक दर्ज हो गई!
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 7-Day Tracker + Milestones + Key Stats (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-4">
          
          {/* Weekly 7-Day Activity Strip */}
          <div className="bg-white/90 backdrop-blur-xs border border-orange-200/80 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-600" />
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  पिछले 7 दिनों का अध्ययन कैलेंडर (Weekly Log)
                </h3>
              </div>
              <span className="text-[11px] text-slate-500">
                आज: {weeklyDays[weeklyDays.length - 1]?.dayName}
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {weeklyDays.map((day, idx) => (
                <div
                  key={day.dateStr}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                    day.isActive
                      ? 'bg-gradient-to-b from-orange-50 to-amber-100/80 border-orange-300 text-orange-900 shadow-xs'
                      : day.isToday
                      ? 'bg-amber-50/50 border-amber-300 border-dashed text-slate-700 ring-2 ring-orange-400/30'
                      : 'bg-slate-50/80 border-slate-200 text-slate-400'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase mb-1">
                    {day.dayName}
                  </span>
                  
                  {/* Icon status */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    day.isActive
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-xs'
                      : day.isToday
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-slate-200/70 text-slate-400'
                  }`}>
                    {day.isActive ? (
                      <Flame className="w-4 h-4" />
                    ) : day.isToday ? (
                      <Clock className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-[10px] font-medium">•</span>
                    )}
                  </div>

                  <span className="text-[11px] font-extrabold">
                    {day.dayNumber}
                  </span>

                  <span className={`text-[9px] font-semibold mt-0.5 ${
                    day.isActive ? 'text-orange-700' : 'text-slate-400'
                  }`}>
                    {day.isActive ? 'अध्ययन' : day.isToday ? 'आज' : 'शेष'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Bar & Milestones Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Stat 1: Longest streak */}
            <div className="bg-white/80 border border-orange-100 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  सर्वोत्तम स्ट्रीक
                </p>
                <p className="text-base font-extrabold text-slate-800">
                  {longestStreak} दिन
                </p>
              </div>
            </div>

            {/* Stat 2: Total Active Days */}
            <div className="bg-white/80 border border-orange-100 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  कुल सक्रिय दिवस
                </p>
                <p className="text-base font-extrabold text-slate-800">
                  {totalActiveDays} दिन
                </p>
              </div>
            </div>

            {/* Stat 3: Next Milestone */}
            <div className="bg-white/80 border border-orange-100 rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>अगला मेडल</span>
                  <span>{currentStreak}/{nextMilestone.target}</span>
                </div>
                <p className="text-xs font-bold text-slate-800 truncate">
                  {nextMilestone.badge} {nextMilestone.title}
                </p>
                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div 
                    className="bg-purple-600 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick study links + Activity log dropdown */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-white/60 p-3 rounded-2xl border border-orange-100">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-700">स्ट्रीक बढ़ाने हेतु त्वरित कार्य:</span>
              {onOpenNotes && (
                <button
                  onClick={onOpenNotes}
                  className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>नोट्स पढ़ें</span>
                </button>
              )}
              {onOpenQuiz && (
                <button
                  onClick={onOpenQuiz}
                  className="inline-flex items-center gap-1 font-bold text-purple-700 hover:text-purple-900 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>क्विज़ टेस्ट दें</span>
                </button>
              )}
            </div>

            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-slate-600 hover:text-orange-700 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>अध्ययन इतिहास ({history.length})</span>
              {showHistory ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Activity History View */}
      {showHistory && (
        <div className="mt-4 pt-4 border-t border-orange-200/70 relative z-10 animate-fadeIn">
          <div className="bg-white/95 rounded-2xl p-4 border border-orange-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-600" />
                <span>हालिया अध्ययन गतिविधियाँ (Recent Study Log)</span>
              </h4>
              <span className="text-[11px] text-slate-400">
                स्वचालित रूप से दर्ज
              </span>
            </div>

            {history.length === 0 ? (
              <p className="text-xs text-slate-500 py-3 text-center">
                अभी कोई गतिविधि दर्ज नहीं है। पाठ पढ़ने या क्विज़ देने पर यह स्वतः दर्ज हो जाएगी।
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                        item.type === 'notes'
                          ? 'bg-blue-100 text-blue-700'
                          : item.type === 'quiz'
                          ? 'bg-purple-100 text-purple-700'
                          : item.type === 'exam'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {item.type === 'notes' ? '📖' : item.type === 'quiz' ? '📝' : item.type === 'exam' ? '🎓' : '🔥'}
                      </span>
                      <div>
                        <p className="font-bold text-slate-800">{item.title}</p>
                        {item.details && (
                          <p className="text-[11px] text-slate-500">{item.details}</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-slate-400 shrink-0">
                      <span>{item.date}</span>
                      <span className="ml-1.5 text-slate-500 font-medium">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
