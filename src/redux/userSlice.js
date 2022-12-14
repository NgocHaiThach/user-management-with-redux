import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addUser, deleteUser, getOneUser, getUser, getUserPagination, updateUser } from '../services/apiUsers';

export const fetchUsers = createAsyncThunk('users/fetchAllUsers', async () => {
	const response = await getUser();
	return response.data;
});

export const fetchUsersPagination = createAsyncThunk('users/fetchUsersPagination', async ({ limit, page }) => {
	console.log({ limit, page })
	const response = await getUserPagination({ limit, page });
	return response.data;
});

export const fetchOneUser = createAsyncThunk(
	'users/fetchOneUser',
	async (id) => {
		const response = await getOneUser(id);
		return response.data;
	});

export const addUserThunk = createAsyncThunk(
	'users/addUserThunk',
	async data => {
		const response = await addUser(data);
		return response.data;
	},
);

export const updateUserThunk = createAsyncThunk(
	'users/updateUserThunk',
	async data => {
		const response = await updateUser(data);
		return response.data;
	}
)

export const deleteUserThunk = createAsyncThunk(
	'users/deleteUserThunk',
	async id => {
		await deleteUser(id);
		return id;
	},
);
export const deleteMultipleUserThunk = createAsyncThunk(
	'users/deleteMultipleUserThunk',
	async arrayId => {
		const promises = await arrayId.map(async id => {
			await deleteUser(id);
	// 		  const promise = new Promise((resolve, reject) => {
    //   setTimeout(() => resolve(deleteUser(id)), 500)
    // });
	// 		return promise;
		})
		// const res = await Promise.all(promises);
		console.log(promises)
	
		// console.log(arrayId)
	},

);

const usersSlice = createSlice({
	name: 'users',
	initialState: {
		listUser: [],
		oneuser: null,
		count: 0,
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
			//fetch list users
			.addCase(fetchUsers.fulfilled, (state, action) => {
				const { items } = action.payload
				state.listUser = items;
			})
			.addCase(fetchUsers.rejected, (_, payload) => {
				console.log(payload);
			})

			//fetch list users pagination
			.addCase(fetchUsersPagination.fulfilled, (state, action) => {
				const { items, count } = action.payload
				state.listUser = items;
				state.count = count;
			})
			.addCase(fetchUsersPagination.rejected, (_, payload) => {
				console.log(payload);
			})

			//fetch one user
			.addCase(fetchOneUser.fulfilled, (state, action) => {
				state.oneuser = action.payload;
				state.isFetching = false;
			})
			.addCase(fetchOneUser.rejected, (_, payload) => {
				console(payload);
			})

			// add user
			.addCase(addUserThunk.fulfilled, (state, action) => {
				state.listUser = state.listUser.splice(0, 0, action.payload);
			})
			.addCase(addUserThunk.rejected, (_, payload) => {
				console.log(payload);
			})

			// update user
			.addCase(updateUserThunk.fulfilled, (state, action) => {
				const index = state.listUser.findIndex(
					user => user.id === action.payload.id,
				);
				if (index !== -1) {
					state.listUser[index] = action.payload;
				}
			})
			.addCase(updateUserThunk.rejected, (_, payload) => {
				console.log(payload);
			})

			//delete user
			.addCase(deleteUserThunk.fulfilled, (state, action) => {
				state.listUser = state.listUser.filter(
					user => user.id !== action.payload,
				);
			})
			.addCase(deleteUserThunk.rejected, (_, payload) => {
				console.log(payload);
			})
			//delete pagination user
			.addCase(deleteMultipleUserThunk.fulfilled, (state, action) => {
				// console.log(action.payload)
			})
			.addCase(deleteMultipleUserThunk.rejected, (_, payload) => {
				console.log(payload);
			});
	},
});

const { reducer } = usersSlice;

export default reducer;
