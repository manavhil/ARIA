// components/blocks/process-section.tsx
'use client'

import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ShaderPlane } from './ui/background-paper-shaders';

const content = {
  en: {
    label: 'How It Works',
    title: 'Rigorous from the first\nconversation.',
    steps: [
      {
        number: '01',
        title: 'Discovery & Alignment',
        description:
          "We begin with a focused strategy session — understanding your business, your clients, your growth goals, and what's actually holding you back. This shapes everything that follows.",
      },
      {
        number: '02',
        title: 'Strategy & Proposal',
        description:
          'You receive a detailed, fixed-scope proposal. Clear deliverables, clear timeline, clear investment. No ambiguity, no surprises.',
      },
      {
        number: '03',
        title: 'Build & Iteration',
        description:
          'Our team builds with precision and communicates throughout. You have a dedicated point of contact and regular milestone reviews — never left wondering where things stand.',
      },
      {
        number: '04',
        title: 'Launch & Handoff',
        description:
          "We don't hand you a file and disappear. Launch includes a structured handoff, full documentation, and a dedicated post-launch support window.",
      },
    ],
  },
  ar: {
    label: 'كيف نعمل',
    title: 'صارمون من أول\nمحادثة.',
    steps: [
      {
        number: '٠١',
        title: 'الاكتشاف والتوافق',
        description:
          'نبدأ بجلسة استراتيجية مركزة — نفهم عملك وعملاءك وأهداف نموك وما يعيقك فعلاً. هذا يشكّل كل ما يليه.',
      },
      {
        number: '٠٢',
        title: 'الاستراتيجية والاقتراح',
        description:
          'تتلقى اقتراحاً تفصيلياً بنطاق ثابت. نتائج واضحة، جدول زمني واضح، استثمار واضح. لا غموض، لا مفاجآت.',
      },
      {
        number: '٠٣',
        title: 'البناء والتكرار',
        description:
          'يبني فريقنا بدقة ويتواصل طوال الوقت. لديك نقطة اتصال مخصصة ومراجعات منتظمة للمعالم — لن تتساءل أبداً أين تسير الأمور.',
      },
      {
        number: '٠٤',
        title: 'الإطلاق والتسليم',
        description:
          'لا نسلمك ملفاً ونختفي. يتضمن الإطلاق تسليماً منظماً وتوثيقاً كاملاً ونافذة دعم مخصصة بعد الإطلاق.',
      },
    ],
  },
};

interface ProcessSectionProps {
  lang: 'en' | 'ar';
}

export function ProcessSection({ lang }: ProcessSectionProps) {
  const t = content[lang];

  return (
    <section className="relative w-full py-24 bg-black overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* 3D Animated Shader Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1.2] }}>
          {/* Colors tweaked to fit the Emerald / Black theme of the section */}
          <ShaderPlane position={[0, 0, 0]} color1="#10b981" color2="#000000" />
        </Canvas>
      </div>

      {/* Subtle Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span
            key={`${lang}-label`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-orange-500 font-mono text-xs uppercase tracking-[0.3em] block drop-shadow-md"
          >
            {t.label}
          </motion.span>
          <motion.h2
            key={`${lang}-title`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mt-4 tracking-tighter whitespace-pre-line"
          >
            {t.title}
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 p-px rounded-xl overflow-hidden backdrop-blur-sm">
          {t.steps.map((step, i) => (
            <motion.div
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/80 backdrop-blur-md p-8 group hover:bg-black/60 transition-colors h-full"
            >
              <span className="text-orange-500 font-mono text-4xl font-black opacity-30 group-hover:opacity-80 group-hover:scale-110 transform transition-all duration-300 block mb-6">
                {step.number}
              </span>
              <h3 className="text-white font-bold text-lg mb-3 tracking-tight">{step.title}</h3>
              <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}