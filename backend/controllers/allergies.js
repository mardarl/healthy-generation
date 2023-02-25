import Allergy from '../models/Allergy.js'

/* READ */
export const getAllergies = async (req, res) => {
    try {
        const allergies = await Allergy.find()
        res.status(200).json(allergies)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getAllergy = async (req, res) => {
    try {
        const { id } = req.params
        const allergy = await Allergy.findById(id)

        res.status(200).json(allergy)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* CREATE */
export const createAllergy = async (req, res) => {
    try {
        const { name } = req.body
        const newAllergy = new Allergy({
            name,
        })
        await newAllergy.save()

        const allergy = await Allergy.find()

        res.status(201).json(allergy)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* UPDATE */
export const updateAllergy = async (req, res) => {
    try {
        const { id } = req.params
        const allergy = await Allergy.findById(id)

        const updatedAllergy = await Allergy.findByIdAndUpdate(
            id,
            {
                name: req.body.name || allergy.name,
            },
            { new: true }
        )

        res.status(200).json(updatedAllergy)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* DELETE */
export const deleteAllergy = async (req, res) => {
    try {
        const { id } = req.params
        await Allergy.findByIdAndRemove(id)

        res.status(200).json({ id })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
