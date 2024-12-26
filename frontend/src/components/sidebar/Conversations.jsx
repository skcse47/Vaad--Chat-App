import { useState } from "react";
import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = ({searchQuery}) => {
	const {loading, conversations} = useGetConversation();

	if(searchQuery){
		var filteredConversations = conversations.filter((conver) =>
		conver.fullname.toLowerCase().includes(searchQuery.toLowerCase())
	   );
	}else{
		var filteredConversations = conversations;
	}
	// console.log(Conversation);return;
	return (
	
		<div className='py-2 flex flex-col overflow-auto w-full sm:w-[80%] mx-auto'>
			<div className="p-3"></div>
			{filteredConversations.length > 0 ?  filteredConversations.map((conver, idx) => (
				<Conversation
				key={conver._id}
				conver={conver}
				lastIdx={idx === conver.length -1 }
				/>
			)) : <p className="text-center text-white">No User found.</p>}
		</div>
	);
};
export default Conversations;
