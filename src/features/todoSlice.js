import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	todos: [],
};

const todoSlice = createSlice({
	name: 'todoSlice',
	initialState,
	reducers: {},
});

export default todoSlice.reducer;
