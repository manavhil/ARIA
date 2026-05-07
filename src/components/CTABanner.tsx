import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CTABannerProps {
  lang?: 'en' | 'ar';
  headline?: string;
  subline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  note?: string;
}

const defaults = {
  en: {
    headline: 'Your Business. Always Available. Always Professional.',
    subline: 'Book a free 30-minute discovery call. We\'ll show you exactly what ARIA sounds like for your specific business — and what it would mean for your call volume and revenue.',
    ctaLabel: 'Book Your Free Discovery Call',
    ctaHref: '/contact',
    note: 'No commitment. No setup required. Just a conversation.',
  },
  ar: {
    headline: 'عملك. متاح دائماً. احترافي دائماً.',
    subline: 'احجز مكالمة اكتشاف مجانية لمدة 30 دقيقة. سنريك بالضبط كيف يبدو صوت أريا لعملك — وماذا يعني ذلك لحجم مكالماتك وإيراداتك.',
    ctaLabel: 'احجز مكالمة الاكتشاف المجانية',
    ctaHref: '/contact',
    note: 'بدون التزام. بدون إعداد مسبق. مجرد محادثة.',
  },
};

export default function CTABanner({ lang = 'en', headline, subline, ctaLabel, ctaHref, note }: CTABannerProps) {
  const d = defaults[lang];
  const h = headline ?? d.headline;
  const s = subline ?? d.subline;
  const l = ctaLabel ?? d.ctaLabel;
  const href = ctaHref ?? d.ctaHref;
  const n = note ?? d.note;

  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* orange glow */}
        <div className="relative inline-block w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-orange-600/15 blur-3xl rounded-full pointer-events-none" />
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">{h}</h2>
            <p className="text-neutral-400 text-base leading-relaxed mb-8">{s}</p>

            <Link
              to={href}
              className="relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm overflow-hidden group shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 group-hover:from-orange-500 group-hover:to-amber-400 transition-all duration-300" />
              <span className="relative">{l}</span>
              <ArrowRight className="relative w-4 h-4" />
            </Link>

            {n && <p className="mt-5 text-xs text-neutral-600 font-mono">{n}</p>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
