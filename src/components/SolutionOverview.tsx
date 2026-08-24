import { useRef, useState, useLayoutEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    AlertTriangle,
    Brain,
    Leaf,
    ChevronRight,
    TrendingUp,
    Tag,
    Megaphone,
    Radio,
    Settings,
    Package,
    PieChart,
    ShoppingCart,
    Truck
} from 'lucide-react';

const valuePoints = [
    {
        title: "See problems\nbefore they happen",
        desc: "Our AI spots demand risks days in advance, giving you time to act \u2014 not just react when it's already too late.",
        icon: AlertTriangle,
        color: '#F97316' // orange
    },
    {
        title: "Make faster,\nsmarter decisions",
        desc: "No more waiting for weekly reports. Get the right recommendation the moment your data changes.",
        icon: Brain,
        color: '#A855F7' // purple
    },
    {
        title: "Save money\nby reducing waste",
        desc: "Stop overstocking and understocking. Every decision is tuned to protect your margins, automatically.",
        icon: Leaf,
        color: '#22C55E' // green
    }
];

// The 9 AI agents, positioned in a fixed grid (percent coordinates relative to
// the diagram container) that mirrors the reference image's actual layout —
// not an even circle, so every node lands where it's meant to.
const agents = [
    { label: 'Pricing', icon: Tag, color: '#E879F9', x: 32, y: 15 },
    { label: 'Forecasting', icon: TrendingUp, color: '#3B82F6', x: 52, y: 6 },
    { label: 'Logistics', icon: Truck, color: '#FB923C', x: 74, y: 15 },
    { label: 'Promotions', icon: Megaphone, color: '#FB923C', x: 13, y: 36 },
    { label: 'Automation', icon: Settings, color: '#22D3EE', x: 90, y: 36 },
    { label: 'Demand Sensing', icon: Radio, color: '#4ADE80', x: 20, y: 60 },
    { label: 'Inventory', icon: Package, color: '#4ADE80', x: 83, y: 60 },
    { label: 'Analytics', icon: PieChart, color: '#38BDF8', x: 39, y: 80 },
    { label: 'Replenishment', icon: ShoppingCart, color: '#C084FC', x: 62, y: 80 },
];

const CUBE_X = 52;
const CUBE_Y = 50;

function OrbitDiagram({ inView }: { inView: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cubeRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [lines, setLines] = useState<{ x: number; y: number; length: number; angle: number; color: string }[]>([]);

    // Measure the ACTUAL rendered pixel position of the cube and every node, then
    // compute each connector line from those real coordinates. This guarantees a
    // line always ends exactly at its node, no matter the container's shape or
    // breakpoint — unlike percentage-based SVG coordinates, which can drift if the
    // container isn't perfectly square.
    const measure = () => {
        const container = containerRef.current;
        const cube = cubeRef.current;
        if (!container || !cube) return;

        const containerBox = container.getBoundingClientRect();
        const cubeBox = cube.getBoundingClientRect();
        const cx = cubeBox.left + cubeBox.width / 2 - containerBox.left;
        const cy = cubeBox.top + cubeBox.height / 2 - containerBox.top;

        const next = agents.map((agent, i) => {
            const nodeEl = nodeRefs.current[i];
            if (!nodeEl) return { x: cx, y: cy, length: 0, angle: 0, color: agent.color };
            const nodeBox = nodeEl.getBoundingClientRect();
            const nx = nodeBox.left + nodeBox.width / 2 - containerBox.left;
            const ny = nodeBox.top + nodeBox.height / 2 - containerBox.top;
            const dx = nx - cx;
            const dy = ny - cy;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
            return { x: cx, y: cy, length, angle, color: agent.color };
        });
        setLines(next);
    };

    useLayoutEffect(() => {
        measure();
        // Layout can still settle a frame late (fonts, icon sizing) — measure again shortly after.
        const t = setTimeout(measure, 60);
        window.addEventListener('resize', measure);
        return () => {
            clearTimeout(t);
            window.removeEventListener('resize', measure);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={containerRef} className="relative w-full aspect-[6/5] max-w-[440px] mx-auto">

            {/* Ground plane — decorative dashed rings under the cube */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: '60%', height: '20%',
                    left: '50%', top: '66%',
                    marginLeft: '-30%', marginTop: '-10%',
                    border: '1px dashed rgba(56,189,248,0.35)'
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
            />
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: '42%', height: '13%',
                    left: '50%', top: '66%',
                    marginLeft: '-21%', marginTop: '-6.5%',
                    border: '1px dashed rgba(56,189,248,0.5)'
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            />

            {/* Connector lines — drawn from measured pixel positions, so they always land exactly on the node.
                IMPORTANT: rotation lives on a plain (non-animated) wrapper div. Framer Motion takes full
                ownership of an element's `transform` the moment it animates scale/x/y/rotate on that same
                element — so a manual `transform: rotate(...)` on a motion.div gets silently discarded the
                instant Framer applies its own animated transform. Splitting position/rotation (outer, plain)
                from the scaleX reveal (inner, motion) is what keeps both working at the same time. */}
            {lines.map((line, i) => (
                <div
                    key={`line-${agents[i].label}`}
                    className="absolute pointer-events-none"
                    style={{
                        left: line.x,
                        top: line.y,
                        width: line.length,
                        height: '2px',
                        transformOrigin: 'left center',
                        transform: `rotate(${line.angle}deg)`
                    }}
                >
                    <motion.div
                        className="absolute inset-0 origin-left"
                        style={{ background: `linear-gradient(90deg, rgba(56,189,248,0.6), ${line.color})` }}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={inView && line.length > 0 ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                    />
                    {/* Traveling signal dot — the "flowing data" animation along the line */}
                    <motion.div
                        className="absolute top-1/2 w-1.5 h-1.5 rounded-full -translate-y-1/2"
                        style={{ background: line.color, boxShadow: `0 0 8px 2px ${line.color}` }}
                        animate={inView && line.length > 0 ? { left: ['0%', '100%'], opacity: [0, 1, 1, 0] } : {}}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', delay: 1.3 + i * 0.06 }}
                    />
                </div>
            ))}

            {/* Center cube — outer plain div handles position/centering (and is what we measure from,
                so its rect never shifts as the inner animation plays); inner motion.div handles the
                entrance scale/opacity. */}
            <div
                ref={cubeRef}
                className="absolute z-20"
                style={{ left: `${CUBE_X}%`, top: `${CUBE_Y}%`, transform: 'translate(-50%, -50%)' }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                    {/* Floating glow diamond above the cube */}
                    <motion.div
                        className="absolute left-1/2"
                        style={{
                            top: '-34px', width: '20px', height: '20px', marginLeft: '-10px',
                            background: 'linear-gradient(145deg, #7DD3FC, #38BDF8)',
                            boxShadow: '0 0 24px rgba(56,189,248,0.9)'
                        }}
                        initial={{ rotate: 45 }}
                        animate={{ y: [0, -6, 0], rotate: [45, 55, 45] }}
                        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <div
                        className="relative flex items-center justify-center"
                        style={{
                            width: '78px', height: '78px',
                            borderRadius: '16px',
                            background: 'linear-gradient(145deg, #1E2A44 0%, #0A101C 100%)',
                            border: '1px solid rgba(56,189,248,0.5)',
                            boxShadow: '0 0 50px rgba(56,189,248,0.4), inset 0 0 24px rgba(56,189,248,0.18)'
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: '32px',
                                color: '#38BDF8',
                                textShadow: '0 0 18px rgba(56,189,248,0.9)'
                            }}
                        >
                            Z
                        </span>
                        <motion.div
                            className="absolute inset-0 rounded-[16px]"
                            style={{ border: '1px solid rgba(56,189,248,0.6)' }}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Agent nodes — outer plain div handles position/centering (and is what we measure from);
                inner motion.div handles the entrance + idle float animation. */}
            {agents.map((agent, i) => {
                const Icon = agent.icon;
                return (
                    <div
                        key={agent.label}
                        ref={(el) => { nodeRefs.current[i] = el; }}
                        className="absolute z-10"
                        style={{ left: `${agent.x}%`, top: `${agent.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                        <motion.div
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.4, y: 10 }}
                            animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.4, y: 10 }}
                            transition={{ duration: 0.5, delay: 0.9 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            <motion.div
                                className="flex flex-col items-center gap-1.5"
                                animate={inView ? { y: [0, -5, 0] } : {}}
                                transition={{ duration: 3 + (i % 3) * 0.4, repeat: Infinity, ease: 'easeInOut', delay: 0.9 + i * 0.15 }}
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: 'rgba(8, 13, 24, 0.92)',
                                        border: `1px solid ${agent.color}77`,
                                        boxShadow: `0 0 18px ${agent.color}55`
                                    }}
                                >
                                    <Icon size={18} style={{ color: agent.color }} />
                                </div>
                                <span
                                    className="text-[10px] font-semibold whitespace-nowrap px-2 py-0.5 rounded-full"
                                    style={{
                                        color: agent.color,
                                        background: 'rgba(8, 13, 24, 0.85)',
                                        border: `1px solid ${agent.color}33`
                                    }}
                                >
                                    {agent.label}
                                </span>
                            </motion.div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}

function ValueCard({ point, index, inView: _inView }: { point: typeof valuePoints[number], index: number, inView: boolean }) {
    const Icon = point.icon;
    const lines = point.title.split('\n');

    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 14 } }
            }}
            className="relative flex flex-col p-7 md:p-8 rounded-2xl overflow-hidden group"
            style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)'
            }}
            whileHover={{ y: -4 }}
        >
            <div className="flex items-start justify-between mb-6">
                <div className="relative w-[76px] h-[76px] flex-shrink-0 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ border: `1.5px solid ${point.color}55` }}
                        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0.15, 0.7] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                    />
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{
                            background: `radial-gradient(circle, ${point.color}22 0%, transparent 70%)`,
                            border: `1px solid ${point.color}55`,
                            boxShadow: `0 0 24px ${point.color}30`
                        }}
                    >
                        <Icon size={26} style={{ color: point.color }} />
                    </div>
                </div>
            </div>

            <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-snug">
                {lines.map((line, i) => (
                    <span key={i} className="block">{line}</span>
                ))}
            </h3>

            <div className="w-8 h-[2px] mb-3" style={{ backgroundColor: point.color }} />

            <p className="text-sm text-[#94A3B8] leading-relaxed mb-8 flex-1">
                {point.desc}
            </p>

            <motion.button
                className="absolute bottom-6 right-6 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ border: `1px solid ${point.color}66`, color: point.color }}
                whileHover={{ scale: 1.1, backgroundColor: `${point.color}18` }}
                whileTap={{ scale: 0.95 }}
            >
                <ChevronRight size={16} />
            </motion.button>
        </motion.div>
    );
}

export default function SolutionOverview() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section
            ref={ref}
            id="solution"
            className="relative pt-14 md:pt-20 pb-14 md:pb-20 overflow-hidden"
            style={{ background: 'var(--color-navy)' }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-blue)] opacity-10 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">

                {/* Top: two-column — text left, orbit diagram right */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-10 items-center mb-10 md:mb-14">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-left"
                    >
                        <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span style={{
                                display: 'inline-block',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '11px',
                                fontWeight: 600,
                                letterSpacing: '0.15em',
                                color: 'var(--color-cyan)',
                                textTransform: 'uppercase'
                            }}>
                                THE SOLUTION
                            </span>
                            <div style={{ width: '40px', height: '1px', background: 'var(--color-cyan)', marginTop: '12px' }} />
                        </div>

                        <h2
                            style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                                color: '#FFFFFF',
                                lineHeight: 1.15,
                                marginBottom: '24px',
                                fontWeight: 700,
                                letterSpacing: '-0.02em'
                            }}
                        >
                            Meet Your <span className="text-gradient-brand">AI Team</span><br />That Never Sleeps
                        </h2>

                        <p
                            style={{
                                fontSize: 'clamp(16px, 1.5vw, 18px)',
                                color: '#94A3B8',
                                lineHeight: 1.7,
                                maxWidth: '560px'
                            }}
                        >
                            Zappcode gives you a team of 9 AI agents &mdash; each one an expert at a different job, like forecasting, pricing, or logistics. They work together around the clock, turning thousands of daily signals into one clear decision &mdash; so your business always knows what to do next.
                        </p>
                    </motion.div>

                    <OrbitDiagram inView={inView} />
                </div>

                {/* Bottom: value cards spanning full width */}
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {valuePoints.map((point, index) => (
                        <ValueCard key={index} point={point} index={index} inView={inView} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}