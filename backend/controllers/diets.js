import Diet from '../models/Diet.js'

/* READ */
export const getDiets = async (req, res) => {
    try {
        const diets = await Diet.find()
        res.status(200).json(diets)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getDiet = async (req, res) => {
    try {
        const { id } = req.params
        const diet = await Diet.findById(id)

        res.status(200).json(diet)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* CREATE */
export const createDiet = async (req, res) => {
    try {
        const { name } = req.body
        const newDiet = new Diet({
            name,
        })
        await newDiet.save()

        const diet = await Diet.find()

        res.status(201).json(diet)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* UPDATE */
export const updateDiet = async (req, res) => {
    try {
        const { id } = req.params
        const diet = await Diet.findById(id)

        const updatedDiet = await Diet.findByIdAndUpdate(
            id,
            {
                name: req.body.name || diet.name,
            },
            { new: true }
        )

        res.status(200).json(updatedDiet)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* DELETE */
export const deleteDiet = async (req, res) => {
    try {
        const { id } = req.params
        await Diet.findByIdAndRemove(id)

        res.status(200).json({ id })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
