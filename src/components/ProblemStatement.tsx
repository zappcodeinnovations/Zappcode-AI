import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingDown, Package, Clock, Cpu, ShieldCheck, Activity } from 'lucide-react';

function useCountUp(target: number, active: boolean, suffix = '', prefix = '') {
    const [display, setDisplay] = useState(prefix + '0' + suffix);
    useEffect(() => {
        if (!active) return;
        let start: number | null = null;
        let raf: number;
        const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / 2000, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const val = target * eased;
            const formatted = target % 1 !== 0 ? val.toFixed(1) : String(Math.round(val));
            setDisplay(prefix + formatted + suffix);
            if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [active, target, suffix, prefix]);
    return display;
}

const stats = [
    { value: 73, suffix: '%', label: 'Forecasts turn out wrong', icon: TrendingDown },
    { value: 2.3, suffix: 'Cr', prefix: '₹', label: 'Lost every year, per product', icon: Package },
    { value: 4.7, suffix: ' days', label: 'Time taken to react to a market change', icon: Clock },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } }
};

export default function ProblemStatement() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section 
            ref={ref} 
            id="problem" 
            className="relative pt-16 md:pt-24 pb-8 md:pb-12"
            style={{ background: 'var(--color-light-bg)' }}
        >
            <div className="relative z-10 max-w-[1200px] mx-auto" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    
                    {/* Left — Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div style={{ marginBottom: '24px' }}>
                            <span style={{
                                display: 'inline-block',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '11px',
                                fontWeight: 600,
                                letterSpacing: '0.15em',
                                color: 'var(--color-orange)',
                                textTransform: 'uppercase'
                            }}>
                                THE PROBLEM
                            </span>
                            <div style={{ width: '40px', height: '1px', background: 'var(--color-orange)', marginTop: '12px' }} />
                        </div>

                        <h2
                            style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: 'clamp(2.5rem, 4vw, 3rem)',
                                color: '#0F172A', 
                                lineHeight: 1.15,
                                marginBottom: '24px',
                                fontWeight: 700,
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Most Companies Are<br/>Still Guessing Demand
                        </h2>

                        <p
                            style={{ 
                                fontSize: 'clamp(16px, 1.5vw, 17px)', 
                                color: '#64748B', 
                                lineHeight: 1.7, 
                                maxWidth: '480px'
                            }}
                        >
                            Many businesses still plan using spreadsheets and old reports. By the time they notice a problem, it's already too late &mdash; leading to lost sales, wasted stock, and missed opportunities.
                        </p>

                        <div className="mt-8 mb-4 border-l-2 pl-4 py-1" style={{ borderColor: 'var(--color-cyan)' }}>
                            <p style={{ fontStyle: 'italic', color: 'var(--color-text-gray)', fontSize: '15px' }}>
                                "Nearly 9 out of 10 companies still can't predict demand accurately."
                            </p>
                        </div>

                        <div className="flex flex-row items-center gap-2 mt-6 whitespace-nowrap overflow-x-auto hide-scrollbar" style={{ background: '#FFFFFF', padding: '10px 16px', borderRadius: '50px', border: '1px solid rgba(0,0,0,0.05)', display: 'inline-flex', maxWidth: '100%' }}>
                            <div className="flex items-center gap-2">
                                <div style={{ background: 'rgba(37,99,235,0.1)', padding: '4px', borderRadius: '50%', color: 'var(--color-blue)' }}>
                                    <Cpu size={14} />
                                </div>
                                <span style={{ fontSize: '12.5px', color: 'var(--color-text-gray)', fontWeight: 500 }}>AI-Powered Planning</span>
                            </div>
                            <div style={{ width: '1px', height: '16px', background: '#E2E8F0', margin: '0 2px' }} />
                            <div className="flex items-center gap-2">
                                <div style={{ background: 'rgba(37,99,235,0.1)', padding: '4px', borderRadius: '50%', color: 'var(--color-blue)' }}>
                                    <ShieldCheck size={14} />
                                </div>
                                <span style={{ fontSize: '12.5px', color: 'var(--color-text-gray)', fontWeight: 500 }}>Enterprise Ready</span>
                            </div>
                            <div style={{ width: '1px', height: '16px', background: '#E2E8F0', margin: '0 2px' }} />
                            <div className="flex items-center gap-2">
                                <div style={{ background: 'rgba(37,99,235,0.1)', padding: '4px', borderRadius: '50%', color: 'var(--color-blue)' }}>
                                    <Activity size={14} />
                                </div>
                                <span style={{ fontSize: '12.5px', color: 'var(--color-text-gray)', fontWeight: 500 }}>Real-Time Signals</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right — Stats Cards */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="flex flex-col gap-4"
                    >
                        {stats.map((stat, i) => (
                            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

function StatCard({ stat, index, inView }: { stat: (typeof stats)[number]; index: number; inView: boolean }) {
    const display = useCountUp(stat.value, inView, stat.suffix, stat.prefix || '');
    const Icon = stat.icon;
    
    const colors = ['var(--color-blue)', 'var(--color-orange)', 'var(--color-cyan)'];
    const accentColor = colors[index % colors.length];

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -4, boxShadow: `0 12px 40px ${accentColor}25` }}
            className="group flex items-center justify-between transition-all duration-300 cursor-pointer"
            style={{ 
                background: '#FFFFFF',
                border: `1px solid ${accentColor}1A`,
                boxShadow: `0 4px 20px ${accentColor}0D`,
                borderRadius: '16px',
                padding: 'clamp(20px, 4vw, 32px) clamp(20px, 5vw, 40px)'
            }}
        >
            <div>
                <div 
                    style={{ 
                        fontFamily: "'DM Serif Display', serif", 
                        fontSize: '44px', 
                        color: '#0F172A', 
                        lineHeight: 1, 
                        marginBottom: '8px',
                        letterSpacing: '-0.02em'
                    }}
                >
                    {display}
                </div>
                <p 
                    style={{ 
                        fontFamily: "'JetBrains Mono', monospace", 
                        fontSize: '11px', 
                        letterSpacing: '0.12em', 
                        textTransform: 'uppercase', 
                        color: '#64748B', 
                        margin: 0,
                        fontWeight: 600
                    }}
                >
                    {stat.label}
                </p>
            </div>
            
            <div 
                className="group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${accentColor}1A 0%, #FFFFFF 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: accentColor,
                    flexShrink: 0
                }}
            >
                <Icon size={28} strokeWidth={1.5} />
            </div>
        </motion.div>
    );
}
