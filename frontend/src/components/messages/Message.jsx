import { useAuthContext } from "../../context/AuthContext";
import { UseSocketContext } from "../../context/SocketContext";
import extractTime from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({message}) => {
	const{selectedConversation} = useConversation();
	const{authUser} = useAuthContext();
	const fromMe = message.senderid === authUser._id;
	const sendClass = fromMe ? "chat-end" : "chat-start";
	const profile = fromMe ? authUser.profilePic : selectedConversation.profilePic;
	const bubbleColor = fromMe ? 'bg-blue-500' : "";

	const time = extractTime(message.createdAt);
	const shake = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${sendClass}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profile} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleColor} ${shake} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{time}</div>
		</div>
	);
};
export default Message;