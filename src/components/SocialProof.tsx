import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(target: number, durationSec: number, active: boolean, suffix = '', prefix = '') {
    const [display, setDisplay] = useState(prefix + '0' + suffix);
    useEffect(() => {
        if (!active) return;
        let start: number | null = null;
        let raf: number;
        const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / (durationSec * 1000), 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = target * eased;
            const formatted = target % 1 !== 0 ? val.toFixed(1) : String(Math.round(val));
            setDisplay(prefix + formatted + suffix);
            if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [active, target, durationSec, suffix, prefix]);
    return display;
}

const metrics = [
    { value: 40, suffix: '%', label: 'Reduction in Inventory Cost' },
    { value: 3.2, suffix: '×', label: 'First-Year ROI' },
    { value: 35, suffix: '%', label: 'Boost in Forecast Accuracy' }
];

export default function SocialProof() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section ref={ref} id="roi" style={{ background: '#0A0E17', position: 'relative', padding: 'clamp(80px, 12vw, 160px) 0', overflow: 'hidden' }}>
            
            {/* Radial glow background */}
            <div 
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '60vw',
                    height: '60vw',
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.08) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <div className="max-w-[1200px] mx-auto relative z-10" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
                
                {/* Header */}
                <div className="text-center" style={{ marginBottom: 'clamp(40px, 6vw, 80px)' }}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true, amount: 0.2 }} 
                        transition={{ duration: 0.4 }}
                    >
                        <span style={{
                            display: 'inline-block',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            color: '#22D3EE',
                            marginBottom: '20px',
                            textTransform: 'uppercase'
                        }}>
                            Proven Impact
                        </span>
                    </motion.div>

                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true, amount: 0.2 }} 
                        transition={{ duration: 0.4, delay: 0.1 }}
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                            color: '#F1F5F9', 
                            lineHeight: 1.1,
                            fontWeight: 700
                        }}
                    >
                        Real Impact, Measured in Numbers
                    </motion.h2>
                </div>

                {/* Metrics Row */}
                <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-12 md:gap-0">
                    {metrics.map((metric, i) => (
                        <MetricBlock 
                            key={metric.label} 
                            metric={metric} 
                            index={i} 
                            isLast={i === metrics.length - 1} 
                            inView={inView} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function MetricBlock({ metric, index, isLast, inView }: { metric: (typeof metrics)[0], index: number, isLast: boolean, inView: boolean }) {
    const display = useCountUp(metric.value, 1.8, inView, metric.suffix);
    
    return (
        <div className="flex flex-col md:flex-row items-center flex-1 relative">
            <motion.div 
                className="flex-1 text-center px-4 w-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
            >
                {/* Number with glow effect */}
                <div className="relative inline-block mb-4">
                    {/* Pulsing glow behind number when counting */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ 
                            background: 'rgba(34, 211, 238, 0.2)',
                            filter: 'blur(30px)' 
                        }}
                        animate={{ opacity: inView ? [0, 1, 0] : 0 }}
                        transition={{ duration: 2, times: [0, 0.5, 1], repeat: 1 }}
                    />
                    
                    <div
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                            lineHeight: 1,
                            background: 'linear-gradient(135deg, #22D3EE 0%, #FFFFFF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            position: 'relative',
                            zIndex: 10
                        }}
                    >
                        {display}
                    </div>
                </div>
                
                <p style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#94A3B8',
                    maxWidth: '200px',
                    margin: '0 auto',
                    fontWeight: 500,
                    lineHeight: 1.6
                }}>
                    {metric.label}
                </p>
            </motion.div>

            {/* Vertical Divider for Desktop */}
            {!isLast && (
                <motion.div
                    className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px bg-white/10"
                    initial={{ height: 0 }}
                    whileInView={{ height: '70%' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                />
            )}
        </div>
    );
}
