const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoutes = require('./src/routers/userRoute')
const quizRoutes = require('./src/routers/quizRoutes')
const errorHandler = require('./src/middleware/errorHandler')
const cors = require('cors')
dotenv.config()

mongoose.connect(process.env.MONGO_URL)
    .then(()=> console.log('DB connect successfully'))
    .catch((error) => console.log(error))

const Port = process.env.PORT || 4000 ;

const app = express()
app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials:true
    }
))
app.use(express.json())
app.get('/' , (req , res) =>{
    res.send('hello World')
})
app.use('/user' , userRoutes)
app.use('/quiz' , quizRoutes)

app.use("*", (req, res) => {
    res.status(404).json({
        message: 'Endpoint not found',
        status: 'Error',
    });
});

app.use(errorHandler)

app.listen(Port , ()=>{
    console.log(`surver is running on port ${Port}`)
})