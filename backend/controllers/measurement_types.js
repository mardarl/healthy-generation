import MeasurementType from '../models/MeasurementType.js'

/* READ */
export const getMeasurementTypes = async (req, res) => {
    try {
        const measurementTypes = await MeasurementType.find()

        res.status(200).json(measurementTypes)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getMeasurementType = async (req, res) => {
    try {
        const { id } = req.params
        const measurementType = await MeasurementType.findById(id)

        res.status(200).json(measurementType)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* CREATE */
export const createMeasurementType = async (req, res) => {
    try {
        const { name } = req.body
        const newMeasurementType = new MeasurementType({
            name,
        })
        await newMeasurementType.save()

        const measurementType = await MeasurementType.find()

        res.status(201).json(measurementType)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* UPDATE */
export const updateMeasurementType = async (req, res) => {
    try {
        const { id } = req.params
        const measurementType = await MeasurementType.findById(id)

        const updatedMeasurementType = await MeasurementType.findByIdAndUpdate(
            id,
            {
                name: req.body.name || measurementType.name,
            },
            { new: true }
        )

        res.status(200).json(updatedMeasurementType)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* DELETE */
export const deleteMeasurementType = async (req, res) => {
    try {
        const { id } = req.params
        await MeasurementType.findByIdAndRemove(id)

        res.status(200).json({ id })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
