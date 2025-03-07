import validator from 'validator'
import bcrypt from  'bcrypt'
import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctor.model.js'
import appointmentModel from '../models/appintment.model.js'
import razorpay from 'razorpay'
import { CurrencyCodes } from 'validator/lib/isISO4217.js'
// api to resister user
const resisterUser = async (req,res) => {

    try {
        
        const {name , email , password} = req.body
        console.log(name,email,password);
        
        if(!name || !password || !email) {
            return res.json({
                success:false , message : "Please Fill All details"
            })
        }

        if(!validator.isEmail(email)){
            return res.json({
                success:false , message : "Please enter a valid email"
            })
        }
        if(password.length < 8){
            return res.json({
                success:false , message : "Please enter at least 8 character"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const userData = {
            name,
            email,
            password : hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        // token
        const token = jwt.sign({id: user._id } , process.env.JWT_SECRET)

        return res.json({
            success : true , token
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success : false , message : error.message
        })
    }

}

// api for login user 
const userLogin = async(req,res) => {

    try {
        
        const {email , password} = req.body
        
        if (!email || !password) {
            return res.json({
                success : false , message : "Please fill all details"
            })
        }
        const  user = await userModel.findOne({email})
        if (!user) {
            return res.json({
                success : false  ,message : "User Not found...!"
            })
        }
            const isMatch = await bcrypt.compare(password , user.password)
            if (!isMatch) {
                return res.json({
                    success : false , message : "Please enter your correct password "
                })
            }

                const token = jwt.sign({id : user._id} , process.env.JWT_SECRET)
                return res.json({
                success : true  ,message : "You are logged in" , token
            })
            
    } catch (error) {
        console.log(error);
        return res.json({
            success : false , message : error.message
        })
    }

}

//profile data api for user
const getProfile = async (req,res) => {
  
        try {
            
            const {userId} = req.body
            const userData = await userModel.findById(userId).select('-password')

            return res.json({
                success:true , userData
            })

        } catch (error) {
            console.log(error);
            return res.json({
                success:false , message : error.message
            })
}
}

// api to update user Profile 

    const updateProfile = async (req,res) => {
        
        try {
            
            const {userId , name , phone , address , dob , gender } = req.body;
            const imageFile = req.file
            
            
            if (!name ||  !phone  || !dob ||  !gender) {
                return res.json({
                    success:false , message: 'Data Missing !'
                })
            }
            await userModel.findByIdAndUpdate(userId,{name , phone , address:JSON.parse(address) , dob , gender})

            if (imageFile) {
                
                // upload image to cloudinary 
                const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
                const imageUrl = imageUpload.secure_url

                await userModel.findByIdAndUpdate(userId,{image:imageUrl})

            }

            return res.json({
                success:true , message: 'Profile Updated'
            })

        } catch (error) {
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
            
        }
    }

    // api to book appointment
    const boookAppointment = async(req,res) => {

        try {
            
            const {userId , docId , slotDate ,slotTime} = req.body

            const docData = await doctorModel.findById(docId).select('-password') 

            if (!docData.available) {
                return res.json({
                    success:false , message: 'Doctor Not Available'
                })
            }

            let slots_booked = docData.slots_booked

            //checking for slot availiblity
            if(slots_booked[slotDate]){
                if (slots_booked[slotDate].includes(slotTime)) {
                    return res.json({
                        success:false , message: 'Slot Not Available'
                    })
                } else {
                    slots_booked[slotDate].push(slotTime)
                }
            } else {

                slots_booked[slotDate] = []
                slots_booked[slotDate].push(slotTime)

            }
            const userData = await userModel.findById(userId).select('-password')

            delete docData.slots_booked

            const appointmentData = {
                userId,
                docId,
                docData,
                userData,
                amount :docData.fees,
                slotDate,
                slotTime,
                date : Date.now()
            }

            const newAppointment  = await appointmentModel(appointmentData)
            await newAppointment.save()

            // save new slot data in doctors data
            await doctorModel.findByIdAndUpdate(docId ,{slots_booked})

            res.json({
                success:true , message:'Appointment Booked Successful'
            })


        } catch (error) {
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
        }

    }

    // get all user apointments data

    const listAppointment = async(req,res)=> {
        try {
            const {userId} = req.body
            const appointments = await appointmentModel.find({userId})

            res.json({
                success:true , appointments
            })
            
        } catch (error) {
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
        }
    }

    // api for cancle appointment

    const cancelAppointment = async(req,res) => {
        try {
            
            const {userId , appointmentId} = req.body

            const appointmentData = await appointmentModel.findById(appointmentId)

            // verify appointment user
            if (appointmentData.userId != userId) {
                return res.json({
                    success:false , message: 'Unauthorized Action'
                })
            }

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



    // api for razorpay 
    
    const razorpayInstance = new razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_KEY_SECRET,
    })
    const paymentRazorpay = async(req,res) => {
        
       try {
         const {appointmentId} = req.body
            
            
         const appointmentData = await appointmentModel.findById(appointmentId)
        console.log(appointmentData);
        
         if (!appointmentData || appointmentData.cancelled) {
             return res.json({
                 success:false , message : "Appointment Cancelled or not found"
             })
         }
         // creating options for creating payment
         const options = {
             amount : appointmentData.amount * 80,
             currency : process.env.CURRENCY,
             receipt : appointmentId
         }
 
         // creation of an order
         const order = await razorpayInstance.orders.create(options)
        //  console.log(order);
         
         res.json({
             success:true , order
         })
       } catch (error) {
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
       }

    }

    //api to verify payment of razorpay 

    const verifyPayment = async(req,res) => { 
        try {
            const {razorpay_order_id} = req.body
            const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
            
            if (orderInfo.status === 'paid') {

                await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
                res.json({
                    success:true , message : 'payment successful'
                })
                
            } else {
                res.json({
                    success:false , message : 'payment failed'
                })
            }
            
        } catch (error) {
            console.log(error);
            return res.json({
                success:false , message: error.message
            })
        }
      }

export {
    resisterUser,
    userLogin,
    getProfile,
    updateProfile ,
    boookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyPayment
}