import { createSlice } from "@reduxjs/toolkit";

/**
 * TODO: THIS IS A TEMPORARY MEASURE TO ENSURE DEVELOPMENT OF WAREHOUSE DESIGNER TOOL FOR MANAGEMENT
 * TODO: EXPAND THIS FOR THE WHOLE USER OBJECT
 * @type {{role_type: string}}
 */
const initialState = {
    role_type: "Management"
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
