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
import { store } from './redux/store';
import PushNotificationService from './pushNotification/pushNotification';
import Snackbar from 'react-native-snackbar';
import { checkAuthentication, checkLoginStep, logout } from './redux/slice/auth';
import Routes from './navigation/route';

const App = ({ navigation }) => {

  //Variable Used For Authentication
  const [, setRender] = useState()
  const [isMembership, setIsMembership] = useState()
  const [isLoading, setIsLoading] = useState(false)

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
                    store.dispatch(logout())
      }
      return response.json()
      }).
      then(async (json) => {
          if (json?.success == true) {
            setIsLoading(true)
            await AsyncStorage.removeItem('@registerFirstTime')
            setIsMembership(json?.data?.is_member)
            store.dispatch(checkAuthentication({data:json.data,token}))
            setRender({})
          } else {
            // setIsAuthentication(false)
          }
      }).
      catch(e => {
        // Snackbar.show({
        //   text: e.toString(),
        //   duration: 1000,
        //   backgroundColor: 'red',
        // });
        setIsLoading(false)
        store.dispatch(checkAuthentication({data:null,token}))
        console.log('What Is Error In Get Api', e)
      })
  }
  useEffect(() => {
    let noti=new PushNotificationService()
    Platform.OS=='ios'&&noti.configure()
    async function checkAuthentication() {
      checkMemberShip()
    }
    checkAuthentication()
  }, [])
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}
export default App