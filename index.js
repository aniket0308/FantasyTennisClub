/**
 * @format
 */

import { AppRegistry, NativeModules, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationService from './src/pushNotification/pushNotification';
import PushNotification from 'react-native-push-notification';

const noti = new PushNotificationService()
Platform.OS=='ios'&&noti.configure()

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  if (Platform.OS == 'ios') {
    if(remoteMessage?.data?.notification_type=='MEMBER'){
        PushNotificationIOS.getApplicationIconBadgeNumber(number => {
            console.log('what is number beta incrementer', number);
            PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
        });
    }else{
        PushNotificationIOS.getApplicationIconBadgeNumber(number => {
            console.log('what is number beta incrementer', number);
            PushNotificationIOS.setApplicationIconBadgeNumber(number - 1);
        });
    }
}
 else {
    if(remoteMessage?.data?.notification_type!='MEMBER'){
        PushNotification.getApplicationIconBadgeNumber(n => {
            PushNotification.setApplicationIconBadgeNumber(n + 1)
        })
    }else{
        PushNotification.getApplicationIconBadgeNumber(n => {
            PushNotification.setApplicationIconBadgeNumber(n - 1)
        })
    }
}
});
AppRegistry.registerComponent(appName, () => App)
