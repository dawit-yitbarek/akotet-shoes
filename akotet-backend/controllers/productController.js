import cloudinary from '../models/cloudinary.js';
import pool from '../models/db.js';

// GET all products
export const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
        res.json({ result: result.rows, success: true });
    } catch (error) {
        console.error('Error from getProducts function', error.message)
        res.status(500).json({ success: false })
    }
};

// GET specific product
export const selectItem = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id])
        const item = result.rows[0]
        res.json({ success: true, item })
    } catch (error) {
        res.status(500).json({ success: false })
    }
};

// GET featured products
export const featuredProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id DESC LIMIT 3');
        const products = result.rows;
        res.json({ success: true, products });
    } catch (error) {
        console.error("Error fetching featured products:", error);
        res.status(500).json({ success: false });
    };
};

// POST add new product
export const addProduct = async (req, res) => {
    try {
        const { code, price, size, image } = req.body;

        await pool.query(
            'INSERT INTO products (code, price, size, image_url) VALUES ($1, $2, $3, $4)',
            [code, price, size, image]
        );

        res.status(201).json({ success: true, message: 'Product added successfully' });
    } catch (err) {
        console.error('Error from addProducts function', err.message)
        res.status(500).json({ error: 'Failed to add product', success: false });
    }
};

// PUT edit product
export const updateProduct = async (req, res) => {
    try {
        const { code, price, size, image_url } = req.body;
        const { id } = req.params;

        const query = 'UPDATE products SET code = $1, price = $2, size = $3, image_url = $4 WHERE id = $5'

        const values = [code, price, size, image_url, id];

        await pool.query(query, values);
        res.json({ success: true, message: 'Product updated' });
    } catch (err) {
        console.error('Error from updateProduct function', err.message)
        res.status(500).json({ error: 'Update failed', success: false });
    }
};

// DELETE product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        res.json({ success: true, message: 'Product deleted' });
    } catch (err) {
        console.error('Error from deleteProduct function', err.message)
        res.status(500).json({ error: 'Delete failed', success: false });
    }
};