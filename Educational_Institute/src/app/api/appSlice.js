//necessary imports for the endpoint making
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// export const restApi = createApi({
//     baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8800'}),
//     tagTypes: ['Institution'],
//     endpoints: builder => ({})
// })

//This function is used for creating the api for the frontend and utilizes various 
//options to allow frontend access data.
export const appSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8800'}),
    tagTypes: ['Institution'],
    endpoints: (builder) => ({
        getInstitutions: builder.query({
            query: () => '/institution',
        }),
        getInstitutionsOnFilter: builder.query({
            query: (filters) => ({
              url: "/institution",
              method: "GET",
              params: filters,
            }),
        }),
        getInstitutionsOnAdditionalFilter: builder.query({
            query: (filters) => ({
                url: '/institution',
                method: "GET",
                params: filters,
            }),
        }),
    })
})

//Exporting custom hook to be used in the frontend to gain data.
export const {
    useGetInstitutionsQuery, useGetInstitutionsOnFilterQuery, useGetInstitutionsOnAdditionalFilterQuery,
} = appSlice