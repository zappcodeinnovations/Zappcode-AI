import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Calendar, PlayCircle } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Navbar from './Navbar';
import heroVideo from '../assets/hero-section.mp4';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } }
};

export default function Hero() {
  // Parallax setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothX, [-0.5, 0.5], ['-2%', '2%']);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ['-2%', '2%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const headlineText = "AI That Predicts Demand, So You Never Have to Guess";
  const words = headlineText.split(' ');

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'var(--color-navy)' }}>
      
      {/* Parallax Video Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ x: bgX, y: bgY, scale: 1.05 }}
      >
        <motion.div 
          className="w-full h-full"
          initial={{ filter: 'blur(20px)' }}
          animate={{ filter: 'blur(0px)' }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ background: 'rgba(15, 23, 42, 0.75)' }}
      />

      {/* Navigation */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-center pt-24 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mb-8 px-4 py-2 rounded-full flex items-center gap-2"
            style={{ border: '1px solid var(--color-orange)', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(10px)' }}
          >
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-orange)', boxShadow: '0 0 8px var(--color-orange)' }} />
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-orange)', letterSpacing: '0.02em' }}>
              Generation-9 AI &bull; Live in Enterprise Today
            </span>
          </motion.div>

          {/* Headline - Word by Word */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 font-bold flex flex-wrap justify-center"
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1.15,
              color: '#FFFFFF'
            }}
          >
            {words.map((word, index) => {
              const isGradient = word.includes('Predicts') || word.includes('Demand,');
              return (
                <motion.span 
                  key={index} 
                  variants={wordVariants} 
                  className={`inline-block mr-3 sm:mr-4 ${isGradient ? 'text-gradient-brand' : ''}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mb-10 max-w-3xl"
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: '#94A3B8',
              lineHeight: 1.6
            }}
          >
            9 smart AI agents work together to watch your supply chain and make decisions in real time &mdash; helping you stay ahead before problems even happen.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full"
          >
            <Link to="/book-demo" className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base bg-gradient-brand" 
              style={{ color: '#FFFFFF', boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)', textDecoration: 'none' }}
            >
              <Calendar size={18} /> Book a Free Demo
            </Link>
            <button className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-cyan-500/10" 
              style={{ border: '1px solid var(--color-cyan)', color: 'var(--color-cyan)' }}
            >
              <PlayCircle size={18} /> See How It Works
            </button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-12 sm:mt-16"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: '#64748B',
              textTransform: 'uppercase'
            }}
          >
            Trusted by teams in FMCG &middot; Retail &middot; Pharma &middot; Manufacturing &middot; E-Commerce
          </motion.p>
        </div>
      </div>

      {/* Bouncing Chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} style={{ color: '#64748B' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
