import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import hubImg from '../assets/sections/manufacturing-product.png';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

const sources = [
    { name: 'SAP', color: '#0070C0' },
    { name: 'Oracle', color: '#C74634' },
    { name: 'Tally', color: '#D4AF37' },
    { name: 'Shopify', color: '#96BF48' },
    { name: 'Salesforce', color: '#00A1E0' },
    { name: 'REST API', color: '#7c3aed' },
];

const outputs = ['Purchase Orders', 'Price Updates', 'Stock Transfers', 'Alerts & Reports'];

export default function Integration() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section ref={ref} id="integration" className="section-light-alt" style={{ padding: 'clamp(80px, 12vw, 160px) 0' }}>
            <div className="max-w-[1400px] mx-auto" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>

                {/* ─── TWO-COLUMN GRID ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>

                    {/* LEFT — Image */}
                    <motion.div initial={{ opacity: 0, x: -40, scale: 0.96 }} animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ duration: 1, delay: 0.1, ease }}>
                        <div className="img-showcase" style={{ overflow: 'hidden', borderRadius: '28px' }}>
                            <img src={hubImg} alt="Integration Hub" loading="lazy" decoding="async" style={{ objectPosition: 'center', width: '100%', height: '100%', objectFit: 'cover', minHeight: 400 }} />
                        </div>
                    </motion.div>

                    {/* RIGHT — Content */}
                    <div>
                        {/* Header */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease }}>
                            <span className="eyebrow">Integration</span>
                        </motion.div>
                        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, ease }}
                            style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)', color: '#0F172A', lineHeight: 1.08, margin: '24px 0 12px' }}
                        >
                            No rip-and-replace.{' '}<span className="gradient-text">Plug and play.</span>
                        </motion.h2>
                        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
                            style={{ fontSize: '16px', color: '#64748b', maxWidth: '480px', marginBottom: 'clamp(28px, 4vw, 44px)' }}
                        >Works with your existing stack. Live in under 48 hours.</motion.p>

                        {/* Flow diagram */}
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]" style={{ gap: 'clamp(16px, 3vw, 32px)', alignItems: 'center' }}>
                            {/* Sources */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px', textAlign: 'center' }}>Your Systems</p>
                                {sources.map((s, i) => (
                                    <motion.div key={s.name} initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease }}
                                        className="card-light flex items-center gap-3" style={{ padding: '12px 16px', borderRadius: '14px' }}
                                    >
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color, flexShrink: 0, boxShadow: `0 0 8px ${s.color}30` }} />
                                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#0F172A', fontWeight: 600 }}>{s.name}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Center G9 */}
                            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, delay: 0.5, ease }}
                                className="flex flex-col items-center"
                            >
                                <div className="dark-container noise-overlay" style={{ padding: '28px 32px', textAlign: 'center', borderRadius: '20px' }}>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', color: '#60a5fa', marginBottom: '4px' }}>AIGENTG9</div>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#475569', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Intelligence Layer</div>
                                    <div className="gradient-text" style={{ fontFamily: "'DM Serif Display', serif", fontSize: '40px', margin: '12px 0 4px', WebkitBackgroundClip: 'text' }}>9</div>
                                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: '#475569', letterSpacing: '0.15em' }}>AI AGENTS</div>
                                </div>
                            </motion.div>

                            {/* Outputs */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px', textAlign: 'center' }}>Decision Output</p>
                                {outputs.map((o, i) => (
                                    <motion.div key={o} initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: 0.5 + i * 0.06, ease }}
                                        className="card-light flex items-center gap-3" style={{ padding: '12px 16px', borderRadius: '14px', borderColor: 'rgba(37,99,235,0.12)' }}
                                    >
                                        <span className="active-dot" style={{ flexShrink: 0 }} />
                                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: '#2563EB', fontWeight: 600 }}>{o}</span>
                                        <ArrowRight size={12} style={{ color: '#94a3b8', marginLeft: 'auto' }} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
