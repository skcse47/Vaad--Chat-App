import  { useEffect } from 'react'
import useConversation from '../zustand/useConversation';
import { UseSocketContext } from '../context/SocketContext';

const useListenMessages = () => {
  const {socket} =  UseSocketContext();
  const {messages, setMessages} =  useConversation();
  useEffect(() => {
    socket?.on("newMessage", (newMessage) =>{
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
    })

    return () => {
        socket.off("newMessage");
    }
  }, [socket, messages, setMessages]);
}

export default useListenMessages