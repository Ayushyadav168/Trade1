'use client'

import { useUser, SignOutButton } from '@clerk/nextjs'
import { Bell, Search, Menu, User, LogOut, Settings, TrendingUp, Lightbulb, Briefcase } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DashboardNavbar({ onBestInvestorsClick, onPortfolioClick }) {
  const { user } = useUser()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <TrendingUp className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TradeApp</span>
            </Link>
            
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link href="/dashboard" className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/dashboard/trading" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Trading
                </Link>
                <Link href="/dashboard/mutual-funds" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Mutual Funds
                </Link>
                <Link href="/dashboard/etf" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  ETF
                </Link>
                <Link href="/dashboard/portfolio" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Portfolio
                </Link>
                <Link href="/dashboard" onClick={() => window.location.hash = 'properties'} className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Properties
                </Link>
              </div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search stocks, MF, ETF..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Notifications */}
            <button className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Bell className="h-6 w-6" />
            </button>

            {/* Portfolio Button */}
            <button
              onClick={onPortfolioClick}
              className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold flex items-center gap-2 transition-colors"
              title="See Portfolio"
            >
              <Briefcase className="h-5 w-5" />
              Portfolio
            </button>

            {/* Best Investors Button */}
            <button
              onClick={onBestInvestorsClick}
              className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-white font-bold flex items-center gap-2 shadow-md hover:scale-105 hover:shadow-xl transition-all duration-200 border-2 border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              style={{ minWidth: '140px' }}
              title="See Best Investors"
            >
              <Lightbulb className="h-6 w-6 text-white drop-shadow" />
              Best Investors
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.imageUrl || '/default-avatar.png'}
                  alt={user?.firstName || 'User'}
                />
                <span className="ml-2 text-gray-700 text-sm font-medium hidden md:block">
                  {user?.firstName} {user?.lastName}
                </span>
              </button>

              {isProfileOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="mr-3 h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </Link>
                    <SignOutButton>
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </button>
                    </SignOutButton>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <Menu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
