import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import profileReducer from "./slice/profile";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile:profileReducer
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
   })
})
