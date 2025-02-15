import { useState, useEffect } from "react"
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
            setLoading(false)
        }
    }

    const doGoogleLogin = () => {
        location.href = "http://localhost:5000/api/auth/google";
    }; 
    return {loading, doLogin, doGoogleLogin};
}
const useGoogleAuth = () => {
    const { setAuthUser } = useAuthContext();

    useEffect(() => {
        console.log("Current URL:", window.location.href); 

        const urlParams = new URLSearchParams(window.location.search);
        const userData = urlParams.get("user");

        if (userData) {
            try {
                const decodedUser = JSON.parse(decodeURIComponent(userData));
                localStorage.setItem("chat-user", JSON.stringify(decodedUser));
                setAuthUser(decodedUser);

                setTimeout(() => {
                    window.history.replaceState({}, document.title, window.location.pathname);
                    console.log("Query params removed from URL");
                }, 1000);
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }
    }, []);
};   

export  {useLogin, useGoogleAuth};

function validateInput({username, password}){
    if(!username || !password){
        toast.error("Please fill all fields.")
        return false;
    }
    return true;
}