import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";
import PushNotification, { Importance } from "react-native-push-notification";
import { utils } from "../common";
import { constants } from "../common/constant";
import { navigate } from "../navigation/navigationRef";

class PushNotificationService {
    constructor(props) {
        this.state = {
            id: 0
        }
    }
    configure = (navigateToFromAndroid) => {
        try {
            PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
                onRegister: function (token) {
                    console.log("TOKEN:", token);
                },

                // (required) Called when a remote is received or opened, or local notification is opened
                onNotification: async function (notification) {
                    console.log('What is Notification', notification);
                    // process the notification
                    // Handle notification click



                    const token = await AsyncStorage.getItem('@Token')
                    if (notification.userInteraction == true && notification.foreground == true) {
                        if (Platform.OS == 'ios') {
                            PushNotificationIOS.getApplicationIconBadgeNumber(async (number) => {
                                console.log('what is number beta', number);
                                PushNotificationIOS.setApplicationIconBadgeNumber(0);
                                await AsyncStorage.removeItem('@count')
                            });
                            // if(notification?.data?.notification_type == 'MEMBER'){
                            // PushNotificationIOS.getApplicationIconBadgeNumber(number => {
                            //     console.log('what is number beta', number);
                            //     PushNotificationIOS.setApplicationIconBadgeNumber(0);
                            // });
                            // }
                        } else {
                            PushNotification.removeAllDeliveredNotifications()
                            await AsyncStorage.removeItem('@count')
                            PushNotification.setApplicationIconBadgeNumber(0)
                            // if(notification?.data?.notification_type == 'MEMBER'){
                            // }
                        }
                        if (notification?.data?.notification_type != 'MEMBERs') {
                            const token = await AsyncStorage.getItem('@Token')
                            if (Platform.OS == 'android') {
                                utils.navigateTo(navigateToFromAndroid, constants.screens.notification, { exit: notification?.foreground == true ? false : true })
                            } else {
                                navigate(constants.screens.notification, { exit: notification?.foreground == true ? false : true })
                            }
                        }
                    } else {
                        console.log('From BACKGROUND !!!!!!', notification);
                        if (notification.userInteraction == true) {
                            if (notification?.data?.notification_type != 'MEMBERs') {
                                if (Platform.OS == 'android') {
                                    PushNotification.removeAllDeliveredNotifications()
                                    await AsyncStorage.removeItem('@count')
                                    utils.navigateTo(navigateToFromAndroid, constants.screens.notification, { fromBackground: true })
                                } else {
                                    PushNotificationIOS.getApplicationIconBadgeNumber(async (number) => {
                                        console.log('what is number beta', number);
                                        PushNotificationIOS.setApplicationIconBadgeNumber(0);
                                        await AsyncStorage.removeItem('@count')
                                    });
                                    navigate(constants.screens.notification, { exit: notification?.foreground == true ? false : true })
                                }
                            } 
                        }else{
                            if (Platform.OS == 'android') {
                                await AsyncStorage.getItem('@count').then(async (count) => {
                                    console.log('count== from foredsdsdd ', count);
                                    if (count == null) {
                                        await AsyncStorage.setItem('@count', '1')
                                        PushNotification.setApplicationIconBadgeNumber(1)
                                    }
                                    else {
                                        let incrementer = parseInt(count) + 1
                                        PushNotification.setApplicationIconBadgeNumber(incrementer)
                                        await AsyncStorage.setItem('@count', incrementer.toString())
                                    }
                                })
                            } 
                        }
                    }
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                },


                // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
                onAction: function (notification) {
                    console.log("ACTION:", notification.action);
                    console.log("NOTIFICATION:", notification);

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

    createChannel = () => {
        PushNotification.createChannel(
            {
                channelId: "Fantasy-Tennis-Club-id", // (required)
                channelName: "Fantasy Tennis Club channel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
                playSound: true, // (optional) default: true
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    getChannels = () => {
        PushNotification.getChannels((channel_ids) => {
            console.log(channel_ids); // ['channel_id_1']
        });
    }

    localNotification = (payload) => {
        let newStr = payload?.body.trim().split('&amp;nbsp;').map((i) => {
            return i.trim()
        })
        console.log('what is notification payload', newStr.join(''));
        if (Platform.OS == 'android') {
            PushNotification.localNotification({
                userInfo: payload.data,
                channelId: "Fantasy-Tennis-Club-id",
                largeIcon: "ic_launcher",
                bigText: newStr.join(''), // (optional) default: "message" prop
                // subText: "This is a subText",
                color: "red", // (optional) default: system default
                vibrate: false, // (optional) default: true
                vibration: 300,
                priority: "high",
                when: new Date(Date.now()),
                id: this.state.id++, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                title: payload?.title, // (optional)
                message: newStr.join('.'), // (required)
                picture: payload?.image,
                soundName: 'default',
                bigPictureUrl: payload?.image,
            })
        } else {
            let tempId = this.state.id++
            PushNotificationIOS.addNotificationRequest({
                id: `${tempId}`, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                title: payload?.title, // (optional)
                fireDate: new Date(Date.now() + 1000),
                soundName: 'default',
                body: newStr.join(''), // (required)
                isCritical: true,
                isSilent: 'false',
                userInfo: payload.data,
            })
        }
    }

}

export default PushNotificationService;