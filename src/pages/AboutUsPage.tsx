import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Zap, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

const VALUES = [
  {
    icon: Target,
    title: 'Precision over speed',
    description:
      'Every recommendation AigentG9 makes is traceable back to a real signal in your data — not a heuristic, not a guess. We believe accurate forecasts built on your actual history beat fast estimates every time.',
  },
  {
    icon: Zap,
    title: 'Intelligence without friction',
    description:
      'Enterprise AI should plug into what you already use — ERP, POS, spreadsheets — not replace it. Live in under 48 hours means we mean it. No six-month implementation projects.',
  },
  {
    icon: Shield,
    title: 'Audit-first architecture',
    description:
      'Every agent decision is logged, explainable, and reviewable by your team. Full visibility is not an optional add-on; it is the foundation we build everything on.',
  },
];

const STATS = [
  { value: '9',    label: 'Specialised agents' },
  { value: '48h',  label: 'Avg. deployment time' },
  { value: '40%',  label: 'Inventory cost reduction' },
  { value: '3.2×', label: 'First-year ROI' },
];

const TIMELINE = [
  { year: '2022', event: 'Identified the demand-planning gap in mid-market enterprises across South Asia.' },
  { year: '2023', event: 'First agent deployed — Forecast Intelligence — reducing stockouts by 31% for an FMCG pilot.' },
  { year: '2024', event: 'Expanded to 9 autonomous agents covering the full demand intelligence lifecycle.' },
  { year: '2025', event: 'AigentG9 opens to the enterprise waitlist. 50+ companies onboarding.' },
];

const TEAM = [
  { name: 'Atharva Shrote', role: 'Founder & CEO', initials: 'AS', bio: 'Building AI-native demand intelligence for enterprises that are tired of flying blind.' },
  { name: 'Engineering Team', role: 'AI & Platform', initials: 'ET', bio: 'A focused team of ML engineers and backend architects obsessed with production-grade AI.' },
  { name: 'Product Team', role: 'Design & Research', initials: 'PT', bio: 'Designing intuitive interfaces for enterprise workflows that don\'t require a training manual.' },
];

export default function AboutUsPage() {
  const heroRef     = useRef<HTMLDivElement>(null);
  const valuesRef   = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const teamRef     = useRef<HTMLDivElement>(null);

  const heroInView     = useInView(heroRef,     { once: true, margin: '-60px' });
  const valuesInView   = useInView(valuesRef,   { once: true, margin: '-60px' });
  const statsInView    = useInView(statsRef,    { once: true, margin: '-60px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '-60px' });
  const teamInView     = useInView(teamRef,     { once: true, margin: '-60px' });

  return (
    <>
      <Navbar />

      {/* ── Page hero ──────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          background: '#0F172A',
          padding: 'clamp(140px, 18vw, 200px) clamp(24px, 5vw, 64px) clamp(80px, 10vw, 120px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 20% 60%, rgba(37,99,235,0.18) 0%, transparent 70%)',
        }} />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            style={{ marginBottom: '24px' }}
          >
            <span className="eyebrow eyebrow-dark">About Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: '#F1F5F9',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              maxWidth: '800px',
              marginBottom: '24px',
            }}
          >
            Built for the teams flying blind on demand.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: '#94A3B8',
              lineHeight: 1.7,
              maxWidth: '640px',
            }}
          >
            AigentG9 was born from a simple frustration: enterprise teams with mountains of data still
            make demand decisions by gut feel. We built 9 AI agents that turn your existing ERP, POS,
            and spreadsheet data into real-time intelligence — without months of integration work.
          </motion.p>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────────────────── */}
      <section className="section-light" style={{ padding: 'clamp(64px, 9vw, 112px) clamp(24px, 5vw, 64px)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div ref={valuesRef}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease }}
              style={{ marginBottom: '40px' }}
            >
              <span className="eyebrow">What we stand for</span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '24px' }}>
              {VALUES.map((val, i) => (
                <motion.div
                  key={val.title}
                  className="card-light"
                  initial={{ opacity: 0, y: 28 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  style={{ padding: 'clamp(28px, 3vw, 40px)' }}
                >
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'rgba(37,99,235,0.07)',
                    border: '1px solid rgba(37,99,235,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <val.icon size={22} color="#2563EB" />
                  </div>
                  <h3 style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: '1.25rem', color: '#0F172A',
                    marginBottom: '10px', lineHeight: 1.2,
                  }}>
                    {val.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: '0.9375rem', color: '#64748B',
                    lineHeight: 1.7, margin: 0,
                  }}>
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────────────────── */}
      <section className="section-light-alt" style={{ padding: 'clamp(64px, 9vw, 112px) clamp(24px, 5vw, 64px)' }}>
        <div className="max-w-[1400px] mx-auto" ref={statsRef}>
          <motion.div
            className="dark-container noise-overlay"
            initial={{ opacity: 0, y: 32 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            style={{ padding: 'clamp(36px, 5vw, 56px) clamp(28px, 5vw, 64px)' }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 'clamp(32px, 4vw, 48px)' }}>
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease }}
                  style={{ textAlign: 'center' }}
                >
                  <div style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
                    color: '#F1F5F9', lineHeight: 1, marginBottom: '10px',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px', color: '#64748B',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────────────────── */}
      <section className="section-light" style={{ padding: 'clamp(64px, 9vw, 112px) clamp(24px, 5vw, 64px)' }}>
        <div className="max-w-[1400px] mx-auto" ref={timelineRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            style={{ marginBottom: '40px' }}
          >
            <span className="eyebrow">Our milestones</span>
          </motion.div>

          <div style={{ position: 'relative', maxWidth: '720px' }}>
            <div style={{
              position: 'absolute', left: '72px', top: 0, bottom: 0,
              width: '1px',
              background: 'linear-gradient(180deg, rgba(37,99,235,0.4) 0%, rgba(37,99,235,0.05) 100%)',
            }} />

            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12, ease }}
                style={{
                  display: 'flex', alignItems: 'flex-start',
                  gap: '28px',
                  paddingBottom: i < TIMELINE.length - 1 ? '36px' : 0,
                }}
              >
                <div style={{
                  width: '64px', flexShrink: 0,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px', fontWeight: 600, color: '#2563EB',
                  paddingTop: '2px', textAlign: 'right',
                }}>
                  {item.year}
                </div>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: '#2563EB', flexShrink: 0, marginTop: '6px',
                  boxShadow: '0 0 0 3px rgba(37,99,235,0.12)',
                }} />
                <p style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
                  color: '#374151', lineHeight: 1.65, margin: 0, paddingTop: '1px',
                }}>
                  {item.event}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────────────────── */}
      <section className="section-light-alt" style={{ padding: 'clamp(64px, 9vw, 112px) clamp(24px, 5vw, 64px)' }}>
        <div className="max-w-[1400px] mx-auto" ref={teamRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            style={{ marginBottom: '40px' }}
          >
            <span className="eyebrow">The team</span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: '24px' }}>
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                className="card-light"
                initial={{ opacity: 0, y: 24 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                style={{ padding: 'clamp(24px, 3vw, 36px)' }}
              >
                {/* Avatar */}
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563EB, #4f46e5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <span style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: '16px', color: '#FFFFFF', fontWeight: 700,
                  }}>
                    {member.initials}
                  </span>
                </div>
                <div style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '1.125rem', color: '#0F172A', marginBottom: '4px',
                }}>
                  {member.name}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px', color: '#2563EB',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  marginBottom: '12px',
                }}>
                  {member.role}
                </div>
                <p style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: '0.9rem', color: '#64748B',
                  lineHeight: 1.65, margin: 0,
                }}>
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
