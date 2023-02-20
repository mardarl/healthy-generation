import express from 'express'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getProducts)
router.get('/:id', verifyToken, getProduct)

router.post('/', verifyToken, createProduct)

router.patch('/:id', verifyToken, updateProduct)

router.delete('/:id', verifyToken, deleteProduct)

export default router
