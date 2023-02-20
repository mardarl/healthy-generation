import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        last_name: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        allergies: {
            type: Array,
            default: [],
        },
        diets: {
            type: Array,
            default: [],
        },
        favourite_recipies: {
            type: Array,
            default: [],
        },
        product_allergies: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
)

const User = mongoose.model('User', UserSchema)
export default User
