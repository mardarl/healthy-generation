import Product from '../models/Product.js'
import Recipe from '../models/Recipe.js'
import User from '../models/User.js'

/* READ */
export const getRecipes = async (req, res) => {
    try {
        const { search = '', limit = 6, page = 1, is_favourite = false, user_id = null } = req.query
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
                    total_count: await Recipe.countDocuments({
                        _id: { $in: favouriteRecipeIds },
                        name: { $regex: regex }
                    })
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
                total_count: await Recipe.countDocuments({ name: { $regex: regex } })
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
            ingredients = [],
            steps = [],
            posible_allergies = [],
            recipe_types = [],
            picture_path = '',
            cooking_time,
            total_carbs = 0,
            total_proteins = 0,
            total_fats = 0,
            total_calories = 0,
            is_ingredient = false
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
            is_ingredient
        })
        await newRecipe.save()

        if (is_ingredient) {
            const newProduct = new Product({
                name,
                carbs,
                proteins,
                fats,
                calories,
                recipe_id
            })
            await newProduct.save()
        }

        res.status(201).json(newRecipe)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* UPDATE */
export const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, { new: true })

        if (req.body.is_ingredient) {
            const product = await Product.findOne({ recipe_id: id })
            if (product) {
                await Product.findByIdAndUpdate(
                    product._id,
                    {
                        name: req.body.name,
                        carbs: req.body.total_carbs,
                        proteins: req.body.total_proteins,
                        fats: req.body.total_fats,
                        calories: req.body.total_calories,
                        recipe_id: id
                    },
                    { new: true }
                )
            } else {
                const newProduct = new Product({
                    name: req.body.name,
                    carbs: req.body.total_carbs,
                    proteins: req.body.total_proteins,
                    fats: req.body.total_fats,
                    calories: req.body.total_calories,
                    recipe_id: id
                })
                await newProduct.save()
            }
        }

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
