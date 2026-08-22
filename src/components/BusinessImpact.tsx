// import { useRef, useState, useEffect } from 'react';
// import { motion, useInView } from 'framer-motion';

// function useCountUp(target: number, active: boolean, duration: number = 2, decimals = 0) {
//     const [val, setVal] = useState('0');
//     useEffect(() => {
//         if (!active) return;
//         let start: number | null = null;
//         let raf: number;
//         // easeOutExpo easing function
//         const easeOutExpo = (x: number): number => {
//             return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
//         };
//         const step = (ts: number) => {
//             if (!start) start = ts;
//             const t = Math.min((ts - start) / (duration * 1000), 1);
//             const eased = easeOutExpo(t);
//             setVal(decimals > 0 ? (target * eased).toFixed(decimals) : String(Math.round(target * eased)));
//             if (t < 1) raf = requestAnimationFrame(step);
//         };
//         raf = requestAnimationFrame(step);
//         return () => cancelAnimationFrame(raf);
//     }, [active, target, duration, decimals]);
//     return val;
// }

// const metrics = [
//     {
//         num: 40,
//         suffix: '%',
//         decimals: 0,
//         heading: 'Lower inventory costs',
//         desc: 'Optimized stock levels free up working capital that was sitting idle in warehouses — capital you can redeploy to growth.'
//     },
//     {
//         num: 3.2,
//         suffix: '×',
//         decimals: 1,
//         heading: 'Return on investment in year one',
//         desc: 'Enterprises recover their full investment and see 3x returns within the first 12 months of going live.'
//     },
//     {
//         num: 35,
//         suffix: '%',
//         decimals: 0,
//         heading: 'More accurate forecasts',
//         desc: 'Fewer emergency reorders, fewer markdowns, and far more confident production planning across every SKU.'
//     },
//     {
//         num: 65,
//         suffix: '%',
//         decimals: 0,
//         heading: 'Fewer stockouts',
//         desc: "Customers find what they're looking for — protecting revenue and strengthening brand trust at every touchpoint."
//     }
// ];

// function MetricCard({
//     metric,
//     index,
//     inView
// }: {
//     metric: any;
//     index: number;
//     inView: boolean;
// }) {
//     // Counting logic
//     const countVal = useCountUp(metric.num, inView, 1.8, metric.decimals);

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
//             transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
//             className="group relative bg-[#131C2D] border border-white/5 rounded-[16px] p-8 overflow-hidden h-full flex flex-col"
//             style={{
//                 boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
//                 transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
//             }}
//             whileHover={{
//                 translateY: -6,
//                 boxShadow: '0 12px 30px rgba(249,115,22,0.1)'
//             }}
//         >
//             <div className="mb-4">
//                 <span className="text-[56px] md:text-[64px] font-bold leading-none tracking-tight inline-block text-transparent bg-clip-text text-gradient-brand">
//                     {countVal}{metric.suffix}
//                 </span>
//             </div>

//             <h3 className="text-[20px] md:text-[22px] font-bold text-white mb-3 leading-snug">
//                 {metric.heading}
//             </h3>

//             <p className="text-[15px] text-[#94A3B8] leading-[1.6]">
//                 {metric.desc}
//             </p>
//         </motion.div>
//     );
// }

// export default function BusinessImpact() {
//     const containerRef = useRef<HTMLElement>(null);
//     const inView = useInView(containerRef, { once: true, amount: 0.3 });

//     return (
//         <section
//             id="roi"
//             ref={containerRef}
//             className="relative pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden"
//             style={{ background: 'var(--color-navy)' }}
//         >
//             <div className="max-w-[1280px] mx-auto px-6 relative z-10">
//                 {/* Header Area */}
//                 <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-20">
//                     <motion.span
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
//                         transition={{ duration: 0.5, ease: "easeOut" }}
//                         className="text-[12px] md:text-sm font-bold tracking-[0.15em] uppercase mb-4"
//                         style={{ color: 'var(--color-cyan)' }}
//                     >
//                         THE RESULTS
//                     </motion.span>

//                     <motion.h2
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//                         transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
//                         className="text-[36px] md:text-[40px] lg:text-[48px] font-bold text-white mb-4 tracking-tight leading-[1.1]"
//                         style={{ fontFamily: "'DM Serif Display', serif" }}
//                     >
//                         Real Results Businesses Are Already Seeing
//                     </motion.h2>

//                     <motion.p
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//                         transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
//                         className="text-[18px] md:text-[20px] text-[#94A3B8] max-w-[600px]"
//                     >
//                         These numbers come from real companies already using Zappcode.
//                     </motion.p>
//                 </div>

//                 {/* Grid Area */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
//                     {metrics.map((metric, i) => (
//                         <MetricCard
//                             key={i}
//                             metric={metric}
//                             index={i}
//                             inView={inView}
//                         />
//                     ))}
//                 </div>

//                 {/* Bottom Supporting Line */}
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={inView ? { opacity: 1 } : { opacity: 0 }}
//                     transition={{ duration: 0.8, delay: (metrics.length * 0.12) + 0.6, ease: "easeOut" }}
//                     className="text-center px-4"
//                 >
//                     <p className="text-[14px] md:text-[15px] italic text-[#64748B]">
//                         These aren't projections — they're outcomes measured across live enterprise deployments in FMCG, Retail, Pharma, and Manufacturing.
//                     </p>
//                 </motion.div>
//             </div>
//         </section>
//     );
// }


import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, TrendingUp, Target, ShieldCheck } from 'lucide-react';

function useCountUp(target: number, active: boolean, duration: number = 2, decimals = 0) {
    const [val, setVal] = useState('0');
    useEffect(() => {
        if (!active) return;
        let start: number | null = null;
        let raf: number;
        // easeOutExpo easing function
        const easeOutExpo = (x: number): number => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };
        const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / (duration * 1000), 1);
            const eased = easeOutExpo(t);
            setVal(decimals > 0 ? (target * eased).toFixed(decimals) : String(Math.round(target * eased)));
            if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [active, target, duration, decimals]);
    return val;
}

// Theme per card: icon, icon/border glow color, number gradient, decorative pattern
const metrics = [
    {
        num: 40,
        suffix: '%',
        decimals: 0,
        heading: 'Lower inventory costs',
        desc: 'Optimized stock levels free up working capital that was sitting idle in warehouses — capital you can redeploy to growth.',
        icon: Package,
        glow: '#3B82F6',
        numGradient: 'linear-gradient(90deg, #60A5FA 0%, #A78BFA 60%, #C084FC 100%)',
        pattern: 'waves'
    },
    {
        num: 3.2,
        suffix: '×',
        decimals: 1,
        heading: 'Return on investment in year one',
        desc: 'Enterprises recover their full investment and see 3x returns within the first 12 months of going live.',
        icon: TrendingUp,
        glow: '#F97316',
        numGradient: 'linear-gradient(90deg, #818CF8 0%, #C084FC 45%, #FB923C 100%)',
        pattern: 'bars'
    },
    {
        num: 35,
        suffix: '%',
        decimals: 0,
        heading: 'More accurate forecasts',
        desc: 'Fewer emergency reorders, fewer markdowns, and far more confident production planning across every SKU.',
        icon: Target,
        glow: '#3B82F6',
        numGradient: 'linear-gradient(90deg, #60A5FA 0%, #38BDF8 55%, #FB923C 100%)',
        pattern: 'line'
    },
    {
        num: 65,
        suffix: '%',
        decimals: 0,
        heading: 'Fewer stockouts',
        desc: "Customers find what they're looking for — protecting revenue and strengthening brand trust at every touchpoint.",
        icon: ShieldCheck,
        glow: '#F97316',
        numGradient: 'linear-gradient(90deg, #60A5FA 0%, #FB923C 70%, #F97316 100%)',
        pattern: 'radial'
    }
];

function CardBackdrop({ pattern, glow }: { pattern: string; glow: string }) {
    if (pattern === 'waves') {
        return (
            <svg className="absolute bottom-0 left-0 w-full h-28 opacity-40" viewBox="0 0 300 100" preserveAspectRatio="none">
                {[0, 1, 2].map((i) => (
                    <path
                        key={i}
                        d={`M0,${60 + i * 12} Q75,${30 + i * 12} 150,${55 + i * 12} T300,${45 + i * 12}`}
                        fill="none"
                        stroke={glow}
                        strokeOpacity={0.35 - i * 0.1}
                        strokeWidth="1.5"
                    />
                ))}
            </svg>
        );
    }
    if (pattern === 'bars') {
        return (
            <svg className="absolute bottom-0 left-0 w-full h-24 opacity-70" viewBox="0 0 200 80" preserveAspectRatio="none">
                <polyline points="10,70 40,58 70,60 100,40 130,30 160,18 190,8" fill="none" stroke={glow} strokeWidth="2" />
                {[10, 40, 70, 100, 130, 160, 190].map((x, i) => (
                    <rect key={i} x={x - 6} y={70 - (i + 1) * 8} width="12" height={(i + 1) * 8} fill={glow} opacity={0.15 + i * 0.05} rx="2" />
                ))}
            </svg>
        );
    }
    if (pattern === 'line') {
        return (
            <svg className="absolute bottom-0 left-0 w-full h-24 opacity-70" viewBox="0 0 200 80" preserveAspectRatio="none">
                <polyline
                    points="10,55 35,60 60,45 85,50 110,30 135,35 160,15 190,20"
                    fill="none"
                    stroke={glow}
                    strokeWidth="2"
                />
                {[10, 35, 60, 85, 110, 135, 160, 190].map((x, i) => {
                    const ys = [55, 60, 45, 50, 30, 35, 15, 20];
                    return <circle key={i} cx={x} cy={ys[i]} r="3" fill={glow} />;
                })}
            </svg>
        );
    }
    // radial
    return (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 pointer-events-none">
            {[1, 2, 3, 4].map((i) => (
                <div
                    key={i}
                    className="absolute rounded-full border"
                    style={{
                        width: `${i * 22}%`,
                        height: `${i * 22}%`,
                        left: `${50 - (i * 22) / 2}%`,
                        bottom: `-${(i * 22) / 3}%`,
                        borderColor: glow,
                        opacity: 0.25 - i * 0.04
                    }}
                />
            ))}
            <div
                className="absolute left-1/2 -translate-x-1/2 bottom-0 w-1 h-16 rounded-full"
                style={{ background: `linear-gradient(to top, ${glow}, transparent)` }}
            />
        </div>
    );
}

function MetricCard({
    metric,
    index,
    inView
}: {
    metric: any;
    index: number;
    inView: boolean;
}) {
    const countVal = useCountUp(metric.num, inView, 1.8, metric.decimals);
    const Icon = metric.icon;
    const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ rx: py * -8, ry: px * 8 });
    };
    const handleMouseLeave = () => setTilt({ rx: 0, ry: 0 });

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
            style={{ perspective: 1000 }}
            className="h-full"
        >
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX: tilt.rx, rotateY: tilt.ry, translateY: tilt.rx !== 0 || tilt.ry !== 0 ? -6 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                style={{
                    transformStyle: 'preserve-3d',
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    boxShadow: `0 4px 24px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04) inset`,
                }}
                className="group relative border border-white/10 rounded-[16px] p-6 sm:p-7 md:p-8 overflow-hidden h-full flex flex-col"
            >
                {/* edge glow on hover */}
                <div
                    className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `0 0 0 1px ${metric.glow}55, 0 12px 40px ${metric.glow}22` }}
                />

                {/* decorative background pattern */}
                <CardBackdrop pattern={metric.pattern} glow={metric.glow} />

                {/* icon badge */}
                <div
                    className="relative z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-5 border"
                    style={{
                        borderColor: `${metric.glow}55`,
                        background: `${metric.glow}14`,
                        boxShadow: `0 0 16px ${metric.glow}33`
                    }}
                >
                    <Icon size={20} color={metric.glow} strokeWidth={2} />
                </div>

                <div className="relative z-10 mb-3">
                    <span
                        className="text-[44px] sm:text-[52px] md:text-[60px] font-bold leading-none tracking-tight inline-block text-transparent bg-clip-text"
                        style={{ backgroundImage: metric.numGradient }}
                    >
                        {countVal}{metric.suffix}
                    </span>
                </div>

                <h3 className="relative z-10 text-[18px] sm:text-[20px] md:text-[22px] font-bold text-white mb-2 leading-snug">
                    {metric.heading}
                </h3>

                <div
                    className="relative z-10 w-10 h-[3px] rounded-full mb-3"
                    style={{ background: metric.numGradient }}
                />

                <p className="relative z-10 text-[14px] sm:text-[15px] text-[#94A3B8] leading-[1.6]">
                    {metric.desc}
                </p>
            </motion.div>
        </motion.div>
    );
}

export default function BusinessImpact() {
    const containerRef = useRef<HTMLElement>(null);
    const inView = useInView(containerRef, { once: true, amount: 0.3 });

    return (
        <section
            id="roi"
            ref={containerRef}
            className="relative pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden"
            style={{ background: 'var(--color-navy, #0A0F1E)' }}
        >
            {/* ambient background glow */}
            <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, #1E3A8A33, transparent 70%)' }} />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle, #F9731622, transparent 70%)' }} />
            </div>

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
                {/* Header Area */}
                <div className="flex flex-col items-center justify-center text-center mb-14 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-[12px] md:text-sm font-bold tracking-[0.15em] uppercase mb-4"
                        style={{ color: 'var(--color-cyan, #38BDF8)' }}
                    >
                        THE RESULTS
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                        className="text-[30px] sm:text-[36px] md:text-[40px] lg:text-[48px] font-bold text-white mb-4 tracking-tight leading-[1.1]"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                        Real Results Businesses Are{' '}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: 'linear-gradient(90deg, #FB923C, #F97316)' }}
                        >
                            Already Seeing
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="text-[16px] sm:text-[18px] md:text-[20px] text-[#94A3B8] max-w-[600px] px-4"
                    >
                        These numbers come from real companies already using Zappcode.
                    </motion.p>
                </div>

                {/* Grid Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 mb-14 md:mb-16">
                    {metrics.map((metric, i) => (
                        <MetricCard
                            key={i}
                            metric={metric}
                            index={i}
                            inView={inView}
                        />
                    ))}
                </div>

                {/* Bottom Supporting Line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: (metrics.length * 0.12) + 0.6, ease: "easeOut" }}
                    className="text-center px-4 relative"
                >
                    <div className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-5" />
                    <p className="text-[13px] sm:text-[14px] md:text-[15px] italic text-[#64748B]">
                        These aren't projections — they're outcomes measured across live enterprise deployments in FMCG, Retail, Pharma, and Manufacturing.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
