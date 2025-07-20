'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardNavbar from './DashboardNavbar';
import AdvancedPortfolio from './AdvancedPortfolio';
import AdvancedTradingPanel from './AdvancedTradingPanel';
import MarketOverview from './MarketOverview';
import QuickActions from './QuickActions';
import AdvancedStockSearch from './AdvancedStockSearch';
import NewsWidget from '../trading/NewsWidget';
import AIShowcase from './AIShowcase';
import KYCStatus from '../KYCStatus';
import AccountBalance from '../AccountBalance';

export default function Dashboard() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, isLoaded, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trading Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor your portfolio and execute trades with advanced analytics
          </p>
        </div>

        {/* Dashboard Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'portfolio'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Portfolio Analytics
              </button>
              <button
                onClick={() => setActiveTab('trading')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'trading'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Trading Panel
              </button>
              <button
                onClick={() => setActiveTab('screener')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'screener'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Stock Screener
              </button>
              <button
                onClick={() => setActiveTab('market')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'market'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Market Overview
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'news'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Market News
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`py-2 px-1 text-sm font-medium border-b-2 ${
                  activeTab === 'ai'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                AI Features
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KYC and Account Balance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <KYCStatus />
              <AccountBalance />
            </div>

            {/* Market Overview and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MarketOverview />
              </div>
              <div>
                <QuickActions />
              </div>
            </div>

            {/* News Widget */}
            <NewsWidget />
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <AdvancedPortfolio />
            </div>
            <div className="space-y-6">
              <QuickActions />
              <MarketOverview />
            </div>
          </div>
        )}

        {activeTab === 'trading' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <AdvancedTradingPanel />
            </div>
            <div className="space-y-6">
              <QuickActions />
              <MarketOverview />
            </div>
          </div>
        )}

        {activeTab === 'screener' && (
          <div>
            <AdvancedStockSearch />
          </div>
        )}

        {activeTab === 'market' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MarketOverview />
            </div>
            <div>
              <QuickActions />
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div>
            <NewsWidget />
          </div>
        )}

        {activeTab === 'ai' && (
          <div>
            <AIShowcase />
          </div>
        )}
      </main>
    </div>
  );
}
