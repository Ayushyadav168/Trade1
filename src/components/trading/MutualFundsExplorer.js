'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Star, Target, DollarSign, Filter, Search, BarChart3, Clock, Zap, Info } from 'lucide-react'
import AISuggestionButton from '../AISuggestionButton'
import DetailedInfoModal from '../DetailedInfoModal'

export default function MutualFundsExplorer() {
  const [funds, setFunds] = useState([])
  const [filteredFunds, setFilteredFunds] = useState([])
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: 'all',
    riskLevel: 'all',
    returnPeriod: '1Y',
    fundSize: 'all',
    searchTerm: ''
  })
  const [sortBy, setSortBy] = useState('returns')

  // Sample mutual funds data
  const fundsData = [
    {
      id: 1,
      name: "HDFC Equity Fund - Direct Plan",
      category: "Large Cap",
      amc: "HDFC Mutual Fund",
      nav: 845.67,
      returns: {
        "1D": 0.45,
        "1W": 2.1,
        "1M": 4.5,
        "3M": 8.2,
        "6M": 15.7,
        "1Y": 23.4,
        "3Y": 18.6,
        "5Y": 16.8
      },
      riskLevel: "Moderate",
      fundSize: 45000, // in crores
      expenseRatio: 1.05,
      minInvestment: 1000,
      exitLoad: "1% if redeemed within 1 year",
      rating: 4,
      sipAvailable: true,
      ltcgTax: "10% above 1L",
      category_type: "equity"
    },
    {
      id: 2,
      name: "SBI Blue Chip Fund - Direct Plan",
      category: "Large Cap",
      amc: "SBI Mutual Fund",
      nav: 612.34,
      returns: {
        "1D": -0.23,
        "1W": 1.8,
        "1M": 3.9,
        "3M": 7.5,
        "6M": 14.2,
        "1Y": 21.8,
        "3Y": 17.9,
        "5Y": 15.6
      },
      riskLevel: "Moderate",
      fundSize: 38500,
      expenseRatio: 0.98,
      minInvestment: 1000,
      exitLoad: "1% if redeemed within 1 year",
      rating: 4,
      sipAvailable: true,
      ltcgTax: "10% above 1L",
      category_type: "equity"
    },
    {
      id: 3,
      name: "Axis Small Cap Fund - Direct Plan",
      category: "Small Cap",
      amc: "Axis Mutual Fund",
      nav: 789.45,
      returns: {
        "1D": 1.2,
        "1W": 3.5,
        "1M": 6.8,
        "3M": 12.4,
        "6M": 28.9,
        "1Y": 35.7,
        "3Y": 22.1,
        "5Y": 19.8
      },
      riskLevel: "High",
      fundSize: 15600,
      expenseRatio: 1.48,
      minInvestment: 1000,
      exitLoad: "1% if redeemed within 1 year",
      rating: 5,
      sipAvailable: true,
      ltcgTax: "10% above 1L",
      category_type: "equity"
    },
    {
      id: 4,
      name: "ICICI Prudential Liquid Fund - Direct Plan",
      category: "Liquid",
      amc: "ICICI Prudential Mutual Fund",
      nav: 345.67,
      returns: {
        "1D": 0.02,
        "1W": 0.14,
        "1M": 0.58,
        "3M": 1.75,
        "6M": 3.45,
        "1Y": 6.8,
        "3Y": 5.9,
        "5Y": 6.2
      },
      riskLevel: "Low",
      fundSize: 25400,
      expenseRatio: 0.25,
      minInvestment: 1000,
      exitLoad: "Nil",
      rating: 4,
      sipAvailable: true,
      ltcgTax: "20% with indexation",
      category_type: "debt"
    },
    {
      id: 5,
      name: "Mirae Asset Emerging Bluechip Fund - Direct Plan",
      category: "Mid Cap",
      amc: "Mirae Asset Mutual Fund",
      nav: 567.89,
      returns: {
        "1D": 0.78,
        "1W": 2.9,
        "1M": 5.6,
        "3M": 10.8,
        "6M": 22.4,
        "1Y": 28.9,
        "3Y": 20.5,
        "5Y": 18.2
      },
      riskLevel: "Moderately High",
      fundSize: 32100,
      expenseRatio: 1.25,
      minInvestment: 1000,
      exitLoad: "1% if redeemed within 1 year",
      rating: 5,
      sipAvailable: true,
      ltcgTax: "10% above 1L",
      category_type: "equity"
    },
    {
      id: 6,
      name: "UTI Nifty Index Fund - Direct Plan",
      category: "Index",
      amc: "UTI Mutual Fund",
      nav: 234.56,
      returns: {
        "1D": 0.34,
        "1W": 1.9,
        "1M": 4.1,
        "3M": 7.8,
        "6M": 14.9,
        "1Y": 19.8,
        "3Y": 16.2,
        "5Y": 14.7
      },
      riskLevel: "Moderate",
      fundSize: 18700,
      expenseRatio: 0.15,
      minInvestment: 100,
      exitLoad: "Nil",
      rating: 4,
      sipAvailable: true,
      ltcgTax: "10% above 1L",
      category_type: "equity"
    }
  ]

  useEffect(() => {
    setFunds(fundsData)
    setFilteredFunds(fundsData)
  }, [])

  const handleInfoClick = (fund) => {
    // Transform fund data to match DetailedInfoModal format
    const transformedFund = {
      ...fund,
      returns1y: fund.returns['1Y'],
      returns3y: fund.returns['3Y'],
      returns5y: fund.returns['5Y']
    }
    setSelectedInfo(transformedFund)
    setInfoModalOpen(true)
  }

  useEffect(() => {
    let filtered = funds.filter(fund => {
      const matchesCategory = filters.category === 'all' || fund.category === filters.category
      const matchesRisk = filters.riskLevel === 'all' || fund.riskLevel === filters.riskLevel
      const matchesSearch = fund.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           fund.amc.toLowerCase().includes(filters.searchTerm.toLowerCase())
      const matchesFundSize = filters.fundSize === 'all' || 
                             (filters.fundSize === 'large' && fund.fundSize > 10000) ||
                             (filters.fundSize === 'small' && fund.fundSize <= 10000)
      
      return matchesCategory && matchesRisk && matchesSearch && matchesFundSize
    })

    // Sort funds
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'returns':
          return b.returns[filters.returnPeriod] - a.returns[filters.returnPeriod]
        case 'nav':
          return b.nav - a.nav
        case 'expense':
          return a.expenseRatio - b.expenseRatio
        case 'size':
          return b.fundSize - a.fundSize
        default:
          return 0
      }
    })

    setFilteredFunds(filtered)
  }, [funds, filters, sortBy])

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100'
      case 'Moderate': return 'text-blue-600 bg-blue-100'
      case 'Moderately High': return 'text-orange-600 bg-orange-100'
      case 'High': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Mutual Funds Explorer</h2>
            <p className="text-gray-600">Discover and invest in top-performing mutual funds</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <button className="btn-primary">Start SIP</button>
            <button className="btn-secondary">Compare Funds</button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search funds..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="pl-10 input-field text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="input-field text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Large Cap">Large Cap</option>
              <option value="Mid Cap">Mid Cap</option>
              <option value="Small Cap">Small Cap</option>
              <option value="Index">Index</option>
              <option value="Liquid">Liquid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
            <select
              value={filters.riskLevel}
              onChange={(e) => setFilters(prev => ({ ...prev, riskLevel: e.target.value }))}
              className="input-field text-sm"
            >
              <option value="all">All Risks</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="Moderately High">Moderately High</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Returns Period</label>
            <select
              value={filters.returnPeriod}
              onChange={(e) => setFilters(prev => ({ ...prev, returnPeriod: e.target.value }))}
              className="input-field text-sm"
            >
              <option value="1Y">1 Year</option>
              <option value="3Y">3 Years</option>
              <option value="5Y">5 Years</option>
              <option value="1M">1 Month</option>
              <option value="6M">6 Months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fund Size</label>
            <select
              value={filters.fundSize}
              onChange={(e) => setFilters(prev => ({ ...prev, fundSize: e.target.value }))}
              className="input-field text-sm"
            >
              <option value="all">All Sizes</option>
              <option value="large">Large (>₹10k Cr)</option>
              <option value="small">Small (≤₹10k Cr)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field text-sm"
            >
              <option value="returns">Returns</option>
              <option value="nav">NAV</option>
              <option value="expense">Expense Ratio</option>
              <option value="size">Fund Size</option>
            </select>
          </div>
        </div>
      </div>

      {/* Funds List */}
      <div className="space-y-4">
        {filteredFunds.map((fund) => (
          <div key={fund.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Fund Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{fund.name}</h3>
                    <p className="text-sm text-gray-600">{fund.amc}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full mr-2 ${getRiskColor(fund.riskLevel)}`}>
                        {fund.riskLevel} Risk
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-2">
                        {fund.category}
                      </span>
                      {fund.sipAvailable && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                          SIP Available
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {renderStars(fund.rating)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">NAV:</span>
                    <span className="font-medium ml-2">₹{fund.nav.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fund Size:</span>
                    <span className="font-medium ml-2">₹{fund.fundSize.toLocaleString()} Cr</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Expense Ratio:</span>
                    <span className="font-medium ml-2">{fund.expenseRatio}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Min Investment:</span>
                    <span className="font-medium ml-2">₹{fund.minInvestment.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Returns */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Returns (%)</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(fund.returns).slice(2, 6).map(([period, return_val]) => (
                    <div key={period} className="flex justify-between">
                      <span className="text-gray-600">{period}:</span>
                      <span className={`font-medium ${return_val >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {return_val >= 0 ? '+' : ''}{return_val}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-2 bg-blue-50 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">{filters.returnPeriod} Return:</span>
                    <span className="font-bold text-blue-700">
                      +{fund.returns[filters.returnPeriod]}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-3">
                <button className="btn-primary flex items-center justify-center">
                  <Target className="h-4 w-4 mr-2" />
                  Invest Now
                </button>
                <button className="btn-secondary flex items-center justify-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Start SIP
                </button>
                <button 
                  onClick={() => handleInfoClick(fund)}
                  className="btn-secondary flex items-center justify-center"
                >
                  <Info className="h-4 w-4 mr-2" />
                  Detailed Info
                </button>
                <AISuggestionButton data={fund} type="mutual-fund" />
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Factsheet
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFunds.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-gray-500 mb-4">
            <BarChart3 className="h-12 w-12 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No funds found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results</p>
        </div>
      )}

      {/* Detailed Info Modal */}
      <DetailedInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        data={selectedInfo}
        type="mutual-fund"
      />
    </div>
  )
}
