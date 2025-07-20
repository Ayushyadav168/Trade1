'use client'

import { useState } from 'react'
import { CheckCircle, AlertTriangle, Clock, Mail, Shield, User, FileText, CreditCard } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    // Simulate OTP send
    alert('OTP sent to your email address! Use 123456 for demo.')
  }

  const handleVerifyOTP = () => {
    if (otp === '123456') { // Demo OTP
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

  const handleInputChange = (field, value) => {
    setKycData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (kycStatus === 'completed') {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <div>
                <h4 className="font-medium text-green-900">KYC Verified</h4>
                <p className="text-sm text-green-700">Your account is fully verified and ready for trading</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (kycStatus === 'not-started') {
    return (
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            KYC Verification
          </CardTitle>
          <CardDescription>Complete your Know Your Customer verification to start trading</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
              <div>
                <h4 className="font-medium text-yellow-900">KYC Required</h4>
                <p className="text-sm text-yellow-700">Complete KYC verification to access all trading features</p>
              </div>
            </div>
          </div>
          <Button onClick={handleSendOTP} className="w-full">
            Start KYC Verification
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          KYC Verification
        </CardTitle>
        <CardDescription>Step {kycStep} of 2: {kycStep === 1 ? 'Email Verification' : 'Personal Information'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
            <p className="text-sm text-green-700">Your account is fully verified and ready for trading</p>
          </div>
        </div>
      </div>
    )
  }

  if (kycStatus === 'pending') {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-yellow-600 mr-2" />
          <div>
            <h4 className="font-medium text-yellow-900">KYC Under Review</h4>
            <p className="text-sm text-yellow-700">Your documents are being verified. This usually takes 24-48 hours.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Shield className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Complete Your KYC</h3>
      </div>

      {kycStep === 1 && (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Step 1: Email Verification</h4>
            <p className="text-sm text-blue-700 mb-3">We need to verify your email address before proceeding with KYC.</p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={kycData.email}
                  onChange={(e) => setKycData({...kycData, email: e.target.value})}
                  className="input-field"
                  placeholder="Enter your email address"
                />
              </div>
              
              {!otpSent ? (
                <button onClick={handleSendOTP} className="btn-primary">
                  <Mail className="h-4 w-4 mr-2" />
                  Send OTP
                </button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="input-field"
                      placeholder="Enter 6-digit OTP (use 123456 for demo)"
                      maxLength={6}
                    />
                  </div>
                  <button onClick={handleVerifyOTP} className="btn-primary">
                    Verify OTP
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {kycStep === 2 && (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Step 2: Personal Information</h4>
            <p className="text-sm text-green-700 mb-3">Please provide your personal and financial details.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={kycData.fullName}
                onChange={(e) => setKycData({...kycData, fullName: e.target.value})}
                className="input-field"
                placeholder="As per PAN card"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={kycData.phone}
                onChange={(e) => setKycData({...kycData, phone: e.target.value})}
                className="input-field"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number *</label>
              <input
                type="text"
                value={kycData.pan}
                onChange={(e) => setKycData({...kycData, pan: e.target.value.toUpperCase()})}
                className="input-field"
                placeholder="ABCDE1234F"
                maxLength={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number *</label>
              <input
                type="text"
                value={kycData.aadhar}
                onChange={(e) => setKycData({...kycData, aadhar: e.target.value})}
                className="input-field"
                placeholder="XXXX XXXX XXXX"
                maxLength={12}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={kycData.address}
                onChange={(e) => setKycData({...kycData, address: e.target.value})}
                className="input-field"
                rows={3}
                placeholder="Complete address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account Number</label>
              <input
                type="text"
                value={kycData.bankAccount}
                onChange={(e) => setKycData({...kycData, bankAccount: e.target.value})}
                className="input-field"
                placeholder="Bank account number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
              <input
                type="text"
                value={kycData.ifsc}
                onChange={(e) => setKycData({...kycData, ifsc: e.target.value.toUpperCase()})}
                className="input-field"
                placeholder="IFSC code"
              />
            </div>
          </div>

          <div className="pt-4">
            <button onClick={handleSubmitKYC} className="btn-primary">
              <FileText className="h-4 w-4 mr-2" />
              Submit KYC Documents
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
