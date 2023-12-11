import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.init";

const initialState = {
    email: "",
    role: "",
    isLoading: true,
    isError: false,
    error: ""
}
// Create User
export const createUser = createAsyncThunk('auth/createUser', async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email;
})

// Login User with Email and Password.
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    console.log(data)
    return data.user.email;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.email = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        }).addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.email = action.payload;
            state.isError = false;
            state.error = ""
        }).addCase(createUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.payload
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.email = action.payload;
            state.isError = false;
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})
export const { logOut } = authSlice.actions;
export default authSlice.reducer;