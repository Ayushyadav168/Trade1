'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity, Eye, BarChart3, DollarSign, Clock, Target, Info, Globe, Zap, AlertCircle, PieChart } from 'lucide-react'
import DetailedInfoModal from '../DetailedInfoModal'

export default function MarketOverview() {
  const [activeTab, setActiveTab] = useState('indices')
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [marketStatus, setMarketStatus] = useState('open') // open, closed, pre-open

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getMarketStatus = () => {
    const hour = currentTime.getHours()
    const minute = currentTime.getMinutes()
    const currentTimeMinutes = hour * 60 + minute
    
    if (currentTimeMinutes >= 540 && currentTimeMinutes < 555) return 'pre-open' // 9:00-9:15
    if (currentTimeMinutes >= 555 && currentTimeMinutes < 930) return 'open'     // 9:15-15:30
    return 'closed'
  }

  // Mock data - replace with real data from Kite Connect API
  const marketData = [
    {
      index: 'NIFTY 50',
      value: 19845.65,
      change: 125.30,
      changePercent: 0.63,
      high: 19892.35,
      low: 19742.80,
      volume: '245.8K Cr',
      previousClose: 19720.35
    },
    {
      index: 'SENSEX',
      value: 66598.91,
      change: 245.86,
      changePercent: 0.37,
      high: 66745.22,
      low: 66389.45,
      volume: '189.2K Cr',
      previousClose: 66353.05
    },
    {
      index: 'BANK NIFTY',
      value: 45236.80,
      change: -89.45,
      changePercent: -0.20,
      high: 45456.75,
      low: 45123.60,
      volume: '89.7K Cr',
      previousClose: 45326.25
    },
    {
      index: 'NIFTY IT',
      value: 28459.35,
      change: 156.80,
      changePercent: 0.55,
      high: 28523.90,
      low: 28302.45,
      volume: '45.3K Cr',
      previousClose: 28302.55
    }
  ]

  const topGainers = [
    { 
      symbol: 'ADANIPORTS', 
      name: 'Adani Ports & SEZ', 
      price: 820.45, 
      change: 45.30, 
      changePercent: 5.85, 
      volume: 250000, 
      marketCap: 17000,
      sector: 'Infrastructure',
      pe: 12.5,
      pb: 2.1,
      roe: 18.2,
      eps: 65.23,
      dividend: 2.1,
      week52High: 850.30,
      week52Low: 520.40,
      bookValue: 390.80
    },
    { 
      symbol: 'TATASTEEL', 
      name: 'Tata Steel Ltd', 
      price: 135.60, 
      change: 6.85, 
      changePercent: 5.32, 
      volume: 890000,
      marketCap: 16000,
      sector: 'Steel',
      pe: 8.2,
      pb: 1.4,
      roe: 22.1,
      eps: 16.54,
      dividend: 3.5,
      week52High: 155.80,
      week52Low: 85.90,
      bookValue: 96.85
    },
    { 
      symbol: 'HINDALCO', 
      name: 'Hindalco Industries', 
      price: 485.30, 
      change: 22.15, 
      changePercent: 4.78, 
      volume: 320000,
      marketCap: 11000,
      sector: 'Metals',
      pe: 11.2,
      pb: 1.6,
      roe: 16.8,
      eps: 43.33,
      dividend: 1.9,
      week52High: 510.40,
      week52Low: 320.90,
      bookValue: 303.31
    },
    { 
      symbol: 'JSWSTEEL', 
      name: 'JSW Steel Ltd', 
      price: 789.25, 
      change: 28.90, 
      changePercent: 3.96, 
      volume: 410000,
      marketCap: 19000,
      sector: 'Steel',
      pe: 9.8,
      pb: 1.8,
      roe: 19.5,
      eps: 80.54,
      dividend: 2.8,
      week52High: 820.60,
      week52Low: 550.20,
      bookValue: 438.47
    },
    { 
      symbol: 'COALINDIA', 
      name: 'Coal India Ltd', 
      price: 267.80, 
      change: 9.45, 
      changePercent: 3.65, 
      volume: 570000,
      marketCap: 16500,
      sector: 'Mining',
      pe: 6.5,
      pb: 1.2,
      roe: 25.4,
      eps: 41.20,
      dividend: 7.2,
      week52High: 285.50,
      week52Low: 185.30,
      bookValue: 223.17
    }
  ]

  const topLosers = [
    { 
      symbol: 'DRREDDY', 
      name: "Dr. Reddy's Lab", 
      price: 5245.80, 
      change: -145.20, 
      changePercent: -2.69, 
      volume: 80000,
      marketCap: 87000,
      sector: 'Pharmaceuticals',
      pe: 21.5,
      pb: 3.2,
      roe: 15.8,
      eps: 244.09,
      dividend: 1.2,
      week52High: 5650.40,
      week52Low: 4680.30,
      bookValue: 1639.31
    },
    { 
      symbol: 'CIPLA', 
      name: 'Cipla Ltd', 
      price: 1123.45, 
      change: -28.90, 
      changePercent: -2.51, 
      volume: 120000,
      marketCap: 91000,
      sector: 'Pharmaceuticals',
      pe: 18.6,
      pb: 2.8,
      roe: 16.2,
      eps: 60.40,
      dividend: 2.1,
      week52High: 1250.80,
      week52Low: 980.50,
      bookValue: 401.23
    },
    { 
      symbol: 'SUNPHARMA', 
      name: 'Sun Pharmaceutical', 
      price: 1089.60, 
      change: -24.85, 
      changePercent: -2.23, 
      volume: 210000,
      marketCap: 260000,
      sector: 'Pharmaceuticals',
      pe: 22.8,
      pb: 4.1,
      roe: 18.9,
      eps: 47.79,
      dividend: 1.8,
      week52High: 1230.70,
      week52Low: 920.40,
      bookValue: 265.76
    },
    { 
      symbol: 'BAJAJFINSV', 
      name: 'Bajaj Finserv Ltd', 
      price: 1456.30, 
      change: -29.75, 
      changePercent: -2.00, 
      volume: 90000,
      marketCap: 230000,
      sector: 'Financial Services',
      pe: 14.2,
      pb: 2.1,
      roe: 19.5,
      eps: 102.56,
      dividend: 1.5,
      week52High: 1650.80,
      week52Low: 1250.90,
      bookValue: 693.48
    },
    { 
      symbol: 'APOLLOHOSP', 
      name: 'Apollo Hospitals', 
      price: 5123.90, 
      change: -98.60, 
      changePercent: -1.89, 
      volume: 50000,
      marketCap: 74000,
      sector: 'Healthcare',
      pe: 35.8,
      pb: 6.2,
      roe: 17.8,
      eps: 143.17,
      dividend: 0.8,
      week52High: 5850.40,
      week52Low: 4350.20,
      bookValue: 826.44
    }
  ]

  const sectorPerformance = [
    { sector: 'Metal', change: 2.45, stocks: ['TATASTEEL', 'HINDALCO', 'JSWSTEEL'] },
    { sector: 'Banking', change: -0.85, stocks: ['HDFCBANK', 'ICICIBANK', 'SBIN'] },
    { sector: 'IT', change: 1.23, stocks: ['TCS', 'INFY', 'WIPRO'] },
    { sector: 'Pharma', change: -1.67, stocks: ['SUNPHARMA', 'DRREDDY', 'CIPLA'] },
    { sector: 'Auto', change: 0.89, stocks: ['MARUTI', 'M&M', 'TATAMOTORS'] },
    { sector: 'FMCG', change: 0.34, stocks: ['HINDUNILVR', 'ITC', 'NESTLEIND'] }
  ]

  const handleInfoClick = (item, type) => {
    setSelectedInfo({ ...item, type })
    setInfoModalOpen(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header with Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="text-xl font-semibold text-gray-900">Market Overview</h2>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('indices')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'indices' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Indices
            </button>
            <button
              onClick={() => setActiveTab('movers')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'movers' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Top Movers
            </button>
            <button
              onClick={() => setActiveTab('sectors')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'sectors' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sectors
            </button>
          </div>
        </div>
        <div className="h-px bg-gray-200 mt-4"></div>
      </div>

      <div className="p-6">
        {/* Market Indices Tab */}
        {activeTab === 'indices' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.map((market) => (
              <div key={market.index} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-600">{market.index}</h3>
                  <Activity className="h-4 w-4 text-gray-400" />
                </div>
                
                <p className="text-xl font-bold text-gray-900 mb-1">
                  {market.value.toLocaleString()}
                </p>
                
                <div className={`flex items-center text-sm mb-3 ${
                  market.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {market.change >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span className="font-medium">
                    {market.change >= 0 ? '+' : ''}{market.change} ({market.changePercent >= 0 ? '+' : ''}{market.changePercent}%)
                  </span>
                </div>

                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>High:</span>
                    <span>{market.high.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Low:</span>
                    <span>{market.low.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volume:</span>
                    <span>{market.volume}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Top Movers Tab */}
        {activeTab === 'movers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Gainers */}
            <div>
              <div className="flex items-center mb-4">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Top Gainers</h3>
              </div>
              <div className="space-y-2">
                {topGainers.map((stock, index) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors group">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{stock.symbol}</h4>
                        <p className="text-xs text-gray-600">{stock.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">₹{stock.price}</p>
                        <p className="text-xs font-medium text-green-600">
                          +₹{stock.change} (+{stock.changePercent}%)
                        </p>
                      </div>
                      <button
                        onClick={() => handleInfoClick(stock, 'stock')}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-green-200 rounded"
                        title="View detailed info"
                      >
                        <Info className="h-4 w-4 text-green-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div>
              <div className="flex items-center mb-4">
                <TrendingDown className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-lg font-medium text-gray-900">Top Losers</h3>
              </div>
              <div className="space-y-2">
                {topLosers.map((stock, index) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors group">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{stock.symbol}</h4>
                        <p className="text-xs text-gray-600">{stock.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">₹{stock.price}</p>
                        <p className="text-xs font-medium text-red-600">
                          ₹{stock.change} ({stock.changePercent}%)
                        </p>
                      </div>
                      <button
                        onClick={() => handleInfoClick(stock, 'stock')}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-200 rounded"
                        title="View detailed info"
                      >
                        <Info className="h-4 w-4 text-red-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sectors Tab */}
        {activeTab === 'sectors' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectorPerformance.map((sector) => (
              <div key={sector.sector} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{sector.sector}</h4>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    sector.change >= 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {sector.change >= 0 ? '+' : ''}{sector.change}%
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {sector.stocks.map((stock, index) => (
                    <span key={stock} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {stock}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detailed Info Modal */}
      <DetailedInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        data={selectedInfo}
        type={selectedInfo?.type}
      />
    </div>
  )
}
