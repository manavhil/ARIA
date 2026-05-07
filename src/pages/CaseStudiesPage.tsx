import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CTABanner from '../components/CTABanner';

const content = {
  en: {
    hero: {
      label: "Results We've Delivered",
      title: "Results We've\nDelivered.",
      sub: "We don't measure success by deliverables. We measure it by what changes for the client after we're done.",
    },
    pattern: {
      label: 'The Pattern',
      body: "Every engagement starts from the same place: a business performing well but operating below its potential — because the infrastructure holding it together was built for an earlier, smaller version of itself. BlackBox comes in, diagnoses what's actually broken, and builds what's needed.",
    },
    filters: ['All', 'Web', 'Software', 'AI Voice', 'Automation'],
    cases: [
      {
        tag: 'Web Design',
        category: 'Web',
        industry: 'Professional Services',
        problem: '[2 sentences: What was broken or costing them? What was the consequence — lost leads, wasted hours, reputation damage?]',
        built: '[2–3 sentences: What BlackBox delivered and how it addressed the problem. Be specific — what was built, what was integrated, what changed.]',
        outcome: '[Lead metric — e.g. 3× increase in qualified enquiries within 60 days]',
        metric: '3× qualified enquiries',
        quote: '[Client quote — specific, credible, outcome-focused.]',
        author: '[Client Name] · [Role] · [Company]',
      },
      {
        tag: 'Automation',
        category: 'Automation',
        industry: 'Operations',
        problem: '[What was costing them — time, money, clients, reputation?]',
        built: '[What BlackBox delivered and the specific approach taken.]',
        outcome: '[Lead metric — e.g. 18 hours/week recovered through automation]',
        metric: '18 hrs/week recovered',
        quote: '[Client quote — outcome-led, specific.]',
        author: '[Client Name] · [Role] · [Company]',
      },
      {
        tag: 'AI Voice Agent',
        category: 'AI Voice',
        industry: 'High-Volume Inbound',
        problem: '[What was the gap between their operation and their potential?]',
        built: '[What BlackBox built and why it was the right solution.]',
        outcome: '[Lead metric — e.g. AI voice agent handling 70% of inbound calls]',
        metric: '70% calls handled autonomously',
        quote: '[Client quote.]',
        author: '[Client Name] · [Role] · [Company]',
      },
    ],
  },
  ar: {
    hero: {
      label: 'النتائج التي حققناها',
      title: 'النتائج التي\nحققناها.',
      sub: 'لا نقيس النجاح بالتسليمات. نقيسه بما يتغير للعميل بعد انتهائنا.',
    },
    pattern: {
      label: 'النمط',
      body: 'كل مشاركة تبدأ من نفس المكان: عمل يؤدي جيداً لكنه يعمل دون إمكاناته. بلاك بوكس تأتي وتشخص ما هو مكسور فعلاً وتبني ما هو مطلوب.',
    },
    filters: ['الكل', 'الويب', 'البرمجيات', 'الصوت الذكي', 'الأتمتة'],
    cases: [
      {
        tag: 'تصميم ويب', category: 'Web', industry: 'الخدمات المهنية',
        problem: '[جملتان: ما الذي كان مكسوراً؟ ما كانت العواقب؟]',
        built: '[٢-٣ جمل: ما الذي بنته بلاك بوكس وكيف عالج المشكلة.]',
        outcome: '[مقياس رئيسي — مثل ٣ أضعاف في الاستفسارات المؤهلة خلال ٦٠ يوماً]',
        metric: '٣ أضعاف الاستفسارات المؤهلة',
        quote: '[اقتباس العميل — محدد وموثوق وموجه نحو النتائج.]',
        author: '[اسم العميل] · [الدور] · [الشركة]',
      },
      {
        tag: 'أتمتة', category: 'Automation', industry: 'العمليات',
        problem: '[ما الذي كان يكلفهم — وقتاً أو مالاً أو عملاء؟]',
        built: '[ما الذي قدمته بلاك بوكس والنهج المحدد المتبع.]',
        outcome: '[مقياس رئيسي — مثل استرداد ١٨ ساعة أسبوعياً]',
        metric: 'استرداد ١٨ ساعة أسبوعياً',
        quote: '[اقتباس العميل — موجه نحو النتائج، محدد.]',
        author: '[اسم العميل] · [الدور] · [الشركة]',
      },
      {
        tag: 'وكيل صوت ذكي', category: 'AI Voice', industry: 'مكالمات واردة عالية الحجم',
        problem: '[ما الفجوة بين عملياتهم وإمكاناتهم؟]',
        built: '[ما الذي بنته بلاك بوكس ولماذا كان الحل الصحيح.]',
        outcome: '[مقياس رئيسي — مثل وكيل الصوت الذكي يتعامل مع ٧٠٪ من المكالمات]',
        metric: '٧٠٪ من المكالمات تُعالج تلقائياً',
        quote: '[اقتباس العميل.]',
        author: '[اسم العميل] · [الدور] · [الشركة]',
      },
    ],
  },
};

interface CaseStudiesPageProps {
  lang: 'en' | 'ar';
}

export default function CaseStudiesPage({ lang }: CaseStudiesPageProps) {
  const t = content[lang];
  const [active, setActive] = useState(t.filters[0]);

  const filtered = active === t.filters[0]
    ? t.cases
    : t.cases.filter((c) => {
        const map: Record<string, string> = { Web: 'Web', Automation: 'Automation', 'AI Voice': 'AI Voice', الويب: 'Web', الأتمتة: 'Automation', 'الصوت الذكي': 'AI Voice', البرمجيات: 'Software' };
        return c.category === (map[active] ?? active);
      });

  return (
    <div className="bg-black text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="pt-40 pb-20 max-w-7xl mx-auto px-6">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em] block mb-4">
          {t.hero.label}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter whitespace-pre-line mb-6">
          {t.hero.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-neutral-400 text-lg max-w-xl">
          {t.hero.sub}
        </motion.p>
      </section>

      {/* Pattern block */}
      <section className="border-t border-white/5 py-12 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-2xl p-8 border border-white/5 rounded-2xl">
            <p className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-3">{t.pattern.label}</p>
            <p className="text-neutral-400 leading-relaxed text-sm">{t.pattern.body}</p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Cards */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          <div className="flex gap-2 flex-wrap mb-12">
            {t.filters.map((f) => (
              <button key={f} onClick={() => setActive(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest border transition-colors ${active === f ? 'border-orange-500 text-orange-500 bg-orange-500/10' : 'border-white/10 text-neutral-500 hover:border-white/30 hover:text-neutral-300'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Cards */}
          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-6">
              {filtered.map((c, i) => (
                <motion.article key={`${c.category}-${i}`}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/20 transition-colors bg-zinc-950/50">
                  {/* Meta bar */}
                  <div className="flex items-center gap-3 px-8 py-4 border-b border-white/5">
                    <span className="px-3 py-0.5 border border-orange-500/30 text-orange-500 text-xs font-mono uppercase tracking-widest rounded-full">
                      {c.tag}
                    </span>
                    <span className="text-neutral-600 text-xs">{c.industry}</span>
                  </div>

                  {/* Content */}
                  <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <p className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-2">
                        {lang === 'en' ? 'The Problem' : 'المشكلة'}
                      </p>
                      <p className="text-neutral-400 text-sm leading-relaxed">{c.problem}</p>
                    </div>
                    <div>
                      <p className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-2">
                        {lang === 'en' ? 'What We Built' : 'ما بنيناه'}
                      </p>
                      <p className="text-neutral-400 text-sm leading-relaxed">{c.built}</p>
                    </div>
                    <div>
                      <p className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-2">
                        {lang === 'en' ? 'The Outcome' : 'النتيجة'}
                      </p>
                      <p className="text-white font-bold text-2xl mb-1">{c.metric}</p>
                      <p className="text-neutral-500 text-xs">{c.outcome}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="px-8 pb-8">
                    <div className="border-l-2 border-orange-500/40 pl-5">
                      <p className="text-neutral-400 text-sm italic leading-relaxed">"{c.quote}"</p>
                      <p className="text-neutral-600 text-xs mt-2">— {c.author}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </section>

      <CTABanner lang={lang}
        title={lang === 'en' ? 'Your Business Could Be the Next One on This Page.' : 'قد يكون عملك التالي على هذه الصفحة.'}
        subtitle={lang === 'en' ? "If you see your situation in any of the problems described above — let's have the conversation." : 'إذا رأيت وضعك في أي من المشاكل الموصوفة أعلاه — فلنتحدث.'}
        ctaLabel={lang === 'en' ? 'Book a Strategy Session' : 'احجز جلسة استراتيجية'} />
    </div>
  );
}
