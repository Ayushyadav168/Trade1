'use client'

import { Users, TrendingUp, DollarSign, Award } from 'lucide-react'

export default function Stats() {
  const stats = [
    {
      id: 1,
      name: 'Active Users',
      value: '50,000+',
      icon: Users,
      change: '+12%',
      changeType: 'increase',
    },
    {
      id: 2,
      name: 'Daily Trades',
      value: '1.2M+',
      icon: TrendingUp,
      change: '+19%',
      changeType: 'increase',
    },
    {
      id: 3,
      name: 'Assets Under Management',
      value: '₹5,000Cr+',
      icon: DollarSign,
      change: '+23%',
      changeType: 'increase',
    },
    {
      id: 4,
      name: 'Customer Satisfaction',
      value: '98.5%',
      icon: Award,
      change: '+2.1%',
      changeType: 'increase',
    },
  ]

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by traders nationwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Join thousands of successful traders who trust our platform for their investment journey
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-50 p-8 hover:bg-blue-50 transition-colors duration-200">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="mt-4 text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-gray-900">{stat.value}</dd>
                <div className="mt-2 flex items-center justify-center">
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change} from last month
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
