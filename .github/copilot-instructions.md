<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Trading App - Copilot Instructions

This is a comprehensive trading application built with Next.js, React, and various financial APIs.

## Project Structure
- **Frontend**: React with Next.js App Router
- **Authentication**: Clerk for user management
- **Trading API**: Kite Connect (Zerodha) for stock trading
- **Payment Gateway**: Razorpay for secure payments
- **Styling**: Tailwind CSS with custom components
- **Features**: Stocks, Mutual Funds, ETFs trading

## Key Components
- `/src/app` - Next.js 13+ App Router pages
- `/src/components` - Reusable React components
- `/src/lib` - Service classes for API integrations
- `/src/app/api` - API routes for backend functionality

## APIs and Services
1. **Kite Connect API** - For stock trading, holdings, orders
2. **Razorpay** - For payment processing and wallet management
3. **Clerk** - For authentication and user management

## Environment Variables
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY  
- KITE_API_KEY
- KITE_SECRET_KEY
- RAZORPAY_KEY_ID
- RAZORPAY_KEY_SECRET

## Development Guidelines
- Use TypeScript/JavaScript ES6+ features
- Follow React hooks patterns
- Implement responsive design with Tailwind CSS
- Use proper error handling for API calls
- Maintain clean component structure with proper props
- Follow Next.js 13+ App Router conventions
