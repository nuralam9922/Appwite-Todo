import React, { useState } from 'react';

const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		// Logic for handling login
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		// Logic for handling logout
		setIsLoggedIn(false);
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
					{isLoggedIn ? (
						<li className="mr-4 mb-2 md:mb-0">
							<button onClick={handleLogout}>Logout</button>
						</li>
					) : (
						<li className="mr-4 mb-2 md:mb-0">
							<button onClick={handleLogin}>Login</button>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
