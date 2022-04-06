import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
axios.defaults.withCredentials = true;

let SERVER_URL = "http://localhost";
let PORT = 5000;

export const fetchUsersList = () => {
    const path = "/api/accounts/get-users";
    return async (dispatch, getState) => {
        const response = await axios.get(`${SERVER_URL}:${PORT}${path}`);
        dispatch(fetchUsers(response.data.users));
    };
};

const initialState = [];

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
    },
    reducers: {
        fetchUsers: (state = initialState, action) => {
            state.users = action.payload;
        },
    },
});

export default usersSlice.reducer;

export const { fetchUsers } = usersSlice.actions;
