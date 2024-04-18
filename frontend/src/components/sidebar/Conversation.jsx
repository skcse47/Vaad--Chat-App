import { UseSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({conver, lastIdx}) => {
	const {selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conver._id;  // ? is used because it won't throw error for null value
	const {onlineUsers} = UseSocketContext();

	const online = onlineUsers.includes(conver._id) ? "online" : "";
	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ''}
			`}
			onClick={() => setSelectedConversation(conver)}
			>
				<div className={`avatar ${online}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conver.profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conver.fullname}</p>
						{/* <span className='text-xl'>🎃</span> */}
					</div>
				</div>
			</div>

		{
			!lastIdx ? <div className='divider my-0 py-0 h-1' /> : ''
		}
			
		</>
	);
};
export default Conversation;