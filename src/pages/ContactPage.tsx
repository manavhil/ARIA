import { useState, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Mic, MicOff, PhoneOff } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { SplineScene } from '../components/ui/splite';
import { GradientTracing } from '../components/ui/gradient-tracing';

const WORKER = 'https://bold-fog-9867.yahyak5619.workers.dev/';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type CallStatus = 'idle' | 'connecting' | 'active' | 'error';

const content = {
  en: {
    badge: 'Contact',
    heading1: "Let's See What",
    heading2: 'Looks Like For Your Business.',
    sub: 'Book a free 30-minute discovery call. We will walk you through what ARIA sounds like for your specific business, answer your questions, and — if it is a fit — map out your deployment.',
    bookTitle: 'Book a Discovery Call',
    hint: '↑ Click to speak with ARIA & book',
    connectingText: 'Connecting to ARIA…',
    listeningText: 'ARIA is listening',
    retryText: 'Connection failed — tap to retry',
    noCommit: 'No commitment required. We take on a limited number of new businesses each month.',
    formTitle: 'Or Send a Message',
    labelName: 'Full Name',
    placeholderName: 'Your name',
    labelEmail: 'Email Address',
    placeholderEmail: 'you@company.com',
    labelVolume: 'Monthly Call Volume',
    volumeDefault: 'Select volume',
    volumeOptions: ['Under 100 calls/month', '100–500 calls/month', '500–1,000 calls/month', '1,000+ calls/month'],
    labelMessage: 'Message',
    placeholderMessage: 'Tell us a bit about your business and what you need...',
    sending: 'Sending…',
    send: 'Send Message',
    successTitle: 'Message received.',
    successSub: 'We will be in touch within one business day.',
  },
  ar: {
    badge: 'تواصل معنا',
    heading1: 'دعنا نرى كيف تبدو',
    heading2: 'في عملك.',
    sub: 'احجز مكالمة استكشافية مجانية لمدة 30 دقيقة. سنوضح لك كيف يبدو صوت أريا لعملك تحديداً، ونجيب على أسئلتك، ونخطط لنشره إذا كان مناسباً.',
    bookTitle: 'احجز مكالمة استكشافية',
    hint: '↑ انقر للتحدث مع أريا والحجز',
    connectingText: 'جارٍ الاتصال بأريا…',
    listeningText: 'أريا تستمع',
    retryText: 'فشل الاتصال — اضغط للمحاولة مجدداً',
    noCommit: 'لا التزام مطلوب. نقبل عدداً محدوداً من الشركات كل شهر.',
    formTitle: 'أو أرسل رسالة',
    labelName: 'الاسم الكامل',
    placeholderName: 'اسمك',
    labelEmail: 'البريد الإلكتروني',
    placeholderEmail: 'you@company.com',
    labelVolume: 'حجم المكالمات الشهري',
    volumeDefault: 'اختر الحجم',
    volumeOptions: ['أقل من 100 مكالمة/شهر', '100–500 مكالمة/شهر', '500–1,000 مكالمة/شهر', '1,000+ مكالمة/شهر'],
    labelMessage: 'الرسالة',
    placeholderMessage: 'أخبرنا قليلاً عن عملك وما تحتاجه...',
    sending: 'جارٍ الإرسال…',
    send: 'إرسال الرسالة',
    successTitle: 'تم استلام رسالتك.',
    successSub: 'سنتواصل معك خلال يوم عمل واحد.',
  },
};

export default function ContactPage({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const clientRef = useRef<RetellWebClient | null>(null);

  const t = content[lang];
  const isRTL = lang === 'ar';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    if (WEB3FORMS_KEY) {
      data.append('access_key', WEB3FORMS_KEY);
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
    } else {
      await new Promise(r => setTimeout(r, 1000));
    }

    setLoading(false);
    setSubmitted(true);
  }

  async function startBookingCall() {
    if (callStatus !== 'idle' && callStatus !== 'error') return;
    setCallStatus('connecting');
    try {
      const res = await fetch(`${WORKER}?lang=${lang}`, { method: 'POST' });
      if (!res.ok) throw new Error('Worker error');
      const data = await res.json();
      const client = new RetellWebClient();
      clientRef.current = client;
      client.on('call_started', () => setCallStatus('active'));
      client.on('call_ended', () => { setCallStatus('idle'); clientRef.current = null; setIsMuted(false); });
      client.on('error', () => setCallStatus('error'));
      await client.startCall({ accessToken: data.access_token });
    } catch {
      setCallStatus('error');
    }
  }

  function endCall() {
    clientRef.current?.stopCall();
    clientRef.current = null;
    setCallStatus('idle');
    setIsMuted(false);
  }

  function toggleMute() {
    if (!clientRef.current) return;
    isMuted ? clientRef.current.unmute() : clientRef.current.mute();
    setIsMuted(!isMuted);
  }

  const isActive = callStatus === 'active';

  return (
    <div className="bg-black min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero — lamp */}
      <div className="relative w-full overflow-hidden flex flex-col items-center" style={{ marginTop: '80px' }}>

        {/* Beams + tube — absolute background layer, 300px tall */}
        <div className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none overflow-hidden">
          <motion.div
            initial={{ opacity: 0.3, width: '10rem' }}
            whileInView={{ opacity: 1, width: '30rem' }}
            transition={{ delay: 0.2, duration: 0.9, ease: 'easeInOut' }}
            style={{ backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))' }}
            className="absolute top-0 right-1/2 h-[300px] bg-gradient-conic from-orange-500 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
          />
          <motion.div
            initial={{ opacity: 0.3, width: '10rem' }}
            whileInView={{ opacity: 1, width: '30rem' }}
            transition={{ delay: 0.2, duration: 0.9, ease: 'easeInOut' }}
            style={{ backgroundImage: 'conic-gradient(var(--conic-position), var(--tw-gradient-stops))' }}
            className="absolute top-0 left-1/2 h-[300px] bg-gradient-conic from-transparent via-transparent to-orange-500 [--conic-position:from_290deg_at_center_top]"
          />
          {/* Tube glow halo */}
          <motion.div
            initial={{ width: '8rem', opacity: 0 }}
            whileInView={{ width: '40rem', opacity: 0.7 }}
            transition={{ delay: 0.2, duration: 0.9, ease: 'easeInOut' }}
            className="absolute top-0 left-1/2 -translate-x-1/2 h-4 rounded-full bg-orange-500 blur-lg"
          />
          {/* Tube bar */}
          <motion.div
            initial={{ width: '8rem', opacity: 0 }}
            whileInView={{ width: '40rem', opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: 'easeInOut' }}
            className="absolute top-[3px] left-1/2 -translate-x-1/2 h-[3px] rounded-full bg-gradient-to-r from-orange-700 via-amber-200 to-orange-700"
            style={{ boxShadow: '0 0 10px 2px rgba(251,191,36,0.9), 0 0 28px 6px rgba(234,88,12,0.6)' }}
          />
        </div>

        {/* Text — normal flow, padded so it sits under the tube */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: 'easeInOut' }}
          className="relative z-10 text-center max-w-3xl px-6 pt-20 pb-16"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-4 inline-block">{t.badge}</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t.heading1}{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">ARIA</span>
            {' '}{t.heading2}
          </h1>
          <p className="text-neutral-400 leading-relaxed">{t.sub}</p>
        </motion.div>
      </div>

      <section className="pb-24 px-6 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Booking — Spline robot + Retell */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? 16 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-white mb-6">{t.bookTitle}</h2>

          <div
            className="relative w-full min-h-[480px] rounded-2xl overflow-hidden cursor-pointer group"
            style={{ border: '1px solid rgba(255,255,255,0.05)' }}
            onClick={callStatus === 'idle' || callStatus === 'error' ? startBookingCall : undefined}
          >
            {/* Spline robot */}
            <div className="absolute inset-0">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full scale-110 transform-gpu origin-center [&_a]:!hidden"
              />
            </div>

            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            {/* Idle hint */}
            <AnimatePresence>
              {callStatus === 'idle' && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute bottom-0 inset-x-0 flex flex-col items-center pb-8 pointer-events-none"
                >
                  <p className="text-[11px] font-mono uppercase tracking-widest text-orange-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {t.hint}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {callStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute bottom-6 inset-x-0 text-center pointer-events-none"
                >
                  <p className="text-xs text-red-400 font-mono">{t.retryText}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connecting */}
            <AnimatePresence>
              {callStatus === 'connecting' && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 pointer-events-none"
                >
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} className="w-2 h-2 rounded-full bg-orange-400"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                    ))}
                  </div>
                  <p className="text-xs font-mono text-orange-300 uppercase tracking-widest">{t.connectingText}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-0 inset-x-0 flex flex-col items-center gap-4 pb-6"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-end gap-1 h-8">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.div key={i} className="w-1.5 rounded-full bg-gradient-to-t from-orange-600 to-amber-400"
                        animate={{ height: [4, 16 + (i % 3) * 8, 4] }}
                        transition={{ duration: 0.5 + i * 0.05, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
                    ))}
                  </div>
                  <p className="text-xs font-mono text-orange-300 uppercase tracking-widest">{t.listeningText}</p>
                  <div className="flex gap-3">
                    <button onClick={toggleMute}
                      className="flex items-center justify-center w-10 h-10 rounded-full border transition-all"
                      style={{
                        background: isMuted ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.08)',
                        borderColor: isMuted ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.15)',
                        color: isMuted ? '#ef4444' : '#9ca3af',
                      }}>
                      {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                    <button onClick={endCall}
                      className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all hover:scale-105"
                      style={{ background: 'linear-gradient(135deg, #c2410c, #ea580c)' }}>
                      <PhoneOff className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs text-neutral-600 font-mono text-center mt-4">{t.noCommit}</p>
        </motion.div>

        {/* Contact form — glass + gradient tracing */}
        <motion.div
          initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-white mb-6">{t.formTitle}</h2>

          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
              <CheckCircle className="w-12 h-12 text-orange-400" />
              <h3 className="text-white font-semibold text-lg">{t.successTitle}</h3>
              <p className="text-neutral-400 text-sm">{t.successSub}</p>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden">
              {/* Glass background */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(234,88,12,0.04) 50%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              />

              {/* Gradient tracing borders */}
              <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none" style={{ zIndex: 1 }}>
                <GradientTracing width={480} height={2} path="M0,1 L480,1"
                  gradientColors={['#ea580c', '#fbbf24', '#ea580c']} animationDuration={2.5} strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none" style={{ zIndex: 1 }}>
                <GradientTracing width={480} height={2} path="M0,1 L480,1"
                  gradientColors={['#9E00FF', '#ea580c', '#9E00FF']} animationDuration={3.5} strokeWidth={1} />
              </div>
              <div className="absolute top-0 bottom-0 left-0 pointer-events-none" style={{ zIndex: 1, width: 2 }}>
                <GradientTracing width={2} height={600} path="M1,0 L1,600"
                  gradientColors={['#ea580c', '#f97316', '#fbbf24']} animationDuration={4} strokeWidth={1.5} />
              </div>
              <div className="absolute top-0 bottom-0 right-0 pointer-events-none" style={{ zIndex: 1, width: 2 }}>
                <GradientTracing width={2} height={600} path="M1,0 L1,600"
                  gradientColors={['#fbbf24', '#ea580c', '#9E00FF']} animationDuration={3} strokeWidth={1.5} />
              </div>

              {/* Ambient glow */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(234,88,12,0.08) 0%, transparent 60%)' }} />

              <form onSubmit={handleSubmit} className="relative z-10 p-6 space-y-4">
                {[
                  { name: 'name', label: t.labelName, type: 'text', placeholder: t.placeholderName },
                  { name: 'email', label: t.labelEmail, type: 'email', placeholder: t.placeholderEmail },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1.5 block">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-orange-500/40 focus:bg-orange-500/5 transition-all"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1.5 block">
                    {t.labelVolume}
                  </label>
                  <select
                    name="volume"
                    className="w-full border border-white/10 rounded-xl px-4 py-3 text-neutral-400 text-sm focus:outline-none focus:border-orange-500/40 transition-all appearance-none"
                    style={{ background: '#0d0d0d' }}
                  >
                    <option value="" style={{ background: '#0d0d0d' }}>{t.volumeDefault}</option>
                    {t.volumeOptions.map(opt => (
                      <option key={opt} style={{ background: '#0d0d0d' }}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1.5 block">
                    {t.labelMessage}
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder={t.placeholderMessage}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-orange-500/40 focus:bg-orange-500/5 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm overflow-hidden group hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-60"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500 group-hover:from-orange-500 group-hover:to-amber-400 transition-all duration-300" />
                  <span className="relative">{loading ? t.sending : t.send}</span>
                  <Send className="relative w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
