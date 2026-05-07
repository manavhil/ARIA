'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Mic, MicOff, PhoneOff } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { SplineScene } from './ui/splite';


const WORKER = 'https://bold-fog-9867.yahyak5619.workers.dev/';

type CallStatus = 'idle' | 'picking' | 'connecting' | 'active' | 'error';

const LANGUAGES = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'ar', flag: '🇸🇦', label: 'العربية' },
  { code: 'sv', flag: '🇸🇪', label: 'Svenska' },
];

interface HeroSectionProps { lang: 'en' | 'ar'; }

const content = {
  en: {
    eyebrow: 'AI Voice Agent',
    headline1: 'Never Miss a Call.',
    headline2: 'Close Every Lead.',
    sub: 'ARIA answers inbound calls and follows up with leads 24/7. No extra hires needed.',
    cta1: 'Book a Call',
    cta2: 'Hear ARIA',
    trust: 'Live in 7 days · No long-term contract',
    hint: '↓ Click the robot to start',
  },
  ar: {
    eyebrow: 'وكيل صوتي بالذكاء الاصطناعي',
    headline1: 'لا تفوّت أي مكالمة.',
    headline2: 'أغلق كل صفقة.',
    sub: 'أريا تجيب على المكالمات الواردة وتتابع العملاء على مدار الساعة، بدون موظفين إضافيين.',
    cta1: 'احجز مكالمة',
    cta2: 'استمع لأريا',
    trust: 'مباشر في 7 أيام · بدون عقود طويلة',
    hint: '↓ انقر على الروبوت للبدء',
  },
};

export default function HeroSection({ lang }: HeroSectionProps) {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const clientRef = useRef<RetellWebClient | null>(null);
  const t = content[lang];

  const isActive = callStatus === 'active';

  function handleRobotClick() {
    if (callStatus === 'idle' || callStatus === 'error') setCallStatus('picking');
  }

  async function startCall(langCode: string) {
    setCallStatus('connecting');
    try {
      const res = await fetch(`${WORKER}?lang=${langCode}`, { method: 'POST' });
      if (!res.ok) throw new Error('Worker error');
      const data = await res.json();

      const client = new RetellWebClient();
      clientRef.current = client;
      client.on('call_started', () => setCallStatus('active'));
      client.on('call_ended', () => { setCallStatus('idle'); clientRef.current = null; setIsMuted(false); });
      client.on('error', () => { setCallStatus('error'); });
      await client.startCall({ accessToken: data.access_token });
    } catch {
      setCallStatus('error');
    }
  }

  function endCall() {
    clientRef.current?.stopCall();
    clientRef.current = null;
    setCallStatus('idle');
    setIsMuted(false);
  }

  function toggleMute() {
    if (!clientRef.current) return;
    isMuted ? clientRef.current.unmute() : clientRef.current.mute();
    setIsMuted(!isMuted);
  }

  const slideStartX = lang === 'ar' ? 50 : -50;

  return (
    <section className="relative min-h-[75vh] flex items-center bg-black">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, x: slideStartX }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={lang === 'ar' ? 'text-right order-2 lg:order-1' : 'order-2 lg:order-1'}
        >
          <div className="mt-20 mb-3">
            <span className={`inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-[10px] uppercase tracking-[0.2em] text-orange-400 shadow-[0_0_16px_4px_rgba(234,88,12,0.3),0_0_40px_8px_rgba(234,88,12,0.12)] ${lang === 'ar' ? 'font-arabic' : 'font-mono'}`}>
              {t.eyebrow}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="text-white">{t.headline1}</span><br />
            <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              {t.headline2}
            </span>
          </h1>

          <p className={`text-neutral-400 text-base md:text-lg leading-relaxed mb-8 max-w-md ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {t.sub}
          </p>

          <div className={`flex flex-wrap gap-3 mb-6 ${lang === 'ar' ? 'justify-end' : ''}`}>
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 transition-all duration-300 group-hover:from-orange-500 group-hover:to-amber-400" />
              <span className="relative">{t.cta1}</span>
              <ArrowRight className={`relative w-4 h-4 ${lang === 'ar' ? 'rotate-180' : ''}`} />
            </Link>

            <button
              onClick={() => callStatus === 'idle' && setCallStatus('picking')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white border border-white/15 hover:border-orange-500/40 hover:bg-orange-500/5 hover:text-orange-300 transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              {t.cta2}
            </button>
          </div>

          <p className={`text-xs text-neutral-600 ${lang === 'ar' ? 'font-arabic' : 'font-mono'}`}>
            {t.trust}
          </p>
        </motion.div>

        {/* Right — Free Floating Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="relative order-1 lg:order-2 flex flex-col items-center lg:mt-4 w-full"
        >
          {/* Main 3D Wrapper */}
          <div
            className="relative w-full h-[400px] lg:h-[500px] cursor-pointer [&_a]:!hidden flex items-center justify-center"
            onClick={handleRobotClick}
          >
            {/* UPDATED SPLINE URL HERE */}
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full scale-[1.2] lg:scale-[1.3] transform-gpu origin-center"
            />

            {/* HINT TEXT (Moved up via -top-8 so it doesn't overlap the head) */}
            <motion.p
              animate={{ opacity: callStatus === 'idle' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute -top-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none text-[11px] uppercase tracking-widest text-orange-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] whitespace-nowrap ${lang === 'ar' ? 'font-arabic font-medium' : 'font-mono'}`}
            >
              {t.hint}
            </motion.p>

            {/* THREE LINES WAVEFORM (Next to the robot's head) */}
            <AnimatePresence>
              {(callStatus === 'connecting' || isActive) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute z-40 flex items-center justify-center gap-[4px] pointer-events-none"
                  style={{ top: '25%', left: '62%' }} 
                >
                  {[1, 2, 3].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-[4px] rounded-full"
                      style={{ background: isActive ? 'linear-gradient(to top, #ea580c, #fbbf24)' : '#7c2d12' }}
                      animate={isActive ? { height: [6, 16 + (i % 2) * 8, 6] } : { height: 6 }}
                      transition={{ duration: 0.4 + i * 0.1, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* FLOATING LANGUAGE PICKER */}
            <AnimatePresence>
              {callStatus === 'picking' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }}
                  animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                  exit={{ opacity: 0, scale: 0.95, y: '-45%', x: '-50%' }}
                  className="absolute top-1/2 left-1/2 z-40 flex flex-col items-center justify-center gap-4 bg-black/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <p className="text-white font-semibold text-lg mb-1">Choose Language</p>
                  {LANGUAGES.map((l, i) => (
                    <motion.button
                      key={l.code}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => startCall(l.code)}
                      className="flex items-center gap-3 px-8 py-3 rounded-full text-white font-medium text-sm w-48 justify-center transition-all hover:scale-105 active:scale-95 border border-white/10 bg-white/5 hover:bg-orange-500/20 hover:border-orange-500/50"
                    >
                      <span className="text-xl">{l.flag}</span> {l.label}
                    </motion.button>
                  ))}
                  <button onClick={() => setCallStatus('idle')} className="mt-2 text-neutral-400 text-xs hover:text-white">Cancel</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FLOATING MIC + CONTROLS */}
            <AnimatePresence>
              {(callStatus === 'connecting' || isActive || callStatus === 'error') && (
                <motion.div
                  initial={{ opacity: 0, y: 20, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, x: '-50%' }}
                  exit={{ opacity: 0, y: 20, x: '-50%' }}
                  className="absolute left-1/2 bottom-0 z-30 flex flex-col items-center gap-3 bg-black/40 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/10 shadow-2xl"
                  onClick={e => e.stopPropagation()}
                >
                  <motion.div
                    animate={isActive ? { boxShadow: ['0 0 0 0 rgba(234,88,12,0.4)', '0 0 0 12px rgba(234,88,12,0)'] } : {}}
                    transition={{ duration: 1.3, repeat: Infinity }}
                    className={`flex items-center justify-center w-12 h-12 rounded-full mx-auto border-2 ${isActive ? 'bg-gradient-to-br from-orange-600 to-orange-500 border-orange-400/50' : 'bg-black/60 border-orange-500/30'}`}
                  >
                    {callStatus === 'connecting'
                      ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 rounded-full border-2 border-orange-400 border-t-transparent" />
                      : callStatus === 'error'
                      ? <span className="text-red-400 text-xl font-bold">!</span>
                      : <Mic className="w-5 h-5 text-white" />}
                  </motion.div>

                  <p className={`text-xs font-semibold whitespace-nowrap ${callStatus === 'error' ? 'text-red-400' : isActive ? 'text-orange-300' : 'text-neutral-300'}`}>
                    {callStatus === 'connecting' && 'Connecting...'}
                    {isActive && 'Listening...'}
                    {callStatus === 'error' && 'Failed — tap to retry'}
                  </p>

                  {(isActive || callStatus === 'connecting') && (
                    <div className="flex gap-3 mt-1">
                      {isActive && (
                        <button
                          onClick={toggleMute}
                          className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all hover:scale-105 ${isMuted ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/5 border-white/15 text-neutral-400'}`}
                        >
                          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>
                      )}
                      <button
                        onClick={endCall}
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-red-500/40 text-red-400 hover:bg-red-500/20 bg-black/40 transition-all hover:scale-105"
                      >
                        <PhoneOff className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
}