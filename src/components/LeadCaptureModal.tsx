import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Box, Network, Bot, Zap, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
// Assuming navbar-logo.png is light text on transparent, suitable for dark background.
// If it's dark text, the user can swap this to footer-logo.png or logo.png.
import logo from '../assets/navbar-logo.png';
import RobotMascot from './RobotMascot';


export default function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [viewState, setViewState] = useState<'form' | 'success' | 'exit-intent'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    size: '',
    challenge: '',
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; company?: string }>({});

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem('zappcode_modal_shown');
    if (!hasBeenShown) {
      const timer = setTimeout(() => setIsOpen(true), 7000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    sessionStorage.setItem('zappcode_modal_shown', 'true');
  }, []);

  const handleCloseClick = useCallback(() => {
    if (viewState === 'form') {
      setViewState('exit-intent');
    } else {
      handleClose();
    }
  }, [viewState, handleClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleCloseClick();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleCloseClick]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; company?: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.company.trim()) newErrors.company = 'Company Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate API call
      setViewState('success');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const floatingVariants: any = {
    idle: (custom: number) => ({
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: custom * 0.5 },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleCloseClick}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-[#131826] rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/50 flex flex-col md:flex-row overflow-y-auto overflow-x-hidden max-h-[95vh] md:max-h-[90vh] custom-scrollbar"
          >
            {/* LEFT COLUMN (Hidden on Mobile) */}
            <div className="hidden md:flex w-full md:w-1/2 bg-[#0F172A] p-6 md:p-10 flex-col justify-between relative shrink-0">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-[80px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-orange-500 rounded-full mix-blend-screen filter blur-[80px]" />
              </div>

              <div className="relative z-10">
                <img src={logo} alt="Zappcode AI" className="h-10 object-contain mb-3" />
                <p className="text-slate-400 font-semibold tracking-widest uppercase text-[10px] mb-4">AI · Automation · Impact</p>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Let's Build Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-blue-500 to-cyan-400">
                    AI Advantage
                  </span>{' '}
                  Together
                </h2>

                <div className="w-16 h-px bg-gradient-to-r from-orange-500 to-blue-500 mb-4" />

                <p className="text-slate-300 text-sm md:text-[15px] leading-relaxed mb-6">
                  Share your business challenge with us and our team will show you exactly how Zappcode's AI agents can help.
                </p>

                <div className="flex items-center justify-center gap-6 mb-8 h-20">
                  <motion.div custom={0} variants={floatingVariants} animate="idle" className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                    <div className="w-14 h-14 bg-blue-900/40 border border-blue-500/30 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner relative z-10">
                      <Brain className="w-7 h-7 text-blue-400" />
                    </div>
                  </motion.div>

                  <motion.div custom={1} variants={floatingVariants} animate="idle" className="relative mt-8">
                    <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full" />
                    <div className="w-14 h-14 bg-orange-900/40 border border-orange-500/30 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner relative z-10">
                      <Box className="w-7 h-7 text-orange-400" />
                    </div>
                  </motion.div>

                  <motion.div custom={2} variants={floatingVariants} animate="idle" className="relative">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full" />
                    <div className="w-14 h-14 bg-cyan-900/40 border border-cyan-500/30 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner relative z-10">
                      <Network className="w-7 h-7 text-cyan-400" />
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 relative z-10 mt-auto">
                {[
                  { icon: Bot, text: '9 AI Agents', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                  { icon: Zap, text: '48h Deployment', color: 'text-orange-400', bg: 'bg-orange-400/10' },
                  { icon: ShieldCheck, text: 'Enterprise Ready', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
                  { icon: Clock, text: '24/7 Support', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                ].map((badge, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${badge.bg} border border-white/5`}
                  >
                    <badge.icon className={`w-4 h-4 ${badge.color}`} />
                    <span className="text-slate-300 text-[11px] font-medium whitespace-nowrap">{badge.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-full md:w-1/2 bg-[#131826] p-5 sm:p-6 md:p-10 relative flex flex-col">
              <div className="md:hidden flex justify-center mb-4">
                <img src={logo} alt="Zappcode AI" className="h-8 object-contain" />
              </div>

              <button
                onClick={handleCloseClick}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors z-20"
                aria-label="Close modal"
              >
                <motion.div whileHover={{ rotate: 90, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              </button>

              <div className="flex-grow flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {viewState === 'form' && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <h3 id="modal-headline" className="text-xl sm:text-2xl font-bold text-white mb-4">
                        Book a Free Consultation
                      </h3>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Name *</label>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className={`w-full bg-white text-slate-900 rounded-lg px-4 py-2.5 text-[16px] md:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all ${errors.name ? 'border-2 border-red-500' : 'border border-transparent'
                                }`}
                              placeholder="John Doe"
                            />
                            {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Work Email *</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full bg-white text-slate-900 rounded-lg px-4 py-2.5 text-[16px] md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${errors.email ? 'border-2 border-red-500' : 'border border-transparent'
                                }`}
                              placeholder="john@company.com"
                            />
                            {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Company Name *</label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              className={`w-full bg-white text-slate-900 rounded-lg px-4 py-2.5 text-[16px] md:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${errors.company ? 'border-2 border-red-500' : 'border border-transparent'
                                }`}
                              placeholder="Company Ltd."
                            />
                            {errors.company && <p className="text-red-400 text-[11px] mt-1">{errors.company}</p>}
                          </div>
                          <div>
                            <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Industry</label>
                            <select
                              name="industry"
                              value={formData.industry}
                              onChange={handleInputChange}
                              className="w-full truncate bg-white text-slate-900 rounded-lg px-4 py-2.5 text-[16px] md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border border-transparent cursor-pointer"
                            >
                              <option value="">Select Industry</option>
                              <option value="Manufacturing">Manufacturing</option>
                              <option value="Retail">Retail</option>
                              <option value="Pharma">Pharma</option>
                              <option value="FMCG">FMCG</option>
                              <option value="E-Commerce">E-Commerce</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[13px] font-medium text-slate-300 mb-1.5">Company Size</label>
                          <select
                            name="size"
                            value={formData.size}
                            onChange={handleInputChange}
                            className="w-full truncate bg-white text-slate-900 rounded-lg px-4 py-2.5 text-[16px] md:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all border border-transparent cursor-pointer"
                          >
                            <option value="">Select Size</option>
                            <option value="1-50">1-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-1000">201-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[13px] font-medium text-slate-300 mb-1.5">
                            What's your biggest supply chain challenge? (Optional)
                          </label>
                          <textarea
                            name="challenge"
                            value={formData.challenge}
                            onChange={handleInputChange}
                            rows={2}
                            className="w-full bg-white text-slate-900 rounded-lg px-4 py-2.5 text-[16px] md:text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all border border-transparent resize-none"
                            placeholder="Tell us a bit about your current bottlenecks..."
                          />
                        </div>

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-blue-600 to-cyan-500 text-white font-bold py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-shadow mt-3"
                        >
                          Get My Free Consultation <ArrowRight className="w-5 h-5" />
                        </motion.button>

                        <p className="text-center text-[11px] text-slate-500 mt-4">No spam. We respect your privacy.</p>
                      </form>
                    </motion.div>
                  )}

                  {viewState === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center h-full w-full max-w-md mx-auto py-2"
                    >
                      {/* Happy, talking robot */}
                      <div className="relative mb-2 flex justify-center w-36 h-48 sm:w-40 sm:h-52 mx-auto">
                        <RobotMascot mood="happy" className="w-full h-full" />

                        <motion.div
                          initial={{ opacity: 0, scale: 0.7, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 0.7, type: 'spring', damping: 14 }}
                          className="absolute -top-8 sm:top-2 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-4 md:-right-14 bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded-2xl rounded-bl-none shadow-[0_4px_15px_rgba(0,0,0,0.25)] whitespace-nowrap z-30 flex items-center gap-2"
                        >
                          <span>Thanks! I'm already on it 🎉</span>

                        </motion.div>
                      </div>

                      <motion.h3
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="text-xl sm:text-2xl font-bold text-white mb-1"
                      >
                        Thank You!
                      </motion.h3>
                      <p className="text-slate-200 text-[14px] font-medium mb-1">Your consultation request has been received.</p>
                      <p className="text-slate-400 text-[12px] mb-4 px-2 leading-relaxed">
                        Our experts will review your information and get back to you within 24 hours.
                      </p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-full bg-[#1A2235] border border-slate-700/50 rounded-xl p-3 mb-4 text-left"
                      >
                        <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-700/50">
                          <h4 className="text-white font-semibold text-[13px]">What's Next?</h4>
                        </div>

                        <ul className="space-y-2">
                          {[
                            "We'll analyze your requirements",
                            'Match you with the right AI expert',
                            'Schedule your personalized consultation',
                          ].map((text, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + i * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="mt-0.5 w-4 h-4 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-2.5 h-2.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-slate-300 text-[12px]">{text}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleClose}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-shadow"
                      >
                        Close
                      </motion.button>
                    </motion.div>
                  )}

                  {viewState === 'exit-intent' && (
                    <motion.div
                      key="exit"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center text-center h-full w-full max-w-md mx-auto py-2"
                    >
                      {/* Sad / pleading robot */}
                      <div className="relative mb-2 flex justify-center w-36 h-48 sm:w-40 sm:h-52 mx-auto">
                        <RobotMascot mood="pleading" className="w-full h-full" />

                        <motion.div
                          initial={{ opacity: 0, scale: 0.7, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: 0.3, type: 'spring', damping: 14 }}
                          className="absolute -top-8 sm:top-2 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:-right-2 md:-right-8 bg-white text-slate-900 text-xs font-bold px-3 py-2 rounded-2xl rounded-bl-none shadow-[0_4px_15px_rgba(0,0,0,0.25)] whitespace-nowrap z-30 flex items-center gap-2"
                        >
                          <span>Aww, leaving already? 🥺</span>

                        </motion.div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Wait — Before You Go!</h3>
                      <p className="text-slate-300 text-[13px] mb-6 px-1 sm:px-2 leading-relaxed">
                        Get a free 15-minute AI readiness check instead? No form needed, just a quick chat.
                      </p>

                      <div className="flex flex-col w-full gap-3">
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 via-blue-600 to-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] transition-all relative overflow-hidden"
                          onClick={() => setViewState('form')}
                        >
                          <motion.div
                            animate={{ x: [-100, 300] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[30deg]"
                          />
                          Yes, Chat Now
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleClose}
                          className="flex-1 bg-transparent border border-slate-700 text-slate-300 font-bold py-3.5 rounded-xl hover:text-white transition-all"
                        >
                          No, Thanks
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}