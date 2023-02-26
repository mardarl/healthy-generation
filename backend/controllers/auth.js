import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            first_name,
            last_name,
            email,
            password: passwordHash,
            allergies: [],
            diets: [],
            favourite_recipies: [],
            product_allergies: [],
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ msg: 'User does not exist.' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({
            token,
            user: {
                _id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
            },
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
