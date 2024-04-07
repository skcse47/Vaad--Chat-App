const GenderCheckbox = ({onCheckboxChange, selectedgender}) => {
	return (
		<div className='flex'>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer ${selectedgender === "male" ? "selected" : ""}`}>
					<span className='label-text text-white'>Male</span>
					<input type='checkbox' className='checkbox border-white' 
						checked={selectedgender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  ${selectedgender === "female" ? "selected" : ""}`}>
					<span className='label-text text-white'>Female</span>
					<input type='checkbox' className='checkbox border-white' 
						checked={selectedgender == "female"}
						onChange={() => onCheckboxChange("female")}
					/>
				</label>
			</div>
		</div>
	);
};
export default GenderCheckbox;