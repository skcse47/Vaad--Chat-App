import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = ({onSearch}) => {

	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchChange = (e) =>{
		const value = e.target.value;
		setSearchQuery(value);
		onSearch(value);
	}

	return (
		<form className='flex items-center gap-2'>
			<input type='text' placeholder='Search user' className='input input-bordered rounded-full bg-slate-200 ' 
			value={searchQuery}
			onChange={handleSearchChange}
			/>
			{/* <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button> */}
		</form>
	);
};
export default SearchInput;