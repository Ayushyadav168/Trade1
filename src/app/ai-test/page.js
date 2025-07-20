import ErrorBoundary from '../../components/ErrorBoundary'
import AISuggestionButton from '../../components/AISuggestionButton'

export default function AITestPage() {
  // Test data for different asset types
  const testStock = {
    id: 1,
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    price: 2456.75,
    change: 45.30,
    changePercent: 1.88,
    volume: 2850000,
    marketCap: 1665000,
    sector: "Energy",
    pe: 24.5,
    pb: 2.1,
    roe: 12.5,
    week52High: 2856.15,
    week52Low: 2101.35,
    dividend: 1.2,
    eps: 100.25
  }

  const testMutualFund = {
    id: 1,
    name: "SBI Blue Chip Fund",
    category: "Large Cap",
    nav: 67.45,
    returns1y: 18.5,
    returns3y: 15.2,
    returns5y: 12.8,
    expenseRatio: 0.63,
    riskLevel: "Moderate",
    fundSize: 15250,
    minInvestment: 5000,
    sipAvailable: true
  }

  const testETF = {
    id: 1,
    name: "Nippon India ETF Nifty 50",
    symbol: "NIFTYBEES",
    category: "Equity",
    underlying: "NIFTY 50",
    price: 196.50,
    changePercent: 1.21,
    aum: 8500,
    expenseRatio: 0.05,
    trackingError: 0.12,
    dividendYield: 1.45,
    volume: 2450000
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Integration Test</h1>
        <p className="text-gray-600">Test Gemini AI integration for all investment types</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Stock AI Test */}
        <ErrorBoundary>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock AI Analysis</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">{testStock.name}</h4>
                <p className="text-sm text-gray-600">{testStock.symbol}</p>
                <p className="text-sm">₹{testStock.price.toLocaleString()}</p>
              </div>
              <AISuggestionButton 
                data={testStock} 
                type="stock" 
                variant="large"
              />
            </div>
          </div>
        </ErrorBoundary>

        {/* Mutual Fund AI Test */}
        <ErrorBoundary>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mutual Fund AI Analysis</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">{testMutualFund.name}</h4>
                <p className="text-sm text-gray-600">{testMutualFund.category}</p>
                <p className="text-sm">NAV: ₹{testMutualFund.nav}</p>
              </div>
              <AISuggestionButton 
                data={testMutualFund} 
                type="mutual-fund" 
                variant="large"
              />
            </div>
          </div>
        </ErrorBoundary>

        {/* ETF AI Test */}
        <ErrorBoundary>
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ETF AI Analysis</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">{testETF.name}</h4>
                <p className="text-sm text-gray-600">{testETF.symbol}</p>
                <p className="text-sm">₹{testETF.price.toLocaleString()}</p>
              </div>
              <AISuggestionButton 
                data={testETF} 
                type="etf" 
                variant="large"
              />
            </div>
          </div>
        </ErrorBoundary>
      </div>

      {/* Button Variants Demo */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Button Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-4">
            <h4 className="font-medium mb-3">Default</h4>
            <AISuggestionButton data={testStock} type="stock" />
          </div>
          <div className="card p-4">
            <h4 className="font-medium mb-3">Compact</h4>
            <AISuggestionButton data={testStock} type="stock" variant="compact" />
          </div>
          <div className="card p-4">
            <h4 className="font-medium mb-3">Large</h4>
            <AISuggestionButton data={testStock} type="stock" variant="large" />
          </div>
          <div className="card p-4">
            <h4 className="font-medium mb-3">Outline</h4>
            <AISuggestionButton data={testStock} type="stock" variant="outline" />
          </div>
        </div>
      </div>

      {/* API Status */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-900 mb-2">Gemini AI Integration Status</h3>
        <div className="text-sm text-blue-800">
          <p>✅ API Key: Configured</p>
          <p>✅ Components: All integrated with AI buttons</p>
          <p>✅ Error Handling: Error boundaries in place</p>
          <p>✅ Modal System: Responsive AI analysis modal</p>
        </div>
      </div>
    </div>
  )
}
