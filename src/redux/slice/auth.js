import { createSlice } from '@reduxjs/toolkit'
import { utils } from '../../common';

const initialState = {
  
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
            utils.callApi('api/register', registerObj, 'Registered')

        },
        login: (state, actions) => {
            const loginObj = {
                email: actions.payload.email,
                password: actions.payload.password,
            }
            //calling Api For Login
            utils.callApi('api/login', loginObj, 'login')
        },
        logout: (state) => {
            //calling Api For Logout
            utils.callApi('api/v1/logout', {}, 'logout')
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, registration } = authSlice.actions

export default authSlice.reducer