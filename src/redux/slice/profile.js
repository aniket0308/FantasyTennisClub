import { createSlice } from '@reduxjs/toolkit'
import { utils } from '../../common';

const initialState = {
  
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        editProfile: (state, actions) => {
            const registerObj = {
                name: actions.payload.fullName,
                email: actions.payload.email,
                mobile_number: actions.payload.mobileNumber,
                password: actions.payload.password,
                confirm_password: actions.payload.confirmPassword,
                referral: actions.payload.referral
            }
            //calling Api For Update Profile
            utils.callApi('api/register', registerObj, 'Registered')
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, registration } = profileSlice.actions

export default profileSlice.reducer