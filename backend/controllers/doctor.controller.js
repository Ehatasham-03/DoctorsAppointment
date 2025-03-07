import doctorModel from "../models/doctor.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appintment.model.js";
import { v2 as cloudinary } from "cloudinary";
const changeAvailability = async(req,res) => {

    try {
        
        const {docId} = req.body

        const doctorData = await doctorModel.findById(docId)

        await doctorModel.findByIdAndUpdate(docId,{available : !doctorData.available})

        return res.json({
            success:true , message : "Availability Changed"
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success:false , message : error.message
        })
        
    }

}

const doctorList = async (_,res) => {

    try {
        const allDoctors = await doctorModel.find({}).select(["-password" , "-email"])

        return res.json({
            success:true , allDoctors
        })

    } catch (error) {
        return res.json({
            success:false , message : error.message
        })
    }

}

    // api for login doctor
    const doctorLogin = async (req,res) => {
        
        try {
            
            const {email , password} = req.body
            
            const doctor = await doctorModel.findOne({email})

            if (!doctor) {
                return res.json({
                    success:false , message : 'Invalid Crediantial'
                })
            }

            const isMatch = await bcrypt.compare(password , doctor.password)

            if (isMatch) {
                const token = jwt.sign({id:doctor._id} , process.env.JWT_SECRET)
                return res.json({
                    success:true , token
                })
            } else {
                return res.json({
                    success:false , message : "Password Did not matched"
                })
            }


        } catch (error) {
            return res.json({
                success:false , message : error.message
            })
        }
    }

    //api for get doc appointments for doc panel

    const doctorAppointments = async(req,res) => {
        try {
            const {docId} = req.body
            
            
            // get appoint details and all from appointment model by calling findbyId
            
            const appointments = await appointmentModel.find({docId})

            res.json({
                success:true , appointments
            })

            
        } catch (error) {
            return res.json({
                success:false , message : error.message
            })
        }
    }

    //api for mark appointment completed for d panel
    const appointmentComplete = async(req,res) => {
        try {
            
            const {appointmentId , docId} = req.body
            const appintmentData = await appointmentModel.findById(appointmentId)
            console.log(appintmentData);
            
            if (appintmentData && appintmentData.docId === docId) {
                await appointmentModel.findByIdAndUpdate(appointmentId ,{isCompleted : true})
                    res.json({
                    success:true , message : 'Appointment Completed'
                })
            } else {
                res.json({
                    success:false , message : 'Mark Failed'
                })
            }
           

        } catch (error) {
            return res.json({
                success:false , message : error.message
            })
        }
    }

    //api for cancel appointment
    const appointmentCancel = async(req,res) => {
        try {
            
            const {appointmentId , docId} = req.body
            const appintmentData = await appointmentModel.findById(appointmentId)
            if (appintmentData && appintmentData.docId === docId) {
                await appointmentModel.findByIdAndUpdate(appointmentId ,{cancelled : true})
                    res.json({
                    success:true , message : 'Appointment Cancelled'
                })
            } else {
              res.json({
                    success:false , message : 'Mark Failed'
                })
            }
           

        } catch (error) {
            return res.json({
                success:false , message : error.message
            })
        }
    }

    // get doctor profile 
    const doctorProfile = async(req,res) => {

        try {
            const {docId} = req.body
            const doctorData = await doctorModel.findById(docId).select('-password')
            res.json({
                success : true , doctorData
            })
            
        } catch (error) {
            return res.json({
                success:false , message : error.message
            })
        }

    }
    // update doctor profile 
    const updateDoctorProfile = async(req,res) => { 

        try {
            const {docId , about, fees, address , available } = req.body
            const imageFile = req.file
            
            if ( !about || !fees || !address || !available) {
                return res.json({
                    success : false , message : 'Data Missing...!'
                })
            }

            await doctorModel.findByIdAndUpdate(docId , {available , about , fees , address:JSON.parse(address)})
            if (imageFile) {
                // upload on cloudinary
                const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
                const imageUrl = imageUpload.secure_url

                await doctorModel.findByIdAndUpdate(docId,{image:imageUrl})
            }

            res.json({
                success : true , message : 'Updated Profile Successfully'
            })
            
        } catch (error) {
            return res.json({
                success:false , message : error.message
            })
        }

    }

    // api for get dashboard for doc panel
    const doctorDashboard = async (req,res) => {
        try {
            const {docId} = req.body
            const appointments = await appointmentModel.find({docId})

            let earnings = 0 

            appointments.map((item) => {
                if (item.isCompleted || item.payment) {
                    earnings += item.amount
                }
            })

            let patients = []

            appointments.map((item) => {
                if (!patients.includes(item.userId)) {
                    patients.push(item.userId)
                }
            })

            const dashboardData = {
                appointments : appointments.length ,
                earnings,
                patients : patients.length,
                latestAppointments : appointments.reverse().slice(0,5)
            }
            
            return res.json({
                success:true , dashboardData
            })

        } catch (error) {
            return res.json({
                success:false , message : error.message
            })
        }
    }

    const avarageDoctorFees = async(req,res) => {

        try {
            
            const age = await doctorModel.aggregate([{$group : {'_id' : 'null' , Avgtotal:{$avg : '$fees'}}}])

            

            console.log(age);
            ;
            
            
            
        } catch (error) {
            return res.json({
                success : false , message : error.message
            })
        }

    }

export {
    changeAvailability , 
    doctorList ,
    doctorLogin,
    doctorAppointments,
    appointmentCancel,
    appointmentComplete ,
    doctorProfile,
    doctorDashboard ,
    updateDoctorProfile ,
    avarageDoctorFees
}