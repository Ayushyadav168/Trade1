"use client";
import { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Activity, Lightbulb } from "lucide-react";

const aiInsights = [
  {
    icon: <Sparkles className="h-8 w-8 text-purple-500 animate-pulse" />,
    title: "AI Market Tip",
    text: "AI suggests watching the IT sector for breakout opportunities this week.",
    bg: "from-purple-100 to-blue-50 border-purple-300"
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-green-500 animate-bounce" />,
    title: "Trending Now",
    text: "NIFTY and SENSEX show bullish momentum. AI expects continued strength.",
    bg: "from-green-100 to-blue-50 border-green-300"
  },
  {
    icon: <Activity className="h-8 w-8 text-yellow-500 animate-spin-slow" />,
    title: "Risk Alert",
    text: "AI detects increased volatility in mid-cap stocks. Consider rebalancing.",
    bg: "from-yellow-100 to-blue-50 border-yellow-300"
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-pink-500 animate-pulse" />,
    title: "AI Insight",
    text: "Diversification across sectors can reduce your portfolio risk.",
    bg: "from-pink-100 to-blue-50 border-pink-300"
  },
];

export default function AIInsightsCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % aiInsights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-8">
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${active * 100}%)` }}>
          {aiInsights.map((insight, idx) => (
            <div
              key={idx}
              className={`min-w-full p-6 flex flex-col items-center justify-center bg-gradient-to-br ${insight.bg} border-l-4 shadow-2xl rounded-2xl glassmorphism animate-fade-in-up`}
              style={{ minHeight: 200 }}
            >
              {insight.icon}
              <div className="text-xl font-bold text-gray-900 mb-2 mt-2">{insight.title}</div>
              <div className="text-gray-700 text-base font-medium text-center max-w-md">{insight.text}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {aiInsights.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 ${active === idx ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'} transition-all`}
            onClick={() => setActive(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 