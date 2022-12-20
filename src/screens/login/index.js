import React, { createRef, useEffect, useRef, useState } from "react";
import { Text, Image, Dimensions, StatusBar, SafeAreaView, View, Platform, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SplashScreen from 'react-native-splash-screen'
import { useDispatch, useSelector } from "react-redux";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, FloatingInput } from "../../components";
import Loader from "../../components/loader";
import { checkLoginStep, isLoaderVisible, login } from "../../redux/slice/auth";
import loginStyle from "./style";
import messaging, { firebase } from '@react-native-firebase/messaging';
import forgotPasswordStyle from "../forgetPassword/style";
import { store } from "../../redux/store";
import PushNotificationService from "../../pushNotification/pushNotification";
import { utils } from "../../common";
import PushNotification from "react-native-push-notification";
console.log(firebase.app.length);

//Login Screen
const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [deviceToken, setDeviceToken] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)
    const platform = Platform.OS == 'android' ? 'android' : 'ios'
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const configure = () => {
        try {
            PushNotification.configure({
                // (optional) Called when Token is generated (iOS and Android)
                onRegister: function (token) {
                    console.log("TOKEN:", token);
                },

                // (required) Called when a remote is received or opened, or local notification is opened
                onNotification: function (notification) {
                    // process the notification
                    // Handle notification click
                    if (notification.userInteraction) {
                         if(notification?.data?.notification_type == 'MEMBER') {
                            utils.navigateTo(navigation,constants.screens.notification)
                        }else{
                            utils.navigateTo(navigation,constants.screens.announcements)
                        }
                      }
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData);
                },

                // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
                onAction: function (notification) {
                    console.log("ACTION:", notification.action);
                    console.log("NOTIFICATION: ", notification);

                    // process the action
                },

                // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
                onRegistrationError: function (err) {
                    console.error(err.message, err);
                },

                // IOS ONLY (optional): default: all - Permissions to register.
                permissions: {
                    alert: true,
                    badge: true,
                    sound: true,
                },

                // Should the initial notification be popped automatically
                // default: true
                popInitialNotification: true,

                /**
                 * (optional) default: true
                 * - Specified if permissions (ios) and token (android and ios) will requested or not,
                 * - if not, you must call PushNotificationsHandler.requestPermissions() later
                 * - if you are not using remote notification or do not have Firebase installed, use this:
                 *     requestPermissions: Platform.OS === 'ios'
                 */
                requestPermissions: true,
            })
        } catch (error) {
            console.log('Error:', error);
        }
    }

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
        const notification = new PushNotificationService()
        configure()
        notification.createChannel()
        requestUserPermission()
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('Message handled in the Foregorund!', remoteMessage);
            notification.localNotification({ title: remoteMessage?.notification?.title, body: remoteMessage?.notification.body, image: remoteMessage?.notification.android.imageUrl })
        });
        return unsubscribe
    }, [])

    return (
        <>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <View style={{ paddingVertical: 10, backgroundColor: constants.colors.backGroundLight }} >
            </View>
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
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
                        const loginObj = {
                            email: email,
                            password: password,
                            device_token: deviceToken,
                            platform: Platform,
                            setIsLoading: setIsLoading
                        }
                        //calling Api For Login
                        utils.callApi('api/login', loginObj, 'login', dispatch)
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