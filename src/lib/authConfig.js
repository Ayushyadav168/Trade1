// Authentication configuration for the trading platform

export const authConfig = {
  // Clerk configuration
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
    
    // OAuth providers configuration
    providers: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scope: 'openid email profile',
        redirectUri: `${process.env.NEXTAUTH_URL}/api/auth/callback/google`
      }
    },

    // Sign-in and sign-up configuration
    signIn: {
      redirectUrl: '/dashboard',
      fallbackRedirectUrl: '/dashboard'
    },
    
    signUp: {
      redirectUrl: '/onboarding',
      fallbackRedirectUrl: '/dashboard'
    },

    // Protected routes
    protectedRoutes: [
      '/dashboard(.*)',
      '/trading(.*)',
      '/portfolio(.*)',
      '/wallet(.*)',
      '/settings(.*)'
    ],

    // Public routes (accessible without authentication)
    publicRoutes: [
      '/',
      '/about',
      '/contact',
      '/pricing',
      '/features',
      '/api/webhooks(.*)'
    ]
  },

  // Security settings
  security: {
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    requireEmailVerification: true,
    enableTwoFactor: false, // Can be enabled for enhanced security
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000 // 15 minutes
  },

  // Trading platform specific settings
  trading: {
    requireKYC: true,
    minimumAge: 18,
    restrictedCountries: [], // Add country codes if needed
    requirePhoneVerification: true
  }
}

// Helper functions for authentication
export const getAuthConfig = () => authConfig

export const isProtectedRoute = (pathname) => {
  return authConfig.clerk.protectedRoutes.some(route => 
    pathname.match(new RegExp(route))
  )
}

export const isPublicRoute = (pathname) => {
  return authConfig.clerk.publicRoutes.some(route => 
    pathname.match(new RegExp(route))
  )
}

export const getRedirectUrl = (isSignUp = false) => {
  return isSignUp ? authConfig.clerk.signUp.redirectUrl : authConfig.clerk.signIn.redirectUrl
}
