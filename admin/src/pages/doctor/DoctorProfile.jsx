import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContextP'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const {doctorProfile , profileData ,doctorToken , setProfileData , currency ,backendUrl} = useContext(DoctorContext)
  const [isEdit , setIsEdit] = useState(false)
  const [image , setImage] = useState(false)

  const updateProfileData = async() => {
    try {
      const formData = new FormData()
      formData.append('fees' , profileData.fees)
      formData.append('about' , profileData.about)
      formData.append('available' , profileData.available)
      formData.append('address', JSON.stringify(profileData.address))
      image && formData.append('image' , image)
      
      const {data} = await axios.post(`${backendUrl}/update-profile` , formData , {headers:{doctorToken}})
      if (data.success) {
        toast.success(data.message)
        doctorProfile()
        setIsEdit(false)
        setImage(false)
      }
    } catch (error) {
      toast.error(error.message)
    }
      }

  useEffect(() => {
    doctorProfile()
  }, [doctorToken])

  return profileData && (
    <div>

        <div className=' grid   lg:grid-cols-[1fr_3fr_1fr] mx-5 md:mx-10 gap-4 mt-5'>

          <div>

          {
            isEdit 
            ? <label htmlFor="image">
              <div className='inline-block relative cursor-pointer'>
                <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg'  src={image ? URL.createObjectURL(image) : profileData.image } alt="" />
                <img className='w-10 absolute bottom-20 right-20 ' src={image ? '' : assets.upload_icon } alt="" />
              </div>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
            </label>
            : <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg'  src={profileData.image} alt="" />
          }
            
          </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
             {/* ---- doc info--- */}
              <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
              <div className='flex items-center gap-2 mt-1 text-gray-600'>
                <p>{profileData.degree} - {profileData.speciality}</p>
                <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
              </div>

              {/* -----doctor about---- */}
              <div>
                <p className='flex items-center gap-1 text-sm mt-3 text-neutral-800 font-medium'>About:</p>
                <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{ isEdit ? <textarea type="text" rows={4}  className='resize-none text-sm min-h-fit  text-gray-600 min-w-[700px] mt-1' onChange={(e) => setProfileData(prev => ({...prev , about : e.target.value}))} value={profileData.about} /> : profileData.about}</p>
              </div>

              <p className=' text-gray-600 font-medium mt-4'>
                Appointment Fee : <span className='text-gray-800'>{currency}{isEdit ? <input className='' type="number"  onChange={(e) => setProfileData(prev => ({...prev , fees : e.target.value}))} value={profileData.fees}/> : profileData.fees}</span>
              </p>

              <div className='flex gap-2 py-2'>
                <p className='textsm'>Address:</p>

                <p className='text-sm'>
                  { isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({...prev , address : {...prev.address , line1 : e.target.value}}))} value={profileData.address.line1} /> : profileData.address.line1}
                <br />
                { isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({...prev , address : {...prev.address , line2 : e.target.value}}))} value={profileData.address.line2} /> : profileData.address.line2}</p>

              </div>

              <div className='flex gap-1 pt-2'>
                {
                  isEdit
                  ? <input onChange={() => setProfileData(prev => ({...prev , available : !profileData.available}))}   checked={profileData.available} type="checkbox" name="" id="" />
                  : <input checked={profileData.available} type="checkbox" name="" id="" />
                }
                
                <label htmlFor="">Available</label>
              </div>
              
              {isEdit 
              ?  <button onClick={() => updateProfileData()} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all duration-500'>Save</button>
              : <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all duration-500'>Edit</button>
             } 
        </div>
      </div>


    </div>
  )
}

export default DoctorProfile