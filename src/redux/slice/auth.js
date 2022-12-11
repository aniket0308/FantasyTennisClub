import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit'
import { utils } from '../../common';

const initialState = {
    isLoading: false,
    membershipData: [],
    token:null,
    isRegisteredFirstTime:false
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
                platform: actions.payload.platform,
                checkLogin:actions.payload.checkLogin,
            }
            console.log('what is register obj', registerObj);
            //calling Api For Login
            utils.callApi('api/register', registerObj, 'Registered', actions.payload.dispatch)
            return {
                ...state,
                checkLogin: registerObj
            }

        },
        login: (state, actions) => {
            console.log('What Is Device Token', actions.payload.deviceToken);
            const loginObj = {
                email: actions.payload.email,
                password: actions.payload.password,
                device_token: actions.payload.deviceToken,
                platform: actions.payload.platform,
                setIsLoading: actions.payload.setIsLoading
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
            // state.isLoading = true
            return {
                ...state,
                isLoading: true
            }
        },
        isLoaderNotVisible: (state, actions) => {
            // state.isLoading = false
            return {
                ...state,
                isLoading: false
            }
        },
        logout: (state, actions) => {
            //calling Api For Logout
            utils.callApi('api/v1/logout', { setIsLoading: actions?.payload?.setIsLoading }, 'logout', actions?.payload?.dispatch)
            return {
                ...state,
                checkLogin: []
            }
        },
        sendOtp: (state, actions) => {
            //calling Api For sending Otp
            utils.callApi('api/send-otp', { email: actions.payload.email, navigation: actions.payload.navigation, setIsLoading: actions.payload.setIsLoading }, 'sendOtp', actions?.payload?.dispatch)
        },
        verifyOtp: (state, actions) => {
            //calling Api For Verifiying Otp
            utils.callApi('api/verify-otp', { email: actions.payload.email, otp: actions.payload.otp, navigation: actions.payload.navigation }, 'VerifyOtp', actions?.payload?.dispatch)
        },
        savePicks: async (state, actions) => {
            const { matches, submit, isLoading, day, tournament_id ,setIsLoading,setIsSubmit} = actions.payload
            console.log('matches', matches);
            let match = matches
            const token = await AsyncStorage.getItem('@Token')

            //calling Api For Saving Picks
            utils.callApi(`api/v1/tournaments/${tournament_id}/${day}/save-members-picks`, { match, token, submit, isLoading,setIsLoading,setIsSubmit }, 'savePick')
        },
        getAnnouncements: async (state, actions) => {
            console.log('what is state', actions);

            const announcementObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting Announcement
            utils.callApiGet(`api/v1/announcements/general${actions.payload?.filter == true ? '/all' : ''}`, announcementObj)
        },
        getDays: async (state, actions) => {
            const getDaysObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setDays: actions.payload.setDays
            }
            //calling Api For Getting Days
            utils.callApiGet(`api/v1/member-dashboard`, getDaysObj)
        },
        getAllPicksFormApi: async (state, actions) => {
            const pickObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting picks
            utils.callApiGet(`api/v1/tournaments/${actions.payload.tournamentId}/my-picks`, pickObj)
        },
        getSeasonLeaderBoard: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting seasonLeaderBoard
            utils.callApiGet(`api/v1/season-leaderboard`, seasonObj)
        },
        getGroupConsolationLeaderBoard: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting getGroupConsolationLeaderBoard
            utils.callApiGet(`api/v1/tournaments/${actions.payload.tournamentId}/group/consolation-leaderboard`, seasonObj)
        },
        getConsolationLeaderBoard: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting getConsolationLeaderBoard
            utils.callApiGet(`api/v1/tournaments/${actions.payload.tournamentId}/consolation-leaderboard`, seasonObj)
        },
        getLeaderBoard: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting groupLeaderboard
            utils.callApiGet(`api/v1/tournaments/${actions.payload.tournamentId}/group/leaderboard`, seasonObj)
        },
        getTournamentLeaderBoard: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting leaderboard
            utils.callApiGet(`api/v1/tournaments/${actions.payload.tournamentId}/leaderboard`, seasonObj)
        },
        getEtiquites: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting etiquites
            utils.callApiGet(`api/v1/page/whatsapp-group`, seasonObj)
        },
        getTournamentParticipants: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting etiquites
            utils.callApiGet(`api/v1/tournaments/${actions.payload.tournamentId}/participations`, seasonObj)
        },
        getNotifications: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting etiquites
            utils.callApiGet(`api/v1/announcements/member`, seasonObj)
        },
        getMyMembership: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting getMyMembership
            utils.callApiGet(`api/v1/user/my-membership`, seasonObj)
        },
        getSavedPicks: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting getMyMembership
            utils.callApiGet(`api/v1/tournaments/${tournamentId}/${actions?.payload?.tournament_day}/members-picks`, seasonObj)
        },
        aboutUs: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting about
            utils.callApiGet(`api/v1/page/about`, seasonObj)
        },
        getRules: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setData: actions.payload.setData
            }
            //calling Api For Getting about
            utils.callApiGet(`api/v1/page/rules`, seasonObj)
        },
        getFaq: async (state, actions) => {
            const seasonObj = {
                token: await AsyncStorage.getItem('@Token'),
                setIsLoading: actions.payload?.setIsLoading,
                setRefresh: actions.payload?.setRefresh,
                setFaq: actions.payload.setFaq
            }
            //calling Api For Getting about
            utils.callApiGet(`api/v1/page/faqs`, seasonObj)
        },
        sendPicksToEmail: async (state, actions) => {
            const sendEmailObj = {
                token: await AsyncStorage.getItem('@Token'),
                tournament_id: actions.payload.tournament_id,
                day_id: actions.payload.day_id,
                navigation: actions.payload.navigation
            }
            //calling Api For Sending Email
            utils.callApi(`api/v1/send-picks-mail`, sendEmailObj, 'sendPickEmail')
        },
        doPaymentFromCard: async (state, actions) => {
            const paymentObj = {
                token: await AsyncStorage.getItem('@Token'),
                dataValue: actions.payload.dataValue,
                dataDescriptor: actions.payload.dataDescriptor,
                amount: actions.payload.amount,
                membership_type: actions.payload.membership_type,
                membership_items: actions.payload.tournamentIdArr,
                navigation: actions.payload.navigation,
                setIsLoading: actions.payload.setIsLoading
            }

            //calling Api For Doing Payment
            utils.callApi(`api/v1/capture-payment`, paymentObj, 'PaymentCapture')
        },
        checkLoginStep:  (state, actions) => {
            // const token =  AsyncStorage.getItem('@Token')
            // console.log('token', actions.payload);
            return {
                ...state,
                token:actions?.payload?.value,
                isRegisteredFirstTime:actions?.payload?.isRegisteredFirstTime
            }
        },
        addMembership: (state, action) => {
            console.log('action.payload', action.payload);
            let t = []
            t.push(action.payload)
            state.membershipData = t
            return state
        }
    }

})

// Action creators are generated for each case reducer function
export const { login, logout, registration, joinPrivateGroup, oganizePrivateGroup, isLoaderVisible, isLoaderNotVisible, sendOtp, verifyOtp, savePicks,
    getAnnouncements, getDays, getAllPicksFormApi, getSeasonLeaderBoard, getGroupConsolationLeaderBoard, getConsolationLeaderBoard, getLeaderBoard, getEtiquites,
    getTournamentLeaderBoard, getTournamentParticipants, getNotifications, getMyMembership, getSavedPicks, aboutUs, getRules, getFaq, sendPicksToEmail, doPaymentFromCard,
    checkLoginStep, addMembership } = authSlice.actions

export default authSlice.reducer