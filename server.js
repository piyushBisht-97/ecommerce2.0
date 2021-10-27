require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// Routes
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/productRoutes'))




// connect to mongoDb
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},err =>{
if(err) throw err;
console.log("Connected to MongoDb")
})

if(process.env.NODE_ENV =="production"){
    app.use(express.static("client/build"))
}

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> console.log('Server is listeing to port',PORT))