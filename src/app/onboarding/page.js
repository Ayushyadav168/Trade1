'use client'

import { useState } from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { CheckCircle, User, TrendingUp, Shield, CreditCard, ArrowRight } from 'lucide-react'

export default function OnboardingPage() {
  const { user } = useUser()
  const { signOut } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    experience: '',
    riskTolerance: '',
    investmentGoals: [],
    monthlyInvestment: '',
    phoneNumber: '',
    panNumber: '',
    termsAccepted: false
  })

  const totalSteps = 4

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGoalToggle = (goal) => {
    setFormData(prev => ({
      ...prev,
      investmentGoals: prev.investmentGoals.includes(goal)
        ? prev.investmentGoals.filter(g => g !== goal)
        : [...prev.investmentGoals, goal]
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFinish = async () => {
    try {
      // Save user preferences to API
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          onboardingData: formData,
          onboardingCompleted: true
        })
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        console.error('Failed to save onboarding data')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to TradePro!</h1>
          <p className="text-gray-600">Let's set up your trading profile in a few quick steps</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[...Array(totalSteps)].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index + 1 <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1 < currentStep ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < totalSteps - 1 && (
                  <div className={`flex-1 h-1 mx-4 ${
                    index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Step 1: Experience Level */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your trading experience?</h2>
              <p className="text-gray-600 mb-6">This helps us provide better recommendations</p>
              
              <div className="space-y-4">
                {[
                  { value: 'beginner', label: 'Beginner', desc: 'New to trading and investing' },
                  { value: 'intermediate', label: 'Intermediate', desc: 'Some experience with basic trades' },
                  { value: 'advanced', label: 'Advanced', desc: 'Experienced with complex strategies' },
                  { value: 'expert', label: 'Expert', desc: 'Professional or very experienced trader' }
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleInputChange('experience', option.value)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.experience === option.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Risk Tolerance */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your risk tolerance?</h2>
              <p className="text-gray-600 mb-6">How comfortable are you with market fluctuations?</p>
              
              <div className="space-y-4">
                {[
                  { value: 'conservative', label: 'Conservative', desc: 'Prefer stable, low-risk investments' },
                  { value: 'moderate', label: 'Moderate', desc: 'Balanced approach with some risk' },
                  { value: 'aggressive', label: 'Aggressive', desc: 'Comfortable with high-risk, high-reward' }
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleInputChange('riskTolerance', option.value)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.riskTolerance === option.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Investment Goals */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What are your investment goals?</h2>
              <p className="text-gray-600 mb-6">Select all that apply</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'wealth-building', label: 'Wealth Building', icon: TrendingUp },
                  { value: 'retirement', label: 'Retirement Planning', icon: Shield },
                  { value: 'short-term', label: 'Short-term Gains', icon: CreditCard },
                  { value: 'passive-income', label: 'Passive Income', icon: User },
                ].map((goal) => {
                  const Icon = goal.icon
                  return (
                    <div
                      key={goal.value}
                      onClick={() => handleGoalToggle(goal.value)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.investmentGoals.includes(goal.value)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-6 w-6 text-blue-600 mb-2" />
                      <div className="font-semibold text-gray-900">{goal.label}</div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected monthly investment amount
                </label>
                <select
                  value={formData.monthlyInvestment}
                  onChange={(e) => handleInputChange('monthlyInvestment', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select amount</option>
                  <option value="0-5000">₹0 - ₹5,000</option>
                  <option value="5000-15000">₹5,000 - ₹15,000</option>
                  <option value="15000-50000">₹15,000 - ₹50,000</option>
                  <option value="50000+">₹50,000+</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 4: Verification */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete your profile</h2>
              <p className="text-gray-600 mb-6">Add some additional details to get started</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number (for KYC)
                  </label>
                  <input
                    type="text"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value.toUpperCase())}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ABCDE1234F"
                    maxLength={10}
                  />
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.termsAccepted}
                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep === totalSteps ? (
              <button
                onClick={handleFinish}
                disabled={!formData.termsAccepted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                Complete Setup
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !formData.experience) ||
                  (currentStep === 2 && !formData.riskTolerance) ||
                  (currentStep === 3 && formData.investmentGoals.length === 0)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}
