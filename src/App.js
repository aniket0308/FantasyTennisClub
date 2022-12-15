/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux';
import { AuthNavigator, RegisterFirstTime, RootNavigator } from './navigation/navigation';
import { store } from './redux/store';
import messaging from '@react-native-firebase/messaging';
import PushNotificationService from './pushNotification/pushNotification';
import Snackbar from 'react-native-snackbar';
import { checkLoginStep } from './redux/slice/auth';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { utils } from './common';
import { constants } from './common/constant';

const App = ({navigation}) => {

  //Variable Used For Authentication
  const [isAuthentication, setIsAuthentication] = useState(true)
  const [, setRender] = useState()
  const [isMembership, setIsMembership] = useState()
  const [firstTime, setFirstTime] = useState()
  const [isLoading, setIsLoading] = useState(false)

  // const auth=store.getState()
  // console.log('what is auth',auth);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@Token')
      const isRegisteredFirstTime = await AsyncStorage.getItem('@RegisterFirstTIme')
      // store.dispatch(checkLoginStep({value,isRegisteredFirstTime}))
      if (value !== null || isRegisteredFirstTime != null) {
        // value previously stored
        setIsAuthentication(true)
        setFirstTime(isRegisteredFirstTime)
        setRender({})
      } else if (value !== null && isRegisteredFirstTime == null) {
        setIsAuthentication(true)
        setFirstTime(isRegisteredFirstTime)
        setRender({})
      }
      else {
        setIsAuthentication(false)
        setRender({})
      }
    } catch (e) {
      // error reading value
      console.log('Error In Getting Item:', e);
    }
  }

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
      then(async(response) => {
        if (response.status == 401) {
          await AsyncStorage.clear()
      }
      return response.json()
      }).
      then(async (json) => {
        console.log('what is json', json);
          if (json?.success == true) {
            setIsLoading(true)
            await AsyncStorage.removeItem('@RegisterFirstTIme')
            setIsMembership(json?.data?.is_member)
            setRender({})
          } else {
            setIsAuthentication(false)
          }
      }).
      catch(e => {
        // Snackbar.show({
        //   text: e.toString(),
        //   duration: 1000,
        //   backgroundColor: 'red',
        // });
        setIsLoading(false)
        console.log('What Is Error In Get Api', e)
      })
  }

  useEffect(() => {
    getData()
    checkMemberShip()
  }, [])

  useEffect(() => {
    checkMemberShip()
  }, [isMembership])

  useEffect(() => {
    getData()
  })

  useEffect(() => {
    const notification = new PushNotificationService()
    // notification.configure(navigation)
    notification.createChannel()
    notification.getChannels()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the Foregorund!', remoteMessage);
      notification.localNotification({title:remoteMessage?.notification?.title,body:remoteMessage?.notification.body,image:remoteMessage?.notification.android.imageUrl})
    });
    checkMemberShip()
    return unsubscribe;
  }, []);

  useEffect(()=>{
    messaging().onNotificationOpenedApp((remoteMessage)=>{
      console.log('remoteMessage remoteMessage',remoteMessage);
    })
  })

  return (
    <Provider store={store}>
      {
        isAuthentication == true && firstTime == 'true'
          ? <RegisterFirstTime />
          : isAuthentication == true && firstTime == null
            ? <AuthNavigator />
            : isAuthentication == false && <RootNavigator />
      }
    </Provider>
  );
}

export default App