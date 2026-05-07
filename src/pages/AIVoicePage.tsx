import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Phone, UserCheck, Calendar, HelpCircle, Moon, Check } from 'lucide-react';
import CTABanner from '../components/CTABanner';

const content = {
  en: {
    hero: {
      label: 'AI Voice Agents',
      title: 'Your Business,\nAlways Answering.',
      sub: 'An intelligent voice agent that handles calls, qualifies leads, and books appointments — at any hour, without exception.',
      cta: 'Deploy Your Voice Agent in 7 Days',
    },
    explainer: {
      label: 'What Is an AI Voice Agent?',
      title: 'Not a phone menu.\nAn intelligent representative.',
      body: [
        "An AI voice agent is a trained phone representative powered by artificial intelligence. When a client or prospect calls your number, the agent answers — with a professional voice, a coherent conversation, and the knowledge to handle the interaction from start to finish.",
        "It's not a phone menu. It doesn't say 'press 1 for sales.' It listens, understands, responds intelligently, and takes action — whether that's answering a question, booking a meeting, or qualifying a lead.",
        "Unlike a human representative, it's available 24 hours a day, handles unlimited simultaneous calls, and delivers a consistent, on-brand experience every single time.",
      ],
    },
    useCases: {
      label: 'Use Cases',
      title: 'What Your Agent Handles',
      items: [
        { icon: Phone, title: 'Inbound Call Handling', body: 'Greet every caller professionally. Understand their reason for calling. Route, resolve, or escalate — instantly and intelligently.' },
        { icon: UserCheck, title: 'Lead Qualification', body: 'Walk every inbound lead through a structured qualification flow. Score them. Log the result to your CRM. Pass only the right prospects to your team.' },
        { icon: Calendar, title: 'Appointment Booking', body: 'Access your calendar in real time. Book meetings, confirm availability, and send follow-ups — without a human coordinating a single step.' },
        { icon: HelpCircle, title: 'FAQ & Enquiry Handling', body: 'Handle your 20 most common client questions automatically — pricing, services, timelines, policies — with precision and brand consistency.' },
        { icon: Moon, title: 'After-Hours Coverage', body: "Every call answered. Every lead captured. Whether it's 9am on a Tuesday or 2am on a Sunday." },
      ],
    },
    howItWorks: {
      label: 'How It Works',
      title: '3 Steps to Live',
      steps: [
        { num: '01', period: 'Days 1–3', title: 'Deploy', body: 'We build your voice agent from the ground up — custom voice, brand tone, call architecture, and connection to your existing phone number. Ready in days, not weeks.' },
        { num: '02', period: 'Days 3–6', title: 'Train', body: 'We load your agent with your business knowledge: your services, pricing, policies, FAQs, and how you want objections handled. It learns to represent your brand — not sound like a generic bot.' },
        { num: '03', period: 'Day 7', title: 'Go Live', body: 'Your agent goes live. Full call transcripts. AI-generated summaries after every call. CRM sync. Analytics dashboard. You have complete visibility into every conversation.' },
      ],
    },
    features: {
      label: 'Features',
      title: 'Everything Included',
      items: [
        '24/7 availability — no downtime, no sick days, no missed calls',
        'CRM integration — HubSpot, Salesforce, GoHighLevel, and others',
        'Multi-language support — serve international clients in their language',
        'Custom voice and brand personality — sounds like your business',
        'Full call transcription and AI-generated summaries after every call',
        'Intelligent escalation — seamless handoff to a human when needed',
        'Simultaneous call handling — unlimited volume, zero wait times',
        'Analytics dashboard — call volume, outcomes, lead conversion rates',
        'Ongoing optimisation and retraining as your business evolves',
      ],
    },
    testimonials: [
      { quote: 'We went from missing roughly 30% of after-hours calls to zero missed calls overnight. The agent booked 11 new appointments in the first week alone.', name: '[Client Name]', role: '[Role] · [Company]' },
      { quote: 'The quality of lead that reaches our sales team now is completely different. The agent pre-qualifies everything. We\'re only speaking to people who are genuinely ready.', name: '[Client Name]', role: '[Role] · [Company]' },
    ],
    cta: { title: 'Stop Losing Calls. Start Capturing Every Opportunity.', note: 'Limited onboarding slots per month.' },
  },
  ar: {
    hero: {
      label: 'وكلاء الصوت بالذكاء الاصطناعي',
      title: 'عملك،\nيرد دائماً.',
      sub: 'وكيل صوتي ذكي يتعامل مع المكالمات ويؤهل العملاء المحتملين ويحجز المواعيد — في أي وقت، دون استثناء.',
      cta: 'انشر وكيلك الصوتي في ٧ أيام',
    },
    explainer: {
      label: 'ما هو وكيل الصوت الذكي؟',
      title: 'ليس قائمة هاتفية.\nممثل ذكي.',
      body: [
        'وكيل الصوت الذكي هو ممثل هاتفي مدرّب مدعوم بالذكاء الاصطناعي. عندما يتصل عميل أو عميل محتمل برقمك، يرد الوكيل — بصوت احترافي ومحادثة متماسكة ومعرفة للتعامل مع التفاعل من البداية إلى النهاية.',
        "إنه ليس قائمة هاتفية. لا يقول 'اضغط ١ للمبيعات'. يستمع ويفهم ويستجيب بذكاء ويتخذ إجراءً.",
        'على عكس الممثل البشري، يتوفر ٢٤ ساعة يومياً ويتعامل مع مكالمات متزامنة غير محدودة.',
      ],
    },
    useCases: {
      label: 'حالات الاستخدام',
      title: 'ما يتعامل معه وكيلك',
      items: [
        { icon: Phone, title: 'التعامل مع المكالمات الواردة', body: 'استقبل كل متصل باحترافية. افهم سبب مكالمته. وجّه أو اعرض حلاً أو صعّد — بشكل فوري وذكي.' },
        { icon: UserCheck, title: 'تأهيل العملاء المحتملين', body: 'أخذ كل عميل محتمل وارد عبر تدفق تأهيل منظم. قيّمهم. سجّل النتيجة في CRM. مرّر العملاء المناسبين فقط لفريقك.' },
        { icon: Calendar, title: 'حجز المواعيد', body: 'الوصول إلى تقويمك في الوقت الفعلي. احجز الاجتماعات وأكّد التوافر وأرسل المتابعات — دون أن ينسّق إنسان خطوة واحدة.' },
        { icon: HelpCircle, title: 'التعامل مع الأسئلة الشائعة', body: 'تعامل تلقائياً مع أكثر ٢٠ سؤالاً شائعاً لعملائك — الأسعار والخدمات والجداول الزمنية والسياسات.' },
        { icon: Moon, title: 'التغطية خارج ساعات العمل', body: 'كل مكالمة مُجابة. كل عميل محتمل مُلتقط. سواء كانت الساعة ٩ صباحاً الثلاثاء أو ٢ صباحاً الأحد.' },
      ],
    },
    howItWorks: {
      label: 'كيف يعمل',
      title: '٣ خطوات للإطلاق',
      steps: [
        { num: '٠١', period: 'الأيام ١-٣', title: 'النشر', body: 'نبني وكيلك الصوتي من الصفر — صوت مخصص ونبرة العلامة التجارية وهندسة المكالمات والتوصيل برقمك الهاتفي الحالي. جاهز في أيام وليس أسابيع.' },
        { num: '٠٢', period: 'الأيام ٣-٦', title: 'التدريب', body: 'نحمّل وكيلك بمعرفة عملك: خدماتك وأسعارك وسياساتك والأسئلة الشائعة وكيف تريد التعامل مع الاعتراضات.' },
        { num: '٠٣', period: 'اليوم ٧', title: 'الإطلاق', body: 'وكيلك يعمل. نسخ كاملة للمكالمات. ملخصات مولّدة بالذكاء الاصطناعي بعد كل مكالمة. مزامنة CRM. لوحة تحليلات.' },
      ],
    },
    features: {
      label: 'المميزات',
      title: 'كل شيء مضمّن',
      items: [
        'متاح ٢٤/٧ — لا توقف ولا أيام مرضى ولا مكالمات فائتة',
        'تكامل CRM — HubSpot و Salesforce و GoHighLevel وغيرها',
        'دعم متعدد اللغات',
        'صوت مخصص وشخصية علامة تجارية',
        'نسخ كامل للمكالمات وملخصات مولّدة بالذكاء الاصطناعي',
        'تصعيد ذكي — تسليم سلس لإنسان عند الحاجة',
        'التعامل مع مكالمات متزامنة — حجم غير محدود',
        'لوحة تحليلات — حجم المكالمات والنتائج ومعدلات التحويل',
        'تحسين وإعادة تدريب مستمرة',
      ],
    },
    testimonials: [
      { quote: 'انتقلنا من فقدان حوالي ٣٠٪ من المكالمات خارج ساعات العمل إلى صفر مكالمات فائتة بين عشية وضحاها. حجز الوكيل ١١ موعداً جديداً في الأسبوع الأول وحده.', name: '[اسم العميل]', role: '[الدور] · [الشركة]' },
      { quote: 'جودة العميل المحتمل الذي يصل إلى فريق مبيعاتنا الآن مختلفة تماماً. الوكيل يؤهل كل شيء مسبقاً. نحن نتحدث فقط مع أناس مستعدين فعلاً.', name: '[اسم العميل]', role: '[الدور] · [الشركة]' },
    ],
    cta: { title: 'توقف عن خسارة المكالمات. ابدأ في التقاط كل فرصة.', note: 'مقاعد تهيئة محدودة شهرياً.' },
  },
};

interface AIVoicePageProps {
  lang: 'en' | 'ar';
}

export default function AIVoicePage({ lang }: AIVoicePageProps) {
  const t = content[lang];

  return (
    <div className="bg-black text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="pt-40 pb-24 max-w-7xl mx-auto px-6">
        <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em] block mb-4">
          {t.hero.label}
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter whitespace-pre-line mb-6">
          {t.hero.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-neutral-400 text-lg max-w-xl mb-10">
          {t.hero.sub}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-black font-bold rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-500/20">
            {t.hero.cta}
          </Link>
        </motion.div>
      </section>

      {/* Explainer */}
      <section className="border-t border-white/5 py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em] block mb-4">
              {t.explainer.label}
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tighter whitespace-pre-line">
              {t.explainer.title}
            </motion.h2>
          </div>
          <div className="flex flex-col gap-5">
            {t.explainer.body.map((p, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-neutral-400 leading-relaxed">
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-t border-white/5 py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em] block mb-4">
              {t.useCases.label}
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tighter">
              {t.useCases.title}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.useCases.items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="p-6 border border-white/5 rounded-2xl hover:border-orange-500/25 hover:bg-orange-500/5 transition-colors group">
                  <div className="w-10 h-10 border border-orange-500/30 rounded-xl flex items-center justify-center text-orange-500 mb-4 group-hover:border-orange-500/60 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-white/5 py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em] block mb-4">
              {t.howItWorks.label}
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tighter">
              {t.howItWorks.title}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {t.howItWorks.steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="bg-zinc-950 p-10 text-center hover:bg-black transition-colors">
                <div className="w-14 h-14 border border-orange-500/30 rounded-full flex items-center justify-center text-orange-500 font-mono font-bold text-sm mx-auto mb-5">
                  {step.num}
                </div>
                <p className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-2">{step.period}</p>
                <h3 className="text-white font-bold text-xl mb-3 tracking-tight">{step.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/5 py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em] block mb-4">
              {t.features.label}
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tighter">
              {t.features.title}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {t.features.items.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex gap-3 items-start p-4 border border-white/5 rounded-xl hover:border-orange-500/20 transition-colors">
                <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-neutral-400 text-sm">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-white/5 py-24 bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.testimonials.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              className="p-8 border border-white/5 rounded-2xl bg-black/40 hover:border-orange-500/20 transition-colors">
              <span className="text-orange-500 text-4xl font-serif opacity-40 block mb-3">"</span>
              <p className="text-neutral-300 text-base leading-relaxed italic mb-6">{item.quote}</p>
              <div className="border-t border-white/5 pt-4">
                <p className="text-white font-semibold text-sm">{item.name}</p>
                <p className="text-neutral-600 text-xs mt-0.5">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTABanner lang={lang} title={t.cta.title} note={t.cta.note}
        ctaLabel={lang === 'en' ? 'Deploy Your Voice Agent — Book a Call' : 'انشر وكيلك الصوتي — احجز مكالمة'} />
    </div>
  );
}
