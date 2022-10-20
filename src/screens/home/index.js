import React, { useEffect } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
import SplashScreen from "react-native-splash-screen";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import homeStyle from "./style";

//Home Screen
const Home = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
    }, [])

    return (
        <>
            <StatusBar backgroundColor={constants.colors.darkGreen} />
            <View style={[commonStyle.container, homeStyle.container]}>
                <Image source={constants.icons.logo} />
                <Text style={homeStyle.textReadyPlay}>Ready?? Play!!!</Text>
                <Text style={homeStyle.textTapEnter}>tap here to enter</Text>
                <Image source={constants.icons.downArrow} resizeMode='contain' />
                <TouchableOpacity
                    onPress={() => { utils.navigateTo(navigation, 'Dashboard') }}
                    activeOpacity={1}
                    style={homeStyle.tennisBall}>
                    <Image resizeMode="contain" source={constants.icons.tennisBall} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Home