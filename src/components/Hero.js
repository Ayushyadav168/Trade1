'use client'

import { SignUpButton } from '@clerk/nextjs'
import { ArrowRight, Play, Shield, Zap, BarChart3 } from 'lucide-react'
import { useState } from 'react';

export default function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              {/* Announcement */}
              <div className="mb-8">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  Zero brokerage on your first 10 trades
                </div>
              </div>

              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Trade Smarter</span>
                <span className="block text-blue-600">Invest Better</span>
              </h1>
              
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Experience seamless trading with our advanced platform. Trade stocks, mutual funds, and ETFs 
                with real-time data, zero hidden fees, and bank-grade security.
              </p>
              
              {/* Trust indicators */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                  <Shield className="h-6 w-6 text-blue-600 mb-2 lg:mb-0 lg:mr-2" />
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Bank-grade</div>
                    <div className="text-sm text-gray-500">Security</div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                  <Zap className="h-6 w-6 text-blue-600 mb-2 lg:mb-0 lg:mr-2" />
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Lightning</div>
                    <div className="text-sm text-gray-500">Fast Orders</div>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                  <BarChart3 className="h-6 w-6 text-blue-600 mb-2 lg:mb-0 lg:mr-2" />
                  <div>
                    <div className="text-lg font-semibold text-gray-900">Real-time</div>
                    <div className="text-sm text-gray-500">Market Data</div>
                  </div>
                </div>
              </div>

              <div className="mt-10 sm:mt-12 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <SignUpButton mode="modal">
                    <button className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105">
                      Start Trading Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </SignUpButton>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    className="w-full flex items-center justify-center px-8 py-4 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 md:text-lg md:px-10 transition-all duration-200"
                    onClick={() => setDemoOpen(true)}
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </button>
                </div>
              </div>

              {/* Social proof */}
              <div className="mt-8 text-sm text-gray-500 sm:text-center lg:text-left">
                Trusted by <span className="font-semibold text-gray-900">50,000+</span> traders across India
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Right side with trading interface mockup */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center relative overflow-hidden">
          {/* Mock trading interface */}
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10 text-white p-8 max-w-sm">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Portfolio Value</h3>
                <div className="text-green-400 text-sm">+12.5%</div>
              </div>
              <div className="text-3xl font-bold mb-4">₹2,45,680</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="opacity-75">Today's P&L</span>
                  <span className="text-green-400">+₹3,250</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-75">Total Returns</span>
                  <span className="text-green-400">+₹28,680</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        </div>
      </div>
      {/* Demo Video Modal */}
      {demoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full relative">
            <button
              onClick={() => setDemoOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
                title="TradePro - Complete Investment Platform Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-b-lg"
              ></iframe>
            </div>
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <h3 className="text-xl font-bold mb-3 text-gray-900">🚀 Complete Investment Platform Demo</h3>
              <p className="text-gray-700 text-sm mb-4">
                Discover how TradePro revolutionizes your investment journey with AI-powered insights, 
                comprehensive property management, and seamless trading experience. Watch how our platform 
                combines stocks, mutual funds, ETFs, and real estate investments in one powerful interface.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Property Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Expert Consultations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Zero Brokerage Trading</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
