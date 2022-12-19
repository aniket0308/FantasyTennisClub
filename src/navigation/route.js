/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { constants } from '../common/constant';
import Loader from '../components/loader';
import { store } from '../redux/store';
import { AuthNavigator, RegisterFirstTime, RootNavigator } from './navigation';


const Routes = () => {
    const userData = useSelector((state) => state.auth)

    if(userData?.logedIn==false){
    return (
        <View style={{backgroundColor:constants.colors.darkGreen,flex:1}}>
            <Loader/>
        </View>
    )
        }else{
            return(
                userData.token == null
                    ? <RootNavigator />
                    : userData?.isRegisteredFirstTime==false && userData?.token != null
                        ? <AuthNavigator />
                        : userData?.token != null && userData?.isRegisteredFirstTime == true
                        && <RegisterFirstTime />
            )
        }
                
}

export default Routes