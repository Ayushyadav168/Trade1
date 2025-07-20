# 🚀 TradePro - AI-Powered Trading Platform

A comprehensive trading application with Google Gemini AI integration, built with Next.js 14, Clerk authentication, and Razorpay payments.

## ✨ Key Features

### 🤖 AI-Powered Analysis
- **Gemini AI Integration**: Personalized investment insights for stocks, mutual funds, and ETFs
- **Smart Recommendations**: AI-driven buy/hold/sell suggestions based on fundamental and technical analysis
- **Market Insights**: Real-time market sentiment analysis from news data
- **Risk Assessment**: Intelligent risk profiling for better investment decisions

### 📈 Trading Features
- **Enhanced Stock Search**: Advanced filtering, watchlist, and comprehensive stock data
- **Mutual Funds Explorer**: SIP options, performance analytics, and fund comparison
- **ETF Trading**: Low-cost ETF trading with liquidity analysis
- **News Widget**: Market news with AI-powered insights

### 🔐 Authentication & Security
- **Clerk Authentication**: Secure login with Google OAuth integration
- **Protected Routes**: Middleware-based route protection
- **User Profiles**: Personalized user experience

### 💳 Payment Integration
- **Razorpay Gateway**: Secure payment processing for investments
- **Multiple Payment Methods**: Cards, UPI, Net Banking support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Authentication**: Clerk with Google OAuth
- **AI**: Google Gemini AI (gemini-pro model)
- **Payments**: Razorpay
- **Trading API**: Kite Connect (Zerodha)
- **Icons**: Lucide React

## 🔧 Setup Instructions

### 1. Clone and Install
```bash
git clone <repository-url>
cd Trade1
npm install
```

### 2. Environment Configuration
Create `.env.local` file with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyBm0nZSuQKFPF6XYuv1Ft5DhwKnocnp2to

# Kite Connect API
KITE_API_KEY=your_kite_api_key
KITE_SECRET_KEY=your_kite_secret_key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🤖 AI Features Overview

### Stock Analysis
The AI provides comprehensive stock analysis including:
- **Investment Recommendation**: BUY/HOLD/SELL with reasoning
- **Risk Assessment**: LOW/MEDIUM/HIGH risk categorization
- **Target Price**: AI-calculated price targets
- **Key Insights**: Strengths, concerns, and investment horizon

### Mutual Fund Analysis
AI evaluates mutual funds considering:
- **Performance Analysis**: Returns across different time periods
- **Risk Assessment**: Suitable investor profile identification
- **Investment Strategy**: SIP vs Lumpsum recommendations
- **Comparative Analysis**: Fund positioning in category

### ETF Analysis
ETF evaluation includes:
- **Cost Efficiency**: Expense ratio and tracking error analysis
- **Liquidity Assessment**: Volume and bid-ask spread evaluation
- **Tracking Quality**: How well the ETF tracks its underlying index
- **Investment Strategy**: Best practices for ETF investing

### Market Insights
AI-powered market analysis provides:
- **Market Sentiment**: Overall market mood and direction
- **Sector Analysis**: Industry-wise performance insights
- **Risk Factors**: Key risks to monitor
- **Investment Opportunities**: Emerging trends and opportunities

## 📱 Component Structure

### Core Components
- **AIAnalysisModal**: Main AI analysis interface
- **AISuggestionButton**: Reusable AI button with variants
- **ErrorBoundary**: Error handling wrapper
- **NewsWidget**: Market news with AI insights

### Trading Components
- **EnhancedStockSearch**: Advanced stock screening and analysis
- **MutualFundsExplorer**: Comprehensive mutual fund discovery
- **ETFExplorer**: ETF trading and analysis platform

### Dashboard Components
- **AdvancedPortfolio**: Portfolio management and analytics
- **AdvancedTradingPanel**: Trading interface
- **AIShowcase**: Interactive AI features demonstration

## 🔄 AI Integration Flow

1. **User Action**: Click AI Analysis button on any investment
2. **Data Processing**: Component passes investment data to Gemini service
3. **AI Analysis**: Gemini AI processes data and generates insights
4. **Response Display**: Results shown in interactive modal
5. **User Decision**: User can act on AI recommendations

## 🎨 Button Variants

The `AISuggestionButton` component supports multiple variants:
- **Default**: Standard button for most use cases
- **Compact**: Smaller button for tight spaces
- **Large**: Prominent button for key actions
- **Outline**: Subtle outline style

## 🔐 Security Features

- **API Key Protection**: Environment variables for sensitive data
- **Error Handling**: Comprehensive error boundaries
- **Rate Limiting**: Built-in protection against API abuse
- **Input Validation**: Sanitized inputs for AI analysis

## 🧪 Testing

Visit `/ai-test` page to test AI integration:
- Test all investment types (stocks, MFs, ETFs)
- Verify button variants
- Check error handling
- Validate API responses

## 📊 Performance Optimization

- **Lazy Loading**: Components load on demand
- **Error Boundaries**: Graceful error handling
- **Caching**: Optimized API calls
- **Responsive Design**: Mobile-first approach

## 🚀 Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Environment Variables for Production
Ensure all environment variables are configured in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@tradepro.com or join our Discord channel.

---

**Built with ❤️ using Next.js, Gemini AI, and modern web technologies.**
