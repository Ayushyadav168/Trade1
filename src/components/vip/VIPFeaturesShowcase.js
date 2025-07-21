'use client'

import React, { useState, useEffect } from 'react'
import { Crown, Star, Zap, Shield, Sparkles, Trophy, Diamond, Gift, Target, TrendingUp, Users, HeartHandshake } from 'lucide-react'

export default function VIPFeaturesShowcase() {
  const [selectedTier, setSelectedTier] = useState('platinum')
  const [currentUser, setCurrentUser] = useState({
    tier: 'gold',
    points: 15420,
    nextTierPoints: 25000,
    benefits: ['Priority Support', 'Reduced Fees', 'Advanced Analytics']
  })

  const membershipTiers = [
    {
      id: 'silver',
      name: 'Silver Elite',
      icon: Star,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      price: 'Free',
      minInvestment: '₹0',
      features: [
        'Basic trading platform access',
        'Standard customer support',
        'Basic market research',
        'Mobile app access',
        '5 free consultations per month'
      ],
      perks: ['Welcome bonus ₹1,000', 'Basic portfolio tracker']
    },
    {
      id: 'gold',
      name: 'Gold Premier',
      icon: Trophy,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      price: '₹2,999/month',
      minInvestment: '₹1 Lakh',
      features: [
        'Priority customer support',
        'Advanced AI recommendations',
        'Property investment access',
        'Unlimited consultations',
        'Premium research reports',
        'Tax optimization guidance'
      ],
      perks: ['50% reduced brokerage', 'Dedicated relationship manager', 'VIP events access']
    },
    {
      id: 'platinum',
      name: 'Platinum Crown',
      icon: Crown,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      price: '₹9,999/month',
      minInvestment: '₹10 Lakh',
      features: [
        '24/7 priority support',
        'Personal investment advisor',
        'Exclusive property deals',
        'International market access',
        'Private wealth management',
        'Custom portfolio creation',
        'Risk management tools'
      ],
      perks: ['Zero brokerage trading', 'Luxury event invitations', 'Personalized dashboard', 'Monthly portfolio review']
    },
    {
      id: 'diamond',
      name: 'Diamond Ultimate',
      icon: Diamond,
      color: 'from-blue-400 via-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-r from-blue-50 to-pink-50',
      textColor: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600',
      price: 'Invite Only',
      minInvestment: '₹1 Crore+',
      features: [
        'Dedicated investment team',
        'Exclusive investment opportunities',
        'Global property portfolio',
        'Private equity access',
        'Hedge fund partnerships',
        'Tax haven guidance',
        'Concierge investment service'
      ],
      perks: ['Exclusive Alpha returns', 'Personal financial advisor', 'Private events & networking', 'Global investment access']
    }
  ]

  const exclusiveFeatures = [
    {
      title: 'AI-Powered Portfolio Optimization',
      description: 'Advanced machine learning algorithms continuously optimize your portfolio for maximum returns',
      icon: Sparkles,
      tier: 'gold',
      benefit: 'Up to 15% better returns'
    },
    {
      title: 'Private Property Pre-Launch',
      description: 'Get exclusive access to premium properties before they hit the public market',
      icon: Crown,
      tier: 'platinum',
      benefit: '30-day early access'
    },
    {
      title: 'Global Investment Opportunities',
      description: 'Access to international stocks, REITs, and exclusive overseas property deals',
      icon: Target,
      tier: 'platinum',
      benefit: '50+ global markets'
    },
    {
      title: 'Luxury Lifestyle Benefits',
      description: 'Premium credit cards, luxury hotel stays, private jet bookings through investment rewards',
      icon: Gift,
      tier: 'diamond',
      benefit: '₹50L+ annual perks'
    }
  ]

  const testimonials = [
    {
      name: 'Arjun Mehta',
      tier: 'Diamond',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150',
      text: 'TradePro Diamond membership transformed my investment strategy. The personalized service and exclusive deals have generated exceptional returns.',
      returns: '+127% in 18 months'
    },
    {
      name: 'Priya Kapoor',
      tier: 'Platinum',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5ab?fit=crop&w=150&h=150',
      text: 'The property pre-launch access alone has made the Platinum membership invaluable. I\'ve secured three premium properties before public launch.',
      returns: '+89% property value'
    },
    {
      name: 'Vikram Gupta',
      tier: 'Gold',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=150&h=150',
      text: 'Gold membership pays for itself with the reduced brokerage alone. The AI recommendations have been incredibly accurate.',
      returns: '+45% portfolio growth'
    }
  ]

  const MembershipCard = ({ tier }) => {
    const isSelected = selectedTier === tier.id
    const isCurrentTier = currentUser.tier === tier.id
    const IconComponent = tier.icon

    return (
      <div className={`
        relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 cursor-pointer
        ${isSelected ? 'border-blue-500 shadow-2xl scale-105' : 'border-gray-200 hover:border-gray-300'}
        ${tier.bgColor}
      `}
      onClick={() => setSelectedTier(tier.id)}>
        
        {/* Current Tier Badge */}
        {isCurrentTier && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            CURRENT
          </div>
        )}

        {/* Tier Icon */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${tier.color} mb-4 shadow-lg`}>
          <IconComponent className="h-8 w-8 text-white" />
        </div>

        {/* Tier Info */}
        <h3 className={`text-2xl font-bold mb-2 ${tier.textColor}`}>{tier.name}</h3>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
          {tier.price !== 'Free' && tier.price !== 'Invite Only' && (
            <span className="text-gray-500 text-sm">per month</span>
          )}
        </div>

        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-2">Minimum Investment</div>
          <div className="text-lg font-semibold text-gray-900">{tier.minInvestment}</div>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6">
          {tier.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* Perks */}
        <div className="bg-white/50 rounded-lg p-3 mb-6">
          <div className="text-sm font-semibold text-gray-800 mb-2">Exclusive Perks:</div>
          {tier.perks.map((perk, idx) => (
            <div key={idx} className="text-sm text-gray-600 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-yellow-500" />
              {perk}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <button className={`
          w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200
          ${isCurrentTier 
            ? 'bg-green-100 text-green-700 cursor-default' 
            : tier.id === 'diamond' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg' 
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'}
        `}>
          {isCurrentTier ? 'Current Plan' : tier.id === 'diamond' ? 'Request Invitation' : 'Upgrade Now'}
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-4">
          <Crown className="h-5 w-5" />
          VIP MEMBERSHIP PROGRAM
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Unlock Premium Investment Experience</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join India's most exclusive investment community with personalized services, 
          premium access, and exceptional returns designed for serious investors.
        </p>
      </div>

      {/* Current Status */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-3">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Your Current Status</h3>
              <p className="text-gray-600">Gold Premier Member</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-600">{currentUser.points.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Loyalty Points</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress to Platinum</span>
            <span>{currentUser.points.toLocaleString()} / {currentUser.nextTierPoints.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentUser.points / currentUser.nextTierPoints) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          {currentUser.benefits.map((benefit, idx) => (
            <span key={idx} className="bg-white px-3 py-1 rounded-full text-sm font-medium text-yellow-700">
              ✓ {benefit}
            </span>
          ))}
        </div>
      </div>

      {/* Membership Tiers */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Choose Your Investment Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipTiers.map(tier => (
            <MembershipCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>

      {/* Exclusive Features */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Exclusive Premium Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exclusiveFeatures.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-3">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-3">{feature.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                      {feature.tier.toUpperCase()} TIER+
                    </span>
                    <span className="text-green-600 font-semibold">{feature.benefit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Success Stories from VIP Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <span className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full">
                    {testimonial.tier} Member
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4 italic">"{testimonial.text}"</p>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">{testimonial.returns}</div>
                <div className="text-xs text-gray-600">Investment Returns</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Investment Game?</h2>
        <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
          Join thousands of successful investors who have transformed their financial future with TradePro's premium services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
            Upgrade to Gold - ₹2,999/month
          </button>
          <button className="border border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition-colors">
            Schedule VIP Consultation
          </button>
        </div>
        <p className="text-sm opacity-75 mt-4">
          30-day money-back guarantee • No hidden fees • Cancel anytime
        </p>
      </div>
    </div>
  )
}