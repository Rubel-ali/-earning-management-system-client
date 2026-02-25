import baseApi from "../api/baseApi";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createVideo: build.mutation({
      query: ({ courseId, formData }) => ({
        url: `/videos/${courseId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["allVideos", "singleCourse"],
    }),

    allVideos: build.query({
      query: () => `/videos`,
      providesTags: ["allVideos"],
    }),

    deleteVideo: build.mutation({
      query: (id: string) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allVideos"],
    }),
  }),
});

export const {
  useCreateVideoMutation,
  useAllVideosQuery,
  useDeleteVideoMutation,
} = lessonApi;
