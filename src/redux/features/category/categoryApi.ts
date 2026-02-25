import baseApi from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (data: any) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["allCategories"],
    }),

    allCategories: build.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: ["allCategories"],
    }),

    updateCategory: build.mutation({
      query: ({ id, body }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["allCategories"],
    }),

    deleteCategory: build.mutation({
      query: (id: string) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["allCategories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useAllCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
