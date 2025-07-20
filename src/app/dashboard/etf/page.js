'use client'

import { useState } from 'react'
import { Search, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar'

export default function ETF() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedETF, setSelectedETF] = useState(null)

  // Mock ETF data
  const etfs = [
    {
      id: 1,
      symbol: 'NIFTYBEES',
      name: 'Nippon India ETF Nifty BeES',
      nav: 198.45,
      change: 2.15,
      changePercent: 1.09,
      volume: '4.2M',
      aum: '8,500 Cr',
      expense: 0.05,
      tracking: 'NIFTY 50',
    },
    {
      id: 2,
      symbol: 'BANKBEES',
      name: 'Nippon India ETF Bank BeES',
      nav: 452.80,
      change: -3.20,
      changePercent: -0.70,
      volume: '2.1M',
      aum: '3,200 Cr',
      expense: 0.06,
      tracking: 'NIFTY Bank',
    },
    {
      id: 3,
      symbol: 'GOLDSHARE',
      name: 'Nippon India ETF Gold BeES',
      nav: 45.67,
      change: 0.85,
      changePercent: 1.90,
      volume: '1.8M',
      aum: '2,800 Cr',
      expense: 0.25,
      tracking: 'Gold Price',
    },
    {
      id: 4,
      symbol: 'ITBEES',
      name: 'Nippon India ETF IT BeES',
      nav: 89.23,
      change: 1.45,
      changePercent: 1.65,
      volume: '1.5M',
      aum: '1,900 Cr',
      expense: 0.05,
      tracking: 'NIFTY IT',
    },
  ]

  const filteredETFs = etfs.filter(etf =>
    etf.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    etf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    etf.tracking.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ETF Trading</h1>
          <p className="mt-2 text-gray-600">Trade Exchange Traded Funds with low expense ratios</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ETF List */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Available ETFs</h2>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search ETFs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredETFs.map((etf) => (
                  <div
                    key={etf.id}
                    onClick={() => setSelectedETF(etf)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedETF?.id === etf.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium text-gray-900">{etf.symbol}</h3>
                          <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                            ETF
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{etf.name}</p>
                        <p className="text-xs text-gray-500">Tracks: {etf.tracking}</p>
                        
                        <div className="mt-3 grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">NAV</p>
                            <p className="font-medium">₹{etf.nav}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Volume</p>
                            <p className="font-medium">{etf.volume}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">AUM</p>
                            <p className="font-medium">₹{etf.aum}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Expense</p>
                            <p className="font-medium">{etf.expense}%</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">₹{etf.nav}</p>
                        <p className={`text-sm flex items-center justify-end ${
                          etf.change >= 0 ? 'text-success' : 'text-danger'
                        }`}>
                          {etf.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          ₹{Math.abs(etf.change)} ({etf.changePercent}%)
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
            {selectedETF ? (
              <div className="card p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Trade {selectedETF.symbol}</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900">{selectedETF.name}</h4>
                    <p className="text-sm text-gray-600">Tracking: {selectedETF.tracking}</p>
                    <p className="text-xl font-semibold text-gray-900 mt-2">₹{selectedETF.nav}</p>
                    <p className={`text-sm ${selectedETF.change >= 0 ? 'text-success' : 'text-danger'}`}>
                      {selectedETF.change >= 0 ? '+' : ''}₹{selectedETF.change} ({selectedETF.changePercent}%)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Type
                    </label>
                    <select className="input-field">
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Type
                    </label>
                    <select className="input-field">
                      <option value="MARKET">Market</option>
                      <option value="LIMIT">Limit</option>
                    </select>
                  </div>

                  <button className="w-full btn-primary">
                    Place Order
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-6">
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Select an ETF to start trading</p>
                </div>
              </div>
            )}

            {/* ETF Information */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">What are ETFs?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  Exchange Traded Funds (ETFs) are investment funds that track an index, 
                  commodity, bonds, or a basket of assets like an index fund.
                </p>
                <p>
                  <strong>Benefits:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Low expense ratios (typically 0.05% - 0.5%)</li>
                  <li>High liquidity - trade like stocks</li>
                  <li>Diversification across multiple assets</li>
                  <li>Transparent holdings</li>
                  <li>Tax efficiency</li>
                </ul>
              </div>
            </div>

            {/* Market Summary */}
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">ETF Market Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total ETFs Listed</span>
                  <span className="font-semibold">40+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total AUM</span>
                  <span className="font-semibold">₹25,000 Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Expense Ratio</span>
                  <span className="font-semibold">0.15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Most Popular</span>
                  <span className="font-semibold">NIFTYBEES</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
