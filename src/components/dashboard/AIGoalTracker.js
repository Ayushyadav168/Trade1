"use client";
import { useState } from "react";
import { Sparkles, TrendingUp, CheckCircle } from "lucide-react";

export default function AIGoalTracker() {
  // Mock user goal and progress
  const [goal] = useState("Grow portfolio to ₹5,00,000 by 2025");
  const [progress] = useState(0.62); // 62% progress
  const aiSuggestion = "AI suggests increasing your SIP by 10% to reach your goal faster.";

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-100 border-l-4 border-blue-400 shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 glassmorphism animate-fade-in-up">
      <div className="flex flex-col items-center md:items-start flex-1">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-7 w-7 text-blue-600 animate-bounce" />
          <span className="text-lg font-bold text-gray-900">Goal Tracker</span>
        </div>
        <div className="text-gray-700 text-base font-medium mb-2">{goal}</div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all"
            style={{ width: `${Math.round(progress * 100)}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mb-1">Progress: <span className="font-semibold text-blue-700">{Math.round(progress * 100)}%</span></div>
        {progress >= 1 && (
          <div className="flex items-center gap-2 text-green-600 font-semibold mt-2">
            <CheckCircle className="h-5 w-5" /> Goal Achieved!
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col items-center md:items-end">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
          <span className="font-semibold text-purple-700">AI Suggestion</span>
        </div>
        <div className="text-gray-700 text-sm text-center md:text-right max-w-xs">{aiSuggestion}</div>
      </div>
    </div>
  );
} 