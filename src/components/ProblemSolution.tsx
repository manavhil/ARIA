import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

const content = {
  en: {
    problemLabel: 'The Problem',
    problemHeadline: 'Your Business Is Losing Revenue to Unanswered Calls. Every Day.',
    problemBody: '62% of calls to businesses go unanswered or to voicemail. Every missed call is a potential client — worth hundreds, sometimes thousands, in revenue. Most of those callers don\'t leave a message. They call the next business on Google. ARIA makes sure that never happens to yours.',
    solutionLabel: 'The Solution',
    solutionHeadline: 'ARIA Answers. Books. Follows Up. Automatically.',
    solutionBody: 'ARIA\'s AI voice agent handles both sides of the conversation. Inbound: every call answered immediately, with a professional voice that books appointments directly into your schedule. Outbound: ARIA proactively follows up with enquiries that didn\'t book, calls back no-shows, and re-engages lapsed clients — automatically, around the clock.',
  },
  ar: {
    problemLabel: 'المشكلة',
    problemHeadline: 'عملك يخسر إيرادات بسبب المكالمات غير المُجابة. كل يوم.',
    problemBody: '62% من المكالمات تذهب دون إجابة أو إلى البريد الصوتي. كل مكالمة فائتة هي عميل محتمل يساوي مئات أو آلاف الريالات. معظمهم لا يتركون رسالة — يتصلون بالمنافس التالي. أريا تضمن أن هذا لن يحدث لعملك.',
    solutionLabel: 'الحل',
    solutionHeadline: 'أريا تُجيب. تحجز. تتابع. تلقائياً.',
    solutionBody: 'وكيل أريا الصوتي يتعامل مع كلا جانبي المحادثة. الواردة: كل مكالمة تُجاب فوراً بصوت احترافي يحجز المواعيد مباشرة. الصادرة: أريا تتابع الاستفسارات التي لم تُحجز، وتعيد الاتصال بالغائبين، وتُعيد تفعيل العملاء القدامى — تلقائياً، على مدار الساعة.',
  },
};

export default function ProblemSolution({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const t = content[lang];
  return (
    <section className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Problem */}
        <motion.div
          key={`${lang}-problem`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={lang === 'ar' ? 'text-right' : ''}
        >
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-4 h-4 text-red-500/70" />
            <span className="text-xs font-mono uppercase tracking-widest text-red-400/70">{t.problemLabel}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-5">{t.problemHeadline}</h2>
          <p className="text-neutral-400 leading-relaxed">{t.problemBody}</p>
        </motion.div>

        {/* Solution */}
        <motion.div
          key={`${lang}-solution`}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`relative pl-0 lg:pl-10 lg:border-l border-white/8 ${lang === 'ar' ? 'text-right lg:pl-0 lg:pr-10 lg:border-l-0 lg:border-r border-white/8' : ''}`}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400">{t.solutionLabel}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-5">{t.solutionHeadline}</h2>
          <p className="text-neutral-400 leading-relaxed">{t.solutionBody}</p>
        </motion.div>
      </div>
    </section>
  );
}
