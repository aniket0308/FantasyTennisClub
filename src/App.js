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
import { AuthNavigator, RootNavigator } from './navigation/navigation';
import { store } from './redux/store';

const App = () => {

  //Variable Used For Authentication
  const [isAuthentication, setIsAuthentication] = useState(true)
  const [,setRender]=useState()
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
  

  useEffect(()=>{
    getData()
  })

  return (
    <Provider store={store}>
      {
        isAuthentication == true
          ? <AuthNavigator />
          : <RootNavigator />
      }
    </Provider>
  );
}

export default App