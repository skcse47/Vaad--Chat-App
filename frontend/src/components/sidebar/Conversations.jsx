import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
	const {loading, conversations} = useGetConversation();
	// console.log(Conversation);return;
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conver, idx) => (
				<Conversation
				key={conver._id}
				conver={conver}
				lastIdx={idx === conver.length -1 }
				/>
			))}
		</div>
	);
};
export default Conversations;