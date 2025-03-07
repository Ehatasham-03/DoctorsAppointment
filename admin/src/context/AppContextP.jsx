import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {


    const currency = '$'
    const months = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"]

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m > 0 ) {
            return (age +'yr'+ " " + m + 'm');
        }
        if (m < 0 ) {
            return (age +'yr' + " " + Math.abs(m) + 'm');
        }
        return age;
    }
    const slotDateFormat = (slotDate) => {
      const dateArray = slotDate.split('_')
      return `${dateArray[0]} ${months[parseInt(dateArray[1]) - 1]} ${dateArray[2]}`
    }

    const value ={
        currency , calculateAge ,slotDateFormat
    }


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider