import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBm0nZSuQKFPF6XYuv1Ft5DhwKnocnp2to')

export class GeminiService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' })
  }

  async getStockAnalysis(stockData) {
    try {
      const prompt = `
        Analyze the following stock data and provide investment insights:
        
        Stock: ${stockData.name} (${stockData.symbol})
        Current Price: ₹${stockData.price}
        Day Change: ${stockData.changePercent}%
        P/E Ratio: ${stockData.pe}
        P/B Ratio: ${stockData.pb}
        Market Cap: ₹${stockData.marketCap} Cr
        Sector: ${stockData.sector}
        ROE: ${stockData.roe}%
        Dividend Yield: ${stockData.dividend}%
        52 Week High: ₹${stockData.week52High}
        52 Week Low: ₹${stockData.week52Low}
        
        Please provide:
        1. Investment recommendation (BUY/HOLD/SELL)
        2. Risk level (LOW/MEDIUM/HIGH)
        3. Target price range
        4. Key strengths and concerns
        5. Investment horizon suggestion
        
        Keep the response concise and under 200 words.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error getting stock analysis:', error)
      return 'Unable to generate analysis at the moment. Please try again later.'
    }
  }

  async getMutualFundAnalysis(fundData) {
    try {
      const prompt = `
        Analyze the following mutual fund and provide investment insights:
        
        Fund: ${fundData.name}
        Category: ${fundData.category}
        NAV: ₹${fundData.nav}
        1Y Return: ${fundData.returns1y}%
        3Y Return: ${fundData.returns3y}%
        5Y Return: ${fundData.returns5y}%
        Expense Ratio: ${fundData.expenseRatio}%
        Risk Level: ${fundData.riskLevel}
        Fund Size: ₹${fundData.fundSize} Cr
        Minimum Investment: ₹${fundData.minInvestment}
        SIP Available: ${fundData.sipAvailable ? 'Yes' : 'No'}
        
        Please provide:
        1. Investment recommendation (BUY/HOLD/AVOID)
        2. Suitable investor profile
        3. SIP vs Lumpsum suggestion
        4. Performance analysis
        5. Risk assessment
        
        Keep the response concise and under 200 words.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error getting mutual fund analysis:', error)
      return 'Unable to generate analysis at the moment. Please try again later.'
    }
  }

  async getETFAnalysis(etfData) {
    try {
      const prompt = `
        Analyze the following ETF and provide investment insights:
        
        ETF: ${etfData.name} (${etfData.symbol})
        Category: ${etfData.category}
        Underlying: ${etfData.underlying}
        Current Price: ₹${etfData.price}
        Day Change: ${etfData.changePercent}%
        AUM: ₹${etfData.aum} Cr
        Expense Ratio: ${etfData.expenseRatio}%
        Tracking Error: ${etfData.trackingError}%
        Dividend Yield: ${etfData.dividendYield}%
        Volume: ${etfData.volume}
        
        Please provide:
        1. Investment recommendation (BUY/HOLD/SELL)
        2. Liquidity assessment
        3. Cost efficiency analysis
        4. Tracking quality evaluation
        5. Suitable investment strategy
        
        Keep the response concise and under 200 words.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error getting ETF analysis:', error)
      return 'Unable to generate analysis at the moment. Please try again later.'
    }
  }

  async getMarketInsights(newsData) {
    try {
      const newsItems = Array.isArray(newsData) && newsData.length > 0 ? newsData : [
        {
          title: "Sample Market News",
          category: "market",
          impact: "neutral",
          summary: "Market showing mixed signals",
          relatedStocks: ["NIFTY"]
        }
      ]

      const prompt = `
        Analyze the following market news and provide insights:
        
        ${newsItems.map(news => `
        Title: ${news.title}
        Category: ${news.category}
        Impact: ${news.impact}
        Summary: ${news.summary}
        Related Stocks: ${news.relatedStocks?.join(', ') || 'N/A'}
        `).join('\n')}
        
        Please provide:
        1. Overall market sentiment
        2. Key themes and trends
        3. Sector-wise impact
        4. Investment opportunities
        5. Risk factors to watch
        
        Keep the response concise and under 250 words.
      `

      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Error getting market insights:', error)
      return 'Unable to generate market insights at the moment. Please try again later.'
    }
  }
}

export const geminiService = new GeminiService()
