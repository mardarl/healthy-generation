import User from '../models/User.js'
import bcrypt from 'bcrypt'

/* READ */
export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        delete user.password
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* UPDATE */
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                first_name: req.body.first_name || user.first_name,
                last_name: req.body.last_name || user.last_name,
                email: req.body.email || user.email,
                allergies: req.body.allergies || user.allergies,
                diets: req.body.diets || user.diets,
                favourite_recipes: req.body.favourite_recipes || user.favourite_recipes,
                product_allergies: req.body.product_allergies || user.product_allergies,
            },
            { new: true }
        )
        delete updatedUser.password
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const changeUserPassword = async (req, res) => {
    try {
        const { id } = req.params
        const { password } = req.body

        const user = await User.findById(id)
        if (!user) return res.status(400).json({ msg: 'User does not exist.' })

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                password: passwordHash,
            },
            { new: true }
        )
        delete updatedUser.password
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
