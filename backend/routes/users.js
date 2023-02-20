import express from 'express'
import { getUsers, getUser, updateUser, changeUserPassword } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getUsers)
router.get('/:id', verifyToken, getUser)

router.patch('/:id', verifyToken, updateUser)
router.patch('/:id', verifyToken, changeUserPassword)

export default router
