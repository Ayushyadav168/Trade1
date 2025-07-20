'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Calendar, Download, Filter, Sparkles, Star, Activity } from 'lucide-react'

export default function AdvancedPortfolio() {
  const [timeframe, setTimeframe] = useState('1M')
  const [viewType, setViewType] = useState('overview')

  // Enhanced portfolio data
  const portfolioData = {
    totalValue: 245680,
    totalInvestment: 220000,
    totalReturns: 25680,
    totalReturnsPercent: 11.67,
    dayChange: 3250,
    dayChangePercent: 1.34,
    availableBalance: 15000,
    usedMargin: 45000,
    unrealizedPnL: 25680,
    realizedPnL: 8950,
  }

  const holdings = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      quantity: 50,
      avgPrice: 2250,
      currentPrice: 2520.45,
      investedValue: 112500,
      currentValue: 126022.50,
      pnl: 13522.50,
      pnlPercent: 12.02,
      dayChange: 1260.23,
      dayChangePercent: 1.01,
      allocation: 25.4,
      sector: 'Oil & Gas',
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      quantity: 30,
      avgPrice: 3000,
      currentPrice: 3180.80,
      investedValue: 90000,
      currentValue: 95424,
      pnl: 5424,
      pnlPercent: 6.03,
      dayChange: -456,
      dayChangePercent: -0.48,
      allocation: 19.2,
      sector: 'IT',
    },
    {
      symbol: 'INFY',
      name: 'Infosys Limited',
      quantity: 40,
      avgPrice: 1350,
      currentPrice: 1485.60,
      investedValue: 54000,
      currentValue: 59424,
      pnl: 5424,
      pnlPercent: 10.04,
      dayChange: 1138.56,
      dayChangePercent: 1.95,
      allocation: 12.1,
      sector: 'IT',
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Limited',
      quantity: 25,
      avgPrice: 1400,
      currentPrice: 1523.75,
      investedValue: 35000,
      currentValue: 38093.75,
      pnl: 3093.75,
      pnlPercent: 8.84,
      dayChange: 320,
      dayChangePercent: 0.85,
      allocation: 7.7,
      sector: 'Banking',
    },
  ]

  const sectorAllocation = [
    { sector: 'Oil & Gas', value: 25.4, color: 'bg-blue-500' },
    { sector: 'IT', value: 31.3, color: 'bg-green-500' },
    { sector: 'Banking', value: 7.7, color: 'bg-purple-500' },
    { sector: 'Cash', value: 35.6, color: 'bg-gray-400' },
  ]

  const performanceData = [
    { period: '1D', returns: 1.34 },
    { period: '1W', returns: 3.67 },
    { period: '1M', returns: 8.92 },
    { period: '3M', returns: 15.34 },
    { period: '6M', returns: 22.45 },
    { period: '1Y', returns: 28.67 },
  ]

  // Top performing stock (mock logic)
  const topStock = holdings.reduce((a, b) => (a.pnlPercent > b.pnlPercent ? a : b), holdings[0]);
  // Mock recent activity
  const recentActivity = [
    { type: 'Buy', symbol: 'RELIANCE', qty: 10, price: 2500, date: '2024-06-01' },
    { type: 'Sell', symbol: 'TCS', qty: 5, price: 3200, date: '2024-05-28' },
    { type: 'Buy', symbol: 'INFY', qty: 15, price: 1450, date: '2024-05-25' },
  ];

  // Mock AI insights
  const aiInsights = [
    {
      icon: <Sparkles className="h-7 w-7 text-purple-500 animate-pulse" />,
      title: "AI Suggestion",
      text: "Consider rebalancing your IT sector exposure for better diversification.",
      color: "from-purple-100 to-blue-50 border-purple-300"
    },
    {
      icon: <TrendingUp className="h-7 w-7 text-green-500 animate-bounce" />,
      title: "Market Sentiment",
      text: "AI detects bullish sentiment in your top holdings this week.",
      color: "from-green-100 to-blue-50 border-green-300"
    },
    {
      icon: <Activity className="h-7 w-7 text-yellow-500 animate-spin-slow" />,
      title: "Risk Assessment",
      text: "Your portfolio risk is moderate. Diversify with bonds or ETFs for stability.",
      color: "from-yellow-100 to-blue-50 border-yellow-300"
    },
  ];

  return (
    <div className="space-y-8">
      {/* AI Portfolio Insights Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        {aiInsights.map((insight, idx) => (
          <div
            key={idx}
            className={`card p-6 bg-gradient-to-br ${insight.color} border-l-4 shadow-xl flex flex-col items-start gap-3 animate-fade-in-up`}
            style={{ minHeight: 180 }}
          >
            <div>{insight.icon}</div>
            <div className="text-lg font-bold text-gray-900 mb-1">{insight.title}</div>
            <div className="text-gray-700 text-sm font-medium">{insight.text}</div>
          </div>
        ))}
      </div>
      {/* Top Performing Stock */}
      <div className="card p-6 flex items-center gap-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-blue-400">
        <Star className="h-8 w-8 text-yellow-400" />
        <div>
          <div className="text-xs uppercase text-blue-600 font-bold mb-1">Top Performer</div>
          <div className="text-xl font-bold text-gray-900">{topStock.name} ({topStock.symbol})</div>
          <div className="text-sm text-gray-600">P&L: <span className="font-semibold text-green-600">+{topStock.pnlPercent}%</span> | Qty: {topStock.quantity}</div>
        </div>
      </div>
      {/* Portfolio Header */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Analytics</h2>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="input-field w-auto"
            >
              <option value="1D">1 Day</option>
              <option value="1W">1 Week</option>
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
            </select>
            <button className="btn-secondary flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Value</p>
            <p className="text-2xl font-bold text-gray-900">₹{portfolioData.totalValue.toLocaleString()}</p>
            <p className={`text-sm mt-1 flex items-center justify-center ${
              portfolioData.dayChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {portfolioData.dayChange >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              ₹{Math.abs(portfolioData.dayChange).toLocaleString()} ({portfolioData.dayChangePercent}%)
            </p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Returns</p>
            <p className="text-2xl font-bold text-green-600">₹{portfolioData.totalReturns.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-1">
              {portfolioData.totalReturnsPercent}%
            </p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <PieChart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Invested</p>
            <p className="text-2xl font-bold text-gray-900">₹{portfolioData.totalInvestment.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Principal Amount</p>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
            <BarChart3 className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Available Cash</p>
            <p className="text-2xl font-bold text-gray-900">₹{portfolioData.availableBalance.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">Ready to Invest</p>
          </div>
        </div>
        {/* Mini Performance Chart */}
        <div className="mt-8">
          <h4 className="text-md font-semibold text-gray-900 mb-2 flex items-center gap-2"><BarChart3 className="h-5 w-5 text-blue-500" /> Performance Trend</h4>
          <svg width="100%" height="60" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              points="0,50 50,40 100,30 150,35 200,20 250,25 300,10"
            />
            <circle cx="300" cy="10" r="4" fill="#22C55E" />
          </svg>
        </div>
      </div>
      {/* Performance & Sector Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
          <div className="space-y-4">
            {performanceData.map((item) => (
              <div key={item.period} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{item.period}</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className={`h-2 rounded-full ${item.returns >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${Math.min(Math.abs(item.returns) * 2, 100)}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-semibold ${item.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.returns >= 0 ? '+' : ''}{item.returns}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Allocation */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Allocation</h3>
          <div className="space-y-4">
            {sectorAllocation.map((sector) => (
              <div key={sector.sector} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full ${sector.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-600">{sector.sector}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className={`h-2 rounded-full ${sector.color}`}
                      style={{ width: `${sector.value * 2.8}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                    {sector.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Holdings Table */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Holdings Detail</h3>
          <div className="flex items-center space-x-2">
            <button className="btn-secondary flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <select className="input-field w-auto">
              <option value="all">All Holdings</option>
              <option value="gainers">Gainers</option>
              <option value="losers">Losers</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Stock</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Qty</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Avg Price</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Current Price</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">P&L</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Day Change</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Allocation</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr key={holding.symbol} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{holding.symbol}</div>
                      <div className="text-sm text-gray-500">{holding.sector}</div>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 text-gray-900">{holding.quantity}</td>
                  <td className="text-right py-4 px-4 text-gray-900">₹{holding.avgPrice.toLocaleString()}</td>
                  <td className="text-right py-4 px-4 text-gray-900">₹{holding.currentPrice.toLocaleString()}</td>
                  <td className={`text-right py-4 px-4 font-medium ${
                    holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {holding.pnl >= 0 ? '+' : ''}₹{holding.pnl.toLocaleString()}
                    <div className="text-xs">({holding.pnlPercent}%)</div>
                  </td>
                  <td className={`text-right py-4 px-4 font-medium ${
                    holding.dayChange >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {holding.dayChange >= 0 ? '+' : ''}₹{holding.dayChange.toLocaleString()}
                    <div className="text-xs">({holding.dayChangePercent}%)</div>
                  </td>
                  <td className="text-right py-4 px-4 text-gray-900">{holding.allocation}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Portfolio Insights (AI-style) */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 flex items-center gap-4">
        <Sparkles className="h-8 w-8 text-purple-500" />
        <div>
          <div className="text-lg font-bold text-gray-900 mb-1">Portfolio Insights</div>
          <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
            <li>Consider rebalancing your IT sector exposure for better diversification.</li>
            <li>Top performer: {topStock.name} ({topStock.symbol}) with {topStock.pnlPercent}% returns.</li>
            <li>Unrealized P&L is healthy. Review underperformers for possible action.</li>
            <li>Cash available: <span className="font-semibold text-blue-700">₹{portfolioData.availableBalance.toLocaleString()}</span></li>
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
  )
}
