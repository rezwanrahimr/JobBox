import apiSlice from "../api/apiSlice";

const jobPost = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addJob: builder.mutation({
            query: (jobData) => ({
                url: "/job",
                method: "POST",
                body: JSON.stringify(jobData),
            }),
            onSuccess: (result) => {
                return result;
            }
        }),
        loadJobs: builder.query({
            query: () => ({
                url: "/job",
            })
        }),
        singleJob: builder.mutation({
            query: (id) => ({
                url: `/job/${id}`
            })
        })
    })
})

export const { useAddJobMutation, useLoadJobsQuery,useSingleJobMutation} = jobPost;