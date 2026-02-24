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
  }),
});

export const { useSuperAdminSummaryQuery } = dashboardApi;