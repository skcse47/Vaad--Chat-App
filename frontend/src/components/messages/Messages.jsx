import Message from "./Message";
import useGetMessage from "../../hooks/useGetMessage";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useRef } from "react";
import { useEffect } from "react";
import useListenMessages from "../../hooks/useListenMessages";


const Messages = () => {
	const {loading, messages} = useGetMessage();
	const lastMsgReference = useRef();

	useListenMessages();
	useEffect(() => {
		setTimeout(() => {
			lastMsgReference.current?.scrollIntoView({ behaviour: "smooth" });
		}, 50);
	},[messages])

	return (
		<div className='px-4 flex-1 overflow-auto'>

			{!loading && messages.length > 0 ? messages.map((msg) => 
			
			<div key={msg._id} ref={lastMsgReference} >
				<Message message={msg} />
			</div>
			
			) : null}

			{ loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />) }
			{!loading && messages.length === 0 && <p className="text-center text-white">Send a message to start the conversation</p> }
		</div>
	);
};
export default Messages;