const express = require('express');
const cors = require('cors');
const SSLCommerzPayment = require('sslcommerz-lts');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = 5000;

const store_id = process.env.SSLC_STORE_ID || "ash68a8b1ffc3011";
const store_passwd = process.env.SSLC_STORE_PASS || "ash68a8b1ffc3011@ssl";
const is_live = false; // false = sandbox mode

// ✅ Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ✅ MongoDB connection
const client = new MongoClient(process.env.MONGO_URI);
let OrderCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("greentop");
    OrderCollection = db.collection("orders");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err);
  }
}
connectDB();

// ✅ Test route
app.get('/', (req, res) => res.send('Hello from SSLCommerz server!'));

// ✅ Order creation route
app.post('/order', async (req, res) => {
  console.log("Order API invoked");

  try {
    const { name, email, phone, amount } = req.body;
    const totalAmount = Number(amount);
    const tran_id = 'REF' + Date.now();

    const data = {
      total_amount: totalAmount,
      currency: 'BDT',
      tran_id,
      success_url: `http://localhost:5000/payment/success/${tran_id}`,
      fail_url: `http://localhost:5000/payment/fail/${tran_id}`,
      cancel_url: `http://localhost:5000/payment/cancel/${tran_id}`,
      ipn_url: 'http://localhost:5000/ipn',
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

    // Save initial order
    const finalOrder = {
      product_name: data.product_name,
      paidStatus: false,
      tran_id,
      amount: totalAmount,
      customer: { name, email, phone },
      createdAt: new Date(),
    };

    await OrderCollection.insertOne(finalOrder);

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);

    console.log("Api Response:", apiResponse);

    if (apiResponse.GatewayPageURL) {
      return res.json({ url: apiResponse.GatewayPageURL });
    } else {
      return res.status(500).json({ error: 'SSLCommerz failed: no GatewayPageURL' });
    }
  } catch (err) {
    console.error('SSLCommerz error:', err);
    res.status(500).json({ error: 'SSLCommerz session failed' });
  }
});

// ✅ Success route
app.post('/payment/success/:tran_id', async (req, res) => {
  try {
    const tran_id = req.params.tran_id;
    await OrderCollection.updateOne(
      { tran_id },
      { $set: { paidStatus: true } }
    );
    res.redirect(`http://localhost:3000/payment/success${req.params.tran_id}`);
  } catch (err) {
    console.error('Payment success update failed:', err);
    res.status(500).send('Database update failed');
  }
});

// ✅ Fail route
app.post('/payment/fail/:tran_id', async (req, res) => {
  try {
    const tran_id = req.params.tran_id;
    await OrderCollection.deleteOne({ tran_id });
    res.redirect(`http://localhost:3000/fail`);
  } catch (err) {
    console.error('Payment fail cleanup failed:', err);
    res.status(500).send('Database cleanup failed');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
