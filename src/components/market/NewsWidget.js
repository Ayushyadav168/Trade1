'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Clock, ExternalLink, Filter, Search, Calendar } from 'lucide-react'

export default function NewsWidget() {
  const [news, setNews] = useState([])
  const [filter, setFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  // Sample news data - in production, this would come from a news API
  const newsData = [
    {
      id: 1,
      title: "SEBI introduces new regulations for F&O trading",
      summary: "Market regulator announces stricter margin requirements and position limits for retail traders",
      category: "regulatory",
      source: "Economic Times",
      time: "2 hours ago",
      impact: "high",
      relatedStocks: ["NIFTY", "BANKNIFTY"],
      url: "#"
    },
    {
      id: 2,
      title: "Reliance Industries reports strong Q4 earnings",
      summary: "RIL beats estimates with 23% YoY growth in net profit, driven by retail and digital segments",
      category: "earnings",
      source: "Business Standard",
      time: "4 hours ago",
      impact: "positive",
      relatedStocks: ["RELIANCE"],
      url: "#"
    },
    {
      id: 3,
      title: "RBI keeps repo rate unchanged at 6.5%",
      summary: "Central bank maintains accommodative stance, focuses on inflation control and growth support",
      category: "monetary",
      source: "Mint",
      time: "6 hours ago",
      impact: "neutral",
      relatedStocks: ["HDFCBANK", "ICICIBANK", "SBIN"],
      url: "#"
    },
    {
      id: 4,
      title: "IT sector shows resilience amid global uncertainties",
      summary: "Major IT companies report steady growth in Q4, hiring plans remain optimistic for FY25",
      category: "sector",
      source: "Financial Express",
      time: "8 hours ago",
      impact: "positive",
      relatedStocks: ["TCS", "INFY", "WIPRO", "HCLTECH"],
      url: "#"
    },
    {
      id: 5,
      title: "Oil prices surge 3% on geopolitical tensions",
      summary: "Brent crude crosses $85/barrel as supply concerns mount in Middle East region",
      category: "commodity",
      source: "Reuters",
      time: "10 hours ago",
      impact: "mixed",
      relatedStocks: ["ONGC", "BPCL", "IOC"],
      url: "#"
    },
    {
      id: 6,
      title: "Mutual Fund inflows hit record high in March",
      summary: "SIP registrations surge 40% YoY as retail investors show strong appetite for equity funds",
      category: "market",
      source: "Moneycontrol",
      time: "12 hours ago",
      impact: "positive",
      relatedStocks: ["HDFCAMC", "NIPPONLIFE"],
      url: "#"
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNews(newsData)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredNews = news.filter(item => 
    filter === 'all' || item.category === filter
  )

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100'
      case 'negative': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'neutral': return 'text-gray-600 bg-gray-100'
      case 'mixed': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'earnings': return <TrendingUp className="h-4 w-4" />
      case 'regulatory': return <Clock className="h-4 w-4" />
      case 'monetary': return <Calendar className="h-4 w-4" />
      default: return <TrendingUp className="h-4 w-4" />
    }
  }

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
          Market News
        </h3>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded-md px-3 py-1"
          >
            <option value="all">All News</option>
            <option value="earnings">Earnings</option>
            <option value="regulatory">Regulatory</option>
            <option value="monetary">Monetary</option>
            <option value="sector">Sector</option>
            <option value="commodity">Commodity</option>
            <option value="market">Market</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredNews.map((item) => (
          <div key={item.id} className="border-l-4 border-blue-500 pl-4 pb-4 border-b border-gray-100 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(item.category)}
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getImpactColor(item.impact)}`}>
                  {item.impact.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-gray-500">{item.time}</div>
            </div>
            
            <h4 className="font-medium text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
              {item.title}
            </h4>
            
            <p className="text-sm text-gray-600 mb-3">{item.summary}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">{item.source}</span>
                {item.relatedStocks.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Related:</span>
                    {item.relatedStocks.slice(0, 2).map((stock) => (
                      <span key={stock} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {stock}
                      </span>
                    ))}
                    {item.relatedStocks.length > 2 && (
                      <span className="text-xs text-gray-500">+{item.relatedStocks.length - 2} more</span>
                    )}
                  </div>
                )}
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 hover:text-blue-600 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All News
        </button>
      </div>
    </div>
  )
}
