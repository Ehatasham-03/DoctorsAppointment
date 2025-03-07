import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContextP'
import { AppContext } from '../../context/AppContextP'
import { assets } from '../../assets/assets'
const DoctorAppointments = () => {

  const {getAllAppointments , doctorToken ,appointmentsData,currency ,cancelAppointment ,completeAppointment } = useContext(DoctorContext)
  const {calculateAge ,slotDateFormat} = useContext(AppContext)
  useEffect(()=> {
    if (doctorToken) {
      getAllAppointments()
    }
  } , [doctorToken])
  
  

  return (
    <div className='w-full max-w-6xl mx-5 md:mx-10 mt-5'>
    <p className='mb-3 text-lg font-medium'>All Appointments</p>
    <div>
      
        <div  className=' bg-white border rounded-lg text-sm max-h-[80vh] overflow-auto min-h-[60vh] '>
        <div  className='hidden sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b '>
          <p>Sl No</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          
          <p>Fees :</p>
          <p>Action :</p>
        </div>
        {
          appointmentsData?.map((item , index) => (
            
            <div key={index} className=' justify-between max-sm:gap-5 max-sm:text-base grid grid-cols-[3fr_1fr] sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center gap-1 text-gray-500  py-3 px-6 border-b  hover:bg-gray-50 '>
              
              <p className='hidden sm:block'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} className="w-8 rounded-full bg-gray-200" alt="" /> 
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>
                  {item.payment? 'Online' : 'Cash'}
                </p>
              </div>

              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              
              <p>{currency}{item.docData.fees}</p>
              {
                item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                ? <p className='text-green-400 text-xs font-medium'>Completed</p>
                : <div className='flex'>
                    <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                    <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                </div>
              }
              <div >

              </div>
              
            </div>
          ))
       }
      </div>
      
    </div>
  </div>
  )
} 

export default DoctorAppointments