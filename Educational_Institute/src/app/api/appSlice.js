import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const restApi = createApi({
//     baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8800'}),
//     tagTypes: ['Institution'],
//     endpoints: builder => ({})
// })

export const appSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8800'}),
    tagTypes: ['Institution'],
    endpoints: (builder) => ({
        getInstitutions: builder.query({
            query: () => '/institution',
        })
    })
})

export const {
    useGetInstitutionsQuery
} = appSlice