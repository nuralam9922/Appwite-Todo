import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
	const { user } = useSelector((states) => states.user);
	const dispatch = useDispatch();
	const handleLogin = () => {};

	const navigate = useNavigate('/');
	
	const handleLogout = async () => {
		const response = await authService.logOut();
		dispatch(logout());
		navigate('/login');
	};

	return (
		<nav className="bg-gray-800 text-white py-4 px-5">
			<div className="container mx-auto flex flex-wrap justify-between items-center">
				<div className="flex items-center">
					<h1 className="text-lg font-bold mr-4">My Website</h1>
				</div>
				<ul className="flex flex-wrap">
					<li className="mr-4 mb-2 md:mb-0">
						<a href="/" className="hover:underline">
							Home
						</a>
					</li>
					{user ? (
						<li className="mr-4 mb-2 md:mb-0">
							<button onClick={handleLogout}>Logout</button>
						</li>
					) : (
						<Link to={'/login'}>
							<li className="mr-4 mb-2 md:mb-0">
								<button>Login</button>
							</li>
						</Link>
					)}

					<li className=" mb-2 md:mb-0">{user && user.name}</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
