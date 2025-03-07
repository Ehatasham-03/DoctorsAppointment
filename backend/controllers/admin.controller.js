import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctor.model.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appintment.model.js'
import userModel from '../models/user.model.js'

// api for adding doctor

const addDoctor = async ( req,res ) => {
    

    try {
    
        const {name , email, password, speciality, experience, degree, about, fees, address  } = req.body
        const imageFile = req.file
        
        // checking for all data to add doctor
        if (!name  || !email || !password || !speciality || !experience || !degree || !about || !fees || !address) {
             return res.json({
                success:false , message: 'Please add all data'
            })
        }

        // validating email format
        if (!validator.isEmail(email)) {
             return res.json({
                success:false , message: 'Please Enter a valid email'
            })
        }

        // validating password
        if(password.length < 8){
         return res.json({
                success:false , message: 'Please Enter a Strong Password at least 8 characters'
            })
        }
        
    // hasing doctor passwort
        const salt = await bcrypt.genSalt(10)
        const hashPassWord = await bcrypt.hash(password , salt)

    // upoload image in cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
        const imageUrl = imageUpload.secure_url

        const doctorData ={
            name,
            email ,
            password:hashPassWord,
            image:imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address) ,
            date:Date.now()

        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        return res.json({
            success:true , message: "Doctor added successfully"
        })

    } catch (error) {

        console.log(error);
        return res.json({
            success:false , message: error.message
        })

    }
}

// admin login api for getting doctors data 
    const loginAdmin = async( req,res ) => {

        try {
            const {email , password} = req.body

            if ((email === process.env.ADMIN_EMAIL) && (password === process.env.ADMIN_PASSWORD)) {
                
                const adminToken = jwt.sign(email+password,process.env.JWT_SECRET)

                return res.json({
                    success : true , adminToken
                })

            } else {

                return res.json({
                    success:false , message: 'Invalid Email and Password'
                })
            }

        } catch (error) {
            
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
        }
    

    }

    const getAllDoctor = async (_,res) => {

        try {
            const allDoctors = await doctorModel.find({}).select('-password')
            return res.json({
                success:true , allDoctors
            })
        } catch (error) {
           console.log(error);
           return res.json({
               success:false , message: error.message
           })
            
        }
    }

    const deleteDoctor = async (req,res) => {
        
        try {   
            const {docId} = req.body
            
            await doctorModel.findByIdAndDelete(docId)
            return res.json({
                success:true , message: 'Doctor deleted successfully'
            })
        } catch (error) {
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
        }
    }


    const doctorInfoUpdate = async (req,res) => {   
    
        try {
        
            const {docId} = req.params
            const {name , speciality, experience, degree, about, fees, address  } = req.body
   
            const doctorData ={
                name,
                speciality,
                degree,
                experience,
                about,
                fees,
                address: JSON.parse(address || '{}') ,
                date:Date.now()
    
            }

            await doctorModel.findByIdAndUpdate(docId,doctorData)
            return res.json({
                success:true 
            })

            

        } catch (error) {
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
            
        }
    
    }

    // api for get all appointment list
    const  appointmentsAdmin = async(req,res) => {
        try {
            // const {adminToken} = req.body

            const appintments = await appointmentModel.find({})
            return res.json({
                success:true , appintments
            })

        } catch (error) {
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
        }
    } 

    // api for cancel appointment
    const cancelAppointmentbyAdmin = async(req,res) => {
        try {
            
            const { appointmentId} = req.body

            const appointmentData = await appointmentModel.findById(appointmentId)

            // verify appointment user
           

            await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

            
            // releasing doc slot
            const {docId , slotDate , slotTime} = appointmentData
            const doctorData = await doctorModel.findById(docId)
            
            let slots_booked = doctorData.slots_booked

            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

            await doctorModel.findByIdAndUpdate(docId , {slots_booked})

            res.json({
                success:true , message : 'Appointment Cancelled'
            })

        } catch (error) {
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
        }
    }

    //api for admin dashboard data
    const dashboardData = async(req,res) => {
        try {
            
            const totalAppointments = await appointmentModel.find({})
            const totalDoctor = await doctorModel.find({})
            const totalUsers = await userModel.find({})
            
            const dashboardData = {
                totalAppointments : totalAppointments.length , 
                totalDoctor : totalDoctor.length , 
                totalUsers : totalUsers.length ,
                latestAppointments : totalAppointments.reverse().slice(0,5)
            }

            return res.json({
                success:true , dashboardData
            })

        } catch (error) {
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
        }
    }

export {
    addDoctor,
    loginAdmin,
    getAllDoctor,
    deleteDoctor,
    doctorInfoUpdate,
    appointmentsAdmin,
    cancelAppointmentbyAdmin,
    dashboardData
}