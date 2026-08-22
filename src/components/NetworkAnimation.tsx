import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import {
  TrendingUp,
  AlertTriangle,
  Radio,
  Eye,
  DollarSign,
  Megaphone,
  GitBranch,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';

const agentNodes: { name: string; icon: LucideIcon }[] = [
  { name: 'Forecast', icon: TrendingUp },
  { name: 'Deviation', icon: AlertTriangle },
  { name: 'Market Signal', icon: Radio },
  { name: 'Competitor', icon: Eye },
  { name: 'Pricing', icon: DollarSign },
  { name: 'Promotion', icon: Megaphone },
  { name: 'Scenario', icon: GitBranch },
  { name: 'Executive', icon: BarChart3 },
];

// Wider X radius, nodes positioned relative to diagram canvas only
const RADIUS_X = 38;
const RADIUS_Y = 36;

const getNodePos = (i: number) => {
  const angle = (i * 2 * Math.PI) / 8 - Math.PI / 2;
  return {
    x: 50 + RADIUS_X * Math.cos(angle),
    y: 50 + RADIUS_Y * Math.sin(angle),
  };
};

function ConnectionLine({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const pos = getNodePos(index);
  const start = 0.15 + index * 0.025;
  const end = 0.48 + index * 0.025;
  const dashOffset = useTransform(scrollYProgress, [start, end], [2000, 0]);
  const lineOpacity = useTransform(scrollYProgress, [start, start + 0.08], [0, 1]);

  return (
    <motion.line
      x1="50%"
      y1="50%"
      x2={`${pos.x}%`}
      y2={`${pos.y}%`}
      stroke="url(#lineGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2000"
      style={{ strokeDashoffset: dashOffset, opacity: lineOpacity }}
    />
  );
}

function AgentNode({
  agent,
  index,
  scrollYProgress,
}: {
  agent: (typeof agentNodes)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const pos = getNodePos(index);
  const start = 0.18 + index * 0.035;
  const end = 0.42 + index * 0.035;
  const nodeOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const translateY = useTransform(scrollYProgress, [start, end], [30, 0]);
  const nodeScale = useTransform(scrollYProgress, [start + 0.05, end + 0.1], [0.8, 1]);
  const Icon = agent.icon;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: 20,
      }}
    >
      <motion.div
        className="group cursor-pointer"
        style={{ y: translateY, opacity: nodeOpacity, scale: nodeScale }}
      >
        <div
          className="flex flex-col items-center gap-1.5 rounded-2xl transition-all duration-300"
          style={{
            padding: 'clamp(8px, 1vw, 14px)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="relative">
            <span
              className="absolute inset-[-4px] rounded-full pointer-events-none"
              style={{
                border: '1.5px solid rgba(6,182,212,0.25)',
                animation: 'network-pulse 3s ease-in-out infinite',
                animationDelay: `${index * 250}ms`,
              }}
            />
            <div
              className="relative rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                width: 'clamp(32px, 3.2vw, 46px)',
                height: 'clamp(32px, 3.2vw, 46px)',
                background: 'rgba(6,182,212,0.06)',
                border: '1px solid rgba(6,182,212,0.15)',
              }}
            >
              <Icon
                style={{ width: 'clamp(12px, 1.2vw, 17px)', height: 'clamp(12px, 1.2vw, 17px)' }}
                className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
              />
            </div>
          </div>
          <span
            className="font-bold uppercase tracking-wider text-center whitespace-nowrap"
            style={{
              fontSize: 'clamp(7px, 0.75vw, 10px)',
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            {agent.name}
          </span>
        </div>
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(6,182,212,0.12) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  );
}

function ScrollIndicator({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  return (
    <motion.div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      style={{ opacity }}
    >
      <span className="uppercase tracking-[0.2em]" style={{ fontSize: '10px', color: '#555' }}>
        Scroll to connect
      </span>
      <div
        className="w-5 h-8 rounded-full flex items-start justify-center p-1.5"
        style={{ border: '1px solid rgba(255,255,255,0.15)' }}
      >
        <motion.div
          className="w-1 h-2 rounded-full"
          style={{ background: '#06B6D4' }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function NetworkAnimation() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const centerScale = useTransform(scrollYProgress, [0.06, 0.45], [0.3, 1]);
  const centerOpacity = useTransform(scrollYProgress, [0.04, 0.22], [0, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.18], [0, -30]);

  return (
    <section
      ref={sectionRef}
      id="network-animation"
      style={{ height: '250vh', background: '#050505' }}
    >
      <style>{`
        @keyframes network-pulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50%       { transform: scale(2.2); opacity: 0; }
        }
        @keyframes hub-breathe {
          0%, 100% { box-shadow: 0 0 60px rgba(6,182,212,0.2), 0 0 120px rgba(124,58,237,0.1); }
          50%       { box-shadow: 0 0 90px rgba(6,182,212,0.35), 0 0 180px rgba(236,72,153,0.18); }
        }
      `}</style>

      {/* Sticky viewport */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: '#050505', display: 'grid', gridTemplateRows: 'auto 1fr' }}
      >

        {/* ── Heading block: compact, fixed height ── */}
        <motion.div
          className="text-center z-30 px-4"
          style={{
            paddingTop: '52px',
            paddingBottom: '12px',
            opacity: headerOpacity,
            y: headerY,
          }}
        >
          <h2
            className="uppercase font-black tracking-[-0.03em] text-white leading-none"
            style={{ fontSize: 'clamp(1.4rem, 3.8vw, 3.6rem)' }}
          >
            <span className="block">The Intelligence</span>
            <span
              className="block mt-1"
              style={{
                background: 'linear-gradient(to right, #06B6D4, #EC4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Network
            </span>
          </h2>
          <p
            className="mt-2"
            style={{ color: '#555', fontSize: 'clamp(11px, 1.1vw, 14px)' }}
          >
            9 specialized agents, one unified intelligence
          </p>
        </motion.div>

        {/* ── Diagram canvas: fills ALL remaining vertical space ── */}
        <div className="relative w-full min-h-0">

          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute rounded-full"
              style={{
                width: '60vmin',
                height: '60vmin',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background:
                  'radial-gradient(circle, rgba(6,182,212,0.04) 0%, rgba(124,58,237,0.025) 35%, transparent 70%)',
              }}
            />
          </div>

          {/* SVG connection lines */}
          <svg
            className="absolute inset-0 w-full h-full z-10 pointer-events-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(6,182,212,0.5)" />
                <stop offset="100%" stopColor="rgba(124,58,237,0.3)" />
              </linearGradient>
            </defs>
            {agentNodes.map((_, i) => (
              <ConnectionLine key={i} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </svg>

          {/* Center hub */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 25,
            }}
          >
            <motion.div style={{ scale: centerScale, opacity: centerOpacity }}>
              <div
                className="absolute inset-[-12px] rounded-full pointer-events-none"
                style={{
                  border: '1px solid rgba(6,182,212,0.12)',
                  animation: 'network-pulse 4s ease-in-out infinite',
                }}
              />
              <div
                className="absolute inset-[-28px] rounded-full pointer-events-none"
                style={{
                  border: '1px solid rgba(124,58,237,0.08)',
                  animation: 'network-pulse 4s ease-in-out infinite 1s',
                }}
              />
              <div
                className="rounded-full flex flex-col items-center justify-center relative"
                style={{
                  width: 'clamp(100px, 12vw, 160px)',
                  height: 'clamp(100px, 12vw, 160px)',
                  background: 'linear-gradient(135deg, #06B6D4 0%, #7C3AED 50%, #EC4899 100%)',
                  animation: 'hub-breathe 5s ease-in-out infinite',
                }}
              >
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at 35% 25%, rgba(255,255,255,0.2) 0%, transparent 60%)',
                  }}
                />
                <span
                  className="relative text-white font-black tracking-tight"
                  style={{ fontSize: 'clamp(12px, 1.4vw, 18px)' }}
                >
                  AigentG9
                </span>
                <span
                  className="relative uppercase mt-0.5"
                  style={{
                    fontSize: 'clamp(6px, 0.6vw, 9px)',
                    letterSpacing: '0.14em',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  Intelligence Core
                </span>
              </div>
            </motion.div>
          </div>

          {/* 8 outer agent nodes */}
          {agentNodes.map((agent, i) => (
            <AgentNode
              key={agent.name}
              agent={agent}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}

          <ScrollIndicator scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}