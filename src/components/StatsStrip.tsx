import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = {
  en: [
    { numeric: 100, suffix: '%', label: 'of Calls Answered' },
    { numeric: 7, suffix: ' Days', label: 'To Go Live' },
    { numeric: null, display: 'Zero', label: 'Additional Hires' },
    { numeric: 24, suffix: '/7', label: 'Coverage' },
  ],
  ar: [
    { numeric: 100, suffix: '%', label: 'من المكالمات مُجابة' },
    { numeric: 7, suffix: ' أيام', label: 'للبدء الفعلي' },
    { numeric: null, display: 'صفر', label: 'موظفين إضافيين' },
    { numeric: 24, suffix: '/7', label: 'تغطية مستمرة' },
  ],
};

type Stat = {
  numeric: number | null;
  suffix?: string;
  display?: string;
  label: string;
};

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsStrip({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const items: Stat[] = stats[lang];
  return (
    <section className="border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
          {items.map((s, i) => (
            <motion.div
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center px-6 py-2"
            >
              <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-300 to-amber-400 bg-clip-text text-transparent">
                {s.numeric !== null ? (
                  <CountUp target={s.numeric} suffix={s.suffix ?? ''} />
                ) : (
                  s.display
                )}
              </span>
              <span className="text-xs text-neutral-500 mt-1 uppercase tracking-wider font-mono">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
