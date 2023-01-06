/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    if(Platform.OS=='ios'){
      PushNotificationIOS.getApplicationIconBadgeNumber(number => {
        PushNotificationIOS.setApplicationIconBadgeNumber(number + 1);
      });
    }
  });  
AppRegistry.registerComponent(appName, () => App)
