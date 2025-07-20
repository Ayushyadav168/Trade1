'use client'

import { useState } from 'react'
import { Sparkles, X, TrendingUp, AlertTriangle, Target } from 'lucide-react'
import { geminiService } from '../lib/gemini'

export default function AIAnalysisModal({ isOpen, onClose, data, type }) {
  const [analysis, setAnalysis] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)

  const generateAnalysis = async () => {
    setIsLoading(true)
    try {
      let result = ''
      
      switch (type) {
        case 'stock':
          result = await geminiService.getStockAnalysis(data)
          break
        case 'mutual-fund':
          result = await geminiService.getMutualFundAnalysis(data)
          break
        case 'etf':
          result = await geminiService.getETFAnalysis(data)
          break
        default:
          result = 'Analysis type not supported'
      }
      
      setAnalysis(result)
      setHasAnalyzed(true)
    } catch (error) {
      setAnalysis('Unable to generate analysis. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setAnalysis('')
    setHasAnalyzed(false)
    onClose()
  }

  if (!isOpen) return null

  const getTypeIcon = () => {
    switch (type) {
      case 'stock':
        return <TrendingUp className="h-6 w-6 text-blue-600" />
      case 'mutual-fund':
        return <Target className="h-6 w-6 text-green-600" />
      case 'etf':
        return <AlertTriangle className="h-6 w-6 text-purple-600" />
      default:
        return <Sparkles className="h-6 w-6 text-blue-600" />
    }
  }

  const getTypeName = () => {
    switch (type) {
      case 'stock':
        return 'Stock'
      case 'mutual-fund':
        return 'Mutual Fund'
      case 'etf':
        return 'ETF'
      default:
        return 'Investment'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {getTypeIcon()}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                AI Analysis: {data.name || data.symbol}
              </h3>
              <p className="text-sm text-gray-600">
                {getTypeName()} Analysis powered by Gemini AI
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!hasAnalyzed ? (
            <div className="text-center py-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Get AI-Powered Investment Insights
              </h4>
              <p className="text-gray-600 mb-6">
                Our AI will analyze the investment data and provide personalized recommendations
              </p>
              <button
                onClick={generateAnalysis}
                disabled={isLoading}
                className="btn-primary flex items-center justify-center space-x-2 mx-auto"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate AI Analysis</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Investment Summary */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon()}
                    <span className="font-medium text-gray-900">
                      {data.symbol || data.name}
                    </span>
                  </div>
                  {type === 'stock' && (
                    <span className={`text-sm font-medium ${
                      data.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {data.changePercent >= 0 ? '+' : ''}{data.changePercent}%
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {type === 'stock' && `Current Price: ₹${data.price?.toLocaleString()}`}
                  {type === 'mutual-fund' && `NAV: ₹${data.nav?.toLocaleString()}`}
                  {type === 'etf' && `Price: ₹${data.price?.toLocaleString()}`}
                </div>
              </div>

              {/* AI Analysis */}
              <div className="prose prose-sm max-w-none">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-900">AI Analysis</span>
                  </div>
                  <div className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {analysis}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={generateAnalysis}
                  disabled={isLoading}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Refresh Analysis</span>
                </button>
                <div className="flex space-x-3">
                  <button
                    onClick={handleClose}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                  <button className="btn-primary">
                    {type === 'stock' ? 'Trade Now' : 'Invest Now'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
