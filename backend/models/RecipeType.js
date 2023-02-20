import mongoose from 'mongoose'

const RecipeTypeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
    },
    { timestamps: true }
)

const RecipeType = mongoose.model('RecipeType', RecipeTypeSchema)
export default RecipeType
