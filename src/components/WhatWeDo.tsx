import { motion } from 'framer-motion';
import { Mic2, MessageSquare, Smartphone, Wrench } from 'lucide-react';

const content = {
  en: {
    label: "What ARIA Does For Your Business",
    cards: [
      {
        icon: Mic2,
        title: 'AI Voice Bots',
        sub: 'Inbound & Outbound',
        desc: 'Every call answered instantly, 24/7. Follows up leads, recovers no-shows, and re-engages lapsed clients automatically.',
      },
      {
        icon: MessageSquare,
        title: 'AI Chat Bots',
        sub: 'Web · WhatsApp · SMS',
        desc: 'Intelligent chat agents that handle enquiries, qualify leads, and book appointments across every channel in real time.',
      },
      {
        icon: Smartphone,
        title: 'Mobile & Web Apps',
        sub: 'Web · iOS · Android',
        desc: 'Custom applications built end-to-end — from design and development to launch and ongoing support.',
      },
      {
        icon: Wrench,
        title: 'Everything Technical',
        sub: 'Automation · Integrations · Infrastructure',
        desc: 'Workflow automation, CRM setups, third-party integrations, data pipelines, and cloud infrastructure — all handled for you.',
      },
    ],
  },
  ar: {
    label: "ما الذي تفعله أريا لعملك",
    cards: [
      {
        icon: Mic2,
        title: 'بوتات الصوت بالذكاء الاصطناعي',
        sub: 'واردة وصادرة',
        desc: 'كل مكالمة مُجابة فوراً على مدار الساعة. تتابع العملاء المحتملين وتستعيد المتغيبين وتعيد التفاعل تلقائياً.',
      },
      {
        icon: MessageSquare,
        title: 'بوتات الدردشة بالذكاء الاصطناعي',
        sub: 'ويب · واتساب · رسائل',
        desc: 'وكلاء دردشة ذكية تتعامل مع الاستفسارات وتؤهل العملاء وتحجز المواعيد عبر كل القنوات في الوقت الفعلي.',
      },
      {
        icon: Smartphone,
        title: 'تطبيقات الجوال والويب',
        sub: 'ويب · iOS · Android',
        desc: 'تطبيقات مخصصة تُبنى من الألف إلى الياء — من التصميم والتطوير إلى الإطلاق والدعم المستمر.',
      },
      {
        icon: Wrench,
        title: 'كل شيء تقني',
        sub: 'أتمتة · تكاملات · بنية تحتية',
        desc: 'أتمتة سير العمل وإعدادات CRM والتكاملات وخطوط البيانات والبنية السحابية — كل شيء يُنجز نيابةً عنك.',
      },
    ],
  },
};

export default function WhatWeDo({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const t = content[lang];
  return (
    <section className="py-14 sm:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-14 ${lang === 'ar' ? 'text-right' : ''}`}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-orange-400">{t.label}</span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.cards.map((card, i) => (
            <motion.div
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative p-6 rounded-xl border border-white/8 bg-white/[0.02] hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-300 ${lang === 'ar' ? 'text-right' : ''}`}
            >
              <div className="mb-4 inline-flex p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <card.icon className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-0.5">{card.title}</h3>
              <p className="text-orange-400/70 text-xs font-mono mb-3">{card.sub}</p>
              <p className="text-neutral-500 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
