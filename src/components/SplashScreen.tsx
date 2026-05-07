import { motion } from 'motion/react';
import { SparklesCore } from './ui/sparkles';

export default function SplashScreen() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden font-sans relative">
      {/* Full-screen sparkles */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="splash-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#fb923c"
          speed={1.2}
        />
      </div>

      {/* Warm ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(234,88,12,0.25),transparent)] z-10" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 z-10" />

      {/* Half globe — desktop */}
      <div className="absolute z-10 hidden md:block" style={{
        bottom: '-62vw',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '160vw',
        height: '80vw',
        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
        background: 'radial-gradient(ellipse at 50% 0%, #1a0a00 0%, #080300 60%, #000 100%)',
        boxShadow: '0 -1px 0 rgba(251,146,60,0.6), 0 -2px 20px rgba(251,146,60,0.25), 0 -6px 40px rgba(251,146,60,0.1)',
      }} />

      {/* Half globe — mobile */}
      <div className="absolute z-10 md:hidden" style={{
        bottom: '-62vh',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300vw',
        height: '100vh',
        borderRadius: '50% 50% 0 0 / 100% 100% 0 0',
        background: 'radial-gradient(ellipse at 50% 0%, #1a0a00 0%, #080300 60%, #000 100%)',
        boxShadow: '0 -1px 0 rgba(251,146,60,0.6), 0 -2px 20px rgba(251,146,60,0.25), 0 -6px 40px rgba(251,146,60,0.1)',
      }} />

      {/* Content */}
      <main className="relative z-20 flex flex-col items-center px-6 text-center -translate-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-b from-orange-200 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            ARIA
          </h1>

          {/* Glow line */}
          <div className="relative w-48 h-px">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-neutral-400 font-mono text-[10px] uppercase tracking-[0.5em] mt-4"
        >
          Speak Less. Do More.
        </motion.p>
      </main>
    </div>
  );
}
