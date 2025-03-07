import React from 'react'
import { assets } from '../assets/assets'
const Contact = () => {
  return (
    <div >
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='font-semibold text-gray-700'>US</span></p>
        </div>
      <div className='my-10 flex justify-center flex-col md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full max-w-[360px]' src={assets.contact_image} alt="" />
      <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>   
          <p className='text-gray-500 '>54709 Willms Station <br /> Suite 350, Washington, USA </p>
          <p className='text-gray-500 '>Tel: (415) 555-0132<br />Email: codedev@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at Doctors' Choise</p>
          <p className='text-gray-500 '>Learn more about our teams and job openings.</p>
          <button className=' border-r border-b border-black px-8 py-4 text-sm hover:bg-black hover:text-white hover:scale-105 transition-all duration-500'>Explore Jobs</button>
      </div>
      </div>
    </div>
  )
}

export default Contact