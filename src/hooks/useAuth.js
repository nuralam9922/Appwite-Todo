import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../services/auth.service'; // Update the path as per your project structure
import { useNavigate } from 'react-router-dom';
import { login } from '../features/userSlice';
import { useState } from 'react';

const useAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [authStatus, setAuthStatus] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const user = await authService.getCurrentUser();
				if (user) {
					dispatch(login(user));
					setLoading(false);
					setAuthStatus(true);
				}
			} catch (error) {
				// setLoading(false);
				setAuthStatus(false);
				setLoading(false);

				console.log('Error getting user in useAuth:', error);
			}
		})();
	}, []);

	return [authStatus, loading];
};

export default useAuth;
