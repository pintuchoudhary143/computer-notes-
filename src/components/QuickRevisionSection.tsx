import React, { useState } from 'react';
import { 
  fullFormsList, 
  shortcutsList, 
  timelineEvents, 
  indianIPRActs 
} from '../data/quickRevisionData';
import { 
  Zap, 
  Search, 
  Command, 
  Calendar, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Award,
  Filter
} from 'lucide-react';

export const QuickRevisionSection: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'fullforms' | 'shortcuts' | 'generations' | 'ipr' | 'timeline'>('fullforms');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Filter full forms
  const filteredFullForms = fullFormsList.filter(item => {
    const matchesSearch = item.abbr.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.fullForm.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.hindiMeaning.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  // Filter shortcuts
  const filteredShortcuts = shortcutsList.filter(s => 
    s.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.context.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Revision Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
            <Zap className="w-5 h-5 text-amber-200" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
            क्विक रिवीज़न व स्मरण तालिका (Fast Memorization Revision Bank)
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          महत्वपूर्ण फुल फॉर्म्स, शॉर्टकट, पीढ़ियाँ व परीक्षा सूत्र
        </h1>
        <p className="text-xs sm:text-sm text-amber-100 max-w-2xl leading-relaxed">
          परीक्षा से पूर्व 10 मिनट में संपूर्ण पुस्तक के संक्षिप्ताक्षर, शॉर्टकट कीज, कंप्यूटर पीढ़ियों का अंतर, भारतीय IPR अधिनियम और ऐतिहासिक तिथियों का त्वरित रिवीजन करें।
        </p>

        {/* Sub-tab selection */}
        <div className="flex items-center gap-1.5 mt-6 pt-4 border-t border-white/20 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('fullforms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'fullforms'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-black/20 text-white hover:bg-black/30'
            }`}
          >
            फुल फॉर्म्स ({fullFormsList.length})
          </button>
          <button
            onClick={() => setActiveSubTab('shortcuts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'shortcuts'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-black/20 text-white hover:bg-black/30'
            }`}
          >
            शॉर्टकट कुंजियाँ ({shortcutsList.length})
          </button>
          <button
            onClick={() => setActiveSubTab('generations')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'generations'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-black/20 text-white hover:bg-black/30'
            }`}
          >
            5 कम्प्यूटर पीढ़ियाँ
          </button>
          <button
            onClick={() => setActiveSubTab('ipr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'ipr'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-black/20 text-white hover:bg-black/30'
            }`}
          >
            भारत के 8 IPR अधिनियम
          </button>
          <button
            onClick={() => setActiveSubTab('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
              activeSubTab === 'timeline'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-black/20 text-white hover:bg-black/30'
            }`}
          >
            ऐतिहासिक घटनाक्रम (Timeline)
          </button>
        </div>
      </div>

      {/* 1. Full Forms Master Section */}
      {activeSubTab === 'fullforms' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                सम्पूर्ण पुस्तक के महत्वपूर्ण संक्षिप्ताक्षर (Full Forms Master Glossary)
              </h2>
              <p className="text-xs text-slate-500">
                बोर्ड परीक्षा में 1-1 अंक के पूछे जाने वाले सभी संक्षिप्त नाम
              </p>
            </div>

            {/* Search within fullforms */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="खोजें (जैसे CPU, RAM, WWW)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs">
            <span className="text-slate-400 text-xs mr-1 font-medium">श्रेणी:</span>
            {['All', 'Hardware', 'Memory', 'Networking', 'Internet', 'Software', 'Legal', 'General'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                  <th className="p-3 w-28">संक्षिप्त रूप</th>
                  <th className="p-3">अंग्रेजी पूर्ण रूप (Full Form)</th>
                  <th className="p-3">हिन्दी अर्थ एवं कार्य</th>
                  <th className="p-3 w-24">श्रेणी</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredFullForms.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="p-3 font-extrabold text-blue-700">
                      {item.abbr}
                    </td>
                    <td className="p-3 font-semibold text-slate-900">
                      {item.fullForm}
                    </td>
                    <td className="p-3 text-slate-700">
                      {item.hindiMeaning}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {item.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Shortcuts Section */}
      {activeSubTab === 'shortcuts' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              महत्वपूर्ण कीबोर्ड शॉर्टकट कुंजियाँ (Keyboard Shortcuts Sheet)
            </h2>
            <p className="text-xs text-slate-500">
              माइक्रोसॉफ्ट विण्डोज, एमएस वर्ड एवं पावरप्वाइंट की त्वरित कुंजियाँ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredShortcuts.map((s, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between hover:bg-slate-100 transition-colors"
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block">{s.action}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{s.context}</span>
                </div>
                <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-mono font-bold text-blue-700 shadow-2xs">
                  {s.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Generations Matrix */}
      {activeSubTab === 'generations' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              कम्प्यूटर की 5 पीढ़ियों का तुलनात्मक अध्ययन (Five Generations Comparison)
            </h2>
            <p className="text-xs text-slate-500">
              इलेक्ट्रॉनिक घटक, मेमोरी, प्रोग्रामिंग भाषा व उदाहरणों की मास्टर तालिका
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                  <th className="p-3">पीढ़ी व समयावधि</th>
                  <th className="p-3">मुख्य इलेक्ट्रॉनिक घटक</th>
                  <th className="p-3">प्राथमिक मेमोरी</th>
                  <th className="p-3">प्रोग्रामिंग भाषा</th>
                  <th className="p-3">प्रमुख कम्प्यूटर उदाहरण</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-blue-900">प्रथम पीढ़ी (1942 - 1955)</td>
                  <td className="p-3 font-semibold text-slate-800">वैक्यूम ट्यूब (Vacuum Tube)</td>
                  <td className="p-3 text-slate-600">चुंबकीय ड्रम, पंच कार्ड</td>
                  <td className="p-3 text-slate-600">मशीनी भाषा (Machine Language), असेम्बली</td>
                  <td className="p-3 font-medium text-slate-800">ENIAC, EDVAC, UNIVAC-1</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-blue-900">द्वितीय पीढ़ी (1955 - 1964)</td>
                  <td className="p-3 font-semibold text-slate-800">ट्रांजिस्टर (Transistor - 1947 बेल लैब्स)</td>
                  <td className="p-3 text-slate-600">चुंबकीय कोर, चुंबकीय टेप/डिस्क</td>
                  <td className="p-3 text-slate-600">प्रारंभिक उच्च स्तरीय भाषाएँ (FORTRAN, COBOL)</td>
                  <td className="p-3 font-medium text-slate-800">IBM 70, IBM 1600, CDC 3600</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-blue-900">तृतीय पीढ़ी (1964 - 1975)</td>
                  <td className="p-3 font-semibold text-slate-800">एकीकृत परिपथ IC (Integrated Circuits)</td>
                  <td className="p-3 text-slate-600">अर्धचालक (Semiconductor) मेमोरी चिप</td>
                  <td className="p-3 text-slate-600">उच्च स्तरीय भाषाएँ (HLL - BASIC, PASCAL)</td>
                  <td className="p-3 font-medium text-slate-800">IBM 360, ICL 1900, VAX 750</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-blue-900">चतुर्थ पीढ़ी (1975 - 1989)</td>
                  <td className="p-3 font-semibold text-slate-800">VLSI एवं माइक्रोप्रोसेसर (Intel 4004)</td>
                  <td className="p-3 text-slate-600">अर्धचालक चिप (विशाल RAM व ROM)</td>
                  <td className="p-3 text-slate-600">C, C++, डेटाबेस भाषाएँ, 4GL</td>
                  <td className="p-3 font-medium text-slate-800">IBM PC, Apple Macintosh, 8086/80286 PC</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-blue-900">पंचम पीढ़ी (1989 - वर्तमान)</td>
                  <td className="p-3 font-semibold text-slate-800">ULSI एवं कृत्रिम बुद्धिमत्ता (AI)</td>
                  <td className="p-3 text-slate-600">ऑप्टिकल डिस्क, सॉलिड स्टेट SSD, क्लाउड</td>
                  <td className="p-3 text-slate-600">प्राकृतिक भाषा (Natural Language), पायथन, जावा</td>
                  <td className="p-3 font-medium text-slate-800">परम (PARAM Padam), आधुनिक लैपटॉप, रोबोटिक्स</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. IPR Section */}
      {activeSubTab === 'ipr' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              भारत में बौद्धिक संपदा अधिकार (IPR) के 8 प्रमुख अधिनियम
            </h2>
            <p className="text-xs text-slate-500">
              पाठ 8 के अंतर्गत TRIPS व WIPO (1967) के अनुरूप भारतीय संसद द्वारा पारित कानून
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {indianIPRActs.map(act => (
              <div key={act.no} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {act.no}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">
                    {act.hindi}
                  </h4>
                </div>
                <p className="text-[11px] font-mono text-slate-500 mb-1.5 pl-7">
                  {act.act}
                </p>
                <p className="text-xs text-slate-700 pl-7">
                  📌 <strong>संरक्षण क्षेत्र:</strong> {act.scope}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            ⚖️ <strong>विशेष:</strong> इनके अतिरिक्त <em>ट्रेड सीक्रेट (Trade Secrets)</em> एवं <em>संविदा कानून (Contract Act)</em> भी बौद्धिक संपदा को कानूनी संरक्षण प्रदान करते हैं।
          </div>
        </div>
      )}

      {/* 5. Timeline Section */}
      {activeSubTab === 'timeline' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              कम्प्यूटर व इंटरनेट इतिहास का महत्वपूर्ण कालक्रम (Historical Timeline)
            </h2>
            <p className="text-xs text-slate-500">
              परीक्षा में पूछे जाने वाले प्रमुख वर्ष व ऐतिहासिक आविष्कार
            </p>
          </div>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
            {timelineEvents.map((event, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs" />
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 hover:bg-blue-50/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                      वर्ष {event.year}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">
                      {event.event}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600">
                    {event.significance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
