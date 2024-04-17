import { useState } from "react";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {

	const [searchQuery, setSearchQuery] = useState('')

	const handleSearch = (value) => {
		setSearchQuery(value);
	}
	return (
		<div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput onSearch={handleSearch}/>
			<div className='divider px-3'></div>
			<Conversations searchQuery={searchQuery} />
			<LogoutButton />
		</div>
	);
};
export default Sidebar;