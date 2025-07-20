'use client'

import { Plus, ArrowUpDown, CreditCard, PieChart } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

export default function QuickActions() {
  const router = useRouter();
  const actions = [
    {
      title: 'Buy Stocks',
      description: 'Place buy orders',
      icon: Plus,
      href: '/dashboard/trading?action=buy',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Sell Holdings',
      description: 'Place sell orders',
      icon: ArrowUpDown,
      href: '/dashboard/trading?action=sell',
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      title: 'Mutual Funds',
      description: 'Invest in MF',
      icon: PieChart,
      href: '/dashboard/mutual-funds',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Add Funds',
      description: 'Deposit money',
      icon: CreditCard,
      href: '/dashboard/wallet',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.title}
              onClick={() => router.push(action.href)}
              className={`${action.color} text-white rounded-lg p-4 text-center transition-colors duration-200 cursor-pointer w-full`}
            >
              <action.icon className="h-6 w-6 mx-auto mb-2" />
              <h3 className="text-sm font-medium">{action.title}</h3>
              <p className="text-xs opacity-90">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Account Summary */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Available Balance</span>
            <span className="font-semibold text-gray-900">₹25,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Used Margin</span>
            <span className="font-semibold text-gray-900">₹15,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Available Margin</span>
            <span className="font-semibold text-success">₹10,000</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Balance</span>
            <span className="font-bold text-lg text-gray-900">₹40,000</span>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">RELIANCE</h4>
              <p className="text-xs text-gray-600">BUY • 10 shares</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Executed
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">TCS</h4>
              <p className="text-xs text-gray-600">SELL • 5 shares</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
              Pending
            </span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-gray-900">INFY</h4>
              <p className="text-xs text-gray-600">BUY • 15 shares</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              Executed
            </span>
          </div>
        </div>
        
        <Link href="/dashboard/orders" className="block mt-4 text-center text-primary-600 hover:text-primary-700 text-sm font-medium">
          View All Orders
        </Link>
      </div>

      {/* Watchlist */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Watchlist</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">TATAMOTORS</h4>
              <p className="text-xs text-gray-600">₹456.30</p>
            </div>
            <span className="text-xs text-success">+2.15%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">ICICIBANK</h4>
              <p className="text-xs text-gray-600">₹945.80</p>
            </div>
            <span className="text-xs text-danger">-1.25%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">HDFCBANK</h4>
              <p className="text-xs text-gray-600">₹1523.45</p>
            </div>
            <span className="text-xs text-success">+0.85%</span>
          </div>
        </div>
        
        <Link href="/dashboard/watchlist" className="block mt-4 text-center text-primary-600 hover:text-primary-700 text-sm font-medium">
          Manage Watchlist
        </Link>
      </div>
    </div>
  )
}
