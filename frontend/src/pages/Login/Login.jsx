import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useLogin,useGoogleAuth} from '../../hooks/useLogin'


const Login = () => {
	useGoogleAuth();
	// const [inputs, setInputs] = useState({
	// 	username: '',
	// 	password: '',
	// });

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const {loading, doLogin, doGoogleLogin} = useLogin();

	const handleSubmit = async(e) => {
		e.preventDefault();
		await doLogin({username, password});
		console.log(username, password)

	}
	const handleGoogleLogin = async (e) => {
		e.preventDefault();
		await doGoogleLogin();
	}
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> ChatApp</span>
				</h1>
      <form onSubmit={handleSubmit}>
 					<div>
					<label className='label p-2'>
 							<span className='text-white label-text'>Username</span>
					</label>
 						<input type='text' placeholder='Enter Username' className='w-full input input-bordered h-10' 
						// value={inputs.username}
						// onChange={(e) => setInputs({...inputs, username: e.target.value})}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						/>
 					</div>

 					<div>
 						<label className='label'>
 							<span className='text-white label-text'>Password</span>
 						</label>
 						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							// value={inputs.password}
							// onChange={(e) => setInputs({...inputs, password: e.target.value})}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<Link to={'/signup'} className='text-white text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-8'>
						{
							loading ? (
								<span className='loading loading-spinner'></span>
							) : (
								"Login"
							)
						}	
						</button>
					</div>
				</form>
				<div className="flex items-center justify-center mt-6">
					<div className="border-t border-gray-300 flex-1"></div>
					<span className="px-4 text-gray-500">OR</span>
					<div className="border-t border-gray-300 flex-1"></div>
				</div>
				<div className="flex justify-center items-center space-x-8 mt-3 mt-6">
				<button
					onClick={handleGoogleLogin}
					className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg shadow-md bg-gray-800 text-white hover:bg-gray-100 hover:text-black transition"
					disabled={loading}
				>
					{loading ? <span className="loading loading-spinner"></span> : (
						<>
							<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
							<span className="font-medium">Sign in with Google</span>
						</>
					)}
				</button>
				</div>
      </div>
    </div>
  )
}

export default Login