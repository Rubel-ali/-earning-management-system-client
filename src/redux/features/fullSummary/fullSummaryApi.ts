import baseApi from "../api/baseApi";

const summaryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allSummary: build.query({
      query: () => ({
        url: `/dashboard`,
        method: "GET",
      }),
      providesTags: ["allSummary"],
    }),

    activityLog: build.query({
      query: () => ({
        url: `/activity-logs`,
        method: "GET",
      }),
      providesTags: ["activityLog"],
    }),
  }),
});

export const { 
    useAllSummaryQuery, 
    useActivityLogQuery 
} = summaryApi;
