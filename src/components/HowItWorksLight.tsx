import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plug, Settings, RefreshCcw } from 'lucide-react';
import robotImg from '../assets/robot.png';

const steps = [
    {
        title: "Adopt",
        desc: "We connect Zappcode's AI agents to your current systems — no need to replace anything you already use.",
        icon: Plug,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-100",
        shadow: "shadow-[0_0_30px_rgba(59,130,246,0.3)]"
    },
    {
        title: "Automate",
        desc: "The AI agents start handling forecasting, pricing, and planning decisions — working around the clock without needing manual input.",
        icon: Settings,
        color: "text-orange-500",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-100",
        shadow: "shadow-[0_0_30px_rgba(249,115,22,0.3)]"
    },
    {
        title: "Evolve",
        desc: "The system keeps learning and improving every day, so it gets smarter and more accurate over time.",
        icon: RefreshCcw,
        color: "text-purple-500",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-100",
        shadow: "shadow-[0_0_30px_rgba(168,85,247,0.3)]"
    }
];

export default function HowItWorksLight() {
    const sectionRef = useRef<HTMLElement>(null);
    const [, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Scroll tracking for drawing the line
    // const { scrollYProgress } = useScroll({
    //     target: sectionRef,
    //     offset: ['start 60%', 'end 80%']
    // });

    // const smoothProgress = useSpring(scrollYProgress, {
    //     stiffness: 100,
    //     damping: 20,
    //     restDelta: 0.001
    // });

    // Step activation states based on scroll progress
    // const step1Active = useTransform(smoothProgress, [0.1, 0.2], [0, 1]);
    // const step2Active = useTransform(smoothProgress, [0.45, 0.55], [0, 1]);
    // const step3Active = useTransform(smoothProgress, [0.8, 0.9], [0, 1]);

    // const activeStates = [step1Active, step2Active, step3Active];
    // const colors = ['var(--color-blue)', 'var(--color-orange)', 'var(--color-cyan)'];

    return (
        <section ref={sectionRef} id="how-it-works-light" className="relative overflow-hidden" style={{ background: '#F8FAFC', padding: 'clamp(40px, 5vw, 60px) 0' }}>

            {/* Soft Background Illustration Fallback (Glass paths & gradients) */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-0 flex items-center justify-center">
                <div className="absolute w-[800px] h-[400px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-blob" />
                <div className="absolute w-[600px] h-[400px] bg-cyan-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 animate-blob animation-delay-2000 top-1/4 right-1/4" />
                <div className="absolute w-[700px] h-[500px] bg-orange-300 rounded-full mix-blend-multiply filter blur-[150px] opacity-50 animate-blob animation-delay-4000 bottom-1/4 left-1/4" />
                {/* Fallback for the generated image, you can replace the src with the actual image file once moved */}
                <div className="absolute inset-0 bg-[url('/src/assets/abstract_glass_path.png')] bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>

                {/* Header Section */}
                <div className="text-center" style={{ marginBottom: 'clamp(30px, 4vw, 40px)' }}>
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            color: 'var(--color-orange)',
                            display: 'block',
                            marginBottom: '16px',
                        }}
                    >
                        THE PROCESS
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={{
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                            color: 'var(--color-navy)',
                            lineHeight: 1.2,
                            fontWeight: 700,
                            marginBottom: '16px'
                        }}
                    >
                        Getting Started Is Simple
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(16px, 1.5vw, 20px)',
                            color: 'var(--color-text-gray)',
                            maxWidth: '600px',
                            margin: '0 auto'
                        }}
                    >
                        Three easy steps — no complicated setup, no long waiting.
                    </motion.p>
                </div>

                {/* Split Layout Container */}
                <div className="relative mb-12 md:mb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Left Column: Vertical Timeline */}
                    <div className="w-full lg:w-[45%] flex flex-col gap-4 relative">
                        {/* Vertical Connecting Line */}
                        <div className="absolute left-[24px] top-8 bottom-8 w-[2px] bg-slate-100 hidden md:block z-0" />

                        {steps.map((step, i) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                className="flex gap-4 md:gap-6 relative z-10 w-full"
                            >
                                {/* Glowing Icon */}
                                <div className="hidden md:flex w-[48px] flex-shrink-0 justify-center z-10 bg-[#F8FAFC]">
                                    <div className={`w-[48px] h-[48px] rounded-full flex items-center justify-center ${step.bgColor} ${step.shadow} border-2 border-white relative`}>
                                        <div className="absolute inset-0 rounded-full bg-white/50 backdrop-blur-sm" />
                                        <step.icon size={24} className={`relative z-10 ${step.color}`} strokeWidth={2} />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className={`flex-1 bg-white rounded-xl p-4 md:p-5 border-2 ${step.borderColor} shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-transform hover:-translate-y-1 duration-300`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[13px] font-bold ${step.bgColor} ${step.color}`}>
                                            0{i + 1}
                                        </span>
                                        <h3 className="font-bold text-lg md:text-xl text-slate-900 font-serif">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-500 text-[13px] md:text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column: 3D Robot Image Display */}
                    <div className="w-full lg:w-[55%] relative">
                        <div className="relative z-10 w-full mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative w-full rounded-3xl overflow-visible perspective-[2000px]"
                            >
                                {/* Decorative background glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-orange-400/20 to-cyan-400/20 blur-[60px] transform scale-105" />

                                <motion.img
                                    src={robotImg}
                                    alt="Getting Started Steps"
                                    className="relative z-10 w-full max-h-[40vh] md:max-h-[65vh] h-auto drop-shadow-2xl object-contain mx-auto"
                                    whileHover={{
                                        scale: 1.02,
                                        rotateX: 2,
                                        rotateY: -2,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    style={{
                                        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.1))'
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bottom Info Bar with Conic Gradient Border */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex justify-center relative mt-8"
                >
                    <div className="relative p-[2px] rounded-full overflow-hidden w-full md:w-auto mx-auto shadow-lg">
                        {/* Rotating Gradient Background for Border */}
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,var(--color-blue),var(--color-orange),var(--color-cyan),var(--color-blue))] animate-[spin_4s_linear_infinite]" />

                        {/* Inner Content Area */}
                        <div className="relative bg-white rounded-full py-5 px-8 md:px-12 flex flex-col md:flex-row items-center gap-4 md:gap-10 w-full h-full">
                            <div className="flex items-center gap-3">
                                <motion.span
                                    className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                />
                                <span className="text-[15px] font-bold text-slate-800 whitespace-nowrap">6–8 weeks to go live</span>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-slate-200"></div>
                            <div className="flex items-center gap-3">
                                <motion.span
                                    className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.6 }}
                                />
                                <span className="text-[15px] font-bold text-slate-800 whitespace-nowrap">No disruption to your current setup</span>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-slate-200"></div>
                            <div className="flex items-center gap-3">
                                <motion.span
                                    className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1.2 }}
                                />
                                <span className="text-[15px] font-bold text-slate-800 whitespace-nowrap">Works 24/7</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}