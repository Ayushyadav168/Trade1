'use client'

import { useState } from 'react'
import { TrendingUp, TrendingDown, Activity, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, Filter, Search } from 'lucide-react'

export default function AdvancedTradingPanel() {
  const [activeTab, setActiveTab] = useState('orders')
  const [orderType, setOrderType] = useState('market')
  const [transactionType, setTransactionType] = useState('buy')
  const [filterStatus, setFilterStatus] = useState('all')
  const [actionModal, setActionModal] = useState({ open: false, action: '', position: null });
  const [actionSuccess, setActionSuccess] = useState(false);

  // Sample orders data
  const orders = [
    {
      id: 'ORD001',
      symbol: 'RELIANCE',
      type: 'BUY',
      orderType: 'LIMIT',
      quantity: 50,
      price: 2500,
      triggerPrice: null,
      status: 'PENDING',
      timestamp: '2024-01-15 10:30:00',
      filled: 0,
      remaining: 50,
      avgPrice: 0,
    },
    {
      id: 'ORD002',
      symbol: 'TCS',
      type: 'SELL',
      orderType: 'MARKET',
      quantity: 20,
      price: 3200,
      triggerPrice: null,
      status: 'COMPLETED',
      timestamp: '2024-01-15 10:15:00',
      filled: 20,
      remaining: 0,
      avgPrice: 3185.50,
    },
    {
      id: 'ORD003',
      symbol: 'INFY',
      type: 'BUY',
      orderType: 'SL',
      quantity: 30,
      price: 1450,
      triggerPrice: 1440,
      status: 'TRIGGERED',
      timestamp: '2024-01-15 09:45:00',
      filled: 15,
      remaining: 15,
      avgPrice: 1448.75,
    },
    {
      id: 'ORD004',
      symbol: 'HDFCBANK',
      type: 'SELL',
      orderType: 'LIMIT',
      quantity: 25,
      price: 1550,
      triggerPrice: null,
      status: 'CANCELLED',
      timestamp: '2024-01-15 09:30:00',
      filled: 0,
      remaining: 25,
      avgPrice: 0,
    },
  ]

  // Sample positions data
  const positions = [
    {
      symbol: 'RELIANCE',
      product: 'MIS',
      quantity: 100,
      avgPrice: 2520.45,
      ltp: 2535.60,
      pnl: 1515,
      pnlPercent: 0.60,
      dayChange: 15.15,
      dayChangePercent: 0.60,
    },
    {
      symbol: 'TCS',
      product: 'CNC',
      quantity: -50,
      avgPrice: 3180.80,
      ltp: 3165.25,
      pnl: 777.5,
      pnlPercent: 0.49,
      dayChange: -15.55,
      dayChangePercent: -0.49,
    },
  ]

  // Sample trades data
  const trades = [
    {
      id: 'TRD001',
      symbol: 'RELIANCE',
      type: 'BUY',
      quantity: 50,
      price: 2520.45,
      amount: 126022.50,
      timestamp: '2024-01-15 10:30:15',
      orderId: 'ORD005',
    },
    {
      id: 'TRD002',
      symbol: 'TCS',
      type: 'SELL',
      quantity: 20,
      price: 3185.50,
      amount: 63710,
      timestamp: '2024-01-15 10:15:45',
      orderId: 'ORD002',
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-600 bg-green-100'
      case 'PENDING': return 'text-yellow-600 bg-yellow-100'
      case 'TRIGGERED': return 'text-blue-600 bg-blue-100'
      case 'CANCELLED': return 'text-red-600 bg-red-100'
      case 'REJECTED': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="h-4 w-4" />
      case 'PENDING': return <Clock className="h-4 w-4" />
      case 'TRIGGERED': return <Activity className="h-4 w-4" />
      case 'CANCELLED': return <XCircle className="h-4 w-4" />
      case 'REJECTED': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase()
  )

  return (
    <div className="space-y-6">
      {/* Trading Panel Header */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Trading Panel</h2>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <button className="btn-secondary flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="btn-primary">Place New Order</button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'orders', label: 'Orders', count: orders.length },
            { id: 'positions', label: 'Positions', count: positions.length },
            { id: 'trades', label: 'Trades', count: trades.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Order Book</h3>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="input-field pl-10 w-64"
                />
              </div>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field w-auto"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="triggered">Triggered</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Symbol</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Quantity</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Price</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Filled</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{order.id}</div>
                      <div className="text-xs text-gray-500">{order.timestamp}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{order.symbol}</div>
                      <div className="text-xs text-gray-500">{order.orderType}</div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        order.type === 'BUY' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="text-right py-4 px-4 text-gray-900">{order.quantity}</td>
                    <td className="text-right py-4 px-4">
                      <div className="text-gray-900">₹{order.price.toLocaleString()}</div>
                      {order.triggerPrice && (
                        <div className="text-xs text-gray-500">Trigger: ₹{order.triggerPrice}</div>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1">{order.status}</span>
                      </span>
                    </td>
                    <td className="text-right py-4 px-4">
                      <div className="text-gray-900">{order.filled}/{order.quantity}</div>
                      {order.avgPrice > 0 && (
                        <div className="text-xs text-gray-500">Avg: ₹{order.avgPrice}</div>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        {order.status === 'PENDING' && (
                          <>
                            <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                              Modify
                            </button>
                            <button className="text-red-600 hover:text-red-800 text-xs font-medium">
                              Cancel
                            </button>
                          </>
                        )}
                        <button className="text-gray-600 hover:text-gray-800 text-xs font-medium">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Positions Tab */}
      {activeTab === 'positions' && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Current Positions</h3>
            <button className="btn-secondary">Square Off All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Symbol</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Product</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Quantity</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Avg Price</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">LTP</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">P&L</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{position.symbol}</div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {position.product}
                      </span>
                    </td>
                    <td className={`text-right py-4 px-4 font-medium ${
                      position.quantity > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {position.quantity > 0 ? '+' : ''}{position.quantity}
                    </td>
                    <td className="text-right py-4 px-4 text-gray-900">₹{position.avgPrice.toLocaleString()}</td>
                    <td className="text-right py-4 px-4 text-gray-900">₹{position.ltp.toLocaleString()}</td>
                    <td className={`text-right py-4 px-4 font-medium ${
                      position.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {position.pnl >= 0 ? '+' : ''}₹{position.pnl.toLocaleString()}
                      <div className="text-xs">({position.pnlPercent}%)</div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                          onClick={() => setActionModal({ open: true, action: 'Exit', position })}
                        >
                          Exit
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-xs font-medium"
                          onClick={() => setActionModal({ open: true, action: 'Convert', position })}
                        >
                          Convert
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Trades Tab */}
      {activeTab === 'trades' && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Trade History</h3>
            <button className="btn-secondary">Download Report</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Trade ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Symbol</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-600">Type</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Quantity</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Price</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Time</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{trade.id}</div>
                      <div className="text-xs text-gray-500">Order: {trade.orderId}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">{trade.symbol}</td>
                    <td className="text-center py-4 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        trade.type === 'BUY' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
                      }`}>
                        {trade.type}
                      </span>
                    </td>
                    <td className="text-right py-4 px-4 text-gray-900">{trade.quantity}</td>
                    <td className="text-right py-4 px-4 text-gray-900">₹{trade.price.toLocaleString()}</td>
                    <td className="text-right py-4 px-4 text-gray-900">₹{trade.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-900">{trade.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Action Confirmation Modal */}
      {actionModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative animate-fade-in-up">
            <button
              onClick={() => setActionModal({ open: false, action: '', position: null })}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              &times;
            </button>
            <div className="mb-4 text-lg font-bold text-gray-900">{actionModal.action} Position</div>
            <div className="mb-4 text-gray-700">
              Are you sure you want to <span className="font-semibold">{actionModal.action.toLowerCase()}</span> your position in <span className="font-semibold">{actionModal.position?.symbol}</span>?
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setActionModal({ open: false, action: '', position: null })}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setActionModal({ open: false, action: '', position: null });
                  setActionSuccess(true);
                  setTimeout(() => setActionSuccess(false), 2000);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {actionSuccess && (
        <div className="fixed bottom-8 right-8 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
          Action completed successfully!
        </div>
      )}
    </div>
  )
}
