import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CTADivider } from '../App';
import { ChevronRight, Sparkles, Target, RefreshCcw, Zap, Quote, Clock, TrendingUp } from 'lucide-react';
import forcastingImg from '../assets/forcasting.png';

const AnimatedChart = () => {
    return (
        <div className="w-full h-full bg-slate-900/80 rounded-2xl border border-slate-700 p-6 flex flex-col justify-end relative overflow-hidden backdrop-blur-md shadow-2xl">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-10 pointer-events-none">
                <div className="w-full h-px bg-cyan-500"></div>
                <div className="w-full h-px bg-cyan-500"></div>
                <div className="w-full h-px bg-cyan-500"></div>
                <div className="w-full h-px bg-cyan-500"></div>
            </div>
            
            {/* Animated SVG Line */}
            <svg viewBox="0 0 400 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(14,165,233,0.8)] overflow-visible">
                <motion.path
                    d="M 0,180 C 50,180 80,120 120,130 C 160,140 180,60 230,80 C 280,100 320,30 400,20"
                    fill="transparent"
                    stroke="#0EA5E9"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                />
                
                {/* Traveling Marker */}
                <motion.circle
                    r="6"
                    fill="#F97316"
                    className="drop-shadow-[0_0_10px_rgba(249,115,22,1)]"
                    animate={{
                        cx: [0, 120, 230, 400],
                        cy: [180, 130, 80, 20]
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </svg>
            
            <div className="absolute top-6 left-6 text-cyan-500/50 text-[10px] font-mono">
                LIVE FORECAST MODEL
            </div>

            <div className="absolute bottom-4 right-6 bg-slate-950/80 text-cyan-400 text-xs font-mono px-3 py-1.5 rounded-lg border border-cyan-500/50 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                    className="inline-block w-2 h-2 bg-cyan-400 rounded-full mr-2 shadow-[0_0_8px_rgba(14,165,233,1)]"
                />
                REAL-TIME ADJUSTMENT
            </div>
        </div>
    );
};

const SpotlightCard = ({ children, className }: any) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={`relative overflow-hidden ${className}`}
        >
            <div 
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 hidden md:block z-0"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(14,165,233,0.15), transparent 40%)`
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
};

const CircularMetric = ({ endValue }: { endValue: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const springValue = useSpring(0, { stiffness: 30, damping: 20 });
    
    useEffect(() => {
        if (inView) {
            springValue.set(endValue);
        }
    }, [inView, endValue, springValue]);

    const display = useTransform(springValue, (current) => Math.round(current));
    const pathLength = useTransform(springValue, [0, 100], [0, 1]);

    return (
        <div ref={ref} className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
            
            {/* SVG Progress Ring */}
            <svg className="w-full h-full absolute inset-0 -rotate-90 drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                <circle 
                    cx="50%" cy="50%" r="45%" 
                    fill="none" 
                    stroke="rgba(30,41,59,0.5)" 
                    strokeWidth="8" 
                />
                <motion.circle 
                    cx="50%" cy="50%" r="45%" 
                    fill="none" 
                    stroke="url(#ringGrad)" 
                    strokeWidth="8" 
                    strokeLinecap="round"
                    style={{ pathLength }}
                />
                <defs>
                    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0EA5E9" />
                        <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Text Value */}
            <div className="font-serif text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-orange-400 tracking-tighter">
                <motion.span>{display}</motion.span>%
            </div>
        </div>
    );
};

export default function SolutionDemandForecastingPage() {
    return (
        <div className="bg-[#0F172A] min-h-screen flex flex-col text-slate-300 font-sans relative overflow-hidden">
            <Navbar />
            
            <main className="flex-grow relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-0 md:pt-40 md:pb-32 relative overflow-hidden flex flex-col md:flex-row md:items-center min-h-[100vh] md:min-h-[750px]">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={forcastingImg} 
                            alt="Demand Forecast AI Dashboard" 
                            className="w-full h-full object-cover object-[80%_bottom] md:object-right-top"
                        />
                        {/* Gradient overlays to ensure text readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#0F172A]/90 to-transparent md:hidden" />
                        <div className="absolute inset-0 bg-[#0F172A]/40 hidden md:block" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent hidden md:block w-[80%]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
                    </div>

                    <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10 w-full text-center md:text-left flex flex-col justify-start md:justify-center flex-grow">
                        {/* Breadcrumbs */}
                        <div className="flex items-center justify-center md:justify-start gap-2 text-[13px] font-medium text-slate-400 mb-12">
                            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
                            <ChevronRight size={14} />
                            <span className="hover:text-cyan-400 cursor-default transition-colors">Solution</span>
                            <ChevronRight size={14} />
                            <span className="text-white font-bold">Demand Forecasting</span>
                        </div>

                        <div className="w-full md:w-[60%] lg:w-[55%] mx-auto md:mx-0 mt-4 md:mt-0 pb-64 md:pb-0">
                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 font-mono text-[13px] font-bold tracking-[0.2em] text-cyan-400 mb-8 uppercase border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 rounded-full backdrop-blur-md"
                            >
                                <Target size={16} /> CORE CAPABILITY
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="font-serif text-5xl md:text-5xl lg:text-6xl text-white font-bold mb-8 leading-[1.15] tracking-tight drop-shadow-lg"
                            >
                                Forecasting That Learns From <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Every Signal</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-slate-300 font-medium mb-12 max-w-lg mx-auto md:mx-0 drop-shadow-md"
                            >
                                Stop guessing what you'll sell. Zappcode's Forecast Agent reads history, seasonality, and real-time market shifts to predict demand — down to the SKU level.
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-8 sm:gap-6"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-blue-900/40 border border-blue-500/30 flex items-center justify-center backdrop-blur-md">
                                        <TrendingUp className="text-blue-400" size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold text-sm">AI-Powered</div>
                                        <div className="text-slate-400 text-xs">Adaptive Learning</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center backdrop-blur-md">
                                        <Clock className="text-purple-400" size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold text-sm">Real-Time</div>
                                        <div className="text-slate-400 text-xs">Market Signals</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-cyan-900/40 border border-cyan-500/30 flex items-center justify-center backdrop-blur-md">
                                        <Target className="text-cyan-400" size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold text-sm">SKU-Level</div>
                                        <div className="text-slate-400 text-xs">Accuracy</div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Explanation Section */}
                <section className="py-20 md:py-32 border-y border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                    <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <motion.div 
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                className="flex-1 space-y-6"
                            >
                                <h2 className="font-serif text-4xl text-white font-bold leading-tight">
                                    From Raw Data to Confident Predictions
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Our proprietary AI models don't just look at what happened last year. They analyze thousands of variables simultaneously, continuously learning and adjusting to give you the most accurate prediction possible.
                                </p>
                                <ul className="space-y-5 pt-6">
                                    {['Analyzes historical sales data and trends', 'Factors in external signals like weather and events', 'Continuously self-corrects based on real-time outcomes'].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className="mt-1 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center flex-shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)]" />
                                            </div>
                                            <span className="text-slate-300 text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                className="flex-1 w-full max-w-lg mx-auto h-[400px]"
                            >
                                <AnimatedChart />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Feature Cards */}
                <section className="py-24">
                    <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Target,
                                    title: "SKU-Level Accuracy",
                                    desc: "Get granular forecasts for every individual product across all your locations, not just high-level category averages."
                                },
                                {
                                    icon: RefreshCcw,
                                    title: "Self-Correcting Models",
                                    desc: "As new sales data flows in, the agent instantly evaluates its previous predictions and updates its algorithms."
                                },
                                {
                                    icon: Zap,
                                    title: "Real-Time Adjustments",
                                    desc: "React to sudden market shifts, viral trends, or supply chain disruptions before they impact your bottom line."
                                }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <SpotlightCard className="h-full bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 hover:border-cyan-500/30 transition-colors group">
                                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300">
                                            <feature.icon className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" size={28} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                                        <p className="text-slate-400 text-lg leading-relaxed">{feature.desc}</p>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Metric & Testimonial */}
                <section className="py-24 relative overflow-hidden">
                    {/* Decorative Background for Quote */}
                    <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
                        <div className="w-[1000px] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent absolute top-[30%]" />
                        <div className="w-[1000px] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent absolute bottom-[30%]" />
                    </div>

                    <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            className="flex-1 flex flex-col items-center md:items-start text-center md:text-left"
                        >
                            <CircularMetric endValue={35} />
                            <p className="text-xl md:text-2xl text-slate-300 font-medium mt-8 max-w-sm">
                                Improvement in forecast accuracy across enterprise deployments.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="flex-1 w-full"
                        >
                            <div className="relative bg-slate-900/60 border border-slate-700 backdrop-blur-xl rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] shadow-cyan-900/20 group">
                                {/* Border Glow on Hover */}
                                <div className="absolute inset-0 rounded-3xl border-2 border-cyan-500/0 group-hover:border-cyan-500/30 transition-colors duration-500 pointer-events-none" />
                                
                                <motion.div 
                                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                >
                                    <Quote className="text-cyan-500 w-16 h-16 mb-8 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                                </motion.div>
                                
                                <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-10">
                                    "Zappcode's Forecast Agent completely changed how we handle inventory. It caught a massive seasonal shift 3 weeks earlier than our old system, saving us hundreds of thousands in potential stockouts."
                                </p>
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 shadow-inner" />
                                    <div>
                                        <div className="font-bold text-white text-lg">VP of Supply Chain</div>
                                        <div className="text-cyan-400 font-medium">National Retail Chain</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </section>

                <CTADivider 
                    headline="See your forecast accuracy improve."
                    sub="Connect your data and let our agents prove their value."
                    btnText="Book a Demo"
                    btnHref="/book-demo"
                    icon={Sparkles}
                    variant="dark"
                />
            </main>

            <Footer />
        </div>
    );
}
