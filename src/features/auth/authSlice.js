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

// Employee Register
export const employeeRegister = createAsyncThunk('auth/createEmployee', async (employeeData) => {
    const response = fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employeeData)
    });
    const data = (await response).json()
    return data;
})

export const candidateRegister = createAsyncThunk('auth/createCandidate', async (candidateData) => {
    const response = fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(candidateData)
    });
    const data = (await response).json()
    return data;
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
        }).addCase(employeeRegister.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        }).addCase(employeeRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = ""
        }).addCase(employeeRegister.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        }).addCase(candidateRegister.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
            state.error = ""
        }).addCase(candidateRegister.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = ""
        }).addCase(candidateRegister.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
    }
})
export const { logOut, setUser, updateRole } = authSlice.actions;
export default authSlice.reducer;