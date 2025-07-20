'use client'

import { Sparkles, Star, Activity, Plus, RefreshCw, TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';

export default function Portfolio() {
  // Mock data - replace with real data from Kite Connect API
  const portfolioData = {
    totalValue: 125000,
    dayChange: 2500,
    dayChangePercent: 2.04,
    totalInvestment: 120000,
    totalReturns: 5000,
    totalReturnsPercent: 4.17,
  };
  const holdings = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', quantity: 50, avgPrice: 2450, currentPrice: 2520, value: 126000, dayChange: 70, dayChangePercent: 2.86 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', quantity: 30, avgPrice: 3200, currentPrice: 3180, value: 95400, dayChange: -20, dayChangePercent: -0.63 },
    { symbol: 'INFY', name: 'Infosys Limited', quantity: 40, avgPrice: 1450, currentPrice: 1485, value: 59400, dayChange: 35, dayChangePercent: 2.41 },
  ];
  const topStock = holdings.reduce((a, b) => (a.dayChangePercent > b.dayChangePercent ? a : b), holdings[0]);
  const recentActivity = [
    { type: 'Buy', symbol: 'RELIANCE', qty: 10, price: 2500, date: '2024-06-01' },
    { type: 'Sell', symbol: 'TCS', qty: 5, price: 3200, date: '2024-05-28' },
    { type: 'Buy', symbol: 'INFY', qty: 15, price: 1450, date: '2024-05-25' },
  ];
  return (
    <div className="space-y-8">
      {/* Top Performer */}
      <div className="card p-6 flex items-center gap-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-blue-400">
        <Star className="h-8 w-8 text-yellow-400" />
        <div>
          <div className="text-xs uppercase text-blue-600 font-bold mb-1">Top Performer</div>
          <div className="text-xl font-bold text-gray-900">{topStock.name} ({topStock.symbol})</div>
          <div className="text-sm text-gray-600">Day Change: <span className="font-semibold text-green-600">+{topStock.dayChangePercent}%</span> | Qty: {topStock.quantity}</div>
        </div>
      </div>
      {/* Portfolio Summary */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Portfolio Overview</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" /> Add Funds
            </button>
            <button className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors">
              <RefreshCw className="h-4 w-4" /> Rebalance Portfolio
            </button>
          </div>
        </div>
        {/* Portfolio Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-primary-600" />
              <span className="ml-2 text-sm font-medium text-gray-600">Total Value</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ₹{portfolioData.totalValue.toLocaleString()}
            </p>
            <p className={`text-sm mt-1 flex items-center ${portfolioData.dayChange >= 0 ? 'text-success' : 'text-danger'}`}>{portfolioData.dayChange >= 0 ? (<TrendingUp className="h-4 w-4 mr-1" />) : (<TrendingDown className="h-4 w-4 mr-1" />)}₹{Math.abs(portfolioData.dayChange).toLocaleString()} ({portfolioData.dayChangePercent}%)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-primary-600" />
              <span className="ml-2 text-sm font-medium text-gray-600">Invested</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">₹{portfolioData.totalInvestment.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-success" />
              <span className="ml-2 text-sm font-medium text-gray-600">Returns</span>
            </div>
            <p className="text-2xl font-bold text-success mt-1">₹{portfolioData.totalReturns.toLocaleString()}</p>
            <p className="text-sm text-success mt-1">{portfolioData.totalReturnsPercent}%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-primary-600" />
              <span className="ml-2 text-sm font-medium text-gray-600">Holdings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{holdings.length}</p>
            <p className="text-sm text-gray-600 mt-1">Stocks</p>
          </div>
        </div>
        {/* Mini Performance Chart */}
        <div className="mt-8">
          <h4 className="text-md font-semibold text-gray-900 mb-2 flex items-center gap-2"><PieChart className="h-5 w-5 text-blue-500" /> Performance Trend</h4>
          <svg width="100%" height="60" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline fill="none" stroke="#3B82F6" strokeWidth="3" points="0,50 50,40 100,30 150,35 200,20 250,25 300,10" />
            <circle cx="300" cy="10" r="4" fill="#22C55E" />
          </svg>
        </div>
      </div>
      {/* Holdings List */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Holdings</h3>
        {holdings.map((holding) => (
          <div key={holding.symbol} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="text-sm font-medium text-gray-900">{holding.symbol}</h4>
                <span className="ml-2 text-xs text-gray-500">{holding.name}</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">{holding.quantity} shares • Avg ₹{holding.avgPrice}</div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">₹{holding.value.toLocaleString()}</p>
              <p className={`text-sm flex items-center justify-end ${holding.dayChange >= 0 ? 'text-success' : 'text-danger'}`}>{holding.dayChange >= 0 ? (<TrendingUp className="h-3 w-3 mr-1" />) : (<TrendingDown className="h-3 w-3 mr-1" />)}₹{Math.abs(holding.dayChange)} ({holding.dayChangePercent}%)</p>
            </div>
          </div>
        ))}
      </div>
      {/* Portfolio Insights (AI-style) */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 flex items-center gap-4">
        <Sparkles className="h-8 w-8 text-purple-500" />
        <div>
          <div className="text-lg font-bold text-gray-900 mb-1">Portfolio Insights</div>
          <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
            <li>Consider rebalancing your IT sector exposure for better diversification.</li>
            <li>Top performer: {topStock.name} ({topStock.symbol}) with {topStock.dayChangePercent}% day change.</li>
            <li>Returns are healthy. Review underperformers for possible action.</li>
            <li>Cash available: <span className="font-semibold text-blue-700">₹{portfolioData.totalValue.toLocaleString()}</span></li>
          </ul>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Activity className="h-5 w-5 text-blue-500" /> Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((act, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${act.type === 'Buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{act.type}</span>
                <span className="font-medium text-gray-900">{act.symbol}</span>
                <span className="text-xs text-gray-500">x{act.qty}</span>
              </div>
              <div className="text-sm text-gray-600">₹{act.price} <span className="ml-2 text-xs text-gray-400">{act.date}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

