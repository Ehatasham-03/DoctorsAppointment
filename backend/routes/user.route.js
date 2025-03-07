import express from "express";
import { boookAppointment, cancelAppointment, getProfile, listAppointment, paymentRazorpay, resisterUser, updateProfile, userLogin, verifyPayment } from "../controllers/user.controler.js";
import userAuth from "../middlewares/userAuth.middleware.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router()


userRouter.post('/register' , resisterUser)
userRouter.post('/login' , userLogin)
userRouter.get('/get-profile', userAuth , getProfile)
userRouter.post('/update-profile', upload.single('image') ,userAuth , updateProfile)
userRouter.post('/book-appointment' , userAuth , boookAppointment)
userRouter.get('/appointments' , userAuth , listAppointment)
userRouter.post('/cancel-appointment' , userAuth , cancelAppointment)

// payment razorpay api
userRouter.post('/payment-razorpay' , userAuth , paymentRazorpay)
userRouter.post('/verify-razorpay' , userAuth , verifyPayment)


export default userRouter