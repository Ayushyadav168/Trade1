'use client'

import React, { useState, useEffect } from 'react'
import { Brain, TrendingUp, AlertTriangle, Target, DollarSign, MapPin, Home, BarChart3, Clock, Star } from 'lucide-react'

export default function AIPropertyAnalysis({ property, onAnalysisComplete }) {
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const analyzeProperty = async () => {
    if (!property) return

    setLoading(true)
    setError(null)

    try {
      // Enhanced property analysis prompt for Gemini AI
      const analysisPrompt = `
        Analyze this property investment opportunity and provide comprehensive insights:

        Property Details:
        - Title: ${property.title}
        - Location: ${property.location}
        - Type: ${property.type}
        - Configuration: ${property.bhk}
        - Area: ${property.sqft} sqft
        - Sale Price: ₹${property.price.toLocaleString()}
        - Monthly Rent: ₹${property.rentPrice.toLocaleString()}
        - Developer: ${property.developer}
        - Possession Date: ${property.possessionDate}
        - Current ROI: ${property.roi}%
        - Historical Appreciation: ${property.appreciation}%
        - Amenities: ${property.amenities.join(', ')}

        Please provide a detailed analysis covering:
        1. Investment Recommendation (BUY/HOLD/AVOID)
        2. Risk Assessment (LOW/MEDIUM/HIGH)
        3. Target Price Range
        4. Location Analysis and Growth Prospects
        5. Rental Yield Analysis
        6. Market Comparison
        7. Key Strengths and Concerns
        8. Investment Timeline Recommendation
        9. Exit Strategy Suggestions
        10. Overall Investment Score (1-10)

        Format the response as structured JSON with these fields:
        - recommendation: "BUY", "HOLD", or "AVOID"
        - riskLevel: "LOW", "MEDIUM", or "HIGH"
        - investmentScore: number (1-10)
        - targetPriceRange: { min: number, max: number }
        - rentalYield: number
        - locationScore: number (1-10)
        - growthProspects: string
        - strengths: array of strings
        - concerns: array of strings
        - investmentHorizon: string
        - exitStrategy: string
        - keyInsights: array of strings
        - marketComparison: string
      `

      // Simulate API call to Gemini AI (replace with actual API call)
      // For now, generating realistic mock analysis
      const mockAnalysis = {
        recommendation: property.roi > 8 ? "BUY" : property.roi > 6 ? "HOLD" : "AVOID",
        riskLevel: property.appreciation > 15 ? "LOW" : property.appreciation > 10 ? "MEDIUM" : "HIGH",
        investmentScore: Math.min(10, Math.max(1, Math.round((property.roi + property.appreciation) / 3))),
        targetPriceRange: {
          min: property.price * 0.95,
          max: property.price * 1.1
        },
        rentalYield: (property.rentPrice * 12) / property.price * 100,
        locationScore: property.location.includes('Mumbai') ? 9 : property.location.includes('Bangalore') ? 8 : 7,
        growthProspects: property.location.includes('Mumbai') ? 
          "Excellent growth prospects due to financial hub status and limited land availability" :
          property.location.includes('Bangalore') ? 
          "Strong growth driven by IT sector expansion and infrastructure development" :
          "Moderate growth expected with urban development initiatives",
        strengths: [
          `Strong ROI of ${property.roi}% above market average`,
          `Premium location in ${property.location}`,
          `Quality developer with good track record`,
          `Modern amenities including ${property.amenities.slice(0, 2).join(' and ')}`,
          `Possession date is realistic and achievable`
        ],
        concerns: [
          property.price > 50000000 ? "High entry price may limit liquidity" : "Price point is reasonable",
          property.possessionDate > '2024-12-01' ? "Delayed possession risk" : "Near-term possession advantage",
          "Market volatility could affect short-term returns"
        ],
        investmentHorizon: property.type === 'Villa' ? "7-10 years for optimal returns" : "5-7 years recommended",
        exitStrategy: "Consider selling after 70% appreciation or rent out for steady income",
        keyInsights: [
          `Property offers ${property.rentalYield?.toFixed(1) || 'competitive'} rental yield`,
          `Location premium justifies ${(property.price/property.sqft).toFixed(0)} per sqft pricing`,
          `Developer reputation adds 10-15% value premium`,
          `Current market cycle favors ${property.type.toLowerCase()} investments`
        ],
        marketComparison: `Property priced ${property.price > 60000000 ? 'above' : 'within'} market range for similar properties in ${property.location.split(',')[0]}`
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setAnalysis(mockAnalysis)
      if (onAnalysisComplete) {
        onAnalysisComplete(mockAnalysis)
      }
    } catch (err) {
      console.error('Property analysis error:', err)
      setError('Failed to analyze property. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (property) {
      analyzeProperty()
    }
  }, [property])

  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`
    }
    return `₹${price.toLocaleString()}`
  }

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'BUY': return 'text-green-600 bg-green-50 border-green-200'
      case 'HOLD': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'AVOID': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'LOW': return 'text-green-600 bg-green-50'
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50'
      case 'HIGH': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Brain className="h-12 w-12 text-blue-500 animate-pulse mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Analyzing Property...</h3>
            <p className="text-gray-600">Our AI is evaluating investment potential, market conditions, and risk factors</p>
            <div className="mt-4">
              <div className="animate-pulse flex space-x-1">
                <div className="rounded-full bg-blue-500 h-2 w-2"></div>
                <div className="rounded-full bg-blue-500 h-2 w-2 animation-delay-200"></div>
                <div className="rounded-full bg-blue-500 h-2 w-2 animation-delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Analysis Failed</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={analyzeProperty}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Retry Analysis
          </button>
        </div>
      </div>
    )
  }

  if (!analysis) return null

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8" />
            <div>
              <h3 className="text-xl font-bold">AI Property Analysis</h3>
              <p className="text-blue-100">Powered by Advanced Analytics</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{analysis.investmentScore}/10</div>
            <div className="text-sm text-blue-100">Investment Score</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`rounded-lg border-2 p-4 ${getRecommendationColor(analysis.recommendation)}`}>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5" />
              <span className="font-semibold">Recommendation</span>
            </div>
            <div className="text-2xl font-bold">{analysis.recommendation}</div>
          </div>

          <div className={`rounded-lg p-4 ${getRiskColor(analysis.riskLevel)}`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Risk Level</span>
            </div>
            <div className="text-2xl font-bold">{analysis.riskLevel}</div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Rental Yield</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{analysis.rentalYield.toFixed(1)}%</div>
          </div>
        </div>

        {/* Target Price Range */}
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Target Price Range
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-green-700">Minimum Target</div>
              <div className="text-lg font-bold text-green-900">{formatPrice(analysis.targetPriceRange.min)}</div>
            </div>
            <div className="text-green-600">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="text-right">
              <div className="text-sm text-green-700">Maximum Target</div>
              <div className="text-lg font-bold text-green-900">{formatPrice(analysis.targetPriceRange.max)}</div>
            </div>
          </div>
        </div>

        {/* Location Analysis */}
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Analysis
          </h4>
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-700">Location Score</span>
            <div className="flex items-center gap-1">
              {[...Array(10)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < analysis.locationScore ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
          <p className="text-purple-700 text-sm">{analysis.growthProspects}</p>
        </div>

        {/* Strengths */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Key Strengths
          </h4>
          <ul className="space-y-2">
            {analysis.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Concerns */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Key Concerns
          </h4>
          <ul className="space-y-2">
            {analysis.concerns.map((concern, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{concern}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Investment Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Investment Horizon
            </h4>
            <p className="text-blue-700 text-sm">{analysis.investmentHorizon}</p>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Exit Strategy
            </h4>
            <p className="text-indigo-700 text-sm">{analysis.exitStrategy}</p>
          </div>
        </div>

        {/* Key Insights */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Insights
          </h4>
          <ul className="space-y-2">
            {analysis.keyInsights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Market Comparison */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Market Comparison</h4>
          <p className="text-gray-700 text-sm">{analysis.marketComparison}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2">
            <Brain className="h-5 w-5" />
            Get Detailed Report
          </button>
          <button 
            onClick={analyzeProperty}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700"
          >
            Re-analyze
          </button>
        </div>
      </div>
    </div>
  )
}