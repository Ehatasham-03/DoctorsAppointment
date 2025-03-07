import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

  const {speciality} = useParams()
  const [filterDoc , setFilterDoc] = useState([])
  const [ShowFilters , setShowFilters] = useState(false)
  const {doctors} = useContext(AppContext)
  const navigate = useNavigate()

  const applyFilter =()=> {
    if (speciality) {
      setFilterDoc(doctors.filter(item => item.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }
  useEffect(()=> {
    applyFilter()
  },[doctors , speciality])

  return (
    <div>
        {/* -------left side----- */}
          <p className='text-gray-600'>Browse through the doctors specialist.</p>
          <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>

                  <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${ShowFilters ? 'bg-primary text-white' : ''} `} onClick={()=>setShowFilters(prev => !prev)}>Filters</button>

              <div className={`flex flex-col gap-4 mt-5 text-sm md:space-y-3 text-gray-600 md:block ${ShowFilters ? 'visible' : 'hidden'}`}>
                  <p onClick={()=> speciality === 'General physician' ? navigate('/doctors'): navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality !== 'General physician' ? 'bg-white': 'bg-primary/60 text-black'} hover:bg-primary/10`}>General Physician</p>
                  <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality !== 'Gynecologist' ?'bg-white': 'bg-primary/60 text-black'} hover:bg-primary/10`}>Gynecologist</p>
                  <p onClick={()=> speciality === "Dermatologist" ? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality !== 'Dermatologist' ?'bg-white': 'bg-primary/60 text-black'} hover:bg-primary/10`}>Dermatologist</p>
                  <p onClick={()=> speciality === "Pediatricians" ? navigate('/doctors'): navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality !== 'Pediatricians' ?'bg-white': 'bg-primary/60 text-black'} hover:bg-primary/10`}>Pediatricians</p>
                  <p onClick={()=> speciality === "Neurologist" ? navigate('/doctors'): navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality !== 'Neurologist' ?'bg-white': 'bg-primary/60 text-black'} hover:bg-primary/10`}>Neurologist</p>
                  <p onClick={()=> speciality === "Gastroenterologist" ? navigate('/doctors'): navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality !== 'Gastroenterologist' ?'bg-white': 'bg-primary/60 text-black'} hover:bg-primary/10`}>Gastroenterologist</p>
                </div>
              <div className='w-full grid grid-cols-auto  gap-4 pt-5 gap-y-6  '>
                  {filterDoc.map((item, index)=>(
                  <div onClick={()=> {navigate(`/appointment/${item._id}`) , scrollTo(0,0)}} key={index} className='rounded-xl border border-gray-400 overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500'>
                              <img className={`bottom-0  rounded-t-lg ${item.available ? 'bg-green-600/60' : 'bg-gray-400 opacity-60'}`} src={item.image} alt="" />
                              <div className='p-4'>
                                {
                                  item.available 
                                  ? <div className='flex gap-2 items-center text-sm text-center'>
                                        <p className='rounded-full w-2 h-2 bg-green-500'></p>
                                        <p className='text-green-500'>Available</p>
                                    </div>
                                 :  <div className='flex gap-2 items-center text-sm text-center'>
                                        <p className='rounded-full w-2 h-2 bg-red-500'></p>
                                        <p className='text-red-500'>Not Available</p>
                                    </div>
                                }
                                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                <p className='text-gray-500 text-sm'>{item.speciality}</p>
                              </div>
                            </div>
                    ))}
                </div>
          </div>
    </div>
  )
}

export default Doctors