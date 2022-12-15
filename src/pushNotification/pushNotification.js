import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { Platform } from "react-native";
import PushNotification, { Importance } from "react-native-push-notification";

class PushNotificationService {
 constructor(props){
    this.state={
        id:0
    }
 }
    configure = () => {
        try {
            PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
                onRegister: function (token) {
                    console.log("TOKEN:", token);
                },

                // (required) Called when a remote is received or opened, or local notification is opened
                onNotification: function (notification) {
                    console.log("NOTIFICATION:", notification);

                    // process the notification

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
                playSound: false, // (optional) default: true
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
        if (Platform.OS == 'android') {
            console.log('aaaaaaaa');
            PushNotification.localNotification({
                channelId: "Fantasy-Tennis-Club-id",
                largeIcon: "ic_launcher",
                // bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
                // subText: "This is a subText",
                color: "red", // (optional) default: system default
                vibrate: false, // (optional) default: true
                vibration: 300,
                priority: "high",
                when: new Date(Date.now()),
                id: this.state.id++, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                title: payload?.title, // (optional)
                message: payload?.body, // (required)
                picture: payload?.image,
                soundName:'default',
                bigPictureUrl:payload?.image
            })
        }else{
            let tempId=this.state.id++
            PushNotificationIOS.addNotificationRequest({
                id: 'test', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                title: payload?.title, // (optional)
                fireDate: new Date(Date.now()),
                soundName:'default',
                body: payload?.body, // (required)
                isCritical: true,
            })
        }
    }

}

export default PushNotificationService;