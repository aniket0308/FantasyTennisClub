import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../configuration";

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
export const callApi = (path, payload, type) => {
    const urlPath = `${URL}${path}`
    console.log(`url Called Path:::::${urlPath} type::::${type}`);
    fetch(urlPath, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })
        .then((res) => res.json())
        .then((json) => {
            console.log('What Is Json Token', json);
            if (type == 'login') {
                if (json.data != null) {
                    storeData(json.data)
                } else if (json.error == true) {
                        alert(json.message)
                }
            } else if (type == 'logout') {
                AsyncStorage.clear()
            }
            else {
                if (json.error == true) {
                    if (type !== 'login') {
                        alert(`${type} SuccessFully`)
                    }
                }
            }
        })
        .catch((error) => console.log('Error Is', error))
}