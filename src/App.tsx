import { useState, useEffect, Component, type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import { AnimatePresence, motion } from 'motion/react';

/* ── Global error boundary — prevents white screen on any crash ── */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4 px-6 text-center">
          <img src="/ARIA_LOGO.png" alt="ARIA" style={{ height: 48 }} />
          <h2 className="text-white font-bold text-xl mt-4">Something went wrong</h2>
          <p className="text-neutral-500 text-sm max-w-sm">
            A component failed to load. This is usually caused by a WebGL or network issue.
          </p>
          <button
            onClick={() => { this.setState({ error: null }); window.location.reload(); }}
            className="mt-4 px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AnimatedRoutes({ lang, setLang }: { lang: 'en' | 'ar'; setLang: (l: 'en' | 'ar') => void }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<ErrorBoundary><HomePage lang={lang} toggleLang={() => setLang(lang === 'en' ? 'ar' : 'en')} /></ErrorBoundary>} />
          <Route path="/services" element={<ErrorBoundary><ServicesPage lang={lang} /></ErrorBoundary>} />
          <Route path="/pricing" element={<ErrorBoundary><PricingPage lang={lang} /></ErrorBoundary>} />
          <Route path="/about" element={<ErrorBoundary><AboutPage lang={lang} /></ErrorBoundary>} />
          <Route path="/case-studies" element={<ErrorBoundary><CaseStudiesPage lang={lang} /></ErrorBoundary>} />
          <Route path="/contact" element={<ErrorBoundary><ContactPage lang={lang} /></ErrorBoundary>} />
          <Route path="/faq" element={<ErrorBoundary><FAQPage lang={lang} /></ErrorBoundary>} />
          <Route path="/terms" element={<ErrorBoundary><TermsPage /></ErrorBoundary>} />
          <Route path="/privacy" element={<ErrorBoundary><PrivacyPage /></ErrorBoundary>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
    <BrowserRouter>
      <div className="dark bg-black min-h-screen text-white overflow-x-hidden">
        <AnimatePresence mode="wait">
          {showSplash ? (
            <motion.div
              key="splash"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="fixed inset-0 z-50"
            >
              <SplashScreen />
            </motion.div>
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Layout lang={lang} setLang={setLang}>
                <AnimatedRoutes lang={lang} setLang={setLang} />
              </Layout>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
    </ErrorBoundary>
  );
}
