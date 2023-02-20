import express from 'express'
import {
    createMeasurementType,
    deleteMeasurementType,
    getMeasurementType,
    getMeasurementTypes,
    updateMeasurementType,
} from '../controllers/measurement_types.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/', verifyToken, getMeasurementTypes)
router.get('/:id', verifyToken, getMeasurementType)

router.post('/', verifyToken, createMeasurementType)

router.patch('/:id', verifyToken, updateMeasurementType)

router.delete('/:id', verifyToken, deleteMeasurementType)

export default router
