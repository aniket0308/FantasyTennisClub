import React, { createRef, useEffect, useRef, useState } from "react";
import { Text, Image, Dimensions, StatusBar, SafeAreaView, View } from 'react-native'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SplashScreen from 'react-native-splash-screen'
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, FloatingInput } from "../../components";
import { AuthNavigator } from "../../navigation/navigation";
import loginStyle from "./style";

//Login Screen
const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)

    // const emailRef = useRef('');
    // const passwordRef = useRef('');

    useEffect(() => {
        SplashScreen.hide();
    }, [])

    return (
        <>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <KeyboardAwareScrollView
                scrollEnabled={false}
                contentContainerStyle={{ justifyContent: 'center', height: Dimensions.get('screen').height }}
                style={[commonStyle.container, loginStyle.container]} >
                <Image style={loginStyle.imgLogo} source={constants.icons.logo} />
                <FloatingInput
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
                    // refs={passwordRef}
                    headerText={'password'}
                    textInputStyle={{ marginTop: 15 }}
                    secureTextEntry={isPasswordVisible}
                    passwordInput={true}
                    hideIcon={true}
                    onChangeText={(passwordTxt) => { setPassword(passwordTxt) }}
                    value={password}
                    isTextIncluded={true}
                    labelTextIncluded='Forgot your password?'
                    onTxtPress={() => navigation.navigate(constants.screens.forgotPassword)}
                    onHideShow={() => setIsPasswordVisible(!isPasswordVisible)}
                    autoCapitalize='none'
                />
                <Button
                    titleText='Login'
                    btnStyle={{ marginTop: 34 }}
                    onPress={() => {
                        alert("hi")
                        return <AuthNavigator />
                    }}
                />
                <SafeAreaView />
            </KeyboardAwareScrollView>
            <View style={loginStyle.footer}>
                <Text style={loginStyle.txtNewToFantasy} >New to Fantasy Tennis Club? </Text>
                <Text onPress={() => navigation.navigate(constants.screens.signUp)} style={loginStyle.txtSignUp}>Sign Up</Text>
            </View>
        </>
    )
}

export default Login