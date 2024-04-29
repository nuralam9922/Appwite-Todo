import React, { useState } from 'react';
import authService from '../services/auth.service'; // Import your AuthService instance
import { Link } from 'react-router-dom';
import { login } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth';
import useRequest from '../hooks/useRequest';

function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [name, setName] = useState('');
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((states) => states.user);
	const [authStatus, loading] = useAuth();
	const [requestLoading, requestError, callRequest] = useRequest();
	const [warningMessage, setWarningMessage] = useState(null);

	if (authStatus) {
		navigate('/');
	}

	useEffect(() => {
		if (user !== null) {
			navigate('/');
		}
	}, [user]);

	const handleSignUp = async (e) => {
		e.preventDefault();

		if (password.length <= 8) {
			setWarningMessage('Password must be at least 8 characters');
		} else if (name === '') {
			warningMessage('Please enter your name');
		} else if (email.length === 0 || password.length === 0) {
			warningMessage('Please fill all the fields');
		} else {
			setWarningMessage('');
			const response = callRequest(request);
			// console.log(response);
			if (response) {
				dispatch(login(response));
				navigate('/');
			}
		}
	};

	const request = async () => {
		await authService.createAccount(email, password, name);
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	}

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
					{warningMessage && <p className="mt-2 text-sm text-red-600">{warningMessage}</p>} {/* Display error message */}
					{requestError && <p className="mt-2 text-sm text-red-600">{requestError}</p>} {/* Display error message */}
					<div>
						<button
							disabled={loading}
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{requestLoading ? 'SignUp in...' : 'SignUp in'}
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
