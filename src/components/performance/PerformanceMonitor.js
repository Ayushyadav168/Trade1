'use client'

import React, { useState, useEffect } from 'react'
import { Zap, TrendingUp, Activity, RefreshCw, AlertCircle, CheckCircle, Clock, BarChart3, Settings } from 'lucide-react'

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    latency: 0,
    throughput: 0,
    errorRate: 0,
    cacheHitRate: 0,
    apiResponseTime: 0,
    memoryUsage: 0,
    activeUsers: 0,
    tradingVelocity: 0
  })
  
  const [optimizations, setOptimizations] = useState([])
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [performanceScore, setPerformanceScore] = useState(85)

  // Simulate real-time performance monitoring
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        latency: Math.random() * 100 + 50, // 50-150ms
        throughput: Math.random() * 1000 + 500, // 500-1500 req/s
        errorRate: Math.random() * 2, // 0-2%
        cacheHitRate: Math.random() * 20 + 80, // 80-100%
        apiResponseTime: Math.random() * 500 + 200, // 200-700ms
        memoryUsage: Math.random() * 30 + 50, // 50-80%
        activeUsers: Math.floor(Math.random() * 1000 + 500), // 500-1500 users
        tradingVelocity: Math.floor(Math.random() * 500 + 200) // 200-700 trades/min
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 3000)
    return () => clearInterval(interval)
  }, [])

  // Calculate performance score based on metrics
  useEffect(() => {
    const calculateScore = () => {
      let score = 100
      
      // Penalize high latency
      if (metrics.latency > 100) score -= 10
      if (metrics.latency > 120) score -= 10
      
      // Penalize high error rate
      if (metrics.errorRate > 1) score -= 15
      if (metrics.errorRate > 1.5) score -= 10
      
      // Penalize low cache hit rate
      if (metrics.cacheHitRate < 90) score -= 10
      if (metrics.cacheHitRate < 85) score -= 10
      
      // Penalize slow API response
      if (metrics.apiResponseTime > 500) score -= 10
      if (metrics.apiResponseTime > 600) score -= 10
      
      // Penalize high memory usage
      if (metrics.memoryUsage > 75) score -= 5
      if (metrics.memoryUsage > 85) score -= 10
      
      setPerformanceScore(Math.max(0, Math.min(100, score)))
    }

    calculateScore()
  }, [metrics])

  // Generate optimization suggestions
  useEffect(() => {
    const suggestions = []
    
    if (metrics.latency > 100) {
      suggestions.push({
        type: 'warning',
        title: 'High Latency Detected',
        description: 'Consider implementing CDN or optimizing database queries',
        impact: 'Medium',
        effort: 'Low'
      })
    }
    
    if (metrics.errorRate > 1) {
      suggestions.push({
        type: 'error',
        title: 'High Error Rate',
        description: 'Review error logs and implement better error handling',
        impact: 'High',
        effort: 'Medium'
      })
    }
    
    if (metrics.cacheHitRate < 90) {
      suggestions.push({
        type: 'info',
        title: 'Low Cache Hit Rate',
        description: 'Optimize caching strategy for frequently accessed data',
        impact: 'Medium',
        effort: 'Low'
      })
    }
    
    if (metrics.apiResponseTime > 500) {
      suggestions.push({
        type: 'warning',
        title: 'Slow API Response',
        description: 'Optimize API endpoints and consider request batching',
        impact: 'High',
        effort: 'Medium'
      })
    }

    if (metrics.memoryUsage > 80) {
      suggestions.push({
        type: 'warning',
        title: 'High Memory Usage',
        description: 'Implement memory cleanup and optimize data structures',
        impact: 'Medium',
        effort: 'High'
      })
    }
    
    setOptimizations(suggestions)
  }, [metrics])

  const performOptimization = async () => {
    setIsOptimizing(true)
    
    // Simulate optimization process
    for (let i = 0; i < 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    // Simulate improved metrics after optimization
    setMetrics(prev => ({
      ...prev,
      latency: prev.latency * 0.8,
      errorRate: prev.errorRate * 0.5,
      cacheHitRate: Math.min(100, prev.cacheHitRate * 1.1),
      apiResponseTime: prev.apiResponseTime * 0.7,
      memoryUsage: prev.memoryUsage * 0.9
    }))
    
    setIsOptimizing(false)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getMetricColor = (value, thresholds) => {
    if (value <= thresholds.good) return 'text-green-600'
    if (value <= thresholds.warning) return 'text-yellow-600'
    return 'text-red-600'
  }

  const MetricCard = ({ title, value, unit, icon: Icon, thresholds, description }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${
          thresholds ? getMetricColor(value, thresholds) : 'text-gray-600'
        }`}>
          {value.toFixed(1)}{unit}
        </span>
      </div>
      <div className={`text-2xl font-bold ${
        thresholds ? getMetricColor(value, thresholds) : 'text-gray-900'
      }`}>
        {value.toFixed(1)}{unit}
      </div>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Performance Monitor</h2>
          <p className="text-gray-600">Real-time system performance and optimization</p>
        </div>
        
        {/* Performance Score */}
        <div className={`rounded-lg p-4 ${getScoreColor(performanceScore)}`}>
          <div className="text-center">
            <div className="text-3xl font-bold">{performanceScore}</div>
            <div className="text-sm font-medium">Performance Score</div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Latency"
          value={metrics.latency}
          unit="ms"
          icon={Zap}
          thresholds={{ good: 80, warning: 120 }}
          description="Average response time"
        />
        
        <MetricCard
          title="Throughput"
          value={metrics.throughput}
          unit=" req/s"
          icon={TrendingUp}
          thresholds={{ good: 800, warning: 600 }}
          description="Requests per second"
        />
        
        <MetricCard
          title="Error Rate"
          value={metrics.errorRate}
          unit="%"
          icon={AlertCircle}
          thresholds={{ good: 0.5, warning: 1.5 }}
          description="Failed requests percentage"
        />
        
        <MetricCard
          title="Cache Hit Rate"
          value={metrics.cacheHitRate}
          unit="%"
          icon={Activity}
          thresholds={{ good: 95, warning: 85 }}
          description="Cache effectiveness"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="API Response"
          value={metrics.apiResponseTime}
          unit="ms"
          icon={Clock}
          thresholds={{ good: 300, warning: 500 }}
          description="API endpoint response time"
        />
        
        <MetricCard
          title="Memory Usage"
          value={metrics.memoryUsage}
          unit="%"
          icon={BarChart3}
          thresholds={{ good: 70, warning: 85 }}
          description="System memory utilization"
        />
        
        <MetricCard
          title="Active Users"
          value={metrics.activeUsers}
          unit=""
          icon={Activity}
          description="Currently online users"
        />
        
        <MetricCard
          title="Trading Velocity"
          value={metrics.tradingVelocity}
          unit=" t/min"
          icon={TrendingUp}
          description="Trades per minute"
        />
      </div>

      {/* Optimization Suggestions */}
      {optimizations.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Optimization Suggestions</h3>
            <button
              onClick={performOptimization}
              disabled={isOptimizing}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Settings className="h-4 w-4" />
                  Auto-Optimize
                </>
              )}
            </button>
          </div>
          
          <div className="space-y-4">
            {optimizations.map((opt, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                <div className={`p-2 rounded-full ${
                  opt.type === 'error' ? 'bg-red-100' : 
                  opt.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  {opt.type === 'error' ? (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  ) : opt.type === 'warning' ? (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{opt.title}</h4>
                  <p className="text-gray-600 text-sm">{opt.description}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">
                      Impact: {opt.impact}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      Effort: {opt.effort}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Timeline</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <BarChart3 className="h-12 w-12 mx-auto mb-2" />
            <p>Performance timeline chart would be displayed here</p>
            <p className="text-sm">Integration with charting library needed</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Performance Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white p-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors">
            <RefreshCw className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="font-medium text-gray-900">Clear Cache</div>
            <div className="text-sm text-gray-600">Reset system cache</div>
          </button>
          
          <button className="bg-white p-4 rounded-lg border border-green-200 hover:bg-green-50 transition-colors">
            <Zap className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="font-medium text-gray-900">Optimize DB</div>
            <div className="text-sm text-gray-600">Run database optimization</div>
          </button>
          
          <button className="bg-white p-4 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors">
            <Activity className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <div className="font-medium text-gray-900">Health Check</div>
            <div className="text-sm text-gray-600">Run system diagnostics</div>
          </button>
        </div>
      </div>
    </div>
  )
}