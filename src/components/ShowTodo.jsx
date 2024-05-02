import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import useRequest from '../hooks/useRequest';
import todoService from '../services/todo.service';

function ShowTodo() {
	const [todos, setTodos] = useState([]);
	const [reload, setReload] = useState(false);
	const [filter, setFilter] = useState('all');
	const [contentEditable, setContentEditable] = useState(false);
	const { user } = useSelector((state) => state.user);
	const [requestLoading, requestError, callRequest] = useRequest();
	const [selectDocument, setSelectDocument] = useState();

	const [filteredData, setFilteredData] = useState([]);

	const request = async () => {
		return await todoService.getTodos(user.$id);
	};

	useEffect(() => {
		const fetchTodos = async () => {
			const response = await callRequest(request);
			setTodos(response?.documents || []);
			setFilteredData(response?.documents || []);
		};
		fetchTodos();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await request();
			setTodos(response?.documents || []);
			setFilteredData(response?.documents || []);
		})();
	}, [reload]);

	// setFilteredData(todos);
	const handelCompleteTask = async (documentId, taskStatus) => {
		// console.log(taskStatus);
		const response = await todoService.updateIsCompleted(documentId, taskStatus);
		if (response?.$collectionId) {
			setReload((prev) => !prev);
			toast.success('Todo status updated successfully!');
		}
	};

	const handleFilterChange = (e) => {
		const value = e.target.value;
		setFilter(e.target.value);
		// console.log(e.target.value);

		if (value === 'pending') {
			setFilteredData(todos.filter((todo) => !todo.isCompleted));
		} else if (value === 'completed') {
			setFilteredData(todos.filter((todo) => todo.isCompleted));
		} else {
			setFilteredData(todos);
		}
	};

	const handleDelete = async (documentId) => {
		const response = await todoService.deleteDocument(documentId);
		if (!response.message) {
			setReload((prev) => !prev);
			toast.success('Todo deleted successfully!');
		}
	};

	return (
		<div className="w-full mt-10 relative h-[50rem]">
			<h2 className="text-gray-900 text-2xl mb-4">Your Tasks</h2>
			<div className="flex justify-end mb-4 sticky top-0 left-0">
				<label className="mr-2">Filter:</label>
				<select
					value={filter}
					onChange={handleFilterChange}
					className="border border-gray-300 rounded-md p-1 focus:outline-none focus:border-blue-500"
				>
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="pending">Pending</option>
				</select>
			</div>
			{requestLoading ? (
				<div className="bg-gray-200 animate-pulse rounded shadow mb-4 p-4">
					<div className="w-3/4 h-8 bg-gray-300 rounded mb-2"></div>
					<div className="h-4 bg-gray-300 rounded mb-2"></div>
					<div className="flex justify-between items-center mt-2">
						<div className="flex items-center justify-center space-x-3">
							<div className="w-16 h-8 bg-gray-300 rounded"></div>
							<div className="w-8 h-8 bg-gray-300 rounded"></div>
						</div>
					</div>
				</div>
			) : (
				<div className="">
					{todos.length === 0 ? (
						<p className="text-gray-700">No tasks {filter !== 'all' ? `are ${filter}` : ''}.</p>
					) : filteredData.length !== 0 ? (
						filteredData.map((todo) => (
							<div
								key={todo.$id}
								style={{ backgroundColor: todo.isCompleted ? '#93e9be' : '' }}
								className="bg-white flex duration-200 items-start justify-between rounded shadow mb-4 p-4"
							>
								<div className="w-[75%] duration-300">
									<h3 className={`text-lg font-semibold mb-2 `}>{todo.title}</h3>
									<p className={`text-gray-700 text-justify `}>{todo.description}</p>
								</div>
								<div className="flex justify-between items-center mt-2">
									<div className="flex items-center justify-center gap-3">
										<button onClick={() => handleDelete(todo.$id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
											Delete
										</button>
										<div>
											<input
												onChange={() => handelCompleteTask(todo.$id, todo.isCompleted ? false : true)}
												type="checkbox"
												defaultChecked={todo.isCompleted}
												className="form-checkbox h-5 w-5 text-indigo-600"
											/>
										</div>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-gray-700 text-center text-3xl capitalize">no data available</div>
					)}
				</div>
			)}
		</div>
	);
}

export default ShowTodo;
