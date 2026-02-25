import baseApi from "../api/baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    courses: build.query({
      query: () => ({
        url: "/courses/draft",
        method: "GET",
      }),
      providesTags: ["allCourses"],
    }),

    allPubsishedCourses: build.query({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      providesTags: ["allCourses"],
    }),

    singleCourse: build.query({
      query: (id: string) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
      providesTags: ["singleCourse"],
    }),

    createCourse: build.mutation({
      query: (data: any) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allCourses"],
    }),

    categories: build.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["allCategories"],
    }),

    deleteCourse: build.mutation({
      query: (id: string) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allCourses"],
    }),

    updateCourse: build.mutation({
      query: ({ id, body }) => ({
        url: `/courses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["allCourses", "singleCourse"],
    }),

    updateStatus: build.mutation({
      query: ({ id, body }) => ({
        url: `/courses/status/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["allCourses", "singleCourse"],
    }),

    myPurchasedCourses: build.query({
      query: () => ({
        url: "/courses/my-purchased",
        method: "GET",
      }),
      providesTags: ["myCourses"],
    }),

    topReviewedCourses: build.query({
      query: () => ({
        url: "/courses/top-reviewed",
        method: "GET",
      }),
      providesTags: ["topCourses"],
    }),

    studentProgress: build.query({
      query: () => ({
        url: "/courses/student-progress",
        method: "GET",
      }),
      providesTags: ["progress"],
    }),

    studentAnalytics: build.query({
      query: () => ({
        url: "/dashboard/student-analytics",
        method: "GET",
      }),
      providesTags: ["progress"],
    }),

    buyCourse: build.mutation({
      query: (body) => ({
        url: `/courses/buy`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["myCourses"],
    }),
  }),
});

export const {
  useCoursesQuery,
  useAllPubsishedCoursesQuery,
  useSingleCourseQuery,
  useUpdateStatusMutation,
  useCreateCourseMutation,
  useCategoriesQuery,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
  useMyPurchasedCoursesQuery,
  useTopReviewedCoursesQuery,
  useStudentProgressQuery,
  useStudentAnalyticsQuery,
  useBuyCourseMutation,
} = courseApi;
