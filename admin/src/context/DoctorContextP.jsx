import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {

    const [doctorToken , setDoctorToken] = useState(localStorage.getItem('doctorToken')?localStorage.getItem('doctorToken'):'')
    const [appointmentsData , setAppointmentsData] = useState([])
    const [dashData , setDashData] = useState(false)
    const [profileData , setProfileData] = useState(false)

    const currency = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL_DOCTOR
    
    const getAllAppointments = async() => {

        try {
            
            
            const {data} = await axios.get(`${backendUrl}/doctor-appointments` , {headers:{doctorToken}})
            if (data.success) {
                setAppointmentsData(data.appointments.reverse())
            }
        } catch (error) {
            toast.error(error.message)
        }

    }
 
    // complete appointment
    const completeAppointment = async(appointmentId) => {
        try {
            const {data} = await axios.post(`${backendUrl}/complete-appointment` , {appointmentId} , {headers:{doctorToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    // cancel appointment
    const cancelAppointment = async(appointmentId) => {
        try {
            const {data} = await axios.post(`${backendUrl}/cancel-appointment` , {appointmentId} , {headers:{doctorToken}})
            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchDashData = async() => {
        try {
            const {data} = await axios.get(`${backendUrl}/doctor-dashboard`, {headers:{doctorToken}})
            if (data.success) { 
                setDashData(data.dashboardData) 
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const doctorProfile = async() => {
        try {
            const {data} = await axios.get(`${backendUrl}/doctor-profile`, {headers:{doctorToken}})
            if (data.success) {
                setProfileData(data.doctorData)
            } 
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    const value ={
        currency ,backendUrl,
        doctorToken, setDoctorToken,
        getAllAppointments ,setAppointmentsData ,appointmentsData ,
        completeAppointment , cancelAppointment ,
        fetchDashData , dashData , 
        doctorProfile , profileData , setProfileData

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider