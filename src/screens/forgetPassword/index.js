import React, { useState } from "react";
import { View, Text, StatusBar, SafeAreaView, Dimensions, Image } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, FloatingInput, Header } from "../../components";
import forgotPasswordStyle from "./style";

//Forgot Password Screen
const ForgotPassword = ({ navigation }) => {

    const [email,setEmail]=useState('')

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
                    title='Forgot Password'
                    titleStyle={{fontSize:25,marginTop:10}}
                    mainViewHeaderStyle={{width:widthPercentageToDP(75)}}
                    showBackArrow={true}
                    onPressLeftIcon={()=>navigation.goBack()}
                />
                <Image style={forgotPasswordStyle.imgLogo} source={constants.icons.logo} />
                <FloatingInput
                    headerText={'E-mail'}
                    textInputStyle={{ marginTop: 15 }}
                    onChangeText={(emailTxt) => { setEmail(emailTxt) }}
                    value={email}
                    autoCapitalize='none'
                />
                <Button
                titleText='Reset'
                btnStyle={{marginTop:100}}
                />
            </KeyboardAwareScrollView>
        </>
    )
}

export default ForgotPassword