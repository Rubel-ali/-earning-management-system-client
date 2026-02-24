import baseApi from "../api/baseApi";

const staffApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allStaff: build.query({
      query: () => ({
        url: `/staff`,
        method: "GET",
      }),
      providesTags: ["allStaff"],
    }),

    createStaff: build.mutation({
      query: (data) => ({
        url: `/staff`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allStaff"],
    }),

    deleteStaff: build.mutation({
      query: (id) => ({
        url: `/staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allStaff"],
    }),

    updateStaff: build.mutation({
      query: ({ id, data }) => ({
        url: `/staff/${id}`,  
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["allStaff"],
    }),

    staffStatusUpdate: build.mutation({
      query: ({ id, data }) => ({
        url: `/staff/status/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["allStaff"],
    }),
  }),
});

export const { 
    useAllStaffQuery, 
    useCreateStaffMutation,
    useDeleteStaffMutation,
    useUpdateStaffMutation,
    useStaffStatusUpdateMutation
} = staffApi;
