/**
 * @format
 */

import { AppRegistry, NativeModules, Platform, } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationService from './src/pushNotification/pushNotification';
import PushNotification from 'react-native-push-notification';

const noti = new PushNotificationService()
Platform.OS == 'ios' && noti.configure()

// Register backgradb devicesound handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    if (Platform.OS == 'ios') {
            PushNotificationIOS.getApplicationIconBadgeNumber(async(number) => {
                console.log('what is number beta incrementer Baclkgroubd', number);
                if(number==null){
                    await AsyncStorage.setItem('@count','1')
                 }
                 else{
                     let incrementer=parseInt(number)+1
                     await AsyncStorage.setItem('@count',incrementer.toString())
                 }
                PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
            });
        // if (remoteMessage?.data?.notification_type == 'MEMBER') {
        //     PushNotificationIOS.getApplicationIconBadgeNumber(number => {
        //         console.log('what is number beta incrementer Baclkgroubd', number);
        //         PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
        //     });
        // } else {
        //     PushNotificationIOS.getApplicationIconBadgeNumber(number => {
        //         console.log('what is number beta Decrementer backgrounf', number);
        //         // PushNotificationIOS.setApplicationIconBadgeNumber(number - 1);
        //     });
        // }
    }
    else {
        await AsyncStorage.getItem('@count').then(async(count)=>{
            console.log('count==',count);
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
        // if (remoteMessage?.data?.notification_type == 'MEMBER') {
        //     await AsyncStorage.getItem('@count').then(async(count)=>{
        //         console.log('count==',count);
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
        // } else {
        //     await AsyncStorage.getItem('@count').then(async(count)=>{
        //         console.log('count==',count);
        //         let a=parseInt(count)
        //         if(a==null || a<=0){
        //             PushNotification.removeAllDeliveredNotifications()
        //             await AsyncStorage.setItem('@count','0')
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
AppRegistry.registerComponent(appName, () => App)
