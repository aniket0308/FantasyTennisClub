import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit'
import { utils } from '../../common';

const initialState = {

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
                navigation:actions.payload.navigation
            }
            //calling Api For Update Profile
            utils.callApi('api/v1/edit-profile', editProfileObj, 'editProfile')
        },
    },
})

// Action creators are generated for each case reducer function
export const { editProfile } = profileSlice.actions

export default profileSlice.reducer