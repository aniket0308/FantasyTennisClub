/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { Provider } from 'react-redux';
import { AuthNavigator, AuthNavigators, RootNavigator } from './navigation/navigation';
import { store } from './redux/store';
import messaging from '@react-native-firebase/messaging';
import PushNotificationService from './pushNotification/pushNotification';
import Snackbar from 'react-native-snackbar';

const App = () => {

  //Variable Used For Authentication
  const [isAuthentication, setIsAuthentication] = useState(true)
  const [, setRender] = useState()
  const [isMembership, setIsMembership] = useState()
  const [isLoading,setIsLoading]=useState(false)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@Token')
      if (value !== null) {
        // value previously stored
        setIsAuthentication(true)
        setRender({})
      } else {
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
      then((response) => response.json()).
      then((json) => {
        if (json.success == true) {
          setIsLoading(true)
        }
        setIsMembership(json?.data?.is_member)
      }).
      catch(e => {
        Snackbar.show({
          text: e.toString(),
          duration: 1000,
          backgroundColor: 'red',
          // action: {
          //   text: 'UNDO',
          //   textColor: 'green',
          //   onPress: () => { /* Do something. */ },
          // },
        });
        setIsLoading(false)
        console.log('What Is Error In Get Api', e)
      })
  }

  useEffect(() => {
    // checkMemberShip()
    // if (isAuthentication == true && isMembership==true) {
    // }
  }, [])

  useEffect(() => {
    getData()
  })

  useEffect(() => {
    const notification = new PushNotificationService()
    notification.configure()
    notification.createChannel()
    notification.getChannels()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    checkMemberShip()
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      {
        isAuthentication == true && isMembership==true
          ? <AuthNavigator />
          //For Checking Condition Keep Revert Condition
          : isAuthentication == true && isMembership == true
            ? <AuthNavigators />
            : <RootNavigator />
      }
    </Provider>
  );
}

export default App