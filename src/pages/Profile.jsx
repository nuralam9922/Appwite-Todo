import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/userSlice';
import useRequest from '../hooks/useRequest';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import { useEffect } from 'react';

function Profile() {
	const [requestLoading, requestError, callRequest] = useRequest();
	const [profileRequestLoading, profileRequestError, callProfileRequest] = useRequest();

	const dispatch = useDispatch();
	const { user } = useSelector((states) => states.user);
	const navigate = useNavigate();
	const [profileImage, setProfileImage] = useState();
	const [localProfileImage, setLocalProfileImage] = useState(null);
	const handleLogout = async () => {
		callRequest(requestLogout);
	};

	const profileImageChangeRequest = async () => {
		return await userService.uploadProfilePicture(localProfileImage, user.$id);
	};

	useEffect(() => {
		(async () => {
			const response = await userService.getFilePreview(user.$id);
			setProfileImage(response);
			// console.log(response);
		})();
		return () => {};
	}, []);

	const handleSave = async () => {
		if (profileImage) {
			// Implement logic to upload profile image to the server
			console.log('Profile picture saved:', localProfileImage);
			const response = await callProfileRequest(profileImageChangeRequest);
			if (response) {
				const res = await userService.getFilePreview(user.$id);
				setProfileImage(res);
			}
		} else {
			console.log('No profile picture selected.');
		}
	};

	const requestLogout = async () => {
		await authService.logOut();
		dispatch(logout());
		navigate('/login');
	};

	const handleProfileImageChange = (e) => {
		const file = e.target.files[0];
		setLocalProfileImage(file);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen ">
			<div className="bg-white max-w-md w-80 shadow-md rounded-lg p-6 py-10 mb-6">
				<div className="flex items-center justify-center w-full">
					<div className="relative rounded-full overflow-hidden mb-4 size-52">
						<img
							src={
								profileImage 
								
							}
							alt="Profile"
							className="object-cover w-full h-full"
						/>

						<input
							id="profilePicture"
							type="file"
							accept="image/*"
							className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							onChange={handleProfileImageChange}
						/>
					</div>
				</div>
				<div className="flex items-center justify-center w-full mt-5">
					<button
						onClick={handleSave}
						// disabled={!profileImage}
						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline mr-2"
					>
						Save
					</button>
				</div>
			</div>
			<div className="text-gray-600 flex items-center gap-5 capitalize">
				<p>clcik here to log out</p>{' '}
				<p onClick={handleLogout} disabled={requestLoading} className="font-bold hover:underline cursor-pointer underline-offset-8">
					Logout
				</p>
			</div>
		</div>
	);
}

export default Profile;
