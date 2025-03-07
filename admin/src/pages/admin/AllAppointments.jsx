import React from 'react'
import { useContext } from 'react'
// import { useState } from 'react'
import { AdminContext } from '../../context/AdminContextP'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContextP'
import { assets } from '../../assets/assets'

const AllAppointments = () => {

  const {fetchAllAppointments , allAppointments , adminToken, cancelAppointment} = useContext(AdminContext)
  const {calculateAge, slotDateFormat , currency} = useContext(AppContext)

  
  
  useEffect(()=>{
    if (adminToken) {
      fetchAllAppointments()
      
    }
  } ,[ adminToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div>
        
          <div  className=' bg-white border rounded-lg text-sm max-h-[80vh] overflow-auto min-h-[60vh] '>
          <div  className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b '>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor Name</p>
            <p>Fees :</p>
            <p>Action :</p>
          </div>
          {
        allAppointments.map((item , index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500  py-3 px-6 border-b  hover:bg-gray-50 '>
            <p className='hidden sm:block'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className="w-8 rounded-full bg-gray-200" alt="" /> 
              <p>{item.userData.name}</p>
            </div>

            <p>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img src={item.docData.image} className="w-8 rounded-full bg-primary" alt="" /> 
              <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.docData.fees}</p>
            {item.cancelled ? (
              <p className='text-red-500 text-sm font-medium'>Canceled</p>
              ) : item.isCompleted 
               ? <p className='text-green-500 text-sm font-medium'>Completed</p> :
               (
                <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} className='cursor-pointer w-10 ' alt="" />
              )}
            
          </div>
        ))
      }
        </div>
        
      </div>
    </div>
  )
}

export default AllAppointments