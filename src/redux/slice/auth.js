import AsyncStorage from '@react-native-async-storage/async-storage';
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
                referral: actions.payload.referral,
                navigation: actions.payload.navigation,
                device_token: actions.payload.deviceToken,
                platform: actions.payload.platform
            }
            //calling Api For Login
            utils.callApi('api/register', registerObj, 'Registered', actions.payload.dispatch)

        },
        login: (state, actions) => {
            console.log('What Is Device Token', actions.payload.deviceToken);
            const loginObj = {
                email: actions.payload.email,
                password: actions.payload.password,
                device_token: actions.payload.deviceToken,
                platform: actions.payload.platform
            }
            //calling Api For Login
            utils.callApi('api/login', loginObj, 'login', actions?.payload?.dispatch)
        },
        joinPrivateGroup: async (state, actions) => {
            const privateGroupObj = {
                group_name: actions.payload.groupFullName,
                clearAllData: actions.payload.clearAllData,
                token: await AsyncStorage.getItem('@Token'),
            }
            //calling Api For Joining Private Group
            utils.callApi('api/v1/private-group/join-private-group', privateGroupObj, 'privateGroup', actions.payload.dispatch)
        },
        oganizePrivateGroup: async (state, actions) => {
            const organizePrivateGroupObj = {
                admin_name: actions.payload.fullName,
                admin_email: actions.payload.groupEmail,
                admin_mobile_number: actions.payload.groupContact,
                tournament_id: actions.payload.groupEvents,
                number_of_participants: actions.payload.groupParticipant,
                clearAllData: actions.payload.clearAllData,
                token: await AsyncStorage.getItem('@Token'),
            }
            //calling Api For Organise Private Group
            utils.callApi('api/v1/private-group/create', organizePrivateGroupObj, 'organizePrivateGroup', actions.payload.dispatch)
        },
        isLoaderVisible: (state, actions) => {
            console.log('state.isLoading', state.isLoading);
            state.isLoading = true
            console.log('state.isLoading', state.isLoading);
            return state
        },
        isLoaderNotVisible: (state, actions) => {
            state.isLoading = false
            return state
        },
        logout: (state, actions) => {
            //calling Api For Logout
            utils.callApi('api/v1/logout', {}, 'logout', actions?.payload?.dispatch)
        },
        sendOtp: (state, actions) => {
            //calling Api For sending Otp
            utils.callApi('api/send-otp', { email: actions.payload.email, navigation: actions.payload.navigation }, 'sendOtp', actions?.payload?.dispatch)
        },
        verifyOtp: (state, actions) => {
            //calling Api For Verifiying Otp
            utils.callApi('api/verify-otp', { email: actions.payload.email, otp: actions.payload.otp, navigation: actions.payload.navigation }, 'VerifyOtp', actions?.payload?.dispatch)
        },
        savePicks: async (state, actions) => {
            const { matches,submit,isLoading,day,tournament_id } = actions.payload
            let match=matches
            const token = await AsyncStorage.getItem('@Token')
            
            //calling Api For Saving Picks
            utils.callApi(`api/v1/tournaments/${tournament_id}/${day}/save-members-picks`, {match,token,submit,isLoading}, 'savePick')
        },
    },
})

// Action creators are generated for each case reducer function
export const { login, logout, registration, joinPrivateGroup, oganizePrivateGroup, isLoaderVisible, isLoaderNotVisible, sendOtp, verifyOtp, savePicks } = authSlice.actions

export default authSlice.reducer