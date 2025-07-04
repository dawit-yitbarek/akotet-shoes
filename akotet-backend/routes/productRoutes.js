import express from 'express';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  selectItem,
  featuredProducts
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', featuredProducts);
router.get('/:id', selectItem);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;