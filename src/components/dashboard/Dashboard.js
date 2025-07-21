'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

// Dashboard Components
import DashboardNavbar from './DashboardNavbar';
import AdvancedPortfolio from './AdvancedPortfolio';
import AdvancedTradingPanel from './AdvancedTradingPanel';
import MarketOverview from './MarketOverview';
import QuickActions from './QuickActions';
import AdvancedStockSearch from './AdvancedStockSearch';
import NewsWidget from '../trading/NewsWidget';
import AIShowcase from './AIShowcase';
import Stats from '../Stats';
import Testimonials from '../Testimonials';
import Features from '../Features';
import RealTimeMarket from '../market/RealTimeMarket';
import Leaderboard from './Leaderboard';
import BestInvestors from './BestInvestors';
import AIInsightsCarousel from './AIInsightsCarousel';
import AIGoalTracker from './AIGoalTracker';
import AIMarketDigest from './AIMarketDigest';
import AIWatchlist from './AIWatchlist';

// Property Management
import PropertyManagement from '../property/PropertyManagement';

// Meeting Booking System
import MeetingBookingSystem from '../booking/MeetingBookingSystem';

// Performance & Promotion Components
import PerformanceMonitor from '../performance/PerformanceMonitor';
import WebsitePromotion from '../promotion/WebsitePromotion';

// Account/KYC
import KYCStatus from '../KYCStatus';
import AccountBalance from '../AccountBalance';
import { Sparkles, Star, Activity, Plus, RefreshCw, TrendingUp, TrendingDown, DollarSign, PieChart, Lightbulb } from 'lucide-react';

function ProfileWithPortfolio() {
  // User info state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [profileFields, setProfileFields] = useState({ experience: '', riskTolerance: '', investmentGoals: '' });
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      const res = await fetch('/api/user/profile');
      const data = await res.json();
      if (data.profile) {
        setUser(data.profile);
        setProfileFields({
          experience: data.profile.tradingProfile?.experience || '',
          riskTolerance: data.profile.tradingProfile?.riskTolerance || '',
          investmentGoals: (data.profile.tradingProfile?.investmentGoals || []).join(', '),
        });
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);
  async function saveProfile() {
    setSaving(true);
    await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        experience: profileFields.experience,
        riskTolerance: profileFields.riskTolerance,
        investmentGoals: profileFields.investmentGoals.split(',').map(g => g.trim()),
      })
    });
    setEdit(false);
    setSaving(false);
  }
  // Mock data - replace with real data from Kite Connect API
  const portfolioData = {
    totalValue: 125000,
    dayChange: 2500,
    dayChangePercent: 2.04,
    totalInvestment: 120000,
    totalReturns: 5000,
    totalReturnsPercent: 4.17,
  };
  const holdings = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', quantity: 50, avgPrice: 2450, currentPrice: 2520, value: 126000, dayChange: 70, dayChangePercent: 2.86 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', quantity: 30, avgPrice: 3200, currentPrice: 3180, value: 95400, dayChange: -20, dayChangePercent: -0.63 },
    { symbol: 'INFY', name: 'Infosys Limited', quantity: 40, avgPrice: 1450, currentPrice: 1485, value: 59400, dayChange: 35, dayChangePercent: 2.41 },
  ];
  const topStock = holdings.reduce((a, b) => (a.dayChangePercent > b.dayChangePercent ? a : b), holdings[0]);
  const recentActivity = [
    { type: 'Buy', symbol: 'RELIANCE', qty: 10, price: 2500, date: '2024-06-01' },
    { type: 'Sell', symbol: 'TCS', qty: 5, price: 3200, date: '2024-05-28' },
    { type: 'Buy', symbol: 'INFY', qty: 15, price: 1450, date: '2024-05-25' },
  ];
  if (loading) return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
  return (
    <div className="space-y-8">
      {/* User Info */}
      <div className="card p-6 flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400">
        <img src={user?.imageUrl} alt="avatar" className="w-20 h-20 rounded-full border-4 border-blue-200" />
        <div className="flex-1">
          <div className="text-2xl font-bold text-gray-900">{user?.fullName}</div>
          <div className="text-gray-600">{user?.email}</div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">KYC: {user?.tradingProfile?.isKYCCompleted ? 'Completed' : 'Pending'}</span>
            <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">Email: {user?.tradingProfile?.isEmailVerified ? 'Verified' : 'Unverified'}</span>
            <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">Joined: {new Date(user?.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      {/* Editable Profile Fields */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Profile Details</h3>
          {!edit && <button className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700" onClick={() => setEdit(true)}>Edit</button>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            {edit ? (
              <input className="input-field w-full" value={profileFields.experience} onChange={e => setProfileFields(f => ({ ...f, experience: e.target.value }))} />
            ) : (
              <div className="text-gray-900 font-medium">{user?.tradingProfile?.experience}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
            {edit ? (
              <input className="input-field w-full" value={profileFields.riskTolerance} onChange={e => setProfileFields(f => ({ ...f, riskTolerance: e.target.value }))} />
            ) : (
              <div className="text-gray-900 font-medium">{user?.tradingProfile?.riskTolerance}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Goals</label>
            {edit ? (
              <input className="input-field w-full" value={profileFields.investmentGoals} onChange={e => setProfileFields(f => ({ ...f, investmentGoals: e.target.value }))} placeholder="e.g. Retirement, Growth" />
            ) : (
              <div className="text-gray-900 font-medium">{(user?.tradingProfile?.investmentGoals || []).join(', ')}</div>
            )}
          </div>
        </div>
        {edit && <button className="mt-6 px-6 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700" onClick={saveProfile} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>}
      </div>
      {/* Top Performer */}
      <div className="card p-6 flex items-center gap-6 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-blue-400">
        <Star className="h-8 w-8 text-yellow-400" />
        <div>
          <div className="text-xs uppercase text-blue-600 font-bold mb-1">Top Performer</div>
          <div className="text-xl font-bold text-gray-900">{topStock.name} ({topStock.symbol})</div>
          <div className="text-sm text-gray-600">Day Change: <span className="font-semibold text-green-600">+{topStock.dayChangePercent}%</span> | Qty: {topStock.quantity}</div>
        </div>
      </div>
      {/* Portfolio Summary */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Portfolio Overview</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" /> Add Funds
            </button>
            <button className="px-4 py-2 rounded-lg bg-purple-600 text-white font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors">
              <RefreshCw className="h-4 w-4" /> Rebalance Portfolio
            </button>
          </div>
        </div>
        {/* Portfolio Summary Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-primary-600" />
              <span className="ml-2 text-sm font-medium text-gray-600">Total Value</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ₹{portfolioData.totalValue.toLocaleString()}
            </p>
            <p className={`text-sm mt-1 flex items-center ${portfolioData.dayChange >= 0 ? 'text-success' : 'text-danger'}`}>{portfolioData.dayChange >= 0 ? (<TrendingUp className="h-4 w-4 mr-1" />) : (<TrendingDown className="h-4 w-4 mr-1" />)}₹{Math.abs(portfolioData.dayChange).toLocaleString()} ({portfolioData.dayChangePercent}%)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-primary-600" />
              <span className="ml-2 text-sm font-medium text-gray-600">Invested</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">₹{portfolioData.totalInvestment.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-success" />
              <span className="ml-2 text-sm font-medium text-gray-600">Returns</span>
            </div>
            <p className="text-2xl font-bold text-success mt-1">₹{portfolioData.totalReturns.toLocaleString()}</p>
            <p className="text-sm text-success mt-1">{portfolioData.totalReturnsPercent}%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <PieChart className="h-5 w-5 text-primary-600" />
              <span className="ml-2 text-sm font-medium text-gray-600">Holdings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{holdings.length}</p>
            <p className="text-sm text-gray-600 mt-1">Stocks</p>
          </div>
        </div>
        {/* Mini Performance Chart */}
        <div className="mt-8">
          <h4 className="text-md font-semibold text-gray-900 mb-2 flex items-center gap-2"><PieChart className="h-5 w-5 text-blue-500" /> Performance Trend</h4>
          <svg width="100%" height="60" viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline fill="none" stroke="#3B82F6" strokeWidth="3" points="0,50 50,40 100,30 150,35 200,20 250,25 300,10" />
            <circle cx="300" cy="10" r="4" fill="#22C55E" />
          </svg>
        </div>
      </div>
      {/* Holdings List */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Holdings</h3>
        {holdings.map((holding) => (
          <div key={holding.symbol} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex-1">
              <div className="flex items-center">
                <h4 className="text-sm font-medium text-gray-900">{holding.symbol}</h4>
                <span className="ml-2 text-xs text-gray-500">{holding.name}</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">{holding.quantity} shares • Avg ₹{holding.avgPrice}</div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">₹{holding.value.toLocaleString()}</p>
              <p className={`text-sm flex items-center justify-end ${holding.dayChange >= 0 ? 'text-success' : 'text-danger'}`}>{holding.dayChange >= 0 ? (<TrendingUp className="h-3 w-3 mr-1" />) : (<TrendingDown className="h-3 w-3 mr-1" />)}₹{Math.abs(holding.dayChange)} ({holding.dayChangePercent}%)</p>
            </div>
          </div>
        ))}
      </div>
      {/* Portfolio Insights (AI-style) */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 flex items-center gap-4">
        <Sparkles className="h-8 w-8 text-purple-500" />
        <div>
          <div className="text-lg font-bold text-gray-900 mb-1">Portfolio Insights</div>
          <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
            <li>Consider rebalancing your IT sector exposure for better diversification.</li>
            <li>Top performer: {topStock.name} ({topStock.symbol}) with {topStock.dayChangePercent}% day change.</li>
            <li>Returns are healthy. Review underperformers for possible action.</li>
            <li>Cash available: <span className="font-semibold text-blue-700">₹{portfolioData.totalValue.toLocaleString()}</span></li>
          </ul>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Activity className="h-5 w-5 text-blue-500" /> Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((act, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${act.type === 'Buy' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{act.type}</span>
                <span className="font-medium text-gray-900">{act.symbol}</span>
                <span className="text-xs text-gray-500">x{act.qty}</span>
              </div>
              <div className="text-sm text-gray-600">₹{act.price} <span className="ml-2 text-xs text-gray-400">{act.date}</span></div>
            </div>
          ))}
        </div>
      </div>
      {/* Leaderboard */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Star className="h-5 w-5 text-yellow-500" /> Leaderboard</h3>
        <Leaderboard />
      </div>
      {/* Best Investors */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Star className="h-5 w-5 text-purple-500" /> Best Investors</h3>
        <BestInvestors />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const bestInvestorsRef = useRef(null);
  const portfolioRef = useRef(null);

  function handleBestInvestorsClick() {
    if (activeTab !== 'overview') {
      setActiveTab('overview');
      setTimeout(() => {
        bestInvestorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      bestInvestorsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handlePortfolioClick() {
    if (activeTab !== 'overview') {
      setActiveTab('overview');
      setTimeout(() => {
        portfolioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      portfolioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-32 w-32 border-b-2 border-blue-500 rounded-full mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <MarketOverview />
                <RealTimeMarket />
              </div>
              <QuickActions />
            </div>
            <Stats />
            <AIInsightsCarousel />
            <AIGoalTracker />
            <AIMarketDigest />
            <AIWatchlist />
            <NewsWidget />
            <Features />
            <Testimonials />
            <Leaderboard />
            {/* --- Portfolio Section --- */}
            <section id="portfolio-section" ref={portfolioRef} className="my-12 py-8 border-t-4 border-blue-200 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2"><PieChart className="h-7 w-7 text-blue-500" /> Portfolio Analytics</h2>
              <AdvancedPortfolio />
            </section>
            {/* --- Best Investors Section --- */}
            <section id="best-investors-section" ref={bestInvestorsRef} className="my-12 py-8 border-t-4 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center gap-2"><Lightbulb className="h-7 w-7 text-yellow-500" /> Best Investors, Traders & Top Companies</h2>
              <BestInvestors />
            </section>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <Stats />
            <AdvancedPortfolio />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <QuickActions />
                <MarketOverview />
              </div>
            </div>
            <Features />
            <Testimonials />
            <Leaderboard />
            <BestInvestors />
          </div>
        );

      case 'trading':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <AdvancedTradingPanel />
            </div>
            <div className="space-y-6">
              <QuickActions />
              <MarketOverview />
            </div>
          </div>
        );

      case 'screener':
        return <AdvancedStockSearch />;

      case 'market':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MarketOverview />
            </div>
            <QuickActions />
          </div>
        );

      case 'news':
        return <NewsWidget />;

      case 'performance':
        return <PerformanceMonitor />;

      case 'promotion':
        return <WebsitePromotion />;

      case 'bookings':
        return <MeetingBookingSystem />;

      case 'properties':
        return <PropertyManagement />;

      case 'ai':
        return <AIShowcase />;

      case 'profile':
        return <ProfileWithPortfolio />;

      default:
        return null;
    }
  };

  const tabItems = [
    ['overview', 'Overview'],
    ['portfolio', 'Portfolio Analytics'],
    ['trading', 'Trading Panel'],
    ['screener', 'Stock Screener'],
    ['properties', 'Property Management'],
    ['bookings', 'Meeting Bookings'],
    ['market', 'Market Overview'],
    ['news', 'Market News'],
    ['ai', 'AI Features'],
    ['profile', 'Profile'],
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar onBestInvestorsClick={handleBestInvestorsClick} onPortfolioClick={handlePortfolioClick} />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trading Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor your portfolio and execute trades with advanced analytics
          </p>
        </header>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabItems.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`py-2 px-1 text-sm font-medium border-b-2 transition-all ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {renderTabContent()}
      </main>
    </div>
  );
}
