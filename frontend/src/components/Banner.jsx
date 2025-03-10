import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-14 my-20 md:my-10'>
        {/* ------left side------   */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
            <p>Book Appointment</p> 
            <p className='mt-4'>With 100+ Trusted Doctors</p>
            </div>
            <button onClick={()=> navigate('/login')} className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm mt-4 hover:scale-105 transition-all duration-300'>Create Account</button>
        </div>
        {/* ------right side------ */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative '>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner