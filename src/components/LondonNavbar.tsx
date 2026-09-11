import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, Home, User, LayoutGrid, Bot, ShieldCheck, ChevronDown, Mail, Building, MessageSquare, Send, CheckCircle2, Sparkles, Phone, Briefcase, Calendar } from 'lucide-react';
import logo from '../assets/site-logo.png';

const navLinks = [
    { label: 'Home', path: '/', isRouter: true, icon: Home },
    { label: 'About', path: '/about', isRouter: true, icon: User },
    {
        label: 'Solution', path: '#', isRouter: false, icon: LayoutGrid, hasDropdown: true,
        dropdownItems: [
            { label: 'How it Works', path: '/solution/how-it-works', isRouter: true },
            { label: 'Demand Forecasting', path: '/solution/demand-forecasting', isRouter: true },
            { label: 'ERP Integration', path: '/solution/erp-integration', isRouter: true },
        ]
    },
    { label: 'Agents', path: '/agents', isRouter: true, icon: Bot },
    {
        label: 'Industries', path: '/#use-cases', isRouter: false, icon: ShieldCheck, hasDropdown: true,
        dropdownItems: [
            { label: 'Retail', path: '#', isRouter: false },
            { label: 'Manufacturing', path: '#', isRouter: false },
            { label: 'Logistics', path: '#', isRouter: false },
        ]
    },
];

export default function LondonNavbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        workEmail: '',
        contactNo: '',
        position: '',
        companyName: '',
        preferredDate: '',
        challenge: ''
    });

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

    useEffect(() => {
        const onScroll = () => {
            const currentScrollY = window.scrollY;

            setScrolled(currentScrollY > 10);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false); // Scrolling down -> hide
            } else if (currentScrollY < lastScrollY) {
                setIsVisible(true);  // Scrolling up -> show
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [lastScrollY]);

    return (
        <>
            <nav className="fixed z-50 top-0 left-0 right-0 w-full" style={{
                transform: `translateY(${isVisible ? '0' : '-100%'})`,
                transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
            }}>
                <div className="flex items-center justify-between px-6 md:px-12 py-3 bg-black/40 backdrop-blur-xl border-b border-white/10 shadow-sm transition-all duration-500">

                    {/* Logo */}
                    <Link to="/" className="flex items-center shrink-0 mr-[60px] md:mr-[120px]">
                        <img
                            src={logo}
                            alt="Zappcode Logo"
                            className="h-7 md:h-[30px] w-auto object-contain transition-transform duration-300"
                            style={{
                                transform: 'scale(2.2)',
                                transformOrigin: 'left center'
                            }}
                        />
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isDropdownOpen = hoveredMenu === link.label;
                            const content = (
                                <>
                                    <Icon size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                                    <span className="font-medium text-[14.5px]">{link.label}</span>
                                    {link.hasDropdown && <ChevronDown size={14} className="text-slate-400 ml-0.5 group-hover:text-white transition-colors" />}
                                </>
                            );

                            const className = "group flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer";

                            return (
                                <div key={link.label} className="relative group/dropdown" onMouseEnter={() => setHoveredMenu(link.label)} onMouseLeave={() => setHoveredMenu(null)}>
                                    {link.isRouter ? (
                                        <Link to={link.path} className={className}>
                                            {content}
                                        </Link>
                                    ) : (
                                        <a href={link.path} className={className}>
                                            {content}
                                        </a>
                                    )}

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {link.hasDropdown && link.dropdownItems && isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                                            >
                                                <div className="bg-[#0F172A]/90 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 p-2 min-w-[220px] flex flex-col relative overflow-hidden">
                                                    {link.dropdownItems.map((item) => {
                                                        const DropdownItemContent = (
                                                            <div className="relative z-10 flex items-center justify-between w-full pl-2">
                                                                <span>{item.label}</span>
                                                            </div>
                                                        );

                                                        const itemClass = "group/item relative px-4 py-2.5 rounded-xl text-[14px] font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 hover:translate-x-1 overflow-hidden";

                                                        return item.isRouter ? (
                                                            <Link key={item.label} to={item.path} className={itemClass} onClick={() => setHoveredMenu(null)}>
                                                                <span className="absolute bottom-3 left-4 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover/item:w-3" />
                                                                {DropdownItemContent}
                                                            </Link>
                                                        ) : (
                                                            <a key={item.label} href={item.path} className={itemClass}>
                                                                <span className="absolute bottom-3 left-4 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover/item:w-3" />
                                                                {DropdownItemContent}
                                                            </a>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-4 shrink-0">
                        <button
                            onClick={() => setIsContactModalOpen(true)}
                            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#7A2BF7] via-[#D83A9C] to-[#FF5E3A] hover:from-[#8B3FF8] hover:to-[#FF6E4A] text-white px-6 py-2.5 rounded-full font-bold text-[14.5px] shadow-[0_0_20px_rgba(216,58,156,0.4)] hover:shadow-[0_0_25px_rgba(255,94,58,0.5)] hover:scale-105 transition-all"
                        >
                            Contact Us
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Sidebar */}
            <AnimatePresence>
                {mobileOpen && (
                    <div className="fixed inset-0 z-[60] lg:hidden" onClick={() => setMobileOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute top-0 bottom-0 right-0 w-[85vw] max-w-[340px] bg-[#0F172A] border-l border-white/10 shadow-2xl p-6 flex flex-col overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-10 mt-2">
                                <img src={logo} alt="Zappcode Logo" className="h-10 w-auto" style={{ transform: 'scale(1.5)', transformOrigin: 'left center' }} />
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-2 mb-8 flex-1">
                                {navLinks.map((link, i) => {
                                    const Icon = link.icon;
                                    const content = (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + (i * 0.05) }}
                                            className="flex items-center gap-4 text-lg font-bold text-white py-3.5"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                                <Icon size={18} className="text-orange-400" />
                                            </div>
                                            <span>{link.label}</span>
                                        </motion.div>
                                    );

                                    const mainLink = link.isRouter ? (
                                        <Link key={link.label} to={link.path} onClick={() => setMobileOpen(false)}>
                                            {content}
                                        </Link>
                                    ) : (
                                        <a key={link.label} href={link.path} onClick={() => setMobileOpen(false)}>
                                            {content}
                                        </a>
                                    );

                                    return (
                                        <div key={link.label} className="flex flex-col border-b border-white/5">
                                            {mainLink}
                                            {link.hasDropdown && link.dropdownItems && (
                                                <div className="flex flex-col pl-14 pb-4 gap-3">
                                                    {link.dropdownItems.map(item => (
                                                        item.isRouter ? (
                                                            <Link key={item.label} to={item.path} onClick={() => setMobileOpen(false)} className="text-[15px] font-medium text-slate-400 hover:text-white">
                                                                {item.label}
                                                            </Link>
                                                        ) : (
                                                            <a key={item.label} href={item.path} onClick={() => setMobileOpen(false)} className="text-[15px] font-medium text-slate-400 hover:text-white">
                                                                {item.label}
                                                            </a>
                                                        )
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-auto pt-6"
                            >
                                <button
                                    onClick={() => {
                                        setMobileOpen(false);
                                        setIsContactModalOpen(true);
                                    }}
                                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#7A2BF7] via-[#D83A9C] to-[#FF5E3A] text-white px-6 py-4 rounded-xl font-bold text-[15px] shadow-[0_8px_20px_rgba(216,58,156,0.35)] hover:scale-105 transition-all"
                                >
                                    Contact Us
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Popup Contact Form Modal */}
            <AnimatePresence>
                {isContactModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setIsContactModalOpen(false)}
                        />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full max-w-[540px] bg-[#0B1120] border border-cyan-500/40 rounded-[32px] p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] backdrop-blur-2xl z-10 overflow-hidden my-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Top ambient glowing line */}
                            <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

                            {/* Close Button */}
                            <button
                                onClick={() => setIsContactModalOpen(false)}
                                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/15 transition-all"
                            >
                                <X size={18} />
                            </button>

                            <div className="mb-6">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold tracking-wider mb-3">
                                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> CONTACT US
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                    Get in Touch with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">Our Team</span>
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Fill in your details below and our team will get back to you within 24 hours.
                                </p>
                            </div>

                            {formSubmitted ? (
                                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center my-4">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                                    <h4 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h4>
                                    <p className="text-slate-300 text-sm mb-6">
                                        Thank you for reaching out. We will review your inquiry and get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setFormSubmitted(false);
                                            setIsContactModalOpen(false);
                                        }}
                                        className="px-6 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-sm font-bold hover:bg-emerald-500/30 transition-all"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                                                Full Name <span className="text-pink-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    placeholder="e.g. John Smith"
                                                    className="w-full bg-[#0F172A] border border-cyan-500/30 rounded-xl py-2.5 pl-10 pr-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                                                Work Email <span className="text-pink-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <Mail className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.workEmail}
                                                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                                                    placeholder="john@company.co.uk"
                                                    className="w-full bg-[#0F172A] border border-cyan-500/30 rounded-xl py-2.5 pl-10 pr-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                                                Contact No <span className="text-pink-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <Phone className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="tel"
                                                    required
                                                    value={formData.contactNo}
                                                    onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                                                    placeholder="+44 7123 456789"
                                                    className="w-full bg-[#0F172A] border border-cyan-500/30 rounded-xl py-2.5 pl-10 pr-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                                                Position / Role <span className="text-slate-400 lowercase font-normal">(optional)</span>
                                            </label>
                                            <div className="relative">
                                                <Briefcase className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    value={formData.position}
                                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                    placeholder="e.g. Operations Director"
                                                    className="w-full bg-[#0F172A] border border-cyan-500/30 rounded-xl py-2.5 pl-10 pr-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-500"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                                                Company Name <span className="text-pink-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <Building className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.companyName}
                                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                    placeholder="e.g. Acme Retail UK"
                                                    className="w-full bg-[#0F172A] border border-cyan-500/30 rounded-xl py-2.5 pl-10 pr-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-500"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                                                Preferred Date <span className="text-slate-400 lowercase font-normal">(optional)</span>
                                            </label>
                                            <div className="relative">
                                                <Calendar className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="date"
                                                    value={formData.preferredDate}
                                                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                                    className="w-full bg-[#0F172A] border border-cyan-500/30 rounded-xl py-2.5 pl-10 pr-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-500 [color-scheme:dark]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1">
                                            How can we help? <span className="text-slate-400 lowercase font-normal">(optional)</span>
                                        </label>
                                        <div className="relative">
                                            <MessageSquare className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
                                            <textarea
                                                rows={2}
                                                value={formData.challenge}
                                                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                                placeholder="Tell us about your requirements..."
                                                className="w-full bg-[#0F172A] border border-cyan-500/30 rounded-xl py-2 pl-10 pr-3 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all placeholder:text-slate-500 resize-none"
                                            />
                                        </div>
                                    </div>

                                    {submitError && (
                                        <p className="text-pink-400 text-xs text-center font-semibold mb-2">{submitError}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full mt-2 inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-bold text-white bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-full shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02] group text-center disabled:opacity-50 disabled:cursor-not-allowed"
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
                                            <>Send Message <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </button>

                                    <div className="mt-4 flex items-center justify-center gap-4 text-slate-400 text-xs font-medium pt-2">
                                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 24-Hr Response</span>
                                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> 100% Secure</span>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
