import BestInvestors from '@/components/dashboard/BestInvestors';

export default function BestInvestorsPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Best Investors, Traders & Top Companies</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore the strategies, visions, and performance of legendary investors, top traders, and leading companies. Click any card for detailed AI-powered insights.
        </p>
      </div>
      <BestInvestors />
    </div>
  );
} 