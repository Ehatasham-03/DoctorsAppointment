import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContextP.jsx';
import { assets } from '../../assets/assets.js';
const DoctorsList = () => {


  const {adminToken  , docInfo , fetchDocData , changeAvailability , deleteDoctor} = useContext(AdminContext)
  
  useEffect(()=>{
    console.log(docInfo);
    
    if(adminToken) {
    fetchDocData()
    }
  } , [adminToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll '>
        <p className='text-lg font-medium'>All Doctors</p>
        <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
            {docInfo.map((item, index)=>(
                    <div  key={index} className='rounded-xl border border-indigo-200 max-w-56 overflow-hidden cursor-pointer group relative'>
                      <button onClick={() => deleteDoctor(item._id)} className='absolute z-10 right-0 top-1 bg-white opacity-0 group-hover:opacity-100 group-hover:bg-transparent transition-all duration-200'><img className='size-12' src={assets.cancel_icon} alt="" /></button>
                      <img className='bg-indigo-50 group-hover:scale-105 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
                      <div className='p-4'>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-500 text-sm'>{item.speciality}</p>
                        <div className='flex gap-2 pt-2'>
                          <input onChange={() => changeAvailability(item._id)} type="checkbox" checked={item.available} />
                          <p>Available</p>
                        </div>
                      </div>
                    </div>
            ))}
        </div>
        
    </div>
    
  )
}

export default DoctorsList