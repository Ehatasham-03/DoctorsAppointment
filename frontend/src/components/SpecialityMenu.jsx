import React from 'react'
import { specialityData } from '../assets/assets.js'
import {Link} from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-700 ' >
      <h1 className='text-3xl font-medium'>Find by Speciality </h1>
      <p className='text-sm sm:w-1/3 text-center line-clamp-2'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      <div className='flex sm:justify-center pt-5 w-full gap-4 overflow-auto'>
        {specialityData.map((item, index)=> (
         <Link onClick={()=> scrollTo(0,0)} to={`/doctors/${item.speciality}`} className='flex flex-col text-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500'>
           <div key={index} className=''>
            <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
            <p>{item.speciality}</p>
           </div>
         </Link>
         
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu