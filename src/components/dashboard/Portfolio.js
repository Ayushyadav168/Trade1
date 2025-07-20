'use client'

import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react'

export default function Portfolio() {
  // Mock data - replace with real data from Kite Connect API
  const portfolioData = {
    totalValue: 125000,
    dayChange: 2500,
    dayChangePercent: 2.04,
    totalInvestment: 120000,
    totalReturns: 5000,
    totalReturnsPercent: 4.17,
  }

  const holdings = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      quantity: 50,
      avgPrice: 2450,
      currentPrice: 2520,
      value: 126000,
      dayChange: 70,
      dayChangePercent: 2.86,
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      quantity: 30,
      avgPrice: 3200,
      currentPrice: 3180,
      value: 95400,
      dayChange: -20,
      dayChangePercent: -0.63,
    },
    {
      symbol: 'INFY',
      name: 'Infosys Limited',
      quantity: 40,
      avgPrice: 1450,
      currentPrice: 1485,
      value: 59400,
      dayChange: 35,
      dayChangePercent: 2.41,
    },
  ]

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Portfolio Overview</h2>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All Holdings
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-primary-600" />
            <span className="ml-2 text-sm font-medium text-gray-600">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ₹{portfolioData.totalValue.toLocaleString()}
          </p>
          <p className={`text-sm mt-1 flex items-center ${
            portfolioData.dayChange >= 0 ? 'text-success' : 'text-danger'
          }`}>
            {portfolioData.dayChange >= 0 ? (
              <TrendingUp className="h-4 w-4 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1" />
            )}
            ₹{Math.abs(portfolioData.dayChange).toLocaleString()} ({portfolioData.dayChangePercent}%)
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <PieChart className="h-5 w-5 text-primary-600" />
            <span className="ml-2 text-sm font-medium text-gray-600">Invested</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ₹{portfolioData.totalInvestment.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-success" />
            <span className="ml-2 text-sm font-medium text-gray-600">Returns</span>
          </div>
          <p className="text-2xl font-bold text-success mt-1">
            ₹{portfolioData.totalReturns.toLocaleString()}
          </p>
          <p className="text-sm text-success mt-1">
            {portfolioData.totalReturnsPercent}%
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <PieChart className="h-5 w-5 text-primary-600" />
            <span className="ml-2 text-sm font-medium text-gray-600">Holdings</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {holdings.length}
          </p>
          <p className="text-sm text-gray-600 mt-1">Stocks</p>
        </div>
      </div>

      {/* Holdings List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Top Holdings</h3>
        {holdings.map((holding) => (
          <div key={holding.symbol} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="text-sm font-medium text-gray-900">{holding.symbol}</h4>
                <span className="ml-2 text-xs text-gray-500">{holding.name}</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {holding.quantity} shares • Avg ₹{holding.avgPrice}
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                ₹{holding.value.toLocaleString()}
              </p>
              <p className={`text-sm flex items-center justify-end ${
                holding.dayChange >= 0 ? 'text-success' : 'text-danger'
              }`}>
                {holding.dayChange >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                ₹{Math.abs(holding.dayChange)} ({holding.dayChangePercent}%)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
