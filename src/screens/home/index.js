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
                PushNotificationIOS.getApplicationIconBadgeNumber(async number => {
                    console.log('what is number beta', number);
                    PushNotificationIOS.setApplicationIconBadgeNumber(0);
                    await AsyncStorage.removeItem('@count')
                });
                // if(remoteMessage?.data?.notification_type == 'MEMBER'){
                //     // PushNotificationIOS.getApplicationIconBadgeNumber(number => {
                //     //     console.log('what is number beta', number);
                //     //     PushNotificationIOS.setApplicationIconBadgeNumber(0);
                //     // });    
                // }else{
                //     PushNotificationIOS.getApplicationIconBadgeNumber(number => {
                //         console.log('what is number beta', number);
                //         // PushNotificationIOS.setApplicationIconBadgeNumber(number-1);
                //     });    
                // }
            } else {
                if(remoteMessage?.data?.notification_type == 'MEMBER'){
                    PushNotification.removeAllDeliveredNotifications()
                    await AsyncStorage.removeItem('@count')
                }else{
                    PushNotification.getApplicationIconBadgeNumber((number)=>{
                        // PushNotification.setApplicationIconBadgeNumber(number-1)
                    })
                }
            }
            if (remoteMessage?.data?.notification_type == 'MEMBER') {
                const token = await AsyncStorage.getItem('@Token')
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
                PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
                // if(remoteMessage?.data?.notification_type=='MEMBER'){
                //     PushNotificationIOS.getApplicationIconBadgeNumber(number => {
                //         console.log('what is number beta incrementer', number);
                //         PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
                //     });
                // }else{
                //     PushNotificationIOS.getApplicationIconBadgeNumber(number => {
                //         console.log('what is number beta incrementer', number);
                //         // PushNotificationIOS.setApplicationIconBadgeNumber(number - 1);
                //     });
                // }
            }
             else {
                await AsyncStorage.getItem('@count').then(async(count)=>{
                    if(count==null){
                       await AsyncStorage.setItem('@count','1')
                       PushNotification.setApplicationIconBadgeNumber(1)
                    }
                    else{
                        let incrementer=parseInt(count)+1
                        PushNotification.setApplicationIconBadgeNumber(incrementer)
                        await AsyncStorage.setItem('@count',incrementer.toString())
    
                    }
                })
                // if(remoteMessage?.data?.notification_type=='MEMBER'){
                //     await AsyncStorage.getItem('@count').then(async(count)=>{
                //         if(count==null){
                //            await AsyncStorage.setItem('@count','0')
                //            PushNotification.setApplicationIconBadgeNumber(1)
                //         }
                //         else{
                //             let incrementer=parseInt(count)+1
                //             PushNotification.setApplicationIconBadgeNumber(incrementer)
                //             await AsyncStorage.setItem('@count',incrementer.toString())
        
                //         }
                //     })
                // }else{
                //     await AsyncStorage.getItem('@count').then(async(count)=>{
                //         console.log('count==',count);
                //         if(count==null || count<0){
                //            await AsyncStorage.setItem('@count','0')
                //            PushNotification.removeAllDeliveredNotifications()
                //         }
                //         else{
                //             let decrementer=parseInt(count)
                //             PushNotification.setApplicationIconBadgeNumber(decrementer)
                //             await AsyncStorage.setItem('@count',decrementer.toString())
        
                //         }
                //     })
                // }
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