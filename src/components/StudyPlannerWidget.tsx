import React, { useState, useEffect, useMemo } from 'react';
import { Chapter } from '../types/study';
import { 
  Calendar, 
  Clock, 
  Bell, 
  BellRing, 
  CheckCircle2, 
  Circle, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  RotateCcw, 
  Zap, 
  Flame, 
  ChevronRight, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export interface PlanDaySchedule {
  dayNumber: number;
  chapterId: number;
  chapterNumber: number;
  titleHindi: string;
  focusTopics: string;
  recommendedTimeMinutes: number;
  isMilestone?: boolean;
  milestoneTitle?: string;
}

interface StudyPlannerWidgetProps {
  chapters: Chapter[];
  onSelectChapter: (chapter: Chapter) => void;
  onOpenQuizModal?: () => void;
}

// 7-Day Crash Revision Plan Schedule
const plan7Days: PlanDaySchedule[] = [
  {
    dayNumber: 1,
    chapterId: 1,
    chapterNumber: 1,
    titleHindi: 'कम्प्यूटर का परिचय',
    focusTopics: 'कम्प्यूटर उद्भव, परिभाषा, वर्गीकरण, ब्लॉक डायग्राम एवं संख्या पद्धतियां',
    recommendedTimeMinutes: 45
  },
  {
    dayNumber: 2,
    chapterId: 2,
    chapterNumber: 2,
    titleHindi: 'इनपुट/आउटपुट तथा संग्रहण युक्तियाँ',
    focusTopics: 'कीबोर्ड, माउस, ओएमआर, प्रिंटर्स, मॉनिटर एवं मेमोरी सोपान (RAM, ROM, HDD, SSD)',
    recommendedTimeMinutes: 50
  },
  {
    dayNumber: 3,
    chapterId: 3,
    chapterNumber: 3,
    titleHindi: 'कंप्यूटर संचार एवं नेटवर्क',
    focusTopics: 'गाइडेड/अनगाइडेड मीडिया, ट्विस्टेड पेयर, OFC, टोपोलॉजी (Bus, Star, Ring, Mesh)',
    recommendedTimeMinutes: 50
  },
  {
    dayNumber: 4,
    chapterId: 4,
    chapterNumber: 4,
    titleHindi: 'इंटरनेट एवं तकनीकी',
    focusTopics: 'ARPANET, TCP/IP, WWW, URL, DNS, सर्च इंजन, ईमेल संरचना एवं सोशल नेटवर्किंग',
    recommendedTimeMinutes: 45
  },
  {
    dayNumber: 5,
    chapterId: 5,
    chapterNumber: 5,
    titleHindi: 'माइक्रोसॉफ्ट विंडोज',
    focusTopics: 'GUI, डेस्कटॉप, टास्कबार, कंट्रोल पैनल, विंडोज एक्सेसरीज एवं शॉर्टकट कुंजियाँ',
    recommendedTimeMinutes: 45
  },
  {
    dayNumber: 6,
    chapterId: 6,
    chapterNumber: 6,
    titleHindi: 'माइक्रोसॉफ्ट ऑफिस',
    focusTopics: 'MS Word (फॉर्मेटिंग, टेबल, मेल मर्ज), MS Excel (फॉर्मूले, चार्ट्स) एवं PowerPoint',
    recommendedTimeMinutes: 60,
    isMilestone: true,
    milestoneTitle: 'प्रैक्टिकल ऑफिस टूल्स'
  },
  {
    dayNumber: 7,
    chapterId: 7,
    chapterNumber: 7,
    titleHindi: 'ICT अनुप्रयोग, साइबर सुरक्षा एवं सम्पूर्ण मॉक टेस्ट',
    focusTopics: 'ई-गवर्नेंस, ई-मित्र, बौद्धिक सम्पदा अधिकार (IPR), साहित्यिक चोरी, साइबर सुरक्षा व रिवीज़न',
    recommendedTimeMinutes: 60,
    isMilestone: true,
    milestoneTitle: 'मॉक टेस्ट व प्रमाण-पत्र'
  }
];

// 14-Day Comprehensive Mastery Plan Schedule
const plan14Days: PlanDaySchedule[] = [
  {
    dayNumber: 1,
    chapterId: 1,
    chapterNumber: 1,
    titleHindi: 'पाठ 1 (भाग 1): कम्प्यूटर उद्भव एवं वर्गीकरण',
    focusTopics: 'कम्प्यूटर की परिभाषा, 5 पीढ़ियाँ, एनालॉग/डिजिटल एवं सुपर कम्प्यूटर',
    recommendedTimeMinutes: 30
  },
  {
    dayNumber: 2,
    chapterId: 1,
    chapterNumber: 1,
    titleHindi: 'पाठ 1 (भाग 2): आर्किटेक्चर एवं संख्या पद्धति',
    focusTopics: 'कम्प्यूटर ब्लॉक डायग्राम (CU, ALU, MU) एवं बाइनरी-डेसिमल रूपांतरण',
    recommendedTimeMinutes: 35
  },
  {
    dayNumber: 3,
    chapterId: 2,
    chapterNumber: 2,
    titleHindi: 'पाठ 2 (भाग 1): इनपुट युक्तियाँ एवं स्कैनर्स',
    focusTopics: 'कीबोर्ड कीज, माउस, ओएमआर, ओसीआर, एमआईसीआर, बारकोड रीडर',
    recommendedTimeMinutes: 30
  },
  {
    dayNumber: 4,
    chapterId: 2,
    chapterNumber: 2,
    titleHindi: 'पाठ 2 (भाग 2): आउटपुट युक्तियाँ एवं मेमोरी सोपान',
    focusTopics: 'सीआरटी/एलईडी मॉनिटर, इम्पैक्ट/नॉन-इम्पैक्ट प्रिंटर्स, RAM, ROM व सेकेंडरी स्टोरेज',
    recommendedTimeMinutes: 35
  },
  {
    dayNumber: 5,
    chapterId: 3,
    chapterNumber: 3,
    titleHindi: 'पाठ 3 (भाग 1): डेटा संचार एवं केबल्स',
    focusTopics: 'संचार मॉडल, सिम्प्लेक्स/डुप्लेक्स, ट्विस्टेड पेयर, कोएक्सिअल एवं ऑप्टिकल फाइबर',
    recommendedTimeMinutes: 30
  },
  {
    dayNumber: 6,
    chapterId: 3,
    chapterNumber: 3,
    titleHindi: 'पाठ 3 (भाग 2): नेटवर्क प्रकार एवं टोपोलॉजी',
    focusTopics: 'LAN, MAN, WAN, नेटवर्क युक्तियाँ (हब, स्विच, राउटर) व टोपोलॉजी आरेख',
    recommendedTimeMinutes: 35
  },
  {
    dayNumber: 7,
    chapterId: 4,
    chapterNumber: 4,
    titleHindi: 'पाठ 4 (भाग 1): इंटरनेट की अवधारणा एवं WWW',
    focusTopics: 'ARPANET, इंटरनेट कनेक्शन प्रकार, WWW, हाइपरटेक्स्ट एवं वेब ब्राउजर्स',
    recommendedTimeMinutes: 30
  },
  {
    dayNumber: 8,
    chapterId: 4,
    chapterNumber: 4,
    titleHindi: 'पाठ 4 (भाग 2): प्रोटोकॉल्स, DNS एवं ईमेल',
    focusTopics: 'IP पता, डोमेन नेम सिस्टम, सर्च इंजन एवं इलेक्ट्रॉनिक मेल (ईमेल) संरचना',
    recommendedTimeMinutes: 35
  },
  {
    dayNumber: 9,
    chapterId: 5,
    chapterNumber: 5,
    titleHindi: 'पाठ 5 (भाग 1): ऑपरेटिंग सिस्टम एवं विंडोज GUI',
    focusTopics: 'ओएस के कार्य, विंडोज डेस्कटॉप, आइकन्स, टास्कबार एवं माउस संचालन',
    recommendedTimeMinutes: 30
  },
  {
    dayNumber: 10,
    chapterId: 5,
    chapterNumber: 5,
    titleHindi: 'पाठ 5 (भाग 2): कंट्रोल पैनल एवं विंडोज एक्सेसरीज',
    focusTopics: 'फाइल/फोल्डर प्रबंधन, वर्डपैड, पेंट, कैलकुलेटर एवं सिस्टम सेटिंग्स',
    recommendedTimeMinutes: 30
  },
  {
    dayNumber: 11,
    chapterId: 6,
    chapterNumber: 6,
    titleHindi: 'पाठ 6 (भाग 1): वर्ड प्रोसेसिंग (MS Word)',
    focusTopics: 'दस्तावेज निर्माण, टेक्स्ट फॉर्मेटिंग, अलाइनमेंट्स, टेबल्स एवं मेल मर्ज',
    recommendedTimeMinutes: 40
  },
  {
    dayNumber: 12,
    chapterId: 6,
    chapterNumber: 6,
    titleHindi: 'पाठ 6 (भाग 2): स्प्रेडशीट एवं प्रेजेंटेशन (Excel & PPT)',
    focusTopics: 'सेल एड्रेस, एक्सेल सूत्र (=SUM, =AVERAGE), चार्ट्स, स्लाइड शो एवं एनिमेशन',
    recommendedTimeMinutes: 40
  },
  {
    dayNumber: 13,
    chapterId: 7,
    chapterNumber: 7,
    titleHindi: 'पाठ 7: सूचना एवं संचार प्रौद्योगिकी के अनुप्रयोग',
    focusTopics: 'ई-गवर्नेंस के 4 मॉडल (G2C, G2B, G2G, G2E), ई-मित्र, डिजिटल इंडिया व नेट बैंकिंग',
    recommendedTimeMinutes: 35
  },
  {
    dayNumber: 14,
    chapterId: 8,
    chapterNumber: 8,
    titleHindi: 'पाठ 8: बौद्धिक सम्पदा, साइबर सुरक्षा एवं फाइनल टेस्ट',
    focusTopics: 'कॉपीराइट, पेटेंट, ट्रेडमार्क, साहित्यिक चोरी (Plagiarism), आईटी एक्ट 2000 व संपूर्ण मॉक परीक्षा',
    recommendedTimeMinutes: 50,
    isMilestone: true,
    milestoneTitle: 'ग्रैंड फिनाले व प्रमाण-पत्र'
  }
];

export const StudyPlannerWidget: React.FC<StudyPlannerWidgetProps> = ({
  chapters,
  onSelectChapter,
  onOpenQuizModal
}) => {
  // Plan type: 7-day or 14-day
  const [planDuration, setPlanDuration] = useState<'7' | '14'>('7');
  const [startDate, setStartDate] = useState<string>(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [reminderTime, setReminderTime] = useState<string>('18:00');
  const [reminderEnabled, setReminderEnabled] = useState<boolean>(true);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [testNotificationSent, setTestNotificationSent] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Load saved planner settings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pavn_study_planner_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.planDuration) setPlanDuration(parsed.planDuration);
        if (parsed.startDate) setStartDate(parsed.startDate);
        if (parsed.completedDays) setCompletedDays(parsed.completedDays);
        if (parsed.reminderTime) setReminderTime(parsed.reminderTime);
        if (parsed.reminderEnabled !== undefined) setReminderEnabled(parsed.reminderEnabled);
      }
    } catch (e) {
      console.warn('Failed to load study planner config:', e);
    }

    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      const config = {
        planDuration,
        startDate,
        completedDays,
        reminderTime,
        reminderEnabled
      };
      localStorage.setItem('pavn_study_planner_config', JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to save study planner config:', e);
    }
  }, [planDuration, startDate, completedDays, reminderTime, reminderEnabled]);

  // Active schedule based on duration
  const activeSchedule = useMemo(() => {
    return planDuration === '7' ? plan7Days : plan14Days;
  }, [planDuration]);

  // Calculate current day index (1-indexed) based on startDate
  const currentDayInfo = useMemo(() => {
    try {
      const start = new Date(startDate);
      const now = new Date();
      const startZero = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const nowZero = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      const diffMs = nowZero.getTime() - startZero.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      const totalDays = activeSchedule.length;
      
      if (diffDays < 0) {
        return {
          status: 'upcoming',
          dayNumber: 1,
          message: `प्लान ${Math.abs(diffDays)} दिन बाद प्रारंभ होगा`
        };
      } else if (diffDays >= totalDays) {
        return {
          status: 'completed',
          dayNumber: totalDays,
          message: 'निर्धारित समय-सीमा पूर्ण हो चुकी है!'
        };
      } else {
        return {
          status: 'active',
          dayNumber: diffDays + 1,
          message: `आज दिन ${diffDays + 1} / ${totalDays} का लक्ष्य है`
        };
      }
    } catch {
      return { status: 'active', dayNumber: 1, message: 'दिन 1' };
    }
  }, [startDate, activeSchedule]);

  // Today's scheduled item
  const todayTarget = useMemo(() => {
    const dayNum = currentDayInfo.dayNumber;
    return activeSchedule.find(s => s.dayNumber === dayNum) || activeSchedule[0];
  }, [activeSchedule, currentDayInfo]);

  // Toggle completion of a specific day
  const toggleDayCompletion = (dayNum: number) => {
    setCompletedDays(prev => {
      if (prev.includes(dayNum)) {
        return prev.filter(d => d !== dayNum);
      } else {
        return [...prev, dayNum];
      }
    });
  };

  // Reset entire study plan progress
  const handleResetPlan = () => {
    if (window.confirm('क्या आप स्टडी प्लानर की प्रगति रीसेट करना चाहते हैं?')) {
      setCompletedDays([]);
      setStartDate(new Date().toISOString().split('T')[0]);
    }
  };

  // Trigger Notification
  const triggerBrowserNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_8.43.09_AM_7d9a61b3.jpeg',
          badge: '/assets/aistudio/WhatsApp_Image_2026-10-20_at_8.43.09_AM_7d9a61b3.jpeg'
        });
      } catch (err) {
        console.warn('Notification trigger error:', err);
      }
    }
  };

  // Request Notification Permission
  const handleRequestPermission = async () => {
    if (!('Notification' in window)) {
      alert('आपके ब्राउज़र में वेब नोटिफिकेशन सपोर्ट उपलब्ध नहीं है। इन-ऐप रिमाइंडर सक्रिय रहेगा।');
      return;
    }

    try {
      const perm = await Notification.requestPermission();
      setNotificationPermission(perm);
      if (perm === 'granted') {
        triggerBrowserNotification(
          '🔔 स्टडी प्लानर रिमाइंडर सक्रिय!',
          `प्रतिदिन ${reminderTime} बजे आपके अध्ययन लक्ष्य का नोटिफिकेशन प्राप्त होगा।`
        );
        setTestNotificationSent(true);
        setTimeout(() => setTestNotificationSent(false), 3000);
      }
    } catch (e) {
      console.warn('Error requesting notification permission:', e);
    }
  };

  // Send Test Notification
  const handleSendTestNotification = () => {
    if (notificationPermission !== 'granted') {
      handleRequestPermission();
      return;
    }

    triggerBrowserNotification(
      `📖 आज का अध्ययन लक्ष्य (Day ${currentDayInfo.dayNumber}):`,
      `${todayTarget.titleHindi} - ${todayTarget.focusTopics}`
    );
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  // Automated Daily Notification Trigger
  useEffect(() => {
    if (!reminderEnabled) return;

    const checkAndTriggerDailyReminder = () => {
      const todayStr = new Date().toISOString().split('T')[0];
      const lastTriggered = localStorage.getItem('pavn_last_daily_notification_date');
      
      if (lastTriggered === todayStr) return;

      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const [remHours, remMinutes] = reminderTime.split(':').map(Number);

      if (currentHours > remHours || (currentHours === remHours && currentMinutes >= remMinutes)) {
        if ('Notification' in window && Notification.permission === 'granted') {
          triggerBrowserNotification(
            `📖 दैनिक अध्ययन लक्ष्य (Day ${currentDayInfo.dayNumber}):`,
            `${todayTarget.titleHindi} - ${todayTarget.focusTopics}`
          );
        }
        localStorage.setItem('pavn_last_daily_notification_date', todayStr);
      }
    };

    checkAndTriggerDailyReminder();
    const interval = setInterval(checkAndTriggerDailyReminder, 30000);
    return () => clearInterval(interval);
  }, [reminderEnabled, reminderTime, currentDayInfo, todayTarget]);

  // Percentage of days completed
  const completionPercentage = Math.round((completedDays.length / activeSchedule.length) * 100);

  // Jump to chapter
  const handleJumpToChapter = (chapterId: number) => {
    const targetChapter = chapters.find(c => c.id === chapterId);
    if (targetChapter) {
      onSelectChapter(targetChapter);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 mb-8 relative overflow-hidden">
      
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-2.5 border border-amber-400/30">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>स्मार्ट अध्ययन समय-सारणी (Smart Study Planner)</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <span>कक्षा 9 कम्प्यूटर 8-अध्याय स्टडी प्लानर</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            राजस्थान बोर्ड के संपूर्ण 8 अध्यायों को 7 या 14 दिनों की दैनिक समय-सारणी में विभाजित कर पढ़ें एवं प्रतिदिन का अनुस्मारक (Daily Notification) सेट करें।
          </p>
        </div>

        {/* Plan Switcher Pills */}
        <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setPlanDuration('7')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              planDuration === '7'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>7-दिन क्रैश कोर्स</span>
          </button>

          <button
            onClick={() => setPlanDuration('14')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              planDuration === '14'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
            <span>14-दिन संपूर्ण अध्ययन</span>
          </button>
        </div>
      </div>

      {/* Progress & Controls Bar */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 py-5 border-b border-white/10 text-xs">
        {/* Metric 1: Timeline & Start Date */}
        <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>आरंभ दिनांक (Start Date)</span>
          </span>
          <div className="flex items-center justify-between gap-2 mt-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <span className="text-[10px] text-amber-300 font-bold bg-amber-400/10 px-2 py-0.5 rounded">
              कुल {activeSchedule.length} दिन
            </span>
          </div>
        </div>

        {/* Metric 2: Completion Progress */}
        <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>प्लानर प्रगति (Progress)</span>
            </span>
            <span className="text-xs font-black text-emerald-400">
              {completionPercentage}%
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
              <span>{completedDays.length} दिन पूर्ण</span>
              <span>{activeSchedule.length - completedDays.length} दिन शेष</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Daily Notification Settings */}
        <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>दैनिक अनुस्मारक समय</span>
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={(e) => setReminderEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-7 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              disabled={!reminderEnabled}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-white text-xs font-mono disabled:opacity-50 focus:outline-none"
            />
            <button
              onClick={handleSendTestNotification}
              title="टेस्ट नोटिफिकेशन भेजें"
              className="px-2 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/30 text-[10px] font-bold text-blue-300 transition-colors flex items-center gap-1"
            >
              <Bell className="w-3 h-3" />
              <span>{testNotificationSent ? 'भेजा गया!' : 'टेस्ट करें'}</span>
            </button>
          </div>
        </div>

        {/* Metric 4: Notification Permission Status & Action */}
        <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 backdrop-blur-xs flex flex-col justify-between">
          <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
            <BellRing className="w-3.5 h-3.5 text-purple-400" />
            <span>ब्राउज़र नोटिफिकेशन</span>
          </span>
          <div className="mt-2 flex items-center justify-between">
            {notificationPermission === 'granted' ? (
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>सक्रिय (Allowed)</span>
              </div>
            ) : (
              <button
                onClick={handleRequestPermission}
                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] shadow-sm transition-all flex items-center gap-1"
              >
                <span>अनुमति दें (Enable)</span>
              </button>
            )}

            {completedDays.length > 0 && (
              <button
                onClick={handleResetPlan}
                title="प्रगति रीसेट करें"
                className="text-slate-400 hover:text-rose-300 p-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TODAY'S TARGET BANNER (Highlighted Action Card) */}
      <div className="relative z-10 mt-6 bg-gradient-to-r from-blue-600/30 via-indigo-600/40 to-purple-600/30 rounded-2xl p-4 sm:p-5 border border-blue-400/40 backdrop-blur-md shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex flex-col items-center justify-center font-black shrink-0 shadow-md">
              <span className="text-[10px] leading-tight uppercase">DAY</span>
              <span className="text-lg leading-none">{currentDayInfo.dayNumber}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-400/30">
                  {currentDayInfo.message}
                </span>
                <span className="text-xs text-slate-300">
                  अनुमानित समय: ~{todayTarget.recommendedTimeMinutes} मिनट
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-1">
                {todayTarget.titleHindi}
              </h3>
              <p className="text-xs text-slate-300 font-medium mt-0.5 max-w-2xl leading-relaxed">
                🎯 <strong>आज का मुख्य केंद्र:</strong> {todayTarget.focusTopics}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <button
              onClick={() => toggleDayCompletion(todayTarget.dayNumber)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                completedDays.includes(todayTarget.dayNumber)
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
              }`}
            >
              {completedDays.includes(todayTarget.dayNumber) ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>दिन {todayTarget.dayNumber} पूर्ण है</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-slate-400" />
                  <span>पूर्ण चिह्नित करें</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleJumpToChapter(todayTarget.chapterId)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 text-xs font-black shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span>यह पाठ अभी पढ़ें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Day-by-Day Roadmap Grid */}
      <div className="relative z-10 mt-6">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <h4 className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
            <span>दैनिक अध्ययन रोडमैप ({planDuration}-दिन अनुसूची)</span>
            <span className="text-[11px] text-slate-400 font-normal">
              (किसी भी दिन पर क्लिक करके उस पाठ के विस्तृत नोट्स खोलें)
            </span>
          </h4>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
          >
            {isCollapsed ? 'रोडमैप विस्तृत करें (+)' : 'रोडमैप संक्षेप करें (-)'}
          </button>
        </div>

        {!isCollapsed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {activeSchedule.map((item) => {
              const isToday = item.dayNumber === currentDayInfo.dayNumber;
              const isDone = completedDays.includes(item.dayNumber);

              return (
                <div
                  key={item.dayNumber}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isToday
                      ? 'bg-blue-900/40 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                      : isDone
                      ? 'bg-emerald-950/20 border-emerald-500/40 opacity-90'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Day circle toggle */}
                    <button
                      onClick={() => toggleDayCompletion(item.dayNumber)}
                      title={isDone ? 'अपूर्ण करें' : 'पूर्ण चिह्नित करें'}
                      className="mt-0.5 shrink-0"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isToday 
                            ? 'bg-amber-400 text-slate-950 font-black' 
                            : 'bg-white/10 text-slate-300'
                        }`}>
                          दिन {item.dayNumber}
                        </span>

                        {isToday && (
                          <span className="text-[10px] font-black text-amber-300 animate-pulse">
                            • आज का लक्ष्य
                          </span>
                        )}

                        {item.isMilestone && (
                          <span className="text-[9px] font-bold bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded border border-purple-400/30">
                            ★ {item.milestoneTitle}
                          </span>
                        )}

                        <span className="text-[10px] text-slate-400 ml-auto">
                          ~{item.recommendedTimeMinutes} मिनट
                        </span>
                      </div>

                      <h5 
                        onClick={() => handleJumpToChapter(item.chapterId)}
                        className="text-xs font-bold text-white hover:text-amber-300 cursor-pointer truncate transition-colors"
                      >
                        {item.titleHindi}
                      </h5>

                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {item.focusTopics}
                      </p>
                    </div>
                  </div>

                  {/* Open chapter button */}
                  <button
                    onClick={() => handleJumpToChapter(item.chapterId)}
                    className="shrink-0 p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                    title="पाठ के नोट्स खोलें"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
