import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        carbs: {
            type: Number,
            required: true,
        },
        proteins: {
            type: Number,
            required: true,
        },
        fats: {
            type: Number,
            required: true,
        },
        calories: {
            type: Number,
            required: true,
        },
        recipe_id: {
            type: String,
        },
    },
    { timestamps: true }
)

const Product = mongoose.model('Product', ProductSchema)
export default Product
