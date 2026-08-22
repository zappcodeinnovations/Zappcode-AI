import { useEffect, useState } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';

import Hero from './components/Hero';
import ProblemStatement from './components/ProblemStatement';
import SolutionOverview from './components/SolutionOverview';
import HowItWorksLight from './components/HowItWorksLight';
import BusinessImpact from './components/BusinessImpact';
import UseCases from './components/UseCases';
import WhyZappcode from './components/WhyZappcode';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

import AgentsSection from './components/AgentsSection';

import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import AgentsPage from './pages/AgentsPage';
import BookDemoPage from './pages/BookDemoPage';

function ScrollProgress() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight =
                document.documentElement.scrollHeight - window.innerHeight;

            setWidth(
                scrollHeight > 0
                    ? (scrollTop / scrollHeight) * 100
                    : 0
            );
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <div
            className="scroll-progress"
            style={{ width: `${width}%` }}
        />
    );
}

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <>
            <ScrollProgress />
            <ScrollToTop />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/agents" element={<AgentsPage />} />
                <Route path="/book-demo" element={<BookDemoPage />} />
            </Routes>
        </>
    );
}

export default App;