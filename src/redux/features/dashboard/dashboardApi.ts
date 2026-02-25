import baseApi from "../api/baseApi";
import { ISuperAdminDashboardResponse } from "@/types/dashboard.types";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    superAdminSummary: build.query<
      { data: ISuperAdminDashboardResponse },
      void
    >({
      query: () => ({
        url: "/dashboard/super-admin-dashboard",
        method: "GET",
      }),
      providesTags: ["superAdminSummary"],
    }),

    adminSummary: build.query({
      query: () => ({
        url: "/dashboard/admin-dashboard",
        method: "GET",
      }),
      providesTags: ["adminSummary"],
    }),

    instructorSummary: build.query({
      query: () => ({
        url: "/dashboard/instructor-dashboard",
        method: "GET",
      }),
      providesTags: ["instructorSummary"],
    }),
  }),
});

export const { useSuperAdminSummaryQuery, useAdminSummaryQuery, useInstructorSummaryQuery } = dashboardApi;
