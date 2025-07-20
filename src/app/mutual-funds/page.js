import MutualFundsExplorer from '../../components/trading/MutualFundsExplorer'
import ETFExplorer from '../../components/trading/ETFExplorer'
import ErrorBoundary from '../../components/ErrorBoundary'

export default function MutualFundsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mutual Funds & ETFs</h1>
          <p className="text-gray-600 mt-1">Explore and invest in mutual funds and exchange-traded funds</p>
        </div>
        <div className="flex space-x-4">
          <button className="btn-secondary">Compare Funds</button>
          <button className="btn-primary">Start SIP</button>
        </div>
      </div>

      <div className="space-y-12">
        <ErrorBoundary>
          <MutualFundsExplorer />
        </ErrorBoundary>
        <ErrorBoundary>
          <ETFExplorer />
        </ErrorBoundary>
      </div>
    </div>
  )
}
