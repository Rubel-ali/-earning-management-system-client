import baseApi from "../api/baseApi";

const appointmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allAppointments: build.query({
      query: () => ({
        url: `/appointments`,
        method: "GET",
      }),
      providesTags: ["allAppointments"],
    }),

    createAppointment: build.mutation({
      query: (data) => ({
        url: `/appointments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allAppointments"],
    }),

    deleteAppointment: build.mutation({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allAppointments"],
    }),
    updateAppointment: build.mutation({
      query: ({ id, data }) => ({
        url: `/appointments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["allAppointments"],
    }),
  }),
});

export const {
  useAllAppointmentsQuery,
  useCreateAppointmentMutation,
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
} = appointmentApi;
