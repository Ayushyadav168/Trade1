'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Search, Filter, BarChart3, Target, Eye, Star, Clock, Activity, DollarSign, Zap, Info } from 'lucide-react'
import AISuggestionButton from '../AISuggestionButton'
import DetailedInfoModal from '../DetailedInfoModal'
import OrderModal from './OrderModal';

export default function EnhancedStockSearch() {
  const [stocks, setStocks] = useState([])
  const [filteredStocks, setFilteredStocks] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('search')
  const [filters, setFilters] = useState({
    sector: 'all',
    marketCap: 'all',
    priceRange: 'all',
    searchTerm: '',
    performance: 'all',
    volume: 'all'
  })
  const [sortBy, setSortBy] = useState('volume')
  const [orderModal, setOrderModal] = useState({ open: false, stock: null, type: 'BUY' });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [chartModal, setChartModal] = useState({ open: false, stock: null });

  // Enhanced stock data with more options
  const stockData = [
    {
      id: 1,
      symbol: "RELIANCE",
      name: "Reliance Industries Ltd",
      price: 2456.75,
      change: 45.30,
      changePercent: 1.88,
      volume: 2850000,
      marketCap: 1665000,
      sector: "Energy",
      pe: 24.5,
      pb: 2.1,
      roe: 12.5,
      week52High: 2856.15,
      week52Low: 2101.35,
      dayHigh: 2478.90,
      dayLow: 2435.60,
      avgVolume: 2200000,
      dividend: 1.2,
      beta: 1.15,
      eps: 100.25,
      bookValue: 1168.45
    },
    {
      id: 2,
      symbol: "TCS",
      name: "Tata Consultancy Services",
      price: 3698.50,
      change: -28.75,
      changePercent: -0.77,
      volume: 1650000,
      marketCap: 1356000,
      sector: "IT Services",
      pe: 28.2,
      pb: 12.8,
      roe: 45.2,
      week52High: 4259.75,
      week52Low: 3311.00,
      dayHigh: 3725.30,
      dayLow: 3685.40,
      avgVolume: 1400000,
      dividend: 2.8,
      beta: 0.85,
      eps: 131.15,
      bookValue: 289.25
    },
    {
      id: 3,
      symbol: "HDFCBANK",
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
      dayHigh: 1578.90,
      dayLow: 1552.30,
      avgVolume: 2800000,
      dividend: 1.5,
      beta: 1.05,
      eps: 84.75,
      bookValue: 560.25
    },
    {
      id: 4,
      symbol: "BHARTIARTL",
      name: "Bharti Airtel Ltd",
      price: 1256.40,
      change: 32.60,
      changePercent: 2.66,
      volume: 2100000,
      marketCap: 732000,
      sector: "Telecom",
      pe: 45.2,
      pb: 6.8,
      roe: 15.2,
      week52High: 1349.00,
      week52Low: 900.75,
      dayHigh: 1268.90,
      dayLow: 1235.20,
      avgVolume: 1800000,
      dividend: 0.8,
      beta: 1.25,
      eps: 27.80,
      bookValue: 184.75
    },
    {
      id: 5,
      symbol: "WIPRO",
      name: "Wipro Ltd",
      price: 485.60,
      change: 8.90,
      changePercent: 1.87,
      volume: 1450000,
      marketCap: 268000,
      sector: "IT Services",
      pe: 22.8,
      pb: 2.9,
      roe: 12.8,
      week52High: 578.45,
      week52Low: 385.50,
      dayHigh: 492.30,
      dayLow: 478.20,
      avgVolume: 1200000,
      dividend: 2.1,
      beta: 0.95,
      eps: 21.30,
      bookValue: 167.45
    },
    {
      id: 6,
      symbol: "ADANIPORTS",
      name: "Adani Ports & SEZ Ltd",
      price: 798.25,
      change: -15.40,
      changePercent: -1.89,
      volume: 1850000,
      marketCap: 172000,
      sector: "Infrastructure",
      pe: 28.5,
      pb: 3.2,
      roe: 11.5,
      week52High: 1621.40,
      week52Low: 678.90,
      dayHigh: 815.60,
      dayLow: 789.30,
      avgVolume: 1600000,
      dividend: 0.9,
      beta: 1.45,
      eps: 28.05,
      bookValue: 249.45
    },
    {
      id: 7,
      symbol: "MARUTI",
      name: "Maruti Suzuki India Ltd",
      price: 11245.80,
      change: 185.60,
      changePercent: 1.68,
      volume: 450000,
      marketCap: 340000,
      sector: "Automotive",
      pe: 26.8,
      pb: 3.8,
      roe: 14.2,
      week52High: 12350.00,
      week52Low: 8901.50,
      dayHigh: 11298.75,
      dayLow: 11189.40,
      avgVolume: 380000,
      dividend: 1.6,
      beta: 1.10,
      eps: 419.75,
      bookValue: 2959.80
    },
    {
      id: 8,
      symbol: "SBIN",
      name: "State Bank of India",
      price: 678.90,
      change: -8.25,
      changePercent: -1.20,
      volume: 4500000,
      marketCap: 606000,
      sector: "Banking",
      pe: 12.5,
      pb: 1.2,
      roe: 9.8,
      week52High: 912.75,
      week52Low: 543.25,
      dayHigh: 689.60,
      dayLow: 672.30,
      avgVolume: 3800000,
      dividend: 2.2,
      beta: 1.35,
      eps: 54.30,
      bookValue: 565.75
    },
    {
      id: 9,
      symbol: "TECHM",
      name: "Tech Mahindra Ltd",
      price: 1456.30,
      change: 25.70,
      changePercent: 1.80,
      volume: 950000,
      marketCap: 143000,
      sector: "IT Services",
      pe: 35.2,
      pb: 4.1,
      roe: 11.6,
      week52High: 1675.85,
      week52Low: 1098.15,
      dayHigh: 1468.90,
      dayLow: 1442.20,
      avgVolume: 800000,
      dividend: 1.8,
      beta: 1.05,
      eps: 41.40,
      bookValue: 355.20
    },
    {
      id: 10,
      symbol: "SUNPHARMA",
      name: "Sun Pharmaceutical Industries",
      price: 1689.45,
      change: 42.80,
      changePercent: 2.60,
      volume: 1250000,
      marketCap: 405000,
      sector: "Pharmaceuticals",
      pe: 38.5,
      pb: 5.2,
      roe: 13.5,
      week52High: 1742.90,
      week52Low: 1136.35,
      dayHigh: 1698.75,
      dayLow: 1665.20,
      avgVolume: 1000000,
      dividend: 1.4,
      beta: 0.85,
      eps: 43.85,
      bookValue: 324.90
    }
  ]

  useEffect(() => {
    setStocks(stockData)
    setFilteredStocks(stockData)
  }, [])

  const handleInfoClick = (stock) => {
    setSelectedInfo(stock)
    setInfoModalOpen(true)
  }

  useEffect(() => {
    let filtered = stocks.filter(stock => {
      const matchesSector = filters.sector === 'all' || stock.sector === filters.sector
      const matchesMarketCap = filters.marketCap === 'all' ||
        (filters.marketCap === 'large' && stock.marketCap > 200000) ||
        (filters.marketCap === 'mid' && stock.marketCap >= 50000 && stock.marketCap <= 200000) ||
        (filters.marketCap === 'small' && stock.marketCap < 50000)
      const matchesPrice = filters.priceRange === 'all' ||
        (filters.priceRange === 'under100' && stock.price < 100) ||
        (filters.priceRange === '100to1000' && stock.price >= 100 && stock.price <= 1000) ||
        (filters.priceRange === 'over1000' && stock.price > 1000)
      const matchesSearch = stock.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           stock.symbol.toLowerCase().includes(filters.searchTerm.toLowerCase())
      const matchesPerformance = filters.performance === 'all' ||
        (filters.performance === 'gainers' && stock.changePercent > 0) ||
        (filters.performance === 'losers' && stock.changePercent < 0)
      const matchesVolume = filters.volume === 'all' ||
        (filters.volume === 'high' && stock.volume > 2000000) ||
        (filters.volume === 'low' && stock.volume <= 2000000)
      
      return matchesSector && matchesMarketCap && matchesPrice && matchesSearch && matchesPerformance && matchesVolume
    })

    // Sort stocks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return b.volume - a.volume
        case 'performance':
          return b.changePercent - a.changePercent
        case 'marketCap':
          return b.marketCap - a.marketCap
        case 'price':
          return b.price - a.price
        case 'pe':
          return a.pe - b.pe
        default:
          return 0
      }
    })

    setFilteredStocks(filtered)
  }, [stocks, filters, sortBy])

  const addToWatchlist = (stock) => {
    if (!watchlist.find(item => item.id === stock.id)) {
      setWatchlist([...watchlist, stock])
    }
  }

  const removeFromWatchlist = (stockId) => {
    setWatchlist(watchlist.filter(item => item.id !== stockId))
  }

  const getSectorColor = (sector) => {
    const colors = {
      'IT Services': 'text-blue-600 bg-blue-100',
      'Banking': 'text-green-600 bg-green-100',
      'Energy': 'text-orange-600 bg-orange-100',
      'Telecom': 'text-purple-600 bg-purple-100',
      'Infrastructure': 'text-gray-600 bg-gray-100',
      'Automotive': 'text-red-600 bg-red-100',
      'Pharmaceuticals': 'text-pink-600 bg-pink-100'
    }
    return colors[sector] || 'text-gray-600 bg-gray-100'
  }

  const formatVolume = (volume) => {
    if (volume >= 10000000) return `${(volume / 10000000).toFixed(1)}Cr`
    if (volume >= 100000) return `${(volume / 100000).toFixed(1)}L`
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`
    return volume.toString()
  }

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 100000) return `₹${(marketCap / 100000).toFixed(1)}L Cr`
    if (marketCap >= 1000) return `₹${(marketCap / 1000).toFixed(1)}K Cr`
    return `₹${marketCap} Cr`
  }

  const StockCard = ({ stock, isWatchlist = false }) => (
    <div className="card p-6 hover:shadow-lg transition-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Stock Info */}
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{stock.symbol}</h3>
              <p className="text-sm text-gray-600 mb-2">{stock.name}</p>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getSectorColor(stock.sector)}`}>
                {stock.sector}
              </span>
            </div>
            <button
              onClick={() => isWatchlist ? removeFromWatchlist(stock.id) : addToWatchlist(stock)}
              className={`p-2 rounded-full ${isWatchlist ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'}`}
            >
              <Star className={`h-4 w-4 ${isWatchlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Market Cap:</span>
              <span className="font-medium ml-1 block">{formatMarketCap(stock.marketCap)}</span>
            </div>
            <div>
              <span className="text-gray-600">P/E Ratio:</span>
              <span className="font-medium ml-1 block">{stock.pe}</span>
            </div>
          </div>
        </div>

        {/* Price & Change */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Current Price</h4>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">
              ₹{stock.price.toLocaleString()}
            </div>
            <div className={`flex items-center text-sm font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock.change >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {stock.change >= 0 ? '+' : ''}₹{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent}%)
            </div>
          </div>
        </div>

        {/* Day Range */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Day Range</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">High:</span>
              <span className="font-medium">₹{stock.dayHigh.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Low:</span>
              <span className="font-medium">₹{stock.dayLow.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Volume:</span>
              <span className="font-medium">{formatVolume(stock.volume)}</span>
            </div>
          </div>
        </div>

        {/* Fundamentals */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Key Metrics</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">P/B:</span>
              <span className="font-medium">{stock.pb}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ROE:</span>
              <span className="font-medium">{stock.roe}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">EPS:</span>
              <span className="font-medium">₹{stock.eps}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Dividend:</span>
              <span className="font-medium">{stock.dividend}%</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col space-y-3">
          <button
            className="btn-primary flex items-center justify-center"
            onClick={() => setOrderModal({ open: true, stock, type: 'BUY' })}
          >
            <Target className="h-4 w-4 mr-2" />
            Buy
          </button>
          <button
            className="btn-secondary flex items-center justify-center"
            onClick={() => setOrderModal({ open: true, stock, type: 'SELL' })}
          >
            <Zap className="h-4 w-4 mr-2" />
            Sell
          </button>
          <button 
            onClick={() => handleInfoClick(stock)}
            className="btn-secondary flex items-center justify-center"
          >
            <Info className="h-4 w-4 mr-2" />
            Detailed Info
          </button>
          <AISuggestionButton data={stock} type="stock" />
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center"
            onClick={() => setChartModal({ open: true, stock })}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            View Chart
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header with Tabs */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Stock Explorer</h2>
            <p className="text-gray-600">Discover and analyze stocks with advanced filtering and research tools</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 lg:mt-0">
            <button
              onClick={() => setActiveTab('search')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'search' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Stock Search
            </button>
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'watchlist' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Watchlist ({watchlist.length})
            </button>
          </div>
        </div>

        {/* Filters (only show on search tab) */}
        {activeTab === 'search' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    value={filters.searchTerm}
                    onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                    className="pl-10 input-field text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                <select
                  value={filters.sector}
                  onChange={(e) => setFilters(prev => ({ ...prev, sector: e.target.value }))}
                  className="input-field text-sm"
                >
                  <option value="all">All Sectors</option>
                  <option value="IT Services">IT Services</option>
                  <option value="Banking">Banking</option>
                  <option value="Energy">Energy</option>
                  <option value="Telecom">Telecom</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Pharmaceuticals">Pharmaceuticals</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Market Cap</label>
                <select
                  value={filters.marketCap}
                  onChange={(e) => setFilters(prev => ({ ...prev, marketCap: e.target.value }))}
                  className="input-field text-sm"
                >
                  <option value="all">All Caps</option>
                  <option value="large">Large Cap (&gt;&#8377;2L Cr)</option>
                  <option value="mid">Mid Cap (&#8377;50K-2L Cr)</option>
                  <option value="small">Small Cap (&lt;&#8377;50K Cr)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="input-field text-sm"
                >
                  <option value="all">All Prices</option>
                  <option value="under100">Under ₹100</option>
                  <option value="100to1000">₹100 - ₹1000</option>
                  <option value="over1000">Over ₹1000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Performance</label>
                <select
                  value={filters.performance}
                  onChange={(e) => setFilters(prev => ({ ...prev, performance: e.target.value }))}
                  className="input-field text-sm"
                >
                  <option value="all">All Stocks</option>
                  <option value="gainers">Gainers</option>
                  <option value="losers">Losers</option>
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
                  <option value="performance">Performance</option>
                  <option value="marketCap">Market Cap</option>
                  <option value="price">Price</option>
                  <option value="pe">P/E Ratio</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stock List */}
      <div className="space-y-4">
        {activeTab === 'search' ? (
          filteredStocks.length > 0 ? (
            filteredStocks.map((stock) => (
              <StockCard key={stock.id} stock={stock} />
            ))
          ) : (
            <div className="card p-12 text-center">
              <div className="text-gray-500 mb-4">
                <Search className="h-12 w-12 mx-auto opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results</p>
            </div>
          )
        ) : (
          watchlist.length > 0 ? (
            watchlist.map((stock) => (
              <StockCard key={stock.id} stock={stock} isWatchlist={true} />
            ))
          ) : (
            <div className="card p-12 text-center">
              <div className="text-gray-500 mb-4">
                <Star className="h-12 w-12 mx-auto opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your watchlist is empty</h3>
              <p className="text-gray-600">Add stocks to your watchlist to track them here</p>
              <button
                onClick={() => setActiveTab('search')}
                className="btn-primary mt-4"
              >
                Browse Stocks
              </button>
            </div>
          )
        )}
      </div>

      {/* Detailed Info Modal */}
      <DetailedInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        data={selectedInfo}
        type="stock"
      />
      <OrderModal
        isOpen={orderModal.open}
        onClose={() => setOrderModal({ open: false, stock: null, type: 'BUY' })}
        stock={orderModal.stock}
        transactionType={orderModal.type}
        onSuccess={() => {
          setOrderModal({ open: false, stock: null, type: 'BUY' });
          setOrderSuccess(true);
          setTimeout(() => setOrderSuccess(false), 2000);
        }}
      />
      {orderSuccess && (
        <div className="fixed bottom-8 right-8 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
          Order placed successfully!
        </div>
      )}
      {/* Chart Modal */}
      {chartModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in-up">
            <button
              onClick={() => setChartModal({ open: false, stock: null })}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-blue-700">{chartModal.stock?.symbol} Chart</span>
            </div>
            <div className="h-64 flex items-center justify-center bg-blue-50 rounded-lg">
              {/* Placeholder chart - replace with real chart as needed */}
              <span className="text-gray-500">[Chart for {chartModal.stock?.symbol}]</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
