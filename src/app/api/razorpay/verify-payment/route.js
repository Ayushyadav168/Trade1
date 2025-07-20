import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import RazorpayService from '../../../lib/razorpayService';

export async function POST(request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId, paymentId, signature } = await request.json();
    
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Order ID, Payment ID, and Signature are required' },
        { status: 400 }
      );
    }

    const razorpayService = new RazorpayService();
    const isValidSignature = razorpayService.verifyPaymentSignature(orderId, paymentId, signature);
    
    if (!isValidSignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Get payment details
    const payment = await razorpayService.getPayment(paymentId);
    
    // Here you would typically:
    // 1. Update user's wallet balance in your database
    // 2. Store transaction details
    // 3. Send confirmation email/notification
    
    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      amount: payment.amount / 100, // Convert from paise to rupees
      status: payment.status,
      method: payment.method,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
