import pool from '../models/db.js';

export const getOrders = async (req, res) => {
  const { status } = req.query;
  try {
    const orders = await pool.query("SELECT * FROM orders WHERE status = $1", [status]);
    res.json({ success: true, orders: orders.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};


export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("UPDATE orders SET status = $1 WHERE id = $2", ['delivered', id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};