import baseApi from "../api/baseApi";

const lessonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    courses: build.query({
      query: () => ({
        url: "/courses/draft",
        method: "GET",
      }),
      providesTags: ["allCourses"],
    }),

    createVideo: build.mutation({
        query: (data: any) => ({
            url: "/lessons/create-lesson",
            method: "POST",
            body: data,
        }),
        invalidatesTags: ["allVideos"],
    }),
    
  }),
});

export const {
  useCoursesQuery,
} = lessonApi;