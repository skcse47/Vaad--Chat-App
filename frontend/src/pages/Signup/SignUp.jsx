import React, { useState } from 'react'
import GenderCheckbox from "./GenderCheckbox";
import { Link } from 'react-router-dom';
import useSignUp from '../../hooks/useSignUp';

const SignUp = () => {

	const [inputs, setInputs] = useState({
		fullname: '',
		username: '',
		Password: '',
		confirmPassword: '',
		gender: '',

	});

	const { loading, dosignup} = useSignUp();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dosignup(inputs);

		console.log(inputs)
	}

	const handleGenderChk = (gender) => {
		setInputs({...inputs, gender});
	}

  	return (
  		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
  			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
  				<h1 className='text-3xl font-semibold text-center text-gray-300'>
  					Sign Up <span className='text-blue-500'> ChatApp</span>
  				</h1>
  
  				<form onSubmit={handleSubmit}>
  					<div>
  						<label className='label p-2'>
  							<span className='text-base label-text text-white'>Full Name</span>
  						</label>
  						<input type='text' placeholder='fullname' className='w-full input input-bordered  h-10' 
							value={inputs.fullname}
							onChange={(e) => setInputs({...inputs, fullname: e.target.value})}
						/>
  					</div>
  
  					<div>
  						<label className='label p-2 '>
  							<span className='text-base label-text text-white'>Username</span>
  						</label>
  						<input type='text' placeholder='username' className='w-full input input-bordered h-10' 
							value={inputs.username}
							onChange={(e) => setInputs({...inputs, username: e.target.value})}
						/>
  					</div>
  
  					<div>
  						<label className='label'>
  							<span className='text-base label-text text-white'>Password</span>
  						</label>
  						<input
  							type='password'
  							placeholder='Enter Password'
  							className='w-full input input-bordered h-10'
							  value={inputs.Password}
							  onChange={(e) => setInputs({...inputs, Password: e.target.value})}
  						/>
  					</div>
  
  					<div>
  						<label className='label'>
  							<span className='text-base label-text text-white'>Confirm Password</span>
  						</label>
  						<input
  							type='password'
  							placeholder='Confirm Password'
  							className='w-full input input-bordered h-10'
							  value={inputs.confirmPassword}
							  onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
  						/>
  					</div>
  
  					<GenderCheckbox onCheckboxChange ={handleGenderChk} selectedgender = {inputs.gender}/>
  
  					<Link to={'/login'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white' href='#'>
  						Already have an account?
  					</Link>
  
  					<div>
  						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
  					</div>
  				</form>
  			</div>
  		</div>
  	);
  };
  export default SignUp;