import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Acceptance of Terms',
    body: 'By engaging ARIA\'s services — whether through a discovery call, onboarding agreement, or ongoing retainer — you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not proceed with our services. These terms apply to all clients, prospective clients, and users who interact with our website or services.',
  },
  {
    title: 'Services',
    body: 'ARIA provides AI voice agent services including inbound call handling, outbound call automation, appointment booking, lead qualification, and related automations. The specific scope of services is defined in your individual service agreement or onboarding documentation. We reserve the right to modify or discontinue any feature of the service with reasonable notice. Service availability is subject to third-party infrastructure providers, and we do not guarantee uninterrupted availability.',
  },
  {
    title: 'Payment & Cancellation',
    body: 'Services are provided on the basis of a one-time setup fee and a monthly retainer. The setup fee is non-refundable upon completion of the agent build, as it covers material work performed by our team. The monthly retainer is billed in advance and may be cancelled at any time with 30 days written notice — no penalty, no lock-in. Refunds for partially used retainer periods are issued at our discretion. Overdue accounts may result in service suspension until payment is received.',
  },
  {
    title: 'Client Obligations',
    body: 'You agree to provide accurate and complete information during onboarding, including business details, scheduling system access, and any other information required to build and operate your agent. You are responsible for ensuring that your use of ARIA\'s services complies with all applicable laws in your jurisdiction, including consumer protection, telecommunications, and data privacy regulations. You agree not to use ARIA\'s services for any unlawful purpose or in any way that could damage our reputation or the reputation of our technology partners.',
  },
  {
    title: 'Intellectual Property',
    body: 'All agent builds, configurations, scripts, and workflows created by ARIA remain the intellectual property of ARIA until full payment of the applicable setup fee has been received. Upon full payment, the client-specific training data and call scripts become the property of the client. ARIA retains the right to use anonymised, aggregated data derived from call interactions to improve its services. Our brand, website content, methodologies, and templates remain the exclusive property of ARIA at all times.',
  },
  {
    title: 'Limitation of Liability',
    body: 'ARIA\'s services are provided "as is." We make no warranties, express or implied, regarding the accuracy of AI-generated responses, booking outcomes, or revenue results. In no event shall ARIA be liable for any indirect, incidental, special, or consequential damages — including lost revenue or business opportunities — arising from the use of our services, even if we have been advised of the possibility of such damages. Our total cumulative liability to you for any claims arising under this agreement shall not exceed the total fees paid to us in the three months preceding the claim.',
  },
  {
    title: 'Governing Law',
    body: 'These Terms of Service are governed by and construed in accordance with applicable commercial law. Any disputes arising from these terms or our services shall first be subject to good-faith negotiation. If unresolved, disputes shall be settled by binding arbitration. Nothing in this agreement excludes statutory rights that cannot be waived by contract.',
  },
  {
    title: 'Changes to These Terms',
    body: 'We reserve the right to update these terms at any time. We will notify active clients of material changes with at least 14 days notice via email. Continued use of our services after the effective date of any changes constitutes acceptance of the updated terms. The most current version of these terms is always available on our website.',
  },
  {
    title: 'Contact',
    body: 'For questions about these Terms of Service, please reach out through our contact page. We aim to respond to all legal enquiries within two business days.',
  },
];

export default function TermsPage() {
  return (
    <div className="bg-black min-h-screen">
      <section className="pt-36 pb-16 px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-4 inline-block">Legal</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-neutral-500 text-sm font-mono">Effective date: January 1, 2025</p>
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
          <p className="text-neutral-600 text-xs font-mono">Have a question about these terms?</p>
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
