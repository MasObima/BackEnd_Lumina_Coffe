const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./api/config/db')


const app = express()
dotenv.config()
connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const userRoutes = require('./api/routes/UserRoutes')
const productRoutes = require('./api/routes/ProductRoutes')
const fileRoutes = require('./api/routes/FileRouter')
const authRoutes = require('./api/routes/AuthRoutes')
const transactionRoutes = require('./api/routes/TransactionRoutes.')
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/files', fileRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))