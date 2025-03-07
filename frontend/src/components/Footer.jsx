import React from 'react'
import { assets } from '../assets/assets'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='md:mx-10'>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
      {/* --------right side-------- */}
      <div className=''>
        <img className='mb-5 w-40' src={assets.logo} alt="" />
        <p className='w-full md:w-5/6 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
      {/* --------centeral side-------- */}
      <div className=''>
        <h1 className='text-xl font-medium mb-5'>Company</h1>
        <ul className='flex flex-col gap-2 text-gray-600'>
        <li><Link to='/' className='pt-[41px]'>Home</Link></li>
        <li><Link to='/about'>About us</Link></li>
        <li><Link to='/contact'>Contact us</Link></li>
        <li><Link to='/privacy-policy'>Privacy policy</Link></li>
        </ul>
      </div>
      {/* --------left side-------- */}
      <div className=''>
        <h1 className='text-xl font-medium mb-5' >GET IN TOUCH</h1>
        <ul  className='flex flex-col gap-2 text-gray-600'>
          <li>+1-212-456-7890</li>
          <li>codedev@gmail.com</li>
        </ul>
      </div>
      </div>
      {/* --------copyright-------- */}
      <div>
      <hr />
      <p className='py-5 text-sm text-center'>Copyright © 2024 CodeDev - All Right Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer