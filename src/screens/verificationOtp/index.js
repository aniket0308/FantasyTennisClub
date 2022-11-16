import React, { useState } from "react";
import { View, Text, StatusBar, SafeAreaView, Dimensions, Image } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Button, FloatingInput, Header } from "../../components";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import forgotPasswordStyle from "../forgetPassword/style";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useDispatch } from "react-redux";
import { verifyOtp } from "../../redux/slice/auth";

//OtpVerification Screen
const OtpVerification = ({ navigation ,route}) => {

    const [otp, setOtp] = useState()
    const dispatch=useDispatch()

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
                    title='Otp Verification'
                    titleStyle={{ fontSize: 25, marginTop: 10 }}
                    mainViewHeaderStyle={{ width: widthPercentageToDP(75) }}
                    showBackArrow={true}
                    onPressLeftIcon={() => navigation.goBack()}
                />
                <Image style={forgotPasswordStyle.imgLogo} source={constants.icons.logo} />
                <OTPInputView
                    style={{ width: '80%', height: 200, alignSelf: 'center' }}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={{ fontSize:widthPercentageToDP(5),color:constants.colors.darkGreen,borderBottomWidth: 1, borderBottomColor: constants.colors.darkGreen, borderColor: constants.colors.backGroundLight }}
                    onCodeFilled={(code) => {
                        console.log(typeof code);
                       setOtp(parseInt(code)) 
                    }}
                    pinCount={4} />
                <Button
                    onPress={() => {
                        console.log(typeof otp);
                      dispatch(verifyOtp({otp:parseInt(otp),email:route?.params?.email,navigation,dispatch}))
                    }}
                    titleText='Update Password'
                    btnStyle={{ marginTop: 100 }}
                />
            </KeyboardAwareScrollView>
        </>
    )
}

export default OtpVerification