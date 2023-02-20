import mongoose from 'mongoose'

const DietSchema = new mongoose.Schema(
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

const Diet = mongoose.model('Diet', DietSchema)
export default Diet
