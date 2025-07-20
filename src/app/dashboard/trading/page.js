'use client'

import { useState } from 'react'
import { Search, TrendingUp, TrendingDown, Plus, Minus, AlertTriangle, DollarSign } from 'lucide-react'
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar'
import { stocksData } from '@/data/stocksData'
import Stats from '../../../components/Stats';
import Testimonials from '../../../components/Testimonials';
import Features from '../../../components/Features';

export default function Trading() {
  const [activeTab, setActiveTab] = useState('buy')
  const [selectedStock, setSelectedStock] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [quantity, setQuantity] = useState('')
  const [orderType, setOrderType] = useState('market')
  const [price, setPrice] = useState('')
  const [accountType, setAccountType] = useState('demo') // demo or real

  const filteredStocks = stocksData.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePlaceOrder = () => {
    if (!selectedStock || !quantity) return
    
    const orderValue = selectedStock.price * parseInt(quantity)
    
    alert(`Order placed successfully!
    Stock: ${selectedStock.name}
    Type: ${activeTab.toUpperCase()}
    Quantity: ${quantity}
    Price: ₹${selectedStock.price}
    Total Value: ₹${orderValue.toLocaleString()}
    Account: ${accountType === 'demo' ? 'DEMO MONEY' : 'REAL MONEY'}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <Stats />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trading Hub
              </h1>
              <p className="mt-2 text-gray-600">Buy and sell stocks with real-time market data</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setAccountType('demo')}
                className={`px-4 py-2 rounded-lg font-medium ${accountType === 'demo' ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
              >
                Demo Trading
              </button>
              <button 
                onClick={() => setAccountType('real')}
                className={`px-4 py-2 rounded-lg font-medium ${accountType === 'real' ? 'bg-green-500 hover:bg-green-600' : ''}`}
              >
                Live Trading
              </button>
            </div>
          </div>
          {/* Account Type Alert */}
          <div className={`mt-4 p-4 rounded-lg border-l-4 ${
            accountType === 'demo' 
              ? 'bg-orange-50 border-orange-500' 
              : 'bg-green-50 border-green-500'
          }`}>
            <div className="flex items-center">
              <AlertTriangle className={`h-5 w-5 mr-3 ${
                accountType === 'demo' ? 'text-orange-500' : 'text-green-500'
              }`} />
              <p className={`font-medium ${
                accountType === 'demo' ? 'text-orange-800' : 'text-green-800'
              }`}>
                You are currently trading with {accountType === 'demo' ? 'DEMO MONEY' : 'REAL MONEY'}
              </p>
            </div>
            <p className={`text-sm mt-1 ${
              accountType === 'demo' ? 'text-orange-600' : 'text-green-600'
            }`}>
              {accountType === 'demo' 
                ? 'All trades are simulated and no real money will be involved.'
                : 'All trades will be executed with real money from your account.'
              }
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stock List */}
          <div className="lg:col-span-2">
            <div className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold text-gray-900">Market</span>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search stocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-2 border border-gray-300 rounded-md w-64"
                  />
                </div>
              </div>
              <div className="space-y-4">
                  {filteredStocks.slice(0, 20).map((stock) => (
                    <div
                      key={stock.symbol}
                      onClick={() => setSelectedStock(stock)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedStock?.symbol === stock.symbol
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{stock.symbol}</h3>
                          <p className="text-sm text-gray-600">{stock.name}</p>
                          <p className="text-xs text-gray-500">Sector: {stock.sector}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">₹{stock.price}</p>
                          <p className={`text-sm flex items-center justify-end ${
                            stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            ₹{Math.abs(stock.change)} ({stock.changePercent}%)
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          {/* Trading Panel */}
          <div className="space-y-6">
            {/* Order Form */}
            <div className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center mb-4">
                <DollarSign className="mr-2 h-5 w-5" />
                <span className="text-lg font-semibold text-gray-900">Quick Trade</span>
              </div>
              <div className="flex space-x-1 mb-6">
                <button
                  onClick={() => setActiveTab('buy')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium ${activeTab === 'buy' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Buy
                </button>
                <button
                  onClick={() => setActiveTab('sell')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium ${activeTab === 'sell' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <Minus className="h-4 w-4 mr-1" />
                  Sell
                </button>
              </div>
                {selectedStock ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{selectedStock.symbol}</h3>
                      <p className="text-sm text-gray-600">{selectedStock.name}</p>
                      <p className="text-xl font-semibold text-gray-900">₹{selectedStock.price}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-1">
                        Order Type
                      </label>
                      <select
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                      >
                        <option value="market">Market</option>
                        <option value="limit">Limit</option>
                        <option value="stop-loss">Stop Loss</option>
                      </select>
                    </div>
                    {orderType === 'limit' && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                          Price
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Enter price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                      </div>
                    )}
                    {/* Order Summary */}
                    {quantity && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Order Summary</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Stock:</span>
                            <span className="font-medium">{selectedStock.symbol}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quantity:</span>
                            <span className="font-medium">{quantity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-medium">₹{selectedStock.price}</span>
                          </div>
                          <div className="flex justify-between border-t pt-1">
                            <span>Total Value:</span>
                            <span className="font-medium">₹{(selectedStock.price * parseInt(quantity)).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    <p>Select a stock to start trading</p>
                  </div>
                )}
            </div>
          </div>
        </div>
        <Features />
        <Testimonials />
      </main>
    </div>
  )
}
