import baseApi from "../api/baseApi";

const queueApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allQueue: build.query({
      query: () => ({
        url: `/queue`,
        method: "GET",
      }),
      providesTags: ["allQueue"],
    }),

    assignStaff: build.mutation({
      query: (data) => ({
        url: `/queue/assign`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["allQueue"],
    }),
  }),
});

export const { 
    useAllQueueQuery, 
    useAssignStaffMutation
} = queueApi;
