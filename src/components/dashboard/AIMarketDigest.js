"use client";
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Newspaper } from "lucide-react";

const digest = {
  date: new Date().toLocaleDateString(),
  summary: "AI Market Digest: The market opened strong with IT and Banking sectors leading the gains. Mid-caps showed volatility. AI expects continued momentum in blue chips, but advises caution in high-beta stocks.",
  highlights: [
    { icon: <TrendingUp className="h-5 w-5 text-green-600" />, text: "NIFTY up 1.2%, SENSEX up 1.1%" },
    { icon: <TrendingUp className="h-5 w-5 text-blue-600" />, text: "IT sector leads with 2.3% gain" },
    { icon: <TrendingDown className="h-5 w-5 text-red-600" />, text: "Mid-caps down 0.7% on profit booking" },
  ],
  opportunities: [
    "AI spots value in select PSU banks and large-cap IT stocks.",
    "Momentum building in FMCG sector—watch for breakouts."
  ],
  risks: [
    "Volatility expected in mid-caps and small-caps.",
    "Global cues remain uncertain—tighten stop losses."
  ]
};

export default function AIMarketDigest() {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-blue-50 border-l-4 border-yellow-400 shadow-2xl rounded-2xl p-6 glassmorphism animate-fade-in-up mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Newspaper className="h-7 w-7 text-yellow-500 animate-pulse" />
        <span className="text-lg font-bold text-gray-900">AI Market Digest</span>
        <span className="ml-auto text-xs text-gray-500">{digest.date}</span>
      </div>
      <div className="text-gray-800 text-base font-medium mb-3">{digest.summary}</div>
      <div className="mb-2">
        <div className="font-semibold text-blue-700 mb-1">Highlights</div>
        <ul className="list-none pl-0 space-y-1">
          {digest.highlights.map((h, i) => (
            <li key={i} className="flex items-center gap-2 text-gray-700">{h.icon}{h.text}</li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <div className="font-semibold text-green-700 mb-1">Opportunities</div>
        <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
          {digest.opportunities.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="font-semibold text-red-700 mb-1">Risks</div>
        <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
          {digest.risks.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 