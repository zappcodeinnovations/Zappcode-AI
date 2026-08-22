import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function VisionCTA() {
    const navigate = useNavigate();
    return (
        <section style={{ 
            background: '#0A0E17', 
            position: 'relative', 
            overflow: 'hidden',
            padding: 'clamp(100px, 15vw, 200px) 0'
        }}>
            {/* Glowing Orb */}
            <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'clamp(300px, 50vw, 600px)',
                    height: 'clamp(300px, 50vw, 600px)',
                    background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            <div className="max-w-[800px] mx-auto text-center relative z-10" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        color: '#FFFFFF',
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        fontWeight: 700
                    }}
                >
                    The Future of Enterprise Belongs to Those Who Act with Intelligence
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                        fontSize: 'clamp(16px, 1.5vw, 20px)',
                        color: '#94A3B8',
                        lineHeight: 1.6,
                        marginBottom: '48px',
                        maxWidth: '600px',
                        margin: '0 auto 48px'
                    }}
                >
                    Not just data &mdash; Zappcode AI turns data into decisions.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.button
                        animate={{ boxShadow: ['0 0 15px rgba(34,211,238,0.2)', '0 0 30px rgba(34,211,238,0.5)', '0 0 15px rgba(34,211,238,0.2)'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34,211,238,0.8)' }}
                        style={{
                            background: '#22D3EE',
                            color: '#0A0E17',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '14px',
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            padding: '18px 40px',
                            borderRadius: '50px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onClick={() => navigate('/book-demo')}
                    >
                        Book Your Demo Today
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
