import apiSlice from "../features/auth/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;