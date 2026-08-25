import { useRef, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CTADivider } from '../App';
import { ChevronRight, Sparkles, Database, Server, Building2, Calculator, Code2, Table2, Store, ShieldCheck, Zap, HardDriveDownload, Box } from 'lucide-react';

const StatCounter = ({ endValue }: { endValue: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  
    useEffect(() => {
        if (inView) {
            springValue.set(endValue);
        }
    }, [inView, endValue, springValue]);
  
    const display = useTransform(springValue, (current) => Math.round(current));
  
    return <motion.span ref={ref}>{display}</motion.span>;
};

const HubDiagram = () => {
    const nodes = [
        { icon: Database, label: "ERP", top: "10%", left: "15%", delay: 0.2, color: "text-blue-600" },
        { icon: Server, label: "DB", top: "10%", left: "85%", delay: 0.3, color: "text-cyan-600" },
        { icon: Table2, label: "Sheets", top: "50%", left: "0%", delay: 0.4, color: "text-emerald-600" },
        { icon: Store, label: "POS", top: "50%", left: "100%", delay: 0.5, color: "text-purple-600" },
        { icon: Building2, label: "CRM", top: "90%", left: "25%", delay: 0.6, color: "text-orange-600" },
        { icon: Code2, label: "Custom", top: "90%", left: "75%", delay: 0.7, color: "text-indigo-600" },
    ];

    return (
        <div className="relative w-full aspect-square max-w-[320px] sm:max-w-[400px] lg:max-w-[500px] mx-auto my-12 lg:my-0">
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                
                {nodes.map((node, i) => (
                    <g key={i}>
                        {/* Background subtle line */}
                        <line
                            x1="50%" y1="50%"
                            x2={node.left} y2={node.top}
                            stroke="#E2E8F0"
                            strokeWidth="2"
                        />
                        {/* Animated flowing line */}
                        <motion.line
                            x1={node.left} y1={node.top}
                            x2="50%" y2="50%"
                            stroke="url(#flowGradient)"
                            strokeWidth="3"
                            filter="url(#glow)"
                            strokeDasharray="15 15"
                            initial={{ strokeDashoffset: 100, opacity: 0 }}
                            animate={{ strokeDashoffset: 0, opacity: 1 }}
                            transition={{ 
                                strokeDashoffset: { repeat: Infinity, duration: 2, ease: "linear" },
                                opacity: { duration: 1, delay: node.delay }
                            }}
                        />
                    </g>
                ))}
            </svg>

            {/* Pulsing Background Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
                <motion.div 
                    animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 border border-blue-400 rounded-full"
                />
                <motion.div 
                    animate={{ scale: [1, 2], opacity: [0.15, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeOut", delay: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 border border-cyan-400 rounded-full"
                />
            </div>

            {/* Center Zappcode Node (3D effect) */}
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
            >
                <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl shadow-[0_20px_40px_rgba(37,99,235,0.4)] border border-blue-400/50 flex flex-col items-center justify-center relative backdrop-blur-md overflow-hidden"
                >
                    {/* Gloss reflection overlay */}
                    <div className="absolute inset-0 bg-white/20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 40%, 0 60%)' }} />
                    <Box className="text-white mb-1 drop-shadow-md relative z-10" size={32} />
                    <span className="font-bold text-white text-sm drop-shadow-md relative z-10">Zappcode</span>
                </motion.div>
            </motion.div>

            {/* Surrounding Nodes */}
            {nodes.map((node, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: node.delay + 0.3 }}
                    className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: node.top, left: node.left }}
                >
                    <motion.div 
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: i * 0.3 }}
                        className="bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] border border-white flex flex-col items-center gap-2 group cursor-pointer hover:scale-110 transition-transform"
                    >
                        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_rgba(255,255,255,0.8)] pointer-events-none" />
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            <node.icon className={`${node.color} drop-shadow-sm`} size={20} />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider">{node.label}</span>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

const OrbitingDots = () => {
    return (
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center mx-auto">
            {/* Center Metric */}
            <span className="font-serif text-[80px] md:text-[110px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-cyan-500 to-orange-400 z-10 relative drop-shadow-sm leading-none">
                <StatCounter endValue={20} />+
            </span>
            
            {/* Orbiting Ring 1 */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-4 border border-slate-200/50 rounded-full"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
            </motion.div>
            
            {/* Orbiting Ring 2 */}
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="absolute -inset-4 border border-slate-200/30 rounded-full"
            >
                <div className="absolute bottom-1/4 -right-2 w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                <div className="absolute top-1/4 -left-2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
            </motion.div>
        </div>
    );
};

export default function SolutionErpIntegrationPage() {
    const systems = [
        { name: "SAP", icon: Database, color: "text-blue-600", bg: "bg-blue-50", hoverColor: "group-hover:text-blue-700", hoverBg: "group-hover:bg-blue-100" },
        { name: "Oracle NetSuite", icon: Server, color: "text-red-600", bg: "bg-red-50", hoverColor: "group-hover:text-red-700", hoverBg: "group-hover:bg-red-100" },
        { name: "Microsoft Dynamics", icon: Building2, color: "text-blue-500", bg: "bg-blue-50", hoverColor: "group-hover:text-blue-600", hoverBg: "group-hover:bg-blue-100" },
        { name: "Tally", icon: Calculator, color: "text-orange-500", bg: "bg-orange-50", hoverColor: "group-hover:text-orange-600", hoverBg: "group-hover:bg-orange-100" },
        { name: "Custom/Legacy ERPs", icon: Code2, color: "text-slate-600", bg: "bg-slate-100", hoverColor: "group-hover:text-slate-800", hoverBg: "group-hover:bg-slate-200" },
        { name: "Excel & Google Sheets", icon: Table2, color: "text-green-600", bg: "bg-green-50", hoverColor: "group-hover:text-green-700", hoverBg: "group-hover:bg-green-100" },
        { name: "POS Systems", icon: Store, color: "text-purple-600", bg: "bg-purple-50", hoverColor: "group-hover:text-purple-700", hoverBg: "group-hover:bg-purple-100" },
    ];

    return (
        <div className="bg-[#F8FAFC] min-h-screen flex flex-col font-sans">
            <Navbar />
            
            <main className="flex-grow relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-200/40 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
                    </div>

                    <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                        {/* Breadcrumbs */}
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-[13px] font-medium text-slate-500 mb-12">
                            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                            <ChevronRight size={14} />
                            <span className="hover:text-blue-600 cursor-default transition-colors">Solution</span>
                            <ChevronRight size={14} />
                            <span className="text-slate-900 font-bold">ERP Integration</span>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
                            <div className="flex-1 text-center lg:text-left">
                                <motion.span
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="inline-block font-mono text-[13px] font-bold tracking-[0.2em] text-blue-600 mb-6 uppercase bg-blue-50 px-4 py-1.5 rounded-full"
                                >
                                    SEAMLESS CONNECTIVITY
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="font-serif text-5xl md:text-6xl lg:text-7xl text-slate-900 font-bold mb-6 leading-[1.1] tracking-tight max-w-2xl mx-auto lg:mx-0"
                                >
                                    Works With the Systems You <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Already Have</span>
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium"
                                >
                                    No rip-and-replace. Zappcode connects directly to your ERP, POS, and spreadsheets — so your team keeps working the way they already do.
                                </motion.p>
                            </div>
                            
                            <div className="flex-1 w-full relative z-20">
                                <HubDiagram />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Explanation Section */}
                <section className="py-8 md:py-12">
                    <div className="max-w-[800px] mx-auto px-6 md:px-12 text-center">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            className="font-serif text-4xl md:text-5xl text-slate-900 font-bold mb-8"
                        >
                            Plug In, Not Overhaul
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-600 text-xl md:text-2xl leading-relaxed"
                        >
                            We know that changing core enterprise software is risky and expensive. That's why our AI agents are designed to sit on top of your existing infrastructure. They read your current data, process it in our secure cloud, and push recommendations back to your dashboard or directly into your ERP.
                        </motion.p>
                    </div>
                </section>

                {/* Supported Systems Grid */}
                <section className="py-12 md:py-16 bg-white border-y border-slate-100 relative overflow-hidden">
                    <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
                        <div className="text-center mb-8">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Supported Out-Of-The-Box</h3>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {systems.map((sys, i) => (
                                <motion.div
                                    key={sys.name}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(25%-24px)] flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                                >
                                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${sys.bg} ${sys.hoverBg} flex items-center justify-center mb-4 md:mb-6 transition-colors duration-300`}>
                                        <sys.icon className={`${sys.color} ${sys.hoverColor} transition-colors duration-300`} size={28} />
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm md:text-lg text-center group-hover:text-slate-900 transition-colors">{sys.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefit Cards & Metric */}
                <section className="py-12 md:py-20 relative overflow-hidden">
                    <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                        
                        {/* Metric Highlight */}
                        <div className="mb-12 md:mb-16 text-center">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                className="inline-flex flex-col items-center"
                            >
                                <OrbitingDots />
                                <span className="text-xl md:text-2xl font-medium text-slate-600 mt-6 max-w-sm">
                                    ERP and POS systems supported out of the box
                                </span>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: HardDriveDownload,
                                    title: "Zero Data Migration",
                                    desc: "Keep your data exactly where it is. We read it, analyze it, and leave your source of truth untouched.",
                                    accent: "bg-blue-500"
                                },
                                {
                                    icon: Zap,
                                    title: "Fast Setup",
                                    desc: "Standard integrations take days, not months. Custom API endpoints can be configured in just a few weeks.",
                                    accent: "bg-orange-500"
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Secure by Design",
                                    desc: "Enterprise-grade encryption in transit and at rest. We maintain strict compliance with global data standards.",
                                    accent: "bg-cyan-500"
                                }
                            ].map((benefit, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="bg-white rounded-3xl p-10 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden group"
                                >
                                    {/* Animated Top Border Accent */}
                                    <motion.div 
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.8, delay: (i * 0.1) + 0.3, ease: "easeOut" }}
                                        className={`absolute top-0 left-0 right-0 h-1.5 ${benefit.accent} origin-left`}
                                    />
                                    
                                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                        <benefit.icon className="text-slate-700" size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                                    <p className="text-slate-600 text-lg leading-relaxed">{benefit.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <CTADivider 
                    headline="Not sure if we support your system?"
                    sub="We probably do. Let's talk about your specific tech stack."
                    btnText="Ask Us"
                    btnHref="/book-demo"
                    icon={Sparkles}
                    variant="gradient"
                />
            </main>

            <Footer />
        </div>
    );
}
