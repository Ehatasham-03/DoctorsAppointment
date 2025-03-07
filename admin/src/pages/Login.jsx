import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets.js'
import { AdminContext } from '../context/AdminContextP.jsx'

import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContextP.jsx'
const Login = () => {

  const [state , setState] = useState('Admin')

  const {adminToken , setAdminToken ,backendUrl} = useContext(AdminContext)
  const {doctorToken, setDoctorToken} = useContext(DoctorContext)

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const onSubmitHandler = async(e)=>{
  
    e.preventDefault()

    if (state === 'Admin') {
      const {data} = await axios.post(backendUrl+'/api/v1/admin/admin-login',{email,password})
      
      if(data.success){
        localStorage.setItem('adminToken',data.adminToken)
        setAdminToken(data.adminToken)
      }else {
        toast.error(data.message)
      }
    } else {
      const {data} = await axios.post(backendUrl+'/api/v1/doctor/doctor-login',{email,password})
      
      if(data.success){
        localStorage.setItem('doctorToken',data.token)
        setDoctorToken(data.token)
      }else {
        toast.error(data.message)
      }
    } 
  }


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span>Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1 ' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1 ' type="password" required />
        </div>
        <button className='border border-[#DADADA] rounded w-full py-2 mt-1 text-base bg-primary text-white'>Login</button>

        {state === 'Admin' 
        ? <p>Doctor Login ? <span className='text-primary cursor-pointer' onClick={()=>setState('Doctor')}>Click Here</span></p>
        : <p>Admin Login ? <span className='text-primary cursor-pointer' onClick={()=>setState('Admin')}>Click Here</span></p>
      }

      </div>
    </form>
  )
}

export default Login