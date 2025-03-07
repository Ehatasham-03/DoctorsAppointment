import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContextP'
import { AppContext } from '../../context/AppContextP'

const Dashboard = () => {

  const { dashboardData, adminToken, dashboard, cancelAppointment, completeAppointment } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (adminToken) {
      dashboardData()
    }
  }, [adminToken])



  return (
    <div className='flex flex-col items-center gap-4  text-gray-900 md:mx-10   mt-5' >

      <div className='flex flex-col gap-y-10 flex-wrap' >


        <div className='grid md:grid-cols-3 items-center justify-between gap-2 md:gap-6 lg:gap-12 w-full '>

          <div className='flex items-center gap-3 bg-white py-4 px-2 md:px-3 lg:px-6 rounded-lg  border shadow-lg text-wrap'>
            <img className='w-8 md:w-12 lg:w-16' src={assets.doctor_icon} alt="" />
            <p className='flex flex-col'> <span>{dashboard?.totalDoctor}</span> Doctors</p>
          </div>

          <div className='flex items-center gap-3 bg-white py-4 px-2 md:px-3 lg:px-6 rounded-lg border shadow-lg'>
            <img className='w-8 md:w-12 lg:w-16' src={assets.appointments_icon} alt="" />
            <p className='flex flex-col '> <span>{dashboard?.totalAppointments}</span> Appointments</p>
          </div>

          <div className='flex items-center gap-3 bg-white py-4 px-2 md:px-3 lg:px-6 rounded-lg border shadow-lg'>
            <img className='w-8 md:w-12 lg:w-16' src={assets.patients_icon} alt="" />
            <p className='flex flex-col'> <span>{dashboard?.totalUsers}</span> Patients</p>
          </div>

        </div>


        <div >

          <div className='flex items-center gap-3 bg-white py-4 px-6 rounded-lg  border shadow-lg'>
            <div className='flex items-center gap-2'>
              <img src={assets.list_icon} alt="" />
              <p>Latest Appointment</p>
            </div>
          </div>
          <div className='border shadow-lg rounded-lg py-4 bg-white'>
            {
              dashboard?.latestAppointments?.map((item, index) => (
                <div key={index} className='flex items-center sm:grid sm:grid-cols-[0.5fr_1fr_5fr_1fr] gap-3  px-4 py-2 rounded-lg   '>
                  <p className='hidden sm:block '>{index + 1}</p>
                  <img src={item.userData.image} className="w-8 rounded-full bg-gray-200" alt="" />
                  <div className='flex flex-col items-start '>
                    <p>{item.userData.name}</p>
                    <p className='text-sm text-gray-400'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                  </div>
                  {item.cancelled ? (
                    <p className='text-red-500 text-sm font-medium'>Canceled</p>
                  ) : item.isCompleted
                    ? <p className='text-green-500 text-sm font-medium'>Completed</p> :
                    (
                      <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} className='cursor-pointer w-10 ' alt="" />
                    )}

                </div>
              ))
            }
          </div>

        </div>
      </div>

    </div>
  )
}

export default Dashboard