import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import todoService from '../services/todo.service';

import useRequest from '../hooks/useRequest';
import toast from 'react-hot-toast';

function Todo() {
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const { user } = useSelector((state) => state.user);
	const [requestLoading, requestError, callRequest] = useRequest();

	const handleAdd = async () => {
		if (title === '' || description === '') {
			return;
		}
		console.log('calling');
		const response = await callRequest(request);
		toast.success('Todo added successfully!');
		setTitle('');
		setDescription('');
	};

	const request = async () => {
		return await todoService.createDocument(user.$id, title, description, false);
	};

	return (
		<div className="max-w-5xl mx-auto p-6 bg-white rounded ">
			<h1 className="text-3xl font-bold mb-6 text-left">Todo List</h1>
			<div className="flex flex-col space-y-4">
				<label className="">Title:</label>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					type="text"
					id="title"
					name="title"
					placeholder="Enter title..."
					className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
				/>

				<label className="">Description:</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					id="description"
					name="description"
					placeholder="Enter description..."
					className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 h-24 resize-none"
				></textarea>
				{requestError && <p className="text-red-500">{requestError}</p>}
				
				<button disabled={requestLoading} onClick={handleAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Add
				</button>
			</div>

		</div>
	);
}

export default Todo;
