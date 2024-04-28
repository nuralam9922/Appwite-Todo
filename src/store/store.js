import { configureStore } from '@reduxjs/toolkit';
import { todoSlice, userSlice } from '../features';

export const store = configureStore({
	reducer: {
		todos: todoSlice,
		user: userSlice,
	},
});
