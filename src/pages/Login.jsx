import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/userSlice';
import authService from '../services/auth.service';
import useAuth from '../hooks/useAuth';
import useRequest from '../hooks/useRequest';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	// const [error, setError] = useState(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
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
	}, [user, navigate]);



	const handleLogin = async (e) => {
		e.preventDefault();

		if (password.length <= 8) {
			setWarningMessage('Password must be at least 8 characters');
		} else if (email.length === 0 || password.length === 0) {
			warningMessage('Please fill all the fields');
		} else {
			setWarningMessage('');
			const response = await callRequest(request);
			if (response) {
				dispatch(login(response));
				navigate('/');
			}
		}
	};

	// console.log(user);

	const request = async () => {
		await authService.login(email, password);
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
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
							disabled={requestLoading}
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
							disabled={requestLoading}
							className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>
					{requestError && <p className="mt-2 text-sm text-red-600">{requestError}</p>}
					{warningMessage && <p className="mt-2 text-sm text-red-600">{warningMessage}</p>}
					<div>
						<button
							type="submit"
							disabled={requestLoading}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							{requestLoading ? 'Signing in...' : 'Sign in'}
						</button>
					</div>
					<p className="hover:underline underline-offset-4 cursor-pointer">
						<Link to="/sign-up">Sign Up</Link>
					</p>
					<p onClick={async () => await authService.logOut()} className="hover:underline underline-offset-4 cursor-pointer">
						{/* <Link to="/forgot-password">Forgot Password</Link>
						log */}
						logout
					</p>
					<a href="/">
						<p>home</p>
					</a>
				</form>
			</div>
		</div>
	);
}

export default Login;
