import { useState, useEffect, createContext, useContext } from "react";
import io from "socket.io-client";
import { useAuthContext } from "./AuthContext";


const SocketContext = createContext();

export const UseSocketContext = () => {
   return useContext(SocketContext);
}

export const SocketContextProvider = ({ children }) => {
const [socket, setSocket] = useState('');
const [onlineUsers, setOnlineUsers] = useState([]);
const {authUser} = useAuthContext();

useEffect(() => {
    if(authUser){
        const sockets = io("http://localhost:5000", {
            query: {
                userId: authUser._id,
            }
        });
        setSocket(sockets);

        sockets.on("onlineUsers", (users) => {
            setOnlineUsers(users);
        })
        return () =>{
            sockets.close();
        }
    }else{
        if(socket){
            socket.close();
            setSocket(null);
        }
    }
}, [authUser]);
    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>
};

