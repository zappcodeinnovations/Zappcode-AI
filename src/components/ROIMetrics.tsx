import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import roiImg from '../assets/sections/roi_chart.png';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

function useCountUp(target: number, active: boolean, decimals = 0) {
    const [val, setVal] = useState('0');
    useEffect(() => {
        if (!active) return;
        let start: number | null = null;
        let raf: number;
        const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / 2200, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(decimals > 0 ? (target * eased).toFixed(decimals) : String(Math.round(target * eased)));
            if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [active, target, decimals]);
    return val;
}

const metrics = [
    { value: 40, prefix: '↓', suffix: '%', label: 'Inventory Cost Reduction', sub: 'AI-precision demand forecasting eliminates overstocking', color: '#22C55E', barPct: 85 },
    { value: 35, prefix: '↑', suffix: '%', label: 'Forecast Accuracy Boost', sub: 'Rolling 90-day forecasts sharpen every cycle', color: '#60a5fa', barPct: 72 },
    { value: 2, prefix: '', suffix: '×', label: 'Supply Chain Agility', sub: 'Respond to demand shifts in hours, not weeks', color: '#818cf8', barPct: 55 },
    { value: 3.2, prefix: '', suffix: '×', label: 'First-Year ROI', sub: 'Average return across enterprise deployments', color: '#c084fc', decimals: 1, barPct: 92 },
];

export default function ROIMetrics() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="roi" className="section-dark noise-overlay" style={{ padding: 'clamp(80px, 12vw, 160px) 0' }}>
            <div className="max-w-[1400px] mx-auto" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left — Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 0.2, ease }}
                    >
                        <div className="img-showcase-dark" style={{ animation: 'float 7s ease-in-out infinite', maxHeight: '420px' }}>
                            <img src={roiImg} alt="ROI Analytics Visualization" loading="lazy" decoding="async" style={{ maxHeight: '420px', objectFit: 'cover', objectPosition: 'center' }} />
                        </div>
                    </motion.div>

                    {/* Right — Content */}
                    <div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
                            <span className="eyebrow eyebrow-dark">Business Impact</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.1, ease }}
                            style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: '#f1f5f9', lineHeight: 1.1, margin: '28px 0 20px' }}
                        >
                            Hard numbers for{' '}<span style={{ color: '#60a5fa' }}>hard decisions.</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                            style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.7, marginBottom: '36px' }}
                        >Built for enterprises that compete on intelligence, not instinct.</motion.p>

                        {/* Metrics */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {metrics.map((m, i) => (
                                <MetricRow key={m.label} m={m} index={i} inView={inView} />
                            ))}
                        </div>

                        {/* Highlight strip */}
                        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
                            className="flex flex-wrap" style={{ gap: '12px', marginTop: '32px' }}
                        >
                            {[
                                { val: '3.2×', label: 'ROI' },
                                { val: '48h', label: 'Deploy' },
                                { val: '9', label: 'Agents' },
                            ].map((item) => (
                                <span key={item.label} className="metric-badge-dark" style={{ gap: '10px' }}>
                                    <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '18px', color: '#60a5fa' }}>{item.val}</span>
                                    <span style={{ fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{item.label}</span>
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MetricRow({ m, index, inView }: { m: (typeof metrics)[number]; index: number; inView: boolean }) {
    const display = useCountUp(m.value, inView, (m as any).decimals ?? 0);
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="glass-card" style={{ padding: '20px 24px' }}
        >
            <div className="flex items-center gap-4">
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '28px', color: m.color, lineHeight: 1, minWidth: '80px' }}>
                    {m.prefix}{display}{m.suffix}
                </div>
                <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '2px' }}>{m.label}</p>
                    <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>{m.sub}</p>
                </div>
            </div>
            <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden', marginTop: '12px' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${m.barPct}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.5 + index * 0.15, ease }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${m.color}, ${m.color}88)`, borderRadius: '99px' }}
                />
            </div>
        </motion.div>
    );
}
