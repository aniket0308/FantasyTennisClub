import React, { useState } from "react";
import { StatusBar, SafeAreaView, Dimensions, Image, View } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Button, FloatingInput, Header } from "../../components";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import forgotPasswordStyle from "../forgetPassword/style";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { isLoaderVisible, verifyOtp } from "../../redux/slice/auth";
import Loader from "../../components/loader";
import verificationStyle from "./style";

//OtpVerification Screen
const OtpVerification = ({ navigation, route }) => {

    const [otp, setOtp] = useState()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.auth.isLoading)

    return (
        <>
            <StatusBar backgroundColor={constants.colors.backGroundLight} />
            <SafeAreaView style={{ backgroundColor: constants.colors.backGroundLight }} />
            <KeyboardAwareScrollView
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{ height: Dimensions.get('screen').height }}
                style={[commonStyle.container, forgotPasswordStyle.container]} >
                <Header
                    title='Enter Temporary Code'
                    titleStyle={{ fontSize: 25, marginTop: 10 }}
                    mainViewHeaderStyle={{ width: widthPercentageToDP(85) }}
                    showBackArrow={true}
                    onPressLeftIcon={() => navigation.goBack()}
                />
                <Image style={forgotPasswordStyle.imgLogo} resizeMode='contain' source={constants.icons.logo} />
                <View style={{flex:1,justifyContent:'center'}}>
                <OTPInputView
                    style={{ width: '80%', height: widthPercentageToDP(20), alignSelf: 'center' }}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={{ width: widthPercentageToDP(16), fontSize: widthPercentageToDP(5), color: constants.colors.darkGreen, borderBottomWidth: 1, borderBottomColor: constants.colors.darkGreen, borderColor: constants.colors.backGroundLight }}
                    onCodeFilled={(code) => {
                        setOtp(code)
                    }}
                    pinCount={4} />
                <Button
                    disabled={isLoading}
                    onPress={() => {
                        dispatch(isLoaderVisible())
                        dispatch(verifyOtp({ otp: otp, email: route?.params?.email, navigation, dispatch }))
                    }}
                    titleText='Verify'
                    btnStyle={{ marginTop: 100 }}
                />
                </View>
            </KeyboardAwareScrollView>
            {isLoading == true && <Loader />}
        </>
    )
}

export default OtpVerification