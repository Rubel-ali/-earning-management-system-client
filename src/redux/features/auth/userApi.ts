/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserResponse } from "@/types/user.types";
import baseApi from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data: any) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["logIn"],
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    allUsers: build.query<{ data: IUserResponse }, void>({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["allUsers"],
    }),

    deleteUser: build.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allUsers"],
    }),

    registerUser: build.mutation({
      query: (data: any) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),

    // allUsers: build.query({
    //   query: () => ({
    //     url: `/users`,
    //     method: "GET",
    //   }),
    //   providesTags: ["allUsers"],
    // }),

    userStatusUpdate: build.mutation({
      query: ({ id, body }) => ({
        // Changed from 'data' to 'body' to match your usage
        url: `/users/user-status/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "userStatus", id: arg.id },
        "allUsers",
      ],
    }),

    sendOtp: build.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
    }),

    getMe: build.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),

    verifyOtp: build.mutation({
      query: (data: { email: string; otp: number }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: build.mutation({
      query: (data: { password: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    updateUser: build.mutation({
      query: (formData) => ({
        url: `/users/profile`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,
  useDeleteUserMutation,
  useRegisterUserMutation,
  useAllUsersQuery,
  useUserStatusUpdateMutation,
  useGetMeQuery,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateUserMutation,
} = userApi;
