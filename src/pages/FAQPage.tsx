import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import CTABanner from '../components/CTABanner';

const faqs = [
  {
    q: 'Is this going to sound robotic to my clients?',
    a: 'No — and this is the concern we hear most often. The voice quality and conversational ability of ARIA\'s agents are at a level where most callers simply cannot tell they are speaking to an AI. More importantly, what clients dislike is not AI — it is not getting an answer. ARIA ensures they always do. You can hear the agent yourself on our discovery call before committing to anything.',
  },
  {
    q: 'How does ARIA book into our scheduling system?',
    a: 'We integrate ARIA directly with your scheduling system during the setup process. The agent checks live availability and books the appointment within the call. We support most major scheduling platforms — Jane App, Mindbody, Cliniko, Google Calendar, and others. If you are using something not on this list, we assess integration on a case-by-case basis.',
  },
  {
    q: 'What if a client asks something ARIA has not been trained on?',
    a: 'ARIA is trained to stay within its knowledge boundaries. If a question falls outside what it knows, it acknowledges this honestly and offers to have a team member follow up — it never guesses or fabricates information. We review call transcripts monthly and retrain the agent on any gaps we identify.',
  },
  {
    q: 'Does my team need to do anything to manage ARIA day to day?',
    a: 'No. ARIA is fully managed by our team. You do not log in to a platform. You do not retrain the agent. You do not manage integrations. You receive call summaries and booking notifications, and that is it. If anything needs updating — new services, pricing changes — you tell us and we handle it.',
  },
  {
    q: 'How quickly can ARIA go live?',
    a: 'Seven business days from the completion of your onboarding session. This covers the full build, training, integration, testing, and your sign-off walkthrough.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No. ARIA operates on a one-time setup fee and a monthly retainer. No long-term commitment required. We are confident enough in the results to operate month-to-month.',
  },
  {
    q: 'What happens if a client needs to speak to a human?',
    a: 'ARIA transfers the call immediately to the appropriate team member whenever a human is genuinely needed — complex questions, complaints, or any situation the agent identifies as requiring a person. The escalation is seamless and the client does not experience a gap in service quality.',
  },
  {
    q: 'Do we need to change our phone number?',
    a: 'No. ARIA connects to your existing business number via call forwarding. Your number stays the same — clients dial the same number they always have.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-white/8 ${open ? 'border-l-2 border-l-orange-500/60 pl-4' : ''} transition-all`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-white font-medium text-sm md:text-base leading-snug">{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 mt-0.5">
          <Plus className="w-4 h-4 text-orange-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-neutral-400 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  return (
    <div className="bg-black min-h-screen">
      <section className="pt-36 pb-16 px-6 max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-4 inline-block">FAQ</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Questions Worth Asking.</h1>
          <p className="text-neutral-400">Clear answers for business owners and managers who want to understand exactly what they are getting.</p>
        </motion.div>
      </section>

      <section className="pb-20 px-6 max-w-3xl mx-auto">
        <div className="divide-y divide-white/8">
          {faqs.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <FAQItem q={item.q} a={item.a} />
            </motion.div>
          ))}
        </div>
      </section>

      <CTABanner
        lang={lang}
        headline="Still have questions?"
        subline="The fastest way to get them answered is a 20-minute call."
        ctaLabel="Book a Free Call"
        note=""
      />
    </div>
  );
}
