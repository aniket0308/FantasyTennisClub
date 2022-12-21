import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../configuration";
import { checkAuthentication, checkLoginStep, isLoaderNotVisible, login, loginAuthentication, logout, registerAuthentication } from "../redux/slice/auth";
import Snackbar from 'react-native-snackbar';
import { utils } from ".";
import { constants } from "./constant";
import { isLoaderNotVisibleProfile } from "../redux/slice/profile";
import { Alert } from "react-native";
import { store } from "../redux/store";

//Storing Data In Local Storage
const storeData = async (payload, isLogin) => {
    try {
        if (isLogin == true) {
            await AsyncStorage.mergeItem('@Token', payload.token),
                await AsyncStorage.mergeItem('@Name', payload.name),
                await AsyncStorage.mergeItem('@Email', payload.email),
                await AsyncStorage.mergeItem('@MobileNumber', payload.mobile_number)
        } else {
            await AsyncStorage.setItem('@Name', payload?.name),
                await AsyncStorage.setItem('@Token', payload?.token),
                await AsyncStorage.setItem('@Email', payload?.email),
                await AsyncStorage.setItem('@MobileNumber', payload?.mobile_number)
            await AsyncStorage.setItem('@registerFirstTime', 'true')

        }
    } catch (e) {
        console.log('Error In Saving Data To Local Storage', e);
    }
}

//Navigation On Another Page
export const navigateTo = (navigation, screen, passData) => {
    console.log('What Are Passed Data:', passData, screen);
    navigation.navigate(screen, passData)
}

//Calling API Function
export const callApi = (path, payload, type, dispatch) => {
    console.log('What Is Device Token', payload);
    const urlPath = `${URL}${path}`
    fetch(urlPath, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": type != 'login' || type != 'logout' ? `Bearer ${payload.token}` : ''
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then(async (json) => {
            console.log('what is dispatch', json);
            if (dispatch != undefined) {
                dispatch(isLoaderNotVisible())
                dispatch(isLoaderNotVisibleProfile())
            }

            if (json.error == true && type != 'PaymentCapture') {
                Snackbar.show({
                    text: json.message,
                    duration: 1000,
                    backgroundColor: 'red',
                });
                if (payload.setIsLoading != undefined) {
                    payload.setIsLoading(false)
                }

                if (type == 'savePick' && payload.setIsLoading != undefined) {
                    payload.setIsLoading(true)
                }
            } else {
                if (type == 'savePick' && payload.setIsLoading != undefined && payload.setIsSubmit != undefined) {
                    payload.setIsLoading(false)
                    payload.setIsSubmit(true)
                }
                else if (payload.setIsLoading != undefined) {
                    payload.setIsLoading(false)
                }

            }

            console.log('Register Response', type);
            if (type == 'login') {
                if (json.success == true) {
                    storeData(json.data, true)
                    const value = await AsyncStorage.getItem('@Token')
                    const isRegisteredFirstTime = await AsyncStorage.getItem('@RegisterFirstTIme')
                    store.dispatch(loginAuthentication({ data: json?.data }))
                    store.dispatch(checkAuthentication({ data: json?.data, token: value, isRegisteredFirstTime: false }))
                }
            } else if (type == 'logout') {
                await AsyncStorage.clear()
                store.dispatch(logout())
            } else if (type == 'Registered') {
                if (json.error == false) {
                    if (json.data != null) {
                        console.log('what is json fdfdfdfdfdfd', json.data.token);
                        storeData(json.data, false)
                        const value = await AsyncStorage.getItem('@Token')
                        const isRegisteredFirstTime = await AsyncStorage.getItem('@RegisterFirstTIme')
                        console.log('isRegisteredFirstTime  isRegisteredFirstTime', isRegisteredFirstTime,value);
                        store.dispatch(registerAuthentication({ data: json?.data, token: json?.data?.token, isRegisteredFirstTime }))
                        // store.dispatch(checkAuthentication({ data: json?.data, token: json?.data?.token, isRegisteredFirstTime }))
                    }
                }
            } else if (type == 'editProfile') {
                if (json.error == false) {
                    await AsyncStorage.setItem('@Name', payload?.name)
                    await AsyncStorage.setItem('@MobileNumber', payload?.mobile_number)
                    await AsyncStorage.setItem('@Email', payload?.email)
                    payload.navigation.goBack()
                }
            } else if (type == 'changePassword') {
                if (json.error == false) {
                    payload.navigation.goBack()
                }
            } else if (type == 'inquiry') {
                if (json?.error == false) {
                    if (payload?.clearAllData != undefined) {
                        payload.clearAllData()
                        payload.navigation?.navigate('Dashboard')
                    }
                }
            } else if (type == 'sendOtp') {
                if (json.error == false) {
                    if (payload?.navigation != undefined) {
                        utils.navigateTo(payload.navigation, 'OtpVerification', { email: payload.email })
                    }
                }
            }
            else if (type == 'VerifyOtp') {
                if (json.error == false) {
                    if (payload?.navigation != undefined) {
                        utils.navigateTo(payload.navigation, constants.screens.changePassword, { email: payload.email, name: 'forgotPassword' })
                    }
                }
            } else if (type == 'resetPassword') {
                if (json.error == false) {
                    if (payload?.navigation != undefined) {
                        utils.navigateTo(payload.navigation, constants.screens.login)
                    }
                }
            }
            else if (type == 'privateGroup' || type == 'sendPickEmail' || type == 'savePick') {
                if (json.error == false && type != 'sendPickEmail' && type != 'PaymentCapture' && type != 'savePick') {
                    Alert.alert(
                        "Fantasy Tennis Club",
                        json?.message,
                    )
                }
                else if (type == 'PaymentCapture') {
                    payload.setIsLoading(false)
                    utils.navigateTo(payload.navigation, 'PaymentConfirmation', json)
                }
                else {
                    if (payload.navigation != undefined) {
                        utils.navigateTo(payload.navigation, constants.screens.dashBoard)
                    }
                }
            }else if(type == 'organizePrivateGroup' && json.error == false){
                if (payload.navigation != undefined) {
                    utils.navigateTo(payload.navigation, constants.screens.home)
                }
            }
            else {
                if (type == 'PaymentCapture') {
                    payload.setIsLoading(false)
                    utils.navigateTo(payload.navigation, 'PaymentConfirmation', json)
                } else if (json.error == false) {
                    if (payload.clearAllData != undefined) {
                        payload.clearAllData()
                    }
                    Snackbar.show({
                        text: json.message,
                        duration: 1000,
                        backgroundColor: 'green',
                    });

                }

                if (json.error == true) {
                    if (type !== 'login') {
                    }
                }
            }
            return json
        })
        .catch((error) => {
            Snackbar.show({
                text: error.toString(),
                duration: 1000,
                backgroundColor: 'red',
            });
            console.log('Error Is', error)
        })
}

//calling apis for get
export const callApiGet = async (path, payload, type) => {
    const urlPath = `${URL}${path}`
    try {
        fetch(urlPath, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${payload?.token}`
            },
        }).then(async (response) => {
            if (response.status == 401) {
                await AsyncStorage.clear()
                store.dispatch(logout())
            }
            return response.json()
        }
        ).then(async (json) => {
            console.log('what is json', payload);
            store.dispatch(checkAuthentication({ data: json.data, token: payload?.token, isRegisteredFirstTime: false }))
            if (payload?.setDays) {
                console.log('what is json for set days', json);
                await AsyncStorage.setItem('@TournamentId', `${json?.data?.id}`)
                payload.setDays(json)
            }
            if (payload.setData) {
                payload.setData(json)
            }
            if (payload.setRefresh) {
                payload.setRefresh(false)
            }
            if (payload.setFaq) {
                payload.setFaq(json)
            }
            if (type == 'Leaderboard' && json.error == true) {
                Alert.alert(
                    "Fantasy Tennis Club",
                    'Leaderboard is not generated yet.',
                    [
                        { text: "OK", onPress: () => payload?.navigation.goBack() }
                    ]
                );
            }
            payload.setIsLoading(true)
            return json
        }).catch(e => {
            Snackbar.show({
                text: e.toString(),
                duration: 1000,
                backgroundColor: 'red',
            });
            payload.setRefresh(false)
        })
    } catch (error) {
        store.dispatch(checkAuthentication({ data: null, token: payload?.token, isRegisteredFirstTime: false }))
        console.log('What Is Error In Get Api', error.toString())
    }
}
