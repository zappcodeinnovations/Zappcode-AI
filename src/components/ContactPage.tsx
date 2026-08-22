import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

const ease: [number, number, number, number] = [0.23, 1, 0.32, 1];

const CONTACT_DETAILS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@aigentg9.com',
    href: 'mailto:hello@aigentg9.com',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'Zappcode AI · India',
    href: null,
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Within one business day',
    href: null,
  },
];

const TRUST_ITEMS = [
  'Live in under 48 hours',
  'No code changes required',
  'Works with your existing ERP & POS',
  'Full audit trail on every decision',
  'Dedicated onboarding support',
];

type FormState = {
  name: string;
  company: string;
  email: string;
  message: string;
};

const EMPTY: FormState = { name: '', company: '', email: '', message: '' };

// Shared input style factory
function inputStyle(focused: boolean): React.CSSProperties {
  return {
    width: '100%',
    background: focused ? 'rgba(37,99,235,0.04)' : 'rgba(255,255,255,0.03)',
    border: `1px solid ${focused ? 'rgba(37,99,235,0.35)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '12px',
    padding: '13px 16px',
    color: '#F1F5F9',
    fontFamily: "'Instrument Sans', sans-serif",
    fontSize: '0.9375rem',
    outline: 'none',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.25s ease, background 0.25s ease',
  };
}

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '11px',
  color: '#64748B',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '8px',
};

export default function ContactPage() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<FormState>(EMPTY);
  const [focused, setFocused] = useState<keyof FormState | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="section-dark"
      style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}
    >
      <div className="max-w-[1400px] mx-auto" style={{ padding: '0 clamp(24px, 5vw, 64px)' }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: '680px', marginBottom: 'clamp(56px, 7vw, 88px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            style={{ marginBottom: '24px' }}
          >
            <span className="eyebrow eyebrow-dark">Get in Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              color: '#F1F5F9',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
          >
            Ready to stop flying blind on demand?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 'clamp(1rem, 1.5vw, 1.0625rem)',
              color: '#94A3B8',
              lineHeight: 1.7,
            }}
          >
            Tell us about your demand planning challenge. We'll walk you through how
            AigentG9's 9 agents plug into your existing stack and go live in under 48 hours.
          </motion.p>
        </div>

        {/* ── Two-column layout ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr]" style={{ gap: 'clamp(40px, 7vw, 80px)', alignItems: 'start' }}>

          {/* Left — contact info ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.25, ease }}
          >
            {/* Contact detail rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '11px', flexShrink: 0,
                    background: 'rgba(37,99,235,0.1)',
                    border: '1px solid rgba(37,99,235,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} color="#60A5FA" />
                  </div>
                  <div>
                    <div style={labelStyle}>{label}</div>
                    {href ? (
                      <a
                        href={href}
                        style={{
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontSize: '1rem',
                          color: '#F1F5F9',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#60A5FA')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#F1F5F9')}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '1rem', color: '#F1F5F9' }}>
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '32px' }} />

            {/* Trust list */}
            <div style={{ marginBottom: '8px', ...labelStyle }}>Why teams choose us</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {TRUST_ITEMS.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={16} color="#2563EB" style={{ flexShrink: 0 }} />
                  <span style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: '0.9375rem',
                    color: '#94A3B8',
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.35, ease }}
          >
            {submitted ? (
              /* Success state */
              <div
                className="glass-card"
                style={{
                  padding: 'clamp(40px, 5vw, 64px)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'rgba(37,99,235,0.12)',
                  border: '1px solid rgba(37,99,235,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CheckCircle size={26} color="#60A5FA" />
                </div>
                <h3 style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: '1.75rem',
                  color: '#F1F5F9',
                  margin: 0,
                }}>
                  Message received.
                </h3>
                <p style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: '1rem',
                  color: '#94A3B8',
                  margin: 0,
                  maxWidth: '320px',
                  lineHeight: 1.6,
                }}>
                  We'll be in touch within one business day to schedule a demo.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(EMPTY); }}
                  style={{
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: '13px',
                    color: '#60A5FA',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    marginTop: '4px',
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* Form */
              <form
                onSubmit={handleSubmit}
                className="glass-card"
                style={{ padding: 'clamp(28px, 4vw, 44px)' }}
              >
                {/* Name + Company row */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-2"
                  style={{ gap: '16px', marginBottom: '16px' }}
                >
                  <div>
                    <label style={labelStyle}>Full name</label>
                    <input
                      type="text"
                      placeholder="Alex Johnson"
                      value={form.name}
                      onChange={set('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      required
                      style={inputStyle(focused === 'name')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text"
                      placeholder="Acme Corp"
                      value={form.company}
                      onChange={set('company')}
                      onFocus={() => setFocused('company')}
                      onBlur={() => setFocused(null)}
                      required
                      style={inputStyle(focused === 'company')}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Work email</label>
                  <input
                    type="email"
                    placeholder="alex@acme.com"
                    value={form.email}
                    onChange={set('email')}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    required
                    style={inputStyle(focused === 'email')}
                  />
                </div>

                {/* Message */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>Tell us about your challenge</label>
                  <textarea
                    placeholder="We're struggling with stockouts during peak season and our current system can't keep up with demand spikes..."
                    value={form.message}
                    onChange={set('message')}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    required
                    rows={5}
                    style={{ ...inputStyle(focused === 'message'), resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', borderRadius: '12px' }}
                >
                  Send message <ArrowRight size={16} />
                </button>

                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#475569',
                  textAlign: 'center',
                  marginTop: '16px',
                  letterSpacing: '0.05em',
                }}>
                  No spam. No sales calls. Just a real conversation.
                </p>
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
