import { createContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const currency = '$'
    const [doctors , setDoctors] = useState([])
    const [token , setToken ] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false )
    const [userData , setUserData] = useState(false)
    
    const fetchDocData = async () =>{

        try {
            
            const {data} = await axios.get(`${backendUrl}/api/v1/doctor/list`)
            if (data.success) {
                setDoctors(data.allDoctors)
                
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }

    const fetchUserData = async() => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/v1/user/get-profile` , {headers:{token}})
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    

    useEffect(() => {
        fetchDocData()
    } , [])

    useEffect(() => {
        if (token) {
            fetchUserData()
        } else {
            setUserData(false)
        }
    } , [token])

    const value = {
        doctors, fetchDocData , navigate,
        backendUrl , currency,
        token , setToken ,
        userData , setUserData , fetchUserData
    }

    return( 
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}

export default AppContextProvider