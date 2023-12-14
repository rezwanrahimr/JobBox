import apiSlice from "../api/apiSlice";

const jobPost = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addJob: builder.mutation({
            query: (jobData) => ({
                url: "/job",
                method: "POST",
                body: JSON.stringify(jobData),
            }),
            invalidatesTags: ["jobs"],
            onSuccess: (result) => {

                return result;
            }
        }),
        loadJobs: builder.query({
            query: () => ({
                url: "/job",
            }),
            providesTags: ["jobs"]
        }),
        singleJob: builder.mutation({
            query: (id) => ({
                url: `/job/${id}`
            })
        }),
        applyJob: builder.mutation({
            query: (applyData) => ({
                url: "/apply",
                method: "PATCH",
                body: applyData
            })
        })
    })
})

export const { useAddJobMutation, useLoadJobsQuery, useSingleJobMutation,useApplyJobMutation } = jobPost;