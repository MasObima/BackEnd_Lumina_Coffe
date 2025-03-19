const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')


const app = express()
dotenv.config()
connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

const userRoutes = require('./routes/UserRoutes')
const productRoutes = require('./routes/ProductRoutes')
const fileRoutes = require('./routes/FileRouter')
const authRoutes = require('./routes/AuthRoutes')
const transactionRoutes = require('./routes/TransactionRoutes.')
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/files', fileRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/transactions', transactionRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`))