import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Dimensions, SafeAreaView, Platform, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, FloatingInput, Header } from "../../components";
import Loader from "../../components/loader";
import { isLoaderVisible, registration } from "../../redux/slice/auth";
import signUpStyle from "./style";
import messaging, { firebase } from '@react-native-firebase/messaging';
import Snackbar from "react-native-snackbar";
import { widthPercentageToDP } from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

//SignUp (Registration) Screen
const SignUp = ({ navigation }) => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [referral, setReferral] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [deviceToken, setDeviceToken] = useState('')
    const dispatch = useDispatch()
    const [isLoading,setIsLoading]=useState(false)
    const platform = Platform.OS == 'android' ? 'android' : 'ios'
    const platform_info={
        version:Platform.Version,
        device:Platform.OS=='android'?Platform.constants.Model:''
    }
    // const isLoading = useSelector((state) => state?.auth?.isLoading)

    const validateForm = () => {
        let obj = {}
        if (mobileNumber.length < 4) {
            obj.error = true
            Snackbar.show({
                text: 'Minimum 4 characters required',
                duration: 1000,
                backgroundColor: 'red',
            })
            setIsLoading(false)
        } else {
            obj.error = false
        }
        return obj
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
        requestUserPermission()
    }, [])

    return (
        <>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView style={{ backgroundColor: constants.colors.backGroundLight }} />
            <Header
                title='Become a Member'
                subTitle='Complete your details below'
                showBackArrow={false}
                mainViewHeaderStyle={{ paddingLeft: 35 }}
            />
            <KeyboardAwareScrollView
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                bounces={false}
                style={[commonStyle.container, signUpStyle.container]} >
                <FloatingInput
                    mandatoryField={true}
                    textIsEditable={!isLoading}
                    headerText={'Full Name'}
                    onChangeText={(nameTxt) => { setFullName(nameTxt) }}
                    value={fullName}
                />
                <FloatingInput
                    mandatoryField={true}
                    textIsEditable={!isLoading}
                    headerText={'E-mail'}
                    textInputStyle={{ marginTop: 15 }}
                    onChangeText={(emailTxt) => { setEmail(emailTxt) }}
                    value={email}
                    autoCapitalize='none'
                />
                <FloatingInput
                    mandatoryField={true}
                    textIsEditable={!isLoading}
                    headerText={'Mobile Number'}
                    textInputStyle={{ marginTop: 15 }}
                    onChangeText={(mobileTxt) => { setMobileNumber(mobileTxt) }}
                    value={mobileNumber}
                    keyboardType='phone-pad'
                    maxLength={15}
                />
                <FloatingInput
                mandatoryField={true}
                    textIsEditable={!isLoading}
                    headerText={'Password'}
                    textInputStyle={{ marginTop: 15 }}
                    onChangeText={(passwordTxt) => { setPassword(passwordTxt) }}
                    value={password}
                    autoCapitalize='none'
                    passwordInput={true}
                    secureTextEntry={true}
                />
                <FloatingInput
                    mandatoryField={true}
                    textIsEditable={!isLoading}
                    headerText={'Confirm password'}
                    textInputStyle={{ marginTop: 15 }}
                    onChangeText={(confirmPasswordTxt) => { setConfirmPassword(confirmPasswordTxt) }}
                    value={confirmPassword}
                    autoCapitalize='none'
                    passwordInput={true}
                    secureTextEntry={true}
                />
                <FloatingInput
                    textIsEditable={!isLoading}
                    headerText={'Referral'}
                    textInputStyle={{ marginTop: 15 }}
                    onChangeText={(referralTxt) => { setReferral(referralTxt) }}
                    value={referral}
                    autoCapitalize='none'
                />
                <Text style={{ marginVertical: 5, color: 'red', fontWeight: '600', marginLeft: widthPercentageToDP(10),fontSize:10 }}>*Mandatory Field</Text>
                <Button
                    disabled={isLoading == true ? true : false}
                    titleText='Sign Up'
                    btnStyle={{ marginTop: 50 }}
                    onPress={async() => {
                        setIsLoading(true)
                        const isValidate=validateForm()
                        if(isValidate.error==false){
                            const registerObj = {
                                name: fullName,
                                email: email,
                                mobile_number: mobileNumber,
                                password: password,
                                confirm_password: confirmPassword,
                                referral: referral,
                                navigation: navigation,
                                device_token: deviceToken,
                                platform: platform,
                                setIsLoading,
                                platform_info
                            }
                            //calling Api For Login
                            utils.callApi('api/register', registerObj, 'Registered')
                        }
                    }}
                />
            </KeyboardAwareScrollView>
            {isLoading == true && <Loader />}
            <View style={signUpStyle.footer}>
                <Text style={signUpStyle.txtNewToFantasy} >Already have a Fantasy Tennis Club? </Text>
                <TouchableOpacity onPress={() =>  utils.navigateTo(navigation, constants.screens.login)} >
                    <Text style={signUpStyle.txtSignUp}>Login</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default SignUp