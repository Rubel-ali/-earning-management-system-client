import baseApi from "./baseApi";

const eventApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllEvents: build.query({
            query: ({ page, limit, status }) => ({
                url: `/event/all?page=${page}&limit=${limit}&status=${status ? status : ""}`,
                method: "GET"
            }),
            providesTags: ["approveEvent"]
        }),
        approveEvent: build.mutation({
            query: ({id, event_status}) => ({
                url: `event/update-status/${id}`,
                method: "PUT",
                body: {event_status}
            }),
            invalidatesTags: ["approveEvent"]
        })
    })
})

export const { useApproveEventMutation, useGetAllEventsQuery } = eventApi

