import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity, BackHandler, Platform, Alert } from 'react-native'
import { widthPercentageToDP } from "react-native-responsive-screen";
import SplashScreen from "react-native-splash-screen";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import homeStyle from "./style";
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotificationService from "../../pushNotification/pushNotification";
import { checkAuthentication, logout } from "../../redux/slice/auth";
import { store } from "../../redux/store";
import Loader from "../../components/loader";
import { navigate } from "../../navigation/navigationRef";
import { useRoute } from "@react-navigation/native";

//Home Screen
const Home = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState()
    const [, setRender] = useState()

    useEffect(() => {
        const notification = new PushNotificationService()
        if(Platform.OS=='android'){
            notification.configure(navigation)
        }
        messaging().onNotificationOpenedApp(async remoteMessage => {
            console.log('App Opened From Background', remoteMessage);
            if (Platform.OS == 'ios') {
                PushNotificationIOS.getApplicationIconBadgeNumber(number => {
                    console.log('what is number beta', number);
                    PushNotificationIOS.setApplicationIconBadgeNumber(0);
                });
            } else {
                PushNotification.removeAllDeliveredNotifications()
            }
            if (remoteMessage?.data?.notification_type == 'MEMBER') {
                const token = await AsyncStorage.getItem('@Token')
                utils.callApi(`api/v1/announcements/read/${remoteMessage?.data?.notification_id}`, { token }, 'notificationRead')
                utils.callApi('api/v1/announcements/member/read-all', { token }, 'allNotificationRead')
                utils.navigateTo(navigation,constants.screens.notification,{fromBackground:true})
            } else {
                utils.navigateTo(navigation,constants.screens.announcements,{fromBackground:true})
            }
        })
        notification.createChannel()
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('Message handled in the Foregorund!', remoteMessage);
            notification.localNotification({
                title: remoteMessage?.notification?.title,
                body: remoteMessage?.notification.body,
                data: remoteMessage?.data
                //  image: remoteMessage?.notification.android.imageUrl
            })
            if (Platform.OS == 'ios') {
                PushNotificationIOS.getApplicationIconBadgeNumber(number => {
                    console.log('what is number beta incrementer', number);
                    PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
                });
            } else {
                PushNotification.getApplicationIconBadgeNumber(n => {
                    PushNotification.setApplicationIconBadgeNumber(n + 1)
                })
            }
        });
        return unsubscribe
    }, [])

    const checkMemberShip = async () => {
        const token = await AsyncStorage.getItem('@Token')
        //calling api for Checking Membership
        fetch('https://fantasytennisclub.com/admin/api/v1/membership/check', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }).
            then(async (response) => {
                if (response.status == 401) {
                    await AsyncStorage.clear()
                    store.dispatch(logout())
                }
                return response.json()
            }).
            then((json) => {
                if (json.success == true) {
                    store.dispatch(checkAuthentication({ data: json.data, token, isRegisteredFirstTime: false }))
                }
                utils.navigateTo(navigation, json?.data?.is_member == true ? 'Dashboard' : 'MyMembership')
                setIsLoading(false)
            }).
            catch(e => {
                // Snackbar.show({
                //     text: e.toString(),
                //     duration: 1000,
                //     backgroundColor: 'red',
                //     // action: {
                //     //   text: 'UNDO',
                //     //   textColor: 'green',
                //     //   onPress: () => { /* Do something. */ },
                //     // },
                // });
                setIsLoading(false)
                store.dispatch(checkAuthentication({ data: null, token, isRegisteredFirstTime: false }))
                console.log('What Is Error In Get Api', e)
            })
    }

    return (
        <>
            <StatusBar backgroundColor={constants.colors.darkGreen} />
            <View style={[commonStyle.container, homeStyle.container]}>
                <Image source={constants.icons.logo} resizeMode='contain' style={{ width: widthPercentageToDP(60), height: widthPercentageToDP(60) }} />
                <Text style={homeStyle.textReadyPlay}>Ready?? Play!!!</Text>
                <Text style={homeStyle.textTapEnter}>tap here to enter</Text>
                <Image source={constants.icons.downArrow} style={{ height: widthPercentageToDP(20) }} resizeMode='contain' />
                <TouchableOpacity
                    disabled={isLoading == false ? false : true}
                    onPress={() => {
                        setIsLoading(true)
                        checkMemberShip()
                    }}
                    activeOpacity={1}
                    style={homeStyle.tennisBall}>
                    <Image resizeMode="contain" style={{ height: widthPercentageToDP(15), width: widthPercentageToDP(15) }} source={constants.icons.tennisBall} />
                </TouchableOpacity>
                {isLoading == true && <Loader />}
            </View>
        </>
    )
}

export default Home