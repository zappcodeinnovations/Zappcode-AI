import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import SolutionOverview from './components/SolutionOverview';
import HowItWorksLight from './components/HowItWorksLight';
import BusinessImpact from './components/BusinessImpact';
import UseCases from './components/UseCases';
// import Integration from './components/Integration';
// import BrandStory from './components/BrandStory';
// import SocialProof from './components/SocialProof';
// import VisionCTA from './components/VisionCTA';
import WhyZappcode from './components/WhyZappcode';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';


import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
// import AgentScrollSection from './components/AgentScrollSection';
import AgentsSection from './components/AgentsSection';

function ScrollProgress() {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            setWidth(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}



/* ── CTA Section Divider ── */
export function CTADivider({ headline, sub, btnText, btnHref, icon: Icon, variant = 'gradient' }: {
    headline: string;
    sub: string;
    btnText: string;
    btnHref: string;
    icon: typeof Sparkles;
    variant?: 'gradient' | 'dark' | 'blue';
}) {
    const ref = useRef<HTMLDivElement>(null);
    // const _inView = useInView(ref, { once: true, margin: '-60px' });

    const bgStyles: Record<string, React.CSSProperties> = {
        gradient: {
            background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 50%, #0F172A 100%)',
        },
        dark: {
            background: '#0F172A',
        },
        blue: {
            background: 'linear-gradient(135deg, #1e3a8a 0%, #2563EB 50%, #1e3a8a 100%)',
        },
    };

    return (
        <div ref={ref} className="noise-overlay" style={{
            ...bgStyles[variant],
            position: 'relative', overflow: 'hidden',
            padding: 'clamp(48px, 6vw, 72px) clamp(24px, 5vw, 64px)',
        }}>
            {/* Top glow line */}
            <div style={{
                position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
                background: variant === 'blue'
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)',
            }} />
            {/* Bottom glow line */}
            <div style={{
                position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px',
                background: variant === 'blue'
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)',
            }} />
            {/* Background orb */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px', height: '400px', borderRadius: '50%',
                background: variant === 'blue'
                    ? 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
                filter: 'blur(40px)', pointerEvents: 'none',
            }} />

            <div className="relative z-10 max-w-225 mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
                {/* Icon */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        width: '56px', height: '56px', borderRadius: '16px',
                        background: variant === 'blue' ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.12)',
                        border: `1px solid ${variant === 'blue' ? 'rgba(255,255,255,0.15)' : 'rgba(37,99,235,0.2)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Icon size={24} style={{ color: variant === 'blue' ? '#fff' : '#60a5fa' }} />
                </motion.div>

                {/* Text */}
                <div style={{ flex: 1, textAlign: 'center', minWidth: 0 }} className="md:text-left">
                    <motion.h3
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                            color: '#f1f5f9', lineHeight: 1.2,
                            margin: '0 0 6px',
                        }}
                    >{headline}</motion.h3>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '12px', color: '#cbd5e1', fontWeight: 500, letterSpacing: '0.04em', margin: 0,
                        }}
                    >{sub}</motion.p>
                </div>

                {/* CTA Button */}
                <motion.a
                    href={btnHref}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={variant === 'blue' ? 'cta-divider-btn-white' : 'btn-primary'}
                    style={{
                        flexShrink: 0, whiteSpace: 'nowrap', textDecoration: 'none',
                        ...(variant === 'blue' ? {
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            padding: '14px 28px', borderRadius: '14px',
                            background: '#fff', color: '#1e3a8a',
                            fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                            border: 'none', cursor: 'pointer',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                        } : {}),
                    }}
                >
                    {btnText} <ArrowRight size={14} />
                </motion.a>
            </div>
        </div>
    );
}

const AboutUsPage = React.lazy(() => import('./pages/AboutUsPage'));
const ContactUsPage = React.lazy(() => import('./pages/ContactUsPage'));
const AgentsPage = React.lazy(() => import('./pages/AgentsPage'));
const BookDemoPage = React.lazy(() => import('./pages/BookDemoPage'));

const SolutionHowItWorksPage = React.lazy(() => import('./pages/SolutionHowItWorksPage'));
const SolutionDemandForecastingPage = React.lazy(() => import('./pages/SolutionDemandForecastingPage'));
const SolutionErpIntegrationPage = React.lazy(() => import('./pages/SolutionErpIntegrationPage'));

function HomePage() {
    return (
        <main>
            <Hero />
            <ProblemStatement />
            <SolutionOverview />
            <HowItWorksLight />
            <AgentsSection />
            <UseCases />
            <BusinessImpact />
            <WhyZappcode />
            <FinalCTA />
            <Footer />
        </main>
    );
}

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
}

function App() {
    return (
        <>
            <ScrollProgress />

            <ScrollToTop />
            <Suspense fallback={<div className="h-[100svh] w-full bg-[#0D1B2A] flex items-center justify-center"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>}>
                <Routes>
                    <Route path="/"        element={<HomePage />} />
                    <Route path="/about"   element={<AboutUsPage />} />
                    <Route path="/contact" element={<ContactUsPage />} />
                    <Route path="/agents"  element={<AgentsPage />} />
                    <Route path="/book-demo" element={<BookDemoPage />} />
                    
                    <Route path="/solution/how-it-works" element={<SolutionHowItWorksPage />} />
                    <Route path="/solution/demand-forecasting" element={<SolutionDemandForecastingPage />} />
                    <Route path="/solution/erp-integration" element={<SolutionErpIntegrationPage />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
