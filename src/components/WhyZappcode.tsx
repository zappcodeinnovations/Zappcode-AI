import { motion } from 'framer-motion';
import {
    Gauge, Database, LineChart, Target,
    Rocket, BrainCircuit, Users,
    ChevronRight, Zap, Network, TrendingUp, Navigation, Sparkles
} from 'lucide-react';

const comparisonData = [
    {
        id: 'speed',
        label: 'SPEED',
        icon: Gauge,
        oldText: 'Takes days to weeks',
        newText: 'Instant decisions',
        newIcon: Zap,
        color: 'from-orange-400 to-orange-500',
        textColor: 'text-orange-500',
        lightBg: 'bg-orange-50'
    },
    {
        id: 'data',
        label: 'DATA',
        icon: Database,
        oldText: 'Scattered, manual',
        newText: 'All connected automatically',
        newIcon: Network,
        color: 'from-pink-500 to-rose-500',
        textColor: 'text-pink-600',
        lightBg: 'bg-pink-50'
    },
    {
        id: 'forecasting',
        label: 'FORECASTING',
        icon: LineChart,
        oldText: 'Fixed, doesn\'t learn',
        newText: 'Improves every single day',
        newIcon: TrendingUp,
        color: 'from-blue-500 to-cyan-500',
        textColor: 'text-blue-600',
        lightBg: 'bg-blue-50'
    },
    {
        id: 'action',
        label: 'ACTION',
        icon: Target,
        oldText: 'You figure it out',
        newText: 'AI suggests the next step',
        newIcon: Navigation,
        color: 'from-purple-500 to-indigo-500',
        textColor: 'text-purple-600',
        lightBg: 'bg-purple-50'
    }
];

const cards = [
    {
        title: 'Takes Action, Not Just Reports',
        desc: 'From insight to execution — Zappcode acts on your behalf so your team always stays ahead.',
        icon: Rocket,
        color: '#F97316', // Orange
        gradient: 'from-orange-400 to-amber-500',
        lightBg: 'bg-orange-50'
    },
    {
        title: 'Gets Smarter Over Time',
        desc: 'Our AI learns your business, adapts to change, and keeps improving with every decision.',
        icon: BrainCircuit,
        color: '#A855F7', // Purple
        gradient: 'from-purple-400 to-fuchsia-500',
        lightBg: 'bg-purple-50'
    },
    {
        title: 'One Team, Nine Experts',
        desc: 'Nine specialized AI agents work together like a high-performing team dedicated to your success.',
        icon: Users,
        color: '#3B82F6', // Blue
        gradient: 'from-blue-400 to-indigo-500',
        lightBg: 'bg-blue-50'
    }
];

function FloatingDecorations() {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block">
            {/* Top Left Chart Deco */}
            <motion.div
                animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-[5%] top-[10%] w-24 h-24 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center p-4"
                style={{ transform: 'perspective(500px) rotateY(10deg)' }}
            >
                <div className="flex items-end gap-1.5 w-full h-full">
                    <div className="w-1/3 bg-blue-500 rounded-sm h-[40%]" />
                    <div className="w-1/3 bg-indigo-500 rounded-sm h-[70%]" />
                    <div className="w-1/3 bg-orange-400 rounded-sm h-[100%]" />
                </div>
            </motion.div>

            {/* Top Right Sparkle Deco */}
            <motion.div
                animate={{ y: [0, 10, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute right-[10%] top-[15%] w-20 h-20 bg-white rounded-2xl shadow-xl border border-gray-100 flex items-center justify-center"
                style={{ transform: 'perspective(500px) rotateY(-10deg)' }}
            >
                <div className="relative">
                    <div className="absolute inset-0 bg-purple-400 blur-xl opacity-30 rounded-full" />
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-purple-500 relative z-10">
                        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
                        <path d="M20 4L21 7L24 8L21 9L20 12L19 9L16 8L19 7L20 4Z" fill="#F97316" />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
}

function FunnelPath({ direction, colorId, gradientClass }: { direction: 'left' | 'right', colorId: string, gradientClass: string }) {
    return (
        <div className="absolute inset-0 w-full h-full flex items-center z-0 opacity-40 hidden md:flex" style={{ left: direction === 'left' ? '50%' : '-50%', width: '100%' }}>
            <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="w-full h-[60px]">
                <defs>
                    <linearGradient id={`${colorId}-${direction}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" className={direction === 'left' ? 'stop-gray-200' : 'stop-transparent'} stopColor={direction === 'left' ? '#E2E8F0' : 'currentColor'} />
                        <stop offset="100%" className={direction === 'right' ? gradientClass.split(' ')[1].replace('to-', 'stop-') : 'stop-transparent'} stopColor={direction === 'right' ? 'currentColor' : '#E2E8F0'} />
                    </linearGradient>
                </defs>
                {direction === 'left' ? (
                    <path d="M 0 35 C 50 35, 50 50, 100 50 L 100 50 C 50 50, 50 65, 0 65 Z" fill={`url(#${colorId}-${direction})`} />
                ) : (
                    <path d="M 0 50 C 50 50, 50 20, 100 20 L 100 80 C 50 80, 50 50, 0 50 Z" fill={`url(#${colorId}-${direction})`} />
                )}
            </svg>

            {direction === 'right' && (
                <div className="absolute left-[30%] top-1/2 -translate-y-1/2 text-black/20 flex font-bold text-sm tracking-tighter drop-shadow-sm">
                    &gt;&gt;
                </div>
            )}
        </div>
    );
}

export default function WhyZappcode() {
    return (
        <section
            id="why-zappcode"
            className="pt-20 md:pt-32 pb-24 md:pb-32 overflow-hidden relative"
            style={{ background: '#F8FAFC' }}
        >
            <FloatingDecorations />

            <div className="max-w-[1100px] mx-auto px-4 md:px-6 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block relative mb-6"
                    >
                        <span className="text-[12px] md:text-[14px] font-bold tracking-[0.2em] uppercase text-blue-600">
                            WHY ZAPPCODE
                        </span>
                        <div className="absolute -bottom-2 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500 rounded-full" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[32px] sm:text-[40px] md:text-[48px] font-bold mb-6 leading-[1.2]"
                        style={{ color: '#0F172A' }}
                    >
                        More Than a Dashboard<br />
                        A Team That <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500">Takes Action</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[#6B7280] text-[16px] md:text-[18px] max-w-2xl mx-auto"
                    >
                        Most tools just show you numbers.<br /> Zappcode tells you what to do next &mdash; and does it for you.
                    </motion.p>
                </div>

                {/* Sweeping Flow Diagram (Comparison Table) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 md:p-10 mb-12 md:mb-16 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.03)]"
                >
                    {/* Headers */}
                    <div className="flex justify-between items-center mb-10 px-2 md:px-10">
                        <div className="bg-slate-500 text-white text-[11px] md:text-[13px] font-bold tracking-widest uppercase px-6 md:px-8 py-3 rounded-full">
                            Traditional Tools
                        </div>
                        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-[11px] md:text-[13px] font-bold tracking-widest uppercase px-6 md:px-8 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/20">
                            <Sparkles size={16} /> ZAPPCODE AI
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="flex flex-col gap-6 md:gap-10">
                        {comparisonData.map((row, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative">

                                {/* Left Side (Old) */}
                                <div className="w-full md:w-[35%] relative z-10">
                                    <div className="bg-white rounded-full border border-gray-100 shadow-sm px-6 py-4 flex items-center gap-4 hover:shadow-md transition-shadow relative z-20">
                                        <row.icon size={24} className="text-slate-400" />
                                        <span className="text-slate-600 font-semibold text-[14px] md:text-[15px]">{row.oldText}</span>
                                    </div>
                                    <FunnelPath direction="left" colorId={`left-${idx}`} gradientClass={row.color} />
                                </div>

                                {/* Center Circle */}
                                <div className="hidden md:flex flex-col items-center justify-center w-[120px] relative z-30">
                                    <div className="w-14 h-14 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-50 flex items-center justify-center mb-2">
                                        <row.icon size={22} className="text-slate-800" strokeWidth={2.5} />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{row.label}</span>
                                </div>

                                {/* Right Side (New) */}
                                <div className="w-full md:w-[40%] relative z-10">
                                    <FunnelPath direction="right" colorId={`right-${idx}`} gradientClass={row.color} />
                                    <div className={`bg-white rounded-full border border-gray-100 shadow-md px-2 py-2 pr-6 flex items-center justify-between hover:shadow-lg transition-shadow relative overflow-hidden group z-20`}>
                                        <div className={`absolute inset-0 bg-gradient-to-r ${row.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                                        <span className={`pl-6 font-bold text-[14px] md:text-[16px] bg-clip-text text-transparent bg-gradient-to-r ${row.color}`}>
                                            {row.newText}
                                        </span>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${row.color} shadow-inner`}>
                                            <row.newIcon size={20} strokeWidth={2.5} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom 3 Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {cards.map((card, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-[24px] p-6 border border-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative group overflow-hidden flex flex-col h-full"
                        >
                            {/* Top 3D Icon Area */}
                            <div className="w-full flex justify-center mb-5 relative">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${card.lightBg} relative`}>
                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${card.gradient} opacity-20 blur-xl`} />
                                    <card.icon size={36} className="relative z-10" color={card.color} strokeWidth={1.5} />
                                </div>
                            </div>

                            <h3 className="text-[17px] md:text-[19px] font-bold mb-3 leading-tight text-center" style={{ color: card.color }}>
                                {card.title}
                            </h3>
                            <p className="text-[14px] leading-relaxed text-slate-500 text-center flex-1 mb-6 px-1">
                                {card.desc}
                            </p>

                            <div className="mt-auto">
                                <button className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${card.gradient} shadow-lg transition-transform group-hover:scale-110`}>
                                    <ChevronRight size={20} strokeWidth={2.5} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}