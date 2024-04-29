import React from 'react';
import { Navbar } from './components';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import FallBackUi from './components/FallBackUi';

function App() {
	return (
		<>
			<Navbar />
			<main className=" container mx-auto poppins-regular">
				<Suspense fallback={<FallBackUi transparent={false}/>}>
					<Outlet />
				</Suspense>
			</main>
		</>
	);
}

export default App;
