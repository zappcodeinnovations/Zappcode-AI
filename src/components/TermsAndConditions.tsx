import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, ChevronDown, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const SECTIONS = [
  { id: 'intro', title: 'Introduction', color: '#2563EB' },
  { id: 'website-use', title: 'Website Use', color: '#F97316' },
  { id: 'ip-rights', title: 'Intellectual Property Rights', color: '#0EA5E9' },
  { id: 'liability', title: 'Limitation of Liability', color: '#2563EB' },
  { id: 'external-links', title: 'External Links', color: '#F97316' },
  { id: 'privacy-policy', title: 'Privacy Policy', color: '#0EA5E9' },
  { id: 'contact-us', title: 'Contact Us', color: '#2563EB' },
  { id: 'changes', title: 'Changes to Terms', color: '#F97316' },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the top-most intersecting entry that is visible enough
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          // Sort by top position to find the highest visible section
          intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveSection(intersecting[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    const currentRefs = sectionRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // Account for fixed header + breathing room
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getSectionColor = (id: string) => SECTIONS.find(s => s.id === id)?.color || '#2563EB';

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-24 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 relative">

        {/* Mobile Dropdown Header */}
        <div className="md:hidden sticky top-20 z-40 bg-white/90 backdrop-blur-md shadow-sm border border-slate-200 rounded-xl px-4 py-3 mb-8">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between text-slate-800 font-semibold text-lg"
          >
            <span>Jump to Section</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3"
              >
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeSection === section.id ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                  >
                    {section.title}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LEFT COLUMN: Sticky Sidebar (Desktop) */}
        <aside className="hidden md:block w-1/4 flex-shrink-0 relative">
          <div className="sticky top-32 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-200 p-6">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-6 ml-4">Table of Contents</h3>
            <div className="relative flex flex-col space-y-1 border-l border-slate-100 ml-4">
              {SECTIONS.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`relative w-full text-left pl-5 py-2.5 text-[14.5px] transition-all duration-300 ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    {/* Active Line Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeSidebarLine"
                        className="absolute left-[-1px] top-0 bottom-0 w-[3px] rounded-r-full"
                        style={{ backgroundColor: section.color }}
                        initial={false}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Active Dot */}
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundColor: section.color }}
                      />
                      {section.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT COLUMN: Content */}
        <main className="w-full md:w-3/4 flex flex-col gap-12">

          {/* PAGE HEADER */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-slate-500 font-bold text-sm tracking-widest uppercase mb-4">
              <Scale className="w-5 h-5 text-blue-600" />
              <span>Legal</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Terms & Conditions</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-orange-400 rounded-full mb-6" />
            {/* <p className="text-slate-400 text-sm font-medium">Last updated: [Month Year]</p> */}
          </motion.div>

          {/* INTRO */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-[16px] md:text-[17px] text-slate-600 leading-[1.8] bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
          >
            Welcome to Zappkode Solutions! We are delighted to have you as a valued visitor to our website. Before you explore further, please take a moment to review the following Terms & Conditions ("Terms") that govern your use of our website.
            <br /><br />
            By accessing or using our website, you agree to abide by these Terms. If you do not agree with any part of these Terms, please refrain from using our website.
          </motion.p>

          <div className="flex flex-col gap-10">
            {/* SECTION 1 */}
            <motion.section
              id="intro"
              ref={(el) => { sectionRefs.current[0] = el; }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: getSectionColor('intro') }}
                animate={activeSection === 'intro' ? { opacity: [0.5, 1, 1], scaleY: [1, 1.05, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
              <h2 className="text-2xl md:text-[28px] font-bold text-[#1E293B] mb-6">Introduction</h2>
              <div className="space-y-6 text-[16px] text-[#4B5563] leading-[1.7]">
                <p>
                  Zappkode Solutions is committed to delivering innovative solutions tailored to meet the evolving needs of our diverse clientele. Our IT & Software development arm focuses on crafting cutting-edge applications and software products that empower businesses to thrive in today's digital landscape.
                </p>
              </div>
            </motion.section>

            {/* SECTION 2 */}
            <motion.section
              id="website-use"
              ref={(el) => { sectionRefs.current[1] = el; }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: getSectionColor('website-use') }}
                animate={activeSection === 'website-use' ? { opacity: [0.5, 1, 1], scaleY: [1, 1.05, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
              <h2 className="text-2xl md:text-[28px] font-bold text-[#1E293B] mb-6">Website Use</h2>
              <div className="text-[16px] text-[#4B5563] leading-[1.7]">
                <p>
                  By accessing our website, you agree to use it only for lawful purposes and in a manner consistent with all applicable laws and regulations. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
                </p>
              </div>
            </motion.section>

            {/* SECTION 3 */}
            <motion.section
              id="ip-rights"
              ref={(el) => { sectionRefs.current[2] = el; }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: getSectionColor('ip-rights') }}
                animate={activeSection === 'ip-rights' ? { opacity: [0.5, 1, 1], scaleY: [1, 1.05, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
              <h2 className="text-2xl md:text-[28px] font-bold text-[#1E293B] mb-6">Intellectual Property Rights</h2>
              <div className="text-[16px] text-[#4B5563] leading-[1.7]">
                <p>
                  All content, trademarks, and intellectual property displayed on our website are the property of Zappkode Solutions or its licensors. You may not use, reproduce, or distribute any content from our website without prior written consent.
                </p>
              </div>
            </motion.section>

            {/* SECTION 4 */}
            <motion.section
              id="liability"
              ref={(el) => { sectionRefs.current[3] = el; }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: getSectionColor('liability') }}
                animate={activeSection === 'liability' ? { opacity: [0.5, 1, 1], scaleY: [1, 1.05, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
              <h2 className="text-2xl md:text-[28px] font-bold text-[#1E293B] mb-6">Limitation of Liability</h2>
              <div className="text-[16px] text-[#4B5563] leading-[1.7]">
                <p>
                  Zappkode Solutions shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of our website.
                </p>
              </div>
            </motion.section>

            {/* SECTION 5 */}
            <motion.section
              id="external-links"
              ref={(el) => { sectionRefs.current[4] = el; }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: getSectionColor('external-links') }}
                animate={activeSection === 'external-links' ? { opacity: [0.5, 1, 1], scaleY: [1, 1.05, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
              <h2 className="text-2xl md:text-[28px] font-bold text-[#1E293B] mb-6">External Links</h2>
              <div className="text-[16px] text-[#4B5563] leading-[1.7]">
                <p>
                  Our website may contain links to third-party websites for your convenience. We do not endorse or make any representations about these websites, and we are not responsible for their content or availability.
                </p>
              </div>
            </motion.section>

            {/* SECTION 6 */}
            <motion.section
              id="privacy-policy"
              ref={(el) => { sectionRefs.current[5] = el; }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: getSectionColor('privacy-policy') }}
                animate={activeSection === 'privacy-policy' ? { opacity: [0.5, 1, 1], scaleY: [1, 1.05, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
              <h2 className="text-2xl md:text-[28px] font-bold text-[#1E293B] mb-6">Privacy Policy</h2>
              <div className="text-[16px] text-[#4B5563] leading-[1.7]">
                <p>
                  Your privacy is important to us. Please review our{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-[#F97316] font-semibold underline decoration-2 underline-offset-2 hover:text-[#c25a11] hover:decoration-[#c25a11] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  {' '}to understand how we collect, use, and protect your personal information.
                </p>
              </div>
            </motion.section>

            {/* SECTION 7 */}
            <motion.section
              id="contact-us"
              ref={(el) => { sectionRefs.current[6] = el; }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-[#EFF6FF] p-8 md:p-10 rounded-2xl shadow-sm border border-blue-100 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={activeSection === 'contact-us' ? { boxShadow: ['inset 0 0 0px rgba(59,130,246,0)', 'inset 0 0 20px rgba(59,130,246,0.3)', 'inset 0 0 0px rgba(59,130,246,0)'] } : {}}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: getSectionColor('contact-us') }}
              />
              <h2 className="text-2xl md:text-[28px] font-bold text-[#1E293B] mb-6">Contact Us</h2>
              <div className="text-[16px] text-[#4B5563] leading-[1.7]">
                <p className="mb-8">
                  If you have any questions or concerns about these Terms, please contact us.
                </p>
                <a
                  href="mailto:rashmi@zappkode.com"
                  className="inline-flex items-center gap-3 bg-white text-blue-600 px-6 py-3.5 rounded-full font-bold text-[15px] shadow-sm hover:shadow-md border border-blue-100 transition-all hover:-translate-y-[2px]"
                >
                  <Mail className="w-5 h-5" />
                  rashmi@zappkode.com
                </a>
              </div>
            </motion.section>

            {/* SECTION 8 */}
            <motion.section
              id="changes"
              ref={(el) => { sectionRefs.current[7] = el; }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 relative overflow-hidden"
            >
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: getSectionColor('changes') }}
                animate={activeSection === 'changes' ? { opacity: [0.5, 1, 1], scaleY: [1, 1.05, 1] } : { opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
              <h2 className="text-2xl md:text-[28px] font-bold text-[#1E293B] mb-6">Changes to Terms</h2>
              <div className="text-[16px] text-[#4B5563] leading-[1.7]">
                <p className="mb-6">
                  Zappkode Solutions reserves the right to update or modify these Terms at any time without prior notice. We encourage you to review these Terms periodically for any changes.
                </p>
                <p>
                  By continuing to use our website after any modifications to these Terms, you acknowledge and agree to the updated Terms.
                </p>
              </div>
            </motion.section>

          </div>

          {/* CLOSING LINE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="mt-12 text-center max-w-2xl mx-auto"
          >
            <p className="text-[17px] text-slate-500 italic">
              "Thank you for visiting Zappkode Innovations !!"
            </p>
          </motion.div>

        </main>
      </div>
    </div>
  );
}
