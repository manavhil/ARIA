'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NeuralBackground from './ui/flow-field-background'
import { GlowCard } from './ui/spotlight-card'
import { ChevronDown } from 'lucide-react'

const content = {
  en: {
    label: "Why BlackBox",
    title: "The agency that actually delivers.",
    reasons: [
      {
        number: "01",
        title: "Always On",
        description: "Our AI systems run 24/7 — qualifying leads, booking calls, and following up while you sleep. Zero downtime. Zero missed opportunities."
      },
      {
        number: "02",
        title: "Full Ownership",
        description: "Strategy. Design. Build. Launch. We handle everything — no freelancer chaos, no half-baked handoffs. One team, total accountability."
      },
      {
        number: "03",
        title: "Sounds Human",
        description: "Our voice agents don't sound like robots. They're trained on your brand, your tone, your offers — so every call feels personal."
      },
      {
        number: "04",
        title: "ROI from Day One",
        description: "We don't build vanity projects. Every pixel, every automation is engineered to generate leads, save time, and make you money — fast."
      }
    ],
    stats: [
      { value: "50+", label: "Projects Delivered" },
      { value: "4", label: "Countries Served" },
      { value: "24/7", label: "AI Uptime" },
      { value: "100%", label: "Client Retention" }
    ]
  },
  ar: {
    label: "لماذا بلاك بوكس",
    title: "الوكالة التي تنجز حقاً.",
    reasons: [
      {
        number: "٠١",
        title: "متاح دائماً",
        description: "أنظمة الذكاء الاصطناعي لدينا تعمل على مدار الساعة طوال أيام الأسبوع — تأهيل العملاء المحتملين، وحجز المكالمات، والمتابعة أثناء نومك. لا توقف. لا فرص ضائعة."
      },
      {
        number: "٠٢",
        title: "ملكية كاملة",
        description: "الاستراتيجية. التصميم. البناء. الإطلاق. نحن نتولى كل شيء — لا فوضى المستقلين، لا تسليمات غير مكتملة. فريق واحد، مسؤولية كاملة."
      },
      {
        number: "٠٣",
        title: "صوت بشري",
        description: "وكلاء الصوت لدينا لا يبدون مثل الروبوتات. تم تدريبهم على علامتك التجارية، ونبرة صوتك، وعروضك — لذا تبدو كل مكالمة شخصية."
      },
      {
        number: "٠٤",
        title: "عائد على الاستثمار من اليوم الأول",
        description: "نحن لا نبني مشاريع تجميلية. كل بكسل، كل أتمتة مصممة لجذب العملاء، وتوفير الوقت، وتحقيق الأرباح لك — بسرعة."
      }
    ],
    stats: [
      { value: "٥٠+", label: "مشاريع تم تسليمها" },
      { value: "٤", label: "دول تم خدمتها" },
      { value: "٢٤/٧", label: "وقت تشغيل الذكاء الاصطناعي" },
      { value: "١٠٠٪", label: "الاحتفاظ بالعملاء" }
    ]
  }
}

interface WhyUsProps {
  lang: 'en' | 'ar';
}

interface ExpandableTileProps {
  number: string;
  title: string;
  description: string;
  lang: 'en' | 'ar';
  index: number;
  key?: React.Key;
}

function ExpandableTile({ number, title, description, lang, index }: ExpandableTileProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 100, y: 20 }}
      whileInView={{ opacity: 10, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <GlowCard 
        glowColor="green"
        customSize={true}
        className={`w-full bg-black/40 border-white/5 transition-all duration-300 ${isOpen ? 'min-h-[160px]' : 'min-h-[80px]'}`}
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-full text-left relative z-10 flex flex-col"
        >
          <div className={`flex items-center justify-between w-full ${lang === 'ar' ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
            <div className={`flex items-center gap-6 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
              <span className="text-orange-500 font-mono text-3xl font-black opacity-40">
                {number}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {title}
              </h3>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-orange-500"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className={`pt-4 pb-2 ${lang === 'ar' ? 'text-right pr-16' : 'text-left pl-16'}`}>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </GlowCard>
    </motion.div>
  );
}

export function WhyUs({ lang }: WhyUsProps) {
  const t = content[lang];

  return (
    <section className={`relative w-full py-24 bg-black overflow-hidden ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <NeuralBackground 
          color="#10b981" // Emerald-500
          trailOpacity={0.1}
          speed={0.5}
          particleCount={400}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span
            key={`${lang}-label`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em] block"
          >
            {t.label}
          </motion.span>
          <motion.h2
            key={`${lang}-title`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-6xl font-bold text-white mt-4 ${lang === 'ar' ? 'tracking-normal' : 'tracking-tighter'}`}
          >
            {t.title}
          </motion.h2>
        </div>

        {/* Reasons Grid - Expandable Tiles */}
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {t.reasons.map((reason, index) => (
            <ExpandableTile
              key={`${lang}-${index}`}
              number={reason.number}
              title={reason.title}
              description={reason.description}
              lang={lang}
              index={index}
            />
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-24 pt-12 border-t border-white/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {t.stats.map((stat, index) => (
              <motion.div
                key={`${lang}-stat-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {stat.value}
                </div>
                <div className="text-orange-500 font-mono text-xs uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
