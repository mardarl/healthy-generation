import express from 'express'
import {
    getRecipeTypes,
    deleteRecipeType,
    getRecipeType,
    updateRecipeType,
    createRecipeType,
} from '../controllers/recipe_types.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getRecipeTypes)
router.get('/:id', verifyToken, getRecipeType)

router.post('/', verifyToken, createRecipeType)

router.patch('/:id', verifyToken, updateRecipeType)

router.delete('/:id', verifyToken, deleteRecipeType)

export default router
