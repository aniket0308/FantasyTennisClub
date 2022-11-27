import React, { createRef, useEffect, useRef, useState } from "react";
import { Text, Image, Dimensions, StatusBar, SafeAreaView, View, Platform, TouchableOpacity } from 'react-native'
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
import forgotPasswordStyle from "../forgetPassword/style";
console.log(firebase.app.length);

//Login Screen
const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [deviceToken, setDeviceToken] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)
    const platform = Platform.OS == 'android' ? 'android' : 'ios'
    const dispatch = useDispatch()
    const [isLoading,setIsLoading]=useState(false)
    const requestUserPermission = async () => {
        try {
            const token = await messaging().getToken()
            if (token) {
                setDeviceToken(token)
            }
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log('Authorization status:', authStatus);
            }
        } catch (error) {
            console.log('WERROR', error);
        }
    }
    useEffect(() => {
        requestUserPermission()
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
    }, [])

    return (
        <>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <KeyboardAwareScrollView
                scrollEnabled={false}
                contentContainerStyle={{ justifyContent: 'center', height: Dimensions.get('screen').height }}
                style={[commonStyle.container, loginStyle.container]} >
                <Image style={forgotPasswordStyle.imgLogo} resizeMode='contain' source={constants.icons.logo} />
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
                    headerText={'Password'}
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
                    onPress={async () => {
                        setIsLoading(true)
                        dispatch(login({ email, password, deviceToken, platform, dispatch,setIsLoading }))
                    }}
                />
                <SafeAreaView />
            </KeyboardAwareScrollView>
            <View style={loginStyle.footer}>
                <Text style={loginStyle.txtNewToFantasy} >New to Fantasy Tennis Club? </Text>
                <TouchableOpacity onPress={() => isLoading == false ? navigation.navigate(constants.screens.signUp) : ''}>
                <Text style={loginStyle.txtSignUp}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            {isLoading == true && <Loader />}
        </>
    )
}

export default Login