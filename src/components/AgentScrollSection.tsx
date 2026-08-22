import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────
   Agent data
───────────────────────────────────────────── */
export const agents = [
  {
    name: 'Forecast Agent',
    tag: 'Forecasting',

    bullets: [
      'Predicts demand 30 days ahead using multi-variate ML models',
      'Incorporates seasonality, promotions, and external signals',
      'Auto-retrains on fresh data every 6 hours',
      'Confidence intervals surfaced for every SKU/region pair',
    ],
    metrics: ['95% Accuracy', '30-day Horizon', 'Real-time Updates'],
  },
  {
    name: 'Deviation Agent',
    tag: 'Risk',

    bullets: [
      'Detects anomalous demand spikes and drops within minutes',
      'Scores severity across 5 tiers — from noise to critical alert',
      'Root-cause attribution links anomalies to causal events',
      'Suppresses false positives using contextual override rules',
    ],
    metrics: ['<3 min Detection', '5-tier Severity', '0.2% False-positive Rate'],
  },
  {
    name: 'Market Signal Agent',
    tag: 'Market',

    bullets: [
      'Ingests 200+ external signals: weather, events, macro data',
      'Maps external shifts to SKU-level demand impact estimates',
      'Rates signal relevance per category using embedding similarity',
      'Feeds enriched context to Forecast and Deviation agents',
    ],
    metrics: ['200+ Signal Sources', 'Daily Refresh', 'SKU-level Mapping'],
  },
  {
    name: 'Competitor Agent',
    tag: 'Intelligence',

    bullets: [
      'Tracks competitor pricing, promotions, and stock-outs in real time',
      'Benchmarks your position across dimensions: price, availability, velocity',
      'Triggers repricing suggestions when gaps exceed thresholds',
      'Stores historical competitor moves for trend analysis',
    ],
    metrics: ['Real-time Tracking', '50+ Competitors', 'Automated Alerts'],
  },
  {
    name: 'Pricing Agent',
    tag: 'Pricing',

    bullets: [
      'Recommends optimal price points using demand elasticity curves',
      'Balances margin targets against competitive positioning rules',
      'Runs A/B price experiments with statistical significance checks',
      'Pushes approved prices directly to ERP or e-commerce platforms',
    ],
    metrics: ['12% Avg Margin Lift', 'Elasticity Modelling', 'Auto-push to ERP'],
  },
  {
    name: 'Promotion Agent',
    tag: 'Growth',

    bullets: [
      'Evaluates ROI of past and planned promotions at granular level',
      'Forecasts incremental lift vs. baseline demand per deal type',
      'Detects cannibalization and forward-buy effects automatically',
      'Recommends optimal timing, depth, and mechanic per SKU cluster',
    ],
    metrics: ['Lift vs Baseline', 'Cannibalization Detection', 'Calendar Optimizer'],
  },
  {
    name: 'Scenario Agent',
    tag: 'Simulation',

    bullets: [
      'Simulates "what-if" supply disruptions, demand surges, and price changes',
      'Generates P10/P50/P90 outcome distributions for each scenario',
      'Stress-tests inventory and replenishment plans before execution',
      'Exports scenario reports to Slack, email, or BI dashboards',
    ],
    metrics: ['Unlimited Scenarios', 'P10/P50/P90 Outputs', 'BI Integration'],
  },
  {
    name: 'Executive Insight Agent',
    tag: 'Strategy',

    bullets: [
      'Surfaces C-suite KPIs: revenue risk, fill-rate, working capital exposure',
      'Auto-generates weekly narrative digests from raw data signals',
      'Highlights decisions that require human escalation with context',
      'Learns which insights each executive acts on and improves targeting',
    ],
    metrics: ['Weekly Digest', 'Decision Escalation', 'Role-aware Insights'],
  },
  {
    name: 'ERP Action Agent',
    tag: 'Automation',

    bullets: [
      'Translates AI recommendations into purchase orders and transfers',
      'Validates actions against business rules before write-back',
      'Supports SAP, Oracle, Microsoft Dynamics, and custom ERPs',
      'Full audit trail: every automated action logged with reasoning',
    ],
    metrics: ['SAP / Oracle / D365', 'Rule-validated Writes', 'Full Audit Trail'],
  },
];

/* ─────────────────────────────────────────────
   SVG Visuals — one per agent
───────────────────────────────────────────── */
function ForecastVisual() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ maxHeight: 280 }}>
      <defs>
        <linearGradient id="fg-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="fg-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[60, 120, 180, 240].map(y => (
        <line key={y} x1="30" y1={y} x2="380" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      {/* Area fill */}
      <path
        d="M30,200 C70,180 110,150 150,130 C190,110 230,140 270,100 C310,60 340,80 380,50 L380,260 L30,260 Z"
        fill="url(#fg-fill)"
      />
      {/* Main line */}
      <path
        d="M30,200 C70,180 110,150 150,130 C190,110 230,140 270,100 C310,60 340,80 380,50"
        fill="none"
        stroke="url(#fg-line)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Forecast dotted extension */}
      <path
        d="M380,50 C395,35 410,25 430,20"
        fill="none"
        stroke="#EC4899"
        strokeWidth="2"
        strokeDasharray="5 4"
        strokeLinecap="round"
      />
      {/* Data points */}
      {[[150, 130], [270, 100], [380, 50]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#06B6D4" stroke="#050505" strokeWidth="2" />
      ))}
      {/* Confidence band */}
      <path
        d="M270,80 C310,40 340,60 380,30 L380,70 C340,100 310,80 270,120 Z"
        fill="rgba(236,72,153,0.08)"
      />
      <text x="30" y="285" fill="#444" fontSize="11" fontFamily="monospace">HISTORICAL</text>
      <text x="310" y="285" fill="#EC4899" fontSize="11" fontFamily="monospace">FORECAST</text>
    </svg>
  );
}

function DeviationVisual() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ maxHeight: 280 }}>
      <defs>
        <linearGradient id="dv-spike" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {[80, 140, 200, 260].map(y => (
        <line key={y} x1="20" y1={y} x2="390" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {/* Baseline flat signal */}
      <path
        d="M20,190 C50,188 80,192 110,190 C130,189 150,191 170,190 C200,189 210,188 220,188"
        fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.6"
      />
      {/* Anomaly spike */}
      <path
        d="M220,188 L235,130 L248,60 L260,130 L275,188"
        fill="none" stroke="url(#dv-spike)" strokeWidth="3" strokeLinejoin="round"
      />
      {/* Fill spike */}
      <path
        d="M220,188 L235,130 L248,60 L260,130 L275,188 L380,190 L220,190 Z"
        fill="rgba(236,72,153,0.07)"
      />
      {/* Post-spike continuation */}
      <path
        d="M275,188 C310,189 350,191 390,190"
        fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.6"
      />
      {/* Alert marker */}
      <circle cx="248" cy="60" r="8" fill="rgba(236,72,153,0.2)" stroke="#EC4899" strokeWidth="2" />
      <text x="244" y="65" fill="#EC4899" fontSize="10" fontWeight="bold">!</text>
      {/* Alert label */}
      <rect x="265" y="45" width="90" height="22" rx="4" fill="rgba(236,72,153,0.12)" stroke="rgba(236,72,153,0.3)" strokeWidth="1" />
      <text x="272" y="60" fill="#EC4899" fontSize="11" fontFamily="monospace">ANOMALY +3σ</text>
    </svg>
  );
}

function MarketSignalVisual() {
  const rings = [80, 60, 40, 20];
  const cx = 200, cy = 150;
  const points = [
    [cx, cy - 75], [cx + 65, cy - 37], [cx + 65, cy + 37],
    [cx, cy + 75], [cx - 65, cy + 37], [cx - 65, cy - 37],
  ];
  const polyPts = points.map(p => p.join(',')).join(' ');
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ maxHeight: 280 }}>
      <defs>
        <linearGradient id="ms-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {rings.map(r => (
        <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}
      {points.map(([x, y], i) => (
        <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      <polygon points={polyPts} fill="url(#ms-fill)" stroke="#06B6D4" strokeWidth="1.5" opacity="0.8" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#06B6D4" />
      ))}
      {[['Weather', 30, 60], ['Events', 350, 60], ['Macro', 370, 170], ['Social', 340, 250], ['Prices', 60, 250], ['Supply', 30, 170]].map(([label, x, y]) => (
        <text key={label as string} x={x as number} y={y as number} fill="#555" fontSize="11" fontFamily="monospace" textAnchor="middle">{label}</text>
      ))}
      <circle cx={cx} cy={cy} r="6" fill="#EC4899" />
    </svg>
  );
}

function CompetitorVisual() {
  const nodes = [
    { cx: 200, cy: 150, r: 10, col: '#06B6D4', label: 'YOU' },
    { cx: 120, cy: 80, r: 7, col: '#EC4899', label: 'C1' },
    { cx: 300, cy: 90, r: 7, col: '#EC4899', label: 'C2' },
    { cx: 80, cy: 190, r: 6, col: '#7C3AED', label: 'C3' },
    { cx: 330, cy: 200, r: 6, col: '#7C3AED', label: 'C4' },
    { cx: 180, cy: 250, r: 5, col: '#EC4899', label: 'C5' },
    { cx: 260, cy: 240, r: 5, col: '#7C3AED', label: 'C6' },
  ];
  const edges = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [3, 5]];
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ maxHeight: 280 }}>
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(255,255,255,0.08)" strokeWidth="1.5"
        />
      ))}
      {nodes.map(({ cx, cy, r, col, label }) => (
        <g key={label}>
          <circle cx={cx} cy={cy} r={r + 4} fill={col} opacity="0.1" />
          <circle cx={cx} cy={cy} r={r} fill={col} />
          <text x={cx} y={cy + r + 13} fill="#555" fontSize="10" fontFamily="monospace" textAnchor="middle">{label}</text>
        </g>
      ))}
      <rect x="130" y="110" width="60" height="22" rx="4" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
      <text x="160" y="125" fill="#06B6D4" fontSize="10" fontFamily="monospace" textAnchor="middle">TRACKING</text>
    </svg>
  );
}

function PricingVisual() {
  const bars = [
    { x: 40, h: 90, col: '#06B6D4' },
    { x: 90, h: 130, col: '#06B6D4' },
    { x: 140, h: 100, col: '#7C3AED' },
    { x: 190, h: 160, col: '#06B6D4' },
    { x: 240, h: 120, col: '#EC4899' },
    { x: 290, h: 180, col: '#06B6D4' },
    { x: 340, h: 145, col: '#06B6D4' },
  ];
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ maxHeight: 280 }}>
      <defs>
        <linearGradient id="pr-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {[100, 150, 200, 250].map(y => (
        <line key={y} x1="20" y1={y} x2="390" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {bars.map(({ x, h, col }) => (
        <g key={x}>
          <rect x={x} y={260 - h} width="35" height={h} rx="3"
            fill={col} opacity="0.7" />
          <rect x={x} y={260 - h} width="35" height="4" rx="2" fill={col} />
        </g>
      ))}
      {/* Optimal price line */}
      <line x1="20" y1="140" x2="390" y2="140" stroke="#EC4899" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x="25" y="135" fill="#EC4899" fontSize="11" fontFamily="monospace">OPTIMAL</text>
    </svg>
  );
}

function PromotionVisual() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ maxHeight: 280 }}>
      <defs>
        <linearGradient id="pm-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pm-lift" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[80, 140, 200, 250].map(y => (
        <line key={y} x1="20" y1={y} x2="390" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {/* Baseline */}
      <path d="M20,210 C80,205 140,200 200,195 C260,190 320,195 390,190"
        fill="none" stroke="#06B6D4" strokeWidth="2" opacity="0.5" />
      {/* Promo lift */}
      <path d="M140,195 C160,170 175,120 190,100 C205,80 215,100 230,140 C245,170 260,185 280,190"
        fill="none" stroke="#EC4899" strokeWidth="2.5" />
      <path d="M140,195 C160,170 175,120 190,100 C205,80 215,100 230,140 C245,170 260,185 280,190 L280,210 L140,210 Z"
        fill="url(#pm-lift)" />
      {/* Promo markers */}
      <rect x="138" y="195" width="2" height="65" fill="#7C3AED" />
      <rect x="278" y="190" width="2" height="70" fill="#7C3AED" />
      <rect x="140" y="255" width="140" height="16" rx="3" fill="rgba(124,58,237,0.15)" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
      <text x="210" y="267" fill="#A78BFA" fontSize="10" fontFamily="monospace" textAnchor="middle">PROMO WINDOW</text>
      <text x="185" y="95" fill="#EC4899" fontSize="12" fontFamily="monospace">+34% LIFT</text>
    </svg>
  );
}

function ScenarioVisual() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ maxHeight: 280 }}>
      {/* Root */}
      <circle cx="60" cy="150" r="8" fill="#06B6D4" />
      <text x="20" y="175" fill="#555" fontSize="10" fontFamily="monospace">BASE</text>
      {/* Branch lines */}
      <line x1="68" y1="150" x2="160" y2="80" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
      <line x1="68" y1="150" x2="160" y2="150" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
      <line x1="68" y1="150" x2="160" y2="220" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" />
      {/* Mid nodes */}
      {[[160, 80], [160, 150], [160, 220]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="7" fill={['#EC4899', '#06B6D4', '#7C3AED'][i]} />
      ))}
      {/* Sub-branches */}
      {[[160, 80, 270, 50], [160, 80, 270, 100], [160, 150, 270, 135], [160, 150, 270, 165], [160, 220, 270, 200], [160, 220, 270, 240]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      ))}
      {/* End nodes */}
      {[[270, 50, '#EC4899', 'P90'], [270, 100, '#EC4899', 'P50'], [270, 135, '#06B6D4', 'P50'], [270, 165, '#06B6D4', 'P10'], [270, 200, '#7C3AED', 'P50'], [270, 240, '#7C3AED', 'P10']].map(([cx, cy, col, label], i) => (
        <g key={i}>
          <circle cx={cx as number} cy={cy as number} r="5" fill={col as string} opacity="0.8" />
          <text x={(cx as number) + 10} y={(cy as number) + 4} fill="#555" fontSize="10" fontFamily="monospace">{label as string}</text>
        </g>
      ))}
      <text x="155" y="68" fill="#EC4899" fontSize="10" fontFamily="monospace">BULL</text>
      <text x="155" y="138" fill="#06B6D4" fontSize="10" fontFamily="monospace">BASE</text>
      <text x="155" y="212" fill="#A78BFA" fontSize="10" fontFamily="monospace">BEAR</text>
    </svg>
  );
}

function ExecutiveVisual() {
  const kpis = [
    { x: 30, y: 40, w: 155, h: 90, label: 'Revenue Risk', val: '$2.4M', col: '#EC4899' },
    { x: 215, y: 40, w: 155, h: 90, label: 'Fill Rate', val: '96.3%', col: '#06B6D4' },
    { x: 30, y: 155, w: 155, h: 90, label: 'Working Capital', val: '$8.1M', col: '#7C3AED' },
    { x: 215, y: 155, w: 155, h: 90, label: 'Decisions Due', val: '7', col: '#EC4899' },
  ];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" style={{ maxHeight: 280 }}>
      {kpis.map(({ x, y, w, h, label, val, col }) => (
        <g key={label}>
          <rect rx="8" x={x} y={y} width={w} height={h}
            fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <text x={x + 14} y={y + 22} fill="#444" fontSize="11" fontFamily="monospace">{label}</text>
          <text x={x + 14} y={y + 60} fill={col} fontSize="28" fontWeight="bold" fontFamily="monospace">{val}</text>
          <rect x={x + 14} y={y + 72} width={w - 28} height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
          <rect x={x + 14} y={y + 72} width={(w - 28) * 0.7} height="3" rx="1.5" fill={col} opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

function ERPVisual() {
  const gears = [
    { cx: 140, cy: 150, r: 55, teeth: 10, col: '#06B6D4' },
    { cx: 260, cy: 150, r: 38, teeth: 8, col: '#7C3AED' },
  ];
  function gearPath(cx: number, cy: number, r: number, teeth: number) {
    const inner = r * 0.72, tooth = r * 0.2;
    let d = '';
    for (let i = 0; i < teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2 - Math.PI / teeth / 2;
      const a2 = a1 + Math.PI / teeth / 2;
      const a3 = a1 + Math.PI / teeth;
      const a4 = a1 + Math.PI / teeth * 1.5;
      d += `${i === 0 ? 'M' : 'L'}${(cx + (r + tooth) * Math.cos(a1)).toFixed(1)},${(cy + (r + tooth) * Math.sin(a1)).toFixed(1)} `;
      d += `L${(cx + (r + tooth) * Math.cos(a2)).toFixed(1)},${(cy + (r + tooth) * Math.sin(a2)).toFixed(1)} `;
      d += `L${(cx + r * Math.cos(a3)).toFixed(1)},${(cy + r * Math.sin(a3)).toFixed(1)} `;
      d += `L${(cx + inner * Math.cos(a4)).toFixed(1)},${(cy + inner * Math.sin(a4)).toFixed(1)} `;
    }
    return d + 'Z';
  }
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" style={{ maxHeight: 280 }}>
      {gears.map(({ cx, cy, r, teeth, col }) => (
        <g key={cx}>
          <path d={gearPath(cx, cy, r, teeth)} fill={col} opacity="0.15" stroke={col} strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r={r * 0.3} fill="none" stroke={col} strokeWidth="1.5" opacity="0.6" />
          <circle cx={cx} cy={cy} r="4" fill={col} />
        </g>
      ))}
      {/* Circuit traces */}
      {[[30, 150, 85, 150], [315, 150, 360, 150], [200, 80, 200, 60], [200, 60, 340, 60], [340, 60, 340, 110]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(6,182,212,0.3)" strokeWidth="1.5" />
      ))}
      {[[30, 150], [360, 150], [340, 110]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4" fill="#06B6D4" opacity="0.7" />
      ))}
      <text x="155" y="270" fill="#06B6D4" fontSize="12" fontFamily="monospace" textAnchor="middle">SAP</text>
      <text x="250" y="270" fill="#7C3AED" fontSize="12" fontFamily="monospace" textAnchor="middle">ORACLE</text>
      <text x="340" y="270" fill="#06B6D4" fontSize="12" fontFamily="monospace" textAnchor="middle">D365</text>
    </svg>
  );
}

export const visuals = [
  ForecastVisual, DeviationVisual, MarketSignalVisual, CompetitorVisual,
  PricingVisual, PromotionVisual, ScenarioVisual, ExecutiveVisual, ERPVisual,
];

/* ─────────────────────────────────────────────
   PulseDot (reused from AgentsSection)
───────────────────────────────────────────── */
function PulseDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ background: '#06B6D4', animation: 'asc-pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }} />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: '#06B6D4' }} />
    </span>
  );
}

/* ─────────────────────────────────────────────
   AgentScrollSection
───────────────────────────────────────────── */
export default function AgentScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sectionTop, setSectionTop] = useState(0);

  /* Measure section top once mounted + on resize */
  useEffect(() => {
    const measure = () => {
      if (sectionRef.current) {
        setSectionTop(sectionRef.current.offsetTop);
      }
      setIsMobile(window.innerWidth < 768);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* Scroll listener — derive active agent from scrollY */
  const handleScroll = useCallback(() => {
    if (isMobile || !sectionRef.current) return;
    const freshTop = sectionRef.current.offsetTop;
    const scrolled = window.scrollY - freshTop;
    const stepH = window.innerHeight;
    const raw = Math.floor(scrolled / stepH);
    const next = Math.max(0, Math.min(8, raw));
    if (next !== activeIndex) {
      setPrevIndex(activeIndex);
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), 620);
      setActiveIndex(next);
    }
  }, [activeIndex, isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Jump to agent via dot nav */
  const jumpTo = (i: number) => {
    const freshTop = sectionRef.current ? sectionRef.current.offsetTop : sectionTop;
    const target = freshTop + i * window.innerHeight + 4;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const agent = agents[activeIndex];
  const Visual = visuals[activeIndex];
  const PrevVisual = visuals[prevIndex];
  const progress = (activeIndex + 1) / 9;

  return (
    <section
      ref={sectionRef}
      id="agent-scroll"
      style={{ background: '#050505' }}
    >
      {/* ── Keyframes ── */}
      <style>{`
        @keyframes asc-pulse {
          0%,100% { transform:scale(1); opacity:0.75; }
          50%      { transform:scale(2); opacity:0;    }
        }
        @keyframes asc-slide-in {
          from { transform:translateX(-100%); opacity:0; }
          to   { transform:translateX(0);     opacity:1; }
        }
        @keyframes asc-fade-up {
          from { transform:translateY(40px); opacity:0; }
          to   { transform:translateY(0);    opacity:1; }
        }
        @keyframes asc-header-in {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .asc-visual-enter  { animation: asc-slide-in 0.6s cubic-bezier(0.4,0,0.2,1) forwards; }
        .asc-content-enter { animation: asc-fade-up  0.6s cubic-bezier(0.4,0,0.2,1) 0.05s forwards; }
      `}</style>

      {/* ════════════════════════════════════════
          DESKTOP: sticky scroll container
      ════════════════════════════════════════ */}
      <div className="hidden md:block" style={{ height: 'calc(9 * 100vh)' }}>
        <div className="sticky top-0 overflow-hidden" style={{ height: '100vh' }}>

          {/* Ambient glows */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute rounded-full" style={{
              top: '-200px', left: '50%', transform: 'translateX(-50%)',
              width: 600, height: 600,
              background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)',
            }} />
            <div className="absolute rounded-full" style={{
              bottom: '-100px', right: '-100px', width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
            }} />
          </div>

          {/* ── Sticky header strip ── */}
          <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-3 px-10 py-5"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#444' }}>
              Agent Intelligence Team
            </span>
            <span style={{
              background: 'linear-gradient(to right, #06B6D4, #EC4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontWeight: 700, fontSize: 13,
            }}>/</span>
            <span
              key={activeIndex}
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#06B6D4', animation: 'asc-header-in 0.4s ease forwards' }}
            >
              {agent.name}
            </span>
          </div>

          {/* ── Main split layout ── */}
          <div className="flex h-full pt-14">

            {/* LEFT — visual panel (40%) */}
            <div className="relative flex items-center justify-center overflow-hidden"
              style={{ width: '40%', background: 'rgba(6,182,212,0.02)', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
              {/* Current visual slides in */}
              <div
                key={activeIndex}
                className="absolute inset-0 flex items-center justify-center px-10 asc-visual-enter"
              >
                <Visual />
              </div>

              {/* Agent index label background */}
              <div className="absolute bottom-8 left-8 font-black"
                style={{
                  fontSize: 96, lineHeight: 1, opacity: 0.04, color: '#fff',
                  userSelect: 'none', pointerEvents: 'none',
                }}>
                {String(activeIndex + 1).padStart(2, '0')}
              </div>
            </div>

            {/* RIGHT — content panel (60%) */}
            <div className="relative flex flex-col justify-center px-12 xl:px-16 overflow-y-auto"
              style={{ width: '60%' }}>

              <div key={activeIndex} className="asc-content-enter" style={{ opacity: 0 }}>
                {/* Number */}
                <div className="font-black mb-3" style={{
                  fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1,
                  background: 'linear-gradient(to right, #06B6D4, #EC4899)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  opacity: 0.25,
                }}>
                  {String(activeIndex + 1).padStart(2, '0')}
                </div>

                {/* Agent name */}
                <h2 className="font-black uppercase text-white tracking-tight leading-none mb-5"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}>
                  {agent.name}
                </h2>

                {/* Tag + status row */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                    style={{
                      background: 'rgba(124,58,237,0.12)', color: '#A78BFA',
                      border: '1px solid rgba(124,58,237,0.25)',
                    }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#7C3AED' }} />
                    {agent.tag}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#06B6D4' }}>
                    <PulseDot />
                    Active
                  </span>
                </div>

                {/* Bullets */}
                <ul className="space-y-3 mb-10">
                  {agent.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
                      <span style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.65 }}>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Metric chips */}
                <div className="flex flex-wrap gap-3">
                  {agent.metrics.map((m) => (
                    <span key={m} className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider"
                      style={{
                        background: 'rgba(6,182,212,0.07)', color: '#06B6D4',
                        border: '1px solid rgba(6,182,212,0.2)',
                      }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0">
                <div className="flex items-center gap-3 px-12 xl:px-16 pb-5 pt-4"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <span className="text-xs font-mono" style={{ color: '#444' }}>
                    {String(activeIndex + 1).padStart(2, '0')} / 09
                  </span>
                  <div className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${progress * 100}%`,
                        background: 'linear-gradient(to right, #06B6D4, #EC4899)',
                      }} />
                  </div>
                  <span className="text-xs font-mono" style={{ color: '#444' }}>
                    {Math.round(progress * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Dot nav ── */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2.5">
            {agents.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                aria-label={`Go to agent ${i + 1}`}
                style={{
                  width: i === activeIndex ? 10 : 6,
                  height: i === activeIndex ? 10 : 6,
                  borderRadius: '50%',
                  background: i === activeIndex ? '#06B6D4' : 'rgba(255,255,255,0.15)',
                  boxShadow: i === activeIndex ? '0 0 8px 2px rgba(6,182,212,0.6)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          MOBILE: vertical card stack
      ════════════════════════════════════════ */}
      <div className="block md:hidden px-5 py-16 space-y-6">
        {/* Section label */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#444' }}>
            Agent Intelligence Team
          </p>
          <div className="h-px w-16" style={{ background: 'linear-gradient(to right, #06B6D4, #EC4899)' }} />
        </div>

        {agents.map((a, i) => {
          const V = visuals[i];
          return (
            <MobileAgentCard key={a.name} agent={a} index={i} Visual={V} />
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Mobile card with reveal animation
───────────────────────────────────────────── */
function MobileAgentCard({
  agent, index, Visual,
}: {
  agent: typeof agents[number];
  index: number;
  Visual: React.FC;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden"
      style={{
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.07)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)',
      }}>
      {/* Visual top */}
      <div className="flex items-center justify-center px-8 pt-6"
        style={{ height: '30vh', background: 'rgba(6,182,212,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <Visual />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="font-black mb-1"
          style={{
            fontSize: 40, lineHeight: 1,
            background: 'linear-gradient(to right, #06B6D4, #EC4899)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            opacity: 0.3,
          }}>
          {String(index + 1).padStart(2, '0')}
        </div>

        <h3 className="font-black uppercase text-white tracking-tight mb-4" style={{ fontSize: 'clamp(1.4rem, 5vw, 2rem)' }}>
          {agent.name}
        </h3>

        <div className="flex items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              background: 'rgba(124,58,237,0.12)', color: '#A78BFA',
              border: '1px solid rgba(124,58,237,0.25)',
            }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#7C3AED' }} />
            {agent.tag}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider" style={{ color: '#06B6D4' }}>
            <PulseDot />Active
          </span>
        </div>

        <ul className="space-y-2 mb-6">
          {agent.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: '#06B6D4' }} />
              <span style={{ color: '#999', fontSize: 14, lineHeight: 1.6 }}>{b}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {agent.metrics.map((m) => (
            <span key={m} className="px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
              style={{
                background: 'rgba(6,182,212,0.07)', color: '#06B6D4',
                border: '1px solid rgba(6,182,212,0.2)',
              }}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
