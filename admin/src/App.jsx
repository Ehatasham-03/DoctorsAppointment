import React, { useContext } from 'react'
import Login from './pages/Login.jsx'
import { ToastContainer , toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContextP.jsx';
import Navbar from './components/Navbar.jsx';
import SideBar from './components/SideBar.jsx';
import { Routes,Route } from 'react-router-dom';
import DashBoard from './pages/admin/Dashboard.jsx'
import AllAppointments from './pages/admin/AllAppointments.jsx';
import AddDoctor from './pages/admin/AddDoctor.jsx';
import DoctorsList from './pages/admin/DoctorsList.jsx';
import { DoctorContext } from './context/DoctorContextP.jsx';
import DoctorAppointments from './pages/doctor/DoctorAppointments.jsx';
import DoctorProfile from './pages/doctor/DoctorProfile.jsx';
import DoctorDashboard from './pages/doctor/DoctorDashboard.jsx';

const App = () => {

  const {adminToken} = useContext(AdminContext)
  const {doctorToken} = useContext(DoctorContext)
  return adminToken || doctorToken ? (
    <div className='bg-[#f8f9fd]'>
      <ToastContainer />
      <Navbar/>
      <div className='flex items-start '>
        <SideBar/>
        <Routes>
          {/* ---Admin----- */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<DashBoard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctors-list' element={<DoctorsList />} />

          {/* ----Doctor --- */}
          <Route path='/doctor-appointment' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
        </Routes>
      </div>

    </div>
  ) 
  : (
    <>
      <Login/>
      <ToastContainer />
    </>
  )
}

export default App