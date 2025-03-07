import express from "express";
import { appointmentCancel, appointmentComplete, avarageDoctorFees, doctorAppointments, doctorDashboard, doctorList, doctorLogin, doctorProfile, updateDoctorProfile } from "../controllers/doctor.controller.js";
import docAuth from "../middlewares/doctor.Auth.js";

import upload from "../middlewares/multer.js";

const doctorRouter = express.Router()

doctorRouter.get('/list' , doctorList)
doctorRouter.post('/doctor-login' , doctorLogin)
doctorRouter.get('/doctor-appointments' , docAuth , doctorAppointments)
doctorRouter.post('/complete-appointment' , docAuth , appointmentComplete)
doctorRouter.post('/cancel-appointment' , docAuth , appointmentCancel)
doctorRouter.get('/doctor-profile' , docAuth , doctorProfile)
doctorRouter.post('/update-profile' , upload.single('image') , docAuth , updateDoctorProfile)
doctorRouter.get('/doctor-dashboard' , docAuth , doctorDashboard)

doctorRouter.get('/doctorAvgfee' , avarageDoctorFees)

export default doctorRouter