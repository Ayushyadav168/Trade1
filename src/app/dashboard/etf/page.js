'use client'

import { useState } from 'react'
import { Search, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar'
import Stats from '../../../components/Stats';
import Testimonials from '../../../components/Testimonials';
import Features from '../../../components/Features';

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
      <Stats />
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
              <ETFExplorer />
              <Features />
            </div>
          </div>
        </div>
        <Testimonials />
      </main>
    </div>
  )
}
