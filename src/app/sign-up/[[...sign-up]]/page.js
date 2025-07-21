'use client'

import React from 'react'
import { SignUp } from '@clerk/nextjs'
import { Crown, Star, TrendingUp, Shield, Gift, Users, Award } from 'lucide-react'

export default function EnhancedSignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side - Sign Up Form */}
        <div className="flex items-center justify-center order-2 lg:order-1">
          <div className="w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold text-gray-900">TradePro</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Join TradePro Today</h2>
                <p className="text-gray-600">Start your wealth creation journey</p>
              </div>

              {/* Welcome Bonus Banner */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 mb-6 text-white text-center">
                <Gift className="h-6 w-6 mx-auto mb-2" />
                <div className="font-bold">Welcome Bonus: ₹1,000</div>
                <div className="text-sm opacity-90">+ Zero Brokerage for 10 trades</div>
              </div>

              {/* Enhanced Sign Up Component */}
              <div className="clerk-sign-up-wrapper">
                <SignUp 
                  routing="hash"
                  signInUrl="/sign-in"
                  appearance={{
                    elements: {
                      formButtonPrimary: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg',
                      card: 'bg-transparent shadow-none border-none',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      socialButtonsBlockButton: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200',
                      formFieldInput: 'border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg',
                      footerActionLink: 'text-green-600 hover:text-green-700 font-medium'
                    },
                    variables: {
                      colorPrimary: '#059669',
                      colorText: '#1f2937',
                      colorTextSecondary: '#6b7280',
                      borderRadius: '0.75rem'
                    }
                  }}
                />
              </div>

              {/* Security Assurance */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600">
                  <p className="mb-2">🛡️ <strong>100% Secure:</strong> Bank-grade encryption</p>
                  <p>⭐ <strong>Trusted by 50,000+</strong> successful investors</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits & Features */}
        <div className="space-y-8 p-8 order-1 lg:order-2">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Award className="h-4 w-4" />
              START YOUR SUCCESS STORY
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transform Your 
              <span className="text-gradient block">Financial Future</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Join India's most successful investment community and unlock premium features designed for serious wealth builders.
            </p>
          </div>

          {/* Membership Benefits */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Free Membership Includes:
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">AI-powered investment recommendations</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Access to premium properties</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Expert consultation booking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700">Real-time market insights</span>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b5ab?fit=crop&w=50&h=50"
                  alt="Success Story"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">Priya Sharma</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">New Member</span>
                  </div>
                  <p className="text-gray-600 text-sm">"Made ₹50,000 profit in my first month with TradePro's AI recommendations!"</p>
                  <div className="text-green-600 font-semibold text-sm mt-1">+127% returns</div>
                </div>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-start gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=50&h=50"
                  alt="Success Story"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">Arjun Mehta</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Gold Member</span>
                  </div>
                  <p className="text-gray-600 text-sm">"The property investments recommended by AI have been incredibly profitable."</p>
                  <div className="text-green-600 font-semibold text-sm mt-1">+89% property value</div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">50K+</div>
                <div className="text-xs text-gray-600">Happy Users</div>
              </div>
              <div>
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">₹250Cr</div>
                <div className="text-xs text-gray-600">Invested</div>
              </div>
              <div>
                <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900">4.8★</div>
                <div className="text-xs text-gray-600">App Rating</div>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="flex items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">SEBI Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-gray-600">ISO 27001</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}