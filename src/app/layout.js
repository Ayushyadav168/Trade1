
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Script from 'next/script'
import AIChatbot from '../components/AIChatbot';
import ThemeToggle from '../components/ThemeToggle';
// Theme context and provider must be in a separate client component file.

export const metadata = {
  title: 'TradeApp - Your Complete Trading Platform',
  description: 'Trade stocks, mutual funds, and ETFs with advanced features and real-time data.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        </head>
        <body className="min-h-screen transition-colors">
          <ThemeToggle />
          {children}
          <AIChatbot />
          <Script 
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="lazyOnload"
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
