import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authSlice = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8800'}),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        postLogin: builder.query({
            query: (credentials) => ({
              url: '/auth/login',
              method: "POST",
              params: credentials,
            })
        }),
    })
})

export const {
    usePostLoginQuery
} = authSlice