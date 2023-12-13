import apiSlice from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit"
import jobSlice from "../features/job/jobSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
        job:jobSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;