import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import recipeRoutes from './routes/recipes.js'
import recipeTypeRoutes from './routes/recipe_types.js'
import allergieRoutes from './routes/allergies.js'
import dietRoutes from './routes/diets.js'
import productRoutes from './routes/products.js'
import measurementTypeRoutes from './routes/measurement_types.js'
import { createRecipe, updateRecipe } from './controllers/recipes.js'
import { verifyToken } from './middleware/auth.js'

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

/* ROUTES WITH FILES */
app.post('/recipes', verifyToken, upload.single('picture_path'), createRecipe)
app.patch('/recipes/:id', verifyToken, upload.single('picture_path'), updateRecipe)

/* ROUTES */
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/recipes', recipeRoutes)
app.use('/recipe_types', recipeTypeRoutes)
app.use('/allergies', allergieRoutes)
app.use('/diets', dietRoutes)
app.use('/products', productRoutes)
app.use('/measurement_types', measurementTypeRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 8000
mongoose.set('strictQuery', false)
mongoose
    .connect(process.env.HEALTHYGENERATON_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`))
    })
    .catch((error) => console.log(`${error} did not connect`))
