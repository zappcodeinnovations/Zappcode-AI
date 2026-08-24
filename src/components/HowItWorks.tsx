import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Plug, Cpu, TrendingUp, Zap } from 'lucide-react';

/* ── Step data ── */
const steps = [
  {
    num: '01',
    label: 'CONNECT',
    icon: Plug,
    title: 'Connect Your Data Sources',
    body: 'AigentG9 integrates with your ERP, marketplace, POS, and external data feeds in under 48 hours. No complex IT project.',
    badges: ['SAP', 'Oracle', 'Shopify', 'Salesforce'],
  },
  {
    num: '02',
    label: 'ANALYSE',
    icon: Cpu,
    title: '9 Agents Go to Work Immediately',
    body: 'From day one, all 9 agents begin learning your demand patterns, market signals, competitor moves, and pricing dynamics.',
    badges: ['Forecast', 'Deviation', 'Market', 'Pricing'],
  },
  {
    num: '03',
    label: 'RECOMMEND',
    icon: TrendingUp,
    title: 'Actionable Insights, Not Raw Data',
    body: 'Every morning your team receives prioritised recommendations — not dashboards to interpret. AigentG9 tells you what to do.',
    badges: ['Priority Ranked', 'Auto-Generated', 'CEO-Ready'],
  },
  {
    num: '04',
    label: 'ACT',
    icon: Zap,
    title: 'One Click to ERP Execution',
    body: 'Approve a purchase order, adjust a price, or trigger a promotion directly from the insight — AigentG9 handles the ERP transaction end-to-end.',
    badges: ['Auto PO', 'Price Sync', 'Promo Launch'],
  },
];

/* ── Step content (sub-component for hooks) ── */
function StepSlide({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof steps)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const total = steps.length;
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const fadeIn = segStart + 0.02;
  const fadeOut = segEnd - 0.02;
  const isLast = index === total - 1;

  const opacity = useTransform(
    scrollYProgress,
    isLast
      ? [segStart, fadeIn, 1]
      : [segStart, fadeIn, fadeOut, segEnd],
    isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    isLast
      ? [segStart, fadeIn, 1]
      : [segStart, fadeIn, fadeOut, segEnd],
    isLast ? [40, 0, 0] : [40, 0, 0, -30]
  );

  const Icon = step.icon;

  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      style={{ opacity, y }}
    >
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-2 items-center"
        style={{
          gap: 'clamp(40px, 5vw, 80px)',
          padding: '0 clamp(20px, 4vw, 60px)',
        }}
      >
        {/* Left: Content */}
        <div className="max-w-[540px]">
          {/* Step label */}
          <div
            className="flex items-center"
            style={{ gap: '10px', marginBottom: '28px' }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(6,182,212,0.08)',
                border: '1px solid rgba(6,182,212,0.2)',
              }}
            >
              <Icon
                style={{ width: '16px', height: '16px', color: '#06B6D4' }}
              />
            </div>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: '#06B6D4',
                textTransform: 'uppercase',
              }}
            >
              Step {step.num} — {step.label}
            </span>
          </div>

          <h3
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#fff',
              margin: '0 0 20px',
            }}
          >
            {step.title}
          </h3>

          <p
            style={{
              fontSize: 'clamp(14px, 1.3vw, 17px)',
              color: 'rgba(255,255,255,0.4)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {step.body}
          </p>

          {/* Badge pills */}
          <div
            className="flex flex-wrap"
            style={{ gap: '8px', marginTop: '28px' }}
          >
            {step.badges.map((b) => (
              <span
                key={b}
                style={{
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  letterSpacing: '0.06em',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.5)',
                  textTransform: 'uppercase',
                }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Huge background number */}
        <div className="relative hidden lg:flex items-center justify-center">
          <span
            style={{
              fontSize: 'clamp(10rem, 18vw, 22rem)',
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(255,255,255,0.04)',
              userSelect: 'none',
            }}
          >
            {step.num}
          </span>

          {/* Accent glow behind number */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: '200px',
              height: '200px',
              background:
                'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Step indicator (sub-component for hooks) ── */
function StepDot({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const total = steps.length;
  const segStart = index / total;
  const segMid = (index + 0.5) / total;
  const segEnd = (index + 1) / total;
  const isLast = index === total - 1;

  const dotScale = useTransform(
    scrollYProgress,
    isLast
      ? [segStart, segMid, 1]
      : [segStart, segMid, segEnd],
    isLast ? [0.6, 1, 1] : [0.6, 1, 0.6]
  );
  const dotOpacity = useTransform(
    scrollYProgress,
    isLast
      ? [segStart, segMid, 1]
      : [segStart, segMid, segEnd],
    isLast ? [0.3, 1, 1] : [0.3, 1, 0.3]
  );

  return (
    <motion.div
      style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#06B6D4',
        scale: dotScale,
        opacity: dotOpacity,
      }}
    />
  );
}

/* ── Main section ── */
export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.08], [0, -30]);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      style={{ height: '400vh', background: '#050505' }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: '#050505' }}
      >
        {/* Header — fades on scroll */}
        <motion.div
          className="absolute top-0 left-0 w-full z-20 text-center"
          style={{
            paddingTop: 'clamp(80px, 10vw, 120px)',
            opacity: headerOpacity,
            y: headerY,
          }}
        >
          <span
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            How It Works
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 4rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#fff',
              margin: 0,
            }}
          >
            Data to decision
            <br />
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>
              in four steps.
            </span>
          </h2>
        </motion.div>

        {/* Step indicator dots — left edge */}
        <div
          className="absolute z-30 hidden lg:flex flex-col items-center"
          style={{
            left: 'clamp(20px, 3vw, 48px)',
            top: '50%',
            transform: 'translateY(-50%)',
            gap: '14px',
          }}
        >
          {steps.map((_, i) => (
            <StepDot
              key={i}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Step slides */}
        <div className="absolute inset-0 max-w-[1400px] mx-auto">
          {steps.map((step, i) => (
            <StepSlide
              key={step.num}
              step={step}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
