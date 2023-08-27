//necessary imports for the endpoint making
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//This function is used for creating the api for the frontend and utilizes various 
//options to allow frontend access data.
export const adminSlice = createApi({
    reducerPath: 'admin',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8800'}),
    tagTypes: ['Admin'],
    endpoints: (builder) => ({
        postCollegeNew: builder.query({
            query: (details) => ({
              url: '/admin/new/college',
              method: "POST",
              params: details,
            })
        }),
        postSchoolNew: builder.query({
            query: (details) => ({
              url: '/admin/new/school',
              method: "POST",
              params: details,
            })
        }),
        postConsultancyNew: builder.query({
            query: (details) => ({
              url: '/admin/new/consultancy',
              method: "POST",
              params: details,
            })
        }),
        deletePostAdmin: builder.query({
            query: (details) => ({
              url: '/admin/delete',
              method: "DELETE",
              params: details,
            })
        }),
        getAdminShowList: builder.query({
          query: (details) => ({
            url: '/admin',
            method: "GET",
            params: details,
          })  
        }),
        editPostInstitution: builder.query({
          query: ({institution,delayedData}) => ({
              url: `/admin/edit/institution/${institution}`,
              method: "POST",
              params: delayedData,
          })
        }),
        editPostSchool: builder.query({
          query: ({institution,delayedData}) => ({
              url: `/admin/edit/school/${institution}`,
              method: "POST",
              params: delayedData,
          })
        }),
        editPostCollege: builder.query({
          query: ({institution,delayedData}) => ({
              url: `/admin/edit/college/${institution}`,
              method: "POST",
              params: delayedData,
            }),
        })
    })
})

//Exporting custom hook to be used in the frontend to gain data.
export const {
    usePostCollegeNewQuery,
    usePostSchoolNewQuery,
    usePostConsultancyNewQuery,
    useGetAdminShowListQuery,
    useDeletePostAdminQuery,
    useEditPostCollegeQuery,
    useEditPostInstitutionQuery,
    useEditPostSchoolQuery
} = adminSlice