import React, { useContext, useEffect } from 'react'

import { DoctorContext } from '../../context/DoctorContextP'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContextP'

const DoctorDashboard = () => {

  const {doctorToken , dashData , fetchDashData } = useContext(DoctorContext)
  const {slotDateFormat , currency} = useContext(AppContext)
  useEffect(() => {
    if (doctorToken) {
      fetchDashData()
    }
  }, [doctorToken])

  return dashData && (
    <div className='flex flex-col items-center gap-4  text-gray-900 mx-5 md:mx-10   mt-5' >
      
         <div className='flex flex-col gap-y-10 flex-wrap' >

      
              <div className='grid md:grid-cols-3 items-center justify-between gap-2 md:gap-6 lg:gap-12 w-full '>
                
                      <div className='flex items-center gap-3 bg-white py-4 px-2 md:px-3 lg:px-6 rounded-lg border shadow-lg'>
                          <img className='w-8 md:w-12 lg:w-16' src={assets.appointments_icon} alt="" />
                          <p className='flex flex-col '> <span>{dashData?.appointments}</span> Appointments</p>
                      </div>

                      <div className='flex items-center gap-3 bg-white py-4 px-2 md:px-3 lg:px-6 rounded-lg border shadow-lg'>
                          <img className='w-8 md:w-12 lg:w-16' src={assets.patients_icon} alt="" />
                          <p className='flex flex-col'> <span>{dashData?.patients}</span> Patients</p>
                      </div>

                      <div className='flex items-center gap-3 bg-white py-4 px-2 md:px-3 lg:px-6 rounded-lg  border shadow-lg text-wrap'>
                          <img className='w-8 md:w-12 lg:w-16' src={assets.earning_icon} alt="" />
                          <p className='flex flex-col'> <span>{currency}{dashData?.earnings}</span> Earnings</p>
                      </div>

              </div>
       
         
              <div >

                <div className='flex items-center gap-3 bg-white py-4 px-6 rounded-lg  border shadow-lg'>
                  <div className='flex items-center gap-2'>
                    <img src={assets.list_icon} alt="" />
                    <p>Latest Appointment</p>
                  </div>
                </div>
                <div className='border shadow-lg rounded-lg py-4 bg-white'>
                  {
                  dashData?.latestAppointments?.map((item , index) => (
                      <div key={index} className='flex items-center sm:grid sm:grid-cols-[0.5fr_1fr_5fr_1fr] gap-3  px-4 py-2 rounded-lg   '>
                        <p className='hidden sm:block '>{index + 1}</p>
                        <img src={item.userData.image} className="w-8 rounded-full bg-gray-200" alt="" /> 
                        <div className='flex flex-col items-start '>
                          <p>{item.userData.name}</p>
                          <p className='text-sm text-gray-400'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                        </div>
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
                      
                      </div>
                  ))
                  }
                </div>
         
              </div>
      </div>

    </div>
  )
}

export default DoctorDashboard