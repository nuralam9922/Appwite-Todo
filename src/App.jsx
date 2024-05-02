import React from 'react';
import { Navbar } from './components';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import FallBackUi from './components/FallBackUi';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<>
			<Navbar />
			<main className=" container mx-auto poppins-regular overflow-x-hidden">
				<Suspense fallback={<FallBackUi transparent={false} />}>
					<Outlet />
					<Toaster position="top-right" reverseOrder={false} />
				</Suspense>
			</main>
		</>
	);
}

export default App;
