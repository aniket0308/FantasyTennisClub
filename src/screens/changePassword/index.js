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
import { changePassword, editProfile, sendInquiry } from "../../redux/slice/profile";
import changePasswordStyle from "./style";

const ChangePassword = ({ route, navigation }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fullName, setFullName] = useState(route.params.name)
    const [mobileNumber, setMobileNumber] = useState(route.params.mobileNumber)
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state?.auth?.isLoading)

    return (
        <View style={changePasswordStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: route.params.editProfile == 'editProfile' ? '65%' : route.params == 'contactUs' ? '65%' : '78%' }}
                showBackArrow={true}
                title={route.params.editProfile == 'editProfile' ? 'Edit Profile' : route.params == 'contactUs' ? 'Contact Us' : 'Change Password'}
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
                {route.params == 'changePassword'
                    ? <>
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
                    : route.params == 'contactUs'
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
                            <FloatingInput
                                textIsEditable={!isLoading}
                                textInputStyle={{ marginTop: 30 }}
                                headerText={'Full Name'}
                                onChangeText={(nameTxt) => { setFullName(nameTxt) }}
                                value={fullName}
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
                    titleText={route.params.editProfile == 'editProfile' ? 'Update' : route.params == 'contactUs' ? 'Send' : 'Update Password'}
                    btnStyle={{ marginTop: 30 }}
                    onPress={() => {
                        if (route.params.editProfile == 'editProfile') {
                            dispatch(isLoaderVisible())
                            dispatch(editProfile({ fullName, mobileNumber, navigation, dispatch }))
                        }else if(route.params=='contactUs'){
                            dispatch(isLoaderVisible())
                            dispatch(sendInquiry({ subject, text, dispatch }))
                            
                        }
                         else {
                            dispatch(isLoaderVisible())
                            dispatch(changePassword({ oldPassword, newPassword, confirmPassword, navigation, dispatch }))
                        }
                    }}
                />
            </KeyboardAwareScrollView>
        </View>
    )
}

export default ChangePassword