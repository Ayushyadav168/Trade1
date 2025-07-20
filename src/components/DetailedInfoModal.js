'use client'

import { useState } from 'react'
import { X, TrendingUp, TrendingDown, BarChart3, DollarSign, Activity, Clock, Star, Target, Shield, Zap } from 'lucide-react'

export default function DetailedInfoModal({ isOpen, onClose, data, type }) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!isOpen || !data) return null

  const renderStockDetails = () => (
    <div className="space-y-6">
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Metrics */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Key Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Market Cap</p>
                <p className="font-semibold">₹{data.marketCap?.toLocaleString()} Cr</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">P/E Ratio</p>
                <p className="font-semibold">{data.pe}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">P/B Ratio</p>
                <p className="font-semibold">{data.pb}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">ROE</p>
                <p className="font-semibold">{data.roe}%</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">EPS</p>
                <p className="font-semibold">₹{data.eps}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-600">Dividend Yield</p>
                <p className="font-semibold">{data.dividend}%</p>
              </div>
            </div>
          </div>

          {/* Price Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Price Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price:</span>
                <span className="font-semibold">₹{data.price?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Day Change:</span>
                <span className={`font-semibold ${data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {data.changePercent >= 0 ? '+' : ''}₹{data.change} ({data.changePercent >= 0 ? '+' : ''}{data.changePercent}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">52W High:</span>
                <span className="font-semibold">₹{data.week52High?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">52W Low:</span>
                <span className="font-semibold">₹{data.week52Low?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volume:</span>
                <span className="font-semibold">{data.volume?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Book Value:</span>
                <span className="font-semibold">₹{data.bookValue}</span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-semibold text-gray-900">Company Information</h4>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>{data.name}</strong> operates in the <strong>{data.sector}</strong> sector. 
                The company has shown consistent performance with strong fundamentals and market presence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Financials Tab */}
      {activeTab === 'financials' && (
        <div className="space-y-6">
          <h4 className="font-semibold text-gray-900">Financial Ratios</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
              <h5 className="font-medium text-blue-900 mb-2">Valuation Ratios</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>P/E Ratio:</span>
                  <span className="font-medium">{data.pe}</span>
                </div>
                <div className="flex justify-between">
                  <span>P/B Ratio:</span>
                  <span className="font-medium">{data.pb}</span>
                </div>
                <div className="flex justify-between">
                  <span>EV/EBITDA:</span>
                  <span className="font-medium">12.5</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
              <h5 className="font-medium text-green-900 mb-2">Profitability Ratios</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>ROE:</span>
                  <span className="font-medium">{data.roe}%</span>
                </div>
                <div className="flex justify-between">
                  <span>ROA:</span>
                  <span className="font-medium">8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Margin:</span>
                  <span className="font-medium">12.8%</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
              <h5 className="font-medium text-purple-900 mb-2">Growth Metrics</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Revenue Growth:</span>
                  <span className="font-medium">15.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Growth:</span>
                  <span className="font-medium">18.7%</span>
                </div>
                <div className="flex justify-between">
                  <span>EPS Growth:</span>
                  <span className="font-medium">16.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Tab */}
      {activeTab === 'news' && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Recent News & Updates</h4>
          <div className="space-y-3">
            {[
              { title: `${data.symbol} reports strong Q4 earnings`, time: '2 hours ago', type: 'earnings' },
              { title: `Analysts upgrade ${data.symbol} to BUY`, time: '1 day ago', type: 'analyst' },
              { title: `${data.symbol} announces new product launch`, time: '3 days ago', type: 'corporate' }
            ].map((news, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <h5 className="font-medium text-gray-900 text-sm">{news.title}</h5>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    news.type === 'earnings' ? 'bg-green-100 text-green-700' :
                    news.type === 'analyst' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {news.type}
                  </span>
                  <span className="text-xs text-gray-500">{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderMutualFundDetails = () => (
    <div className="space-y-6">
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fund Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Fund Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">NAV:</span>
                <span className="font-semibold">₹{data.nav}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fund Size:</span>
                <span className="font-semibold">₹{data.fundSize?.toLocaleString()} Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expense Ratio:</span>
                <span className="font-semibold">{data.expenseRatio}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Min Investment:</span>
                <span className="font-semibold">₹{data.minInvestment?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Risk Level:</span>
                <span className={`font-semibold ${
                  data.riskLevel === 'Low' ? 'text-green-600' :
                  data.riskLevel === 'Moderate' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {data.riskLevel}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SIP Available:</span>
                <span className="font-semibold">{data.sipAvailable ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Performance Returns</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-600">1 Year</p>
                <p className="font-bold text-green-600">{data.returns1y}%</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-600">3 Years</p>
                <p className="font-bold text-blue-600">{data.returns3y}%</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-600">5 Years</p>
                <p className="font-bold text-purple-600">{data.returns5y}%</p>
              </div>
            </div>
          </div>

          {/* Fund Details */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-semibold text-gray-900">Fund Strategy</h4>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                This <strong>{data.category}</strong> fund focuses on investing in fundamentally strong companies 
                with good growth prospects. The fund follows a disciplined investment approach and aims to 
                deliver consistent long-term returns.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Holdings Tab */}
      {activeTab === 'holdings' && (
        <div className="space-y-6">
          <h4 className="font-semibold text-gray-900">Portfolio Holdings</h4>
          <div className="space-y-3">
            {[
              { stock: 'RELIANCE', allocation: 8.5, sector: 'Energy' },
              { stock: 'TCS', allocation: 7.2, sector: 'IT Services' },
              { stock: 'HDFCBANK', allocation: 6.8, sector: 'Banking' },
              { stock: 'INFY', allocation: 5.9, sector: 'IT Services' },
              { stock: 'ICICIBANK', allocation: 5.1, sector: 'Banking' }
            ].map((holding, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{holding.stock}</p>
                  <p className="text-xs text-gray-600">{holding.sector}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{holding.allocation}%</p>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${holding.allocation * 10}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const renderETFDetails = () => (
    <div className="space-y-6">
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ETF Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">ETF Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price:</span>
                <span className="font-semibold">₹{data.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">AUM:</span>
                <span className="font-semibold">₹{data.aum?.toLocaleString()} Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expense Ratio:</span>
                <span className="font-semibold">{data.expenseRatio}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tracking Error:</span>
                <span className="font-semibold">{data.trackingError}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Dividend Yield:</span>
                <span className="font-semibold">{data.dividendYield}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volume:</span>
                <span className="font-semibold">{data.volume?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Underlying Index */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Underlying Index</h4>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="font-medium text-blue-900">{data.underlying}</p>
              <p className="text-sm text-blue-700 mt-2">
                This ETF tracks the {data.underlying} index, providing exposure to {data.category.toLowerCase()} markets 
                with high liquidity and low costs.
              </p>
            </div>
          </div>

          {/* Trading Information */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-semibold text-gray-900">Trading Information</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-600">Lot Size</p>
                <p className="font-semibold">1</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-600">Market Maker</p>
                <p className="font-semibold">Yes</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-600">Liquidity</p>
                <p className="font-semibold">High</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <p className="text-xs text-gray-600">Settlement</p>
                <p className="font-semibold">T+1</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <h4 className="font-semibold text-gray-900">Performance vs Benchmark</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-medium text-green-900">1 Year Return</h5>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>ETF:</span>
                  <span className="font-medium">12.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Index:</span>
                  <span className="font-medium">12.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tracking Diff:</span>
                  <span className="font-medium text-green-600">+0.2%</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-900">3 Year Return</h5>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>ETF:</span>
                  <span className="font-medium">10.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Index:</span>
                  <span className="font-medium">10.9%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tracking Diff:</span>
                  <span className="font-medium text-red-600">-0.1%</span>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-medium text-purple-900">5 Year Return</h5>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>ETF:</span>
                  <span className="font-medium">9.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Index:</span>
                  <span className="font-medium">9.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tracking Diff:</span>
                  <span className="font-medium text-red-600">-0.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const getTabsForType = () => {
    switch (type) {
      case 'stock':
        return [
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'financials', label: 'Financials', icon: DollarSign },
          { id: 'news', label: 'News', icon: Activity }
        ]
      case 'mutual-fund':
        return [
          { id: 'overview', label: 'Overview', icon: Target },
          { id: 'holdings', label: 'Holdings', icon: Shield }
        ]
      case 'etf':
        return [
          { id: 'overview', label: 'Overview', icon: Target },
          { id: 'performance', label: 'Performance', icon: TrendingUp }
        ]
      default:
        return []
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              type === 'stock' ? 'bg-blue-100' :
              type === 'mutual-fund' ? 'bg-green-100' : 'bg-purple-100'
            }`}>
              {type === 'stock' && <TrendingUp className="h-5 w-5 text-blue-600" />}
              {type === 'mutual-fund' && <Target className="h-5 w-5 text-green-600" />}
              {type === 'etf' && <BarChart3 className="h-5 w-5 text-purple-600" />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {data.name || data.symbol}
              </h3>
              <p className="text-sm text-gray-600">
                {type === 'stock' && `${data.symbol} • ${data.sector}`}
                {type === 'mutual-fund' && `${data.category} Fund`}
                {type === 'etf' && `${data.symbol} • ${data.category} ETF`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {getTabsForType().map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {type === 'stock' && renderStockDetails()}
          {type === 'mutual-fund' && renderMutualFundDetails()}
          {type === 'etf' && renderETFDetails()}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleString()}
            </div>
            <div className="flex space-x-3">
              <button onClick={onClose} className="btn-secondary">
                Close
              </button>
              <button className="btn-primary">
                {type === 'stock' ? 'Trade Now' : 'Invest Now'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
