import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  Gauge, 
  Sparkles,
  X,
  Languages
} from 'lucide-react';
import { WebSpeechState } from '../hooks/useWebSpeech';

interface SpeechPlayerBarProps {
  speech: WebSpeechState;
}

export const SpeechPlayerBar: React.FC<SpeechPlayerBarProps> = ({ speech }) => {
  const { 
    isSpeaking, 
    isPaused, 
    currentTitle, 
    activeLanguage, 
    rate, 
    progress,
    pause, 
    resume, 
    stop, 
    setRate 
  } = speech;

  if (!isSpeaking && !isPaused) return null;

  const speedOptions = [0.8, 1.0, 1.25, 1.5];

  const handleCycleSpeed = () => {
    const currentIndex = speedOptions.indexOf(rate);
    const nextIndex = (currentIndex + 1) % speedOptions.length;
    setRate(speedOptions[nextIndex]);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-xl animate-in fade-in slide-in-from-bottom-5 duration-300 print:hidden">
      <div className="bg-[#030919]/95 text-white backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-2xl border-2 border-amber-400/50 flex flex-col gap-2">
        
        {/* Top line: Status, Title, Language Badge, Close */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden flex-1">
            {/* Animated Soundwave */}
            <div className="flex items-end gap-0.5 h-4 shrink-0 px-1">
              <span className={`w-1 bg-amber-400 rounded-full transition-all duration-200 ${!isPaused ? 'h-3 animate-pulse' : 'h-1.5'}`} />
              <span className={`w-1 bg-amber-300 rounded-full transition-all duration-300 ${!isPaused ? 'h-4 animate-bounce' : 'h-2'}`} />
              <span className={`w-1 bg-yellow-200 rounded-full transition-all duration-200 ${!isPaused ? 'h-2.5 animate-pulse' : 'h-1'}`} />
            </div>

            <div className="truncate">
              <span className="text-[10px] text-amber-300 font-bold tracking-wider uppercase block leading-none">
                {isPaused ? '⏸️ वाचन रुका हुआ है (Paused)' : '🎧 बोलकर सुनाया जा रहा है (Reading Aloud)'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                {currentTitle || 'अध्याय नोट्स'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Language Badge */}
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-slate-200 flex items-center gap-1">
              <Languages className="w-3 h-3 text-amber-300" />
              <span>{activeLanguage === 'hi' ? '🇮🇳 हिंदी' : '🇬🇧 English'}</span>
            </span>

            {/* Close / Stop */}
            <button
              onClick={stop}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="वाचन बंद करें (Stop)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-400 to-amber-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between gap-3 pt-0.5">
          <span className="text-[10px] text-slate-400 font-mono">
            {progress}% पूर्ण
          </span>

          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            {isPaused ? (
              <button
                onClick={resume}
                className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1 shadow-md transition-all active:scale-95"
                title="जारी रखें (Resume)"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>जारी रखें</span>
              </button>
            ) : (
              <button
                onClick={pause}
                className="px-3 py-1 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold flex items-center gap-1 border border-white/20 transition-all active:scale-95"
                title="रोकें (Pause)"
              >
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>रोकें</span>
              </button>
            )}

            {/* Stop Button */}
            <button
              onClick={stop}
              className="px-2.5 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1 border border-rose-400/30 transition-all active:scale-95"
              title="समाप्त करें (Stop)"
            >
              <Square className="w-3 h-3 fill-current" />
              <span className="hidden sm:inline">स्टॉप</span>
            </button>

            {/* Speed Toggle */}
            <button
              onClick={handleCycleSpeed}
              className="px-2 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 text-[11px] font-mono font-bold flex items-center gap-1 border border-white/15 transition-all"
              title="बोलने की गति बदलें (Speech Rate)"
            >
              <Gauge className="w-3 h-3" />
              <span>{rate}x</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
