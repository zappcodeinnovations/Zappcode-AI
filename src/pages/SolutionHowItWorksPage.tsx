import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CTADivider } from '../App';
import { ChevronRight, Sparkles, Plug, Settings, Sprout } from 'lucide-react';

const AnimatedCurvedLine = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

    const isActive1 = useTransform(smoothProgress, (p) => p > 0.15);
    const isActive2 = useTransform(smoothProgress, (p) => p > 0.5);
    const isActive3 = useTransform(smoothProgress, (p) => p > 0.85);

    const [a1, setA1] = useState(false);
    const [a2, setA2] = useState(false);
    const [a3, setA3] = useState(false);

    useEffect(() => {
        return isActive1.on("change", setA1);
    }, [isActive1]);
    useEffect(() => {
        return isActive2.on("change", setA2);
    }, [isActive2]);
    useEffect(() => {
        return isActive3.on("change", setA3);
    }, [isActive3]);

    return (
        <div ref={containerRef} className="relative w-full py-20 flex flex-col items-center">
            {/* SVG Curved Line (Desktop) */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
                <svg className="w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2563EB" />
                            <stop offset="50%" stopColor="#F97316" />
                            <stop offset="100%" stopColor="#0EA5E9" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 500,0 C 500,200 150,200 150,400 C 150,600 850,600 850,800"
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="4 8"
                        opacity="0.2"
                    />
                    <motion.path
                        d="M 500,0 C 500,200 150,200 150,400 C 150,600 850,600 850,800"
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        style={{ pathLength }}
                    />
                </svg>
            </div>

            {/* Vertical Line (Mobile) */}
            <div className="block lg:hidden absolute top-0 bottom-0 left-[24px] w-1 bg-slate-200 z-0" />
            <motion.div 
                className="block lg:hidden absolute top-0 left-[24px] w-1 bg-gradient-to-b from-blue-600 via-orange-500 to-cyan-500 z-0 origin-top"
                style={{ scaleY: pathLength, height: '100%' }}
            />

            <div className="w-full max-w-5xl relative z-10 flex flex-col gap-24 lg:gap-32">
                {/* Step 1 */}
                <div className="flex flex-col lg:flex-row items-center justify-center relative w-full lg:translate-x-[-150px]">
                    <div className="relative">
                        {/* Glow Halo */}
                        <div className={`absolute -inset-6 rounded-full blur-xl transition-all duration-700 ${a1 ? 'bg-blue-500/40 scale-100 opacity-100' : 'bg-transparent scale-50 opacity-0'}`} />
                        
                        <div className="w-[350px] md:w-[450px] bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl relative overflow-hidden group">
                            {/* Large Background Number */}
                            <div className="absolute -top-6 -right-6 text-[120px] font-black text-transparent opacity-10 group-hover:opacity-20 transition-opacity" style={{ WebkitTextStroke: '2px #2563EB' }}>01</div>
                            
                            <div className={`w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 border-2 transition-colors duration-500 ${a1 ? 'border-blue-500' : 'border-transparent'}`}>
                                <Plug className="text-blue-600 w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Adopt</h3>
                            <p className="text-slate-600 leading-relaxed relative z-10">
                                We connect Zappcode's AI agents to your current systems — no need to replace anything you already use.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col lg:flex-row items-center justify-center relative w-full lg:translate-x-[150px]">
                    <div className="relative">
                        {/* Glow Halo */}
                        <div className={`absolute -inset-6 rounded-full blur-xl transition-all duration-700 ${a2 ? 'bg-orange-500/40 scale-100 opacity-100' : 'bg-transparent scale-50 opacity-0'}`} />
                        
                        <div className="w-[350px] md:w-[450px] bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl relative overflow-hidden group">
                            {/* Large Background Number */}
                            <div className="absolute -top-6 -right-6 text-[120px] font-black text-transparent opacity-10 group-hover:opacity-20 transition-opacity" style={{ WebkitTextStroke: '2px #F97316' }}>02</div>
                            
                            <div className={`w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 border-2 transition-colors duration-500 ${a2 ? 'border-orange-500' : 'border-transparent'}`}>
                                <motion.div animate={a2 ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
                                    <Settings className="text-orange-500 w-7 h-7" />
                                </motion.div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Automate</h3>
                            <p className="text-slate-600 leading-relaxed relative z-10">
                                The AI agents start handling forecasting, pricing, and planning decisions — working around the clock without needing manual input.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col lg:flex-row items-center justify-center relative w-full lg:translate-x-[-150px]">
                    <div className="relative">
                        {/* Glow Halo */}
                        <div className={`absolute -inset-6 rounded-full blur-xl transition-all duration-700 ${a3 ? 'bg-cyan-500/40 scale-100 opacity-100' : 'bg-transparent scale-50 opacity-0'}`} />
                        
                        <div className="w-[350px] md:w-[450px] bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl relative overflow-hidden group">
                            {/* Large Background Number */}
                            <div className="absolute -top-6 -right-6 text-[120px] font-black text-transparent opacity-10 group-hover:opacity-20 transition-opacity" style={{ WebkitTextStroke: '2px #0EA5E9' }}>03</div>
                            
                            <div className={`w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 border-2 transition-colors duration-500 ${a3 ? 'border-cyan-500' : 'border-transparent'}`}>
                                <motion.div initial={{ scale: 0.5, y: 5 }} animate={a3 ? { scale: 1, y: 0 } : {}} transition={{ type: "spring" }}>
                                    <Sprout className="text-cyan-500 w-7 h-7" />
                                </motion.div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Evolve</h3>
                            <p className="text-slate-600 leading-relaxed relative z-10">
                                The system keeps learning and improving every day, so it gets smarter and more accurate over time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function SolutionHowItWorksPage() {
    return (
        <div className="bg-[#F8FAFC] min-h-screen flex flex-col">
            <Navbar />
            
            <main className="flex-grow overflow-hidden relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative">
                    {/* Animated Asymmetrical Gradient Blob */}
                    <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
                        <motion.div 
                            animate={{ scale: [1, 1.08, 1], rotate: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                            className="w-[800px] h-[600px] bg-gradient-to-tr from-blue-400/20 to-orange-400/20 rounded-[40%_60%_70%_30%] blur-[80px] -translate-x-1/4 -translate-y-1/4 mix-blend-multiply"
                        />
                    </div>

                    <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                        {/* Breadcrumbs */}
                        <div className="flex items-center justify-center md:justify-start gap-2 text-[13px] font-medium text-slate-500 mb-12">
                            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
                            <ChevronRight size={14} />
                            <span className="hover:text-orange-500 cursor-default transition-colors">Solution</span>
                            <ChevronRight size={14} />
                            <span className="text-slate-900 font-bold">How it Works</span>
                        </div>

                        <div className="text-center">
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block font-mono text-[13px] font-bold tracking-[0.2em] text-orange-500 mb-6 uppercase bg-orange-50 px-4 py-1.5 rounded-full"
                        >
                            THE PROCESS
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-serif text-5xl md:text-6xl lg:text-7xl text-slate-900 font-bold mb-6 max-w-4xl mx-auto leading-[1.1] tracking-tight"
                        >
                            Getting Started Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">Simple</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-600 max-w-2xl mx-auto font-medium"
                        >
                            Three easy steps to turn scattered data into strategic decisions — no complex overhaul, no lengthy IT projects.
                        </motion.p>
                        </div>
                    </div>
                </section>

                {/* Animated 3-Step Section */}
                <section className="relative">
                    <AnimatedCurvedLine />
                </section>

                {/* Deployment Info Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center relative my-16 px-6"
                >
                    <div className="relative p-[2px] rounded-full overflow-hidden w-full max-w-4xl shadow-xl shadow-blue-900/5">
                        {/* Continuous Rotating Gradient Background for Border */}
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,var(--color-blue),var(--color-orange),var(--color-cyan),var(--color-blue))] animate-[spin_4s_linear_infinite]" style={{ '--color-blue': '#2563EB', '--color-orange': '#F97316', '--color-cyan': '#0EA5E9' } as React.CSSProperties} />
                        
                        {/* Inner Content Area */}
                        <div className="relative bg-white rounded-full py-5 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 w-full h-full">
                            <div className="flex items-center gap-3">
                                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                <span className="text-[15px] font-bold text-slate-800">Avg. deployment time</span>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-slate-200"></div>
                            <div className="flex items-center gap-3">
                                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }} className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                <span className="text-[15px] font-bold text-slate-800">Zero disruption to current setup</span>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-slate-200"></div>
                            <div className="flex items-center gap-3">
                                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1.2 }} className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
                                <span className="text-[15px] font-bold text-slate-800">Works 24/7</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Timeline Section */}
                <section className="py-20 md:py-24 relative">
                    <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                        <div className="text-center mb-16 md:mb-20">
                            <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold mb-4">
                                Deployment Timeline
                            </h2>
                        </div>
                        
                        {/* DESKTOP TIMELINE */}
                        <div className="hidden md:grid grid-rows-[1fr_auto_1fr] grid-cols-3 gap-x-8 max-w-5xl mx-auto relative">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-slate-200 -translate-y-1/2"></div>
                            
                            {/* Column 1: Week 1 */}
                            <div className="col-start-1 row-start-1 flex items-end pb-8">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.8 }}
                                    className="w-full relative"
                                >
                                    <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-[0_10px_30px_rgba(37,99,235,0.1)]">
                                        <h3 className="font-bold text-blue-600 mb-2 text-lg">Week 1</h3>
                                        <p className="text-sm text-slate-600">We connect to your existing systems and map your data sources.</p>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-blue-100 rotate-45"></div>
                                </motion.div>
                            </div>
                            <div className="col-start-1 row-start-2 flex justify-center py-2">
                                <div className="w-12 h-12 rounded-full bg-blue-600 border-[6px] border-[#F8FAFC] shadow-lg flex items-center justify-center relative z-10">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>

                            {/* Column 2: Week 2-3 */}
                            <div className="col-start-2 row-start-2 flex justify-center py-2">
                                <div className="w-12 h-12 rounded-full bg-orange-500 border-[6px] border-[#F8FAFC] shadow-lg flex items-center justify-center relative z-10">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div className="col-start-2 row-start-3 flex items-start pt-8">
                                <motion.div 
                                    initial={{ opacity: 0, y: -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.8 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-full relative"
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-orange-100 rotate-45"></div>
                                    <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-[0_10px_30px_rgba(249,115,22,0.1)]">
                                        <h3 className="font-bold text-orange-600 mb-2 text-lg">Week 2-3</h3>
                                        <p className="text-sm text-slate-600">Agents are configured and trained on your historical data.</p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Column 3: Week 4+ */}
                            <div className="col-start-3 row-start-1 flex items-end pb-8">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.8 }}
                                    transition={{ delay: 0.4 }}
                                    className="w-full relative"
                                >
                                    <div className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-[0_10px_30px_rgba(14,165,233,0.1)]">
                                        <h3 className="font-bold text-cyan-600 mb-2 text-lg">Week 4+</h3>
                                        <p className="text-sm text-slate-600">You go live — agents start generating real recommendations.</p>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-cyan-100 rotate-45"></div>
                                </motion.div>
                            </div>
                            <div className="col-start-3 row-start-2 flex justify-center py-2">
                                <div className="w-12 h-12 rounded-full bg-cyan-500 border-[6px] border-[#F8FAFC] shadow-lg flex items-center justify-center relative z-10">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        {/* MOBILE TIMELINE */}
                        <div className="md:hidden flex flex-col gap-8 relative max-w-sm mx-auto">
                            {/* Vertical Line */}
                            <div className="absolute top-6 bottom-6 left-[23px] w-1 bg-slate-200 z-0"></div>
                            
                            {/* Week 1 */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-6 relative z-10"
                            >
                                <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600 border-[6px] border-[#F8FAFC] shadow-lg flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-lg w-full">
                                    <h3 className="font-bold text-blue-600 mb-1">Week 1</h3>
                                    <p className="text-sm text-slate-600">We connect to your existing systems and map your data sources.</p>
                                </div>
                            </motion.div>

                            {/* Week 2-3 */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="flex items-start gap-6 relative z-10"
                            >
                                <div className="w-12 h-12 shrink-0 rounded-full bg-orange-500 border-[6px] border-[#F8FAFC] shadow-lg flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-orange-100 shadow-lg w-full">
                                    <h3 className="font-bold text-orange-600 mb-1">Week 2-3</h3>
                                    <p className="text-sm text-slate-600">Agents are configured and trained on your historical data.</p>
                                </div>
                            </motion.div>

                            {/* Week 4+ */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="flex items-start gap-6 relative z-10"
                            >
                                <div className="w-12 h-12 shrink-0 rounded-full bg-cyan-500 border-[6px] border-[#F8FAFC] shadow-lg flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                                <div className="bg-white p-5 rounded-xl border border-cyan-100 shadow-lg w-full">
                                    <h3 className="font-bold text-cyan-600 mb-1">Week 4+</h3>
                                    <p className="text-sm text-slate-600">You go live — agents start generating real recommendations.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <CTADivider 
                    headline="Ready to see it yourself?"
                    sub="Let us show you how quickly you can start."
                    btnText="Book a Demo"
                    btnHref="/book-demo"
                    icon={Sparkles}
                    variant="blue"
                />
            </main>

            <Footer />
        </div>
    );
}
