import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import KiteService from '../../../lib/kiteService';

export async function GET(request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const kiteService = new KiteService();
    const loginURL = kiteService.getLoginURL();
    
    return NextResponse.json({ loginURL });
  } catch (error) {
    console.error('Error generating login URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate login URL' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { requestToken } = await request.json();
    
    if (!requestToken) {
      return NextResponse.json(
        { error: 'Request token is required' },
        { status: 400 }
      );
    }

    const kiteService = new KiteService();
    const session = await kiteService.generateSession(requestToken);
    
    // Store access token in your database or session management
    // For demo purposes, we're returning it
    // In production, store it securely and associate with user
    
    return NextResponse.json({
      accessToken: session.access_token,
      publicToken: session.public_token,
      loginTime: session.login_time,
      userId: session.user_id,
      userShortname: session.user_shortname,
      userType: session.user_type,
    });
  } catch (error) {
    console.error('Error generating session:', error);
    return NextResponse.json(
      { error: 'Failed to generate session' },
      { status: 500 }
    );
  }
}
