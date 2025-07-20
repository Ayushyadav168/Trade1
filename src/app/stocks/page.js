import EnhancedStockSearch from '../../components/trading/EnhancedStockSearch'
import ErrorBoundary from '../../components/ErrorBoundary'

export default function StocksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ErrorBoundary>
        <EnhancedStockSearch />
      </ErrorBoundary>
    </div>
  )
}
