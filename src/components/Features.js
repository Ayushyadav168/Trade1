'use client'

import { BarChart3, Shield, Zap, PieChart, CreditCard, Smartphone } from 'lucide-react'

const features = [
  {
    name: 'Stock Trading',
    description: 'Trade stocks with real-time data, advanced charts, and instant order execution.',
    icon: BarChart3,
  },
  {
    name: 'Mutual Funds',
    description: 'Invest in mutual funds with SIP options and detailed performance analytics.',
    icon: PieChart,
  },
  {
    name: 'ETF Trading',
    description: 'Trade ETFs with low fees and access to diverse investment opportunities.',
    icon: Zap,
  },
  {
    name: 'Secure Payments',
    description: 'Razorpay integration ensures secure and fast payment processing.',
    icon: CreditCard,
  },
  {
    name: 'Advanced Security',
    description: 'Multi-factor authentication and encrypted transactions for complete security.',
    icon: Shield,
  },
  {
    name: 'Mobile Responsive',
    description: 'Trade on-the-go with our fully responsive design optimized for all devices.',
    icon: Smartphone,
  },
]

export default function Features() {
  return (
    <div id="features" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to trade
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform provides all the tools and features you need for successful trading in stocks, mutual funds, and ETFs.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-gray-50 rounded-lg">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Trusted by traders worldwide
              </h2>
              <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                Join thousands of successful traders who use our platform daily
              </p>
            </div>
            <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
              <div className="flex flex-col">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Active Traders</dt>
                <dd className="order-1 text-5xl font-extrabold text-primary-600">10K+</dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Daily Trades</dt>
                <dd className="order-1 text-5xl font-extrabold text-primary-600">50K+</dd>
              </div>
              <div className="flex flex-col mt-10 sm:mt-0">
                <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">Assets Available</dt>
                <dd className="order-1 text-5xl font-extrabold text-primary-600">5000+</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
