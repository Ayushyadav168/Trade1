'use client'

import { useState } from 'react'
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  Mail,
  Shield,
  FileText
} from 'lucide-react'

export default function KYCStatus() {
  const [kycStatus, setKycStatus] = useState('not-started') // not-started, pending, completed
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [kycStep, setKycStep] = useState(1)
  const [kycData, setKycData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pan: '',
    aadhar: '',
    address: '',
    bankAccount: '',
    ifsc: ''
  })

  const handleSendOTP = () => {
    setOtpSent(true)
    setKycStatus('pending')
    alert('OTP sent to your email address! Use 123456 for demo.')
  }

  const handleVerifyOTP = () => {
    if (otp === '123456') {
      setKycStep(2)
    } else {
      alert('Invalid OTP. Use 123456 for demo.')
    }
  }

  const handleSubmitKYC = () => {
    if (kycData.fullName && kycData.email && kycData.pan && kycData.aadhar) {
      setKycStatus('completed')
      alert('KYC completed successfully!')
    } else {
      alert('Please fill all required fields')
    }
  }

  if (kycStatus === 'completed') {
    return (
      <div className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <h4 className="font-medium text-green-900">KYC Verified</h4>
              <p className="text-sm text-green-700">Your account is fully verified and ready for trading</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (kycStatus === 'not-started') {
    return (
      <div className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <div className="mb-4">
          <div className="text-xl font-bold text-gray-800 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            KYC Verification
          </div>
          <div className="text-gray-500 text-sm mt-1">
            Complete your Know Your Customer verification to start trading
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <h4 className="font-medium text-yellow-900">KYC Required</h4>
              <p className="text-sm text-yellow-700">Complete KYC verification to access all trading features</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleSendOTP}
          className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Start KYC Verification
        </button>
      </div>
    )
  }

  if (kycStatus === 'pending' && kycStep === 1) {
    return (
      <div className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <div className="mb-4">
          <div className="text-xl font-bold text-gray-800 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            KYC Verification
          </div>
          <div className="text-gray-500 text-sm mt-1">
            Step 1 of 2: Email Verification
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Step 1: Email Verification</h4>
          <p className="text-sm text-blue-700 mb-3">We need to verify your email address before proceeding with KYC.</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={kycData.email}
                onChange={(e) => setKycData({ ...kycData, email: e.target.value })}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {!otpSent ? (
              <button
                onClick={handleSendOTP}
                className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send OTP
              </button>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP (use 123456 for demo)"
                    maxLength={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleVerifyOTP}
                  className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors mt-2"
                >
                  Verify OTP
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (kycStatus === 'pending' && kycStep === 2) {
    return (
      <div className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg p-6">
        <div className="mb-4">
          <div className="text-xl font-bold text-gray-800 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            KYC Verification
          </div>
          <div className="text-gray-500 text-sm mt-1">
            Step 2 of 2: Personal Information
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-green-900 mb-2">Step 2: Personal Information</h4>
          <p className="text-sm text-green-700 mb-3">Please provide your personal and financial details.</p>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              value={kycData.fullName}
              onChange={(e) => setKycData({ ...kycData, fullName: e.target.value })}
              placeholder="As per PAN card"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={kycData.phone}
              onChange={(e) => setKycData({ ...kycData, phone: e.target.value })}
              placeholder="+91 XXXXXXXXXX"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number *</label>
            <input
              type="text"
              value={kycData.pan}
              onChange={(e) => setKycData({ ...kycData, pan: e.target.value.toUpperCase() })}
              placeholder="ABCDE1234F"
              maxLength={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number *</label>
            <input
              type="text"
              value={kycData.aadhar}
              onChange={(e) => setKycData({ ...kycData, aadhar: e.target.value })}
              placeholder="XXXX XXXX XXXX"
              maxLength={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              value={kycData.address}
              onChange={(e) => setKycData({ ...kycData, address: e.target.value })}
              rows={3}
              placeholder="Complete address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
            <input
              type="text"
              value={kycData.bankAccount}
              onChange={(e) => setKycData({ ...kycData, bankAccount: e.target.value })}
              placeholder="Bank account number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
            <input
              type="text"
              value={kycData.ifsc}
              onChange={(e) => setKycData({ ...kycData, ifsc: e.target.value.toUpperCase() })}
              placeholder="IFSC code"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <button
              type="button"
              onClick={handleSubmitKYC}
              className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-semibold flex items-center justify-center hover:bg-green-700 transition-colors mt-4"
            >
              <FileText className="h-4 w-4 mr-2" />
              Submit KYC Documents
            </button>
          </div>
        </form>
      </div>
    )
  }

  // Default: KYC Under Review
  return (
    <div className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-lg p-6">
      <div className="mb-4">
        <div className="text-xl font-bold text-gray-800 flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          KYC Verification
        </div>
        <div className="text-gray-500 text-sm mt-1">
          KYC Under Review
        </div>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-yellow-600 mr-2" />
          <div>
            <h4 className="font-medium text-yellow-900">KYC Under Review</h4>
            <p className="text-sm text-yellow-700">Your documents are being verified. This usually takes 24-48 hours.</p>
          </div>
        </div>
      </div>
    </div>
  )
}