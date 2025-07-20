# TradeApp - Complete Trading Platform

A comprehensive trading application built with Next.js, React, and integrated with Kite Connect API, Clerk authentication, and Razorpay payments.

## Features

### 🚀 Core Trading Features
- **Stock Trading**: Buy/sell stocks with real-time market data
- **Mutual Funds**: Invest in MF with SIP and lump sum options
- **ETF Trading**: Trade ETFs with comprehensive analytics
- **Portfolio Management**: Track holdings, returns, and performance
- **Real-time Market Data**: Live prices, charts, and market indicators

### 🔐 Authentication & Security
- **Clerk Integration**: Secure user authentication and management
- **Multi-factor Authentication**: Enhanced security for trading accounts
- **Session Management**: Secure session handling with auto-logout

### 💳 Payment & Wallet
- **Razorpay Integration**: Secure payment gateway for fund deposits
- **Wallet Management**: Track available balance and margin
- **Transaction History**: Complete payment and trading history

### 📱 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Real-time Updates**: Live market data and portfolio updates
- **Advanced Charts**: Interactive trading charts and analytics
- **Quick Actions**: Fast order placement and portfolio management

## Tech Stack

- **Frontend**: React, Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom components
- **Authentication**: Clerk
- **Trading API**: Kite Connect (Zerodha)
- **Payments**: Razorpay
- **Icons**: Lucide React

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Kite Connect API (Zerodha)
KITE_API_KEY=your_kite_api_key
KITE_SECRET_KEY=your_kite_secret_key

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your API keys and credentials

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard pages
│   └── page.js           # Home page
├── components/            # Reusable components
│   └── dashboard/        # Dashboard-specific components
├── lib/                  # Service classes and utilities
│   ├── kiteService.js    # Kite Connect API integration
│   └── razorpayService.js # Razorpay payment integration
└── styles/               # Global styles
```

## API Integration

### Kite Connect (Trading)
- User authentication and session management
- Real-time market data and quotes
- Order placement and management
- Portfolio and holdings tracking
- Mutual fund operations

### Razorpay (Payments)
- Secure payment processing
- Wallet and fund management
- Transaction verification
- Refund handling

### Clerk (Authentication)
- User registration and login
- Session management
- Profile management
- Security features

## Key Pages

- **Dashboard** (`/dashboard`) - Main trading dashboard
- **Trading** (`/dashboard/trading`) - Stock trading interface
- **Mutual Funds** (`/dashboard/mutual-funds`) - MF investment platform
- **ETF** (`/dashboard/etf`) - ETF trading platform
- **Portfolio** (`/dashboard/portfolio`) - Holdings and performance
- **Wallet** (`/dashboard/wallet`) - Fund management

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Security Notes

- Never commit API keys or secrets
- Use environment variables for all sensitive data
- Implement proper error handling for API calls
- Follow security best practices for financial applications

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub or contact the development team.
