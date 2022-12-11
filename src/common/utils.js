import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../configuration";
import { checkLoginStep, isLoaderNotVisible } from "../redux/slice/auth";
import Snackbar from 'react-native-snackbar';
import { utils } from ".";
import { constants } from "./constant";
import { isLoaderNotVisibleProfile } from "../redux/slice/profile";
import { Alert } from "react-native";
import { store } from "../redux/store";

//Storing Data In Local Storage
const storeData = async (payload, isLogin) => {
    console.log('payload', payload);
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
            await AsyncStorage.setItem('@RegisterFirstTIme', 'true')

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

            if (json.error == true && type !='PaymentCapture' ) {
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
                    store.dispatch(checkLoginStep({value,isRegisteredFirstTime}))
                }
            } else if (type == 'logout') {
                await AsyncStorage.clear()
            } else if (type == 'Registered') {
                if (json.error == false) {
                    if (json.data != null) {
                        console.log('what is json', json.data);
                        storeData(json.data, false)
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
                    }
                    Snackbar.show({
                        text: json.message,
                        duration: 1000,
                        backgroundColor: 'green',
                    });
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
            else if (type == 'organizePrivateGroup' || type == 'privateGroup' || type == 'sendPickEmail' || type == 'savePick') {
                if (json.error == false && type != 'sendPickEmail' && type != 'PaymentCapture' && type != 'savePick') {
                    Alert.alert(json?.message)
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
export const callApiGet = async (path, payload) => {
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
            }
            return response.json()
        }
        ).then(async (json) => {
            if (payload?.setDays) {
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
        console.log('What Is Error In Get Api', error.toString())
    }
}
