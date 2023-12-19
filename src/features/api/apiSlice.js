import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "https://job-box-server-rust.vercel.app" }),
    tagTypes: ['jobs'],
    endpoints: (builder) => ({})
})

export default apiSlice;