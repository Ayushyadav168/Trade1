'use client'

import { useState } from 'react'
import { CreditCard, Plus, ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react'
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar'

export default function Wallet() {
  const [activeTab, setActiveTab] = useState('add-money')
  const [amount, setAmount] = useState('')

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 10000,
      description: 'Money Added via UPI',
      date: '2025-01-20',
      status: 'completed',
      method: 'UPI',
    },
    {
      id: 2,
      type: 'debit',
      amount: 2500,
      description: 'Stock Purchase - RELIANCE',
      date: '2025-01-19',
      status: 'completed',
      method: 'Wallet',
    },
    {
      id: 3,
      type: 'credit',
      amount: 5000,
      description: 'Money Added via Debit Card',
      date: '2025-01-18',
      status: 'completed',
      method: 'Card',
    },
    {
      id: 4,
      type: 'debit',
      amount: 1200,
      description: 'MF Investment - SBI Bluechip',
      date: '2025-01-17',
      status: 'completed',
      method: 'Wallet',
    },
  ]

  const handleAddMoney = async () => {
    if (!amount || amount < 100) {
      alert('Minimum amount is ₹100')
      return
    }

    try {
      // Create Razorpay order
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      })

      const orderData = await response.json()

      if (response.ok) {
        // Initialize Razorpay
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_UGukCujOKmAXm4',
          amount: orderData.amount,
          currency: orderData.currency,
          name: 'TradeApp',
          description: 'Add funds to trading account',
          order_id: orderData.orderId,
          handler: async function (response) {
            // Verify payment
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            })

            const verifyData = await verifyResponse.json()

            if (verifyResponse.ok && verifyData.success) {
              alert('Payment successful! Money added to your wallet.')
              setAmount('')
              // Refresh page or update wallet balance
              window.location.reload()
            } else {
              alert('Payment verification failed!')
            }
          },
          prefill: {
            name: 'User Name',
            email: 'user@example.com',
            contact: '9999999999',
          },
          theme: {
            color: '#3B82F6',
          },
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
        alert('Failed to create order')
      }
    } catch (error) {
      console.error('Error adding money:', error)
      alert('Something went wrong!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
          <p className="mt-2 text-gray-600">Manage your trading funds and view transaction history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Balance */}
          <div className="lg:col-span-3">
            <div className="card p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <CreditCard className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Available Balance</p>
                  <p className="text-2xl font-bold text-gray-900">₹25,000</p>
                </div>
                <div className="text-center">
                  <Plus className="h-8 w-8 text-success mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Total Added</p>
                  <p className="text-2xl font-bold text-success">₹50,000</p>
                </div>
                <div className="text-center">
                  <ArrowDownLeft className="h-8 w-8 text-danger mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Total Used</p>
                  <p className="text-2xl font-bold text-danger">₹25,000</p>
                </div>
                <div className="text-center">
                  <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-warning">₹0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Add Money Section */}
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex space-x-1 mb-6">
                <button
                  onClick={() => setActiveTab('add-money')}
                  className={`py-2 px-4 text-sm font-medium rounded-lg ${
                    activeTab === 'add-money'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Add Money
                </button>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`py-2 px-4 text-sm font-medium rounded-lg ${
                    activeTab === 'transactions'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Transaction History
                </button>
              </div>

              {activeTab === 'add-money' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount to Add
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount (Min: ₹100)"
                      className="input-field"
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum amount: ₹100</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quick Amounts
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[1000, 5000, 10000].map((quickAmount) => (
                        <button
                          key={quickAmount}
                          onClick={() => setAmount(quickAmount.toString())}
                          className="py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                        >
                          ₹{quickAmount.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Methods
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <input type="radio" name="payment" value="upi" defaultChecked className="mr-3" />
                        <div>
                          <p className="font-medium">UPI</p>
                          <p className="text-xs text-gray-500">Pay using UPI apps</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <input type="radio" name="payment" value="card" className="mr-3" />
                        <div>
                          <p className="font-medium">Debit/Credit Card</p>
                          <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <input type="radio" name="payment" value="netbanking" className="mr-3" />
                        <div>
                          <p className="font-medium">Net Banking</p>
                          <p className="text-xs text-gray-500">All major banks supported</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAddMoney}
                    className="w-full btn-primary"
                    disabled={!amount || amount < 100}
                  >
                    Add Money Securely
                  </button>

                  <div className="text-xs text-gray-500 text-center">
                    <p>🔒 Secured by 256-bit SSL encryption</p>
                    <p>Powered by Razorpay</p>
                  </div>
                </div>
              )}

              {activeTab === 'transactions' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
                    <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                      <option value="all">All Transactions</option>
                      <option value="credit">Money Added</option>
                      <option value="debit">Money Used</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full mr-3 ${
                            transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {transaction.type === 'credit' ? (
                              <ArrowDownLeft className="h-4 w-4 text-green-600" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{transaction.description}</p>
                            <p className="text-sm text-gray-500">
                              {transaction.date} • {transaction.method}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                          </p>
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View All Transactions
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">How to Add Money?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">1</span>
                  <p>Enter the amount you want to add (minimum ₹100)</p>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">2</span>
                  <p>Choose your preferred payment method</p>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">3</span>
                  <p>Complete the secure payment process</p>
                </div>
                <div className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">4</span>
                  <p>Money will be instantly added to your wallet</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Security</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p>256-bit SSL encryption</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p>PCI DSS compliant</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p>RBI approved gateway</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <p>No card details stored</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Razorpay Script */}
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  )
}
