import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.init";

const initialState = {
    email: "",
    role: "",
    isLoading: false,
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
    return data.user.email;
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.email = ""
        },
        setUser: (state, { payload }) => {
            state.email = payload
        },
        updateRole: (state, { payload }) => {
            state.role = payload
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
            state.error = action.error.message;
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
            state.error = action.error.message;
        })
    }
})
export const { logOut, setUser, updateRole } = authSlice.actions;
export default authSlice.reducer;