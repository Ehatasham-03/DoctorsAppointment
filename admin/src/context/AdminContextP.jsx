import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";


export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    
    const [adminToken , setAdminToken] = useState(localStorage.getItem('adminToken')?localStorage.getItem('adminToken'):'')
    const backendUrl = import.meta.env.VITE_BACKEND_URL 

    const [docInfo , setDocInfo] = useState([])
    const [allAppointments , setAllAppointments] = useState([])
    const [dashboard , setDashboard] = useState([])

    const fetchDocData = async () => {
       try {
         const { data } = await axios.get(`${backendUrl}/api/v1/admin/get-alldoc`, { headers: { adminToken } });
     
         if (data.success) {
            setDocInfo(data.allDoctors)
        } else {
            toast.error(data.message)
        }

       } catch (error) {
        toast.error(error.message)
       }
      };

      const changeAvailability = async (docId) => {

        try {
            
            const {data} = await axios.post(backendUrl+'/api/v1/admin/change-availability' , {docId} , {headers:{adminToken}} )
            if (data.success) {
                toast.success(data.message)
                fetchDocData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
        toast.error(error.message)
            
        }

      }

      const deleteDoctor = async (docId) => {

        try {
            
            const {data} = await axios.patch(backendUrl+'/api/v1/admin/delete-doctor' , {docId} , {headers:{adminToken}} )
            if (data.success) {
                fetchDocData()
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

      }

      const fetchAllAppointments = async() => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/v1/admin/all-appointments` , {headers:{adminToken}})
            if (data.success) {
                setAllAppointments(data.appintments.reverse())
                
            }
        } catch (error) {
            toast.error(error.message)
        }
      }

      // cancle appointment 
      const cancelAppointment = async(appointmentId)=>{
          try {
            const {data} = await axios.post(`${backendUrl}/api/v1/admin/cancel-appointment` , {appointmentId} , {headers:{adminToken}})
            if (data.success) {
                fetchAllAppointments()
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
          } catch (error) {
            toast.error(error.message)
          }
      }

      //dashboard Data
      const dashboardData = async()=>{
        try {
            const {data} = await axios.get(`${backendUrl}/api/v1/admin//dashboard-data` , {headers:{adminToken}})
            if (data.success) {
                setDashboard(data.dashboardData)
                fetchAllAppointments()
                fetchDocData()
            }
        } catch (error) {
            toast.error(error.message)
        }
      }

    const value ={
        adminToken , setAdminToken ,
        backendUrl , docInfo , fetchDocData ,
        changeAvailability , deleteDoctor , 
        fetchAllAppointments , allAppointments ,
        cancelAppointment , dashboardData ,dashboard
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider