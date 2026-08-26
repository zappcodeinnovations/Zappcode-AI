
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

export type RobotMood = 'idle' | 'happy' | 'pleading';

interface RobotMascotProps {
  mood: RobotMood;
  className?: string;
}

const glowColor: Record<RobotMood, string> = {
  idle: '#38bdf8',
  happy: '#22d3ee',
  pleading: '#64748b',
};

const bodyFloat: Variants = {
  idle: {
    y: [0, -6, 0],
    rotate: [0, -1.5, 1.5, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
  happy: {
    y: [0, -10, 0],
    rotate: [0, -2, 2, -2, 0],
    scale: [1, 1.02, 1],
    transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
  },
  pleading: {
    y: [0, 3, 0],
    rotate: [0, -2, 2, -1, 0],
    transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
  },
};

/**
 * Full-body 3D-style robot mascot (head + antennas + torso + arms + legs)
 * styled after a glossy white/black bot with glowing ring eyes. Reacts to
 * `mood` so the same component drives every state of the lead capture modal.
 */
export default function RobotMascot({ mood = 'idle', className = '' }: RobotMascotProps) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className || 'w-44 h-56 sm:w-52 sm:h-64'}`}>
      {/* Ambient glow behind the robot — reacts to mood */}
      <motion.div
        animate={{
          opacity: mood === 'pleading' ? [0.1, 0.2, 0.1] : [0.25, 0.45, 0.25],
          scale: mood === 'happy' ? [1, 1.15, 1] : [1, 1.05, 1],
        }}
        transition={{ duration: mood === 'happy' ? 1.4 : 2.6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full blur-3xl"
        style={{ background: glowColor[mood] }}
      />

      {/* Contact shadow on the "floor" so it reads as floating in 3D space */}
      <motion.div
        animate={{ scaleX: mood === 'happy' ? [1, 0.82, 1] : [1, 0.93, 1], opacity: [0.4, 0.22, 0.4] }}
        transition={{ duration: mood === 'happy' ? 1.5 : 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-2 w-28 h-4 bg-black/50 rounded-full blur-md"
      />

      <motion.svg
        viewBox="0 0 220 300"
        className="relative w-full h-full drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)]"
        variants={bodyFloat}
        animate={mood}
      >
        <defs>
          <linearGradient id="rm-headGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#a7b2c2" />
          </linearGradient>
          <linearGradient id="rm-visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="rm-bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#aab4c4" />
          </linearGradient>
          <linearGradient id="rm-limbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <radialGradient id="rm-eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glowColor[mood]} stopOpacity="0.9" />
            <stop offset="100%" stopColor={glowColor[mood]} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ===== Legs (drawn first so body sits on top) ===== */}
        <motion.g
          style={{ transformOrigin: '90px 232px' }}
          animate={mood === 'happy' ? { rotate: [-3, 3, -3] } : { rotate: [0, 0, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="78" y="228" width="24" height="42" rx="10" fill="url(#rm-limbGrad)" stroke="#64748b" strokeWidth="1.2" />
          <circle cx="90" cy="228" r="10" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.2" />
          <ellipse cx="90" cy="276" rx="18" ry="8" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.2" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: '130px 232px' }}
          animate={mood === 'happy' ? { rotate: [3, -3, 3] } : { rotate: [0, 0, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="118" y="228" width="24" height="42" rx="10" fill="url(#rm-limbGrad)" stroke="#64748b" strokeWidth="1.2" />
          <circle cx="130" cy="228" r="10" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.2" />
          <ellipse cx="130" cy="276" rx="18" ry="8" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.2" />
        </motion.g>

        {/* ===== Torso ===== */}
        <rect x="60" y="150" width="100" height="90" rx="32" fill="url(#rm-bodyGrad)" stroke="#94a3b8" strokeWidth="1.5" />
        <ellipse cx="88" cy="168" rx="16" ry="7" fill="white" opacity="0.5" />
        {/* Chest light */}
        <motion.rect
          x="98" y="182" width="24" height="8" rx="4"
          fill={glowColor[mood]}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <text x="110" y="222" textAnchor="middle" fontSize="26" fontWeight="800" fill={glowColor[mood]} fontFamily="Arial, sans-serif">
          Z
        </text>

        {/* ===== Arms ===== */}
        <motion.g
          style={{ transformOrigin: '60px 168px' }}
          animate={
            mood === 'happy'
              ? { rotate: [0, -45, 5, -45, 0] }
              : mood === 'pleading'
                ? { rotate: [12, 18, 12] }
                : { rotate: [-4, 4, -4] }
          }
          transition={{ duration: mood === 'happy' ? 1.3 : 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="30" y="160" width="34" height="16" rx="8" fill="url(#rm-limbGrad)" stroke="#64748b" strokeWidth="1.2" />
          <circle cx="28" cy="168" r="11" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: '160px 168px' }}
          animate={mood === 'pleading' ? { rotate: [-14, -20, -14] } : { rotate: [4, -4, 4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="156" y="160" width="34" height="16" rx="8" fill="url(#rm-limbGrad)" stroke="#64748b" strokeWidth="1.2" />
          <circle cx="192" cy="168" r="11" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.2" />
        </motion.g>

        {/* Neck */}
        <rect x="96" y="140" width="28" height="14" fill="#94a3b8" rx="5" />

        {/* ===== Head ===== */}
        {/* Antennas */}
        <motion.g
          animate={mood === 'pleading' ? { rotate: -8 } : { rotate: 0 }}
          style={{ transformOrigin: '70px 40px' }}
          transition={{ duration: 0.5 }}
        >
          <line x1="70" y1="40" x2="58" y2="14" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="58" cy="12" r="5" fill="#cbd5e1" />
        </motion.g>
        <motion.g
          animate={mood === 'pleading' ? { rotate: 8 } : { rotate: 0 }}
          style={{ transformOrigin: '150px 40px' }}
          transition={{ duration: 0.5 }}
        >
          <line x1="150" y1="40" x2="162" y2="14" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <circle cx="162" cy="12" r="5" fill="#cbd5e1" />
        </motion.g>

        {/* Head shape */}
        <rect x="40" y="28" width="140" height="118" rx="42" fill="url(#rm-headGrad)" stroke="#94a3b8" strokeWidth="1.5" />
        <ellipse cx="75" cy="52" rx="30" ry="13" fill="white" opacity="0.4" />

        {/* Visor */}
        <rect x="56" y="52" width="108" height="66" rx="30" fill="url(#rm-visorGrad)" />

        {/* ===== Eyes / expression per mood ===== */}
        <AnimatePresence mode="wait">
          {mood === 'happy' && (
            <motion.g key="eyes-happy" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <circle cx="90" cy="85" r="20" fill="url(#rm-eyeGlow)" />
              <circle cx="130" cy="85" r="20" fill="url(#rm-eyeGlow)" />
              <circle cx="90" cy="85" r="13" fill="none" stroke={glowColor.happy} strokeWidth="5" />
              <circle cx="130" cy="85" r="13" fill="none" stroke={glowColor.happy} strokeWidth="5" />
              <circle cx="90" cy="85" r="4" fill={glowColor.happy} />
              <circle cx="130" cy="85" r="4" fill={glowColor.happy} />
              {/* happy smile */}
              <path d="M84 108 Q110 126 136 108" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" fill="none" />
            </motion.g>
          )}

          {mood === 'idle' && (
            <motion.g key="eyes-idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <circle cx="90" cy="85" r="18" fill="url(#rm-eyeGlow)" opacity="0.7" />
              <circle cx="130" cy="85" r="18" fill="url(#rm-eyeGlow)" opacity="0.7" />
              <motion.circle
                cx="90" cy="85" r="12" fill="none" stroke={glowColor.idle} strokeWidth="5"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 1.4 }}
              />
              <motion.circle
                cx="130" cy="85" r="12" fill="none" stroke={glowColor.idle} strokeWidth="5"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 1.4 }}
              />
              <line x1="98" y1="112" x2="122" y2="112" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
            </motion.g>
          )}

          {mood === 'pleading' && (
            <motion.g key="eyes-sad" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              {/* Sad, half-closed downcast eyes — NOT angry: no slanted-in brows, soft dim rings, lids drooping down */}
              <circle cx="90" cy="88" r="16" fill="url(#rm-eyeGlow)" opacity="0.5" />
              <circle cx="130" cy="88" r="16" fill="url(#rm-eyeGlow)" opacity="0.5" />
              <circle cx="90" cy="90" r="10" fill="none" stroke={glowColor.pleading} strokeWidth="4.5" opacity="0.9" />
              <circle cx="130" cy="90" r="10" fill="none" stroke={glowColor.pleading} strokeWidth="4.5" opacity="0.9" />
              {/* drooping eyelids covering the top half of each eye = sad, sleepy look */}
              <path d="M78 82 Q90 74 102 82 L102 90 Q90 84 78 90 Z" fill="#0f172a" />
              <path d="M118 82 Q130 74 142 82 L142 90 Q130 84 118 90 Z" fill="#0f172a" />
              {/* soft worried eyebrows (outer corners UP, inner corners DOWN = sad, opposite of angry) */}
              <path d="M76 68 Q88 76 100 72" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M144 68 Q132 76 120 72" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* animated tear */}
              <motion.path
                d="M86 98 q3 8 0 12 q-3 -4 0 -12"
                fill="#38bdf8"
                animate={{ y: [0, 18, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.5 }}
              />
              {/* sad downturned mouth */}
              <path d="M92 115 Q110 104 128 115" stroke="#64748b" strokeWidth="4" strokeLinecap="round" fill="none" />
            </motion.g>
          )}
        </AnimatePresence>
      </motion.svg>
    </div>
  );
}