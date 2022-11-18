import React, { useState } from "react";
import { Image, SafeAreaView, StatusBar, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, FloatingInput, Header } from "../../components";
import Loader from "../../components/loader";
import { isLoaderVisible } from "../../redux/slice/auth";
import { changePassword, editProfile, resetPassword, sendInquiry } from "../../redux/slice/profile";
import forgotPasswordStyle from "../forgetPassword/style";
import changePasswordStyle from "./style";

const ChangePassword = ({ route, navigation }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fullName, setFullName] = useState(route?.params?.name)
    const [mobileNumber, setMobileNumber] = useState(route?.params?.mobileNumber)
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const [email, setEmail] = useState(route?.params?.email)
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state?.auth?.isLoading)

    const clearAllData = () => {
        setText('')
        setSubject('')
    }

    return (
        <View style={changePasswordStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: route?.params?.editProfile == 'editProfile' ? '65%' : route?.params == 'contactUs' ? '65%' : route?.params == 'changePassword' ? '78%' : '75%' }}
                showBackArrow={true}
                title={route?.params?.editProfile == 'editProfile' ? 'Edit Profile' : route?.params == 'contactUs' ? 'Contact Us' : route?.params == 'changePassword' ? 'Change Password' : 'Reset Password'}
                titleStyle={{ marginTop: 5, marginBottom: -3 }}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                bounces={false}
                style={[commonStyle.container, { backgroundColor: constants.colors.backGroundLight }]} >
                {route?.params != 'contactUs'
                    && <></>}
                {route?.params == 'changePassword'
                    ? <>
                        <Image style={forgotPasswordStyle.imgLogo} source={constants.icons.logo} />
                        <FloatingInput
                            textIsEditable={!isLoading}
                            headerText={'Old Password'}
                            textInputStyle={{ marginTop: 30 }}
                            onChangeText={(passwordTxt) => { setOldPassword(passwordTxt) }}
                            value={oldPassword}
                            autoCapitalize='none'
                            passwordInput={true}
                            secureTextEntry={true}
                        />
                        <FloatingInput
                            textIsEditable={!isLoading}
                            headerText={'New Password'}
                            textInputStyle={{ marginTop: 15 }}
                            onChangeText={(passwordTxt) => { setNewPassword(passwordTxt) }}
                            value={newPassword}
                            autoCapitalize='none'
                            passwordInput={true}
                            secureTextEntry={true}
                        />
                        <FloatingInput
                            textIsEditable={!isLoading}
                            headerText={'Confirm Password'}
                            textInputStyle={{ marginTop: 15 }}
                            onChangeText={(passwordTxt) => { setConfirmPassword(passwordTxt) }}
                            value={confirmPassword}
                            autoCapitalize='none'
                            passwordInput={true}
                            secureTextEntry={true}
                        />
                    </>
                    : route?.params?.name == 'forgotPassword'
                        ? <>
                            <Image style={forgotPasswordStyle.imgLogo} source={constants.icons.logo} />
                            <FloatingInput
                                textIsEditable={!isLoading}
                                headerText={'New Password'}
                                textInputStyle={{ marginTop: 15 }}
                                onChangeText={(passwordTxt) => { setNewPassword(passwordTxt) }}
                                value={newPassword}
                                autoCapitalize='none'
                                passwordInput={true}
                                secureTextEntry={true}
                            />
                            <FloatingInput
                                textIsEditable={!isLoading}
                                headerText={'Confirm Password'}
                                textInputStyle={{ marginTop: 15 }}
                                onChangeText={(passwordTxt) => { setConfirmPassword(passwordTxt) }}
                                value={confirmPassword}
                                autoCapitalize='none'
                                passwordInput={true}
                                secureTextEntry={true}
                            />
                        </>
                        : route?.params == 'contactUs'
                            ? <>
                                <FloatingInput
                                    textInputStyle={{ marginTop: 30, flexGrow: 3 }}
                                    headerText={'Subject'}
                                    onChangeText={(subject) => { setSubject(subject) }}
                                    value={subject}
                                />
                                <FloatingInput
                                    textInputStyle={{ marginTop: 30, height: 200 }}
                                    numberOfLines={3}
                                    multiline={true}
                                    headerText={'Text'}
                                    onChangeText={(text) => { setText(text) }}
                                    value={text}
                                />
                            </>
                            : <>
                                <Image style={forgotPasswordStyle.imgLogo} source={constants.icons.logo} />
                                <FloatingInput
                                    textIsEditable={!isLoading}
                                    headerText={'Full Name'}
                                    onChangeText={(nameTxt) => { setFullName(nameTxt) }}
                                    value={fullName}
                                />
                                <FloatingInput
                                    textIsEditable={!isLoading}
                                    textInputStyle={{ marginTop: 15 }}
                                    headerText={'E-Mail'}
                                    onChangeText={(emailTxt) => { setEmail(emailTxt) }}
                                    value={email}
                                />
                                <FloatingInput
                                    textIsEditable={!isLoading}
                                    headerText={'Mobile Number'}
                                    textInputStyle={{ marginTop: 15 }}
                                    onChangeText={(mobileTxt) => { setMobileNumber(mobileTxt) }}
                                    value={mobileNumber}
                                    keyboardType='phone-pad'
                                />
                            </>
                }
                {isLoading == true && <Loader />}
                <Button
                    disabled={isLoading == true ? true : false}
                    titleText={route?.params?.editProfile == 'editProfile' ? 'Update' : route?.params == 'contactUs' ? 'Send' : 'Update Password'}
                    btnStyle={{ marginTop: 30 }}
                    onPress={() => {
                        if (route?.params?.editProfile == 'editProfile') {
                            dispatch(isLoaderVisible())
                            dispatch(editProfile({ fullName, mobileNumber,email, navigation, dispatch }))
                        } else if (route?.params == 'contactUs') {
                            dispatch(isLoaderVisible())
                            dispatch(sendInquiry({ subject, text, dispatch, clearAllData }))
                        } else if (route?.params?.name == 'forgotPassword') {
                            dispatch(isLoaderVisible())
                            dispatch(resetPassword({ email: route?.params?.email, newPassword, confirmPassword, navigation, dispatch }))
                        }
                        else {
                            dispatch(isLoaderVisible())
                            dispatch(changePassword({ oldPassword, newPassword, confirmPassword, navigation, clearAllData, dispatch }))
                        }
                    }}
                />
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ChangePassword