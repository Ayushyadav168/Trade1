'use client'

import { useState } from 'react'
import { X, Calculator, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'

export default function OrderModal({ isOpen, onClose, stock = null }) {
  const [orderData, setOrderData] = useState({
    symbol: stock?.symbol || '',
    quantity: '',
    price: '',
    orderType: 'MARKET',
    transactionType: 'BUY',
    product: 'CNC',
    validity: 'DAY',
    triggerPrice: '',
    targetPrice: '',
    stopLoss: '',
    disclosedQuantity: '',
  })

  const [calculations, setCalculations] = useState({
    totalValue: 0,
    brokerageCharges: 0,
    taxes: 0,
    totalCost: 0,
    margin: 0,
  })

  const [isAdvanced, setIsAdvanced] = useState(false)

  // Calculate order details
  const calculateOrderDetails = () => {
    const quantity = parseInt(orderData.quantity) || 0
    const price = parseFloat(orderData.price) || 0
    const totalValue = quantity * price
    
    // Simple brokerage calculation (0.01% for equity delivery)
    const brokerageCharges = orderData.product === 'CNC' ? totalValue * 0.0001 : totalValue * 0.0003
    const taxes = totalValue * 0.001 // Simplified tax calculation
    const totalCost = totalValue + brokerageCharges + taxes

    setCalculations({
      totalValue,
      brokerageCharges,
      taxes,
      totalCost,
      margin: orderData.product === 'MIS' ? totalCost * 0.2 : totalCost, // 5x leverage for MIS
    })
  }

  const handleInputChange = (field, value) => {
    setOrderData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Here you would integrate with Kite Connect API
      console.log('Order data:', orderData)
      console.log('Calculations:', calculations)
      
      // Simulate order placement
      alert('Order placed successfully!')
      onClose()
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Error placing order')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Place Order {stock && `- ${stock.symbol}`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Form */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
              
              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleInputChange('transactionType', 'BUY')}
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      orderData.transactionType === 'BUY'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <TrendingUp className="h-5 w-5 mx-auto mb-1" />
                    BUY
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('transactionType', 'SELL')}
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                      orderData.transactionType === 'SELL'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <TrendingDown className="h-5 w-5 mx-auto mb-1" />
                    SELL
                  </button>
                </div>
              </div>

              {/* Symbol */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Symbol</label>
                <input
                  type="text"
                  value={orderData.symbol}
                  onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                  className="input-field"
                  placeholder="Enter stock symbol"
                  required
                />
              </div>

              {/* Quantity and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="number"
                    value={orderData.quantity}
                    onChange={(e) => {
                      handleInputChange('quantity', e.target.value)
                      calculateOrderDetails()
                    }}
                    className="input-field"
                    placeholder="0"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price {orderData.orderType === 'MARKET' && '(Market)'}
                  </label>
                  <input
                    type="number"
                    value={orderData.price}
                    onChange={(e) => {
                      handleInputChange('price', e.target.value)
                      calculateOrderDetails()
                    }}
                    className="input-field"
                    placeholder="0.00"
                    step="0.05"
                    disabled={orderData.orderType === 'MARKET'}
                    required={orderData.orderType !== 'MARKET'}
                  />
                </div>
              </div>

              {/* Order Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                <select
                  value={orderData.orderType}
                  onChange={(e) => handleInputChange('orderType', e.target.value)}
                  className="input-field"
                >
                  <option value="MARKET">Market</option>
                  <option value="LIMIT">Limit</option>
                  <option value="SL">Stop Loss</option>
                  <option value="SL-M">Stop Loss Market</option>
                </select>
              </div>

              {/* Trigger Price for SL orders */}
              {(orderData.orderType === 'SL' || orderData.orderType === 'SL-M') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trigger Price</label>
                  <input
                    type="number"
                    value={orderData.triggerPrice}
                    onChange={(e) => handleInputChange('triggerPrice', e.target.value)}
                    className="input-field"
                    placeholder="0.00"
                    step="0.05"
                    required
                  />
                </div>
              )}

              {/* Product and Validity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
                  <select
                    value={orderData.product}
                    onChange={(e) => {
                      handleInputChange('product', e.target.value)
                      calculateOrderDetails()
                    }}
                    className="input-field"
                  >
                    <option value="CNC">CNC (Delivery)</option>
                    <option value="MIS">MIS (Intraday)</option>
                    <option value="NRML">NRML (Normal)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Validity</label>
                  <select
                    value={orderData.validity}
                    onChange={(e) => handleInputChange('validity', e.target.value)}
                    className="input-field"
                  >
                    <option value="DAY">Day</option>
                    <option value="IOC">IOC</option>
                    <option value="GTT">GTT</option>
                  </select>
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <div>
                <button
                  type="button"
                  onClick={() => setIsAdvanced(!isAdvanced)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {isAdvanced ? 'Hide' : 'Show'} Advanced Options
                </button>
              </div>

              {/* Advanced Options */}
              {isAdvanced && (
                <div className="space-y-4 border-t pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Price</label>
                      <input
                        type="number"
                        value={orderData.targetPrice}
                        onChange={(e) => handleInputChange('targetPrice', e.target.value)}
                        className="input-field"
                        placeholder="0.00"
                        step="0.05"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stop Loss</label>
                      <input
                        type="number"
                        value={orderData.stopLoss}
                        onChange={(e) => handleInputChange('stopLoss', e.target.value)}
                        className="input-field"
                        placeholder="0.00"
                        step="0.05"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Disclosed Quantity</label>
                    <input
                      type="number"
                      value={orderData.disclosedQuantity}
                      onChange={(e) => handleInputChange('disclosedQuantity', e.target.value)}
                      className="input-field"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Order Summary
              </h3>

              {/* Calculations */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Order Value:</span>
                  <span className="font-medium">₹{calculations.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Brokerage:</span>
                  <span className="font-medium">₹{calculations.brokerageCharges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes & Charges:</span>
                  <span className="font-medium">₹{calculations.taxes.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Total Cost:</span>
                  <span className="font-bold text-lg">₹{calculations.totalCost.toLocaleString()}</span>
                </div>
                {orderData.product === 'MIS' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">Margin Required:</span>
                    <span className="font-medium text-blue-600">₹{calculations.margin.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Risk Analysis */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">Risk Analysis</h4>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>• Market orders execute immediately at current market price</p>
                      <p>• Intraday positions must be squared off before market close</p>
                      {orderData.product === 'MIS' && (
                        <p>• This is a leveraged position with margin requirements</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    orderData.transactionType === 'BUY'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  {orderData.transactionType} {orderData.symbol} - ₹{calculations.totalCost.toLocaleString()}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
