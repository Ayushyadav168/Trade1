# Google OAuth Setup Guide for TradePro

## Overview
This guide will help you configure Google OAuth authentication with Clerk for your TradePro trading application.

## Step 1: Google Cloud Console Setup

### 1.1 Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API and Google OAuth2 API

### 1.2 Configure OAuth Consent Screen
1. Navigate to **APIs & Services > OAuth consent screen**
2. Choose **External** user type
3. Fill in the required information:
   - **App name**: TradePro Trading Platform
   - **User support email**: Your email
   - **App logo**: Upload your app logo
   - **App domain**: Your domain (e.g., tradepro.com)
   - **Developer contact information**: Your email

### 1.3 Create OAuth 2.0 Credentials
1. Go to **APIs & Services > Credentials**
2. Click **+ CREATE CREDENTIALS > OAuth 2.0 Client IDs**
3. Select **Web application**
4. Configure the following:
   - **Name**: TradePro Web Client
   - **Authorized JavaScript origins**: 
     - `http://localhost:3001` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3001/api/auth/callback/google`
     - `https://yourdomain.com/api/auth/callback/google`
     - `https://your-clerk-frontend-api.clerk.accounts.dev/v1/oauth_callback` (Clerk callback)

## Step 2: Clerk Dashboard Setup

### 2.1 Access Clerk Dashboard
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your TradePro application
3. Navigate to **User & Authentication > Social Connections**

### 2.2 Configure Google OAuth
1. Click on **Google** in the social connections list
2. Toggle **Enable Google** to ON
3. Enter your Google OAuth credentials:
   - **Client ID**: Your Google OAuth Client ID
   - **Client Secret**: Your Google OAuth Client Secret (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)
4. Configure the settings:
   - **Scopes**: `openid email profile`
   - **Strategy**: `oauth_google`
5. Click **Save**

### 2.3 Configure Authentication Settings
1. Go to **User & Authentication > Authentication**
2. Enable the following sign-in methods:
   - ✅ Email address
   - ✅ Google OAuth
3. Configure sign-up settings:
   - ✅ Email address
   - ✅ Google OAuth
4. Set up verification:
   - ✅ Email verification required
   - ✅ Phone verification (optional)

## Step 3: Environment Variables

Update your `.env.local` file with the correct Google Client ID:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YXdhcmUtZWxlcGhhbnQtNy5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_1MJyMFLSQwptWD4mdgJ2n0wVbhWioCErhyDZc1uT5n

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=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

# Kite Connect API (Zerodha)
KITE_API_KEY=bi9cqrn641dx5k1a
KITE_SECRET_KEY=n3lkbt74ml7uct6y11ptpcb1c7eehrpk

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_UGukCujOKmAXm4
RAZORPAY_KEY_SECRET=7ZtGrhKFQgjBogrodCRaiTSB

# Application URLs
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here
```

## Step 4: Clerk Frontend API Configuration

### 4.1 Get Your Clerk Frontend API
1. In Clerk Dashboard, go to **Settings > API Keys**
2. Copy your **Frontend API** URL (looks like: `https://your-app.clerk.accounts.dev`)

### 4.2 Update Google OAuth Redirect URI
Add this to your Google Cloud Console authorized redirect URIs:
```
https://your-clerk-frontend-api.clerk.accounts.dev/v1/oauth_callback
```

## Step 5: Testing the Integration

### 5.1 Development Testing
1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3001`
3. Click **Sign In** or **Get Started**
4. Click **Sign in with Google**
5. Complete the Google OAuth flow
6. Verify successful authentication and redirection to dashboard

### 5.2 Test Cases to Verify
- ✅ Google Sign In for new users
- ✅ Google Sign Up for existing users
- ✅ Email verification flow
- ✅ User profile creation
- ✅ Onboarding flow for new users
- ✅ Dashboard access after authentication
- ✅ Sign out functionality

## Step 6: Production Deployment

### 6.1 Update Environment Variables
For production, update your environment variables with:
- Production Google OAuth credentials
- Production Clerk keys
- Production domain URLs

### 6.2 Update Redirect URIs
Add your production domain to:
- Google Cloud Console authorized redirect URIs
- Clerk Dashboard allowed origins

### 6.3 SSL Certificate
Ensure your production domain has a valid SSL certificate for HTTPS.

## Troubleshooting

### Common Issues and Solutions

**1. "OAuth Error: Invalid Client"**
- Verify Google Client ID is correct
- Check authorized JavaScript origins in Google Console
- Ensure Clerk has the correct Google credentials

**2. "Redirect URI Mismatch"**
- Verify all redirect URIs are correctly configured
- Check both Google Console and Clerk Dashboard settings
- Ensure URLs match exactly (including http/https)

**3. "Email Already Exists"**
- This occurs when a user tries to sign up with Google but already has an account
- Direct users to sign in instead
- Consider account linking in Clerk settings

**4. "Scopes Not Granted"**
- Ensure required scopes are configured in Clerk
- Check Google OAuth consent screen settings
- Verify user grants necessary permissions

### Debug Steps
1. Check browser console for JavaScript errors
2. Verify network requests in browser DevTools
3. Check Clerk Dashboard logs
4. Review Google Cloud Console OAuth2 logs

## Security Considerations

### Best Practices
1. **Environment Variables**: Never commit sensitive keys to version control
2. **HTTPS**: Always use HTTPS in production
3. **Scopes**: Request minimal necessary scopes
4. **Validation**: Validate user data on both client and server
5. **Session Management**: Configure appropriate session timeouts

### Additional Security Features
- Enable two-factor authentication in Clerk
- Set up webhook endpoints for user events
- Implement proper CORS policies
- Use Clerk's built-in rate limiting

## Support and Documentation

### Useful Links
- [Clerk Documentation](https://clerk.com/docs)
- [Google OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Authentication](https://nextjs.org/docs/authentication)

### Getting Help
If you encounter issues:
1. Check Clerk Dashboard logs
2. Review Google Cloud Console error messages
3. Consult Clerk community forums
4. Contact Clerk support for complex issues

---

**Important**: Replace `your_actual_google_client_id_here` with your actual Google OAuth Client ID before deploying.
