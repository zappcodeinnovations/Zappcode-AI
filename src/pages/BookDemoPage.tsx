import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, Plus, Minus, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Icons for steps
function StepIcon({ number, color }: { number: string, color: string }) {
    return (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`} style={{ backgroundColor: color }}>
            {number}
        </div>
    );
}

const faqs = [
    {
        q: "What happens after I book?",
        a: "We'll send you a calendar link to pick a 30-minute slot that works for you. You'll also receive a brief questionnaire to help us tailor the demo to your specific industry and challenges."
    },
    {
        q: "Is there any cost for the demo?",
        a: "No, the demo is completely free and comes with no commitment. We want to show you the value Zappcode can bring to your business."
    },
    {
        q: "Who should attend the demo?",
        a: "Typically, supply chain leaders, operations managers, IT directors, or anyone involved in demand forecasting and ERP integrations will get the most out of this session."
    }
];

export default function BookDemoPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        jobTitle: '',
        companySize: '',
        industry: '',
        phone: '',
        challenge: ''
    });
    
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/^\\S+@\\S+\\.\\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        if (!formData.company.trim()) newErrors.company = 'Company is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Simulate API call
            setTimeout(() => {
                setIsSubmitted(true);
            }, 500);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
            <Navbar />
            
            <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-[1300px] mx-auto w-full">
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    
                    {/* LEFT COLUMN (45%) */}
                    <div className="w-full lg:w-[45%] flex flex-col gap-10">
                        {/* Header */}
                        <div className="flex flex-col gap-4">
                            <motion.span 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="text-orange-500 font-bold text-sm tracking-wider uppercase"
                            >
                                BOOK YOUR DEMO
                            </motion.span>
                            
                            <motion.h1 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight"
                            >
                                See Zappcode AI in Action — Live, in 30 Minutes
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-slate-600 text-[17px] leading-relaxed"
                            >
                                No sales pitch. Just a real walkthrough of how our 9 AI agents can work for your business.
                            </motion.p>
                        </div>

                        {/* Steps */}
                        <div className="flex flex-col gap-6">
                            {[
                                { title: "A Quick Chat About Your Business", desc: "We'll understand your current challenges — inventory, forecasting, or supply chain gaps.", color: '#2563EB' },
                                { title: "Live Product Walkthrough", desc: "See the 9 AI agents in action with real scenarios relevant to your industry.", color: '#F97316' },
                                { title: "Your Custom Roadmap", desc: "Walk away with a clear plan — what Zappcode can do for you, and how fast you can get started.", color: '#06B6D4' }
                            ].map((step, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                                    className="flex items-start gap-4"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, delay: 0.4 + (i * 0.1) }}
                                    >
                                        <StepIcon number={String(i + 1)} color={step.color} />
                                    </motion.div>
                                    <div className="flex flex-col mt-0.5">
                                        <h4 className="font-bold text-slate-900 text-base">{step.title}</h4>
                                        <p className="text-slate-500 text-sm mt-1 leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-col sm:flex-row gap-4 py-6 border-y border-gray-200/60">
                            {["No commitment required", "30-minute session, on your schedule", "Tailored to your industry"].map((badge, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.6 + (i * 0.1) }}
                                    className="flex items-center gap-2 flex-1"
                                >
                                    <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                                    <span className="text-xs font-medium text-slate-600">{badge}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Proof */}
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="text-xs font-medium text-slate-400 uppercase tracking-widest leading-loose"
                        >
                            Trusted by teams across FMCG, Retail, Pharma, Manufacturing, and E-Commerce.
                        </motion.p>
                        
                        {/* FAQ */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            className="mt-4 flex flex-col gap-3"
                        >
                            <h3 className="font-bold text-slate-800 mb-2">Frequently Asked Questions</h3>
                            {faqs.map((faq, i) => (
                                <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                    <button 
                                        type="button"
                                        className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    >
                                        <span className="text-[14px]">{faq.q}</span>
                                        <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                                            {openFaq === i ? <Minus size={16} className="text-slate-400" /> : <Plus size={16} className="text-slate-400" />}
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-4 pb-4 text-sm text-slate-500 leading-relaxed overflow-hidden"
                                            >
                                                {faq.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN (55%) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="w-full lg:w-[55%]"
                    >
                        <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form 
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, filter: 'blur(4px)' }}
                                        transition={{ duration: 0.3 }}
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-5"
                                    >
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Book Your Free Demo</h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {/* Full Name */}
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-semibold text-slate-700">Full Name <span className="text-orange-500">*</span></label>
                                                <input 
                                                    type="text" 
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    className={`w-full bg-slate-50 border ${errors.name ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'} rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all`}
                                                    placeholder="John Doe"
                                                />
                                                {errors.name && <span className="text-xs text-red-500 font-medium">{errors.name}</span>}
                                            </div>

                                            {/* Work Email */}
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-semibold text-slate-700">Work Email <span className="text-orange-500">*</span></label>
                                                <input 
                                                    type="email" 
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                    className={`w-full bg-slate-50 border ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'} rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all`}
                                                    placeholder="john@company.com"
                                                />
                                                {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email}</span>}
                                            </div>

                                            {/* Company Name */}
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-semibold text-slate-700">Company Name <span className="text-orange-500">*</span></label>
                                                <input 
                                                    type="text" 
                                                    value={formData.company}
                                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                                    className={`w-full bg-slate-50 border ${errors.company ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100'} rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all`}
                                                    placeholder="Acme Corp"
                                                />
                                                {errors.company && <span className="text-xs text-red-500 font-medium">{errors.company}</span>}
                                            </div>

                                            {/* Job Title */}
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-semibold text-slate-700">Job Title</label>
                                                <input 
                                                    type="text" 
                                                    value={formData.jobTitle}
                                                    onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                                                    className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all"
                                                    placeholder="Supply Chain Director"
                                                />
                                            </div>
                                            
                                            {/* Company Size */}
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-semibold text-slate-700">Company Size</label>
                                                <div className="relative">
                                                    <select 
                                                        value={formData.companySize}
                                                        onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                                                        className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 transition-all appearance-none cursor-pointer"
                                                    >
                                                        <option value="" disabled>Select Size</option>
                                                        <option value="1-50">1-50 employees</option>
                                                        <option value="51-200">51-200 employees</option>
                                                        <option value="201-1000">201-1000 employees</option>
                                                        <option value="1000+">1000+ employees</option>
                                                    </select>
                                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                </div>
                                            </div>

                                            {/* Industry */}
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-sm font-semibold text-slate-700">Industry</label>
                                                <div className="relative">
                                                    <select 
                                                        value={formData.industry}
                                                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                                                        className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 transition-all appearance-none cursor-pointer"
                                                    >
                                                        <option value="" disabled>Select Industry</option>
                                                        <option value="Manufacturing">Manufacturing</option>
                                                        <option value="Retail">Retail</option>
                                                        <option value="Pharma">Pharma</option>
                                                        <option value="FMCG">FMCG</option>
                                                        <option value="E-Commerce">E-Commerce</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phone Number */}
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Phone Number (Optional)</label>
                                            <input 
                                                type="tel" 
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>

                                        {/* Biggest Challenge */}
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold text-slate-700">What's your biggest challenge? (Optional)</label>
                                            <textarea 
                                                value={formData.challenge}
                                                onChange={(e) => setFormData({...formData, challenge: e.target.value})}
                                                className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 transition-all min-h-[100px] resize-y"
                                                placeholder="Tell us what you're hoping to solve..."
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <button 
                                            type="submit"
                                            className="w-full bg-gradient-brand text-white font-bold text-[15px] py-4 rounded-xl mt-2 flex items-center justify-center gap-2 hover:opacity-95 hover:-translate-y-[1px] transition-all shadow-[0_4px_15px_rgba(37,99,235,0.3)]"
                                        >
                                            Book My Demo <Send size={16} />
                                        </button>
                                        
                                        <p className="text-center text-[11px] text-slate-400 font-medium">
                                            By submitting, you agree to be contacted by our team. We respect your privacy — no spam, ever.
                                        </p>
                                    </motion.form>
                                ) : (
                                    <motion.div 
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                                        className="flex flex-col items-center justify-center text-center py-16 px-4 h-full min-h-[500px]"
                                    >
                                        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-6 relative">
                                            <motion.svg 
                                                className="w-12 h-12 text-green-500" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <motion.path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth="3" 
                                                    d="M5 13l4 4L19 7" 
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: 1 }}
                                                    transition={{ duration: 0.6, delay: 0.2 }}
                                                />
                                            </motion.svg>
                                            
                                            {/* Confetti dots */}
                                            {[...Array(6)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                                    animate={{ 
                                                        opacity: [0, 1, 0], 
                                                        scale: [0, 1, 0],
                                                        x: (Math.random() - 0.5) * 100,
                                                        y: (Math.random() - 0.5) * 100
                                                    }}
                                                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                                    className="absolute w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: ['#2563EB', '#F97316', '#06B6D4', '#22C55E'][i % 4] }}
                                                />
                                            ))}
                                        </div>
                                        
                                        <h3 className="text-3xl font-bold text-slate-900 mb-3">You're All Set!</h3>
                                        <p className="text-slate-600 text-[16px] leading-relaxed mb-6 max-w-sm">
                                            We've received your request. Our team will reach out within 24 hours to schedule your personalized demo.
                                        </p>
                                        <p className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-lg">
                                            Check your inbox — a calendar invite is on its way.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                </div>
            </main>
            
            <Footer />
        </div>
    );
}
