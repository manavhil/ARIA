'use client';

import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Mail, Instagram } from 'lucide-react';

interface FooterProps {
  lang: 'en' | 'ar';
}

const content = {
  en: {
    tagline: 'The AI voice agent that answers every call, books every appointment, and keeps your business running — 24/7.',
    sections: [
      {
        label: 'Product',
        links: [
          { title: 'Services',  href: '/services' },
          { title: 'Pricing',   href: '/pricing' },
          { title: 'About',     href: '/about' },
          { title: 'Contact',   href: '/contact' },
        ],
      },
      {
        label: 'Company',
        links: [
          { title: 'About Us',  href: '/about' },
          { title: 'FAQ',       href: '/faq' },
          { title: 'Contact',   href: '/contact' },
        ],
      },
      {
        label: 'Legal',
        links: [
          { title: 'Terms of Service',  href: '/terms' },
          { title: 'Privacy Policy',    href: '/privacy' },
        ],
      },
    ],
    social: [
      { title: 'Twitter',   href: '#', Icon: Twitter },
      { title: 'LinkedIn',  href: '#', Icon: Linkedin },
      { title: 'Instagram', href: '#', Icon: Instagram },
      { title: 'Email',     href: 'mailto:hello@ariachatbot.com', Icon: Mail },
    ],
    copyright: `© ${new Date().getFullYear()} ARIA. All rights reserved.`,
    bottomLinks: [
      { title: 'Terms',   href: '/terms' },
      { title: 'Privacy', href: '/privacy' },
      { title: 'FAQ',     href: '/faq' },
      { title: 'Contact', href: '/contact' },
    ],
  },
  ar: {
    tagline: 'وكيل صوتي بالذكاء الاصطناعي يرد على كل مكالمة ويحجز كل موعد — على مدار الساعة.',
    sections: [
      {
        label: 'المنتج',
        links: [
          { title: 'الخدمات',    href: '/services' },
          { title: 'الأسعار',    href: '/pricing' },
          { title: 'من نحن',     href: '/about' },
          { title: 'تواصل معنا', href: '/contact' },
        ],
      },
      {
        label: 'الشركة',
        links: [
          { title: 'من نحن',     href: '/about' },
          { title: 'الأسئلة الشائعة', href: '/faq' },
          { title: 'تواصل معنا', href: '/contact' },
        ],
      },
      {
        label: 'قانوني',
        links: [
          { title: 'شروط الخدمة',      href: '/terms' },
          { title: 'سياسة الخصوصية',   href: '/privacy' },
        ],
      },
    ],
    social: [
      { title: 'تويتر',    href: '#', Icon: Twitter },
      { title: 'لينكدإن',  href: '#', Icon: Linkedin },
      { title: 'إنستغرام', href: '#', Icon: Instagram },
      { title: 'البريد',   href: 'mailto:hello@ariachatbot.com', Icon: Mail },
    ],
    copyright: `© ${new Date().getFullYear()} آريا. جميع الحقوق محفوظة.`,
    bottomLinks: [
      { title: 'الشروط',           href: '/terms' },
      { title: 'الخصوصية',         href: '/privacy' },
      { title: 'الأسئلة الشائعة',  href: '/faq' },
      { title: 'تواصل معنا',       href: '/contact' },
    ],
  },
};

/* ── Animated container ─────────────────────────────────────── */
type AnimatedContainerProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Footer ─────────────────────────────────────────────────── */
export function Footer({ lang }: FooterProps) {
  const t = content[lang];
  const isRtl = lang === 'ar';

  return (
    <footer
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative w-full bg-black border-t border-white/5 overflow-hidden"
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-16 pb-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 xl:gap-8">

          {/* Brand column */}
          <AnimatedContainer delay={0.05} className="flex flex-col gap-5 xl:col-span-1">
            <Link to="/" className="inline-block">
              <img src="/ARIA_LOGO.png" alt="ARIA" className="h-14 sm:h-16 w-auto" />
            </Link>
            <p className={`text-neutral-500 text-sm leading-relaxed max-w-xs ${isRtl ? 'font-arabic' : ''}`}>
              {t.tagline}
            </p>
            {/* Social icons */}
            <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {t.social.map(({ title, href, Icon }) => (
                <a
                  key={title}
                  href={href}
                  aria-label={title}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-neutral-500 hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </AnimatedContainer>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 xl:col-span-3">
            {t.sections.map((section, i) => (
              <AnimatedContainer key={section.label} delay={0.1 + i * 0.08}>
                <h4 className={`text-white font-semibold text-xs uppercase tracking-widest mb-4 ${isRtl ? 'font-arabic' : 'font-mono'}`}>
                  {section.label}
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        to={link.href}
                        className={`text-neutral-500 text-sm hover:text-orange-400 transition-colors duration-200 ${isRtl ? 'font-arabic' : ''}`}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <AnimatedContainer delay={0.35}>
            <p className={`text-neutral-600 text-xs ${isRtl ? 'font-arabic' : 'font-mono'}`}>
              {t.copyright}
            </p>
          </AnimatedContainer>

          <AnimatedContainer delay={0.4}>
            <div className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
              {t.bottomLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  className={`text-neutral-600 text-xs hover:text-orange-400 transition-colors duration-200 ${isRtl ? 'font-arabic' : ''}`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </AnimatedContainer>
        </div>

      </div>
    </footer>
  );
}
