import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../configuration";
import { isLoaderNotVisible } from "../redux/slice/auth";
import Snackbar from 'react-native-snackbar';

//Storing Data In Local Storage
const storeData = async (payload) => {
    try {
        await AsyncStorage.setItem('@Token', payload.token),
            await AsyncStorage.setItem('@Name', payload.name),
            await AsyncStorage.setItem('@Email', payload.email),
            await AsyncStorage.setItem('@MobileNumber', payload.mobile_number)
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
            console.log('what is dispatch',dispatch);
            if (dispatch != undefined) {
                dispatch(isLoaderNotVisible())
            }
            if (json.error == true) {
                Snackbar.show({
                    text: json.message,
                    duration: 1000,
                    backgroundColor:'red',
                    // action: {
                    //   text: 'UNDO',
                    //   textColor: 'green',
                    //   onPress: () => { /* Do something. */ },
                    // },
                  });
            }

            if (type == 'login') {
                if (json.data != null) {
                    storeData(json.data)
                }
            } else if (type == 'logout') {
                AsyncStorage.clear()
            } else if (type == 'editProfile') {
                if (json.error == false) {
                    await AsyncStorage.setItem('@Name', payload?.name)
                    await AsyncStorage.setItem('@MobileNumber', payload?.mobile_number)
                    payload.navigation.goBack()
                }
            } else if (type == 'changePassword') {
                if (json.error == false) {
                    payload.navigation.goBack()
                }
            }
            else {
                if (json.error == false) {
                    Snackbar.show({
                        text: json.message,
                        duration: 1000,
                        backgroundColor:'green',
                        // action: {
                        //   text: 'UNDO',
                        //   textColor: 'green',
                        //   onPress: () => { /* Do something. */ },
                        // },
                      });
                }
                
                if (json.error == true) {
                    if (type !== 'login') {
                        // alert(`${type} SuccessFully`)
                    }
                }
            }
        })
        .catch((error) => {
            Snackbar.show({
                text: error.toString(),
                duration: 1000,
                backgroundColor:'red',
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
                "Authorization":`Bearer ${token}`
            },
        }).then((response)=>response.json()).then((json)=>json)
    } catch (error) {
        console.log('What Is Error', error);
    }
}
