import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
    { title: "Adopt", desc: "Integrate AI agents into your core workflows" },
    { title: "Automate", desc: "Let Generation-9 intelligence handle decisions at scale" },
    { title: "Evolve", desc: "Lead the next generation of intelligent enterprise automation" }
];

export default function BrandStory() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <section ref={ref} id="how-it-works" style={{ background: '#FAF9F6', padding: 'clamp(80px, 12vw, 160px) 0' }}>
            <div className="max-w-[1000px] mx-auto" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
                
                <div className="text-center" style={{ marginBottom: 'clamp(50px, 8vw, 80px)' }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                            color: '#1A1F2E',
                            lineHeight: 1.2,
                            fontWeight: 700
                        }}
                    >
                        Your Path to Intelligent Automation
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Connecting Line - Desktop (Horizontal) */}
                    <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[2px] z-0" style={{ background: 'rgba(176, 141, 87, 0.2)' }}>
                        <motion.div
                            style={{ width: '100%', height: '100%', background: '#B08D57', transformOrigin: 'left' }}
                            initial={{ scaleX: 0 }}
                            animate={inView ? { scaleX: 1 } : {}}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        />
                    </div>
                    
                    {/* Connecting Line - Mobile (Vertical) */}
                    <div className="md:hidden absolute top-0 bottom-0 left-[27px] w-[2px] z-0" style={{ background: 'rgba(176, 141, 87, 0.2)' }}>
                        <motion.div
                            style={{ width: '100%', height: '100%', background: '#B08D57', transformOrigin: 'top' }}
                            initial={{ scaleY: 0 }}
                            animate={inView ? { scaleY: 1 } : {}}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-6 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div 
                                key={step.title}
                                className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center gap-6 md:gap-0 flex-1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.4 + (i * 0.2) }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={inView ? { scale: 1 } : {}}
                                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.5 + (i * 0.2) }}
                                    className="flex-shrink-0 flex items-center justify-center rounded-full md:mb-6"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        background: '#FFFFFF',
                                        border: '2px solid #B08D57',
                                        boxShadow: '0 4px 12px rgba(176,141,87,0.15)',
                                        fontFamily: "'DM Serif Display', serif",
                                        fontSize: '24px',
                                        color: '#B08D57',
                                        lineHeight: 1,
                                        zIndex: 10
                                    }}
                                >
                                    {i + 1}
                                </motion.div>
                                
                                <div>
                                    <h3 style={{
                                        fontFamily: "'DM Serif Display', serif",
                                        fontSize: '24px',
                                        color: '#1A1F2E',
                                        marginBottom: '12px'
                                    }}>
                                        {step.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '15px',
                                        color: '#4B5563',
                                        lineHeight: 1.6
                                    }}>
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
