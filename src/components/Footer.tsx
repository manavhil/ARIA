'use client'

import { Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  lang: 'en' | 'ar';
}

export function Footer({ lang }: FooterProps) {
  const content = {
    en: {
      tagline: 'The AI voice agent that answers every call, books every appointment, and keeps your business running — 24/7.',
      links: [
        {
          name: 'Product',
          items: [
            { label: 'Services', href: '/services' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'About', href: '/about' },
          ],
        },
        {
          name: 'Support',
          items: [
            { label: 'FAQ', href: '/faq' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          name: 'Legal',
          items: [
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Privacy Policy', href: '/privacy' },
          ],
        },
      ],
      copyright: '© 2025 ARIA. All rights reserved.',
    },
    ar: {
      tagline: 'وكيل صوتي بالذكاء الاصطناعي يرد على كل مكالمة ويحجز كل موعد — على مدار الساعة.',
      links: [
        {
          name: 'المنتج',
          items: [
            { label: 'الخدمات', href: '/services' },
            { label: 'الأسعار', href: '/pricing' },
            { label: 'من نحن', href: '/about' },
          ],
        },
        {
          name: 'الدعم',
          items: [
            { label: 'الأسئلة الشائعة', href: '/faq' },
            { label: 'تواصل معنا', href: '/contact' },
          ],
        },
        {
          name: 'قانوني',
          items: [
            { label: 'شروط الخدمة', href: '/terms' },
            { label: 'سياسة الخصوصية', href: '/privacy' },
          ],
        },
      ],
      copyright: '© 2025 آريا. جميع الحقوق محفوظة.',
    },
  };

  const t = content[lang];

  return (
    <footer
      className="w-full bg-black border-t border-white/5 pt-16 pb-10"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand */}
        <div className="flex flex-col gap-5">
          <Link to="/" className="flex items-center">
            <img src="/ARIA_LOGO.png" alt="ARIA" style={{ height: '80px', width: 'auto' }} />
          </Link>
          <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">{t.tagline}</p>
          <div className="flex items-center gap-4 text-neutral-500">
            <Twitter className="w-5 h-5 hover:text-orange-400 cursor-pointer transition-colors" />
            <Linkedin className="w-5 h-5 hover:text-orange-400 cursor-pointer transition-colors" />
            <Mail className="w-5 h-5 hover:text-orange-400 cursor-pointer transition-colors" />
          </div>
        </div>

        {/* Link columns */}
        {t.links.map((group) => (
          <div key={group.name} className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-xs tracking-widest uppercase">{group.name}</h4>
            <ul className="flex flex-col gap-3">
              {group.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-neutral-500 text-sm hover:text-orange-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-neutral-600 text-xs">{t.copyright}</p>
        <div className="flex items-center gap-6 text-neutral-600 text-xs">
          <Link to="/terms" className="hover:text-white transition-colors">
            {lang === 'en' ? 'Terms' : 'الشروط'}
          </Link>
          <Link to="/privacy" className="hover:text-white transition-colors">
            {lang === 'en' ? 'Privacy' : 'الخصوصية'}
          </Link>
          <Link to="/faq" className="hover:text-white transition-colors">
            {lang === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
          </Link>
          <Link to="/contact" className="hover:text-white transition-colors">
            {lang === 'en' ? 'Contact' : 'تواصل معنا'}
          </Link>
        </div>
      </div>
    </footer>
  );
}
