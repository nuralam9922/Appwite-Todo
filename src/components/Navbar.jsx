import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from '../services/user.service';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
	const { user } = useSelector((state) => state.user);
	const [profileImage, setProfileImage] = useState(null);

		useEffect(() => {
			(async () => {
				const response = await userService.getFilePreview(user.$id);
				setProfileImage(response);
				// console.log(response);
			})();
			return () => {};
		}, []);

	const handleLogin = () => {};

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

					<Link to={'/tasks'}>
						<li className="mr-4 mb-2 md:mb-0">Tasks</li>
					</Link>
					<Link to={'/profile'}>
						<li className="mr-4 mb-2 md:mb-0 size-10 bg-slate-500 rounded-full">
							<img className="w-10 h-10 rounded-full" src={profileImage  || 'https://via.placeholder.com/150'} alt="" />
						</li>
					</Link>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
