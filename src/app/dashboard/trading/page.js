'use client'

import { useState } from 'react'
import { Search, TrendingUp, TrendingDown, Plus, Minus, AlertTriangle, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import DashboardNavbar from '../../../components/dashboard/DashboardNavbar'
import { stocksData } from '@/data/stocksData'

export default function Trading() {
  const [activeTab, setActiveTab] = useState('buy')
  const [selectedStock, setSelectedStock] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [quantity, setQuantity] = useState('')
  const [orderType, setOrderType] = useState('market')
  const [price, setPrice] = useState('')
  const [accountType, setAccountType] = useState('demo') // demo or real

  const filteredStocks = stocksData.filter(stock =>
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePlaceOrder = () => {
    if (!selectedStock || !quantity) return
    
    const orderValue = selectedStock.price * parseInt(quantity)
    
    alert(`Order placed successfully!
    Stock: ${selectedStock.name}
    Type: ${activeTab.toUpperCase()}
    Quantity: ${quantity}
    Price: ₹${selectedStock.price}
    Total Value: ₹${orderValue.toLocaleString()}
    Account: ${accountType === 'demo' ? 'DEMO MONEY' : 'REAL MONEY'}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trading Hub
              </h1>
              <p className="mt-2 text-gray-600">Buy and sell stocks with real-time market data</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant={accountType === 'demo' ? 'default' : 'outline'}
                onClick={() => setAccountType('demo')}
                className={accountType === 'demo' ? 'bg-orange-500 hover:bg-orange-600' : ''}
              >
                Demo Trading
              </Button>
              <Button 
                variant={accountType === 'real' ? 'default' : 'outline'}
                onClick={() => setAccountType('real')}
                className={accountType === 'real' ? 'bg-green-500 hover:bg-green-600' : ''}
              >
                Live Trading
              </Button>
            </div>
          </div>

          {/* Account Type Alert */}
          <div className={`mt-4 p-4 rounded-lg border-l-4 ${
            accountType === 'demo' 
              ? 'bg-orange-50 border-orange-500' 
              : 'bg-green-50 border-green-500'
          }`}>
            <div className="flex items-center">
              <AlertTriangle className={`h-5 w-5 mr-3 ${
                accountType === 'demo' ? 'text-orange-500' : 'text-green-500'
              }`} />
              <p className={`font-medium ${
                accountType === 'demo' ? 'text-orange-800' : 'text-green-800'
              }`}>
                You are currently trading with {accountType === 'demo' ? 'DEMO MONEY' : 'REAL MONEY'}
              </p>
            </div>
            <p className={`text-sm mt-1 ${
              accountType === 'demo' ? 'text-orange-600' : 'text-green-600'
            }`}>
              {accountType === 'demo' 
                ? 'All trades are simulated and no real money will be involved.'
                : 'All trades will be executed with real money from your account.'
              }
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stock List */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">Market</CardTitle>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search stocks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStocks.slice(0, 20).map((stock) => (
                    <div
                      key={stock.symbol}
                      onClick={() => setSelectedStock(stock)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedStock?.symbol === stock.symbol
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{stock.symbol}</h3>
                          <p className="text-sm text-gray-600">{stock.name}</p>
                          <p className="text-xs text-gray-500">Sector: {stock.sector}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">₹{stock.price}</p>
                          <p className={`text-sm flex items-center justify-end ${
                            stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stock.change >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            ₹{Math.abs(stock.change)} ({stock.changePercent}%)
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            {/* Order Form */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Quick Trade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-1 mb-6">
                  <Button
                    onClick={() => setActiveTab('buy')}
                    variant={activeTab === 'buy' ? 'default' : 'outline'}
                    className={`flex-1 ${
                      activeTab === 'buy' ? 'bg-green-500 hover:bg-green-600' : ''
                    }`}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Buy
                  </Button>
                  <Button
                    onClick={() => setActiveTab('sell')}
                    variant={activeTab === 'sell' ? 'default' : 'outline'}
                    className={`flex-1 ${
                      activeTab === 'sell' ? 'bg-red-500 hover:bg-red-600' : ''
                    }`}
                  >
                    <Minus className="h-4 w-4 mr-1" />
                    Sell
                  </Button>
                </div>

                {selectedStock ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{selectedStock.symbol}</h3>
                      <p className="text-sm text-gray-600">{selectedStock.name}</p>
                      <p className="text-xl font-semibold text-gray-900">₹{selectedStock.price}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Quantity
                      </Label>
                      <Input
                        type="number"
                        placeholder="Enter quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Order Type
                      </Label>
                      <Select value={orderType} onValueChange={setOrderType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="market">Market</SelectItem>
                          <SelectItem value="limit">Limit</SelectItem>
                          <SelectItem value="stop-loss">Stop Loss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {orderType === 'limit' && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Price
                        </Label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Enter price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    )}

                    {/* Order Summary */}
                    {quantity && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-800 mb-2">Order Summary</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Stock:</span>
                            <span className="font-medium">{selectedStock.symbol}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quantity:</span>
                            <span className="font-medium">{quantity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Price:</span>
                            <span className="font-medium">₹{selectedStock.price}</span>
                          </div>
                          <div className="flex justify-between border-t pt-1">
                            <span>Total:</span>
                            <span className="font-medium">₹{(selectedStock.price * parseInt(quantity || 0)).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Account:</span>
                            <Badge variant={accountType === 'demo' ? 'secondary' : 'default'}>
                              {accountType === 'demo' ? 'DEMO' : 'REAL'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handlePlaceOrder}
                      disabled={!quantity}
                      className={`w-full ${
                        activeTab === 'buy'
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                    >
                      {activeTab === 'buy' ? 'Place Buy Order' : 'Place Sell Order'}
                    </Button>

                    {accountType === 'demo' && (
                      <p className="text-xs text-orange-600 text-center">
                        ⚠️ This order will be placed with demo money
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Select a stock to start trading</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900">Account Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Cash ({accountType})</span>
                    <span className="font-semibold">
                      ₹{accountType === 'demo' ? '1,00,000' : '25,000'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Used Margin</span>
                    <span className="font-semibold">₹15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Margin</span>
                    <span className="font-semibold text-green-600">
                      ₹{accountType === 'demo' ? '85,000' : '10,000'}
                    </span>
                  </div>
                  <div className="pt-2 border-t">
                    <Badge 
                      variant={accountType === 'demo' ? 'secondary' : 'default'}
                      className="w-full justify-center"
                    >
                      {accountType === 'demo' ? 'DEMO ACCOUNT' : 'LIVE ACCOUNT'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
