/**
 * @format
 */

import { AppRegistry, NativeModules, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // await AsyncStorage.setItem('@NotificationData',JSON.stringify(remoteMessage))
    // NativeModules.DevMenu.reload();
  });  
AppRegistry.registerComponent(appName, () => App)
