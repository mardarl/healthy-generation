import mongoose from 'mongoose'

const AllergySchema = new mongoose.Schema(
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

const Allergy = mongoose.model('Allergy', AllergySchema)
export default Allergy
