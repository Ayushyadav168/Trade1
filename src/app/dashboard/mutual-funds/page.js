'use client'

import { useState } from 'react'
import { Search, Star, TrendingUp, Calculator, Clock } from 'lucide-react'
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar'

export default function MutualFunds() {
  const [activeTab, setActiveTab] = useState('explore')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFund, setSelectedFund] = useState(null)

  // Mock mutual fund data
  const mutualFunds = [
    {
      id: 1,
      name: 'SBI Bluechip Fund',
      category: 'Large Cap',
      nav: 65.42,
      returns1Y: 12.5,
      returns3Y: 15.2,
      returns5Y: 11.8,
      expense: 1.95,
      rating: 4,
      minInvestment: 5000,
    },
    {
      id: 2,
      name: 'HDFC Top 100 Fund',
      category: 'Large Cap',
      nav: 758.32,
      returns1Y: 13.8,
      returns3Y: 16.1,
      returns5Y: 12.4,
      expense: 2.1,
      rating: 5,
      minInvestment: 5000,
    },
    {
      id: 3,
      name: 'Axis Midcap Fund',
      category: 'Mid Cap',
      nav: 89.15,
      returns1Y: 18.2,
      returns3Y: 22.5,
      returns5Y: 16.8,
      expense: 2.3,
      rating: 4,
      minInvestment: 5000,
    },
    {
      id: 4,
      name: 'Parag Parikh Flexi Cap',
      category: 'Flexi Cap',
      nav: 52.86,
      returns1Y: 15.6,
      returns3Y: 18.9,
      returns5Y: 14.2,
      expense: 1.8,
      rating: 5,
      minInvestment: 1000,
    },
  ]

  const myHoldings = [
    {
      id: 1,
      name: 'SBI Bluechip Fund',
      units: 152.34,
      avgNav: 58.20,
      currentNav: 65.42,
      invested: 8864.79,
      current: 9963.47,
      returns: 1098.68,
      returnsPercent: 12.39,
    },
    {
      id: 2,
      name: 'HDFC Top 100 Fund',
      units: 26.45,
      avgNav: 698.50,
      currentNav: 758.32,
      invested: 18475.32,
      current: 20057.37,
      returns: 1582.05,
      returnsPercent: 8.56,
    },
  ]

  const filteredFunds = mutualFunds.filter(fund =>
    fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fund.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderStarRating = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mutual Funds</h1>
          <p className="mt-2 text-gray-600">Invest in mutual funds with SIP and lump sum options</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('explore')}
            className={`py-2 px-4 text-sm font-medium rounded-lg ${
              activeTab === 'explore'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Explore Funds
          </button>
          <button
            onClick={() => setActiveTab('holdings')}
            className={`py-2 px-4 text-sm font-medium rounded-lg ${
              activeTab === 'holdings'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            My Holdings
          </button>
          <button
            onClick={() => setActiveTab('sip')}
            className={`py-2 px-4 text-sm font-medium rounded-lg ${
              activeTab === 'sip'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            SIP Calculator
          </button>
        </div>

        {/* Explore Funds Tab */}
        {activeTab === 'explore' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">All Mutual Funds</h2>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search funds..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredFunds.map((fund) => (
                    <div
                      key={fund.id}
                      onClick={() => setSelectedFund(fund)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedFund?.id === fund.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <h3 className="text-lg font-medium text-gray-900">{fund.name}</h3>
                            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {fund.category}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            {renderStarRating(fund.rating)}
                            <span className="ml-2 text-sm text-gray-600">({fund.rating}/5)</span>
                          </div>
                          <div className="mt-2 grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">NAV</p>
                              <p className="font-medium">₹{fund.nav}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">1Y Return</p>
                              <p className="font-medium text-success">{fund.returns1Y}%</p>
                            </div>
                            <div>
                              <p className="text-gray-500">3Y Return</p>
                              <p className="font-medium text-success">{fund.returns3Y}%</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Expense</p>
                              <p className="font-medium">{fund.expense}%</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Investment Panel */}
            <div className="space-y-6">
              {selectedFund ? (
                <div className="card p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Invest in {selectedFund.name}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Investment Type
                      </label>
                      <select className="input-field">
                        <option value="lumpsum">Lump Sum</option>
                        <option value="sip">SIP (Monthly)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount (Min: ₹{selectedFund.minInvestment})
                      </label>
                      <input
                        type="number"
                        placeholder={`Min ₹${selectedFund.minInvestment}`}
                        className="input-field"
                      />
                    </div>

                    <button className="w-full btn-primary">
                      Invest Now
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card p-6">
                  <div className="text-center py-8">
                    <p className="text-gray-500">Select a fund to start investing</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Holdings Tab */}
        {activeTab === 'holdings' && (
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">My MF Holdings</h2>
              
              {myHoldings.length > 0 ? (
                <div className="space-y-4">
                  {myHoldings.map((holding) => (
                    <div key={holding.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{holding.name}</h3>
                          <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Units</p>
                              <p className="font-medium">{holding.units}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Avg NAV</p>
                              <p className="font-medium">₹{holding.avgNav}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Current NAV</p>
                              <p className="font-medium">₹{holding.currentNav}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">₹{holding.current.toLocaleString()}</p>
                          <p className={`text-sm ${holding.returns >= 0 ? 'text-success' : 'text-danger'}`}>
                            {holding.returns >= 0 ? '+' : ''}₹{holding.returns.toFixed(2)} ({holding.returnsPercent}%)
                          </p>
                          <p className="text-xs text-gray-500">Invested: ₹{holding.invested.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No mutual fund holdings found</p>
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="mt-4 btn-primary"
                  >
                    Start Investing
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SIP Calculator Tab */}
        {activeTab === 'sip' && (
          <div className="max-w-2xl mx-auto">
            <div className="card p-6">
              <div className="flex items-center mb-6">
                <Calculator className="h-6 w-6 text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">SIP Calculator</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Investment Amount
                  </label>
                  <input
                    type="number"
                    placeholder="₹5,000"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    placeholder="12"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment Period (Years)
                  </label>
                  <input
                    type="number"
                    placeholder="10"
                    className="input-field"
                  />
                </div>

                <button className="w-full btn-primary">
                  Calculate Returns
                </button>

                {/* Results */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Total Investment</p>
                      <p className="text-xl font-bold text-gray-900">₹6,00,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Maturity Value</p>
                      <p className="text-xl font-bold text-success">₹11,61,695</p>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Total Returns</p>
                    <p className="text-2xl font-bold text-success">₹5,61,695</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
