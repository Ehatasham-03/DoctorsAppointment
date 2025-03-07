import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContextP.jsx'
import { assets } from '../assets/assets.js'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContextP.jsx'

const SideBar = () => {

    const {adminToken} = useContext(AdminContext)
    const {doctorToken} = useContext(DoctorContext)
  return (
    <div className='min-h-screen bg-white border-r flex-shrink-0'>
      {
        adminToken && <ul className='mt-5 text-[#515151]'>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-52 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`} to={'/admin-dashboard'}>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-52 cursor-pointer${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`}  to={'/all-appointments'}>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-52 cursor-pointer${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`} to={'/add-doctor'}>
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-52 cursor-pointer${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`} to={'/doctors-list'}>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>
        </ul>
      }

      {
        doctorToken && <ul className='mt-5 text-[#515151]'>
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-52 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`} to={'/doctor-dashboard'}>
          <img src={assets.home_icon} alt="" />
          <p className='hidden md:block'>Dashboard</p>
        </NavLink>
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-52 cursor-pointer${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`}  to={'/doctor-appointment'}>
          <img src={assets.appointment_icon} alt="" />
          <p className='hidden md:block'>Appointments</p>
        </NavLink>
        <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-52 cursor-pointer${isActive ? 'bg-[#f2f3ff] border-r-4 border-primary' : ''}`} to={'/doctor-profile'}>
          <img src={assets.people_icon} alt="" />
          <p className='hidden md:block'>Profile</p>
        </NavLink>
      </ul>
      }
    </div>
  )
}

export default SideBar