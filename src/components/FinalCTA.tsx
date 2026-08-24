import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Bot, GraduationCap, LineChart, CheckCircle2, HeartPulse, Activity, Target, Sparkles, Plus, Rocket, Users, Shield, ArrowRight } from 'lucide-react';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div style={{ perspective: "1000px" }} className="h-full w-full">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={`relative rounded-3xl bg-[#0B1120] text-white shadow-2xl transition-shadow duration-300 hover:shadow-blue-500/10 h-full w-full ${className}`}
            >
                <div
                    style={{
                        transform: "translateZ(50px)",
                        transformStyle: "preserve-3d",
                    }}
                    className="h-full"
                >
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default function FinalCTA() {
    return (
        <section id="final-cta" className="relative bg-[#020617] pt-24 pb-32 overflow-hidden min-h-screen flex items-center">
            {/* Background glowing cosmos effects */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Ambient thin decorative lines */}
            <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-900/30 to-transparent pointer-events-none" />
            <div className="absolute top-[40%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-900/30 to-transparent pointer-events-none" />

            {/* Floating glowing AI orb (top left) */}
            <div className="hidden lg:flex absolute top-[15%] left-[5%] w-24 h-24 rounded-full border border-blue-500/30 items-center justify-center relative shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                <div className="absolute inset-0 border border-blue-400/20 rounded-full scale-150 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 border border-blue-400/10 rounded-full scale-[2]" />
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                    AI
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 relative z-10 w-full">

                {/* Header */}
                <div className="text-center mb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center border border-blue-500/30 rounded-full px-5 py-1.5 mb-6 bg-[#0B1120] backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    >
                        <span className="text-[12px] font-bold tracking-widest text-blue-300">BEYOND ZAPPCODE</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl lg:text-[56px] font-bold text-white mb-6 leading-[1.1] tracking-tight"
                    >
                        We've Built AI That's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Already Live</span><br className="hidden md:block" /> Not Just Promised
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-[16px] md:text-[18px] text-slate-400 max-w-3xl mx-auto"
                    >
                        Before Zappcode, we shipped AI products that real people use <span className="text-blue-400 font-semibold">every day</span>.<br /> Here's the proof.
                    </motion.p>
                </div>

                {/* 3 Product Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* Card 1: Nelson Hospitals */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="h-full"
                    >
                        <TiltCard className="border border-blue-500/20 group hover:border-blue-500/50">
                            {/* Corner Badge */}
                            <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20">
                                01
                            </div>

                            <div className="p-8 h-full flex flex-col relative z-10">
                                {/* Icon Graphic */}
                                <div className="h-44 mb-6 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-2xl scale-150 group-hover:bg-blue-500/20 transition-colors" />
                                    <div className="absolute w-40 h-40 border border-blue-500/20 rounded-full" />
                                    <div className="absolute w-24 h-24 border border-blue-400/30 rounded-full" />

                                    <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-4 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative z-10 border border-slate-700">
                                        <Bot size={48} className="text-blue-400" />
                                    </div>
                                    <div className="absolute right-10 top-6 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold shadow-lg">
                                        H
                                    </div>
                                    <div className="absolute left-10 bottom-6 text-white w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 shadow-md">
                                        <Plus size={18} strokeWidth={3} />
                                    </div>
                                </div>

                                <h3 className="text-[20px] font-bold mb-3 text-white tracking-wide">NELSON HOSPITALS</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[12px] font-semibold flex items-center gap-1.5 border border-blue-500/20">
                                        <HeartPulse size={14} /> Healthcare AI Chatbot
                                    </div>
                                </div>

                                <p className="text-slate-400 mb-6 text-[14px] leading-relaxed flex-grow">
                                    A live AI chatbot handling real patient conversations — answering questions, booking appointments, and cutting hospital wait times. No scripts. No delays. Just instant help.
                                </p>

                                <div className="space-y-2 mb-6 text-[13px] text-slate-300">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                        <span>Live and running • Handling real patient queries daily</span>
                                    </div>
                                </div>

                                <Link to="#" className="text-blue-400 font-semibold text-[14px] flex items-center gap-1 hover:text-blue-300 transition-colors">
                                    See it live <ArrowRight size={16} />
                                </Link>
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Card 2: GIXAA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="h-full"
                    >
                        <TiltCard className="border border-purple-500/20 group hover:border-purple-500/50">
                            {/* Corner Badge */}
                            <div className="absolute -top-3 -left-3 w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] z-20">
                                02
                            </div>

                            <div className="p-8 h-full flex flex-col relative z-10">
                                {/* Icon Graphic */}
                                <div className="h-44 mb-6 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-2xl scale-150 group-hover:bg-purple-500/20 transition-colors" />
                                    <div className="absolute w-40 h-40 border border-purple-500/20 rounded-full" />
                                    <div className="absolute w-24 h-24 border border-purple-400/30 rounded-full" />

                                    <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-4 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative z-10 border border-slate-700">
                                        <GraduationCap size={48} className="text-purple-400" />
                                    </div>
                                    <div className="absolute left-6 top-10 text-white w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 shadow-lg">
                                        <Activity size={16} />
                                    </div>
                                    <div className="absolute right-8 bottom-8 flex items-end gap-1">
                                        <div className="w-2 h-4 bg-purple-600/50 rounded-sm" />
                                        <div className="w-2 h-6 bg-purple-500/70 rounded-sm" />
                                        <div className="w-2 h-10 bg-purple-400 rounded-sm" />
                                    </div>
                                </div>

                                <h3 className="text-[20px] font-bold mb-3 text-white tracking-wide">GIXAA</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-[12px] font-semibold flex items-center gap-1.5 border border-purple-500/20">
                                        <Sparkles size={14} /> AI College Prediction Engine
                                    </div>
                                </div>

                                <p className="text-slate-400 mb-6 text-[14px] leading-relaxed flex-grow">
                                    An AI model that reads years of ranking and cutoff data to tell students exactly where they stand — before results even come out.
                                </p>

                                <div className="space-y-2 mb-6 text-[13px] text-slate-300">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-purple-500 mt-0.5 shrink-0" />
                                        <span>Used by thousands of students every admission season</span>
                                    </div>
                                </div>

                                <Link to="#" className="text-purple-400 font-semibold text-[14px] flex items-center gap-1 hover:text-purple-300 transition-colors">
                                    See it live <ArrowRight size={16} />
                                </Link>
                            </div>
                        </TiltCard>
                    </motion.div>

                    {/* Card 3: MIRZA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="h-full"
                    >
                        <TiltCard className="border border-orange-500/20 group hover:border-orange-500/50">
                            {/* Corner Badge */}
                            <div className="absolute -top-3 -left-3 w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] z-20">
                                03
                            </div>

                            <div className="p-8 h-full flex flex-col relative z-10">
                                {/* Icon Graphic */}
                                <div className="h-44 mb-6 flex items-center justify-center relative">
                                    <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-2xl scale-150 group-hover:bg-orange-500/20 transition-colors" />
                                    <div className="absolute w-40 h-40 border border-orange-500/20 rounded-full" />
                                    <div className="absolute w-24 h-24 border border-orange-400/30 rounded-full" />

                                    <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-4 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative z-10 border border-slate-700 w-24 h-20 flex flex-col justify-end pb-2 px-3 gap-1">
                                        <LineChart size={24} className="text-orange-400 absolute top-3 left-3" />
                                        <div className="flex items-end gap-1.5 w-full">
                                            <div className="w-full bg-orange-700 rounded-sm h-3" />
                                            <div className="w-full bg-orange-500 rounded-sm h-6" />
                                            <div className="w-full bg-orange-400 rounded-sm h-10" />
                                        </div>
                                    </div>
                                    <div className="absolute right-6 top-4 text-white w-8 h-8 flex items-center justify-center rounded-full bg-orange-600 shadow-lg border border-orange-400/50">
                                        <Target size={16} />
                                    </div>
                                </div>

                                <h3 className="text-[20px] font-bold mb-3 text-white tracking-wide">MIRZA</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="bg-orange-500/10 text-orange-400 px-3 py-1 rounded-full text-[12px] font-semibold flex items-center gap-1.5 border border-orange-500/20">
                                        <LineChart size={14} /> AI Prediction & Analysis Platform
                                    </div>
                                </div>

                                <p className="text-slate-400 mb-6 text-[14px] leading-relaxed flex-grow">
                                    A prediction engine built to process messy, real-world data and turn it into fast, accurate answers — the same core intelligence now powering Zappcode.
                                </p>

                                <div className="space-y-2 mb-6 text-[13px] text-slate-300">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={16} className="text-orange-500 mt-0.5 shrink-0" />
                                        <span>Trusted for real-time predictions, at scale</span>
                                    </div>
                                </div>

                                <Link to="#" className="text-orange-400 font-semibold text-[14px] flex items-center gap-1 hover:text-orange-300 transition-colors">
                                    See it live <ArrowRight size={16} />
                                </Link>
                            </div>
                        </TiltCard>
                    </motion.div>

                </div>

                {/* Bottom Banner Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="w-full bg-[#0B1120] border border-blue-500/20 rounded-3xl p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                    {/* Left: Branding */}
                    <div className="flex items-center gap-5 w-full lg:w-auto">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-900 border border-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            <Users size={28} className="text-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-[22px] font-bold text-white leading-tight">Same Team.</h3>
                            <h3 className="text-[22px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 leading-tight mb-1">Same AI Engine.</h3>
                            <p className="text-slate-400 text-[14px]">Now built for your supply chain.</p>
                        </div>
                    </div>

                    {/* Middle: Stats */}
                    <div className="flex items-center gap-8 md:gap-16 w-full lg:w-auto border-t border-b lg:border-t-0 lg:border-b-0 border-slate-800 py-6 lg:py-0">
                        <div className="flex flex-col items-center text-center gap-2">
                            <Rocket size={20} className="text-slate-400" />
                            <div>
                                <div className="text-[22px] font-bold text-white">10+</div>
                                <div className="text-[12px] text-slate-400">Live AI Products</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <Users size={20} className="text-slate-400" />
                            <div>
                                <div className="text-[22px] font-bold text-white">100K+</div>
                                <div className="text-[12px] text-slate-400">People Impacted</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <Shield size={20} className="text-slate-400" />
                            <div>
                                <div className="text-[22px] font-bold text-white">99.9%</div>
                                <div className="text-[12px] text-slate-400">Accuracy at Scale</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: CTA Button */}
                    <div className="flex flex-col items-center lg:items-end w-full lg:w-auto">
                        <Link
                            to="/book-demo"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl font-bold text-[15px] transition-colors flex items-center justify-center gap-2 w-full lg:w-auto mb-3 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                        >
                            Book a Demo with Zappcode <ArrowRight size={18} />
                        </Link>
                        <p className="text-slate-400 text-[13px]">Let's build what's next — together.</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
