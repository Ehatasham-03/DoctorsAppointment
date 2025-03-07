import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'
const TopDoctors = () => {
    const {doctors} = useContext(AppContext)
    const navigate = useNavigate()

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='text-sm sm:w-1/3 text-center'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto  gap-4 pt-5 gap-y-6 px-3 sm:px-0 '>
            {doctors.slice(0,10).map((item, index)=>(
                    <div onClick={()=> {navigate(`/appointment/${item._id}`) , scrollTo(0,0)}} key={index} className='rounded-xl border border-gray-400 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500'>
                      <img className={`bottom-0  rounded-t-lg ${item.available ? 'bg-green-600/60' : 'bg-gray-400 opacity-60'}`} src={item.image} alt="" />
                      <div className='p-4'>
                        <div className='flex gap-2 items-center text-sm text-center'>
                            {
                              item.available 
                              ? <div className='flex gap-2 items-center text-sm text-center'>
                                <p className={`rounded-full w-2 h-2 bg-green-500 `}></p>
                            
                            <p className='text-green-500'>Available</p>
                              </div>
                              : <div className='flex gap-2 items-center text-sm text-center'>
                                <p className={`rounded-full w-2 h-2 bg-red-500`}></p>
                            
                            <p className='text-red-500'>Not Available</p>
                              </div>
                            }
                            
                            
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-500 text-sm'>{item.speciality}</p>
                      </div>
                    </div>
            ))}
        </div>
        <button 
            onClick={()=> {navigate('/doctors') , scrollTo(0,0)}}
            className='py-3 px-16 mt-10 bg-primary text-white rounded-full hover:-translate-y-2 duration-500'>
                More
        </button>
    </div>
  )
}

export default TopDoctors