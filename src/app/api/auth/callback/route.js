import { NextResponse } from 'next/server'

export async function GET(request) {
  // This endpoint handles the OAuth callback from Google
  // Clerk automatically handles the OAuth flow, so we just redirect to dashboard
  
  const { searchParams } = new URL(request.url)
  const redirectUrl = searchParams.get('redirect_url') || '/dashboard'
  
  return NextResponse.redirect(new URL(redirectUrl, request.url))
}

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Handle any post-authentication logic here
    // For example, creating user profile, setting up initial data, etc.
    
    return NextResponse.json({ 
      success: true, 
      message: 'Authentication successful',
      redirectUrl: '/dashboard'
    })
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
