// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// import { appSlice } from "../../app/api/appSlice";

// const institutionsAdapter = createEntityAdapter({})
// const initialState = institutionsAdapter.getInitialState()

// export const restInstitutionApi = appSlice.injectEndpoints({
//     endpoints: builder => ({
//         getInstitutions: builder.query({
//             query: () => '/institution',
//             validateStatus: (response,result) => {
//                 return response.status === 200 && !result.isError
//             },
//             transformResponse: responseData => {
//                 const loadedInstitutions = responseData.map(institution => {
//                     institution.id = institution._id
//                     return institution
//                 });
                

//                 return institutionsAdapter.setAll(initialState, loadedInstitutions)
//             },
//             providesTags: (result, error, arg) => {
//                 if(result?.ids) {
//                     return [
//                         {type: 'Institution', id: 'LIST'},
//                         ...result.ids.map(id => ({type: 'Institution', id}))
//                     ]
//                 } else return [
//                     {type: 'Institution', id: 'LIST'}
//                 ]
//             }
//         }),
//     }),
// })

// export const{
//     useGetInstitutionsQuery,
// } = restInstitutionApi

// export const selectInstitutionsResult = restInstitutionApi.endpoints.getInstitutions.select();

// const selectInstitutionData = createSelector(
//     selectInstitutionsResult,
//     institutionsResult => institutionsResult.data
// )

// export const {
//     selectAll: selectAllInstitutions,
//     selectById: selectInstitutionById,
//     selectIds: selecInstitutionIds
// } = institutionsAdapter.getSelectors(state => selectInstitutionData(state) ?? initialState)

