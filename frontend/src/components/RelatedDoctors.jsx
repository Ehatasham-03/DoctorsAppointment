import React, { useContext, useEffect,useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({docId , speciality}) => {

    const {doctors} = useContext(AppContext)
    const navigate = useNavigate()
    const [relDoc , setRelDoc] = useState([])

    useEffect(()=>{
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc?.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    },[doctors , speciality , docId])

  return (

    <div className='flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Related Doctors</h1>
        <p className='text-sm sm:w-1/3 text-center'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto  gap-4 pt-5 gap-y-6 px-3 sm:px-0 '>
            {relDoc.slice(0,5).map((item, index)=>(
                    <div onClick={()=> {navigate(`/appointment/${item._id}`) , scrollTo(0,0)} } key={index} className='rounded-xl border border-gray-400 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500'>
                      <img className={`bottom-0  rounded-t-lg ${item.available ? 'bg-green-600/60' : 'bg-gray-400 opacity-60'}`}  src={item.image} alt="" />
                      <div className='p-4'>
                        <div className='flex gap-2 items-center text-sm text-center'>
                            <p className={`rounded-full w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></p>
                            <p className={item.available ? 'text-green-500' : 'text-red-500'}>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-500 text-sm'>{item?.speciality}</p>
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

export default RelatedDoctors