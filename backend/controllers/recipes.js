import Recipe from '../models/Recipe.js'
import User from '../models/User.js'

/* READ */
export const getRecipes = async (req, res) => {
    try {
        const { search = '', limit = 10, page = 1, is_favourite = false, user_id = null } = req.query
        const regex = new RegExp(`${search}`, 'i')

        if (is_favourite && user_id) {
            const user = await User.findById(user_id)
            if (user) {
                const favouriteRecipeIds = user.favourite_recipes
                const recipes = await Recipe.find({ _id: { $in: favouriteRecipeIds }, name: { $regex: regex } })
                    .limit(limit * 1)
                    .skip((page - 1) * limit)
                    .exec()

                res.status(200).json({
                    recipes,
                    current_page: page,
                    limit,
                    total_count: await Recipe.countDocuments({ name: { $regex: regex } }),
                })
            } else {
                res.status(404).send('User not found')
            }
        } else {
            const recipes = await Recipe.find({ name: { $regex: regex } })
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .exec()

            res.status(200).json({
                recipes,
                current_page: page,
                limit,
                total_count: await Recipe.countDocuments({ name: { $regex: regex } }),
            })
        }
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getRecipe = async (req, res) => {
    try {
        const { id } = req.params
        const recipe = await Recipe.findById(id)

        res.status(200).json(recipe)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* CREATE */
export const createRecipe = async (req, res) => {
    try {
        const {
            name,
            author_id = 'default',
            ingredients,
            steps,
            posible_allergies,
            recipe_types,
            picture_path = '',
            cooking_time,
            total_carbs,
            total_proteins,
            total_fats,
            total_calories,
        } = req.body
        const newRecipe = new Recipe({
            name,
            author_id,
            ingredients,
            steps,
            posible_allergies,
            recipe_types,
            picture_path,
            cooking_time,
            total_carbs,
            total_proteins,
            total_fats,
            total_calories,
        })
        await newRecipe.save()

        const recipe = await Recipe.find()
        res.status(201).json(recipe)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* UPDATE */
export const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params
        const recipe = await Recipe.findById(id)

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            {
                name: req.body.name || recipe.name,
                author_id: req.body.author_id || recipe.author_id,
                ingredients: req.body.ingredients || recipe.ingredients,
                steps: req.body.steps || recipe.steps,
                posible_allergies: req.body.posible_allergies || recipe.posible_allergies,
                recipe_types: req.body.recipe_types || recipe.recipe_types,
                picture_path: req.body.picture_path || recipe.picture_path,
                cooking_time: req.body.cooking_time || recipe.cooking_time,
                total_carbs: req.body.total_carbs || recipe.total_carbs,
                total_proteins: req.body.total_proteins || recipe.total_proteins,
                total_fats: req.body.total_fats || recipe.total_fats,
                total_calories: req.body.total_calories || recipe.total_calories,
            },
            { new: true }
        )

        res.status(200).json(updatedRecipe)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* DELETE */
export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params
        await Recipe.findByIdAndRemove(id)

        res.status(200).json({ id })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
