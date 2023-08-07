//necessary imports for the endpoint making
import { configureStore } from "@reduxjs/toolkit";
import { appSlice} from "./api/appSlice";

//This is the code to create and export the default function for th store of the api fetched data.
//Here rtk defined middleware and more things
export const store = configureStore({
    reducer: {
        [appSlice.reducerPath] : appSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(appSlice.middleware),
    devTools: true
})