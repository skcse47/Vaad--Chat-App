import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"


const useLogin = ()=>{
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const doLogin = async ({username, password}) =>{
        const success = validateInput({username, password});
        console.log(success)
        if(!success) return;
        setLoading(true)
        try {
            const res = await fetch("/api/auth/login", {
                method: 'POST',
                headers: {"content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });

            const data = await res.json();

            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(true)
        }
    }
    return {loading, doLogin};
}

export default useLogin;

function validateInput({username, password}){
    if(!username || !password){
        toast.error("Please fill all fields.")
        return false;
    }
    return true;
}