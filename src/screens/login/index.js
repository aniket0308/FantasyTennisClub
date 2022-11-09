import React, { createRef, useEffect, useRef, useState } from "react";
import { Text, Image, Dimensions, StatusBar, SafeAreaView, View, Platform } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SplashScreen from 'react-native-splash-screen'
import { useDispatch, useSelector } from "react-redux";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, FloatingInput } from "../../components";
import Loader from "../../components/loader";
import { isLoaderVisible, login } from "../../redux/slice/auth";
import loginStyle from "./style";
import messaging, { firebase } from '@react-native-firebase/messaging';

//Login Screen
const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state?.auth?.isLoading)

    const firebaseConfig = {
        
        apiKey:Platform.OS=='android'?'AIzaSyAvDBtCBWZ8EJwxSW4NZ8cAM6EdY1yoGYo':'AIzaSyCjW60KSHYfQqQ4-7BnLUcxirp4PIgn6oo',
        authDomain: '',
        databaseURL: '',
        projectId: 'fantasy-tennis-club',
        storageBucket: 'fantasy-tennis-club.appspot.com',
        messagingSenderId: '684462950609',
        appId:Platform.OS=='android'?'1:684462950609:android:4438b48b5660b0435dddf0':"1:684462950609:ios:ff4c8918c7831b955dddf0"
    };
    const init = async () => {
        try {
            await firebase.initializeApp(firebaseConfig)
            console.log('Success Initialized');
        } catch (error) {
            console.log('error in initilization',error);
        }
    }
    useEffect(() => {
        // init()
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
    }, [])

    const getDeviceToken = async () => {
        try {
            const token = await messaging().getToken()
            return token
        } catch (error) {
            console.log('Error In Getting Device Token', error);
        }
    }

    return (
        <>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <KeyboardAwareScrollView
                scrollEnabled={false}
                contentContainerStyle={{ justifyContent: 'center', height: Dimensions.get('screen').height }}
                style={[commonStyle.container, loginStyle.container]} >
                <Image style={loginStyle.imgLogo} source={constants.icons.logo} />
                <FloatingInput
                    textIsEditable={!isLoading}
                    // refs={emailRef}
                    headerText={'E-mail'}
                    headerStyle={{ marginbottom: 20 }}
                    onChangeText={(emailTxt) => { setEmail(emailTxt) }}
                    value={email}
                    autoCapitalize='none'
                    blurOnSubmit={true}
                // onSubmitRef={() => passwordRef.current.focus()}
                />
                <FloatingInput
                    textIsEditable={!isLoading}
                    // refs={passwordRef}
                    headerText={'password'}
                    textInputStyle={{ marginTop: 15 }}
                    secureTextEntry={isPasswordVisible}
                    passwordInput={true}
                    hideIcon={true}
                    onChangeText={(passwordTxt) => { setPassword(passwordTxt) }}
                    value={password}
                    isTextIncluded={true}
                    labelTextIncluded='Forgot your password?'
                    onTxtPress={() => isLoading == false ? navigation.navigate(constants.screens.forgotPassword) : ''}
                    onHideShow={() => setIsPasswordVisible(!isPasswordVisible)}
                    autoCapitalize='none'
                />
                <Button
                    disabled={isLoading}
                    titleText='Login'
                    btnStyle={{ marginTop: 34 }}
                    onPress={async() => {
                        // init()
                        // const deviceToken=await getDeviceToken()
                        const deviceToken=0
                        dispatch(isLoaderVisible())
                        dispatch(login({ email, password,deviceToken, dispatch }))
                    }}
                />
                <SafeAreaView />
            </KeyboardAwareScrollView>
            <View style={loginStyle.footer}>
                <Text style={loginStyle.txtNewToFantasy} >New to Fantasy Tennis Club? </Text>
                <Text onPress={() => isLoading == false ? navigation.navigate(constants.screens.signUp) : ''} style={loginStyle.txtSignUp}>Sign Up</Text>
            </View>
            {isLoading == true && <Loader />}
        </>
    )
}

export default Login