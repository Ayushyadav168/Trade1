import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import KiteService from '../../../lib/kiteService';

export async function GET(request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accessToken = request.headers.get('X-Kite-Access-Token');
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    const kiteService = new KiteService();
    kiteService.setAccessToken(accessToken);
    
    const orders = await kiteService.getOrders();
    
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
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

    const accessToken = request.headers.get('X-Kite-Access-Token');
    
    if (!accessToken) {
      return NextResponse.json(
        { error: 'Access token is required' },
        { status: 400 }
      );
    }

    const orderParams = await request.json();
    
    // Validate required order parameters
    const requiredFields = ['tradingsymbol', 'exchange', 'transaction_type', 'order_type', 'quantity'];
    for (const field of requiredFields) {
      if (!orderParams[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const kiteService = new KiteService();
    kiteService.setAccessToken(accessToken);
    
    // Set default variety if not provided
    if (!orderParams.variety) {
      orderParams.variety = 'regular';
    }
    
    const order = await kiteService.placeOrder(orderParams);
    
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json(
      { error: 'Failed to place order' },
      { status: 500 }
    );
  }
}
