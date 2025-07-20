'use client'

import { useState } from 'react'
import { useUser, SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import { TrendingUp, ChevronDown, User, Settings, LogOut, Menu, X, BarChart3, PieChart } from 'lucide-react'
import AuthModal from './auth/AuthModal'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signin' })
  const { isSignedIn, user } = useUser()

  const openAuthModal = (mode) => {
    setAuthModal({ isOpen: true, mode })
  }

  const closeAuthModal = () => {
    setAuthModal({ isOpen: false, mode: 'signin' })
  }

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">TradePro</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Home
                </Link>
                
                {/* Trading Dropdown */}
                <div className="relative group">
                  <button className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Trading
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link href="/stocks" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <BarChart3 className="h-4 w-4 mr-3" />
                      Stocks
                    </Link>
                    <Link href="/mutual-funds" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <PieChart className="h-4 w-4 mr-3" />
                      Mutual Funds
                    </Link>
                    <Link href="/dashboard/etf" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      <TrendingUp className="h-4 w-4 mr-3" />
                      ETFs
                    </Link>
                  </div>
                </div>

                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Dashboard
                </Link>
                <Link href="/ai-test" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  AI Test
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  About
                </Link>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {isSignedIn ? (
                  /* User Menu */
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <span className="font-medium">{user?.firstName || 'User'}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100">
                        <Link href="/dashboard" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <User className="h-4 w-4 mr-3" />
                          Dashboard
                        </Link>
                        <Link href="/dashboard/wallet" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <Wallet className="h-4 w-4 mr-3" />
                          Wallet
                        </Link>
                        <Link href="/settings" className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </Link>
                        <div className="border-t border-gray-100">
                          <SignOutButton>
                            <button className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors">
                              <LogOut className="h-4 w-4 mr-3" />
                              Sign Out
                            </button>
                          </SignOutButton>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Sign In/Up Buttons */
                  <>
                    <button
                      onClick={() => openAuthModal('signin')}
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => openAuthModal('signup')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Home
                </Link>
                <Link href="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Dashboard
                </Link>
                <Link href="/dashboard/trading" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Stocks
                </Link>
                <Link href="/dashboard/mutual-funds" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Mutual Funds
                </Link>
                <Link href="/dashboard/etf" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  ETFs
                </Link>
                <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  About
                </Link>
                
                {!isSignedIn && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <button
                      onClick={() => {
                        openAuthModal('signin')
                        setIsOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal('signup')
                        setIsOpen(false)
                      }}
                      className="block w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        mode={authModal.mode}
      />
    </>
  )
}
