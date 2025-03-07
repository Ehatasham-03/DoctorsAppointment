import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDB.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/admin.route.js'
import doctorRouter from './routes/doctor.route.js'
import userRouter from './routes/user.route.js'

// app config
const app = express()
const port = process.env.PORT || 3000
connectDB()
connectCloudinary()
//middlewares
app.use(express.json())
app.use(cors())

//api end point

app.get('/' , (req,res)=> {
        res.send('api working')
})
// admin endpoint
app.use('/api/v1/admin' , adminRouter )
app.use('/api/v1/doctor' , doctorRouter )
app.use('/api/v1/user' , userRouter )
// localhost:3000/api/v1/admin

app.listen(port, () => console.log(` app listening on port ${port} 😊`))