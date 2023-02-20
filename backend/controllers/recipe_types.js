import RecipeType from '../models/RecipeType.js'

/* READ */
export const getRecipeTypes = async (req, res) => {
    try {
        const recipeTypes = await RecipeType.find()
        res.status(200).json(recipeTypes)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getRecipeType = async (req, res) => {
    try {
        const { id } = req.params
        const recipeType = await RecipeType.findById(id)

        res.status(200).json(recipeType)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* CREATE */
export const createRecipeType = async (req, res) => {
    try {
        const { name } = req.body
        const newRecipeType = new RecipeType({
            name,
        })
        await newRecipeType.save()

        const recipeType = await RecipeType.find()

        res.status(201).json(recipeType)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* UPDATE */
export const updateRecipeType = async (req, res) => {
    try {
        const { id } = req.params
        const recipeType = await RecipeType.findById(id)

        const updatedRecipeType = await RecipeType.findByIdAndUpdate(
            id,
            {
                name: req.body.name || recipeType.name,
            },
            { new: true }
        )

        res.status(200).json(updatedRecipeType)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* DELETE */
export const deleteRecipeType = async (req, res) => {
    try {
        const { id } = req.params
        await RecipeType.findByIdAndRemove(id)

        res.status(200).json({ id })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
