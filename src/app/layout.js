import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import Script from 'next/script'

export const metadata = {
  title: 'TradeApp - Your Complete Trading Platform',
  description: 'Trade stocks, mutual funds, and ETFs with advanced features and real-time data.',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50 min-h-screen">
          {children}
          <Script 
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="lazyOnload"
          />
        </body>
      </html>
    </ClerkProvider>
  )
}
