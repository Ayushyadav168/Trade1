'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity, Zap, Globe, DollarSign } from 'lucide-react'

export default function RealTimeMarket() {
  const [marketData, setMarketData] = useState({
    indices: [
      { name: 'NIFTY 50', value: 19674.25, change: 145.30, changePercent: 0.74, volume: '1.2B' },
      { name: 'SENSEX', value: 65953.48, change: 501.92, changePercent: 0.77, volume: '890M' },
      { name: 'NIFTY BANK', value: 44156.70, change: -234.85, changePercent: -0.53, volume: '456M' },
      { name: 'NIFTY IT', value: 31087.25, change: 287.45, changePercent: 0.93, volume: '234M' },
    ],
    topGainers: [
      { symbol: 'ADANIPORTS', price: 789.45, change: 45.30, changePercent: 6.09, volume: '12.3M' },
      { symbol: 'RELIANCE', price: 2520.45, change: 89.25, changePercent: 3.67, volume: '8.9M' },
      { symbol: 'TCS', price: 3680.80, change: 125.60, changePercent: 3.53, volume: '5.2M' },
      { symbol: 'INFY', price: 1485.60, change: 48.90, changePercent: 3.40, volume: '15.6M' },
      { symbol: 'HDFCBANK', price: 1523.75, change: 47.25, changePercent: 3.20, volume: '6.8M' },
    ],
    topLosers: [
      { symbol: 'BAJFINANCE', price: 6745.30, change: -234.70, changePercent: -3.36, volume: '3.4M' },
      { symbol: 'KOTAKBANK', price: 1789.45, change: -56.85, changePercent: -3.08, volume: '4.1M' },
      { symbol: 'ICICIBANK', price: 945.60, change: -27.40, changePercent: -2.82, volume: '7.3M' },
      { symbol: 'SBIN', price: 567.25, change: -15.75, changePercent: -2.70, volume: '12.8M' },
      { symbol: 'LT', price: 2890.15, change: -73.45, changePercent: -2.48, volume: '2.1M' },
    ],
    mostActive: [
      { symbol: 'RELIANCE', volume: '23.5M', turnover: '₹5,923Cr', price: 2520.45, changePercent: 3.67 },
      { symbol: 'TCS', volume: '18.2M', turnover: '₹6,701Cr', price: 3680.80, changePercent: 3.53 },
      { symbol: 'INFY', volume: '15.6M', turnover: '₹2,317Cr', price: 1485.60, changePercent: 3.40 },
      { symbol: 'SBIN', volume: '12.8M', turnover: '₹726Cr', price: 567.25, changePercent: -2.70 },
      { symbol: 'ADANIPORTS', volume: '12.3M', turnover: '₹971Cr', price: 789.45, changePercent: 6.09 },
    ]
  })

  const [marketStatus, setMarketStatus] = useState({
    isOpen: true,
    status: 'OPEN',
    nextEvent: 'Market closes in 2h 45m',
    lastUpdated: new Date().toLocaleTimeString()
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketStatus(prev => ({
        ...prev,
        lastUpdated: new Date().toLocaleTimeString()
      }))

      // Simulate small price movements
      setMarketData(prev => ({
        ...prev,
        indices: prev.indices.map(index => ({
          ...index,
          value: index.value + (Math.random() - 0.5) * 10,
          change: index.change + (Math.random() - 0.5) * 2
        }))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Market Status Header */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                marketStatus.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`}></div>
              <span className="font-semibold text-gray-900">
                Market {marketStatus.status}
              </span>
            </div>
            <span className="text-sm text-gray-600">{marketStatus.nextEvent}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Activity className="h-4 w-4 mr-1" />
            Last updated: {marketStatus.lastUpdated}
          </div>
        </div>

        {/* Market Indices */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {marketData.indices.map((index) => (
            <div key={index.name} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 text-sm">{index.name}</h3>
                <Globe className="h-4 w-4 text-gray-400" />
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">
                {index.value.toLocaleString()}
              </div>
              <div className={`flex items-center text-sm ${
                index.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {index.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
              </div>
              <div className="text-xs text-gray-500 mt-1">Vol: {index.volume}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Movers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Gainers */}
        <div className="card p-6">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Top Gainers</h3>
          </div>
          <div className="space-y-3">
            {marketData.topGainers.map((stock, index) => (
              <div key={stock.symbol} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{stock.symbol}</div>
                  <div className="text-xs text-gray-500">Vol: {stock.volume}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 text-sm">₹{stock.price.toLocaleString()}</div>
                  <div className="text-green-600 text-xs font-medium">
                    +{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="card p-6">
          <div className="flex items-center mb-4">
            <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Top Losers</h3>
          </div>
          <div className="space-y-3">
            {marketData.topLosers.map((stock, index) => (
              <div key={stock.symbol} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{stock.symbol}</div>
                  <div className="text-xs text-gray-500">Vol: {stock.volume}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 text-sm">₹{stock.price.toLocaleString()}</div>
                  <div className="text-red-600 text-xs font-medium">
                    {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Active */}
        <div className="card p-6">
          <div className="flex items-center mb-4">
            <Zap className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Most Active</h3>
          </div>
          <div className="space-y-3">
            {marketData.mostActive.map((stock, index) => (
              <div key={stock.symbol} className="py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium text-gray-900 text-sm">{stock.symbol}</div>
                  <div className={`text-xs font-medium ${
                    stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">Vol: {stock.volume}</div>
                  <div className="text-xs text-gray-500">{stock.turnover}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Market Stats */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">₹12.8L Cr</div>
            <div className="text-sm text-gray-600">Total Turnover</div>
          </div>
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">1,247</div>
            <div className="text-sm text-gray-600">Advances</div>
          </div>
          <div className="text-center">
            <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">892</div>
            <div className="text-sm text-gray-600">Declines</div>
          </div>
          <div className="text-center">
            <Activity className="h-8 w-8 text-gray-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">234</div>
            <div className="text-sm text-gray-600">Unchanged</div>
          </div>
        </div>
      </div>
    </div>
  )
}
