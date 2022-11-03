import React, { useState } from "react";
import { Image, SafeAreaView, StatusBar, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, FloatingInput, Header } from "../../components";
import { changePassword, editProfile } from "../../redux/slice/profile";
import changePasswordStyle from "./style";

const ChangePassword = ({ route, navigation }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const dispatch =useDispatch()

    return (
        <View style={changePasswordStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: route.params == 'editProfile' ? '65%' : route.params == 'contactUs' ? '65%' : '75%' }}
                showBackArrow={true}
                title={route.params == 'editProfile' ? 'Edit Profile' : route.params == 'contactUs' ? 'Contact Us' : 'Change Password'}
                titleStyle={{ marginTop: 5, marginBottom: -3 }}
                onPressLeftIcon={() => navigation.goBack()}
            />

            <KeyboardAwareScrollView
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                bounces={false}
                style={[commonStyle.container, { backgroundColor: constants.colors.backGroundLight }]} >
                {route.params != 'contactUs'
                    && <Image
                        style={{ alignSelf: 'center', marginTop: 10, height: widthPercentageToDP(40), width: widthPercentageToDP(40) }}
                        source={constants.icons.profileImage}
                        resizeMode='contain'
                    />}
                {route.params == undefined
                    ? <>
                        <FloatingInput
                            headerText={'Old Password'}
                            textInputStyle={{ marginTop: 30 }}
                            onChangeText={(passwordTxt) => { setOldPassword(passwordTxt) }}
                            value={oldPassword}
                            autoCapitalize='none'
                            passwordInput={true}
                            secureTextEntry={true}
                        />
                        <FloatingInput
                            headerText={'New Password'}
                            textInputStyle={{ marginTop: 15 }}
                            onChangeText={(passwordTxt) => { setNewPassword(passwordTxt) }}
                            value={newPassword}
                            autoCapitalize='none'
                            passwordInput={true}
                            secureTextEntry={true}
                        />
                        <FloatingInput
                            headerText={'Confirm Password'}
                            textInputStyle={{ marginTop: 15 }}
                            onChangeText={(passwordTxt) => { setConfirmPassword(passwordTxt) }}
                            value={confirmPassword}
                            autoCapitalize='none'
                            passwordInput={true}
                            secureTextEntry={true}
                        />
                    </>
                    : route.params == 'contactUs'
                        ? <>
                            <FloatingInput
                                textInputStyle={{ marginTop: 30,flexGrow:3 }}
                                headerText={'Subject'}
                                onChangeText={(subject) => { setSubject(subject) }}
                                value={subject}
                            />
                            <FloatingInput
                                textInputStyle={{ marginTop: 30, height: 200}}
                                numberOfLines={3}
                                multiline={true}
                                headerText={'Text'}
                                onChangeText={(text) => { setText(text) }}
                                value={text}
                            />
                        </>
                        : <>
                            <FloatingInput
                                textInputStyle={{ marginTop: 30 }}
                                headerText={'Full Name'}
                                onChangeText={(nameTxt) => { setFullName(nameTxt) }}
                                value={fullName}
                            />
                            <FloatingInput
                                headerText={'Mobile Number'}
                                textInputStyle={{ marginTop: 15 }}
                                onChangeText={(mobileTxt) => { setMobileNumber(mobileTxt) }}
                                value={mobileNumber}
                                keyboardType='phone-pad'
                            />
                        </>
                }
                <Button
                    titleText={route.params == 'editProfile' ? 'Update' :route.params == 'contactUs'?'Send':'Update Password'}
                    btnStyle={{ marginTop: 30 }}
                    onPress={()=>{route.params == 'editProfile'?dispatch(editProfile({fullName,mobileNumber,navigation})):dispatch(changePassword({oldPassword,newPassword,confirmPassword,navigation}))}}
                />
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ChangePassword