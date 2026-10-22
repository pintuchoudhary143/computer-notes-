import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseWebSpeechOptions {
  defaultRate?: number;
  defaultPitch?: number;
}

export interface WebSpeechState {
  isSupported: boolean;
  isSpeaking: boolean;
  isPaused: boolean;
  currentTitle: string;
  activeLanguage: 'hi' | 'en';
  rate: number;
  progress: number;
  availableVoices: SpeechSynthesisVoice[];
  speak: (text: string, title?: string, preferredLang?: 'hi' | 'en') => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setRate: (rate: number) => void;
  togglePlayPause: () => void;
}

export function useWebSpeech(options: UseWebSpeechOptions = {}): WebSpeechState {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const [activeLanguage, setActiveLanguage] = useState<'hi' | 'en'>('hi');
  const [rate, setRateState] = useState(options.defaultRate || 1.0);
  const [progress, setProgress] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Queue references
  const chunksRef = useRef<string[]>([]);
  const currentIndexRef = useRef<number>(0);
  const activeLangRef = useRef<'hi' | 'en'>('hi');
  const rateRef = useRef<number>(options.defaultRate || 1.0);
  const isCancelledRef = useRef<boolean>(false);

  // Keep rateRef synced
  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  // Check support and load voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);

      const updateVoices = () => {
        try {
          const voiceList = window.speechSynthesis.getVoices();
          if (voiceList && voiceList.length > 0) {
            setVoices(voiceList);
          }
        } catch (e) {
          console.warn('SpeechSynthesis getVoices error:', e);
        }
      };

      updateVoices();

      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }

      return () => {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      };
    } else {
      setIsSupported(false);
    }
  }, []);

  // Split text into natural sentence chunks for rock-solid reliability across all browsers
  const splitIntoChunks = (rawText: string): string[] => {
    // Clean markup, excessive whitespace, bullet symbols
    const clean = rawText
      .replace(/[•●❖★✓*#_`~|]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!clean) return [];

    // Split by sentence delimiters: Hindi purna-viram (।), period, question mark, exclamation, or semicolon
    const sentences = clean.split(/(?<=[।?!.;\n])\s+/);
    const chunks: string[] = [];

    let currentChunk = '';

    for (const sentence of sentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;

      if ((currentChunk + ' ' + trimmed).length < 160) {
        currentChunk = currentChunk ? `${currentChunk} ${trimmed}` : trimmed;
      } else {
        if (currentChunk) chunks.push(currentChunk);
        // If single sentence is very long, split by comma or clause
        if (trimmed.length > 180) {
          const subClauses = trimmed.split(/(?<=[,:-])\s+/);
          for (const clause of subClauses) {
            if (clause.trim()) chunks.push(clause.trim());
          }
          currentChunk = '';
        } else {
          currentChunk = trimmed;
        }
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks.length > 0 ? chunks : [clean];
  };

  // Find best matching voice
  const getBestVoice = (langCode: 'hi' | 'en'): SpeechSynthesisVoice | null => {
    if (!voices || voices.length === 0) return null;

    if (langCode === 'hi') {
      // 1. Exact Hindi match
      const hiVoice = voices.find(v => 
        v.lang === 'hi-IN' || 
        v.lang.toLowerCase().startsWith('hi') ||
        v.name.toLowerCase().includes('hindi')
      );
      if (hiVoice) return hiVoice;

      // 2. Fallback to Indian English (has great Hindi phonetics)
      const enInVoice = voices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india'));
      if (enInVoice) return enInVoice;
    } else {
      // 1. Indian English or US English
      const enVoice = voices.find(v => 
        v.lang === 'en-IN' || 
        v.lang === 'en-US' || 
        v.lang.toLowerCase().startsWith('en')
      );
      if (enVoice) return enVoice;
    }

    return voices[0] || null;
  };

  // Play next chunk in queue
  const playNextChunk = useCallback(() => {
    if (isCancelledRef.current) return;
    if (currentIndexRef.current >= chunksRef.current.length) {
      setIsSpeaking(false);
      setIsPaused(false);
      setProgress(100);
      return;
    }

    const currentText = chunksRef.current[currentIndexRef.current];
    const utterance = new SpeechSynthesisUtterance(currentText);

    const langCode = activeLangRef.current;
    utterance.lang = langCode === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = rateRef.current;
    utterance.pitch = 1.0;

    const voice = getBestVoice(langCode);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      if (!isCancelledRef.current) {
        setIsSpeaking(true);
        setIsPaused(false);
        const total = chunksRef.current.length;
        const current = currentIndexRef.current + 1;
        setProgress(Math.round((current / total) * 100));
      }
    };

    utterance.onend = () => {
      if (!isCancelledRef.current) {
        currentIndexRef.current += 1;
        playNextChunk();
      }
    };

    utterance.onerror = (e) => {
      // If user canceled, ignore error
      if (e.error === 'canceled' || e.error === 'interrupted') return;
      console.warn('Speech utterance error:', e);
      if (!isCancelledRef.current) {
        currentIndexRef.current += 1;
        playNextChunk();
      }
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Speech speak failed:', err);
      setIsSpeaking(false);
    }
  }, [voices]);

  const speak = useCallback((text: string, title?: string, preferredLang?: 'hi' | 'en') => {
    if (!('speechSynthesis' in window)) return;

    // Detect language: if not explicitly specified, check for Devanagari characters
    let detectedLang: 'hi' | 'en' = preferredLang || 'hi';
    if (!preferredLang) {
      const hasHindi = /[\u0900-\u097F]/.test(text);
      detectedLang = hasHindi ? 'hi' : 'en';
    }

    // Cancel any running speech
    isCancelledRef.current = true;
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}

    // Prepare new queue
    const chunks = splitIntoChunks(text);
    if (chunks.length === 0) return;

    chunksRef.current = chunks;
    currentIndexRef.current = 0;
    activeLangRef.current = detectedLang;
    isCancelledRef.current = false;

    setActiveLanguage(detectedLang);
    setCurrentTitle(title || (detectedLang === 'hi' ? 'अध्याय नोट्स' : 'Chapter Notes'));
    setIsSpeaking(true);
    setIsPaused(false);
    setProgress(0);

    // Short timeout to let cancellation flush in Chrome
    setTimeout(() => {
      playNextChunk();
    }, 50);
  }, [playNextChunk]);

  const pause = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } catch (e) {}
  }, []);

  const resume = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } catch (e) {}
  }, []);

  const stop = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    isCancelledRef.current = true;
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentTitle('');
    setProgress(0);
    currentIndexRef.current = 0;
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPaused) {
      resume();
    } else if (isSpeaking) {
      pause();
    }
  }, [isPaused, isSpeaking, pause, resume]);

  const setRate = useCallback((newRate: number) => {
    setRateState(newRate);
    rateRef.current = newRate;
  }, []);

  return {
    isSupported,
    isSpeaking,
    isPaused,
    currentTitle,
    activeLanguage,
    rate,
    progress,
    availableVoices: voices,
    speak,
    pause,
    resume,
    stop,
    setRate,
    togglePlayPause
  };
}
