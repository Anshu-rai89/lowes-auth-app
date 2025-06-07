import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const login = createAsyncThunk("auth/login", async ({userName, password})=> {

    const res = await axios('https://dummyjson.com/auth/login', {
        method: "POST",
        data: { username: userName, password, expiresInMins : 30}
    })

    return res.data;
})

const user = localStorage.getItem("auth-user") || "{}";

const authSlice = createSlice({
    name:"auth",
    initialState: {
        error: null,
        user: JSON.parse(user)
    },
    reducers: {
       logout: (state, action) => {
            state.user = {};
            localStorage.clear("auth-user")
       }
    },
    extraReducers: (builder => {
        builder.addCase(login.fulfilled , (state, action) => {
            console.log("API response", action.payload)
            state.user = action.payload;
            localStorage.setItem("auth-user", JSON.stringify(action.payload))

        }).addCase(login.rejected, (state, action) => {
            state.error = action.payload;
        })
    })
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;

