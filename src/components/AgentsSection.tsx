import { useRef, useState } from 'react';
import { motion, useInView, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { 
    LineChart, CloudRain, PackageSearch, 
    Tags, ShoppingCart, Map, 
    ShieldAlert, PieChart, Layers,
    ArrowRight, Play, X
} from 'lucide-react';
import aiAgentVideo from '../assets/ai-agent.mp4';

const easeOut = [0.23, 1, 0.32, 1] as const;

const agents = [
  {
    name: 'Forecast Agent',
    role: 'Baseline Demand Predictor',
    desc: "Looks at past sales and trends to predict what you'll sell next — for every single product.",
    icon: LineChart,
  },
  {
    name: 'Demand Sensing Agent',
    role: 'Real-Time Market Monitor',
    desc: 'Watches things like weather, events, and social media to catch sudden changes in demand early.',
    icon: CloudRain,
  },
  {
    name: 'Inventory Agent',
    role: 'Stock Health Manager',
    desc: 'Keeps just the right amount of stock — not too much, not too little.',
    icon: PackageSearch,
  },
  {
    name: 'Pricing & Promotion Agent',
    role: 'Revenue Maximizer',
    desc: "Suggests the best price and the right time to run a promotion, based on what's happening in the market.",
    icon: Tags,
  },
  {
    name: 'Replenishment Agent',
    role: 'Automated Ordering Engine',
    desc: 'Automatically places orders when stock runs low — no manual work needed.',
    icon: ShoppingCart,
  },
  {
    name: 'Logistics Agent',
    role: 'Network Flow Optimizer',
    desc: "Finds the fastest, cheapest shipping route — and reroutes automatically if there's a delay.",
    icon: Map,
  },
  {
    name: 'Supplier Risk Agent',
    role: 'Upstream Sentinel',
    desc: "Keeps an eye on your suppliers, warning you early if there's a risk to your supply.",
    icon: ShieldAlert,
  },
  {
    name: 'Allocation Agent',
    role: 'Scarcity Manager',
    desc: 'When stock is limited, decides the smartest way to share it across stores or regions.',
    icon: PieChart,
  },
  {
    name: 'Scenario Planning Agent',
    role: 'Strategic Simulator',
    desc: 'Lets you test "what if" situations before making a big decision — so you know the outcome in advance.',
    icon: Layers,
  }
];

export default function AgentsSection() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } }
    };

    return (
        <section id="agents" className="relative pt-20 md:pt-28 pb-20 md:pb-28 overflow-hidden" style={{ background: 'var(--color-navy)' }}>
            <div className="max-w-[1280px] mx-auto px-6 relative z-10">
                
                {/* Header Row */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                    <div className="max-w-3xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ marginBottom: '20px' }}
                        >
                            <span style={{
                                display: 'inline-block',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.15em',
                                color: 'var(--color-cyan)',
                                textTransform: 'uppercase'
                            }}>
                                THE TEAM
                            </span>
                        </motion.div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-[54px] font-bold text-white mb-6 tracking-tight leading-[1.1]"
                        >
                            9 AI Agents. Each an Expert at One Job.
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-[#94A3B8] text-lg md:text-xl leading-relaxed"
                        >
                            Instead of one tool trying to do everything, you get 9 specialists &mdash; each focused on solving one part of your supply chain.
                        </motion.p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <motion.button 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            onClick={() => setIsVideoOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 px-7 py-3.5 text-white rounded-full font-semibold flex items-center gap-2 relative overflow-hidden group bg-[#2563EB] hover:bg-[#3b82f6] transition-colors shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                        >
                            <Play size={18} className="fill-white" />
                            <span className="relative z-10 flex items-center gap-2">
                                Watch Video
                            </span>
                        </motion.button>

                        <motion.button 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 px-7 py-3.5 text-white rounded-full font-semibold flex items-center gap-2 relative overflow-hidden group bg-gradient-brand shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Explore AI Agents
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-20deg]" />
                        </motion.button>
                    </div>
                </div>

                {/* 3x3 Grid */}
                <motion.div 
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {agents.map((agent, i) => {
                        const num = String(i + 1).padStart(2, '0');
                        // Diagonal pattern for highlighted cards: 0, 4, 8
                        const isHighlighted = i === 0 || i === 4 || i === 8;
                        
                        return (
                            <motion.div key={agent.name} variants={itemVariants} className="h-full">
                                {isHighlighted ? (
                                    <HighlightedCard agent={agent} num={num} />
                                ) : (
                                    <DarkCard agent={agent} num={num} index={i} />
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Video Modal Overlay */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]/90 backdrop-blur-md p-4"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-5xl rounded-2xl overflow-hidden bg-transparent"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-[#EF4444] transition-colors border border-white/20"
                            >
                                <X size={20} />
                            </button>
                            <video 
                                src={aiAgentVideo} 
                                className="w-full h-auto max-h-[80vh] object-contain"
                                autoPlay 
                                controls
                                playsInline
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

// ─── Highlighted Gradient Card (Cards 1, 5, 9) ───
function HighlightedCard({ agent, num }: { agent: any, num: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const { currentTarget, clientX, clientY } = event;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div 
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{ 
                y: isHovered ? -8 : 0, 
                boxShadow: isHovered ? '0 20px 50px rgba(249,115,22,0.35)' : '0 10px 20px rgba(249,115,22,0.1)' 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-brand p-7 text-white h-full flex flex-col cursor-pointer"
            style={{ minHeight: '260px' }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 hidden md:block z-0"
                animate={{ opacity: isHovered ? 1 : 0 }}
                style={{
                    background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.15), transparent 80%)`
                }}
            />
            <div className="absolute inset-0 bg-white/5 opacity-50 mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10 flex flex-col h-full">
                <motion.div 
                    className="font-bold text-xl mb-3 origin-left text-white"
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {num}
                </motion.div>

                <motion.h3 
                    className="text-2xl font-bold mb-1"
                    animate={{ y: isHovered ? -2 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {agent.name}
                </motion.h3>
                
                <motion.p 
                    className="text-white/80 font-mono text-sm mb-4"
                    animate={{ y: isHovered ? -2 : 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                >
                    {agent.role}
                </motion.p>
                
                <p className="text-white/90 leading-relaxed text-[15px] mt-auto">
                    {agent.desc}
                </p>

                <motion.div 
                    className="absolute top-7 right-7 bg-white/20 p-3 rounded-xl backdrop-blur-md"
                    animate={{ 
                        rotate: isHovered ? [0, -10, 10, 0] : 0,
                        scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <agent.icon size={24} className="text-white" />
                </motion.div>
            </div>
        </motion.div>
    );
}

// ─── Dark Navy Card (Remaining Cards) ───
function DarkCard({ agent, num, index }: { agent: any, num: string, index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const { currentTarget, clientX, clientY } = event;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const colors = ['var(--color-blue)', 'var(--color-orange)', 'var(--color-cyan)'];
    const accentColor = colors[index % colors.length];

    return (
        <motion.div 
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{ 
                y: isHovered ? -8 : 0, 
                boxShadow: isHovered ? `0 20px 40px ${accentColor}30` : '0 10px 20px rgba(0,0,0,0.2)' 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group relative overflow-hidden rounded-2xl bg-[#131C2D] border border-white/5 p-7 h-full flex flex-col cursor-pointer"
            style={{ minHeight: '260px' }}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 hidden md:block z-0"
                animate={{ opacity: isHovered ? 1 : 0 }}
                style={{
                    background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${accentColor}20, transparent 80%)`
                }}
            />

            <div className="relative z-10 flex flex-col h-full">
                <motion.div 
                    className="font-bold text-xl mb-3 origin-left"
                    style={{ color: '#475569' }}
                    animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        color: isHovered ? accentColor : '#475569'
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {num}
                </motion.div>

                <motion.h3 
                    className="text-2xl font-bold mb-1 text-white"
                    animate={{ y: isHovered ? -2 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {agent.name}
                </motion.h3>
                
                <motion.p 
                    className="text-[#64748B] font-mono text-sm mb-4"
                    animate={{ y: isHovered ? -2 : 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                >
                    {agent.role}
                </motion.p>
                
                <p className="text-[#94A3B8] leading-relaxed text-[15px] mt-auto">
                    {agent.desc}
                </p>

                <motion.div 
                    className="absolute top-7 right-7 p-3 rounded-xl bg-white/5"
                    animate={{ 
                        rotate: isHovered ? [0, -10, 10, 0] : 0,
                        scale: isHovered ? 1.1 : 1,
                        backgroundColor: isHovered ? `${accentColor}20` : 'rgba(255,255,255,0.05)'
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <agent.icon size={24} style={{ color: accentColor }} />
                </motion.div>
            </div>
        </motion.div>
    );
}
