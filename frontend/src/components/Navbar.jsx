import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets.js'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaUserDoctor } from "react-icons/fa6";
import { MdAppRegistration } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';

const Navbar = () => {

  const navigate = useNavigate()
  
  const {token , setToken , userData } = useContext(AppContext) 
  const [showMenu , setShowMenu] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(false)
    toast.success('Logout Successfull')
    setTimeout(()=>{
      navigate('/')
    } , 2500)
  }
  

  return (
    <nav className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-500'>
      <NavLink to="/"><img className='w-36 cursor-pointer' src={assets.logo} alt="" /></NavLink>
      <ul className='hidden md:flex items-start gap-6 font-medium'>
        <NavLink to="/">
        <li className=' py-1 ' >Home</li>
        <hr className=' hidden ' />
        </NavLink>
        <NavLink to='/doctors'>
        <li className=' py-1 ' >All Doctors</li>
        <hr className=' hidden ' />
        </NavLink>
        <NavLink to="/about">
        <li className=' py-1 ' >About</li>
        <hr className=' hidden ' />
        </NavLink>
        <NavLink to="/contact">
        <li className=' py-1 ' >Contact</li>
        <hr className=' hidden ' />
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
        { 
        token && userData
        
         ?  <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img src={userData.image} className='rounded-full w-8' alt="profile_user" />
              <img src={assets.dropdown_icon} className='w-2.5 ' alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium z-20 hidden group-hover:block'>
                <div className='flex flex-col gap-4 p-4  bg-stone-300/60 min-w-48 rounded-lg'>
                  <p 
                  className='flex gap-2 items-center hover:text-primary hover:-translate-y-1 cursor-pointer duration-500'
                  onClick={() => navigate(`user/@${userData._id}`)}
                  ><FaUserDoctor /> Profile</p>
                  <p 
                  className='flex gap-2 items-center hover:text-primary hover:-translate-y-1 cursor-pointer duration-500'
                  onClick={() => navigate('my-appointments')}
                  ><MdAppRegistration />My Appointments</p>
                <p 
                    className='flex gap-2 items-center hover:text-primary hover:-translate-y-1 cursor-pointer duration-500'
                    onClick={handleLogout}
                      ><AiOutlineLogout/>Logout</p>
                      
                </div>
              </div>
           </div> 
          : 
          <button onClick={() => navigate('/login')} className='bg-primary text-center text-white py-3 px-8 rounded-full font-light  hidden md:block'>Create Account</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
        {/* mobile menu */}
        <div className={`${showMenu? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-50 overflow-hidden bg-white transition-all `}>
          <div className=' flex items-center justify-between px-5 py-6 ' >
            <img className='w-36' src={assets.logo} alt="" />
            <img className='w-7' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
          </div>

          <ul className='flex items-center flex-col gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink className={({isActive}) => `${isActive ? 'bg-primary text-white' : 'text-black'} px-6 py-2 rounded-md inline-block`} onClick={()=>setShowMenu(false)} to='/'>Home</NavLink>
            <NavLink className={({isActive}) => `${isActive ? 'bg-primary text-white' : 'text-black'} px-6 py-2 rounded-md inline-block`} onClick={()=>setShowMenu(false)} to='/doctors'>All Doctors</NavLink>
            <NavLink className={({isActive}) => `${isActive ? 'bg-primary text-white' : 'text-black'} px-6 py-2 rounded-md inline-block`} onClick={()=>setShowMenu(false)} to='/about'>About</NavLink>
            <NavLink className={({isActive}) => `${isActive ? 'bg-primary text-white' : 'text-black'} px-6 py-2 rounded-md inline-block`} onClick={()=>setShowMenu(false)} to='/contact'>Contact</NavLink>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar