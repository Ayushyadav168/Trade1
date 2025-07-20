"use client";
import { useState } from "react";
import { Bell, Plus, TrendingUp, AlertTriangle } from "lucide-react";
import { useRouter } from 'next/navigation';

const initialWatchlist = [
  { symbol: "TCS", name: "Tata Consultancy Services", price: 3180.8, change: 1.2, aiAlert: "AI: TCS is nearing your target price!" },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2520.45, change: -0.7, aiAlert: null },
  { symbol: "INFY", name: "Infosys Limited", price: 1485.6, change: 2.1, aiAlert: "AI: Sudden volume spike detected!" },
];

export default function AIWatchlist() {
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [input, setInput] = useState("");
  const [showAlert, setShowAlert] = useState(null);
  const router = useRouter();

  const handleAdd = () => {
    if (!input.trim()) return;
    setWatchlist([
      ...watchlist,
      { symbol: input.toUpperCase(), name: input, price: 1000 + Math.random() * 2000, change: (Math.random() * 4 - 2).toFixed(2), aiAlert: null }
    ]);
    setInput("");
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-blue-50 border-l-4 border-pink-400 shadow-2xl rounded-2xl p-6 glassmorphism animate-fade-in-up mb-8">
      <div className="flex items-center gap-3 mb-4">
        <Bell className="h-7 w-7 text-pink-500 animate-pulse" />
        <span className="text-lg font-bold text-gray-900">AI Watchlist & Alerts</span>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="input-field w-40"
          placeholder="Add symbol (e.g. HDFCBANK)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <button
          className="p-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-bold flex items-center gap-2 shadow-md transition-all"
          onClick={handleAdd}
        >
          <Plus className="h-5 w-5" /> Add
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="py-2 px-4">Symbol</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Change</th>
              <th className="py-2 px-4">AI Alert</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((item, idx) => (
              <tr key={item.symbol} className="border-b border-gray-100 hover:bg-pink-50 transition-colors">
                <td className="py-2 px-4 font-bold text-blue-700 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" /> {item.symbol}
                </td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">₹{item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                <td className={`py-2 px-4 ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{item.change}%</td>
                <td className="py-2 px-4">
                  {item.aiAlert && (
                    <button
                      className="flex items-center gap-1 text-pink-600 font-semibold animate-pulse"
                      onClick={() => setShowAlert(item.aiAlert)}
                    >
                      <AlertTriangle className="h-4 w-4" /> {item.aiAlert.split(':')[0]}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* AI Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative animate-fade-in-up">
            <button
              onClick={() => setShowAlert(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-pink-500 animate-pulse" />
              <span className="font-bold text-pink-700">AI Alert</span>
            </div>
            <div className="text-gray-800 text-base font-medium mb-2">{showAlert}</div>
            <div className="text-xs text-gray-500">AI monitors your watchlist and notifies you of important events.</div>
          </div>
        </div>
      )}
      <div className="mt-6 flex justify-end">
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all"
          onClick={() => router.push('/dashboard?tab=watchlist')}
        >
          Manage Watchlist
        </button>
      </div>
    </div>
  );
} 