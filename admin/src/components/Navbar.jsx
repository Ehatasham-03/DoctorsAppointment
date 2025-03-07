import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContextP.jsx'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContextP.jsx'

const Navbar = () => {

  const {adminToken , setAdminToken} = useContext(AdminContext)
  const {setDoctorToken , doctorToken} = useContext(DoctorContext)
  const naviage = useNavigate()
  const handleLogout = async() => {
    naviage('/')
    if (adminToken) {
      adminToken && setAdminToken('')
      adminToken && localStorage.removeItem('adminToken')
    }
    if (doctorToken) {
      doctorToken && setDoctorToken('')
      doctorToken && localStorage.removeItem('doctorToken')
    }
  }

  return (
    <nav className='flex justify-between items-center px-4 sm:px-4 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-sm'>
        <img onClick={()=> adminToken ? naviage('/admin-dashboard') : naviage('/doctor-dashboard')} className='w-3/6 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-500'>{adminToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={handleLogout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </nav>
  )
}

export default Navbar