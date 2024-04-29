import React from 'react';

const NotFoundPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 text-center">
				<div>
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">Oops! Page not found</h2>
					<p className="mt-2 text-sm text-gray-500">The page you are looking for might have been removed or doesn't exist.</p>
				</div>
				<div>
					<a href="/" className="text-indigo-600 hover:text-indigo-500">
						Go back to the homepage
					</a>
				</div>
			</div>
		</div>
	);
};

export default NotFoundPage;
