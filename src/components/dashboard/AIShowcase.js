'use client'

import { useState } from 'react'
import { Sparkles, TrendingUp, BarChart3, Target, Zap } from 'lucide-react'
import AISuggestionButton from '../AISuggestionButton'
import ErrorBoundary from '../ErrorBoundary'

export default function AIShowcase() {
  const [activeDemo, setActiveDemo] = useState('stock')

  const demoData = {
    stock: {
      id: 1,
      symbol: "HDFC",
      name: "HDFC Bank Ltd",
      price: 1567.80,
      change: 12.45,
      changePercent: 0.80,
      volume: 3200000,
      marketCap: 1185000,
      sector: "Banking",
      pe: 18.5,
      pb: 2.8,
      roe: 15.8,
      week52High: 1741.85,
      week52Low: 1363.55,
      dividend: 1.5,
      eps: 84.75
    },
    mutualFund: {
      id: 1,
      name: "HDFC Top 100 Fund",
      category: "Large Cap",
      nav: 587.23,
      returns1y: 16.8,
      returns3y: 14.2,
      returns5y: 11.9,
      expenseRatio: 0.58,
      riskLevel: "Moderate",
      fundSize: 28450,
      minInvestment: 5000,
      sipAvailable: true
    },
    etf: {
      id: 1,
      name: "HDFC SENSEX ETF",
      symbol: "SENSEXETF",
      category: "Equity",
      underlying: "BSE SENSEX",
      price: 568.00,
      changePercent: -0.60,
      aum: 4200,
      expenseRatio: 0.08,
      trackingError: 0.15,
      dividendYield: 1.32,
      volume: 1850000
    }
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Investment Insights</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get personalized investment recommendations powered by Google's Gemini AI. 
          Click on any AI Analysis button to see intelligent insights tailored to your investment needs.
        </p>
      </div>

      {/* Demo Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveDemo('stock')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeDemo === 'stock'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <TrendingUp className="h-5 w-5 inline mr-2" />
          Stocks
        </button>
        <button
          onClick={() => setActiveDemo('mutualFund')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeDemo === 'mutualFund'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <BarChart3 className="h-5 w-5 inline mr-2" />
          Mutual Funds
        </button>
        <button
          onClick={() => setActiveDemo('etf')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeDemo === 'etf'
              ? 'bg-purple-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Target className="h-5 w-5 inline mr-2" />
          ETFs
        </button>
      </div>

      {/* Demo Content */}
      <ErrorBoundary>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {activeDemo === 'stock' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Stock Analysis Demo</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Symbol:</span>
                    <span className="font-medium">{demoData.stock.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Price:</span>
                    <span className="font-medium">₹{demoData.stock.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">P/E Ratio:</span>
                    <span className="font-medium">{demoData.stock.pe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sector:</span>
                    <span className="font-medium">{demoData.stock.sector}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <AISuggestionButton 
                  data={demoData.stock} 
                  type="stock" 
                  variant="large" 
                />
                <p className="text-sm text-gray-600 text-center">
                  AI will analyze fundamentals, technicals, and market sentiment
                </p>
              </div>
            </div>
          )}

          {activeDemo === 'mutualFund' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Mutual Fund Analysis Demo</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fund Name:</span>
                    <span className="font-medium">{demoData.mutualFund.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">NAV:</span>
                    <span className="font-medium">₹{demoData.mutualFund.nav}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">1Y Return:</span>
                    <span className="font-medium text-green-600">{demoData.mutualFund.returns1y}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{demoData.mutualFund.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <AISuggestionButton 
                  data={demoData.mutualFund} 
                  type="mutual-fund" 
                  variant="large" 
                />
                <p className="text-sm text-gray-600 text-center">
                  AI will evaluate performance, risk, and suitability
                </p>
              </div>
            </div>
          )}

          {activeDemo === 'etf' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">ETF Analysis Demo</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ETF Name:</span>
                    <span className="font-medium">{demoData.etf.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">₹{demoData.etf.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expense Ratio:</span>
                    <span className="font-medium">{demoData.etf.expenseRatio}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Underlying:</span>
                    <span className="font-medium">{demoData.etf.underlying}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <AISuggestionButton 
                  data={demoData.etf} 
                  type="etf" 
                  variant="large" 
                />
                <p className="text-sm text-gray-600 text-center">
                  AI will assess liquidity, costs, and tracking efficiency
                </p>
              </div>
            </div>
          )}
        </div>
      </ErrorBoundary>

      {/* Features List */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Sparkles className="h-6 w-6 text-blue-600" />
          </div>
          <h5 className="font-medium text-gray-900 mb-2">Intelligent Analysis</h5>
          <p className="text-sm text-gray-600">
            Advanced AI algorithms analyze multiple data points for comprehensive insights
          </p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Target className="h-6 w-6 text-green-600" />
          </div>
          <h5 className="font-medium text-gray-900 mb-2">Personalized Recommendations</h5>
          <p className="text-sm text-gray-600">
            Tailored investment advice based on your risk profile and goals
          </p>
        </div>
        <div className="text-center">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap className="h-6 w-6 text-purple-600" />
          </div>
          <h5 className="font-medium text-gray-900 mb-2">Real-time Insights</h5>
          <p className="text-sm text-gray-600">
            Get up-to-date analysis based on current market conditions
          </p>
        </div>
      </div>
    </div>
  )
}
