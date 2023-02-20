import express from 'express'
import { createDiet, deleteDiet, getDiet, getDiets, updateDiet } from '../controllers/diets.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getDiets)
router.get('/:id', verifyToken, getDiet)

router.post('/', verifyToken, createDiet)

router.patch('/:id', verifyToken, updateDiet)

router.delete('/:id', verifyToken, deleteDiet)

export default router
