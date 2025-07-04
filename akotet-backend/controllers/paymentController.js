import axios from 'axios';
import pool from '../models/db.js';

export const pay = async (req, res) => {
  const tx_ref = `akotet-${Date.now()}`;
  const price = req.body.price;
  const payload = {
    tx_ref,
    callback_url: `${process.env.BACKEND_URL}/callback`,
    return_url: `${process.env.FRONTEND_URL}/verify/${tx_ref}`,
    amount: price,
    currency: "ETB",
    meta: { ...req.body },
    customization: {
      title: "Akotet Shoes",
      description: "Leather Shoe Payment",
    },
  };

  try {
    const response = await axios.post('https://api.chapa.co/v1/transaction/initialize', payload, { headers: { Authorization: `Bearer ${process.env.CHAPA_API_SECRET}`, }, });
    const payUrl = response.data.data.checkout_url;
    res.json({ success: true, checkout_url: payUrl });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false });
  }
};


export const verify = async (req, res) => {
  const { tx_ref } = req.params;

  try {
    // 1. Check if transaction already processed
    const existingOrder = await pool.query(
      'SELECT * FROM orders WHERE chapa_tx_ref = $1',
      [tx_ref]
    );

    if (existingOrder.rowCount > 0) {
      return res.json({ status: 'exists', type: existingOrder.rows[0].status });
    }

    // 2. Verify with Chapa API
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_API_SECRET}`,
        },
      }
    );
    
    // 3. If payment failed or was cancelled
    if (response.data.status !== 'success') {
      return res.json({ status: 'fail' });
    }

    // 4. Extract meta and insert new order
    const meta = response.data.data.meta;

    const insertQuery = `
      INSERT INTO orders (customer_name, phone, address, product_code, price, image_url, chapa_tx_ref)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [
      meta.name,
      meta.phone,
      meta.address,
      meta.code,
      meta.price,
      meta.image_url,
      tx_ref,
    ];

    await pool.query(insertQuery, values);

    // 5. Respond to frontend
    res.json({ status: 'success' });

  } catch (error) {
    console.error('Verification error:', error.response?.data || error.message);
    res.status(500).json({ status: 'error' });
  }
};