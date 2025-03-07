
import express from "express";
import { addDoctor, loginAdmin , getAllDoctor, deleteDoctor , doctorInfoUpdate, appointmentsAdmin, cancelAppointmentbyAdmin, dashboardData } from "../controllers/admin.controller.js";
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/adminAuth.middleware.js';
import { changeAvailability } from "../controllers/doctor.controller.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor' ,authAdmin, upload.single('image') , addDoctor)
adminRouter.post('/admin-login' , loginAdmin)
adminRouter.get('/get-alldoc' , authAdmin , getAllDoctor)
adminRouter.patch('/delete-doctor' , authAdmin , deleteDoctor)
adminRouter.post('/update-doctorInfo/:docId' , authAdmin , upload.single('image') , doctorInfoUpdate)

adminRouter.post('/change-availability' , authAdmin , changeAvailability)
 
adminRouter.get('/all-appointments' , authAdmin , appointmentsAdmin) 
adminRouter.post('/cancel-appointment' , authAdmin , cancelAppointmentbyAdmin) 
adminRouter.get('/dashboard-data' , authAdmin , dashboardData) 



export default adminRouter