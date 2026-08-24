import { useRef, useState, useEffect, useCallback } from "react";
import {
    TrendingUp, AlertTriangle, Radio, Eye, DollarSign,
    Megaphone, GitBranch, BarChart3, Cpu, ArrowRight,
} from "lucide-react";

import imgForecast from "../assets/agents/forecast.png";
import imgDeviation from "../assets/agents/deviation.png";
import imgMarketSignal from "../assets/agents/market_signal.png";
import imgCompetitor from "../assets/agents/competitor.png";
import imgPricing from "../assets/agents/pricing.png";
import imgPromotion from "../assets/agents/promotion.png";
import imgScenario from "../assets/agents/scenario.png";
import imgExecutive from "../assets/agents/executive.png";
import imgErp from "../assets/agents/erp.png";

const agents = [
    { name: "Forecast Agent", shortName: "Forecast", initial: "F", role: "Generates rolling demand forecasts with confidence intervals using time-series ML and seasonality analysis.", icon: TrendingUp, tag: "Predictive", hue: 210, image: imgForecast },
    { name: "Deviation Agent", shortName: "Deviation", initial: "D", role: "Monitors actuals vs. forecast 24/7, fires alerts the moment demand deviates and traces root cause.", icon: AlertTriangle, tag: "Real-time Alerts", hue: 30, image: imgDeviation },
    { name: "Market Signal Agent", shortName: "Market", initial: "M", role: "Ingests macro-economic indicators, social trends, and news sentiment to surface demand signals.", icon: Radio, tag: "External Signals", hue: 190, image: imgMarketSignal },
    { name: "Competitor Agent", shortName: "Competitor", initial: "C", role: "Tracks competitor pricing, stock availability, and promotional activity across channels.", icon: Eye, tag: "Competitive Intel", hue: 260, image: imgCompetitor },
    { name: "Pricing Agent", shortName: "Pricing", initial: "P", role: "Recommends optimal price points balancing elasticity, margins, and competitive positioning.", icon: DollarSign, tag: "Dynamic Pricing", hue: 150, image: imgPricing },
    { name: "Promotion Agent", shortName: "Promotion", initial: "Pr", role: "Simulates promotional uplift, cannibalization, and ROI before launch — tracks actuals live.", icon: Megaphone, tag: "ROI Tracking", hue: 340, image: imgPromotion },
    { name: "Scenario Agent", shortName: "Scenario", initial: "S", role: "Build unlimited what-if scenarios — supply disruptions, price changes — compare outcomes instantly.", icon: GitBranch, tag: "What-if Modeling", hue: 170, image: imgScenario },
    { name: "Executive Insight Agent", shortName: "Executive", initial: "E", role: "Synthesises data from all agents into executive briefings and KPI dashboards for the C-suite.", icon: BarChart3, tag: "C-Suite Ready", hue: 45, image: imgExecutive },
    { name: "ERP Action Agent", shortName: "ERP Action", initial: "A", role: "Converts AI recommendations into ERP transactions — purchase orders, production runs, stock transfers.", icon: Cpu, tag: "Auto-Execution", hue: 280, image: imgErp },
];

const COUNT = agents.length;
const SCROLL_PER_CARD = 350;

function AgentCard({ agent, offset }: { agent: (typeof agents)[number]; offset: number }) {
    const Icon = agent.icon;
    const absOff = Math.abs(offset);
    const isActive = absOff < 0.5;
    const translateY = offset * 120;
    const scale = Math.max(0.7, 1 - absOff * 0.15);
    const opacity = Math.max(0, 1 - absOff * 0.55);
    const blur = Math.min(absOff * 3.5, 8);

    return (
        <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: isActive ? "auto" : "none",
            zIndex: 10 - Math.round(absOff),
        }}>
            <div style={{
                width: "100%", maxWidth: "420px",
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity, filter: `blur(${blur}px)`,
                willChange: "transform, opacity, filter",
            }}>
                <div style={{
                    background: "#FFFFFF",
                    border: `1px solid ${isActive ? "rgba(37,99,235,0.4)" : "rgba(0,0,0,0.06)"}`,
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: isActive
                        ? "0 32px 80px rgba(13,27,42,0.12), 0 0 0 1px rgba(37,99,235,0.1)"
                        : "0 2px 8px rgba(13,27,42,0.04)",
                    transition: "border-color 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s cubic-bezier(0.23,1,0.32,1)",
                }}>
                    {/* Header */}
                    <div style={{
                        position: "relative", height: "160px", overflow: "hidden",
                    }}>
                        {/* Background image */}
                        <img
                            src={agent.image}
                            alt={agent.name}
                            style={{
                                position: "absolute", inset: 0,
                                width: "100%", height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        {/* Gradient overlay */}
                        <div style={{
                            position: "absolute", inset: 0,
                            background: `linear-gradient(135deg, hsla(${agent.hue},35%,18%,0.55), hsla(${agent.hue + 30},25%,12%,0.65)), linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)`,
                        }} />
                        {/* Icon badge */}
                        <div style={{
                            position: "absolute", bottom: "12px", left: "16px",
                            width: "36px", height: "36px", borderRadius: "10px",
                            background: "rgba(37,99,235,0.85)", backdropFilter: "blur(8px)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                        }}>
                            <Icon size={18} style={{ color: "#FFFFFF" }} />
                        </div>
                        <span style={{
                            position: "absolute", bottom: "16px", right: "16px",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "9px", color: "rgba(255,255,255,0.7)",
                            letterSpacing: "0.1em",
                            background: "rgba(0,0,0,0.3)",
                            backdropFilter: "blur(4px)",
                            borderRadius: "9999px",
                            padding: "4px 10px",
                        }}>
                            {agent.tag}
                        </span>
                    </div>

                    {/* Body */}
                    <div style={{ padding: "24px 28px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                            <h3 style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: "20px", color: "#0D1B2A", margin: 0,
                            }}>{agent.name}</h3>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <span className="active-dot" />
                                <span style={{
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "9px", letterSpacing: "0.1em",
                                    color: "#22C55E", textTransform: "uppercase", fontWeight: 600,
                                }}>Active</span>
                            </div>
                        </div>
                        <p style={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.7, margin: 0 }}>
                            {agent.role}
                        </p>
                    </div>

                    {/* Footer */}
                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "14px 28px", borderTop: "0.5px solid #E8E2D9",
                    }}>
                        <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "9px", color: "#2563EB",
                            background: "rgba(37,99,235,0.06)",
                            border: "0.5px solid rgba(37,99,235,0.15)",
                            borderRadius: "9999px", padding: "5px 14px",
                        }}>{agent.tag}</span>
                        <span style={{ color: "#2563EB", fontSize: "14px" }}>→</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AgentShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeFloat, setActiveFloat] = useState(0);

    const computeProgress = useCallback(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionScrollable = rect.height - window.innerHeight;
        if (sectionScrollable <= 0) return;
        setActiveFloat(Math.max(0, Math.min(1, -rect.top / sectionScrollable)) * (COUNT - 1));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", computeProgress, { passive: true });
        window.addEventListener("resize", computeProgress, { passive: true });
        computeProgress();
        return () => {
            window.removeEventListener("scroll", computeProgress);
            window.removeEventListener("resize", computeProgress);
        };
    }, [computeProgress]);

    const activeIndex = Math.max(0, Math.min(COUNT - 1, Math.round(activeFloat)));
    const totalHeight = SCROLL_PER_CARD * COUNT + window.innerHeight;

    return (
        <section ref={sectionRef} id="agents" style={{ position: "relative", height: `${totalHeight}px` }}>
            <div style={{
                position: "sticky", top: 0, height: "100vh",
                overflow: "hidden", background: "#F8FAFC",
                display: "flex",
            }}>
                {/* LEFT PANEL */}
                <div style={{
                    flex: "1 1 50%", display: "flex", flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 clamp(32px, 5vw, 80px)",
                }}>
                    <span className="eyebrow" style={{ marginBottom: '20px' }}>The 9 AI Agents</span>

                    <h2 style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                        color: "#0D1B2A", lineHeight: 1.1,
                        margin: "0 0 16px",
                    }}>
                        Your demand{" "}
                        <em style={{ color: "#2563EB", fontStyle: "italic" }}>intelligence team.</em>
                    </h2>

                    <p style={{
                        fontSize: "15px", color: "#6B7280", lineHeight: 1.7,
                        margin: "0 0 40px", maxWidth: "360px",
                    }}>
                        9 autonomous agents working in concert — scroll to explore each one.
                    </p>

                    {/* Progress ring + active agent */}
                    <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px" }}>
                        <svg viewBox="0 0 52 52" width="52" height="52">
                            <circle cx="26" cy="26" r="22" fill="none" stroke="rgba(37,99,235,0.1)" strokeWidth="2.5" />
                            <circle cx="26" cy="26" r="22" fill="none" stroke="#2563EB" strokeWidth="2.5"
                                strokeDasharray={`${2 * Math.PI * 22}`}
                                strokeDashoffset={`${2 * Math.PI * 22 * (1 - activeFloat / (COUNT - 1))}`}
                                strokeLinecap="round" transform="rotate(-90 26 26)" />
                            <text x="26" y="26" textAnchor="middle" dominantBaseline="central" style={{
                                fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fill: "#2563EB", fontWeight: 700,
                            }}>{activeIndex + 1}</text>
                        </svg>
                        <div>
                            <div style={{
                                fontFamily: "'DM Serif Display', serif",
                                fontSize: "17px", color: "#0D1B2A", marginBottom: "3px",
                            }}>{agents[activeIndex].name}</div>
                            <div style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "10px", letterSpacing: "0.08em",
                                color: "#9CA3AF", textTransform: "uppercase",
                            }}>Agent {activeIndex + 1} of {COUNT}</div>
                        </div>
                    </div>

                    {/* Dot indicator */}
                    <div style={{ display: "flex", gap: "5px", marginBottom: "40px" }}>
                        {agents.map((_, i) => (
                            <div key={i} style={{
                                width: i === activeIndex ? "24px" : "6px", height: "6px",
                                borderRadius: "9999px",
                                background: i === activeIndex ? "#2563EB" : "rgba(37,99,235,0.15)",
                                transition: "all 0.3s ease",
                            }} />
                        ))}
                    </div>

                    {/* CTA */}
                    <a href="#how-it-works" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                        See How They Work <ArrowRight size={16} />
                    </a>
                </div>

                {/* RIGHT PANEL */}
                <div style={{
                    flex: "1 1 50%", position: "relative",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    {/* Top/bottom fade */}
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "160px",
                        background: "linear-gradient(180deg, #F5F2ED, transparent)",
                        zIndex: 20, pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: "160px",
                        background: "linear-gradient(0deg, #F5F2ED, transparent)",
                        zIndex: 20, pointerEvents: "none",
                    }} />

                    {/* Card stack */}
                    <div style={{ position: "relative", width: "min(420px, 88%)", height: "440px" }}>
                        {agents.map((agent, i) => (
                            <AgentCard key={agent.name} agent={agent} offset={i - activeFloat} />
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    position: "absolute", bottom: "20px",
                    left: "clamp(24px, 4vw, 64px)", right: "clamp(24px, 4vw, 64px)",
                    display: "flex", flexWrap: "wrap",
                    alignItems: "center", justifyContent: "space-between",
                    padding: "18px 32px", borderRadius: "9999px",
                    background: "rgba(13,27,42,0.95)", backdropFilter: "blur(16px)",
                    gap: "12px", zIndex: 30,
                }}>
                    <p style={{
                        fontFamily: "'DM Serif Display', serif",
                        fontSize: "clamp(13px, 1.3vw, 16px)",
                        color: "#F5F0E8", margin: 0,
                    }}>
                        All 9 agents operate as one unified intelligence system.
                    </p>
                    <a href="#how-it-works" className="btn-primary" style={{ padding: "10px 24px", fontSize: "11px" }}>
                        Learn More <ArrowRight size={14} />
                    </a>
                </div>
            </div>
        </section>
    );
}