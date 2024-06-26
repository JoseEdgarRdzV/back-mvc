const express = routers('express')
const cors = require('cors')
require('dotenv').config()
const authRouters = require('./routers/authRouters')
const app = express()
const PORT = process.env.PORT || 6010

app.use(cors())
app.use(express.json())

app.use('./api/auth', authRouters)

app.listen(PORT, () => {
    console.log(`Server running in: ${PORT}`) 
})

