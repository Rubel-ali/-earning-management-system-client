import baseApi from "./baseApi";

const complains = baseApi.injectEndpoints({
    endpoints: (build) => ({
        userComplain: build.query({
            query: ({ lang, role }) => ({
                url: `complain/all?language=${lang}&role=${role}`,
                method: 'GET'
            }),
            providesTags: ["complains"]
        }),
        updateComplain: build.mutation({
            query: (id) => {
                return {
                    url: `/complain/status/${id}`,
                    method: 'PUT',
                    body: {
                        status: "INPROGRESS"
                    }
                }
            },
            invalidatesTags: ["complains"]
        })

    }
    )
})

export const { useUserComplainQuery, useUpdateComplainMutation } = complains