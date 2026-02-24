import baseApi from "../api/baseApi";

const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allServices: build.query({
      query: () => ({
        url: `/services`,
        method: "GET",
      }),
      providesTags: ["allServices"],
    }),

    createService: build.mutation({
      query: (data) => ({
        url: `/services`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allServices"],
    }),

    deleteService: build.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allServices"],
    }),
    updateService: build.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["allServices"],
    }),
  }),
});

export const {
  useAllServicesQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = servicesApi;
