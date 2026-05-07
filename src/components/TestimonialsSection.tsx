// components/testimonials-section.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CircularTestimonials } from "./ui/circular-testimonials";
import { BeamsBackground } from "./ui/beams-background";

const content = {
  en: {
    label: "What Businesses Say After 30 Days with ARIA",
    testimonials:[
      {
        name: "Mekael Shaikh",
        designation: "Evolv Technologies",
        quote: "We were losing at least 15 calls a week to voicemail. ARIA answered every single one from day one. We booked 11 new clients in the first month alone.",
        src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "Fahad Alenezi",
        designation: "MTechnologies",
        quote: "Our front desk was overwhelmed. ARIA handles the inbound volume completely — my team now focuses on clients who are actually in the building, not chasing callbacks.",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "Imad Afridi",
        designation: "Blackbox",
        quote: "I was skeptical it would sound natural. It does. Clients don't know they're talking to an AI. They just know someone always picks up.",
        src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "Wali Ahmed",
        designation: "TMT Legacy",
        quote: "Integrating ARIA was the best operational decision we've made this year. Customer satisfaction is up, and our response time is literally zero.",
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "Sara Mitchell",
        designation: "Apex Realty Group",
        quote: "We run a busy property management office. ARIA handles every after-hours inquiry and books viewings automatically. We haven't missed a lead since we went live.",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "Daniel Osei",
        designation: "Greenline Logistics",
        quote: "Our dispatch line used to go unanswered during peak hours. ARIA manages call triage now — drivers get updates, clients get confirmations. Zero dropped calls.",
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "Layla Nasser",
        designation: "Wellness First Clinics",
        quote: "Patients expect to reach us immediately. ARIA books appointments, answers FAQs, and escalates urgent calls — all without a single missed call complaint since launch.",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "James Thornton",
        designation: "Thornton & Associates Law",
        quote: "Client intake used to take up half my receptionist's day. ARIA qualifies callers, captures case details, and schedules consultations. It paid for itself in two weeks.",
        src: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "Priya Sharma",
        designation: "Nova Insurance Group",
        quote: "We handle hundreds of policy inquiries weekly. ARIA filters, routes, and logs every call. Our agents now spend time closing, not answering the same questions repeatedly.",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "Carlos Mendez",
        designation: "Bright HVAC Services",
        quote: "Emergency calls at 2am were killing our team. ARIA triages urgency, dispatches the right tech, and keeps the customer calm — all before any human is even awake.",
        src: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1368&auto=format&fit=crop",
      },
    ],
  },
  ar: {
    label: "ما تقوله الشركات بعد 30 يوماً مع أريا",
    testimonials:[
      {
        name: "ميكائيل شيخ",
        designation: "إيفولف تكنولوجيز",
        quote: "كنا نخسر ما لا يقل عن 15 مكالمة أسبوعياً للبريد الصوتي. أريا أجابت على كل مكالمة من اليوم الأول. حجزنا 11 عميلاً جديداً في الشهر الأول وحده.",
        src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "فهد العنزي",
        designation: "إم تكنولوجيز",
        quote: "كان فريق الاستقبال لدينا مثقلاً. أريا تتعامل مع حجم المكالمات الواردة بالكامل — فريقي يركز الآن على العملاء الموجودين فعلاً.",
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "عماد أفريدي",
        designation: "بلاك بوكس",
        quote: "كنت متشككاً في أن يبدو الأمر طبيعياً. لكنه يبدو كذلك. العملاء لا يعرفون أنهم يتحدثون مع ذكاء اصطناعي. يعرفون فقط أن شخصاً ما يرد دائماً.",
        src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "ولي أحمد",
        designation: "تي إم تي ليجاسي",
        quote: "كان دمج أريا أفضل قرار تشغيلي اتخذناه هذا العام. ارتفع رضا العملاء، ووقت الاستجابة لدينا أصبح حرفياً صفراً.",
        src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "سارة ميتشل",
        designation: "مجموعة أبيكس العقارية",
        quote: "نمتلك مكتباً عقارياً مزدحماً. أريا تتولى كل استفسار خارج أوقات الدوام وتحجز المعاينات تلقائياً. لم نفوّت أي عميل منذ أن انطلقنا.",
        src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "دانيال أوسي",
        designation: "جرين لاين لوجستيكس",
        quote: "كان خط الإرسال لدينا يبقى دون إجابة في ساعات الذروة. أريا تدير فرز المكالمات الآن — السائقون يتلقون التحديثات، والعملاء يتلقون التأكيدات. صفر مكالمات فائتة.",
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "ليلى ناصر",
        designation: "ويلنس فيرست كلينيكس",
        quote: "يتوقع المرضى التواصل الفوري معنا. أريا تحجز المواعيد، وتجيب على الأسئلة الشائعة، وتصعّد المكالمات العاجلة — دون أي شكوى من مكالمة فائتة منذ الإطلاق.",
        src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "جيمس ثورنتون",
        designation: "ثورنتون وشركاه للمحاماة",
        quote: "كان استقبال العملاء يستغرق نصف يوم موظف الاستقبال. أريا تؤهل المتصلين، وتسجل تفاصيل القضايا، وتجدول الاستشارات. عوّضت تكلفتها في أسبوعين.",
        src: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "بريا شارما",
        designation: "نوفا للتأمين",
        quote: "نتعامل مع مئات الاستفسارات الأسبوعية. أريا تصفّي وتوجّه وتسجّل كل مكالمة. وكلاؤنا يمضون وقتهم في الإغلاق، لا في الإجابة على نفس الأسئلة مراراً.",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1368&auto=format&fit=crop",
      },
      {
        name: "كارلوس مينديز",
        designation: "برايت لخدمات التكييف",
        quote: "المكالمات الطارئة في الثانية صباحاً كانت تُرهق فريقنا. أريا تقيّم الأولوية، وترسل الفني المناسب، وتطمئن العميل — كل ذلك قبل أن يستيقظ أي إنسان.",
        src: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1368&auto=format&fit=crop",
      },
    ],
  },
};

export default function TestimonialsSection({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const t = content[lang];
  const isRtl = lang === 'ar';

  return (
    <section className="overflow-hidden relative">
      <BeamsBackground intensity="medium" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mb-16 ${isRtl ? 'text-right' : 'text-left'}`}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
            {t.label}
          </span>
        </motion.div>

        {/* Seamlessly injected standard CircularTestimonials tailored to your Dark Theme */}
        <CircularTestimonials
          testimonials={t.testimonials}
          autoplay={true}
          dir={isRtl ? "rtl" : "ltr"}
          colors={{
            name: "#ffffff",
            designation: "#fb923c", // Matches your orange-400 theme
            testimony: "#d4d4d8", // text-neutral-300 equivalent
            arrowBackground: "rgba(255,255,255,0.05)",
            arrowForeground: "#ffffff",
            arrowHoverBackground: "#fb923c", // Hover action uses your accent color
          }}
          fontSizes={{
            name: "1.75rem",
            designation: "0.875rem",
            quote: "1.125rem",
          }}
        />
      </div>
      </BeamsBackground>
    </section>
  );
}