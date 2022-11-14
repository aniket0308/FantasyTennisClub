import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit'
import { utils } from '../../common';

const initialState = {
    isLoading:false
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        editProfile: async (state, actions) => {
            const editProfileObj = {
                name: actions.payload.fullName,
                mobile_number: actions.payload.mobileNumber,
                token: await AsyncStorage.getItem('@Token'),
                navigation: actions.payload.navigation
            }
            //calling Api For Update Profile
            utils.callApi('api/v1/edit-profile', editProfileObj, 'editProfile', actions.payload.dispatch)
        },
        isLoaderVisibleProfile: (state, actions) => {
            state.isLoading = true
            return state
        },
        isLoaderNotVisibleProfile: (state, actions) => {
            state.isLoading = false
            return state
        },
        changePassword: async (state, actions) => {
            const changePasswordObj = {
                old_password: actions.payload.oldPassword,
                new_password: actions.payload.newPassword,
                confirm_new_password: actions.payload.confirmPassword,
                navigation: actions.payload.navigation,
                clearData:actions.payload.clearData,
                token: await AsyncStorage.getItem('@Token'),
            }
            //calling Api For Update changePassword
            utils.callApi('api/v1/change-password', changePasswordObj, 'changePassword', actions.payload.dispatch)
        },
        sendInquiry: async (state, actions) => {
            const sendInquiryObj = {
                subject:actions.payload.subject,
                message:actions.payload.text,
                navigation: actions.payload.navigation,
                clearAllData:actions.payload.clearAllData,
                token: await AsyncStorage.getItem('@Token'),
            }
            //calling Api For sending Inquiry
            utils.callApi('api/v1/inquiry', sendInquiryObj, 'inquiry', actions.payload.dispatch)
        }
    },
})

// Action creators are generated for each case reducer function
export const { editProfile, changePassword,isLoaderVisibleProfile,isLoaderNotVisibleProfile,sendInquiry } = profileSlice.actions

export default profileSlice.reducer