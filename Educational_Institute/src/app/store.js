//necessary imports for the endpoint making
import { configureStore } from "@reduxjs/toolkit";
import { appSlice} from "./api/appSlice";
import { comparisonSlice } from "./api/comparisonSlice";
import { authSlice } from "../auth/authSlice"
import { discussionSlice } from "./api/discussionSlice";
import { adminSlice } from "./api/adminSlice"

//This is the code to create and export the default function for th store of the api fetched data.
//Here rtk defined middleware and more things
export const store = configureStore({
    reducer: {
        [appSlice.reducerPath] : appSlice.reducer,
        [comparisonSlice.reducerPath] : comparisonSlice.reducer,
        [authSlice.reducerPath] : authSlice.reducer,
        [discussionSlice.reducerPath] : discussionSlice.reducer,
        [adminSlice.reducerPath] : adminSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(appSlice.middleware)
    .concat(comparisonSlice.middleware)
    .concat(authSlice.middleware).concat(discussionSlice.middleware)
    .concat(adminSlice.middleware),
    devTools: true
})