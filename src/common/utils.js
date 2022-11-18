import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../configuration";
import { isLoaderNotVisible } from "../redux/slice/auth";
import Snackbar from 'react-native-snackbar';
import { utils } from ".";
import { constants } from "./constant";
import { isLoaderNotVisibleProfile } from "../redux/slice/profile";
import { Alert } from "react-native";

//Storing Data In Local Storage
const storeData = async (payload, isLogin) => {
    try {
        if (isLogin == true) {
            await AsyncStorage.mergeItem('@Token', payload.token),
                await AsyncStorage.mergeItem('@Name', payload.name),
                await AsyncStorage.mergeItem('@Email', payload.email),
                await AsyncStorage.mergeItem('@MobileNumber', payload.mobile_number)
        } else {
            await AsyncStorage.setItem('@Name', payload.name),
                await AsyncStorage.setItem('@Token', payload.token),
                await AsyncStorage.setItem('@Email', payload.email),
                await AsyncStorage.setItem('@MobileNumber', payload.mobile_number)
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
            if (json.error == true) {
                Snackbar.show({
                    text: json.message,
                    duration: 1000,
                    backgroundColor: 'red',
                    // action: {
                    //   text: 'UNDO',
                    //   textColor: 'green',
                    //   onPress: () => { /* Do something. */ },
                    // },
                });
            }

            console.log('Register Response', type);
            if (type == 'login') {
                if (json.success == true) {
                    storeData(json.data, true)
                }
            } else if (type == 'logout') {
                AsyncStorage.clear()
            } else if (type == 'Registered') {
                if (json.data != null) {
                    storeData(json.data, false)
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
                        utils.navigateTo(payload.navigation, constants.screens.changePassword, {email: payload.email,name:'forgotPassword'})
                    }
                }
            } else if (type == 'resetPassword') {
                if (json.error == false) {
                    if (payload?.navigation != undefined) {
                        utils.navigateTo(payload.navigation, constants.screens.login)
                    }
                }
            }else if(type == 'organizePrivateGroup' || type == 'privateGroup' || 'savePick'){
                if (json.error == false) {
                    Alert.alert(json?.message)
                }
            }
            else {
                if (json.error == false) {
                    if (payload.clearAllData != undefined) {
                        payload.clearAllData()
                    }
                    Snackbar.show({
                        text: json.message,
                        duration: 1000,
                        backgroundColor: 'green',
                        // action: {
                        //   text: 'UNDO',
                        //   textColor: 'green',
                        //   onPress: () => { /* Do something. */ },
                        // },
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
                // action: {
                //   text: 'UNDO',
                //   textColor: 'green',
                //   onPress: () => { /* Do something. */ },
                // },
            });
            console.log('Error Is', error)
        })
}

//calling apis for get
export const callApiGet = async (path, token) => {
    const urlPath = `${URL}${path}`
    try {
        fetch(urlPath, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }).then((response) => response.json()).then((json) => json)
    } catch (error) {
        console.log('What Is Error', error);
    }
}
