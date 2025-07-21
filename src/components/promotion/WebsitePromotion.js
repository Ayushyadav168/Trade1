'use client'

import React, { useState, useEffect } from 'react'
import { Share2, TrendingUp, Users, MessageCircle, Star, Target, Gift, Zap, Award, Trophy, Crown, Medal } from 'lucide-react'

export default function WebsitePromotion() {
  const [promotionStats, setPromotionStats] = useState({
    totalUsers: 50000,
    activeToday: 1247,
    tradingVolume: 2500000000,
    successRate: 94.5,
    referrals: 8934,
    socialShares: 15620,
    appRating: 4.8,
    marketShare: 12.3
  })

  const [referralCode, setReferralCode] = useState('TRADEPRO2024')
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  const promotionalCampaigns = [
    {
      id: 'welcome-bonus',
      title: '🎁 Welcome Bonus Campaign',
      description: 'New users get ₹1000 bonus + Zero brokerage for first 10 trades',
      status: 'Active',
      participants: 12450,
      conversionRate: 87.5,
      roi: 340,
      startDate: '2024-07-01',
      endDate: '2024-08-31',
      budget: 500000,
      spent: 325000,
      type: 'Acquisition'
    },
    {
      id: 'refer-earn',
      title: '💰 Refer & Earn Program',
      description: 'Earn ₹500 for each successful referral + 10% trading bonus',
      status: 'Active',
      participants: 8934,
      conversionRate: 65.2,
      roi: 285,
      startDate: '2024-06-15',
      endDate: '2024-12-31',
      budget: 1000000,
      spent: 445000,
      type: 'Referral'
    },
    {
      id: 'social-trading',
      title: '🌟 Social Trading Challenge',
      description: 'Follow top traders, copy strategies, win prizes up to ₹1 Lakh',
      status: 'Active',
      participants: 25600,
      conversionRate: 42.8,
      roi: 195,
      startDate: '2024-07-10',
      endDate: '2024-08-10',
      budget: 300000,
      spent: 165000,
      type: 'Engagement'
    },
    {
      id: 'property-launch',
      title: '🏠 Property Investment Launch',
      description: 'Early access to premium properties + Investment guidance',
      status: 'Coming Soon',
      participants: 3200,
      conversionRate: 0,
      roi: 0,
      startDate: '2024-08-01',
      endDate: '2024-09-30',
      budget: 750000,
      spent: 0,
      type: 'Product Launch'
    }
  ]

  const socialMediaMetrics = [
    { platform: 'Instagram', followers: 125000, engagement: 4.2, growth: 15.3 },
    { platform: 'Twitter', followers: 89000, engagement: 3.8, growth: 8.7 },
    { platform: 'LinkedIn', followers: 45000, engagement: 6.1, growth: 22.4 },
    { platform: 'YouTube', followers: 67000, engagement: 7.2, growth: 18.9 },
    { platform: 'Facebook', followers: 156000, engagement: 2.9, growth: 5.2 }
  ]

  const achievements = [
    {
      title: 'Top Trading Platform 2024',
      description: 'Awarded by FinTech Excellence Awards',
      icon: Trophy,
      color: 'text-yellow-600 bg-yellow-50',
      date: '2024-06-15'
    },
    {
      title: '50K+ Active Users',
      description: 'Milestone achieved in Q2 2024',
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
      date: '2024-07-01'
    },
    {
      title: '₹250Cr+ Trading Volume',
      description: 'Monthly trading volume milestone',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-50',
      date: '2024-07-15'
    },
    {
      title: '4.8★ App Store Rating',
      description: 'Highest rated trading app',
      icon: Star,
      color: 'text-purple-600 bg-purple-50',
      date: '2024-07-20'
    }
  ]

  const marketingChannels = [
    { name: 'Digital Marketing', budget: 2000000, spent: 1456000, leads: 15420, cpa: 94 },
    { name: 'Content Marketing', budget: 800000, spent: 623000, leads: 8900, cpa: 70 },
    { name: 'Influencer Partnerships', budget: 1500000, spent: 1234000, leads: 12300, cpa: 100 },
    { name: 'Email Marketing', budget: 300000, spent: 234000, leads: 5600, cpa: 42 },
    { name: 'SEO & Content', budget: 600000, spent: 445000, leads: 7800, cpa: 57 }
  ]

  const CampaignCard = ({ campaign }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
          <p className="text-gray-600 text-sm">{campaign.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
          campaign.status === 'Coming Soon' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {campaign.status}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{campaign.participants.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Participants</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{campaign.conversionRate}%</div>
          <div className="text-xs text-gray-500">Conversion</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{campaign.roi}%</div>
          <div className="text-xs text-gray-500">ROI</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">₹{(campaign.spent/1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-500">Spent</div>
        </div>
      </div>

      <div className="bg-gray-50 rounded p-3 mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Budget Progress</span>
          <span>₹{(campaign.spent/1000).toFixed(0)}K / ₹{(campaign.budget/1000).toFixed(0)}K</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${(campaign.spent/campaign.budget)*100}%` }}
          />
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>{new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</span>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{campaign.type}</span>
      </div>
    </div>
  )

  const generateShareableContent = () => {
    const content = [
      "🚀 Just made my first profitable trade on TradePro! Zero brokerage is a game-changer! #TradePro #InvestSmart",
      "💡 The AI recommendations on TradePro helped me pick winning stocks! Technology meets trading 🤖 #AITrading #TradePro",
      "🏆 Achieved 15% returns this month with TradePro's expert guidance! Who else is crushing it? #TradePro #InvestmentWins",
      "🏠 Excited about TradePro's new property investment feature! Real estate + stocks in one platform 🎯 #PropertyInvestment #TradePro"
    ]
    return content[Math.floor(Math.random() * content.length)]
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Website Promotion & Growth</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive marketing campaigns, referral programs, and growth strategies to expand our user base and increase engagement.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">Total Users</span>
          </div>
          <div className="text-2xl font-bold">{promotionStats.totalUsers.toLocaleString()}</div>
          <div className="text-xs opacity-75">+12.5% this month</div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">Trading Volume</span>
          </div>
          <div className="text-2xl font-bold">₹{(promotionStats.tradingVolume/100000000).toFixed(0)}Cr</div>
          <div className="text-xs opacity-75">+18.3% this month</div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5" />
            <span className="text-sm font-medium">App Rating</span>
          </div>
          <div className="text-2xl font-bold">{promotionStats.appRating}★</div>
          <div className="text-xs opacity-75">8.5K+ reviews</div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5" />
            <span className="text-sm font-medium">Market Share</span>
          </div>
          <div className="text-2xl font-bold">{promotionStats.marketShare}%</div>
          <div className="text-xs opacity-75">+2.1% growth</div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Award className="h-6 w-6 text-yellow-600" />
          Recent Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
              <div className={`p-3 rounded-full ${achievement.color}`}>
                <achievement.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
                <div className="text-xs text-gray-500 mt-1">{new Date(achievement.date).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Campaigns */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Promotional Campaigns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotionalCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>

      {/* Referral Program */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Gift className="h-6 w-6 text-green-600" />
          Referral Program
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{promotionStats.referrals.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Successful Referrals</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">₹44.5L</div>
            <div className="text-sm text-gray-600">Rewards Distributed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">65.2%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Your Referral Code</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-gray-50 rounded-lg px-4 py-2 font-mono text-lg">
              {referralCode}
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Earn ₹500 for each successful referral + 10% bonus on their trades for 3 months
          </p>
        </div>
      </div>

      {/* Social Media Integration */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-blue-600" />
          Social Media Growth
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {socialMediaMetrics.map((platform, index) => (
            <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
              <div className="font-semibold text-gray-900">{platform.platform}</div>
              <div className="text-xl font-bold text-blue-600 mt-1">
                {platform.followers >= 1000 ? `${(platform.followers/1000).toFixed(0)}K` : platform.followers}
              </div>
              <div className="text-sm text-gray-600">
                {platform.engagement}% engagement
              </div>
              <div className="text-xs text-green-600">
                +{platform.growth}% growth
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Share-worthy Content Generator</h3>
          <div className="bg-white rounded-lg p-4 mb-3 border-l-4 border-blue-500">
            <p className="text-gray-700">{generateShareableContent()}</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
              Generate New
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
              Copy & Share
            </button>
          </div>
        </div>
      </div>

      {/* Marketing Channels Performance */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Marketing Channels Performance</h2>
        
        <div className="space-y-4">
          {marketingChannels.map((channel, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">{channel.name}</h3>
                <div className="text-sm text-gray-600">
                  CPA: ₹{channel.cpa}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <div className="text-sm text-gray-600">Budget</div>
                  <div className="font-semibold">₹{(channel.budget/100000).toFixed(1)}L</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Spent</div>
                  <div className="font-semibold">₹{(channel.spent/100000).toFixed(1)}L</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Leads</div>
                  <div className="font-semibold text-green-600">{channel.leads.toLocaleString()}</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(channel.spent/channel.budget)*100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Boost Your Growth?</h2>
        <p className="mb-6 opacity-90">
          Launch new campaigns, track performance, and scale your marketing efforts with our comprehensive promotion tools.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Launch Campaign
          </button>
          <button className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600">
            View Analytics
          </button>
        </div>
      </div>
    </div>
  )
}