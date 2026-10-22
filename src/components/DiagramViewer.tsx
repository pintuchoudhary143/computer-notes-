import React, { useState } from 'react';
import { Diagram } from '../types/study';
import { 
  Cpu, 
  Database, 
  Share2, 
  Radio, 
  ShieldCheck, 
  Globe, 
  HardDrive,
  Info
} from 'lucide-react';

interface DiagramViewerProps {
  diagram: Diagram;
}

export const DiagramViewer: React.FC<DiagramViewerProps> = ({ diagram }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const renderDiagramContent = () => {
    switch (diagram.type) {
      case 'block-diagram':
        return (
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                कम्प्यूटर ब्लॉक रेखाचित्र (Block Diagram of Computer System)
              </span>
            </div>

            <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative">
              {/* Input Unit */}
              <div className="w-full md:w-36 bg-amber-50 border-2 border-amber-400 rounded-xl p-4 text-center shadow-xs">
                <span className="text-xs font-bold text-amber-800 uppercase block mb-1">आगम इकाई</span>
                <span className="text-sm font-extrabold text-slate-900 block">इनपुट यूनिट</span>
                <span className="text-[11px] text-slate-600 block mt-1">(की-बोर्ड, माउस, स्कैनर)</span>
              </div>

              {/* Arrow to CPU */}
              <div className="hidden md:flex flex-col items-center">
                <span className="text-[11px] font-bold text-blue-600 mb-0.5">डेटा / निर्देश</span>
                <div className="w-10 h-0.5 bg-blue-600 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 border-solid border-l-blue-600 border-l-8 border-y-transparent border-y-4 border-r-0" />
                </div>
              </div>

              {/* Central Processing Unit (CPU) */}
              <div className="w-full md:w-80 bg-blue-900 text-white rounded-2xl p-5 border-2 border-blue-700 shadow-md relative">
                <div className="text-center pb-2 mb-3 border-b border-blue-700 flex items-center justify-center gap-1.5">
                  <Cpu className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-blue-200">
                    केन्द्रीय संसाधन इकाई (CPU - कम्प्यूटर का दिमाग)
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Control Unit */}
                  <div className="bg-blue-800/80 border border-blue-600 rounded-lg p-2.5 text-center">
                    <span className="text-xs font-bold text-amber-300 block">कंट्रोल यूनिट (Control Unit - CU)</span>
                    <span className="text-[11px] text-blue-200 block">समस्त क्रियाओं का नियंत्रण व संचालन (तंत्रिका तंत्र)</span>
                  </div>

                  {/* ALU */}
                  <div className="bg-blue-800/80 border border-blue-600 rounded-lg p-2.5 text-center">
                    <span className="text-xs font-bold text-emerald-300 block">अंकगणितीय व तार्किक इकाई (ALU)</span>
                    <span className="text-[11px] text-blue-200 block">अंकगणितीय गणना (+, -, *, /) व तार्किक तुलना (&gt;, &lt;, =)</span>
                  </div>

                  {/* Internal Memory */}
                  <div className="bg-blue-800/80 border border-blue-600 rounded-lg p-2.5 text-center">
                    <span className="text-xs font-bold text-purple-300 block">मुख्य मेमोरी (Main Memory)</span>
                    <span className="text-[11px] text-blue-200 block">RAM (अस्थाई) एवं ROM (स्थाई - BIOS)</span>
                  </div>
                </div>

                {/* Secondary Storage connection */}
                <div className="mt-4 pt-3 border-t border-blue-700 flex items-center justify-center gap-2">
                  <div className="w-full bg-slate-800 rounded-lg p-2 text-center border border-slate-600">
                    <span className="text-xs font-semibold text-slate-300 flex items-center justify-center gap-1">
                      <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                      द्वितीयक संग्रहण (Secondary Storage)
                    </span>
                    <span className="text-[10px] text-slate-400 block">हार्ड डिस्क, फ्लैश ड्राइव, ऑप्टिकल डिस्क</span>
                  </div>
                </div>
              </div>

              {/* Arrow from CPU to Output */}
              <div className="hidden md:flex flex-col items-center">
                <span className="text-[11px] font-bold text-emerald-600 mb-0.5">परिणाम / सूचना</span>
                <div className="w-10 h-0.5 bg-emerald-600 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 border-solid border-l-emerald-600 border-l-8 border-y-transparent border-y-4 border-r-0" />
                </div>
              </div>

              {/* Output Unit */}
              <div className="w-full md:w-36 bg-emerald-50 border-2 border-emerald-400 rounded-xl p-4 text-center shadow-xs">
                <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">निर्गम इकाई</span>
                <span className="text-sm font-extrabold text-slate-900 block">आउटपुट यूनिट</span>
                <span className="text-[11px] text-slate-600 block mt-1">(मॉनिटर, प्रिंटर, प्लॉटर, स्पीकर)</span>
              </div>
            </div>

            <div className="mt-5 text-center text-xs text-slate-500 bg-white p-2.5 rounded-lg border border-slate-200">
              💡 <strong>सिस्टम बस (System Bus):</strong> सीपीयू, मेमोरी और इनपुट/आउटपुट युक्तियों के बीच सिग्नलों के संचरण हेतु तारों का समूह होती है (Control Bus, Data Bus, Address Bus)।
            </div>
          </div>
        );

      case 'network-topology':
        return (
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
            <div className="text-center">
              <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
                5 प्रमुख नेटवर्क टोपोलॉजी (Network Topologies)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Bus Topology */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900">1. बस टोपोलॉजी (Bus)</h4>
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-semibold px-1.5 py-0.5 rounded">साझा केबल</span>
                </div>
                {/* SVG Schematic */}
                <div className="bg-slate-50 rounded-lg p-3 h-28 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 200 80">
                    {/* Main bus line */}
                    <line x1="20" y1="40" x2="180" y2="40" stroke="#2563eb" strokeWidth="4" />
                    {/* Terminators */}
                    <rect x="15" y="32" width="6" height="16" fill="#dc2626" rx="1" />
                    <rect x="179" y="32" width="6" height="16" fill="#dc2626" rx="1" />
                    {/* Drop lines & Nodes */}
                    <line x1="50" y1="40" x2="50" y2="18" stroke="#64748b" strokeWidth="2" />
                    <circle cx="50" cy="14" r="8" fill="#3b82f6" />
                    <line x1="100" y1="40" x2="100" y2="62" stroke="#64748b" strokeWidth="2" />
                    <circle cx="100" cy="66" r="8" fill="#3b82f6" />
                    <line x1="150" y1="40" x2="150" y2="18" stroke="#64748b" strokeWidth="2" />
                    <circle cx="150" cy="14" r="8" fill="#3b82f6" />
                  </svg>
                </div>
                <p className="text-[11px] text-slate-600 mt-2">
                  एक ही केंद्रीय केबल से सभी नोड्स जुड़े होते हैं। सिरों पर टर्मिनेटर लगे होते हैं।
                </p>
              </div>

              {/* Ring Topology */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900">2. रिंग टोपोलॉजी (Ring)</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 font-semibold px-1.5 py-0.5 rounded">वृत्ताकार वलय</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 h-28 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 200 80">
                    <circle cx="100" cy="40" r="28" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="4 2" />
                    <circle cx="100" cy="12" r="7" fill="#059669" />
                    <circle cx="128" cy="40" r="7" fill="#059669" />
                    <circle cx="100" cy="68" r="7" fill="#059669" />
                    <circle cx="72" cy="40" r="7" fill="#059669" />
                  </svg>
                </div>
                <p className="text-[11px] text-slate-600 mt-2">
                  प्रत्येक नोड अपने निकटवर्ती 2 नोड्स से जुड़कर चक्र बनाता है। डेटा एक दिशा में संचरित होता है।
                </p>
              </div>

              {/* Star Topology */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900">3. स्टार टोपोलॉजी (Star)</h4>
                  <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded">केंद्रीय हब</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 h-28 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 200 80">
                    {/* Central Hub */}
                    <rect x="88" y="28" width="24" height="24" rx="4" fill="#f59e0b" />
                    {/* Radial lines */}
                    <line x1="100" y1="28" x2="100" y2="10" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="100" y1="52" x2="100" y2="70" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="88" y1="40" x2="55" y2="40" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="112" y1="40" x2="145" y2="40" stroke="#94a3b8" strokeWidth="2" />
                    {/* Nodes */}
                    <circle cx="100" cy="10" r="7" fill="#3b82f6" />
                    <circle cx="100" cy="70" r="7" fill="#3b82f6" />
                    <circle cx="55" cy="40" r="7" fill="#3b82f6" />
                    <circle cx="145" cy="40" r="7" fill="#3b82f6" />
                  </svg>
                </div>
                <p className="text-[11px] text-slate-600 mt-2">
                  सर्वाधिक लोकप्रिय; सभी कंप्यूटर केंद्रीय हब/स्विच से सीधे अलग केबल से जुड़े होते हैं।
                </p>
              </div>

              {/* Tree Topology */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900">4. ट्री टोपोलॉजी (Tree)</h4>
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-1.5 py-0.5 rounded">सोपानवत</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 h-28 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 200 80">
                    {/* Root */}
                    <rect x="90" y="8" width="20" height="14" rx="3" fill="#4f46e5" />
                    {/* Branches */}
                    <line x1="100" y1="22" x2="60" y2="42" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="100" y1="22" x2="140" y2="42" stroke="#94a3b8" strokeWidth="2" />
                    {/* Intermediate */}
                    <rect x="50" y="42" width="20" height="14" rx="3" fill="#6366f1" />
                    <rect x="130" y="42" width="20" height="14" rx="3" fill="#6366f1" />
                    {/* Leaves */}
                    <circle cx="40" cy="70" r="5" fill="#38bdf8" />
                    <circle cx="80" cy="70" r="5" fill="#38bdf8" />
                    <circle cx="120" cy="70" r="5" fill="#38bdf8" />
                    <circle cx="160" cy="70" r="5" fill="#38bdf8" />
                    <line x1="60" y1="56" x2="40" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="60" y1="56" x2="80" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="140" y1="56" x2="120" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="140" y1="56" x2="160" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="text-[11px] text-slate-600 mt-2">
                  पदानुक्रमित (Hierarchical) संरचना जिसमें शीर्ष पर रूट नोड (Root Node) व शाखाएँ होती हैं।
                </p>
              </div>

              {/* Mesh Topology */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900">5. मेश / जाल टोपोलॉजी (Mesh)</h4>
                  <span className="text-[10px] bg-rose-100 text-rose-800 font-semibold px-1.5 py-0.5 rounded">बहु-मार्गी</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 h-28 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 200 80">
                    {/* Pentagon nodes connected to every other */}
                    <line x1="100" y1="12" x2="140" y2="35" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="100" y1="12" x2="125" y2="68" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="100" y1="12" x2="75" y2="68" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="100" y1="12" x2="60" y2="35" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="140" y1="35" x2="125" y2="68" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="140" y1="35" x2="75" y2="68" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="140" y1="35" x2="60" y2="35" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="125" y1="68" x2="75" y2="68" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="125" y1="68" x2="60" y2="35" stroke="#f43f5e" strokeWidth="1.5" />
                    <line x1="75" y1="68" x2="60" y2="35" stroke="#f43f5e" strokeWidth="1.5" />
                    {/* Nodes */}
                    <circle cx="100" cy="12" r="6" fill="#be123c" />
                    <circle cx="140" cy="35" r="6" fill="#be123c" />
                    <circle cx="125" cy="68" r="6" fill="#be123c" />
                    <circle cx="75" cy="68" r="6" fill="#be123c" />
                    <circle cx="60" cy="35" r="6" fill="#be123c" />
                  </svg>
                </div>
                <p className="text-[11px] text-slate-600 mt-2">
                  प्रत्येक नोड अन्य सभी नोड्स से सीधे जुड़ा होता है। उच्चतम विश्वसनीयता किंतु अत्यधिक खर्चीला।
                </p>
              </div>
            </div>
          </div>
        );

      case 'memory-units':
        return (
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="text-center mb-4">
              <span className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1 rounded-full uppercase tracking-wider">
                कम्प्यूटर मेमोरी सोपान एवं इकाइयाँ (Memory Hierarchy)
              </span>
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              {[
                { name: '1 बिट (Bit)', detail: '0 या 1 (बाइनरी अंक - सबसे छोटी इकाई)', color: 'bg-teal-50 border-teal-300' },
                { name: '1 निब्बल (Nibble)', detail: '4 बिट्स का समूह (आधा बाइट)', color: 'bg-emerald-50 border-emerald-300' },
                { name: '1 बाइट (Byte)', detail: '8 बिट्स का समूह = 1 कैरेक्टर (अंक/अक्षर)', color: 'bg-blue-50 border-blue-300' },
                { name: '1 किलोबाइट (KB)', detail: '1024 बाइट्स', color: 'bg-indigo-50 border-indigo-300' },
                { name: '1 मेगाबाइट (MB)', detail: '1024 KB = 1024 × 1024 बाइट्स', color: 'bg-purple-50 border-purple-300' },
                { name: '1 गीगाबाइट (GB)', detail: '1024 MB = 1024 × 1024 × 1024 बाइट्स', color: 'bg-amber-50 border-amber-300' },
                { name: '1 टेराबाइट (TB)', detail: '1024 GB = 1024 × 1024 × 1024 × 1024 बाइट्स', color: 'bg-rose-50 border-rose-300' }
              ].map((item, idx) => (
                <div key={idx} className={`p-3 rounded-xl border flex items-center justify-between shadow-2xs ${item.color}`}>
                  <span className="text-xs font-extrabold text-slate-900">{item.name}</span>
                  <span className="text-xs font-medium text-slate-700">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cables':
        return (
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="text-center mb-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">
                ऑप्टिकल फाइबर केबल (OFC) व पूर्ण आंतरिक परावर्तन (TIR)
              </span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <svg className="w-full h-36" viewBox="0 0 400 120">
                {/* Cladding Top */}
                <rect x="30" y="20" width="340" height="20" fill="#93c5fd" />
                <text x="200" y="34" textAnchor="middle" fill="#1e3a8a" fontSize="10" fontWeight="bold">क्लैडिंग (Cladding - निम्न अपवर्तनांक n2)</text>

                {/* Core Center */}
                <rect x="30" y="40" width="340" height="40" fill="#dbeafe" />
                <text x="200" y="64" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="extrabold">कोर (Glass Core - उच्च अपवर्तनांक n1)</text>

                {/* Cladding Bottom */}
                <rect x="30" y="80" width="340" height="20" fill="#93c5fd" />
                <text x="200" y="94" textAnchor="middle" fill="#1e3a8a" fontSize="10" fontWeight="bold">क्लैडिंग (Cladding - निम्न अपवर्तनांक n2)</text>

                {/* Laser Light Ray bouncing (TIR) */}
                <path 
                  d="M 30,60 L 90,42 L 150,78 L 210,42 L 270,78 L 330,42 L 370,60" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600 px-4">
                <span>🔴 <strong>प्रकाश किरण:</strong> पूर्ण आंतरिक परावर्तन द्वारा बिना ऊर्जा ह्रास के गमन</span>
                <span className="font-semibold text-blue-700">गति: 100 MB/s से 2 GB/s</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-600">
            {diagram.description}
          </div>
        );
    }
  };

  return (
    <div className="my-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <span>{diagram.title}</span>
        </h3>
        <span className="text-xs text-slate-500 font-medium">
          {diagram.caption}
        </span>
      </div>

      {renderDiagramContent()}

      <p className="text-xs text-slate-600 mt-2 italic px-1">
        📌 <strong>विवरण:</strong> {diagram.description}
      </p>
    </div>
  );
};
