import React, { useState } from "react";
import { View, Text, StatusBar, Dimensions, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, FloatingInput, Header } from "../../components";
import Loader from "../../components/loader";
import { isLoaderVisible, registration } from "../../redux/slice/auth";
import signUpStyle from "./style";

//SignUp (Registration) Screen
const SignUp = ({ navigation }) => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [referral, setReferral] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state?.auth?.isLoading)

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
                    textIsEditable={!isLoading}
                    headerText={'Full Name'}
                    onChangeText={(nameTxt) => { setFullName(nameTxt) }}
                    value={fullName}
                />
                <FloatingInput
                    textIsEditable={!isLoading}
                    headerText={'E-mail'}
                    textInputStyle={{ marginTop: 15 }}
                    onChangeText={(emailTxt) => { setEmail(emailTxt) }}
                    value={email}
                    autoCapitalize='none'
                />
                <FloatingInput
                    textIsEditable={!isLoading}
                    headerText={'Mobile Number'}
                    textInputStyle={{ marginTop: 15 }}
                    onChangeText={(mobileTxt) => { setMobileNumber(mobileTxt) }}
                    value={mobileNumber}
                    keyboardType='phone-pad'
                />
                <FloatingInput
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
                <Button
                    disabled={isLoading == true ? true : false}
                    titleText='Sign Up'
                    btnStyle={{ marginTop: 50 }}
                    onPress={() => {
                        dispatch(isLoaderVisible())
                        dispatch(registration({ fullName, email, password, confirmPassword, mobileNumber, referral, dispatch }))
                    }}
                />
            </KeyboardAwareScrollView>
            {isLoading == true && <Loader />}
            <View style={signUpStyle.footer}>
                <Text style={signUpStyle.txtNewToFantasy} >Already have a Fantasy Tennis Club? </Text>
                <Text onPress={() => isLoading == false ? utils.navigateTo(navigation, constants.screens.login) : ''} style={signUpStyle.txtSignUp}>Login</Text>
            </View>
        </>
    )
}

export default SignUp