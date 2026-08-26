

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Factory, Store, Pill, ShoppingCart, Globe,
    TrendingUp, ShieldCheck, LineChart, Recycle,
    Timer, Radar, Truck, Boxes, AlertTriangle, Package, Gauge, Layers
} from 'lucide-react';

import manufacturingImg from '../assets/sections/manufacturing.png';
import retailImg from '../assets/sections/retails.png';
import pharmaImg from '../assets/sections/pharma.png';
import fmcgImg from '../assets/sections/fmcg.png';
import ecommerceImg from '../assets/sections/manufacturing-product.png'; // Fallback for e-commerce since it's not present

/* ---------------------------------------------------------- */
/* Count-up hook/component that runs on mount                  */
/* ---------------------------------------------------------- */
function AnimatedMetric({ value }: { value: string }) {
    const prefix = value.match(/^[+-]/)?.[0] || '';
    const suffix = value.match(/[%×x]/)?.[0] || '';
    const numericStr = value.replace(/^[+-]/, '').replace(/[%×x]/, '');
    const numericVal = parseFloat(numericStr);
    const isFloat = numericStr.includes('.');

    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTimestamp: number;
        const duration = 1500;
        let reqId: number;

        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(easeProgress * numericVal);
            if (progress < 1) {
                reqId = requestAnimationFrame(step);
            } else {
                setCount(numericVal);
            }
        };

        reqId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(reqId);
    }, [numericVal]);

    const displayCount = isFloat ? count.toFixed(1) : Math.floor(count).toString();

    return <span>{prefix}{displayCount}{suffix}</span>;
}

/* ---------------------------------------------------------- */
/* Small radial gauge (used for the "Availability"-style badge) */
/* ---------------------------------------------------------- */
function RadialGauge({ value }: { value: number }) {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setReady(true), 150);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="relative w-14 h-14 flex items-center justify-center">
            <svg width="56" height="56" className="-rotate-90">
                <circle cx="28" cy="28" r={radius} stroke="rgba(255,255,255,0.15)" strokeWidth="4" fill="none" />
                <motion.circle
                    cx="28" cy="28" r={radius}
                    stroke="#60A5FA" strokeWidth="4" fill="none" strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: ready ? circumference - (value / 100) * circumference : circumference }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                />
            </svg>
            <span className="absolute text-white text-[13px] font-bold">{value}%</span>
        </div>
    );
}

/* ---------------------------------------------------------- */
/* Mini sparkline (decorative)                                 */
/* ---------------------------------------------------------- */
function MiniSparkline({ positive = true }: { positive?: boolean }) {
    const path = positive
        ? 'M0,16 L10,12 L20,14 L30,7 L40,9 L50,3 L60,5'
        : 'M0,4 L10,7 L20,5 L30,10 L40,8 L50,13 L60,11';
    return (
        <svg width="60" height="18" viewBox="0 0 60 18" fill="none" className="mt-1">
            <motion.path
                d={path}
                stroke={positive ? '#60A5FA' : '#F97316'}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
        </svg>
    );
}

/* ---------------------------------------------------------- */
/* Floating glass badge (sits around the visual)                */
/* ---------------------------------------------------------- */
type Badge = {
    icon: any;
    label: string;
    value?: string;
    trend?: string;
    positive?: boolean;
    sparkline?: boolean;
    radial?: number;
    position: string; // tailwind positioning classes
    hideOnMobile?: boolean;
};

function FloatingBadge({ badge, index }: { badge: Badge; index: number }) {
    const Icon = badge.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
            transition={{
                opacity: { duration: 0.5, delay: 0.35 + index * 0.1 },
                scale: { duration: 0.5, delay: 0.35 + index * 0.1 },
                y: { duration: 3.2 + index * 0.4, repeat: Infinity, ease: 'easeInOut', delay: 1 + index * 0.15 }
            }}
            className={`absolute ${badge.position} ${badge.hideOnMobile ? 'hidden sm:block' : ''} z-20 bg-[#111827]/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/10 min-w-[148px]`}
        >
            <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={13} className="text-blue-300" strokeWidth={2} />
                </div>
                <span className="text-[9.5px] font-semibold tracking-wider text-gray-400 uppercase leading-tight">
                    {badge.label}
                </span>
            </div>

            {typeof badge.radial === 'number' ? (
                <RadialGauge value={badge.radial} />
            ) : (
                <>
                    <div className="text-white font-bold text-[17px] leading-none">{badge.value}</div>
                    {badge.sparkline && <MiniSparkline positive={badge.positive} />}
                    {badge.trend && (
                        <div className={`text-[11px] mt-1 ${badge.positive ? 'text-emerald-400' : 'text-gray-400'}`}>
                            {badge.trend}
                        </div>
                    )}
                </>
            )}
        </motion.div>
    );
}

/* ---------------------------------------------------------- */
/* Data                                                         */
/* ---------------------------------------------------------- */
const useCases = [
    {
        id: 'manufacturing',
        title: 'Manufacturing',
        icon: Factory,
        image: manufacturingImg,
        eyebrow: 'PRODUCTION INTELLIGENCE',
        headline: 'Plan Production Around Real Demand',
        desc: 'Match what you produce to what customers actually need — reduce waste and avoid delays.',
        stat: { value: '23%', label: 'better planning accuracy across plants' },
        features: [
            { icon: LineChart, title: 'Demand Signals', desc: 'Blend historical, seasonal and market data into one forecast.' },
            { icon: Layers, title: 'Capacity Matching', desc: 'Align production runs with real plant capacity automatically.' },
            { icon: Recycle, title: 'Waste Reduction', desc: 'Cut excess raw-material orders tied to over-production.' },
        ],
        badges: [
            { icon: Gauge, label: 'PLANT UTILIZATION', value: '87%', trend: '+9% vs last month', positive: true, sparkline: true, position: 'top-2 left-2 sm:top-4 sm:left-4' },
            { icon: LineChart, label: 'DEMAND FORECAST', value: 'Next 30 Days', trend: 'High Confidence', positive: true, position: 'top-2 right-2 sm:top-4 sm:right-4' },
            { icon: AlertTriangle, label: 'SHORTAGE RISK', value: 'Low Risk', trend: '2 SKUs Need Attention', position: 'right-2 sm:right-4 top-[42%]', hideOnMobile: true },
            { icon: Gauge, label: 'OUTPUT EFFICIENCY', radial: 95, position: 'bottom-2 right-2 sm:bottom-4 sm:right-4' },
        ] as Badge[],
    },
    {
        id: 'retail',
        title: 'Retail',
        icon: Store,
        image: retailImg,
        eyebrow: 'RETAIL INTELLIGENCE',
        headline: 'Never Run Out, Never Overstock',
        desc: 'Keep every store stocked with exactly what it needs — no more, no less.',
        stat: { value: '64%', label: 'fewer out-of-stock moments' },
        features: [
            { icon: TrendingUp, title: 'Demand Forecast', desc: 'AI predicts what customers will need, and when.' },
            { icon: ShoppingCart, title: 'Smart Reorder', desc: 'Automated replenishment at the right time.' },
            { icon: ShieldCheck, title: 'Stock Health', desc: 'Real-time visibility into every SKU, every store.' },
        ],
        badges: [
            { icon: Boxes, label: 'STOCK LEVEL', value: '92%', trend: '+12% vs last week', positive: true, sparkline: true, position: 'top-2 left-2 sm:top-4 sm:left-4' },
            { icon: LineChart, label: 'DEMAND FORECAST', value: 'Next 7 Days', trend: 'High Confidence', positive: true, position: 'top-2 right-2 sm:top-4 sm:right-4' },
            { icon: AlertTriangle, label: 'OUT-OF-STOCK RISK', value: 'Low Risk', trend: '3 SKUs Need Attention', position: 'right-2 sm:right-4 top-[42%]', hideOnMobile: true },
            { icon: Gauge, label: 'AVAILABILITY', radial: 98, position: 'bottom-2 right-2 sm:bottom-4 sm:right-4' },
        ] as Badge[],
    },
    {
        id: 'pharma',
        title: 'Pharma',
        icon: Pill,
        image: pharmaImg,
        eyebrow: 'PHARMA INTELLIGENCE',
        headline: 'Predict Demand Safely and Accurately',
        desc: 'Make sure medicines are available when needed, while reducing waste from expired stock.',
        stat: { value: '41%', label: 'less expired inventory' },
        features: [
            { icon: Radar, title: 'Cold-Chain Forecasting', desc: 'Predict demand for temperature-sensitive stock.' },
            { icon: Timer, title: 'Expiry Tracking', desc: 'Flag near-expiry batches before they turn to waste.' },
            { icon: ShieldCheck, title: 'Compliance Ready', desc: 'Full traceability for every batch and shipment.' },
        ],
        badges: [
            { icon: Boxes, label: 'STOCK LEVEL', value: '89%', trend: 'Healthy', positive: true, sparkline: true, position: 'top-2 left-2 sm:top-4 sm:left-4' },
            { icon: LineChart, label: 'DEMAND FORECAST', value: 'Next 14 Days', trend: 'High Confidence', positive: true, position: 'top-2 right-2 sm:top-4 sm:right-4' },
            { icon: AlertTriangle, label: 'EXPIRY RISK', value: 'Low Risk', trend: '5 Batches Near Expiry', position: 'right-2 sm:right-4 top-[42%]', hideOnMobile: true },
            { icon: Gauge, label: 'FULFILLMENT RATE', radial: 97, position: 'bottom-2 right-2 sm:bottom-4 sm:right-4' },
        ] as Badge[],
    },
    {
        id: 'fmcg',
        title: 'FMCG',
        icon: ShoppingCart,
        image: fmcgImg,
        eyebrow: 'FMCG INTELLIGENCE',
        headline: 'Keep Up With Trends, Fast',
        desc: 'React to changing consumer demand in days — not weeks.',
        stat: { value: '3.5×', label: 'better returns on promotions' },
        features: [
            { icon: TrendingUp, title: 'Trend Detection', desc: 'Spot shifting consumer demand as it happens.' },
            { icon: Truck, title: 'Promo Planning', desc: 'Size promotions to match real uplift, not guesswork.' },
            { icon: Recycle, title: 'Waste Reduction', desc: 'Cut markdowns caused by mistimed promotions.' },
        ],
        badges: [
            { icon: LineChart, label: 'DEMAND FORECAST', value: 'Next 7 Days', trend: 'High Confidence', positive: true, position: 'top-2 left-2 sm:top-4 sm:left-4' },
            { icon: TrendingUp, label: 'PROMO UPLIFT', value: '+34%', trend: 'vs baseline', positive: true, sparkline: true, position: 'top-2 right-2 sm:top-4 sm:right-4' },
            { icon: AlertTriangle, label: 'MARKDOWN RISK', value: 'Low Risk', trend: '4 SKUs Need Attention', position: 'right-2 sm:right-4 top-[42%]', hideOnMobile: true },
            { icon: Gauge, label: 'FORECAST ACCURACY', radial: 93, position: 'bottom-2 right-2 sm:bottom-4 sm:right-4' },
        ] as Badge[],
    },
    {
        id: 'ecommerce',
        title: 'E-Commerce',
        icon: Globe,
        image: ecommerceImg,
        eyebrow: 'E-COMMERCE INTELLIGENCE',
        headline: 'Handle Millions of Products with Ease',
        desc: 'Keep inventory in the right place so orders ship faster and cheaper.',
        stat: { value: '28%', label: 'fewer split shipments' },
        features: [
            { icon: Boxes, title: 'SKU-Level Forecasting', desc: 'Forecast demand for millions of listings at once.' },
            { icon: Truck, title: 'Fulfillment Routing', desc: 'Ship from the warehouse closest to the order.' },
            { icon: Package, title: 'Inventory Placement', desc: 'Position stock where demand will need it next.' },
        ],
        badges: [
            { icon: Boxes, label: 'STOCK LEVEL', value: '90%', trend: 'Healthy', positive: true, sparkline: true, position: 'top-2 left-2 sm:top-4 sm:left-4' },
            { icon: LineChart, label: 'DEMAND FORECAST', value: 'Next 7 Days', trend: 'High Confidence', positive: true, position: 'top-2 right-2 sm:top-4 sm:right-4' },
            { icon: AlertTriangle, label: 'STOCKOUT RISK', value: 'Low Risk', trend: '6 SKUs Need Attention', position: 'right-2 sm:right-4 top-[42%]', hideOnMobile: true },
            { icon: Gauge, label: 'SHIP-ON-TIME RATE', radial: 96, position: 'bottom-2 right-2 sm:bottom-4 sm:right-4' },
        ] as Badge[],
    },
];

const bottomStrip = [
    { icon: LineChart, title: 'AI-Powered Demand Forecasting', desc: 'Predict with precision using real-time trends and behavioral signals.' },
    { icon: Boxes, title: 'Inventory Optimization', desc: 'Balance stock across locations for maximum efficiency.' },
    { icon: AlertTriangle, title: 'Real-Time Alerts', desc: 'Instant notifications for risks, shortages, and opportunities.' },
    { icon: TrendingUp, title: 'Higher Availability', desc: 'More in-stock. Happier customers. Stronger business outcomes.' },
];

/* ---------------------------------------------------------- */
/* Main component                                               */
/* ---------------------------------------------------------- */
export default function UseCases() {
    const [activeTab, setActiveTab] = useState(useCases[0].id);
    const [userInteracted, setUserInteracted] = useState(false);
    const activeData = useCases.find(uc => uc.id === activeTab) || useCases[0];

    // Auto-advance tabs
    useEffect(() => {
        if (userInteracted) return;
        const interval = setInterval(() => {
            setActiveTab(current => {
                const currentIndex = useCases.findIndex(uc => uc.id === current);
                const nextIndex = (currentIndex + 1) % useCases.length;
                return useCases[nextIndex].id;
            });
        }, 6000);
        return () => clearInterval(interval);
    }, [userInteracted]);

    return (
        <section id="use-cases" className="relative pt-12 md:pt-16 pb-12 md:pb-16 overflow-hidden" style={{ background: 'var(--color-light-bg)' }}>
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="text-[12px] md:text-sm font-bold tracking-[0.15em] uppercase mb-4 inline-block"
                        style={{ color: 'var(--color-orange)' }}
                    >
                        • WHO WE HELP •
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-[36px] md:text-[44px] lg:text-[48px] font-bold text-[#1A1F2E] mb-6"
                        style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.15 }}
                    >
                        Built for the Industries<br className="hidden md:block" />That Can't Afford Mistakes
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-[#6B7280] text-[18px] max-w-3xl mx-auto"
                    >
                        From factory floor to last-mile delivery — Zappcode AI adapts to the demands of your industry.
                    </motion.p>
                </div>

                {/* Orbiting tab row — glowing 3D halo ring */}
                <div className="relative flex justify-center mb-6 pt-4 pb-4">
                    {/* soft blurred color wash behind the ring (rotating hue) */}
                    <motion.div
                        className="absolute inset-x-[1%] top-1 h-[150px] md:h-[172px] rounded-full pointer-events-none -z-20"
                        style={{
                            background: 'conic-gradient(from 0deg, #60A5FA, #F97316, #38BDF8, #60A5FA)',
                            filter: 'blur(46px)',
                            opacity: 0.4,
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* crisp outer ring — reads as a 3D halo / saturn-ring around the tabs */}
                    <div
                        className="absolute inset-x-[3%] top-[10px] h-[128px] md:h-[150px] rounded-full pointer-events-none -z-10"
                        style={{
                            border: '1px solid rgba(96,165,250,0.55)',
                            boxShadow: '0 0 35px rgba(37,99,235,0.20), inset 0 0 25px rgba(249,115,22,0.10)',
                        }}
                    />
                    {/* second, inner ring for the layered look */}
                    <div
                        className="absolute inset-x-[9%] top-[26px] h-[96px] md:h-[112px] rounded-full pointer-events-none -z-10"
                        style={{ border: '1px solid rgba(249,115,22,0.25)' }}
                    />

                    <div className="relative flex gap-4 sm:gap-6 md:gap-10 overflow-x-auto hide-scrollbar px-4 pt-1 max-w-full">
                        {useCases.map((uc) => {
                            const isActive = activeTab === uc.id;
                            const Icon = uc.icon;
                            return (
                                <div key={uc.id} className="flex flex-col items-center flex-shrink-0">
                                    {/* radiant glow blob that glides to the active tab */}
                                    <div className="relative">
                                        {isActive && (
                                            <motion.div
                                                layoutId="tab-active-glow"
                                                className="absolute -inset-7 rounded-full pointer-events-none -z-20"
                                                style={{
                                                    background: 'radial-gradient(circle, rgba(37,99,235,0.38), rgba(249,115,22,0.22) 55%, transparent 78%)',
                                                    filter: 'blur(14px)',
                                                }}
                                                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                                            />
                                        )}

                                        <motion.button
                                            onClick={() => { setActiveTab(uc.id); setUserInteracted(true); }}
                                            whileTap={{ scale: 0.94 }}
                                            whileHover={{ y: -3 }}
                                            className="relative w-[92px] sm:w-[104px] min-h-[92px] sm:min-h-[104px] rounded-2xl flex flex-col items-center justify-center gap-1.5 py-3 px-2 bg-white overflow-hidden transition-shadow duration-300"
                                            style={{
                                                boxShadow: isActive
                                                    ? '0 14px 34px rgba(37,99,235,0.28), 0 2px 8px rgba(249,115,22,0.15)'
                                                    : '0 4px 14px rgba(0,0,0,0.05)',
                                                border: isActive ? '1px solid transparent' : '1px solid #E5E7EB',
                                            }}
                                        >
                                            {/* glassy sheen overlay for a 3D card feel */}
                                            <div
                                                className="absolute inset-0 rounded-2xl pointer-events-none"
                                                style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 40%)' }}
                                            />

                                            {isActive && (
                                                <motion.div
                                                    layoutId="tab-glow-ring"
                                                    className="absolute -inset-[2px] rounded-2xl -z-10"
                                                    style={{ background: 'linear-gradient(135deg, #2563EB, #38BDF8, #F97316)' }}
                                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                                />
                                            )}
                                            {isActive && (
                                                <motion.div layoutId="tab-glow-fill" className="absolute inset-[2px] rounded-[14px] bg-white -z-[9]" />
                                            )}

                                            <Icon size={24} className={isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'} strokeWidth={1.8} />
                                            <span className={`text-[12px] font-semibold text-center leading-tight ${isActive ? 'text-[#1A1F2E]' : 'text-[#6B7280]'}`}>
                                                {uc.title}
                                            </span>

                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.span
                                                        key="active-badge"
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -4 }}
                                                        className="inline-flex items-center gap-1 text-[9px] font-medium text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                                        Active
                                                    </motion.span>
                                                )}
                                                {isActive && !userInteracted && (
                                                    <motion.div
                                                        key="progress-bar"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: "100%" }}
                                                        transition={{ duration: 6, ease: "linear" }}
                                                        className="absolute bottom-0 left-0 h-[3px] bg-blue-500"
                                                    />
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </div>

                                    {/* connector line + glowing dot resting on the ring */}
                                    <div className="w-px h-6 md:h-8 bg-gradient-to-b from-[#BFDBFE] to-[#93C5FD]/40" />
                                    <motion.div
                                        className="w-2.5 h-2.5 rounded-full"
                                        animate={{
                                            backgroundColor: isActive ? '#2563EB' : '#BFDBFE',
                                            boxShadow: isActive ? '0 0 0 5px rgba(37,99,235,0.18), 0 0 14px rgba(37,99,235,0.5)' : '0 0 0 0px rgba(37,99,235,0)',
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Content Panel */}
                <div className="bg-white rounded-[24px] border border-[#E5E7EB] shadow-[0_12px_40px_rgba(0,0,0,0.04)] overflow-hidden lg:h-[540px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className="flex flex-col lg:flex-row lg:h-full"
                        >
                            {/* Left: eyebrow / headline / desc / stat */}
                            <div className="lg:w-[34%] p-8 md:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#F3F4F6]">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-orange)' }} />
                                    <span className="text-[12px] font-bold tracking-[0.15em] uppercase" style={{ color: 'var(--color-orange)' }}>
                                        {activeData.eyebrow}
                                    </span>
                                </div>

                                <h3
                                    className="text-[26px] md:text-[32px] font-bold text-[#1A1F2E] mb-4 leading-tight"
                                    style={{ fontFamily: "'DM Serif Display', serif" }}
                                >
                                    {activeData.headline}
                                </h3>
                                <p className="text-[#6B7280] text-[15px] leading-relaxed mb-8">
                                    {activeData.desc}
                                </p>

                                <div className="flex items-center gap-4 bg-[#F8FAFC] rounded-2xl p-4">
                                    <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                                        <TrendingUp size={20} className="text-[#2563EB]" />
                                    </div>
                                    <div>
                                        <div className="text-[30px] font-bold tracking-tight text-[#1A1F2E] leading-none">
                                            <AnimatedMetric value={activeData.stat.value} />
                                        </div>
                                        <p className="text-[13px] font-medium text-[#6B7280] leading-snug mt-1">
                                            {activeData.stat.label}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Middle: feature list with connector stubs */}
                            <div className="lg:w-[28%] p-8 md:p-10 flex flex-col justify-center gap-5 border-b lg:border-b-0 lg:border-r border-[#F3F4F6]">
                                {activeData.features.map((feature, idx) => {
                                    const FIcon = feature.icon;
                                    return (
                                        <motion.div
                                            key={feature.title}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.08 }}
                                            className="relative flex gap-3 bg-white rounded-xl"
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center flex-shrink-0">
                                                <FIcon size={16} className="text-[#2563EB]" strokeWidth={2} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-[#1A1F2E] text-[14px]">{feature.title}</h4>
                                                <p className="text-[13px] text-[#6B7280] leading-snug mt-0.5">{feature.desc}</p>
                                            </div>

                                            {/* dashed connector stub toward the visual (desktop only) */}
                                            <div className="hidden lg:flex items-center absolute -right-8 top-1/2 -translate-y-1/2">
                                                <div className="w-6 border-t-2 border-dashed border-[#BFDBFE]" />
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#93C5FD] -ml-0.5" />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Right: visual + floating badges */}
                            <div className="lg:w-[38%] relative min-h-[320px] md:min-h-[380px] lg:min-h-0 lg:h-full overflow-hidden bg-[#F8FAFC]">
                                <motion.div
                                    initial={{ scale: 1.05, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <img
                                        src={activeData.image}
                                        alt={activeData.title}
                                        className="w-full h-full object-cover object-center"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                                </motion.div>

                                {activeData.badges.map((badge, idx) => (
                                    <FloatingBadge key={badge.label} badge={badge} index={idx} />
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom feature strip */}
                <div className="mt-8 bg-white rounded-2xl border border-[#F3F4F6] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bottomStrip.map((item, idx) => {
                        const BIcon = item.icon;
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08, duration: 0.5 }}
                                className="flex items-start gap-3"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                                    <BIcon size={18} className="text-[#2563EB]" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#1A1F2E] text-[14px] leading-snug">{item.title}</h4>
                                    <p className="text-[13px] text-[#6B7280] leading-snug mt-1">{item.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}