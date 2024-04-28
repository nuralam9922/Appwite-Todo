import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
};

const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		login: (state, action) => {
			// Update the state with the user information received from action.payload
			state.user = action.payload;
		},

		logout: (state) => {
			state.user = null;
		},
	},
});

// Export the login action
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
