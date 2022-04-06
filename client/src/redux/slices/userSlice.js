import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserData } from "../../api/auth";
axios.defaults.withCredentials = true;

let SERVER_URL = "http://localhost";
let PORT = 5000;

export const fetchAuthUser = () => {
    const path = "/api/accounts/userData";
    return async (dispatch, getState) => {
        const response = await axios.get(`${SERVER_URL}:${PORT}${path}`);
        localStorage.setItem("role_type", response.data.user.role_type);
        dispatch(fetchUser(response.data.user));
    };
};

const initialState = {};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchUser: (state = initialState, action) => {
            state.user = action.payload;
        },
    },
});

export const { fetchUser } = userSlice.actions;

export default userSlice.reducer;
