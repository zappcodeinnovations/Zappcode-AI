import { Link } from 'react-router-dom';
import { LayoutGrid, Building2, BookOpen, Send, ShieldCheck, Lock, Euro, Globe, ChevronRight } from 'lucide-react';
import footerLogo from '../assets/footer-logo.png';

const socialIcons = [
  {
    label: 'LinkedIn',
    d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    label: 'X',
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.25 2.25h6.194l4.265 5.638L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z',
  },
  {
    label: 'YouTube',
    d: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
  {
    label: 'GitHub',
    d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22',
  },
];

const navColumns = [
  {
    title: 'Platform',
    icon: LayoutGrid,
    color: 'text-blue-600',
    links: [
      { label: 'Home', path: '/', isRouter: true },
      { label: 'Solution', path: '/#solution', isRouter: false },
      { label: 'How it Works', path: '/solution/how-it-works', isRouter: true },
      { label: 'Demand Forecasting', path: '/solution/demand-forecasting', isRouter: true },
      { label: 'ERP Integration', path: '/solution/erp-integration', isRouter: true },
      { label: 'Pricing', path: '#', isRouter: false },
    ],
  },
  {
    title: 'Company',
    icon: Building2,
    color: 'text-orange-500',
    links: [
      { label: 'About Us', path: '/about', isRouter: true },
      { label: 'Contact', path: '/contact', isRouter: true },
      { label: 'Blog', path: '#', isRouter: false },
      { label: 'Careers', path: '#', isRouter: false },
      { label: 'Privacy Policy', path: '#', isRouter: false },
      { label: 'Terms of Service', path: '#', isRouter: false },
    ],
  },
  {
    title: 'Resources',
    icon: BookOpen,
    color: 'text-purple-600',
    links: [
      { label: 'Agents', path: '/agents', isRouter: true },
      { label: 'Industries', path: '/#use-cases', isRouter: false },
      { label: 'Case Studies', path: '#', isRouter: false },
      { label: 'Documentation', path: '#', isRouter: false },
      { label: 'Webinars', path: '#', isRouter: false },
      { label: 'Help Center', path: '#', isRouter: false },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC] py-8 md:py-16 px-4 md:px-8 border-t border-gray-100">
      <div className="max-w-[1300px] mx-auto bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100">
        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_auto_auto_auto_380px] gap-12 lg:gap-10 pb-12 border-b border-gray-100">

          {/* Brand Section (Left) */}
          <div className="flex flex-col pr-4">
            <div className="flex items-center mb-6 md:mb-8">
              <img 
                src={footerLogo} 
                alt="Zappcode AI" 
                className="h-20 md:h-28 w-auto object-contain"
                style={{ transform: 'scale(1.4)', transformOrigin: 'left center' }}
              />
            </div>
            <h3 className="text-xl md:text-[22px] font-bold text-slate-900 mb-4 font-sans leading-snug">
              Demand intelligence,<br />driven by <span className="text-blue-600">AI.</span>
            </h3>
            <p className="text-slate-500 text-[15px] leading-[1.7] mb-8 max-w-[320px]">
              We help businesses predict, plan, and perform with our Decision Intelligence Platform powered by 9 AI Agents.
            </p>

            <div className="w-24 h-0.5 bg-gradient-to-r from-blue-500 to-orange-400 rounded-full mb-8" />

            <p className="font-caveat text-xl text-blue-600 mb-6 font-medium tracking-wide">
              Let's build the future together.
            </p>

            <div className="flex gap-3">
              {socialIcons.map(({ label, d }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-[10px] bg-white border border-gray-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
                >
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns (Middle) */}
          {navColumns.map((col) => {
            const Icon = col.icon;
            return (
              <div key={col.title} className="flex flex-col min-w-[130px]">
                <div className="flex items-center gap-2 mb-8">
                  <Icon className={`w-5 h-5 ${col.color}`} strokeWidth={2.5} />
                  <h4 className={`font-bold text-[16px] ${col.color}`}>{col.title}</h4>
                </div>
                <div className="flex flex-col gap-5">
                  {col.links.map((link) => (
                    <div key={link.label} className="group flex items-center justify-between cursor-pointer">
                      {link.isRouter ? (
                        <Link to={link.path} className="text-[14.5px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.path} className="text-[14.5px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                          {link.label}
                        </a>
                      )}
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Subscribe Card (Right) */}
          <div className="bg-[#FAF9FB] rounded-[1.5rem] p-7 md:p-9 flex flex-col border border-gray-100 shadow-sm relative overflow-hidden">
            {/* Placeholder for 3D graphic */}
            <div className="w-full h-32 mb-8 relative flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-60" />
              <div className="w-40 h-28 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-white flex items-end justify-around p-4 z-10">
                <div className="w-4 bg-blue-200 rounded-t-sm h-1/3" />
                <div className="w-4 bg-indigo-300 rounded-t-sm h-1/2" />
                <div className="w-4 bg-purple-400 rounded-t-sm h-3/4" />
                <div className="w-4 bg-orange-400 rounded-t-sm h-full" />
              </div>
              {/* Abstract floaters */}
              <div className="absolute w-6 h-6 bg-blue-400 rounded-md top-2 left-4 blur-[1px] opacity-40 rotate-12" />
              <div className="absolute w-8 h-8 bg-purple-400 rounded-full bottom-2 right-4 blur-[2px] opacity-30" />
            </div>

            <p className="text-slate-500 font-medium text-[15px] mb-1.5">AI moves fast.</p>
            <h4 className="text-slate-900 font-bold text-[22px] mb-4 tracking-tight">Stay ahead with Zappcode.</h4>
            <p className="text-slate-500 text-[14px] leading-relaxed mb-8">
              Get the latest updates, insights, and resources delivered to your inbox.
            </p>

            <div className="w-full flex flex-col gap-3 mt-auto">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-sans shadow-sm"
              />
              <button className="w-full bg-gradient-brand text-white rounded-xl px-4 py-3.5 text-[14px] font-bold flex items-center justify-center gap-2 hover:opacity-95 hover:-translate-y-[1px] transition-all shadow-[0_4px_15px_rgba(37,99,235,0.3)]">
                Subscribe <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-[13px] font-medium text-slate-500">
            <p>© 2026 Zappcode Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="hidden md:block w-px h-4 bg-gray-300" />
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800 transition-colors bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <Globe className="w-4 h-4" />
              <span>English (India)</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full border border-blue-100 bg-blue-50 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-bold text-slate-900">SOC 2</span>
                <span className="text-[12px] text-slate-500 font-medium">Compliant</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full border border-blue-100 bg-blue-50 flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-600" strokeWidth={2} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-bold text-slate-900">ISO 27001</span>
                <span className="text-[12px] text-slate-500 font-medium">Certified</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#0F172A] flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-yellow-400">
                  <Euro className="w-4 h-4" strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-bold text-slate-900">GDPR</span>
                <span className="text-[12px] text-slate-500 font-medium">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
