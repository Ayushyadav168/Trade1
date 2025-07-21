'use client'

import React from 'react'
import { SignIn } from '@clerk/nextjs'
import { Crown, Star, TrendingUp, Shield } from 'lucide-react'

export default function EnhancedSignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Marketing Content */}
        <div className="hidden lg:block space-y-8 p-8">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Crown className="h-4 w-4" />
              PREMIUM INVESTMENT PLATFORM
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your Gateway to 
              <span className="text-gradient block">Wealth Creation</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Join 50,000+ successful investors who trust TradePro for their complete investment journey.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-2">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Smart Investments</h3>
                <p className="text-gray-600 text-sm">AI-powered stock, mutual fund & property investments</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-2">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Bank-Grade Security</h3>
                <p className="text-gray-600 text-sm">256-bit SSL encryption & multi-factor authentication</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-2">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Expert Guidance</h3>
                <p className="text-gray-600 text-sm">Personal advisors & premium research reports</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start gap-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=60&h=60"
                alt="Customer"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-gray-700 italic mb-2">
                  "TradePro transformed my investment strategy. The AI recommendations and expert guidance helped me achieve 89% returns in just 18 months."
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Rajesh Kumar</span>
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Gold Member</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-xs text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">₹250Cr+</div>
              <div className="text-xs text-gray-600">Assets Managed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.8★</div>
              <div className="text-xs text-gray-600">App Rating</div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">TradePro</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to access your investment dashboard</p>
              </div>

              {/* Enhanced Sign In Component */}
              <div className="clerk-sign-in-wrapper">
                <SignIn 
                  routing="hash"
                  signUpUrl="/sign-up"
                  appearance={{
                    elements: {
                      formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg',
                      card: 'bg-transparent shadow-none border-none',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      socialButtonsBlockButton: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200',
                      formFieldInput: 'border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg',
                      footerActionLink: 'text-blue-600 hover:text-blue-700 font-medium'
                    },
                    variables: {
                      colorPrimary: '#2563eb',
                      colorText: '#1f2937',
                      colorTextSecondary: '#6b7280',
                      borderRadius: '0.75rem'
                    }
                  }}
                />
              </div>

              {/* Additional Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600">
                  <p className="mb-2">🎁 <strong>Welcome Bonus:</strong> Get ₹1,000 + Zero Brokerage</p>
                  <p>🔒 <strong>Secure Login:</strong> Your data is protected with enterprise-grade security</p>
                </div>
              </div>
            </div>

            {/* Mobile Features (shown only on mobile) */}
            <div className="lg:hidden mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">Smart AI Investments</span>
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">Bank-Grade Security</span>
                  </div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">Expert Guidance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}