import React, { useState } from 'react';
import authService from '../services/auth.service'; // Import your AuthService instance
import { Link } from 'react-router-dom';
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const [name, setName] = useState('');
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((states) => states.user);

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			const user = await authService.createAccount({ email, password, name });
			// console.log(user);
			dispatch(login(user));
			setLoading(false);

			// Redirect to dashboard or perform other actions upon successful signup
		} catch (error) {
			setError('Failed to create an account. Please try again.'); // Set error message
		}
	};

	useEffect(() => {
		console.log(user);
		if (user !== null) {
			navigate('/');
		}
	}, [user]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up for an account</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSignUp}>
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email address
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					{error && <p className="mt-2 text-sm text-red-600">{error}</p>} {/* Display error message */}
					<div>
						<button
						disabled={loading}
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Sign up
						</button>
					</div>
					<p className="hover:underline underline-offset-4 cursor-pointer">
						<Link to={'/login'}>Already have an account? Log in</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
