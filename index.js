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

const noti = new PushNotificationService()
Platform.OS=='ios'&&noti.configure()

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App)
