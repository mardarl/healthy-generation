import mongoose from 'mongoose'

const RecipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        author_id: {
            type: String
        },
        ingredients: {
            type: Array,
            default: []
        },
        steps: {
            type: Array,
            default: []
        },
        posible_allergies: {
            type: Array,
            default: []
        },
        recipe_types: {
            type: Array,
            default: []
        },
        picture_path: {
            type: String,
            default: ''
        },
        cooking_time: {
            type: Number,
            required: true
        },
        total_carbs: {
            type: Number,
            required: true
        },
        total_proteins: {
            type: Number,
            required: true
        },
        total_fats: {
            type: Number,
            required: true
        },
        total_calories: {
            type: Number,
            required: true
        },
        total_amount: {
            type: Number,
            required: true
        },
        is_ingredient: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

const Recipe = mongoose.model('Recipe', RecipeSchema)
export default Recipe
