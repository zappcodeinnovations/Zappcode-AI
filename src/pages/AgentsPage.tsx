import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { agents, visuals } from '../components/AgentScrollSection';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

const TAG_COLORS: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  Forecasting: { bg: 'rgba(6,182,212,0.10)',   text: '#06B6D4', dot: '#06B6D4',  border: 'rgba(6,182,212,0.25)'   },
  Risk:        { bg: 'rgba(236,72,153,0.10)',   text: '#EC4899', dot: '#EC4899',  border: 'rgba(236,72,153,0.25)'  },
  Market:      { bg: 'rgba(16,185,129,0.10)',   text: '#10B981', dot: '#10B981',  border: 'rgba(16,185,129,0.25)'  },
  Intelligence:{ bg: 'rgba(245,158,11,0.10)',   text: '#F59E0B', dot: '#F59E0B',  border: 'rgba(245,158,11,0.25)'  },
  Pricing:     { bg: 'rgba(99,102,241,0.10)',   text: '#818CF8', dot: '#818CF8',  border: 'rgba(99,102,241,0.25)'  },
  Growth:      { bg: 'rgba(124,58,237,0.10)',   text: '#A78BFA', dot: '#7C3AED',  border: 'rgba(124,58,237,0.25)'  },
  Simulation:  { bg: 'rgba(6,182,212,0.10)',    text: '#22D3EE', dot: '#22D3EE',  border: 'rgba(6,182,212,0.20)'   },
  Strategy:    { bg: 'rgba(236,72,153,0.10)',   text: '#F472B6', dot: '#EC4899',  border: 'rgba(236,72,153,0.20)'  },
  Automation:  { bg: 'rgba(16,185,129,0.10)',   text: '#34D399', dot: '#10B981',  border: 'rgba(16,185,129,0.20)'  },
};

function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative flex" style={{ width: 10, height: 10 }}>
      <span style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: color, opacity: 0.5,
        animation: 'agents-pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
      }} />
      <span style={{
        position: 'relative', display: 'inline-flex', borderRadius: '50%',
        width: 10, height: 10, background: color,
      }} />
    </span>
  );
}

function AgentCard({ agent, index, Visual }: {
  agent: typeof agents[number];
  index: number;
  Visual: React.FC;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const tagStyle = TAG_COLORS[agent.tag] ?? TAG_COLORS.Forecasting;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease }}
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(6,182,212,0.25)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(6,182,212,0.06)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Visual area */}
      <div style={{
        height: '200px',
        background: 'rgba(6,182,212,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Large ghost index */}
        <span style={{
          position: 'absolute', bottom: -12, left: 16,
          fontFamily: 'monospace', fontSize: 80, fontWeight: 900,
          color: '#fff', opacity: 0.03,
          userSelect: 'none', pointerEvents: 'none', lineHeight: 1,
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <Visual />
      </div>

      {/* Content */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Index + tag row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{
            fontFamily: 'monospace', fontSize: 13, fontWeight: 700,
            background: 'linear-gradient(to right, #06B6D4, #EC4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text', opacity: 0.7,
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px', borderRadius: 9999,
            background: tagStyle.bg, color: tagStyle.text,
            border: `1px solid ${tagStyle.border}`,
            fontFamily: 'monospace', fontSize: 10, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: tagStyle.dot }} />
            {agent.tag}
          </span>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: 'monospace', fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: 900, color: '#FFFFFF',
          textTransform: 'uppercase', letterSpacing: '-0.01em',
          lineHeight: 1.1, marginBottom: '16px',
        }}>
          {agent.name}
        </h3>

        {/* Bullets */}
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
          {agent.bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{
                marginTop: 7, flexShrink: 0,
                width: 5, height: 5, borderRadius: '50%', background: '#06B6D4',
              }} />
              <span style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontSize: 13.5, color: '#888', lineHeight: 1.6,
              }}>
                {b}
              </span>
            </li>
          ))}
        </ul>

        {/* Metrics */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {agent.metrics.map((m) => (
            <span key={m} style={{
              padding: '5px 12px', borderRadius: 9999,
              background: 'rgba(6,182,212,0.07)', color: '#06B6D4',
              border: '1px solid rgba(6,182,212,0.18)',
              fontFamily: 'monospace', fontSize: 10.5,
              fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Active footer strip */}
      <div style={{
        padding: '12px 24px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <PulseDot color="#06B6D4" />
        <span style={{
          fontFamily: 'monospace', fontSize: 10.5,
          color: '#06B6D4', fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          Active · Production Ready
        </span>
      </div>
    </motion.div>
  );
}

export default function AgentsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef  = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true, margin: '-60px' });
  const ctaInView  = useInView(ctaRef,  { once: true, margin: '-60px' });

  return (
    <>
      <style>{`
        @keyframes agents-pulse {
          0%,100% { transform:scale(1); opacity:0.6; }
          50%      { transform:scale(2.4); opacity:0; }
        }
      `}</style>

      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          background: '#050505',
          padding: 'clamp(140px, 18vw, 200px) clamp(24px, 5vw, 64px) clamp(72px, 9vw, 112px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Ambient top glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '70%', height: '60%', pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(6,182,212,0.10) 0%, transparent 70%)',
        }} />
        {/* Bottom-right accent */}
        <div style={{
          position: 'absolute', bottom: 0, right: 0, width: 500, height: 500,
          pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)',
        }} />

        <div className="max-w-[1400px] mx-auto relative" style={{ zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            style={{ marginBottom: '24px' }}
          >
            <span className="eyebrow eyebrow-dark">Agent Intelligence Team</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease }}
            style={{
              fontFamily: 'monospace', fontWeight: 900,
              fontSize: 'clamp(2.8rem, 8vw, 7rem)',
              color: '#FFFFFF', lineHeight: 1,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              maxWidth: '900px', marginBottom: '32px',
            }}
          >
            9 Agents.{' '}
            <span style={{
              background: 'linear-gradient(90deg, #06B6D4, #EC4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              One Mission.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              color: '#666', lineHeight: 1.75,
              maxWidth: '620px', marginBottom: '40px',
            }}
          >
            Each agent owns a specific layer of the demand intelligence stack — from raw signal
            ingestion to autonomous ERP write-back. Together, they form a closed-loop system
            that makes better decisions than any human team working alone.
          </motion.p>

          {/* Stat bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease }}
            style={{
              display: 'flex', flexWrap: 'wrap', gap: '32px',
            }}
          >
            {[
              { val: '9',    label: 'Autonomous agents' },
              { val: '48h',  label: 'Avg. go-live time' },
              { val: '200+', label: 'External signals' },
              { val: '100%', label: 'Audit coverage' },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: 'monospace', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  fontWeight: 900, color: '#FFFFFF', lineHeight: 1,
                }}>
                  {val}
                </div>
                <div style={{
                  fontFamily: 'monospace', fontSize: 11, color: '#444',
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 6,
                }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Horizontal rule */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.2), rgba(236,72,153,0.15), transparent)',
        }} />
      </section>

      {/* ── Agent Grid ────────────────────────────────────────────────── */}
      <section
        id="agents"
        style={{
          background: '#050505',
          padding: 'clamp(64px, 8vw, 96px) clamp(24px, 5vw, 64px)',
        }}
      >
        <div className="max-w-[1400px] mx-auto" ref={gridRef}>
          {/* Section label */}
          <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.05)' }} />
            <span style={{
              fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
              color: '#333', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              All 9 Agents
            </span>
            <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.05)' }} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {agents.map((agent, i) => {
              const Visual = visuals[i];
              return (
                <AgentCard
                  key={agent.name}
                  agent={agent}
                  index={i}
                  Visual={Visual}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How they connect ──────────────────────────────────────────── */}
      <section style={{
        background: '#0A0A0A',
        padding: 'clamp(64px, 8vw, 96px) clamp(24px, 5vw, 64px)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div className="max-w-[1400px] mx-auto">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="eyebrow eyebrow-dark" style={{ marginBottom: 20, display: 'block' }}>
              Closed-loop system
            </span>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#F1F5F9', letterSpacing: '-0.02em', lineHeight: 1.1,
              maxWidth: 640, margin: '0 auto 16px',
            }}>
              Agents that talk to each other so you don't have to.
            </h2>
            <p style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
              color: '#555', lineHeight: 1.7, maxWidth: 520, margin: '0 auto',
            }}>
              Market Signal feeds Forecast. Forecast informs Pricing. Pricing triggers Promotion
              analysis. And ERP Action writes the final decision back — without a human in the loop
              unless escalation is needed.
            </p>
          </div>

          {/* Flow diagram */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
            alignItems: 'center', gap: '8px',
          }}>
            {[
              { name: 'Market Signal', col: '#10B981' },
              { name: 'Forecast',      col: '#06B6D4' },
              { name: 'Deviation',     col: '#EC4899' },
              { name: 'Pricing',       col: '#818CF8' },
              { name: 'Promotion',     col: '#A78BFA' },
              { name: 'Scenario',      col: '#22D3EE' },
              { name: 'Competitor',    col: '#F59E0B' },
              { name: 'Executive',     col: '#F472B6' },
              { name: 'ERP Action',    col: '#34D399' },
            ].map(({ name, col }, i, arr) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  padding: '8px 16px', borderRadius: 9999,
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${col}33`,
                  fontFamily: 'monospace', fontSize: 12, fontWeight: 700,
                  color: col, letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                }}>
                  {name}
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight size={14} color="rgba(255,255,255,0.12)" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section
        ref={ctaRef}
        style={{
          background: '#050505',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 5vw, 64px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
        }} />

        <div className="max-w-[720px] mx-auto" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <span className="eyebrow eyebrow-dark" style={{ display: 'block', marginBottom: 24 }}>
              Ready to deploy?
            </span>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#F1F5F9', letterSpacing: '-0.03em',
              lineHeight: 1.08, marginBottom: 20,
            }}>
              All 9 agents. Live in 48 hours.
            </h2>
            <p style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 'clamp(0.9375rem, 1.4vw, 1.0625rem)',
              color: '#555', lineHeight: 1.7, marginBottom: 36,
            }}>
              No code changes. No six-month integration. Plugs into your existing ERP,
              POS, and spreadsheets — and goes live before your next planning cycle.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link
                to="/book-demo"
                className="btn-primary"
                style={{ textDecoration: 'none', padding: '14px 32px', fontSize: '12px', letterSpacing: '0.15em', gap: 8 }}
              >
                Book a Demo <ArrowRight size={15} />
              </Link>
              <Link
                to="/about"
                style={{
                  textDecoration: 'none', padding: '14px 32px',
                  borderRadius: 14, border: '1px solid rgba(255,255,255,0.1)',
                  fontFamily: 'monospace', fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase' as const,
                  color: '#888', transition: 'all 0.3s ease',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLElement).style.color = '#888';
                }}
              >
                Learn About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
