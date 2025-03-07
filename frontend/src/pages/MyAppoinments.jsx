import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppoinments = () => {

  const {backendUrl , token, currency, fetchDocData, navigate} = useContext(AppContext)
  const [appointments , setAppointments] = useState([])
  const months = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"]
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return `${dateArray[0]} ${months[parseInt(dateArray[1]) - 1]} ${dateArray[2]}`
  }
  const getUserAppointments =async()=>{

    try {
      const {data} = await axios.get(`${backendUrl}/api/v1/user/appointments`,{headers:{token}})

      if (data.success) {
        setAppointments(data.appointments.reverse())
        // console.log(data.appointments);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }
  
  // cancel
  const cancelAppointment = async(appointmentId)=>{
    try {
      
      const {data} =await axios.post(`${backendUrl}/api/v1/user/cancel-appointment` , {appointmentId} , {headers:{token}})
      
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        fetchDocData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

    const initPay = (order) => {

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount : order.amount,
        currency : order.currency ,
        name : "Apppointment Payment",
        description : "Apppointment Payment",
        // image : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        order_id : order.id,
        receipt : order.receipt,
        handler : async (response) => {
          
          try {
            const {data} = await axios.post(`${backendUrl}/api/v1/user/verify-razorpay` , response , {headers:{token}})
            if (data.success) {
              getUserAppointments()
              navigate("/my-appointments")
              toast.success(data.message)
            }
          } catch (error) {
            console.log(error);
            
            toast.error(data.message)
          }
          
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()

    }

    const appointmentRazorpay = async (appointmentId) => {
      try {
        
        const {data} = await axios.post(`${backendUrl}/api/v1/user/payment-razorpay` , {appointmentId} , {headers:{token}})

        if (data.success) {
          
          initPay(data.order)
          
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }




  useEffect(()=>{
    if (token) {
      getUserAppointments()
      
    }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b '>My appointments</p>
      
      <div className=''>
        {
          appointments.map((item , index)=>(
            <div key={index} className='grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b '>
                
                <div className=''>
                 <img className='bg-primary w-32 ' src={item.docData.image} alt="" />  
                </div>
                
                <div className='flex-1 text-sm text-zinc-600'>
                  
                      <p className=' text-neutral-800 font-semibold'>{item.docData.name}</p>
                      <p className=' text-gray-600'>{item.docData.speciality}</p>
                  
                      <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                      <p className='text-xs'>{item.docData.address.line1}</p>
                      <p className='text-xs'>{item.docData.address.line2}</p>
                  
                     <p className='text-sm mt-1'>Date & Time: <span className='text-sm font-medium text-neutral-700'>{slotDateFormat(item.slotDate)} | {item.slotTime}</span></p>
                    
                </div>
                <div>
                {/* <p className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-700'>Fees :{currency} {item.amount}</p> */}
                </div>
                  <div className='flex flex-col gap-2 justify-end content-end'>

                  {!item.cancelled && item.payment && !item.isCompleted  && <button className='text-sm text-white bg-green-500 text-center sm:min-w-48 py-2 border  hover:uppercase transition-all duration-700'>Paid</button>}

                  {!item.cancelled && !item.payment && !item.isCompleted  && <button onClick={() => {appointmentRazorpay(item._id  )}} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border  hover:bg-primary hover:text-white transition-all duration-700'>Pay Online</button> }

                  {!item.cancelled   && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-700'>Cancel Appointment</button>}

                  {item.cancelled  && !item.isCompleted && <p className='text-sm text-red-500 text-center sm:min-w-48 py-2 border hover:line-through hover:uppercase transition-all duration-700'>Cancelled Appointment</p>}

                  {item.isCompleted && <button className='text-sm bg-white text-green-500 text-center sm:min-w-48 py-2 border border-primary/50  hover:uppercase transition-all duration-700'>Completed</button>}

                    
                  </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppoinments