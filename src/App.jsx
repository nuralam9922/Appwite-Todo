import React from 'react';
import { Navbar } from './components';

function App() {
	return (
		<>
			<Navbar />
			<main className=" container mx-auto poppins-regular">
				<div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded">
					<h1 className="text-3xl font-bold mb-6 text-left">Todo List</h1>
					<div className="flex mb-6">
						<input
							type="text"
							className="flex-grow border-b-2 border-gray-400 mr-4 py-2 px-4 focus:outline-none focus:border-blue-500"
							placeholder="Add a new todo..."
						/>
						<button className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600">Add</button>
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
