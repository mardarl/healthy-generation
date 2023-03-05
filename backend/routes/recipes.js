import express from 'express'
import { createRecipe, deleteRecipe, getRecipe, getRecipes, updateRecipe } from '../controllers/recipes.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getRecipes)
router.get('/:id', verifyToken, getRecipe)

// router.post('/', verifyToken, createRecipe)

// router.patch('/:id', verifyToken, updateRecipe)

router.delete('/:id', verifyToken, deleteRecipe)

export default router
