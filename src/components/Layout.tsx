import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  lang: 'en' | 'ar';
  setLang: (l: 'en' | 'ar') => void;
}

export default function Layout({ children, lang, setLang }: LayoutProps) {
  return (
    <div className={`grain-effect ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Header lang={lang} onToggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')} />
      <main>{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
