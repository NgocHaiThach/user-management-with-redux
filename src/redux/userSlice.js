import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Fade } from "react-bootstrap";
import { getUser } from "../uitls/callApi";

export const fetchUsers = createAsyncThunk(
    'users/fetchAllUsers', async () => {
        const response = await getUser();
        return response.data
    }
)



const usersSlice = createSlice({

    name: 'users',
    initialState: {
        listUser: [],
        isFetching: false,
        count: 0,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.listUser = action.payload
            })
            .addCase(fetchUsers.rejected, (_, payload) => {
                console.log(payload)
            })
    },
})

const { reducer, actions } = usersSlice;
export const { getListUserStart, getListUserSuccess, getListUserFailure } = actions;
export default reducer;