import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import authSlice from "./slices/authSlice";
import usersSlice from "./slices/usersSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        users: usersSlice,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});
