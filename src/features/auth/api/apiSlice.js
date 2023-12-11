import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_BASE_DEV_URL }),
    endpoints: (builder) => ({})
})

export default apiSlice;