import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity, BackHandler } from 'react-native'
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
import { checkAuthentication } from "../../redux/slice/auth";
import { store } from "../../redux/store";

//Home Screen
const Home = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isMembership, setIsMembership] = useState(false)

    const configure = () => {
        try {
            PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
                onRegister: function (token) {
                    console.log("TOKEN:", token);
                },

                // (required) Called when a remote is received or opened, or local notification is opened
                onNotification: function (notification) {
                    console.log("NOTIFICATION:sss", notification);
                    PushNotificationIOS.getApplicationIconBadgeNumber((n)=>{
                        console.log('PushNotificationIOS.getApplicationIconBadgeNumber()',n)
                        PushNotificationIOS.setApplicationIconBadgeNumber(n)
                    })
                    // process the notification
                    // Handle notification click
                    if (notification.userInteraction) {
                        if (notification?.data?.notification_type == 'MEMBER') {
                            utils.navigateTo(navigation, constants.screens.notification, { exit: true })
                        } else {
                            utils.navigateTo(navigation, constants.screens.announcements, { exit: true })
                        }
                    }
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                },

                // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
                onAction: function (notification) {
                    console.log("ACTION:", notification.action);
                    console.log("NOTIFICATION: vvv", notification);

                    // process the action
                },

                // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
                onRegistrationError: function (err) {
                    console.error(err.message, err);
                },

                // IOS ONLY (optional): default: all - Permissions to register.
                permissions: {
                    alert: true,
                    badge: true,
                    sound: true,
                },

                // Should the initial notification be popped automatically
                // default: true
                popInitialNotification: true,

                /**
                 * (optional) default: true
                 * - Specified if permissions (ios) and token (android and ios) will requested or not,
                 * - if not, you must call PushNotificationsHandler.requestPermissions() later
                 * - if you are not using remote notification or do not have Firebase installed, use this:
                 *     requestPermissions: Platform.OS === 'ios'
                 */
                requestPermissions: true,
            })
        } catch (error) {
            console.log('Error:', error);
        }
    }


    useEffect(() => {
        const notification = new PushNotificationService()
        configure()
        notification.createChannel()
        checkMemberShip()
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('Message handled in the Foregorund!', remoteMessage);
            console.log('PushNotificationIOS.getApplicationIconBadgeNumber()',)
            notification.localNotification({ title: remoteMessage?.notification?.title, body: remoteMessage?.notification.body,
                //  image: remoteMessage?.notification.android.imageUrl
                 })
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
                    setIsLoading(true)
                    store.dispatch(checkAuthentication({ data: json.data, token, isRegisteredFirstTime: false }))
                }
                setIsMembership(json?.data?.is_member)
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
                    disabled={isLoading == false ? true : false}
                    onPress={() => {
                        utils.navigateTo(navigation, isMembership == true ? 'Dashboard' : 'MyMembership')
                    }}
                    activeOpacity={1}
                    style={homeStyle.tennisBall}>
                    <Image resizeMode="contain" style={{ height: widthPercentageToDP(15), width: widthPercentageToDP(15) }} source={constants.icons.tennisBall} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Home