const express = require('express');
const cors = require('cors');
const SSLCommerzPayment = require('sslcommerz-lts');
require('dotenv').config();

const app = express();
const PORT = 5000;

const store_id = "ash68a8b1ffc3011";
const store_passwd = "ash68a8b1ffc3011@ssl";
const is_live = false; // false for sandbox, true for live

app.use(cors({ origin: "http://localhost:3000" })); // allow frontend
app.use(express.json());

// Test route
app.get('/', (req, res) => res.send('Hello from SSLCommerz server!'));

// Redirect directly to SSLCommerz
app.post('/order', async (req, res) => {
    console.log("Order API invoked")
    try {
      const { name, email, phone, amount } = req.body;
      const totalAmount = Number(amount);
  
      const data = {
        total_amount: totalAmount,
        currency: 'BDT',
        tran_id: 'REF' + Date.now(),
        success_url: 'http://localhost:3000/success',
        fail_url: 'http://localhost:3000/fail',
        cancel_url: 'http://localhost:3000/cancel',
        ipn_url: 'http://localhost:3000/ipn',
        shipping_method: 'Courier',
        product_name: 'Products from Basket',
        product_category: 'General',
        product_profile: 'general',
        cus_name: name,
        cus_email: email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: phone,
        ship_name: name,
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
      };
  
      const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
      const apiResponse = await sslcz.init(data);
  
      console.log("Api Response: ", apiResponse);
      if (apiResponse.GatewayPageURL) {
        // ✅ Send URL back to frontend
        return res.json({ url: apiResponse.GatewayPageURL });
      } else {
        return res.status(500).json({ error: 'SSLCommerz failed: no GatewayPageURL' });
      }
    } catch (err) {
      console.error('SSLCommerz error:', err);
      res.status(500).json({ error: 'SSLCommerz session failed' });
    }
});

app.listen(5000,()=>{
    console.log("Running on port 5000")
})