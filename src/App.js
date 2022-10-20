/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Provider } from 'react-redux';
import { AuthNavigator, RootNavigator } from './navigation/navigation';
import { store } from './redux/store';

const App = () => {
  const isAuthenticate = true
  return (
    <Provider store={store}>
      {
        isAuthenticate == true
          ? <AuthNavigator />
          : <RootNavigator />
      }
    </Provider>
  );
}

export default App