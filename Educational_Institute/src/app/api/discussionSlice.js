import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const discussionSlice = createApi({
    reducerPath: 'discussionApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8800'}),
    tagTypes: ['Discussion'],
    endpoints: (builder) => ({
        getDiscussions: builder.query({
            query: () => ({
              url: '/discussion',
              method: "GET",
            })
        }),
        postDiscussions: builder.query({
            query: (details) => ({
              url: '/discussion',
              method: "POST",
              params: details,
            })
        }),
    })
})

export const {
    useGetDiscussionsQuery, usePostDiscussionsQuery
} = discussionSlice