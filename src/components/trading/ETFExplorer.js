'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, BarChart3, Target, DollarSign, Filter, Search, Activity, Zap, Info } from 'lucide-react'
import AISuggestionButton from '../AISuggestionButton'
import DetailedInfoModal from '../DetailedInfoModal'
import { etfData } from '@/data/etfData'

export default function ETFExplorer() {
  const [etfs, setEtfs] = useState([])
  const [filteredEtfs, setFilteredEtfs] = useState([])
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: 'all',
    underlying: 'all',
    searchTerm: '',
    volumeFilter: 'all'
  })
  const [sortBy, setSortBy] = useState('volume')

  useEffect(() => {
    // Use the imported data with added tradable property
    const enhancedData = etfData.map(etf => ({
      ...etf,
      tradable: true
    }))
    setEtfs(enhancedData)
    setFilteredEtfs(enhancedData)
  }, [])

  useEffect(() => {
    let filtered = etfs.filter(etf => {
      const matchesCategory = filters.category === 'all' || etf.category === filters.category
      const matchesUnderlying = filters.underlying === 'all' || etf.underlying.includes(filters.underlying)
      const matchesSearch = etf.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           etf.symbol.toLowerCase().includes(filters.searchTerm.toLowerCase())
      const matchesVolume = filters.volumeFilter === 'all' ||
                           (filters.volumeFilter === 'high' && etf.volume > 1000000) ||
                           (filters.volumeFilter === 'low' && etf.volume <= 1000000)
      
      return matchesCategory && matchesUnderlying && matchesSearch && matchesVolume
    })

    // Sort ETFs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return b.volume - a.volume
        case 'returns':
          return b.changePercent - a.changePercent
        case 'aum':
          return b.aum - a.aum
        case 'expense':
          return a.expenseRatio - b.expenseRatio
        default:
          return 0
      }
    })

    setFilteredEtfs(filtered)
  }, [etfs, filters, sortBy])

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Equity': return 'text-blue-600 bg-blue-100'
      case 'Commodity': return 'text-yellow-600 bg-yellow-100'
      case 'Sector': return 'text-purple-600 bg-purple-100'
      case 'International': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatVolume = (volume) => {
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(1)}Cr`
    if (volume >= 100000) return `${(volume / 100000).toFixed(1)}L`
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
    return volume.toString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ETF Explorer</h2>
            <p className="text-gray-600">Trade Exchange Traded Funds with low costs and high liquidity</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <button className="btn-primary">Trade ETF</button>
            <button className="btn-secondary">Compare ETFs</button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search ETFs..."
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
              <option value="Equity">Equity</option>
              <option value="Commodity">Commodity</option>
              <option value="Sector">Sector</option>
              <option value="International">International</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Underlying</label>
            <select
              value={filters.underlying}
              onChange={(e) => setFilters(prev => ({ ...prev, underlying: e.target.value }))}
              className="input-field text-sm"
            >
              <option value="all">All Indices</option>
              <option value="NIFTY">NIFTY</option>
              <option value="SENSEX">SENSEX</option>
              <option value="BANK">BANK</option>
              <option value="IT">IT</option>
              <option value="Gold">Gold</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
            <select
              value={filters.volumeFilter}
              onChange={(e) => setFilters(prev => ({ ...prev, volumeFilter: e.target.value }))}
              className="input-field text-sm"
            >
              <option value="all">All Volumes</option>
              <option value="high">High (>10L)</option>
              <option value="low">Low (≤10L)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field text-sm"
            >
              <option value="volume">Volume</option>
              <option value="returns">Returns</option>
              <option value="aum">AUM</option>
              <option value="expense">Expense Ratio</option>
            </select>
          </div>
        </div>
      </div>

      {/* ETF List */}
      <div className="space-y-4">
        {filteredEtfs.map((etf) => (
          <div key={etf.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* ETF Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{etf.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{etf.symbol}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(etf.category)}`}>
                        {etf.category}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {etf.underlying}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">NAV:</span>
                    <span className="font-medium ml-2">₹{etf.nav.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">AUM:</span>
                    <span className="font-medium ml-2">₹{etf.aum.toLocaleString()} Cr</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Expense Ratio:</span>
                    <span className="font-medium ml-2">{etf.expenseRatio}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tracking Error:</span>
                    <span className="font-medium ml-2">{etf.trackingError}%</span>
                  </div>
                </div>
              </div>

              {/* Price & Returns */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Price & Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Price:</span>
                    <span className="font-bold text-lg">₹{etf.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Day Change:</span>
                    <span className={`font-medium ${etf.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {etf.change >= 0 ? '+' : ''}₹{etf.change.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Day Change %:</span>
                    <span className={`font-medium flex items-center ${etf.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {etf.changePercent >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {etf.changePercent >= 0 ? '+' : ''}{etf.changePercent}%
                    </span>
                  </div>
                  {etf.dividendYield > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Dividend Yield:</span>
                      <span className="font-medium text-blue-600">{etf.dividendYield}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Volume & Liquidity */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Trading Info</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Volume:</span>
                    <span className="font-medium flex items-center">
                      <Activity className="h-4 w-4 mr-1 text-blue-600" />
                      {formatVolume(etf.volume)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Market Cap:</span>
                    <span className="font-medium">₹{etf.marketCap.toLocaleString()} Cr</span>
                  </div>
                  {etf.pe && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">P/E:</span>
                      <span className="font-medium">{etf.pe}</span>
                    </div>
                  )}
                  {etf.pb && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">P/B:</span>
                      <span className="font-medium">{etf.pb}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-3">
                <button className="btn-primary flex items-center justify-center">
                  <Target className="h-4 w-4 mr-2" />
                  Buy ETF
                </button>
                <button className="btn-secondary flex items-center justify-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Quick Trade
                </button>
                <button 
                  onClick={() => handleInfoClick(etf)}
                  className="btn-secondary flex items-center justify-center"
                >
                  <Info className="h-4 w-4 mr-2" />
                  Detailed Info
                </button>
                <AISuggestionButton data={etf} type="etf" />
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View Chart
                </button>
              </div>
            </div>

            {/* Top Holdings */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h5 className="text-sm font-medium text-gray-900 mb-2">Top Holdings:</h5>
              <div className="flex flex-wrap gap-2">
                {etf.top_holdings.slice(0, 5).map((holding) => (
                  <span key={holding} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                    {holding}
                  </span>
                ))}
                {etf.top_holdings.length > 5 && (
                  <span className="text-xs text-gray-500">+{etf.top_holdings.length - 5} more</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEtfs.length === 0 && (
        <div className="card p-12 text-center">
          <div className="text-gray-500 mb-4">
            <BarChart3 className="h-12 w-12 mx-auto opacity-50" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No ETFs found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results</p>
        </div>
      )}

      {/* Detailed Info Modal */}
      <DetailedInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        data={selectedInfo}
        type="etf"
      />
    </div>
  )
}
