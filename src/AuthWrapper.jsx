import React from 'react';
import App from './App';
import useAuth from './hooks/useAuth';
import { Login } from './pages';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

function AuthWrapper() {
	const [authStatus, loading] = useAuth();
	const { user } = useSelector((state) => state.user);

	const auth = user !== null;

	if (loading) {
		return (
			<div className="flex  justify-center items-center h-screen poppins-regular">
				<div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	return auth || authStatus ? <App /> : <Login />;
}
export default AuthWrapper;
