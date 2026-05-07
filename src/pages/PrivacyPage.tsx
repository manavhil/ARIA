import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect information you provide directly to us during onboarding and through our contact form, including your name, email address, business name, and phone number. When ARIA handles calls on your behalf, call recordings, transcripts, and caller information are collected and processed to deliver the service. We also collect standard web analytics data (pages visited, referral source, device type) through our website.',
  },
  {
    title: 'How We Use Information',
    body: 'Information you provide is used to set up and operate your ARIA agent, communicate with you about your account, send service updates and call summaries, and improve our services. Call recordings and transcripts are used to train and optimise your agent, generate booking confirmations, and produce your monthly performance reports. We do not sell your personal information or your clients\' caller data to any third party.',
  },
  {
    title: 'Data Storage & Security',
    body: 'All data is stored on encrypted infrastructure. Call recordings and transcripts are retained for a rolling 12-month period unless a shorter retention period is agreed in writing. We implement access controls, audit logging, and encryption in transit and at rest. In the event of a data breach that affects your data, we will notify you within 72 hours of becoming aware of the incident.',
  },
  {
    title: 'Call Recordings & AI Processing',
    body: 'Calls handled by ARIA are processed by third-party AI providers including Retell AI. By using our services, you acknowledge that call audio is transmitted to and processed by these providers in accordance with their own data processing terms. We select partners who meet industry-standard security requirements. You are responsible for ensuring that your callers are appropriately notified that their calls may be recorded, as required by the telecommunications laws in your jurisdiction.',
  },
  {
    title: 'GDPR Rights (EU/UK Users)',
    body: 'If you are located in the European Economic Area or United Kingdom, you have the right to access, correct, or delete personal data we hold about you. You may also request data portability or object to certain processing. To exercise any of these rights, contact us through the contact page. We will respond within 30 days. Where we act as a data processor on behalf of your business, we will enter into a Data Processing Agreement (DPA) upon request.',
  },
  {
    title: 'HIPAA Compliance',
    body: 'For clients in the healthcare sector, ARIA is able to operate in a manner consistent with HIPAA requirements. A Business Associate Agreement (BAA) is available upon request and must be executed before ARIA handles any Protected Health Information (PHI). Call recordings containing PHI are handled with additional access restrictions and are not used for general model training. Clients in regulated industries are responsible for assessing whether our services meet their compliance obligations.',
  },
  {
    title: 'Third-Party Services',
    body: 'ARIA integrates with scheduling systems, CRM platforms, and communication tools on your behalf. These integrations are governed by the privacy policies of the respective third-party providers. We only access third-party systems with credentials you provide and only for the purposes of delivering the agreed service. We do not store third-party credentials beyond what is operationally necessary.',
  },
  {
    title: 'Cookies',
    body: 'Our website uses minimal cookies — primarily for session management and anonymous analytics. We do not use tracking cookies for advertising purposes. You may disable cookies in your browser settings; this will not affect your ability to use our services but may limit some website functionality.',
  },
  {
    title: 'Contact & Data Requests',
    body: 'For any privacy-related questions, data access requests, or to request deletion of your data, please reach out through our contact page. We aim to respond to all privacy requests within 5 business days.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="bg-black min-h-screen">
      <section className="pt-36 pb-16 px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-4 inline-block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-neutral-500 text-sm font-mono mb-2">Effective date: January 1, 2025</p>
          <p className="text-neutral-400 text-sm leading-relaxed">
            ARIA takes data privacy seriously. This policy explains what information we collect, how we use it, and what rights you have over it.
          </p>
        </motion.div>
      </section>

      <section className="pb-24 px-6 max-w-3xl mx-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent mb-12" />

        {sections.map((s, i) => (
          <motion.section
            key={i}
            className="mb-10"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
          >
            <h2 className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-3">{s.title}</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">{s.body}</p>
          </motion.section>
        ))}

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mt-12 mb-10" />

        <div className="flex flex-col gap-2">
          <p className="text-neutral-600 text-xs font-mono">Privacy questions or data requests?</p>
          <Link
            to="/contact"
            className="text-orange-400 text-sm hover:text-orange-300 transition-colors underline underline-offset-4"
          >
            Contact us →
          </Link>
        </div>
      </section>
    </div>
  );
}
