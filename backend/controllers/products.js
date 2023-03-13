import Product from '../models/Product.js'

/* READ */
export const getProducts = async (req, res) => {
    try {
        const { search = '', limit = 10, page = 1 } = req.query

        const regex = new RegExp(`${search}`, 'i')

        const products = await Product.find({ name: { $regex: regex } })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec()

        res.status(200).json({
            products,
            current_page: page,
            limit,
            total_count: await Product.countDocuments({ name: { $regex: regex } })
        })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)

        res.status(200).json(product)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* CREATE */
export const createProduct = async (req, res) => {
    try {
        const { name, carbs, proteins, fats, calories, recipe_id = null } = req.body
        const newProduct = new Product({
            name,
            carbs,
            proteins,
            fats,
            calories,
            recipe_id
        })
        await newProduct.save()

        const product = await Product.find()
        res.status(201).json(product)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* UPDATE */
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name: req.body.name || product.name,
                carbs: req.body.carbs || product.carbs,
                proteins: req.body.proteins || product.proteins,
                fats: req.body.fats || product.fats,
                calories: req.body.calories || product.calories,
                recipe_id: req.body.recipe_id || product.recipe_id
            },
            { new: true }
        )

        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* DELETE */
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        await Product.findByIdAndRemove(id)

        res.status(200).json({ id })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
