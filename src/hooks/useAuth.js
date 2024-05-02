import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../services/auth.service'; // Update the path as per your project structure
import { login } from '../features/userSlice';
import { useState } from 'react';

const useAuth = () => {
	const dispatch = useDispatch();

	const [authStatus, setAuthStatus] = useState(false);
	const [loading, setLoading] = useState(true);


	

	useEffect(() => {
		(async () => {
			const user = await authService.getCurrentUser();

			if (user) {
				dispatch(login(user));
				setAuthStatus(true);
				setLoading(false);
			}

			setAuthStatus(false);
			setLoading(false);
		})();
		// setLoading(false);
	}, []);

	return [authStatus, loading];
};

export default useAuth;
