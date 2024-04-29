import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import useRequest from '../hooks/useRequest';

const Navbar = () => {
	const { user } = useSelector((states) => states.user);
	const dispatch = useDispatch();
	const [requestLoading, requestError, callRequest] = useRequest();

	const navigate = useNavigate();

	const handleLogin = () => {};

	const handleLogout = async () => {
		callRequest(request);
	};

	const request = async () => {
		await authService.logOut();
		dispatch(logout());
		navigate('/login');
	};

	return (
		<nav className="bg-gray-800 text-white py-4 px-5 font poppins-regular">
			<div className="container mx-auto flex flex-wrap justify-between items-center">
				<div className="flex items-center">
					<h1 className="text-lg font-bold mr-4">Todo App</h1>
				</div>
				<ul className="flex flex-wrap items-center justify-center">
					<li className="mr-4 mb-2 md:mb-0">
						<Link to="/" className="hover:underline">
							Home
						</Link>
					</li>

					<li onClick={handleLogout} className="mr-4 mb-2 md:mb-0">
						logout
					</li>
					<Link to={'/profile'}>
						<li className="mr-4 mb-2 md:mb-0 size-10 bg-slate-500 rounded-full">
							<img className="w-10 h-10 rounded-full" src={user?.profileUrl || 'https://via.placeholder.com/150'} alt="" />
						</li>
					</Link>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
