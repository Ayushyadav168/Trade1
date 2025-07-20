import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import KiteService from '../../../lib/kiteService';

export async function GET(request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get access token from request headers or session
    const accessToken = request.headers.get('X-Kite-Access-Token');
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    const kiteService = new KiteService();
    kiteService.setAccessToken(accessToken);
    
    const holdings = await kiteService.getHoldings();
    
    return NextResponse.json({ holdings });
  } catch (error) {
    console.error('Error fetching holdings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch holdings' },
      { status: 500 }
    );
  }
}
