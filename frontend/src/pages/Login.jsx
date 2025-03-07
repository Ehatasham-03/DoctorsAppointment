import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/AppContext.jsx'

const Login = () => {

  const [state,setState] = useState('Sign Up')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [name , setName] = useState('')

  const {backendUrl , navigate , setToken , token} = useContext(AppContext)
  const formSubmitHandler = async(e) => {
      e.preventDefault()

      try {
        
        if (state === 'Sign Up') {
          
          const {data} = await axios.post(`${backendUrl}/api/v1/user/register` , {
            name : name,
            email : email,
            password : password
          })
          if (data.success) {
            toast.success('Registered Successfully')
            
            setTimeout(() => {
              setState('Login')
            }, 2000);
          } else {
            toast.error(data.message)
          }

        } else if (state === 'Login') { 

          const {data} = await axios.post(`${backendUrl}/api/v1/user/login` , {
            email : email,
            password : password
          })
          if (data.success) {
            toast.success('Login Successfully')

            setToken(data.token)
            localStorage.setItem('token' , data.token)
            setTimeout(() => {
              navigate('/')
            } , 2000)
          } else {
            toast.error(data.message)
          }
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
  }



  return (
    <form onSubmit={formSubmitHandler} className='min-h-[80vh] flex items-center '>
      <div className='flex flex-col items-start gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border  rounded-xl text-zinc-600 text-sm drop-shadow-lg shadow-xl '>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p className='text-sm text-zinc-500'>{state === 'Sign Up' ? 'Please sign up to book appointment' : 'Please login to book appointment'}</p>
        <div className={` w-full  ${state === 'Sign Up' ? 'block' : 'hidden'}`}>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" placeholder='' onChange={(e)=>setName(e.target.value)} value={name} />
        </div>
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" placeholder='' onChange={(e)=>setEmail(e.target.value)} value={email} />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" placeholder='' onChange={(e)=>setPassword(e.target.value)} value={password} />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base mt-2 hover:scale-105 transition-all duration-300 tracking-widest'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        {
          state === 'Sign Up' 
          ?   <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>  
          :   <p>Create a new account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p> 
        }
      </div>
    </form>
  )
}

export default Login