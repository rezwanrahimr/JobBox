import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const postJob = createAsyncThunk('job/post', async (jobData) => {
    const response = fetch("http://localhost:5000/job", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jobData)
    });
    const data = (await response).json()
    return data;
})


export const question = createAsyncThunk('job/question', async (questionData) => {
    const response = fetch("http://localhost:5000/question", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(questionData)
    });
    const data = (await response).json()
    return data;
})

export const getQuestion = createAsyncThunk('job/getQuestion', async () => {
    const response = await fetch("http://localhost:5000/question");
    const data = await response.json()
    return data;
})

const initialState = {
    isLoading: false,
    isSuccess: false
}
const jobSlice = createSlice({
    name: "jobSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(postJob.pending, (state, action) => {
            state.isLoading = true
        }).addCase(postJob.fulfilled, (state, action) => {
            state.isLoading = false,
                state.isSuccess = action.payload.acknowledged
        })
    }
})

export default jobSlice.reducer;