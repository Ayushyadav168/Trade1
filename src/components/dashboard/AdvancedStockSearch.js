'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, TrendingUp, TrendingDown, Star, Eye, Plus } from 'lucide-react'
import OrderModal from '../trading/OrderModal';
import DetailedInfoModal from '../DetailedInfoModal';
import AISuggestionButton from '../AISuggestionButton';

export default function AdvancedStockSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('volume')
  const [filterBy, setFilterBy] = useState('all')
  const [watchlist, setWatchlist] = useState([])
  const [orderModal, setOrderModal] = useState({ open: false, stock: null, type: 'BUY' });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [chartModal, setChartModal] = useState({ open: false, stock: null });
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);
  
  // Enhanced mock stock data with more details
  const stocks = [
    {
      symbol: 'RELIANCE',
      name: 'Reliance Industries Ltd',
      price: 2520.45,
      change: 25.30,
      changePercent: 1.01,
      volume: '2.5M',
      marketCap: '17,05,000 Cr',
      pe: 24.5,
      sector: 'Oil & Gas',
      high52Week: 2856.15,
      low52Week: 2106.85,
      dividendYield: 0.35,
      ema20: 2485.20,
      ema50: 2445.60,
      rsi: 65.4,
    },
    {
      symbol: 'TCS',
      name: 'Tata Consultancy Services',
      price: 3180.80,
      change: -15.20,
      changePercent: -0.48,
      volume: '1.8M',
      marketCap: '11,55,000 Cr',
      pe: 28.2,
      sector: 'IT',
      high52Week: 4043.90,
      low52Week: 2880.05,
      dividendYield: 1.42,
      ema20: 3165.45,
      ema50: 3298.75,
      rsi: 42.8,
    },
    {
      symbol: 'INFY',
      name: 'Infosys Limited',
      price: 1485.60,
      change: 28.45,
      changePercent: 1.95,
      volume: '3.2M',
      marketCap: '6,15,000 Cr',
      pe: 25.8,
      sector: 'IT',
      high52Week: 1924.90,
      low52Week: 1259.40,
      dividendYield: 2.15,
      ema20: 1468.30,
      ema50: 1445.80,
      rsi: 72.1,
    },
    {
      symbol: 'HDFCBANK',
      name: 'HDFC Bank Limited',
      price: 1523.75,
      change: 12.80,
      changePercent: 0.85,
      volume: '1.5M',
      marketCap: '11,45,000 Cr',
      pe: 18.6,
      sector: 'Banking',
      high52Week: 1794.50,
      low52Week: 1318.00,
      dividendYield: 1.05,
      ema20: 1510.25,
      ema50: 1495.60,
      rsi: 58.9,
    },
    {
      symbol: 'ICICIBANK',
      name: 'ICICI Bank Limited',
      price: 945.30,
      change: -8.70,
      changePercent: -0.91,
      volume: '2.1M',
      marketCap: '6,60,000 Cr',
      pe: 15.4,
      sector: 'Banking',
      high52Week: 1257.65,
      low52Week: 788.05,
      dividendYield: 0.75,
      ema20: 952.15,
      ema50: 968.40,
      rsi: 44.2,
    },
  ]

  const filteredStocks = stocks
    .filter(stock => {
      const matchesSearch = stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      if (filterBy === 'all') return matchesSearch
      if (filterBy === 'gainers') return matchesSearch && stock.change > 0
      if (filterBy === 'losers') return matchesSearch && stock.change < 0
      if (filterBy === 'high-volume') return matchesSearch && parseFloat(stock.volume) > 2
      
      return matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return parseFloat(b.volume) - parseFloat(a.volume)
        case 'change':
          return b.changePercent - a.changePercent
        case 'price':
          return b.price - a.price
        case 'marketcap':
          return parseFloat(b.marketCap.replace(/[^0-9]/g, '')) - parseFloat(a.marketCap.replace(/[^0-9]/g, ''))
        default:
          return 0
      }
    })

  const toggleWatchlist = (symbol) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    )
  }

  const getTechnicalSignal = (stock) => {
    const { price, ema20, ema50, rsi } = stock
    
    if (price > ema20 && ema20 > ema50 && rsi < 70) {
      return { signal: 'BUY', color: 'text-green-600', bg: 'bg-green-100' }
    } else if (price < ema20 && ema20 < ema50 && rsi > 30) {
      return { signal: 'SELL', color: 'text-red-600', bg: 'bg-red-100' }
    } else {
      return { signal: 'HOLD', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    }
  }

  return (
    <div className="card p-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">Stock Screener</h2>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-full sm:w-64"
            />
          </div>
          
          {/* Filter */}
          <select 
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="input-field w-full sm:w-40"
          >
            <option value="all">All Stocks</option>
            <option value="gainers">Top Gainers</option>
            <option value="losers">Top Losers</option>
            <option value="high-volume">High Volume</option>
          </select>
          
          {/* Sort */}
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field w-full sm:w-40"
          >
            <option value="volume">Volume</option>
            <option value="change">% Change</option>
            <option value="price">Price</option>
            <option value="marketcap">Market Cap</option>
          </select>
        </div>
      </div>

      {/* Stock List */}
      <div className="space-y-4 custom-scrollbar max-h-[600px] overflow-y-auto">
        {filteredStocks.map((stock) => {
          const technicalSignal = getTechnicalSignal(stock)
          const isInWatchlist = watchlist.includes(stock.symbol)
          
          return (
            <div key={stock.symbol} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                {/* Stock Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{stock.symbol}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${technicalSignal.bg} ${technicalSignal.color}`}>
                      {technicalSignal.signal}
                    </span>
                    <button
                      onClick={() => toggleWatchlist(stock.symbol)}
                      className={`p-1 rounded-full transition-colors ${
                        isInWatchlist ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Star className={`h-4 w-4 ${isInWatchlist ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{stock.name}</p>
                  <div className="text-xs text-gray-500">{stock.sector}</div>
                </div>

                {/* Price Info */}
                <div className="text-right">
                  <p className="text-xl font-semibold text-gray-900">₹{stock.price.toLocaleString()}</p>
                  <p className={`text-sm font-medium flex items-center justify-end ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {stock.change >= 0 ? '+' : ''}₹{stock.change} ({stock.changePercent}%)
                  </p>
                </div>
              </div>

              {/* Extended Info Grid */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Volume</p>
                  <p className="font-medium">{stock.volume}</p>
                </div>
                <div>
                  <p className="text-gray-500">Market Cap</p>
                  <p className="font-medium">₹{stock.marketCap}</p>
                </div>
                <div>
                  <p className="text-gray-500">P/E Ratio</p>
                  <p className="font-medium">{stock.pe}</p>
                </div>
                <div>
                  <p className="text-gray-500">52W High</p>
                  <p className="font-medium">₹{stock.high52Week}</p>
                </div>
                <div>
                  <p className="text-gray-500">52W Low</p>
                  <p className="font-medium">₹{stock.low52Week}</p>
                </div>
                <div>
                  <p className="text-gray-500">RSI</p>
                  <p className={`font-medium ${
                    stock.rsi > 70 ? 'text-red-600' : stock.rsi < 30 ? 'text-green-600' : 'text-gray-900'
                  }`}>
                    {stock.rsi}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => setOrderModal({ open: true, stock, type: 'BUY' })}
                >
                  Buy
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  onClick={() => setOrderModal({ open: true, stock, type: 'SELL' })}
                >
                  Sell
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                  onClick={() => setChartModal({ open: true, stock })}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Chart
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
                  onClick={() => { setSelectedInfo(stock); setInfoModalOpen(true); }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Detailed Info
                </button>
                <AISuggestionButton data={stock} type="stock" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Stocks</p>
          <p className="text-lg font-semibold text-gray-900">{filteredStocks.length}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Gainers</p>
          <p className="text-lg font-semibold text-green-600">
            {filteredStocks.filter(s => s.change > 0).length}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Losers</p>
          <p className="text-lg font-semibold text-red-600">
            {filteredStocks.filter(s => s.change < 0).length}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Watchlist</p>
          <p className="text-lg font-semibold text-blue-600">{watchlist.length}</p>
        </div>
      </div>
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
              <Eye className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-blue-700">{chartModal.stock?.symbol} Chart</span>
            </div>
            <div className="h-64 flex items-center justify-center bg-blue-50 rounded-lg">
              {/* Placeholder chart - replace with real chart as needed */}
              <span className="text-gray-500">[Chart for {chartModal.stock?.symbol}]</span>
            </div>
          </div>
        </div>
      )}
      <DetailedInfoModal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        data={selectedInfo}
        type="stock"
      />
    </div>
  )
}
