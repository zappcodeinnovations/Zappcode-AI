import React, { useRef } from 'react';
import { motion, useInView, useSpring, useTransform, useScroll, useMotionValueEvent, MotionValue } from 'framer-motion';
import { Target, Zap, ShieldCheck, Crown, Code, PenTool, Star, Users, Lightbulb } from 'lucide-react';
import founderImg from '../assets/founder.png';
import enggTeamImg from '../assets/engg-team.png';
import productTeamImg from '../assets/product-team.png';
import aboutBannerImg from '../assets/about-banner.png';

const StatCounter = ({ endValue, suffix = "", isFloat = false }: { endValue: number, suffix?: string, isFloat?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });

  React.useEffect(() => {
    if (inView) {
      springValue.set(endValue);
    }
  }, [inView, endValue, springValue]);

  const display = useTransform(springValue, (current) => {
    if (isFloat) return current.toFixed(1) + suffix;
    return Math.floor(current) + suffix;
  });

  return <motion.span ref={ref}>{display}</motion.span>;
};

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 400, damping: 40 });
  const y = useSpring(0, { stiffness: 400, damping: 40 });
  const rotateX = useTransform(y, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className || ''} [perspective:1000px]`}
    >
      <div style={{ transform: "translateZ(40px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ year, text, targetProgress, currentProgress }: { year: string, text: string, targetProgress: number, currentProgress: MotionValue<number> }) => {
  const [isActive, setIsActive] = React.useState(false);

  useMotionValueEvent(currentProgress, "change", (latest) => {
    if (latest >= targetProgress && !isActive) {
      setIsActive(true);
    }
  });

  return (
    <div className="relative pl-12 md:pl-0 md:pt-14 mb-10 md:mb-0 md:flex-1 md:text-center w-full md:px-4">
      {/* Dot */}
      <div
        className={`absolute left-[11px] md:left-1/2 md:-ml-[6px] top-0 md:top-[18px] w-3 h-3 rounded-full transition-all duration-500 border-2 ${isActive ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] scale-150' : 'bg-slate-800 border-slate-600'}`}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xl md:text-2xl font-bold text-white mb-3">{year}</div>
        <p style={{ color: '#cbd5e1' }} className="text-[13px] md:text-sm leading-relaxed max-w-[250px] mx-auto opacity-90">
          {text}
        </p>
      </motion.div>
    </div>
  );
};

export default function AboutUs() {
  const s1Ref = useRef(null);
  const s1InView = useInView(s1Ref, { once: true, amount: 0.2 });

  const s2Ref = useRef(null);
  const s2InView = useInView(s2Ref, { once: true, amount: 0.2 });

  const s3Ref = useRef(null);
  const s3InView = useInView(s3Ref, { once: true, amount: 0.2 });

  const s4Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: s4Ref,
    offset: ["start center", "end center"]
  });

  const s5Ref = useRef(null);
  const s5InView = useInView(s5Ref, { once: true, amount: 0.2 });

  return (
    <div className="w-full overflow-hidden font-sans">
      {/* SECTION 1 — HERO INTRO (Light) */}
      <section ref={s1Ref} className="relative pt-28 pb-12 md:pt-36 md:pb-20 lg:pt-40 lg:pb-24 bg-[#F8FAFC] flex flex-col lg:flex-row items-center min-h-[100svh] lg:min-h-[50vh] px-6 overflow-hidden">

        {/* Full Background Image - Desktop ONLY */}
        <div
          className="hidden lg:block absolute inset-0 z-0 pointer-events-none bg-no-repeat bg-right bg-contain"
          style={{
            backgroundImage: `url(${aboutBannerImg})`,
          }}
        />

        {/* Full Background Image - Mobile/Tablet ONLY */}
        <div
          className="block lg:hidden absolute inset-0 z-0 pointer-events-none bg-no-repeat bg-bottom bg-cover"
          style={{
            backgroundImage: "url('/src/assets/about-responsive.png')",
          }}
        />

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col lg:block">

          {/* Text Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mt-4 lg:mt-0 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={s1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4 drop-shadow-sm lg:drop-shadow-none"
            >
              ABOUT ZAPPCODE
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={s1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-[56px] lg:text-[64px] font-bold text-slate-900 leading-tight mb-6"
            >
              Built for Teams <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 drop-shadow-sm lg:drop-shadow-none">
                Flying Blind on Demand
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={s1InView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[15px] md:text-lg text-white lg:text-gray-600 max-w-[600px] leading-relaxed relative z-10"
            >
              {/* True Dark Fog - A borderless, glowing shadow just to create contrast without blocking the image */}
              <span className="absolute inset-0 bg-black/60 blur-[30px] rounded-full block lg:hidden -z-10 scale-[1.2] pointer-events-none" />
              Zappcode was born from a simple frustration: enterprise teams with mountains of data still make demand decisions by gut feel. We built 9 AI agents that turn your existing ERP, POS, and spreadsheet data into real-time intelligence — without months of integration work.
            </motion.p>
          </div>

        </div>
      </section>

      {/* SECTION 2 — WHAT WE STAND FOR (Dark) */}
      <section ref={s2Ref} className="py-20 md:py-32 bg-[#0F172A] relative px-6 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={s2InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-bold tracking-widest text-cyan-400 uppercase mb-16 text-center md:text-left"
          >
            WHAT WE STAND FOR
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {/* Card 1 */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={s2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 }}>
              <TiltCard className="h-full">
                <div className="h-full bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-colors shadow-2xl">
                  <motion.div
                    initial={{ scale: 0 }} animate={s2InView ? { scale: 1 } : {}} transition={{ type: "spring", delay: 0.4 }}
                    className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400"
                  >
                    <Target size={28} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-4">Precision Over Speed</h3>
                  <p style={{ color: '#cbd5e1' }} className="leading-relaxed text-sm md:text-base">
                    Every recommendation Zappcode makes is traceable back to a real signal in your data — not a heuristic, not a guess. Accurate forecasts built on your actual history beat fast estimates every time.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* Card 2 */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={s2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
              <TiltCard className="h-full">
                <div className="h-full bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 hover:border-orange-500/50 transition-colors shadow-2xl">
                  <motion.div
                    initial={{ scale: 0 }} animate={s2InView ? { scale: 1 } : {}} transition={{ type: "spring", delay: 0.55 }}
                    className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-400"
                  >
                    <Zap size={28} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-4">Intelligence Without Friction</h3>
                  <p style={{ color: '#cbd5e1' }} className="leading-relaxed text-sm md:text-base">
                    Enterprise AI should plug into what you already use — ERP, POS, spreadsheets — not replace it. Live in under 48 hours means we mean it. No six-month implementation projects.
                  </p>
                </div>
              </TiltCard>
            </motion.div>

            {/* Card 3 */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={s2InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.45 }}>
              <TiltCard className="h-full">
                <div className="h-full bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-colors shadow-2xl">
                  <motion.div
                    initial={{ scale: 0 }} animate={s2InView ? { scale: 1 } : {}} transition={{ type: "spring", delay: 0.7 }}
                    className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400"
                  >
                    <ShieldCheck size={28} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-4">Audit-First Architecture</h3>
                  <p style={{ color: '#cbd5e1' }} className="leading-relaxed text-sm md:text-base">
                    Every agent decision is logged, explainable, and reviewable by your team. Full visibility isn't an optional add-on — it's the foundation we build everything on.
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — BY THE NUMBERS (Light) */}
      <section ref={s3Ref} className="py-20 md:py-32 bg-[#F8FAFC] px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={s3InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-16 text-center"
          >
            BY THE NUMBERS
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={s3InView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
              <div className="text-5xl md:text-6xl lg:text-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 mb-4 drop-shadow-sm">
                <StatCounter endValue={9} />
              </div>
              <div className="text-gray-500 font-semibold tracking-wide text-sm md:text-base uppercase">Specialized AI Agents</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={s3InView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
              <div className="text-5xl md:text-6xl lg:text-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 mb-4 drop-shadow-sm">
                <StatCounter endValue={48} suffix="h" />
              </div>
              <div className="text-gray-500 font-semibold tracking-wide text-sm md:text-base uppercase">Avg. Deployment Time</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={s3InView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
              <div className="text-5xl md:text-6xl lg:text-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 mb-4 drop-shadow-sm">
                <StatCounter endValue={40} suffix="%" />
              </div>
              <div className="text-gray-500 font-semibold tracking-wide text-sm md:text-base uppercase">Inventory Cost Reduction</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={s3InView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
              <div className="text-5xl md:text-6xl lg:text-[70px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 mb-4 drop-shadow-sm">
                <StatCounter endValue={3.2} suffix="×" isFloat={true} />
              </div>
              <div className="text-gray-500 font-semibold tracking-wide text-sm md:text-base uppercase">First-Year ROI</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR JOURNEY / MILESTONES (Dark) */}
      <section className="py-20 md:py-32 bg-[#0F172A] px-6 text-white overflow-hidden relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-20 md:mb-32 text-center md:text-left">
            <div className="text-sm font-bold tracking-widest text-cyan-400 uppercase mb-4">OUR JOURNEY</div>
            <h2 className="text-3xl md:text-[44px] font-bold text-white leading-tight">From an Idea to an <br className="hidden md:block" /> Enterprise Platform</h2>
          </div>

          <div ref={s4Ref} className="relative min-h-[500px] md:min-h-auto flex flex-col md:flex-row justify-between items-start md:items-start pt-4 md:gap-4 lg:gap-8">

            {/* Desktop Horizontal Line */}
            <motion.div
              className="hidden md:block absolute h-1 left-[5%] right-[5%] top-[24px] origin-left bg-gradient-to-r from-blue-600 via-orange-500 to-cyan-500 rounded-full"
              style={{ scaleX: scrollYProgress }}
            />
            {/* Mobile Vertical Line */}
            <motion.div
              className="md:hidden absolute w-1 top-[10px] bottom-[10px] left-[15px] origin-top bg-gradient-to-b from-blue-600 via-orange-500 to-cyan-500 rounded-full"
              style={{ scaleY: scrollYProgress }}
            />

            {/* Background track line */}
            <div className="hidden md:block absolute h-1 left-[5%] right-[5%] top-[24px] bg-slate-800 rounded-full -z-10" />
            <div className="md:hidden absolute w-1 top-[10px] bottom-[10px] left-[15px] bg-slate-800 rounded-full -z-10" />

            {[
              { year: "2022", text: "Identified the demand-planning gap in mid-market enterprises across South Asia.", progress: 0.1 },
              { year: "2023", text: "First agent deployed: Forecast Intelligence — reducing stockouts by 31% in an FMCG pilot.", progress: 0.4 },
              { year: "2024", text: "Expanded to 9 autonomous agents, covering the full demand intelligence lifecycle.", progress: 0.7 },
              { year: "2025", text: "Zappcode opens to the enterprise waitlist — 50+ companies onboarding.", progress: 1.0 },
            ].map((milestone, idx) => (
              <TimelineItem
                key={idx}
                year={milestone.year}
                text={milestone.text}
                targetProgress={milestone.progress}
                currentProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — THE TEAM (Light) */}
      <section ref={s5Ref} className="py-20 md:py-32 bg-[#F8FAFC] px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={s5InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4 text-center"
          >
            THE TEAM
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={s5InView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-[44px] font-bold text-slate-900 mb-16 text-center leading-tight"
          >
            The People Behind Zappcode
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 1: Founder/Mentor */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={s5InView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="h-full">
              <TiltCard className="h-full">
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1 relative group">

                  {/* Top Half: Image */}
                  <div className="relative h-[220px] w-full overflow-hidden bg-blue-50/50">
                    {/* Top-left Icon */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-white/95 backdrop-blur-md rounded-lg flex items-center justify-center shadow-sm z-10">
                      <Crown className="w-4 h-4 text-blue-600" strokeWidth={2.5} />
                    </div>

                    <img src={founderImg} alt="Sanjog Meshram" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />

                    {/* Fade to white gradient at the bottom of the image */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-[220px] left-5 -translate-y-1/2 w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold border-[3px] border-white shadow-sm z-20">
                    SM
                  </div>

                  {/* Bottom Half: Content */}
                  <div className="px-5 pt-7 pb-4 flex flex-col flex-1 bg-white relative z-10 text-left">
                    <h3 className="text-[17px] font-bold text-slate-900">Sanjog Meshram</h3>
                    <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">Founder & CEO</div>
                    <div className="w-5 h-[2px] bg-blue-600 rounded-full mt-2 mb-2" />

                    <p className="text-slate-600 text-[12px] leading-relaxed flex-1">
                      Guiding the vision, strategy, and execution behind Zappcode's mission to democratize AI for every enterprise.
                    </p>

                    {/* Footer Box */}
                    <div className="mt-3 bg-slate-50 rounded-xl py-2 px-2.5 flex items-center gap-2.5 border border-slate-100">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                        <Star className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-800 text-[10px] font-semibold">10+ Years in Tech Leadership</span>
                        <span className="text-slate-500 text-[9px]">Founder & CEO
                          . Builder. Visionary.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Card 2: Engineering Team */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={s5InView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }} className="h-full">
              <TiltCard className="h-full">
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1 relative group">

                  {/* Top Half: Image */}
                  <div className="relative h-[220px] w-full overflow-hidden bg-orange-50/50">
                    {/* Top-left Icon */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-white/95 backdrop-blur-md rounded-lg flex items-center justify-center shadow-sm z-10">
                      <Code className="w-4 h-4 text-[#ff6b00]" strokeWidth={2.5} />
                    </div>

                    <img src={enggTeamImg} alt="Engineering Team" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />

                    {/* Fade to white gradient at the bottom of the image */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-[220px] left-5 -translate-y-1/2 w-11 h-11 rounded-full bg-[#ff6b00] text-white flex items-center justify-center text-sm font-bold border-[3px] border-white shadow-sm z-20">
                    ET
                  </div>

                  {/* Bottom Half: Content */}
                  <div className="px-5 pt-7 pb-4 flex flex-col flex-1 bg-white relative z-10 text-left">
                    <h3 className="text-[17px] font-bold text-slate-900">Engineering Team</h3>
                    <div className="text-[10px] font-bold text-[#ff6b00] uppercase tracking-wider mt-0.5">AI & PLATFORM</div>
                    <div className="w-5 h-[2px] bg-[#ff6b00] rounded-full mt-2 mb-2" />

                    <p className="text-slate-600 text-[12px] leading-relaxed flex-1">
                      Building robust AI platforms and models that turn complex data into real-time business intelligence.
                    </p>

                    {/* Footer Box */}
                    <div className="mt-3 bg-orange-50/50 rounded-xl py-2 px-2.5 flex items-center gap-2.5 border border-orange-100">
                      <div className="w-7 h-7 rounded-full bg-[#ff6b00] text-white flex items-center justify-center shrink-0">
                        <Users className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#ff6b00] text-[10px] font-semibold">Experts in ML, Data & Cloud</span>
                        <span className="text-slate-600 text-[9px]">Scalable. Reliable. Future-ready.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Card 3: Product Team */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={s5InView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }} className="h-full">
              <TiltCard className="h-full">
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-1 relative group">

                  {/* Top Half: Image */}
                  <div className="relative h-[220px] w-full overflow-hidden bg-teal-50/50">
                    {/* Top-left Icon */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-white/95 backdrop-blur-md rounded-lg flex items-center justify-center shadow-sm z-10">
                      <PenTool className="w-4 h-4 text-[#00a8b5]" strokeWidth={2.5} />
                    </div>

                    <img src={productTeamImg} alt="Product Team" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />

                    {/* Fade to white gradient at the bottom of the image */}
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-[220px] left-5 -translate-y-1/2 w-11 h-11 rounded-full bg-[#00a8b5] text-white flex items-center justify-center text-sm font-bold border-[3px] border-white shadow-sm z-20">
                    PT
                  </div>

                  {/* Bottom Half: Content */}
                  <div className="px-5 pt-7 pb-4 flex flex-col flex-1 bg-white relative z-10 text-left">
                    <h3 className="text-[17px] font-bold text-slate-900">Product Team</h3>
                    <div className="text-[10px] font-bold text-[#00a8b5] uppercase tracking-wider mt-0.5">DESIGN & RESEARCH</div>
                    <div className="w-5 h-[2px] bg-[#00a8b5] rounded-full mt-2 mb-2" />

                    <p className="text-slate-600 text-[12px] leading-relaxed flex-1">
                      Crafting intuitive experiences that simplify complex workflows and empower every decision.
                    </p>

                    {/* Footer Box */}
                    <div className="mt-3 bg-[#00a8b5]/10 rounded-xl py-2 px-2.5 flex items-center gap-2.5 border border-[#00a8b5]/20">
                      <div className="w-7 h-7 rounded-full bg-[#00a8b5] text-white flex items-center justify-center shrink-0">
                        <Lightbulb className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#00a8b5] text-[10px] font-semibold">Human-Centered Design</span>
                        <span className="text-slate-600 text-[9px]">Intuitive. Impactful. Engaging.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
