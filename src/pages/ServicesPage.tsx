'use client';

import { useRef, useState, type MouseEvent } from 'react';
import { motion, Variants } from 'framer-motion';
import { Mic2, MessageSquare, Smartphone, Wrench, CheckCircle, ArrowRight } from 'lucide-react';
import { SmokeBackground } from '../components/ui/spooky-smoke-animation';
import ShaderBackground from '../components/ui/shader-background';
import { Link } from 'react-router-dom';


/* ── Content ─────────────────────────────────────────────────── */
const content = {
  en: {
    heroEyebrow: 'Services',
    heroHeadline: 'Everything Your Business Needs.',
    heroSub: 'From AI voice agents to full-stack applications — every service is built, deployed, and managed for you.',
    services: [
      {
        icon: Mic2,
        number: '01',
        tag: 'Inbound & Outbound',
        title: 'AI Voice Bots',
        desc: 'ARIA answers every call instantly with a professional, natural-sounding voice — 24/7. On the outbound side it follows up leads, recovers no-shows, and re-engages lapsed clients without your team dialling a single number.',
        features: ['24/7 inbound call handling', 'Outbound lead follow-up', 'No-show recovery calls', 'Live calendar booking', 'Human escalation logic'],
        color: 'from-orange-500/20 to-amber-500/10',
        glow: 'rgba(234,88,12,0.5)',
        accent: '#f97316',
      },
      {
        icon: MessageSquare,
        number: '02',
        tag: 'Web · WhatsApp · SMS',
        title: 'AI Chat Bots',
        desc: 'Intelligent chat agents that handle customer enquiries, qualify leads, and book appointments across your website, WhatsApp, and SMS — all in real time, around the clock.',
        features: ['Website live-chat integration', 'WhatsApp Business automation', 'SMS conversation flows', 'Lead qualification & CRM sync', 'Multilingual support'],
        color: 'from-amber-500/20 to-orange-400/10',
        glow: 'rgba(245,158,11,0.5)',
        accent: '#f59e0b',
      },
      {
        icon: Smartphone,
        number: '03',
        tag: 'Web · iOS · Android',
        title: 'Mobile & Web Apps',
        desc: 'Custom web applications and mobile apps built end-to-end — from design and development to launch and ongoing support. Scalable, fast, and built to solve your specific business problems.',
        features: ['Custom web application development', 'iOS & Android mobile apps', 'UI/UX design & prototyping', 'API integrations & backend', 'Ongoing maintenance & updates'],
        color: 'from-teal-500/20 to-cyan-400/10',
        glow: 'rgba(20,184,166,0.45)',
        accent: '#14b8a6',
      },
      {
        icon: Wrench,
        number: '04',
        tag: 'Automation · Integrations · Infrastructure',
        title: 'Everything Technical',
        desc: 'Workflow automation, CRM setups, third-party integrations, data pipelines, cloud infrastructure — if it is technical and your business needs it, we build it.',
        features: ['CRM setup & automation', 'Zapier / Make workflow builds', 'Third-party API integrations', 'Data pipelines & dashboards', 'Cloud infrastructure & DevOps'],
        color: 'from-sky-500/20 to-blue-400/10',
        glow: 'rgba(56,189,248,0.45)',
        accent: '#38bdf8',
      },
    ],
  },
  ar: {
    heroEyebrow: 'الخدمات',
    heroHeadline: 'كل ما يحتاجه عملك.',
    heroSub: 'من وكلاء الصوت الذكية إلى التطبيقات المتكاملة — كل خدمة تُبنى وتُنشر وتُدار نيابةً عنك.',
    services: [
      {
        icon: Mic2,
        number: '01',
        tag: 'واردة وصادرة',
        title: 'بوتات الصوت بالذكاء الاصطناعي',
        desc: 'أريا تجيب على كل مكالمة فوراً بصوت احترافي وطبيعي — على مدار الساعة. وفي الجانب الصادر، تتابع العملاء المحتملين وتستعيد المتغيبين وتعيد التفاعل مع العملاء السابقين دون أن يضطر فريقك لطلب رقم واحد.',
        features: ['التعامل مع المكالمات الواردة 24/7', 'متابعة العملاء المحتملين', 'مكالمات استرداد المتغيبين', 'حجز المواعيد المباشر', 'منطق التحويل إلى بشري'],
        color: 'from-orange-500/20 to-amber-500/10',
        glow: 'rgba(234,88,12,0.5)',
        accent: '#f97316',
      },
      {
        icon: MessageSquare,
        number: '02',
        tag: 'ويب · واتساب · رسائل',
        title: 'بوتات الدردشة بالذكاء الاصطناعي',
        desc: 'وكلاء دردشة ذكية تتعامل مع استفسارات العملاء وتؤهل العملاء المحتملين وتحجز المواعيد عبر موقعك وواتساب والرسائل النصية — في الوقت الفعلي على مدار الساعة.',
        features: ['تكامل الدردشة الحية على الموقع', 'أتمتة واتساب للأعمال', 'تدفقات محادثة الرسائل', 'تأهيل العملاء وتزامن CRM', 'دعم متعدد اللغات'],
        color: 'from-amber-500/20 to-orange-400/10',
        glow: 'rgba(245,158,11,0.5)',
        accent: '#f59e0b',
      },
      {
        icon: Smartphone,
        number: '03',
        tag: 'ويب · iOS · Android',
        title: 'تطبيقات الجوال والويب',
        desc: 'تطبيقات ويب ومحمولة مخصصة تُبنى من الألف إلى الياء — من التصميم والتطوير إلى الإطلاق والدعم المستمر. قابلة للتوسع وسريعة ومبنية لحل مشكلات عملك بالتحديد.',
        features: ['تطوير تطبيقات الويب المخصصة', 'تطبيقات iOS و Android', 'تصميم UI/UX والنماذج', 'تكامل API والخلفية', 'الصيانة والتحديثات المستمرة'],
        color: 'from-teal-500/20 to-cyan-400/10',
        glow: 'rgba(20,184,166,0.45)',
        accent: '#14b8a6',
      },
      {
        icon: Wrench,
        number: '04',
        tag: 'أتمتة · تكاملات · بنية تحتية',
        title: 'كل شيء تقني',
        desc: 'أتمتة سير العمل، وإعدادات CRM، وتكاملات الطرف الثالث، وخطوط البيانات، والبنية التحتية السحابية — إذا كان تقنياً وعملك يحتاجه، نبنيه.',
        features: ['إعداد CRM والأتمتة', 'بناء سير عمل Zapier / Make', 'تكاملات API الخارجية', 'خطوط البيانات ولوحات المعلومات', 'البنية السحابية و DevOps'],
        color: 'from-sky-500/20 to-blue-400/10',
        glow: 'rgba(56,189,248,0.45)',
        accent: '#38bdf8',
      },
    ],
  },
};

/* ── Tilt Card ───────────────────────────────────────────────── */
interface ServiceCardProps {
  svc: typeof content.en.services[0];
  index: number;
  isAr: boolean;
}

function ServiceCard({ svc, index, isAr }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;   // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5;
    setTilt({ x: y * 12, y: -x * 12 });           // rotateX, rotateY in degrees
  }

  function onMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }

  const Icon = svc.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        boxShadow: hovered
          ? `0 0 0 1px ${svc.glow.replace('0.5', '0.6')}, 0 0 30px 4px ${svc.glow}, 0 20px 60px -10px ${svc.glow.replace('0.5', '0.3')}`
          : '0 0 0 1px rgba(255,255,255,0.06)',
      }}
      className="relative rounded-2xl overflow-hidden cursor-default will-change-transform"
    >
      {/* Glass background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      />

      {/* Gradient tint per card */}
      <div className={`absolute inset-0 bg-gradient-to-br ${svc.color} opacity-60`} />

      {/* Hover inner glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${svc.glow.replace('0.5', '0.18')} 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-7 flex flex-col h-full">
        {/* Header */}
        <div className={`flex items-center gap-3 mb-5 ${isAr ? 'flex-row-reverse' : ''}`}>
          <span className="text-[10px] font-mono text-neutral-600">{svc.number}</span>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${svc.glow.replace('0.5', '0.15')}`, border: `1px solid ${svc.glow.replace('0.5', '0.3')}` }}
          >
            <Icon className="w-5 h-5" style={{ color: svc.accent }} />
          </div>
        </div>

        {/* Tag */}
        <p className={`text-[11px] font-mono uppercase tracking-widest mb-2 ${isAr ? 'text-right' : ''}`}
          style={{ color: svc.accent }}>
          {svc.tag}
        </p>

        {/* Title */}
        <h3 className={`text-xl font-bold text-white mb-3 leading-tight ${isAr ? 'text-right' : ''}`}>
          {svc.title}
        </h3>

        {/* Desc */}
        <p className={`text-neutral-400 text-sm leading-relaxed mb-6 flex-1 ${isAr ? 'text-right' : ''}`}>
          {svc.desc}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {svc.features.map((f, i) => (
            <li key={i} className={`flex items-center gap-2.5 text-sm text-neutral-300 ${isAr ? 'flex-row-reverse' : ''}`}>
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: svc.accent }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          to="/contact"
          className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest transition-all hover:gap-3 ${isAr ? 'flex-row-reverse self-end' : 'self-start'}`}
          style={{ color: svc.accent }}
        >
          {isAr ? 'ابدأ الآن' : 'Get Started'}
          <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Animation variants ───────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

/* ── Page ─────────────────────────────────────────────────────── */
export default function ServicesPage({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const t = content[lang];
  const isAr = lang === 'ar';

  return (
    <div className="bg-black min-h-screen" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SmokeBackground smokeColor="#ea580c" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10" />
        </div>

        <div className="relative z-20 px-6 max-w-4xl mx-auto text-center mt-12">
          <motion.div variants={containerVariants} initial="hidden" animate="show">
            <motion.span
              variants={itemVariants}
              className={`text-xs uppercase tracking-widest text-orange-400 mb-6 inline-block bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/20 backdrop-blur-md ${isAr ? 'font-arabic' : 'font-mono'}`}
            >
              {t.heroEyebrow}
            </motion.span>
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 drop-shadow-lg bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
            >
              {t.heroHeadline}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className={`text-neutral-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto drop-shadow ${isAr ? 'font-arabic' : ''}`}
            >
              {t.heroSub}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="relative z-20 py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.services.map((svc, i) => (
            <ServiceCard key={i} svc={svc} index={i} isAr={isAr} />
          ))}
        </div>
      </section>

      {/* CTA — shader background */}
      <section className="relative overflow-hidden py-32">
        {/* Shader canvas fills section */}
        <div className="absolute inset-0">
          <ShaderBackground />
        </div>
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Top + bottom fades to black */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-2xl mx-auto px-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {isAr ? 'لست متأكداً أي الخدمات هي الأنسب لعملك؟' : 'Not sure which services your business needs most?'}
          </h2>
          <p className="text-neutral-400 text-base mb-10">
            {isAr ? 'لهذا السبب نقدم لك مكالمة الاكتشاف.' : 'That is what the discovery call is for.'}
          </p>

          <Link
            to="/contact"
            className="relative inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-sm overflow-hidden group shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 group-hover:from-orange-500 group-hover:to-amber-400 transition-all duration-300" />
            <span className="relative">{isAr ? 'احجز مكالمة' : 'Book a Call'}</span>
            <ArrowRight className={`relative w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </Link>

          <p className="mt-4 text-xs text-neutral-500 font-mono">
            {isAr ? 'سنرسم لك الخطة الكاملة.' : "We'll map it out for you."}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
