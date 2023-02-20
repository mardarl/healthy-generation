import express from 'express'
import { createAllergy, deleteAllergy, getAllergies, getAllergy, updateAllergy } from '../controllers/allergies.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getAllergies)
router.get('/:id', verifyToken, getAllergy)

router.post('/', verifyToken, createAllergy)

router.patch('/:id', verifyToken, updateAllergy)

router.delete('/:id', verifyToken, deleteAllergy)

export default router
