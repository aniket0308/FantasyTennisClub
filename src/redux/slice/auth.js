import { createSlice } from '@reduxjs/toolkit'
import { utils } from '../../common';

const initialState = {
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registration: (state, actions) => {
            const registerObj = {
                name: actions.payload.fullName,
                email: actions.payload.email,
                mobile_number: actions.payload.mobileNumber,
                password: actions.payload.password,
                confirm_password: actions.payload.confirmPassword,
                referral: actions.payload.referral
            }
            //calling Api For Login
            utils.callApi('api/register', registerObj, 'Registered', actions.payload.dispatch)

        },
        login: (state, actions) => {
            const loginObj = {
                email: actions.payload.email,
                password: actions.payload.password,
            }
            //calling Api For Login
            utils.callApi('api/login', loginObj, 'login', actions?.payload?.dispatch)
        },
        isLoaderVisible: (state, actions) => {
            state.isLoading = true
            return state
        },
        isLoaderNotVisible: (state, actions) => {
            state.isLoading = false
            return state
        },
        logout: (state, actions) => {
            //calling Api For Logout
            utils.callApi('api/v1/logout', {}, 'logout', actions?.payload?.dispatch)
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, registration, isLoaderVisible, isLoaderNotVisible } = authSlice.actions

export default authSlice.reducer