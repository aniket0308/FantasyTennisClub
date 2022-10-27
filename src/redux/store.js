import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import profileReducer from "./slice/profile";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile:profileReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
   })
})
