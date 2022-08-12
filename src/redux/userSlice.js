import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteUser, getUser } from '../services/getListUser';

export const fetchUsers = createAsyncThunk('users/fetchAllUsers', async () => {
	const response = await getUser();
	return response.data;
});

export const deleteUserThunk = createAsyncThunk(
	'users/deleteUserThunk',
	async id => {
		await deleteUser(id);
		return id;
	},
);

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		listUser: [],
		isFetching: false,
	},
	reducers: {
		deleteUser: (state, action) => {
			state.listUser = state.listUser.filter(
				user => user.id !== action.payload,
			);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.listUser = action.payload;
			})
			.addCase(fetchUsers.rejected, (_, payload) => {
				console.log(payload);
			})

			.addCase(deleteUserThunk.fulfilled, (state, action) => {
				state.listUser = state.listUser.filter(
					user => user.id !== action.payload,
				);
			})
			.addCase(deleteUserThunk.rejected, (_, payload) => {
				console.log(payload);
			});
	},
});

const { reducer, actions } = usersSlice;

export default reducer;
