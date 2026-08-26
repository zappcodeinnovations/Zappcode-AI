import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Home, User, LayoutGrid, Bot, ShieldCheck, ChevronDown } from 'lucide-react';
import logo from '../assets/navbar-logo.png';

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

    // {
    //     label: 'Resources', path: '/contact', isRouter: true, icon: FileText, hasDropdown: true,
    //     dropdownItems: [
    //         { label: 'Case Studies', path: '#', isRouter: false },
    //         { label: 'Documentation', path: '#', isRouter: false },
    //         { label: 'Webinars', path: '#', isRouter: false },
    //     ]
    // },
];


export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
                <div className="flex items-center justify-between px-6 md:px-12 py-3 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-500">

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
                                    <Icon size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                                    <span className="font-medium text-[14.5px]">{link.label}</span>
                                    {link.hasDropdown && <ChevronDown size={14} className="text-slate-400 ml-0.5 group-hover:text-blue-600 transition-colors" />}
                                </>
                            );

                            const className = "group flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200 cursor-pointer";

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
                                                <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 p-2 min-w-[220px] flex flex-col relative overflow-hidden">
                                                    {link.dropdownItems.map((item) => {
                                                        const DropdownItemContent = (
                                                            <div className="relative z-10 flex items-center justify-between w-full pl-2">
                                                                <span>{item.label}</span>
                                                            </div>
                                                        );

                                                        const itemClass = "group/item relative px-4 py-2.5 rounded-xl text-[14px] font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-300 hover:translate-x-1 overflow-hidden";

                                                        return item.isRouter ? (
                                                            <Link key={item.label} to={item.path} className={itemClass} onClick={() => setHoveredMenu(null)}>
                                                                <span className="absolute bottom-3 left-4 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover/item:w-3" />
                                                                {DropdownItemContent}
                                                            </Link>
                                                        ) : (
                                                            <a key={item.label} href={item.path} className={itemClass}>
                                                                <span className="absolute bottom-3 left-4 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover/item:w-3" />
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
                        <Link
                            to="/contact"
                            className="hidden sm:flex items-center gap-2 bg-gradient-brand text-white px-6 py-2.5 rounded-full font-bold text-[14.5px] hover:shadow-[0_4px_15px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all"
                        >
                            Get Started <ArrowRight size={16} />
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
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
                            className="absolute top-0 bottom-0 right-0 w-[85vw] max-w-[340px] bg-white shadow-2xl p-6 flex flex-col overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-10 mt-2">
                                <img src={logo} alt="Zappcode Logo" className="h-10 w-auto" style={{ transform: 'scale(1.5)', transformOrigin: 'left center' }} />
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
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
                                            className="flex items-center gap-4 text-lg font-bold text-slate-800 py-3.5"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                                                <Icon size={18} className="text-blue-600" />
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
                                        <div key={link.label} className="flex flex-col border-b border-gray-50">
                                            {mainLink}
                                            {link.hasDropdown && link.dropdownItems && (
                                                <div className="flex flex-col pl-14 pb-4 gap-3">
                                                    {link.dropdownItems.map(item => (
                                                        item.isRouter ? (
                                                            <Link key={item.label} to={item.path} onClick={() => setMobileOpen(false)} className="text-[15px] font-medium text-slate-600 hover:text-blue-600">
                                                                {item.label}
                                                            </Link>
                                                        ) : (
                                                            <a key={item.label} href={item.path} onClick={() => setMobileOpen(false)} className="text-[15px] font-medium text-slate-600 hover:text-blue-600">
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
                                <Link
                                    to="/contact"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full bg-gradient-brand text-white px-6 py-4 rounded-xl font-bold text-[15px] shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:-translate-y-0.5 transition-all"
                                >
                                    Get Started <ArrowRight size={20} />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
