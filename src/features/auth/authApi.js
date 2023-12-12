import apiSlice from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                method: "POST",
                url: "/user",
                body: JSON.stringify(data),

            }),
            onSuccess: (result, { }) => {
                return result;
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url: "/user",
            }),
            onSuccess: (result, { dispatch, getState }) => {
                return result;
            }
        })


    })
})

export const { useRegisterMutation, useLoadUserQuery } = authApi;