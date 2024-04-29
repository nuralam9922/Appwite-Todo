import { useState } from 'react';

const useRequest = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null); 

	const callRequest = async (callback, ...args) => {
		setLoading(true);
		setError(null); 
		try {
			const response = await callback(...args);
			return response;
		} catch (error) {
			setError(error.message); 
		} finally {
			setLoading(false);
		}
	};

	return [loading, error, callRequest];
};

export default useRequest;
