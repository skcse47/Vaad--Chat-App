import {React, useState} from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const dosignup = async({fullname, username, Password, confirmPassword, gender}) =>{
    const success = validateInputs({fullname, username, Password, confirmPassword, gender});
    console.log(success)
    if(!success) return;

    setLoading(true)
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({fullname, username, password: Password, confirmPassword, gender})
        });

        const data = await res.json();
        
        if(data.error){
            throw new Error(data.error)
        }
        // localstorage
        localStorage.setItem("chat-user", JSON.stringify(data))
        // context 
        setAuthUser(data)

    } catch (error) {
        toast.error(error.message);
    }finally{ 
        setLoading(false)
    }

  }

  return {loading, dosignup};
}

export default useSignUp

function validateInputs({fullname, username, Password, confirmPassword, gender}){
    if(!fullname || !username || !Password || !confirmPassword || !gender){
        toast.error("Please fill all fields.")
        return false;
    }

    if(Password !== confirmPassword){
        toast.error("Password not matched.")
        return false;
    }

    return true;
}