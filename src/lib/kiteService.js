const KiteConnect = require('kiteconnect').KiteConnect;

class KiteService {
  constructor() {
    this.kc = new KiteConnect({
      api_key: process.env.KITE_API_KEY,
      debug: process.env.NODE_ENV === 'development'
    });
  }

  // Initialize login URL
  getLoginURL() {
    return this.kc.getLoginURL();
  }

  // Generate session after login
  async generateSession(requestToken) {
    try {
      const response = await this.kc.generateSession(requestToken, process.env.KITE_SECRET_KEY);
      this.kc.setAccessToken(response.access_token);
      return response;
    } catch (error) {
      throw new Error(`Session generation failed: ${error.message}`);
    }
  }

  // Set access token for authenticated requests
  setAccessToken(accessToken) {
    this.kc.setAccessToken(accessToken);
  }

  // Get user profile
  async getProfile() {
    try {
      return await this.kc.getProfile();
    } catch (error) {
      throw new Error(`Failed to get profile: ${error.message}`);
    }
  }

  // Get account margins
  async getMargins() {
    try {
      return await this.kc.getMargins();
    } catch (error) {
      throw new Error(`Failed to get margins: ${error.message}`);
    }
  }

  // Get holdings
  async getHoldings() {
    try {
      return await this.kc.getHoldings();
    } catch (error) {
      throw new Error(`Failed to get holdings: ${error.message}`);
    }
  }

  // Get positions
  async getPositions() {
    try {
      return await this.kc.getPositions();
    } catch (error) {
      throw new Error(`Failed to get positions: ${error.message}`);
    }
  }

  // Get orders
  async getOrders() {
    try {
      return await this.kc.getOrders();
    } catch (error) {
      throw new Error(`Failed to get orders: ${error.message}`);
    }
  }

  // Place order
  async placeOrder(orderParams) {
    try {
      return await this.kc.placeOrder(orderParams.variety, orderParams);
    } catch (error) {
      throw new Error(`Failed to place order: ${error.message}`);
    }
  }

  // Modify order
  async modifyOrder(orderId, orderParams) {
    try {
      return await this.kc.modifyOrder(orderParams.variety, orderId, orderParams);
    } catch (error) {
      throw new Error(`Failed to modify order: ${error.message}`);
    }
  }

  // Cancel order
  async cancelOrder(orderId, variety = 'regular') {
    try {
      return await this.kc.cancelOrder(variety, orderId);
    } catch (error) {
      throw new Error(`Failed to cancel order: ${error.message}`);
    }
  }

  // Get quote
  async getQuote(instruments) {
    try {
      return await this.kc.getQuote(instruments);
    } catch (error) {
      throw new Error(`Failed to get quote: ${error.message}`);
    }
  }

  // Get LTP (Last Traded Price)
  async getLTP(instruments) {
    try {
      return await this.kc.getLTP(instruments);
    } catch (error) {
      throw new Error(`Failed to get LTP: ${error.message}`);
    }
  }

  // Get OHLC (Open, High, Low, Close)
  async getOHLC(instruments) {
    try {
      return await this.kc.getOHLC(instruments);
    } catch (error) {
      throw new Error(`Failed to get OHLC: ${error.message}`);
    }
  }

  // Get instruments
  async getInstruments(exchange = null) {
    try {
      return await this.kc.getInstruments(exchange);
    } catch (error) {
      throw new Error(`Failed to get instruments: ${error.message}`);
    }
  }

  // Get historical data
  async getHistoricalData(instrumentToken, interval, from, to, continuous = false, oi = false) {
    try {
      return await this.kc.getHistoricalData(instrumentToken, interval, from, to, continuous, oi);
    } catch (error) {
      throw new Error(`Failed to get historical data: ${error.message}`);
    }
  }

  // Get mutual fund holdings
  async getMFHoldings() {
    try {
      return await this.kc.getMFHoldings();
    } catch (error) {
      throw new Error(`Failed to get MF holdings: ${error.message}`);
    }
  }

  // Get mutual fund orders
  async getMFOrders() {
    try {
      return await this.kc.getMFOrders();
    } catch (error) {
      throw new Error(`Failed to get MF orders: ${error.message}`);
    }
  }

  // Place mutual fund order
  async placeMFOrder(orderParams) {
    try {
      return await this.kc.placeMFOrder(orderParams);
    } catch (error) {
      throw new Error(`Failed to place MF order: ${error.message}`);
    }
  }

  // Cancel mutual fund order
  async cancelMFOrder(orderId) {
    try {
      return await this.kc.cancelMFOrder(orderId);
    } catch (error) {
      throw new Error(`Failed to cancel MF order: ${error.message}`);
    }
  }

  // Get mutual fund instruments
  async getMFInstruments() {
    try {
      return await this.kc.getMFInstruments();
    } catch (error) {
      throw new Error(`Failed to get MF instruments: ${error.message}`);
    }
  }
}

module.exports = KiteService;
