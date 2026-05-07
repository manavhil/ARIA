'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

interface HeaderProps {
  lang: 'en' | 'ar';
  onToggleLang: () => void;
}

const navItems = {
  en: [
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ],
  ar: [
    { name: 'الخدمات', href: '/services' },
    { name: 'الأسعار', href: '/pricing' },
    { name: 'من نحن', href: '/about' },
    { name: 'تواصل معنا', href: '/contact' },
  ],
};

function NavItem({ name, href, onClick }: { name: string; href: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <NavLink
      to={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? '#ea580c' : undefined, transition: 'color 0.2s' }}
      className={({ isActive }) =>
        `text-sm ${isActive ? '' : 'text-neutral-400'}`
      }
    >
      {name}
    </NavLink>
  );
}

const btnIdle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#e5e5e5',
  transition: 'background 0.3s, border-color 0.3s, color 0.3s',
};
const btnActive: React.CSSProperties = {
  background: '#c2410c',
  border: '1px solid #c2410c',
  color: '#fff',
  transition: 'background 0.3s, border-color 0.3s, color 0.3s',
};

export function Header({ lang, onToggleLang }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/5"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/ARIA_LOGO.png" alt="ARIA" style={{ height: '120px', width: 'auto' }} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems[lang].map((item) => (
            <NavItem key={item.href} name={item.name} href={item.href} />
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-xs text-neutral-400 hover:text-white"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>

          <Link
            to="/contact"
            className="hidden md:block px-5 py-2 text-sm font-semibold rounded-full"
            style={btnHovered ? btnActive : btnIdle}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            {lang === 'en' ? 'Get Started' : 'ابدأ الآن'}
          </Link>

          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-black border-b border-white/10 md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems[lang].map((item) => (
                <NavItem key={item.href} name={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} />
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 w-full py-3 rounded-xl text-center text-sm font-semibold"
                style={btnIdle}
              >
                {lang === 'en' ? 'Get Started' : 'ابدأ الآن'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
