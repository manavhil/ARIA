// src/pages/AboutPage.tsx
import { useRef, useEffect } from "react"
import { Button } from "../components/ui/button"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

const BG_IMAGE = "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600"

const content = {
  en: {
    heroTitle1: "BUILT FOR ONE",
    heroTitle2: "PURPOSE.",
    heroTagline: "Automate your future before your competitors automate theirs.",
    heroSub: "[ REVENUE SYSTEMS ]",
    heroMeta: "INBOUND · OUTBOUND · AUTOMATION",
    convertTitle: "Built To Convert.",
    cta: "Book a Discovery Call",
    approachBadge: "Our Approach",
    approachTitle1: "Done-For-You.",
    approachTitle2: "Not Done-By-You.",
    approachDesc: "We do not hand you a platform and wish you luck. Every deployment is built by our team, trained on your business, and handed over live. You just receive the bookings.",
    card1Title: "AI Voice Agents",
    card1Desc: "Inbound and Outbound. Real conversations that qualify leads, answer FAQs, and book appointments directly to your calendar 24/7.",
    card2Title: "Business Automation",
    card2Desc: "Replace manual work. We build CRM setups, automated follow-up sequences, and seamless integrations between all your tools.",
    card3Title: "Web & Lead Systems",
    card3Desc: "Custom website design, landing pages, and lead capture forms built specifically to convert traffic into qualified appointments.",
    exploreBtn: "Explore Services",
  },
  ar: {
    heroTitle1: "بُني لغرض",
    heroTitle2: "واحد.",
    heroTagline: "أتمت مستقبلك قبل أن يفعل منافسوك.",
    heroSub: "[ أنظمة الإيرادات ]",
    heroMeta: "استقبال · إرسال · أتمتة",
    convertTitle: "بُني ليُحوِّل.",
    cta: "احجز مكالمة استكشافية",
    approachBadge: "نهجنا",
    approachTitle1: "يُنفذ من أجلك.",
    approachTitle2: "لا تُنفذه بنفسك.",
    approachDesc: "نحن لا نمنحك منصة ونتمنى لك التوفيق. يتم بناء كل نظام بواسطة فريقنا، ويُدرب على عملك، ويُسلم لك جاهزاً.",
    card1Title: "وكلاء صوت بالذكاء الاصطناعي",
    card1Desc: "استقبال وإرسال. محادثات حقيقية تؤهل العملاء المحتملين وتجيب على الأسئلة وتحجز المواعيد.",
    card2Title: "أتمتة الأعمال",
    card2Desc: "استبدل العمل اليدوي. نقوم ببناء إعدادات CRM وسلاسل المتابعة التلقائية والتكاملات السلسة.",
    card3Title: "أنظمة الويب والعملاء المحتملين",
    card3Desc: "تصميم مواقع مخصصة وصفحات هبوط ونماذج التقاط بيانات مبنية لتحويل الزوار إلى مواعيد.",
    exploreBtn: "استكشف الخدمات",
  }
}

interface AboutPageProps { lang?: 'en' | 'ar' }

export default function AboutPage({ lang = 'en' }: AboutPageProps) {
  const isRTL     = lang === 'ar'
  const t         = content[lang]
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null)   // 200vh sticky wrapper
  const canvasRef  = useRef<HTMLDivElement>(null)
  const layersRef  = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const canvas  = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    let entered = false

    // ── Entrance drop-in ──
    canvas.style.opacity    = '0'
    canvas.style.transform  = 'rotateX(90deg) rotateZ(0deg) scale(0.8)'
    canvas.style.transition = 'none'
    const t0 = setTimeout(() => {
      canvas.style.transition = 'opacity 2.5s cubic-bezier(0.16,1,0.3,1), transform 2.5s cubic-bezier(0.16,1,0.3,1)'
      canvas.style.opacity    = '1'
      canvas.style.transform  = 'rotateX(55deg) rotateZ(-25deg) scale(1)'
      setTimeout(() => { entered = true }, 2600)
    }, 300)

    // ── Mouse parallax only ──
    const handleMouse = (e: MouseEvent) => {
      const x = (window.innerWidth  / 2 - e.pageX) / 30
      const y = (window.innerHeight / 2 - e.pageY) / 30
      if (entered) canvas.style.transition = 'transform 0.15s ease-out'
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`
      layersRef.current.forEach((layer, i) => {
        if (!layer) return
        layer.style.transform = `translateZ(${(i + 1) * 12}px) translate(${x * (i + 1) * 0.3}px, ${y * (i + 1) * 0.3}px)`
      })
    }

    window.addEventListener('mousemove', handleMouse)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      clearTimeout(t0)
    }
  }, [])

  return (
    <div className="flex flex-col bg-[#050505] min-h-screen font-sans text-white overflow-x-hidden"
         dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ══════════════════════════════════════════════════
          BLOCK 1 — Hero
      ══════════════════════════════════════════════════ */}
      <div ref={wrapperRef}>
        <section className="relative h-screen overflow-hidden bg-[#080808] flex items-center justify-center">

          {/* Grain */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <filter id="about-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </svg>
          <div className="absolute inset-0 z-[3] pointer-events-none opacity-[0.12]"
               style={{ filter: 'url(#about-grain)' }} />
          <div className="absolute inset-0 z-[4] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,#080808_100%)]" />

          {/* 3-D canvas */}
          <div className="absolute inset-0 z-[1] flex items-center justify-center"
               style={{ perspective: '2000px' }}>
            <div ref={canvasRef} className="relative"
                 style={{ width: '720px', height: '450px', transformStyle: 'preserve-3d' }}>

              <div ref={el => { if (el) layersRef.current[0] = el }}
                   className="absolute inset-0 bg-cover bg-center"
                   style={{ backgroundImage: `url('${BG_IMAGE}')`,
                            filter: 'grayscale(1) contrast(1.25) brightness(0.5)',
                            border: '1px solid rgba(255,255,255,0.08)' }} />
              <div ref={el => { if (el) layersRef.current[1] = el }}
                   className="absolute inset-0 bg-cover bg-center"
                   style={{ backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1400')`,
                            filter: 'grayscale(1) brightness(0.7)', opacity: 0.5, mixBlendMode: 'screen' }} />
              <div ref={el => { if (el) layersRef.current[2] = el }}
                   className="absolute inset-0 bg-cover bg-center"
                   style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400')`,
                            filter: 'grayscale(1) contrast(1.3) brightness(0.8)', opacity: 0.3, mixBlendMode: 'overlay' }} />
              {/* Topo lines */}
              <div className="absolute pointer-events-none"
                   style={{ width: '200%', height: '200%', top: '-50%', left: '-50%',
                            transform: 'translateZ(100px)',
                            backgroundImage: 'repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 38px, rgba(255,255,255,0.04) 39px, transparent 40px)' }} />
              <div className="absolute inset-0 pointer-events-none"
                   style={{ boxShadow: 'inset 0 0 60px rgba(234,88,12,0.12)', border: '1px solid rgba(234,88,12,0.15)' }} />
            </div>
          </div>

          {/* Text overlay */}
          <div className="absolute inset-0 z-[10] pointer-events-none flex flex-col justify-between p-8 md:p-16">
            <div className="flex justify-between items-start pt-16">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-neutral-600">ARIA / ABOUT</span>
              <div className="text-right font-mono text-[10px] text-orange-500/80">
                <div>AI VOICE AGENTS</div><div>EST. 2024</div>
              </div>
            </div>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[0.88] tracking-tight select-none">
                <span className="text-white">{t.heroTitle1}</span><br />
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  {t.heroTitle2}
                </span>
              </h1>
              <p className="mt-6 text-white font-medium text-[clamp(1rem,2vw,1.4rem)] tracking-wide max-w-xl leading-snug select-none">
                {t.heroTagline}
              </p>
            </div>
            <div className="flex justify-between items-end pb-2">
              <div className="font-mono text-[11px] text-neutral-500 space-y-1">
                <p>{t.heroSub}</p><p>{t.heroMeta}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest text-neutral-600">SCROLL</span>
                <div className="w-px h-14 bg-gradient-to-b from-neutral-400 to-transparent"
                     style={{ animation: 'scrollFlow 2s ease-in-out infinite' }} />
              </div>
            </div>
          </div>

          <style>{`
            @keyframes scrollFlow {
              0%,100% { transform: scaleY(0); transform-origin: top; opacity:0; }
              40%      { transform: scaleY(1); transform-origin: top; opacity:1; }
              60%      { transform: scaleY(1); transform-origin: bottom; opacity:1; }
            }
          `}</style>
        </section>
      </div>


      {/* ══════════════════════════════════════════════════
          BLOCK 3 — Our Approach + Cards
      ══════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 border-t border-white/5 bg-[#0a0a0a]">
        <div className="mx-auto max-w-6xl space-y-16 px-6">

          <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-4 inline-block">{t.approachBadge}</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                {t.approachTitle1}<br />
                <span className="text-neutral-500">{t.approachTitle2}</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="text-neutral-400 text-lg leading-relaxed">
              <p>{t.approachDesc}</p>
            </motion.div>
          </div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row gap-6 text-start">

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="md:flex-1 relative overflow-hidden rounded-xl border border-white/5 group">
              <img src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_chat_gradient.png" alt="AI Voice Agents"
                   className="object-cover w-full h-[300px] sm:h-[360px] md:h-full transition-transform duration-700 group-hover:scale-105 grayscale sepia saturate-[4] hue-rotate-[-10deg] contrast-125" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-2 text-orange-50">{t.card1Title}</h3>
                <p className="text-orange-100/70 text-sm leading-relaxed max-w-sm">{t.card1Desc}</p>
              </div>
            </motion.div>

            <div className="flex flex-col gap-6 md:flex-1">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/5 shadow-2xl">
                <div className="relative h-48 w-full overflow-hidden bg-black">
                  <img src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen_moon.png" alt="Business Automation"
                       className="h-full w-full object-cover hue-rotate-180 saturate-200 contrast-125" />
                  <div className="absolute inset-0 bg-orange-600/30 mix-blend-color" />
                  <div className="absolute bottom-0 h-full w-full bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                </div>
                <div className="p-6 relative z-10 -mt-10">
                  <h3 className="text-xl font-bold text-orange-50">{t.card2Title}</h3>
                  <p className="mt-2 text-sm text-neutral-400">{t.card2Desc}</p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }} whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-950/40 to-amber-900/10 border border-orange-500/10 shadow-2xl">
                <div className="p-8 h-full flex flex-col justify-center min-h-[220px]">
                  <h3 className="text-xl font-bold text-white">{t.card3Title}</h3>
                  <p className="mt-3 text-sm text-orange-100/60 leading-relaxed">{t.card3Desc}</p>
                  <div className="mt-6">
                    <Button variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:text-orange-300 bg-transparent transition-colors">
                      {t.exploreBtn}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
