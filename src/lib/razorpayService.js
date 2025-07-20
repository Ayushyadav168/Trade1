const Razorpay = require('razorpay');
const crypto = require('crypto');

class RazorpayService {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  // Create order
  async createOrder(amount, currency = 'INR', receipt = null) {
    try {
      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: currency,
        receipt: receipt || `receipt_${Date.now()}`,
        payment_capture: 1, // Auto capture
      };

      const order = await this.razorpay.orders.create(options);
      return order;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  // Verify payment signature
  verifyPaymentSignature(orderId, paymentId, signature) {
    try {
      const body = orderId + '|' + paymentId;
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');

      return expectedSignature === signature;
    } catch (error) {
      throw new Error(`Failed to verify signature: ${error.message}`);
    }
  }

  // Get order details
  async getOrder(orderId) {
    try {
      return await this.razorpay.orders.fetch(orderId);
    } catch (error) {
      throw new Error(`Failed to get order: ${error.message}`);
    }
  }

  // Get payment details
  async getPayment(paymentId) {
    try {
      return await this.razorpay.payments.fetch(paymentId);
    } catch (error) {
      throw new Error(`Failed to get payment: ${error.message}`);
    }
  }

  // Capture payment
  async capturePayment(paymentId, amount) {
    try {
      return await this.razorpay.payments.capture(paymentId, amount * 100);
    } catch (error) {
      throw new Error(`Failed to capture payment: ${error.message}`);
    }
  }

  // Refund payment
  async refundPayment(paymentId, amount = null) {
    try {
      const refundData = {};
      if (amount) {
        refundData.amount = amount * 100;
      }
      
      return await this.razorpay.payments.refund(paymentId, refundData);
    } catch (error) {
      throw new Error(`Failed to refund payment: ${error.message}`);
    }
  }

  // Get all payments for an order
  async getOrderPayments(orderId) {
    try {
      return await this.razorpay.orders.fetchPayments(orderId);
    } catch (error) {
      throw new Error(`Failed to get order payments: ${error.message}`);
    }
  }

  // Create subscription
  async createSubscription(planId, totalCount, customerNotify = 1) {
    try {
      const options = {
        plan_id: planId,
        total_count: totalCount,
        customer_notify: customerNotify,
      };

      return await this.razorpay.subscriptions.create(options);
    } catch (error) {
      throw new Error(`Failed to create subscription: ${error.message}`);
    }
  }

  // Create customer
  async createCustomer(name, email, contact) {
    try {
      const options = {
        name: name,
        email: email,
        contact: contact,
      };

      return await this.razorpay.customers.create(options);
    } catch (error) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }

  // Generate payment options for frontend
  generatePaymentOptions(order, userDetails) {
    return {
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'TradeApp',
      description: 'Add funds to trading account',
      image: '/logo.png', // Your app logo
      order_id: order.id,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.contact,
      },
      theme: {
        color: '#3B82F6', // Your primary color
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
        },
      },
    };
  }
}

module.exports = RazorpayService;
