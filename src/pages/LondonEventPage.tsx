import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import {
  TrendingUp,
  PackageCheck,
  LayoutDashboard,
  Settings,
  Bot,
  CheckCircle2,
  Calendar,
  Quote,
  MapPin,
  BarChart,
  ArrowRight,
  Crown,
  Users,
  Send,
  User,
  Mail,
  Building,
  MessageSquare,
  AlertTriangle,
  Boxes,
  ShoppingCart,
  TrendingDown,
  Phone,
  Briefcase
} from 'lucide-react';
import founder1Img from '../assets/founder1.jpeg';
import coFounderImg from '../assets/co-founder.png';
import londonVideo from '../assets/london.mp4';
import meetBg from '../assets/meet.png';
import section3Bg from '../assets/section3.png';
import LondonNavbar from '../components/LondonNavbar';
import LondonFooter from '../components/LondonFooter';

const services = [
  {
    title: 'AI Demand Forecasting',
    desc: 'Predict sales using historical data, market trends, and predictive models.',
    icon: TrendingUp,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/15',
    border: 'border-cyan-400/30',
    cardBg: 'from-cyan-500/20 via-cyan-950/10 to-white/5',
    barGradient: 'from-cyan-400 via-teal-400 to-blue-500',
    hoverGlow: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] hover:border-cyan-400/50'
  },
  {
    title: 'Inventory Intelligence',
    desc: 'Dynamic supply chain optimization — never overstock, never run out.',
    icon: PackageCheck,
    color: 'text-orange-400',
    bg: 'bg-orange-500/15',
    border: 'border-orange-400/30',
    cardBg: 'from-orange-500/20 via-amber-950/10 to-white/5',
    barGradient: 'from-orange-400 via-amber-400 to-yellow-500',
    hoverGlow: 'hover:shadow-[0_0_35px_rgba(249,115,22,0.3)] hover:border-orange-400/50'
  },
  {
    title: 'AI Dashboards',
    desc: 'One live view with AI-generated insights across your entire business.',
    icon: LayoutDashboard,
    color: 'text-blue-400',
    bg: 'bg-blue-500/15',
    border: 'border-blue-400/30',
    cardBg: 'from-blue-500/20 via-indigo-950/10 to-white/5',
    barGradient: 'from-blue-400 via-indigo-400 to-cyan-500',
    hoverGlow: 'hover:shadow-[0_0_35px_rgba(59,130,246,0.3)] hover:border-blue-400/50'
  },
  {
    title: 'Custom CRM / ERP',
    desc: 'Tailored automation built around how your business actually works.',
    icon: Settings,
    color: 'text-purple-400',
    bg: 'bg-purple-500/15',
    border: 'border-purple-400/30',
    cardBg: 'from-purple-500/20 via-purple-950/10 to-white/5',
    barGradient: 'from-purple-400 via-fuchsia-400 to-pink-500',
    hoverGlow: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] hover:border-purple-400/50'
  },
  {
    title: 'Business Process Automation',
    desc: 'Let AI handle the repetitive work, so your team can focus on what matters.',
    icon: Bot,
    color: 'text-pink-400',
    bg: 'bg-pink-500/15',
    border: 'border-pink-400/30',
    cardBg: 'from-pink-500/20 via-rose-950/10 to-white/5',
    barGradient: 'from-pink-400 via-rose-400 to-orange-500',
    hoverGlow: 'hover:shadow-[0_0_35px_rgba(236,72,153,0.3)] hover:border-pink-400/50'
  }
];

const stats = [
  { value: 9, suffix: '', label: 'AI Agents deployed' },
  { value: 40, suffix: '%', label: 'Average inventory cost reduction' },
  { value: 3.2, suffix: '×', label: 'Average first-year ROI' },
  { value: 50, suffix: '+', label: 'Businesses onboarded' }
];

const founders = [
  {
    name: "Sanjog",
    title: "Co-Founder & CEO",
    image: founder1Img,
    bio: "Visionary driving AI innovation and scalable enterprise technology.",
    tags: ["Operations", "Strategy", "Scale"],
    icon: Crown,
    cardBg: "from-purple-500/20 via-pink-950/10 to-white/5",
    barGradient: "from-purple-400 via-pink-400 to-orange-400",
    ringGradient: "from-purple-400 via-pink-500 to-orange-400",
    hoverGlow: "hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:border-purple-400/50",
    accentColor: "text-purple-400",
    titleColor: "text-purple-300",
    iconBg: "bg-purple-500/15 border-purple-400/30",
    tagBorder: "border-purple-500/30 text-purple-200"
  },
  {
    name: "Rashmi",
    title: "Co-Founder & COO",
    image: coFounderImg,
    bio: "Operations expert focused on turning AI into real-world business impact.",
    tags: ["AI Innovation", "Impact", "Growth"],
    icon: Users,
    cardBg: "from-cyan-500/20 via-teal-950/10 to-white/5",
    barGradient: "from-cyan-400 via-teal-400 to-emerald-400",
    ringGradient: "from-cyan-400 via-teal-400 to-emerald-400",
    hoverGlow: "hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:border-cyan-400/50",
    accentColor: "text-cyan-400",
    titleColor: "text-cyan-300",
    iconBg: "bg-cyan-500/15 border-cyan-400/30",
    tagBorder: "border-cyan-500/30 text-cyan-200"
  }
];

const Counter = ({ from, to, suffix }: { from: number; to: number; suffix: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 2,
      onUpdate(value) {
        node.textContent = value.toFixed(0) + suffix;
      }
    });
    return () => controls.stop();
  }, [from, to, suffix, inView]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
};

export default function LondonEventPage() {
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    contactNo: '',
    position: '',
    companyName: '',
    preferredDate: '',
    challenge: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isContactHighlighted, setIsContactHighlighted] = useState(false);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration && video.duration - video.currentTime < 0.4) {
      if (!isFading) setIsFading(true);
    } else if (video.currentTime < 0.4) {
      if (isFading) setIsFading(false);
    }
  };

  const scrollToBooking = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const section = document.getElementById('book-meeting');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    e.preventDefault();
    const section = document.getElementById('contact-form');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsContactHighlighted(true);
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 500);
      setTimeout(() => {
        setIsContactHighlighted(false);
      }, 2500);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      service_id: 'service_sz5rk8z',
      template_id: 'template_25gmazl',
      user_id: 'XngtQj2zxYRWGVbqS',
      template_params: {
        full_name: formData.fullName,
        work_email: formData.workEmail,
        contact_no: formData.contactNo,
        position_role: formData.position || 'N/A',
        company_name: formData.companyName,
        preferred_date: formData.preferredDate || 'N/A',
        supply_chain_challenge: formData.challenge || 'N/A'
      }
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setFormSubmitted(true);
      } else {
        const errText = await response.text();
        console.error('EmailJS Error:', errText);
        setSubmitError('Failed to send email. Please try again.');
      }
    } catch (err) {
      console.error('EmailJS Submission Error:', err);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans antialiased text-slate-900 overflow-x-hidden bg-[#0F172A]">
      <LondonNavbar />

      {/* 1. ORIGINAL IMMERSIVE HERO LAYOUT (SLEEK 100% SCREEN VIEWPORT FIT) */}
      <section className="relative min-h-[100svh] lg:h-screen lg:max-h-screen pt-16 lg:pt-20 pb-4 flex items-center overflow-hidden bg-black">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onSeeked={() => setIsFading(false)}
          className="absolute inset-0 w-full h-full object-cover object-right-top z-0"
        >
          <source src={londonVideo} type="video/mp4" />
        </video>

        {/* Seamless Loop Fade Overlay */}
        <div className={`absolute inset-0 bg-black z-0 transition-opacity duration-300 pointer-events-none ${isFading ? 'opacity-100' : 'opacity-0'}`} />

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent z-0 pointer-events-none" />

        <div className="relative z-20 max-w-[1300px] mx-auto px-4 md:px-8 w-full my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left: Event Announcement (Compact & Sleek screen1.png Content) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="pt-0"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-pink-500/40 bg-black/50 mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                <MapPin className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span className="text-slate-200 font-semibold text-[11px] tracking-wide">
                  ZAPPCODE AI IS IN LONDON · 15 – 25 OCTOBER 2026 <span className="text-pink-400 font-bold ml-1">| LIMITED MEETING SLOTS</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[40px] 2xl:text-[40px] font-bold text-white mb-3 leading-[1.08] tracking-tight max-w-[600px]">
                What Will Your Customers Buy Next? <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 block mt-0.5">Let AI Tell You Before You Stock It.</span>
              </h1>

              <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed mb-4 max-w-[580px]">
                Meet our founders in London and discover how AI can help your business forecast demand, prevent stockouts, reduce excess inventory and make smarter purchasing decisions. Bring us your business challenge — we'll show you what AI can do with your data.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
                <button
                  onClick={scrollToBooking}
                  className="group relative inline-flex items-center justify-center px-6 py-2.5 sm:py-3 text-[13.5px] sm:text-[14px] font-bold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 rounded-full overflow-hidden shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all hover:scale-105"
                >
                  <span className="relative flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-white shrink-0" />
                    Book a 30-Minute Meeting in London <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-semibold text-[13.5px] sm:text-[14px] transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-slate-300 shrink-0" />
                  Talk to Our Team First
                </button>
              </div>

              {/* Bottom 3 Trust Features (Compact & Sleek) */}
              <div className="pt-3 border-t border-white/10 max-w-[560px] grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-slate-300 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-[11.5px]">In-person</p>
                    <p className="text-slate-400 text-[10.5px]">in London</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-[11.5px]">No obligation</p>
                    <p className="text-slate-400 text-[10.5px]">Just a conversation</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <BarChart className="w-3.5 h-3.5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-[11.5px]">Practical AI discussion</p>
                    <p className="text-slate-400 text-[10.5px]">Tailored to your business</p>
                  </div>
                </div>
              </div>
            </motion.div>



          </div>
        </div>

        {/* Seamless Dark Fog Transition to Section 2 */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent via-[#0B1120]/80 to-[#0B1120] z-10 pointer-events-none" />
      </section>



      {/* 2. REDESIGNED SECTION 2: WHAT COULD AI TELL YOU ABOUT YOUR BUSINESS? (MATCHING SCREEN2.PNG) */}
      <section className="pt-20 lg:pt-24 pb-10 lg:pb-12 bg-[#0B1120] relative overflow-hidden">
        {/* Ambient Top & Center Fog */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#0F172A] via-cyan-900/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1300px] mx-auto px-4 md:px-8 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14 flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50" />
              <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase">
                WHAT COULD AI TELL YOU ABOUT YOUR BUSINESS?
              </span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4">
              Turn Your Business Data Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Better Decisions.</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-[760px] mx-auto leading-relaxed">
              Most businesses collect huge amounts of data from ERP, POS, e-commerce, and inventory systems. AI connects those dots to give you direct, actionable answers.
            </p>
          </motion.div>

          {/* 4 Cards Grid (Sleek 4-Column Layout on Desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-12">

            {/* Card 01: What will sell next? */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="group relative bg-gradient-to-br from-cyan-950/30 via-slate-900/60 to-slate-900/90 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-cyan-400/40 group-hover:text-cyan-400/80 transition-colors font-mono">01</span>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-300 transition-colors">
                  What will sell next?
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed mb-5">
                  Predict future demand by product, category, and location before peak seasons arrive.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[100px]">Demand Insights</span>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-[11px] font-bold shadow-[0_0_12px_rgba(6,182,212,0.2)] shrink-0">
                  <TrendingUp className="w-3 h-3" /> Higher Sales
                </div>
              </div>
            </motion.div>

            {/* Card 02: What could run out? */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group relative bg-gradient-to-br from-amber-950/30 via-slate-900/60 to-slate-900/90 border border-amber-500/20 hover:border-amber-400/50 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-amber-400/40 group-hover:text-amber-400/80 transition-colors font-mono">02</span>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-amber-300 transition-colors">
                  What could run out?
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed mb-5">
                  Spot supply bottlenecks early to prevent lost revenue and unhappy customers.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[100px]">Stockout Alerts</span>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)] shrink-0">
                  <AlertTriangle className="w-3 h-3 text-amber-400" /> Prevent Stockouts
                </div>
              </div>
            </motion.div>

            {/* Card 03: What are you overstocking? */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="group relative bg-gradient-to-br from-purple-950/30 via-slate-900/60 to-slate-900/90 border border-purple-500/20 hover:border-purple-400/50 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-purple-400/40 group-hover:text-purple-400/80 transition-colors font-mono">03</span>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Boxes className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-purple-300 transition-colors">
                  What are you overstocking?
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed mb-5">
                  Identify slow-moving inventory tied up in cash and cut storage costs.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[100px]">Inventory Control</span>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300 text-[11px] font-bold shadow-[0_0_12px_rgba(168,85,247,0.2)] shrink-0">
                  <TrendingDown className="w-3 h-3 text-purple-400" /> Reduce Excess Stock
                </div>
              </div>
            </motion.div>

            {/* Card 04: What should you purchase next? */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="group relative bg-gradient-to-br from-pink-950/30 via-slate-900/60 to-slate-900/90 border border-pink-500/20 hover:border-pink-400/50 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/20 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-pink-400/40 group-hover:text-pink-400/80 transition-colors font-mono">04</span>
                  <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-400/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-pink-300 transition-colors">
                  What should you purchase next?
                </h3>
                <p className="text-slate-300 text-xs sm:text-[13px] leading-relaxed mb-5">
                  Automate reorder recommendations based on lead times, supplier delays, and sales trends.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium truncate max-w-[100px]">Smart Orders</span>
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 text-[11px] font-bold shadow-[0_0_12px_rgba(236,72,153,0.2)] shrink-0">
                  <TrendingUp className="w-3 h-3 text-pink-400" /> Smarter Purchasing
                </div>
              </div>
            </motion.div>

          </div>

          {/* LET'S TALK IN LONDON Feature Card Banner (Redesigned matching section33.png) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[28px] overflow-hidden border border-purple-500/30 bg-[#091122] shadow-[0_12px_45px_rgba(0,0,0,0.6)] mb-0"
          >
            {/* Background Image Overlay using section3.png */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-right bg-no-repeat opacity-90"
              style={{ backgroundImage: `url(${section3Bg})` }}
            />
            {/* Dark fog gradient on left so text stays 100% crisp & readable */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#030712] via-[#030712]/98 lg:via-[#030712]/85 to-transparent pointer-events-none" />

            <div className="relative z-10 p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column: Heading & Description */}
              <div className="lg:col-span-6">
                <p className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase mb-3">
                  LET'S TALK IN LONDON
                </p>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold !text-white leading-tight mb-4" style={{ color: '#ffffff' }}>
                  Curious What This Could Look Like for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Your Business?</span>
                </h3>
                <p className="!text-white font-bold text-sm md:text-base leading-relaxed max-w-[500px]" style={{ color: '#ffffff' }}>
                  Meet Sanjog & Rashmi, Zappcode's founders, while they're in London. Bring your business challenge — we'll discuss where AI could realistically add value.
                </p>
              </div>

              {/* Right Column: 4 Features arranged in 2x2 Grid (Fills full right side, no button, no empty space) */}
              <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-purple-300" />
                    </div>
                    <div>
                      <p className="!text-white font-bold text-xs sm:text-sm" style={{ color: '#ffffff' }}>15 – 25 October 2026</p>
                      <p className="text-slate-400 text-[10.5px]">London visit dates</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div>
                      <p className="!text-white font-bold text-xs sm:text-sm" style={{ color: '#ffffff' }}>In-person in London</p>
                      <p className="text-slate-400 text-[10.5px]">Or virtual meeting</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-9 h-9 rounded-lg bg-pink-500/20 border border-pink-400/30 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-pink-300" />
                    </div>
                    <div>
                      <p className="!text-white font-bold text-xs sm:text-sm" style={{ color: '#ffffff' }}>No obligation</p>
                      <p className="text-slate-400 text-[10.5px]">Zero sales pitch</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <p className="!text-white font-bold text-xs sm:text-sm" style={{ color: '#ffffff' }}>Practical discussion</p>
                      <p className="text-slate-400 text-[10.5px]">Tailored to your business</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>



        </div>
      </section>

      {/* EXISTING CAPABILITIES SECTION */}
      <section className="pt-16 pb-16 bg-[#0B1120] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-[#0F172A] via-cyan-900/10 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1300px] mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50" />
              <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase">EXISTING CAPABILITIES</span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4">
              AI Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Real Business Impact</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-[720px] mx-auto leading-relaxed">
              Rising costs, unpredictable demand, and tighter margins are forcing UK businesses to rethink how they plan. Here's how we help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              let spanClass = "lg:col-span-2";
              if (index === 3 || index === 4) spanClass = "lg:col-span-3";

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative bg-gradient-to-r ${service.cardBg} border border-white/10 ${service.hoverGlow} backdrop-blur-xl rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden ${spanClass} flex flex-col justify-between h-full`}
                >
                  <div className={`absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b ${service.barGradient} group-hover:w-2 transition-all duration-300`} />
                  <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 shrink-0 rounded-2xl ${service.bg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border ${service.border}`}>
                      <Icon className={`w-7 h-7 ${service.color}`} />
                    </div>

                    <div className="relative z-10 pt-1">
                      <h3 className="font-bold text-white mb-2 text-xl group-hover:text-cyan-300 transition-colors">{service.title}</h3>
                      <p className="text-slate-300 text-[14.5px] leading-relaxed">{service.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 p-6 rounded-2xl bg-[#111C33] border border-cyan-500/30 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.15)]"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] shrink-0" />
              <span className="text-white font-bold text-base md:text-lg tracking-wide">
                Deploy in weeks, not months — fits UK enterprise timelines
              </span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)] shrink-0" />
              <span className="text-white font-bold text-base md:text-lg tracking-wide">
                Works with your existing ERP and POS systems
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. CASE STUDIES & PROOF */}
      <section className="pt-16 pb-10 bg-[#0B1120] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1300px] mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-500/50" />
              <span className="text-cyan-400 font-bold tracking-[0.2em] text-xs uppercase">PROVEN RESULTS</span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4">
              Proven Impact & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400">Enterprise Results</span>
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-[650px] mx-auto leading-relaxed">
              Quantifiable outcomes achieved by enterprise clients leveraging our demand intelligence platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 border-b border-white/10 pb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mb-3 tracking-tighter drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                  <Counter from={0} to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-200 text-[14px] font-bold max-w-[140px] mx-auto leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[1100px] mx-auto">
            {[
              {
                client: "Global Retail Enterprise",
                quote: "Zappcode's AI reduced our excess inventory by 42% in just 3 months. The ROI was immediate.",
                metric: "42% Reduction",
                label: "in excess stock"
              },
              {
                client: "Leading Manufacturing Firm",
                quote: "Automated end-to-end tracking increased our operational throughput without adding headcount.",
                metric: "28% Increase",
                label: "in throughput"
              }
            ].map((study, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group/study relative bg-gradient-to-br from-slate-900/90 via-[#0d1627] to-slate-900/90 border border-cyan-500/20 hover:border-cyan-400/50 p-5 sm:p-6 rounded-2xl backdrop-blur-xl shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Left Glowing Accent Strip */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 group-hover/study:w-1.5 transition-all duration-300" />

                {/* Card Top Row: Client Name & Metric Badge Inline */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Quote className="w-4 h-4 text-cyan-400 shrink-0 opacity-80" />
                    <span className="text-cyan-400 font-bold text-xs uppercase tracking-wider">
                      {study.client}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold shadow-[0_0_10px_rgba(52,211,153,0.15)] shrink-0">
                    <span>{study.metric}</span>
                    <span className="text-emerald-200/80 font-normal text-[10.5px] ml-0.5">{study.label}</span>
                  </div>
                </div>

                {/* Card Body: Compact Quote Text */}
                <p className="text-slate-200 text-xs sm:text-[13.5px] font-medium leading-relaxed my-1 pl-1">
                  "{study.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP / FOUNDERS SECTION ("WHO YOU'LL MEET") */}
      <section className="pt-10 pb-16 relative overflow-hidden bg-[#0B1120]">
        {/* Option B: Ultra-faint textured background image with luminosity blend */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity grayscale pointer-events-none"
          style={{ backgroundImage: `url(${meetBg})` }}
        />

        {/* Seamless Top & Bottom Gradient Fade Masks */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-black/40 to-[#0F172A] pointer-events-none z-0" />

        {/* Dual Theme Ambient Radial Glow (Purple & Cyan) */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-purple-600/10 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-600/10 blur-[140px] pointer-events-none" />

        <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-orange-500/50" />
              <span className="text-orange-500 font-bold tracking-[0.2em] text-xs uppercase">WHO YOU'LL MEET</span>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-orange-500/50" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white leading-tight mb-4">
              Connect Directly With <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">Our Leadership</span>
            </h2>
            <p className="text-slate-200 text-base md:text-lg max-w-[650px] mx-auto leading-relaxed">
              Sanjog and Rashmi will be personally meeting businesses across London — bring your questions directly to the people building the product.
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-full mt-6 opacity-80" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {founders.map((founder, index) => {
              const Icon = founder.icon;
              return (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group/card relative rounded-[2rem] bg-gradient-to-r ${founder.cardBg} border border-white/10 ${founder.hoverGlow} backdrop-blur-xl p-6 md:p-8 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-500 flex flex-col sm:flex-row gap-6 md:gap-8 items-center sm:items-start`}
                >
                  {/* Left Glowing Accent Strip */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b ${founder.barGradient} group-hover/card:w-2 transition-all duration-300`} />
                  <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40 group-hover/card:opacity-100 transition-opacity duration-500" />

                  <div className={`absolute top-6 right-6 w-9 h-9 rounded-xl ${founder.iconBg} hidden sm:flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${founder.accentColor}`} />
                  </div>

                  <div className="relative w-[120px] h-[120px] md:w-[130px] md:h-[130px] shrink-0 mx-auto sm:mx-0">
                    <div className={`absolute inset-[-4px] rounded-full bg-gradient-to-b ${founder.ringGradient} opacity-60 group-hover/card:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute inset-[-4px] rounded-full bg-black m-[2px]" />
                    <img src={founder.image} alt={founder.name} className="absolute inset-0 w-full h-full object-cover object-top rounded-full p-[2px]" />
                  </div>

                  <div className="flex-1 text-center sm:text-left mt-2 sm:mt-0">
                    <h4 className="text-2xl font-bold text-white group-hover/card:text-white transition-colors pr-0 sm:pr-10">{founder.name}</h4>
                    <p className={`${founder.titleColor} font-bold text-sm tracking-wide mt-1 mb-3`}>{founder.title}</p>

                    <p className="text-slate-200 text-[14px] leading-relaxed mb-5 max-w-[280px] mx-auto sm:mx-0">
                      {founder.bio}
                    </p>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      {founder.tags.map(tag => (
                        <span key={tag} className={`px-3 py-1 rounded-full bg-white/5 border ${founder.tagBorder} text-[11px] font-semibold transition-colors`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. LET'S TALK — BOOK A MEETING + CONTACT FORM (SIDE BY SIDE, EQUAL HEIGHT, NO BOTTOM GAP) */}
      <section id="book-meeting" className="py-24 bg-[#0F172A] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1100px] mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col items-center mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 font-bold text-xs uppercase tracking-widest mb-3">
                LET'S TALK
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight leading-tight">
                Two Ways to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">Get Started</span>
              </h2>
              <p className="text-white font-bold text-base md:text-lg max-w-[620px] mx-auto leading-relaxed drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                Prefer a face-to-face conversation, or a quick message first? Choose what works for you.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

            {/* LEFT — Option A: Book a Meeting */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="bg-black/40 border border-white/10 rounded-2xl backdrop-blur-xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col justify-between h-full"
            >
              <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-30" />

              <div>
                <div className="inline-block px-2.5 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-bold uppercase tracking-wider mb-3">
                  OPTION A
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Book Your London Meeting</h3>
                <p className="text-white font-medium text-xs sm:text-sm leading-relaxed mb-2">
                  Choose a 30-minute slot during our founders' London visit. In-person or virtual — your choice.
                </p>
                <p className="text-slate-200 text-[11.5px] leading-relaxed mb-4 italic">
                  No pitch deck. No pressure. Just a focused conversation about how AI can automate your workflows and grow your operations.
                </p>

                {/* Custom Calendar Graphic */}
                <div className="relative group/calendar my-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl blur-md opacity-15 group-hover/calendar:opacity-25 transition-opacity duration-500" />
                  <div className="relative bg-[#0B1120] border border-white/10 rounded-xl p-4 overflow-hidden">
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                      <span className="text-white font-bold text-xs">Select a Date (October)</span>
                      <div className="flex gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-slate-400 text-[10px] cursor-not-allowed">←</div>
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] hover:bg-white/20 transition-colors cursor-pointer">→</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-1.5 text-center">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <span key={i} className="text-slate-400 text-[9px] font-bold uppercase">{d}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = day === 18;
                        const isPast = day < 15 || day > 25;
                        return (
                          <div
                            key={day}
                            className={`
                              aspect-square flex items-center justify-center rounded text-[11px] font-medium transition-colors
                              ${isSelected ? 'bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold shadow-[0_0_10px_rgba(249,115,22,0.5)]' : ''}
                              ${isPast && !isSelected ? 'text-slate-600 opacity-40 cursor-not-allowed' : ''}
                              ${!isPast && !isSelected ? 'text-white bg-white/10 hover:bg-white/20 cursor-pointer border border-transparent hover:border-white/20 font-semibold' : ''}
                            `}
                          >
                            {day}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://calendly.com/zappcode"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 rounded-full shadow-[0_0_25px_rgba(236,72,153,0.4)] transition-all hover:scale-105 group w-full text-center"
                >
                  Book on Calendly <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <div className="flex items-center gap-1 text-white font-semibold text-[11.5px] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Virtual or In-Person
                  </div>
                  <div className="flex items-center gap-1 text-white font-semibold text-[11.5px] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero Obligation
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Option B: Contact Form */}
            <motion.div
              id="contact-form"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className={`bg-black/40 border ${isContactHighlighted ? 'border-cyan-400 ring-2 ring-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.5)]' : 'border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)]'} rounded-2xl backdrop-blur-xl p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between h-full transition-all duration-500`}
            >
              <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60" />

              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-bold uppercase tracking-wider mb-3">
                    OPTION B
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Send Us a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Message</span>
                  </h3>
                  <p className="text-white font-medium text-xs sm:text-sm leading-relaxed mb-4">
                    Not ready to book? Tell us about your business and we'll get back to you within 24 hours.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center my-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                    <h4 className="text-lg font-bold text-white mb-1.5">Message Sent Successfully!</h4>
                    <p className="text-white font-medium text-xs">
                      Thank you for reaching out. Our founders will review your message and reply within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-3.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11.5px] font-bold text-white uppercase tracking-wider mb-1">
                            Full Name <span className="text-pink-400">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              ref={nameInputRef}
                              type="text"
                              required
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                              placeholder="e.g. John Smith"
                              className="w-full bg-[#0B1120] border border-cyan-500/30 rounded-lg py-2.5 pl-9 pr-3 text-white font-medium text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-400 shadow-inner"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11.5px] font-bold text-white uppercase tracking-wider mb-1">
                            Work Email <span className="text-pink-400">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={formData.workEmail}
                              onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                              placeholder="john@company.co.uk"
                              className="w-full bg-[#0B1120] border border-cyan-500/30 rounded-lg py-2.5 pl-9 pr-3 text-white font-medium text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-400 shadow-inner"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11.5px] font-bold text-white uppercase tracking-wider mb-1">
                            Contact No <span className="text-pink-400">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="tel"
                              required
                              value={formData.contactNo}
                              onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                              placeholder="+44 7123 456789"
                              className="w-full bg-[#0B1120] border border-cyan-500/30 rounded-lg py-2.5 pl-9 pr-3 text-white font-medium text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-400 shadow-inner"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11.5px] font-bold text-white uppercase tracking-wider mb-1">
                            Position / Role <span className="text-slate-400 lowercase font-normal">(optional)</span>
                          </label>
                          <div className="relative">
                            <Briefcase className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              value={formData.position}
                              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                              placeholder="e.g. Operations Director"
                              className="w-full bg-[#0B1120] border border-cyan-500/30 rounded-lg py-2.5 pl-9 pr-3 text-white font-medium text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-400 shadow-inner"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11.5px] font-bold text-white uppercase tracking-wider mb-1">
                            Company Name <span className="text-pink-400">*</span>
                          </label>
                          <div className="relative">
                            <Building className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              value={formData.companyName}
                              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                              placeholder="e.g. Acme Retail UK"
                              className="w-full bg-[#0B1120] border border-cyan-500/30 rounded-lg py-2.5 pl-9 pr-3 text-white font-medium text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-400 shadow-inner"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11.5px] font-bold text-white uppercase tracking-wider mb-1">
                            Preferred Date <span className="text-slate-400 lowercase font-normal">(optional)</span>
                          </label>
                          <div className="relative">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="date"
                              value={formData.preferredDate}
                              onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                              className="w-full bg-[#0B1120] border border-cyan-500/30 rounded-lg py-2.5 pl-9 pr-3 text-white font-medium text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-400 shadow-inner [color-scheme:dark]"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11.5px] font-bold text-white uppercase tracking-wider mb-1">
                          What's your biggest supply chain challenge? <span className="text-slate-300 lowercase font-normal">(optional)</span>
                        </label>
                        <div className="relative">
                          <MessageSquare className="w-3.5 h-3.5 text-cyan-400 absolute left-3 top-2.5" />
                          <textarea
                            rows={2}
                            value={formData.challenge}
                            onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                            placeholder="Tell us about stockouts, forecasting issues, ERP systems..."
                            className="w-full bg-[#0B1120] border border-cyan-500/30 rounded-lg py-2 pl-9 pr-3 text-white font-medium text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-400 resize-none shadow-inner"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-1">
                      {submitError && (
                        <p className="text-pink-400 text-xs text-center font-semibold mb-2">{submitError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-full shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-105 group text-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending Message...
                          </span>
                        ) : (
                          <>Send Message <Send className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" /></>
                        )}
                      </button>

                      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                        <div className="flex items-center gap-1 text-white font-semibold text-[11.5px] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 24-Hr Response Time
                        </div>
                        <div className="flex items-center gap-1 text-white font-semibold text-[11.5px] bg-white/10 px-3 py-1 rounded-full border border-white/10">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 100% Privacy Guaranteed
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. FINAL URGENCY CTA BANNER */}
      <section className="py-16 bg-[#0B1120] relative overflow-hidden border-t border-white/5">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-orange-900/40 border border-pink-500/30 rounded-[32px] p-8 md:p-12 text-center backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.15)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent pointer-events-none" />

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Our Founders Are Only in London for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400">Limited Time</span>
            </h3>
            <p className="text-slate-300 text-base md:text-lg max-w-[600px] mx-auto mb-8 leading-relaxed">
              Don't miss the chance to talk directly with the people building Zappcode. Slots are filling up.
            </p>

            <button
              onClick={scrollToBooking}
              className="inline-flex items-center justify-center px-8 py-4 text-[16px] font-bold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-500 hover:via-pink-400 hover:to-orange-400 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all hover:scale-105 group"
            >
              Book Your Slot Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <LondonFooter />
    </div>
  );
}
