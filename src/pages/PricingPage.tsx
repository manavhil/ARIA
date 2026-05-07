import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShaderAnimation } from "@/src/components/ui/shader-lines";

// --- i18n Content Dictionary ---
const content = {
  en: {
    tagline: "Pricing",
    title: "Pricing Built For Businesses.\nNot For Software Buyers.",
    desc: "Three plans. One-time setup. Month-to-month retainer. Nothing hidden. A fixed build cost, a fixed monthly fee, and a clear answer to the only question that matters.",
    popularBadge: "Most Popular",
    setupText: "One-time setup",
    moText: "/mo",
    getStartedBtn: "Get Started",
    processingBtn: "Processing",
    neverChargeTitle: "What You Will Never Be Charged For",
    neverChargeDesc: "The setup fee is non-refundable because the work is genuinely done. The retainer is month-to-month because results should speak for themselves.",
    plans:[
      {
        name: 'Essentials',
        tag: 'Single-location business',
        setup: '$1,800',
        monthly: '$600',
        highlight: false,
        features:[
          '24/7 inbound voice agent',
          'Up to 500 calls/month',
          'Calendar & booking integration',
          'CRM lead logging',
          'SMS appointment confirmations',
          'Monthly transcripts & summary report',
          'Standard optimisation cycle',
        ],
      },
      {
        name: 'Growth',
        tag: 'Full automation, all-in',
        setup: '$2,800',
        monthly: '$1,200',
        highlight: true,
        features:[
          'Everything in Essentials',
          'Unlimited inbound calls',
          'Outbound lead follow-up calls',
          'No-show recovery sequences',
          'Lapsed-client re-engagement',
          'Review request automation',
          'Priority optimisation cycle',
        ],
      },
      {
        name: 'Scale',
        tag: 'Multi-location & high-volume',
        setup: '$4,500',
        monthly: '$2,200',
        highlight: false,
        features:[
          'Everything in Growth',
          'Multi-location call routing',
          'Dedicated agent per location',
          'Custom CRM & API integrations',
          'Post-service check-in calls',
          'Dedicated success manager',
          'Quarterly strategy review',
        ],
      },
    ],
    included:[
      'Full agent build — custom-trained on your business',
      'Voice selection — pick from premium voices',
      'Standard integrations — calendar & CRM setup included',
      'Live testing — full scenario walkthrough before go-live',
      'Analytics dashboard — live call data, transcripts, outcomes',
      'Human escalation logic — transfer rules built in',
      'HIPAA / GDPR compliance — BAA or DPA signed',
      'Monthly optimisation — we review & retrain',
      'Unlimited updates — new services, prices, staff',
      'Account manager — single point of contact',
    ],
    neverCharged:[
      'Per-call or per-minute fees',
      'Charges for call volume spikes',
      'Retraining fees when your pricing changes',
      'Standard integration charges',
      'Dashboard or analytics fees',
      'Cancellation fees',
    ]
  },
  ar: {
    tagline: "التسعير",
    title: "تسعير مصمم للشركات.\nوليس لمشتري البرامج.",
    desc: "ثلاث خطط. إعداد لمرة واحدة. اشتراك شهري. لا توجد رسوم خفية. تكلفة بناء ثابتة، ورسوم شهرية ثابتة، وإجابة واضحة على السؤال الوحيد الذي يهم.",
    popularBadge: "الأكثر شيوعاً",
    setupText: "إعداد لمرة واحدة",
    moText: "/شهر",
    getStartedBtn: "ابدأ الآن",
    processingBtn: "جاري المعالجة",
    guidanceTag: "إرشاد",
    guidanceTitle: "أي خطة هي المناسبة لعملك؟",
    guidanceDesc: "تبدأ معظم الشركات ذات الموقع الواحد بالخطة الأساسية وتنتقل إلى خطة النمو خلال الأشهر الستة الأولى. الشركات التي لديها عملاء ذوي قيمة عالية — حيث تغطي موعد واحد مسترد قيمة الاشتراك الشهري مرتين أو ثلاث مرات — تبدأ عادةً بخطة النمو. العمليات التي تدير موقعين أو أكثر، أو تتعامل مع أكثر من 1000 مكالمة شهرياً، تبدأ بخطة التوسع. إذا لم تكن متأكداً، فمكالمة الاستكشاف هي أفضل طريقة لاتخاذ القرار.",
    stdTag: "قياسي",
    neverChargeTitle: "ما لن تدفع مقابله أبداً",
    neverChargeDesc: "رسوم الإعداد غير قابلة للاسترداد لأن العمل يتم إنجازه بالفعل. الاشتراك الشهري يضمن أن تتحدث النتائج عن نفسها.",
    plans:[
      {
        name: 'الأساسية (Essentials)',
        tag: 'شركة ذات موقع واحد',
        setup: '$1,800',
        monthly: '$600',
        highlight: false,
        features:[
          'وكيل صوتي وارد على مدار الساعة',
          'ما يصل إلى 500 مكالمة/شهر',
          'تكامل التقويم والحجز',
          'تسجيل العملاء المحتملين في CRM',
          'تأكيدات المواعيد عبر الرسائل القصيرة',
          'نصوص وتقارير ملخصة شهرية',
          'دورة تحسين قياسية',
        ],
      },
      {
        name: 'النمو (Growth)',
        tag: 'أتمتة كاملة، شاملة',
        setup: '$2,800',
        monthly: '$1,200',
        highlight: true,
        features:[
          'كل شيء في الخطة الأساسية',
          'مكالمات واردة غير محدودة',
          'مكالمات متابعة للعملاء المحتملين',
          'تسلسلات استعادة العملاء المتغيبين',
          'إعادة إشراك العملاء السابقين',
          'أتمتة طلبات التقييم',
          'دورة تحسين ذات أولوية',
        ],
      },
      {
        name: 'التوسع (Scale)',
        tag: 'مواقع متعددة وحجم كبير',
        setup: '$4,500',
        monthly: '$2,200',
        highlight: false,
        features:[
          'كل شيء في خطة النمو',
          'توجيه المكالمات لمواقع متعددة',
          'وكيل مخصص لكل موقع',
          'تكامل مخصص لـ CRM وواجهة برمجة التطبيقات',
          'مكالمات الاطمئنان بعد الخدمة',
          'مدير نجاح مخصص',
          'مراجعة استراتيجية ربع سنوية',
        ],
      },
    ],
    included:[
      'بناء وكيل كامل — مدرب خصيصاً لعملك',
      'اختيار الصوت — اختر من بين أصوات مميزة',
      'تكامل قياسي — إعداد التقويم و CRM مشمول',
      'اختبار حي — استعراض كامل للسيناريوهات قبل الإطلاق',
      'لوحة تحكم التحليلات — بيانات المكالمات الحية والنصوص والنتائج',
      'منطق التصعيد البشري — قواعد التحويل مدمجة',
      'التوافق مع HIPAA / GDPR — توقيع اتفاقيات',
      'تحسين شهري — نقوم بالمراجعة وإعادة التدريب',
      'تحديثات غير محدودة — خدمات جديدة، أسعار، موظفين',
      'مدير حساب — نقطة اتصال واحدة',
    ],
    neverCharged:[
      'رسوم لكل مكالمة أو لكل دقيقة',
      'رسوم على ارتفاع حجم المكالمات',
      'رسوم إعادة التدريب عند تغير أسعارك',
      'رسوم التكامل القياسية',
      'رسوم لوحة التحكم أو التحليلات',
      'رسوم الإلغاء',
    ]
  }
};

export default function PricingPage({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  
  // Choose dictionary based on language prop
  const t = content[lang];
  const isRTL = lang === 'ar';
  
  // Icon dynamically changes direction based on Language
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // --- MOCK PAYONEER API CHECKOUT ---
  const handlePayoneerCheckout = async (planName: string, planSetup: string, planMonthly: string) => {
    setLoadingPlan(planName);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`[Payoneer Test Mode]\n\nProcessing checkout for ${planName} Plan.\nTotal Setup: ${planSetup}\nMonthly: ${planMonthly}\n\nIn a real environment, this will redirect to a secure Payoneer Payment Link or Invoice Request.`);
    } catch (error) {
      console.error("Payoneer checkout initialization failed", error);
    } finally {
      setLoadingPlan(null);
    }
  };
return (
  <div
    className="bg-black min-h-screen font-sans text-white relative overflow-hidden"
    dir={isRTL ? "rtl" : "ltr"}
  >
    {/* Main Container */}
    <div className="relative z-10 w-full">

      {/* ── Shader wrapper — covers hero + cards + never-charged ── */}
      <div className="relative">
        {/* Shader layer */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen z-0">
          <ShaderAnimation />
        </div>
        {/* Glass readability overlay — subtle dark veil so text stays legible */}
        <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.25) 100%)' }} />

        {/* Hero */}
        <div className="relative z-[2] pt-36 pb-16 px-6 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-orange-500 mb-4 inline-block">
            {t.tagline}
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5 font-display tracking-tight whitespace-pre-line">
            {t.title}
          </h1>

          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mt-4">
            {t.desc}
          </p>
        </motion.div>
        </div>{/* end hero */}

        {/* Pricing Cards */}
        <section className="relative z-[2] py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {t.plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`
                backdrop-blur-[14px] rounded-3xl p-8 flex flex-col transition-all duration-300
                from-white/10 to-white/5 border border-white/10 backdrop-brightness-[0.91] bg-gradient-to-br
                ${
                  plan.highlight
                    ? "scale-[1.02] relative ring-2 ring-orange-500/50 shadow-[0_0_40px_rgba(249,115,22,0.15)] bg-orange-500/5"
                    : "hover:border-white/30 hover:bg-white/[0.03]"
                }
              `}
            >
              {plan.highlight && (
                <div
                  className={`absolute -top-4 ${
                    isRTL ? "left-6" : "right-6"
                  } px-4 py-1 text-[12px] font-bold uppercase tracking-widest rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg`}
                >
                  {t.popularBadge}
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-3xl font-light tracking-tight text-white">
                  {plan.name}
                </h2>
                <p className="text-[14px] text-white/60 mt-1 font-mono">
                  {plan.tag}
                </p>
              </div>

              <div className="mb-2">
                <span className="text-xs text-white/50 font-mono uppercase tracking-wider">
                  {t.setupText}
                </span>
                <p className="text-2xl font-bold text-white mt-1">
                  {plan.setup}
                </p>
              </div>

              <div className="my-6 flex items-baseline gap-2">
                <span className="text-5xl font-light text-white font-display">
                  {plan.monthly}
                </span>
                <span className="text-[14px] text-white/50 font-sans">
                  {t.moText}
                </span>
              </div>

              <div className="w-full mb-6 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1)_20%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.1)_80%,transparent)]" />

              <ul className="flex flex-col gap-4 flex-1 mb-10">
                {plan.features.map((f, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[14px] text-white/80 leading-tight"
                  >
                    <Check
                      className={`w-5 h-5 shrink-0 ${
                        plan.highlight
                          ? "text-orange-400"
                          : "text-amber-500/70"
                      }`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  handlePayoneerCheckout(plan.name, plan.setup, plan.monthly)
                }
                disabled={loadingPlan === plan.name}
                className={`w-full py-4 rounded-xl font-bold text-[15px] transition-all duration-300 flex items-center justify-center gap-2 group
                  ${
                    plan.highlight
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_35px_rgba(249,115,22,0.7)] hover:scale-[1.02]"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  }`}
              >
                {loadingPlan === plan.name ? (
                  <>
                    {t.processingBtn}
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    {t.getStartedBtn}
                    <ArrowIcon
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isRTL
                          ? "group-hover:-translate-x-1"
                          : "group-hover:translate-x-1"
                      }`}
                    />
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
        </section>

        {/* Never charged for */}
        <section className="relative z-[2] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-amber-500/5 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              {t.neverChargeTitle}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.neverCharged.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold mt-0.5">✕</span>
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-white/50 text-sm mt-8 pt-6 border-t border-white/10 leading-relaxed">
              {t.neverChargeDesc}
            </p>
          </motion.div>
        </div>
        </section>

      </div>{/* end shader wrapper */}

    </div>
  </div>
)
}