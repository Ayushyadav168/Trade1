'use client'

import { useState } from 'react'
import { Wallet, CreditCard, Play, DollarSign, Plus, ArrowUpRight, ArrowDownRight, Eye, EyeOff } from 'lucide-react'
// Removed imports for missing UI components. Will use plain HTML and Tailwind CSS instead.

export default function AccountBalance() {
  const [showBalance, setShowBalance] = useState(true)
  const [addFundsModal, setAddFundsModal] = useState(false)
  const [fundAmount, setFundAmount] = useState('')
  const [fundType, setFundType] = useState('demo') // demo or real
  const [currentMode, setCurrentMode] = useState('demo')
  const [accountData, setAccountData] = useState({
    demoBalance: 100000, // ₹1,00,000 demo money
    realBalance: 0, // ₹0 real money initially
    totalInvested: 0,
    currentValue: 0,
    totalPnL: 0,
    totalHoldings: 0
  })

  const handleAddFunds = () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    
    const amount = parseFloat(fundAmount)
    if (fundType === 'demo') {
      setAccountData(prev => ({
        ...prev,
        demoBalance: prev.demoBalance + amount
      }))
    } else {
      setAccountData(prev => ({
        ...prev,
        realBalance: prev.realBalance + amount
      }))
    }
    
    setAddFundsModal(false)
    setFundAmount('')
    alert(`₹${amount.toLocaleString()} added to your ${fundType} account successfully!`)
  }

  const handleToggleMode = (mode) => {
    setCurrentMode(mode)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl p-6">
      <div className="mb-4">
        <div className="text-xl font-bold text-gray-800 flex items-center">
          <Wallet className="mr-2 h-5 w-5" />
          Account Balance
        </div>
        <div className="text-gray-500 text-sm mt-1">Manage your trading funds and portfolio</div>
      </div>
      <div className="space-y-6">
        {/* Account Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Demo Account */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Play className="h-5 w-5 mr-2" />
                <span className="font-medium">Demo Account</span>
              </div>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-orange-100 hover:text-white transition-colors"
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-orange-100">Available Balance</div>
              <div className="text-2xl font-bold">
                {showBalance ? formatCurrency(accountData.demoBalance) : '••••••••'}
              </div>
              <div className="flex items-center text-sm text-orange-100">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                Virtual money for practice trading
              </div>
            </div>
          </div>

          {/* Real Account */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Wallet className="h-5 w-5 mr-2" />
                <span className="font-medium">Trading Account</span>
              </div>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="text-blue-100 hover:text-white transition-colors"
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-blue-100">Available Balance</div>
              <div className="text-2xl font-bold">
                {showBalance ? formatCurrency(accountData.realBalance) : '••••••••'}
              </div>
              <div className="flex items-center text-sm text-blue-100">
                <DollarSign className="h-3 w-3 mr-1" />
                Real money for actual trading
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setAddFundsModal(true)}
            className="flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 bg-white hover:bg-gray-100 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </button>
          
          <button
            onClick={() => handleToggleMode('demo')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${currentMode === 'demo' ? 'bg-orange-500 text-white hover:bg-orange-600' : 'border border-orange-500 text-orange-500 hover:bg-orange-50 bg-white'}`}
          >
            Practice Mode
          </button>
          
          <button
            onClick={() => handleToggleMode('real')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center ${currentMode === 'real' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border border-blue-500 text-blue-500 hover:bg-blue-50 bg-white'}`}
          >
            Live Trading
          </button>
        </div>

        {/* Portfolio Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Portfolio Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-600">Total Invested</div>
              <div className="font-semibold text-gray-900">
                {formatCurrency(accountData.totalInvested)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Current Value</div>
              <div className="font-semibold text-gray-900">
                {formatCurrency(accountData.currentValue)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Total P&L</div>
              <div className={`font-semibold ${accountData.totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {accountData.totalPnL >= 0 ? '+' : ''}{formatCurrency(accountData.totalPnL)}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">Holdings</div>
              <div className="font-semibold text-gray-900">
                {accountData.totalHoldings}
              </div>
            </div>
          </div>
        </div>

        {/* Add Funds Modal */}
        {addFundsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Funds</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2">Fund Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFundType('demo')}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        fundType === 'demo' 
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <Play className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-sm font-medium">Demo Money</div>
                    </button>
                    <button
                      onClick={() => setFundType('real')}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        fundType === 'real' 
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <CreditCard className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-sm font-medium">Real Money</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    value={fundAmount}
                    onChange={(e) => setFundAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {fundType === 'demo' && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm text-orange-700">
                      Demo money is virtual currency for practice trading. No real money is involved.
                    </p>
                  </div>
                )}

                {fundType === 'real' && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Real money will be debited from your bank account. Please ensure sufficient balance.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setAddFundsModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFunds}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Add Funds
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
