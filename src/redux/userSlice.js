import { createSlice } from "@reduxjs/toolkit";
import { Fade } from "react-bootstrap";

const usersSlice = createSlice({
    name: 'users',
    initialState:{
        listUser: [],
        isFetching: false,
        error:false,
    },
    reducers: {
        getListUserStart: (state) => {
            state.isFetching= true;
            state.error= false;
        },

        getListUserSuccess: (state, action) => {
            state.isFetching= false;
            state.listUser= action.payload;
            state.error= false;
        },

        getListUserFailure: (state) => {
            state.isFetching =false;
            state.error= true;
        }
    }
})

const {reducer, actions} = usersSlice;
export const {getListUserStart, getListUserSuccess, getListUserFailure} = actions;
export default reducer;