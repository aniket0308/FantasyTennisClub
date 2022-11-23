import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
import { widthPercentageToDP } from "react-native-responsive-screen";
import SplashScreen from "react-native-splash-screen";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import homeStyle from "./style";

//Home Screen
const Home = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [isMembership, setIsMembership] = useState(false)

    useEffect(() => {
        checkMemberShip()
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
    }, [])

    const checkMemberShip = async () => {
        const token = await AsyncStorage.getItem('@Token')
        //calling api for Checking Membership
        fetch('https://fantasytennisclub.com/admin/api/v1/membership/check', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }).
            then((response) => response.json()).
            then((json) => {
                if (json.success == true) {
                    setIsLoading(true)
                }
                setIsMembership(json?.data?.is_member)
            }).
            catch(e => {
                Snackbar.show({
                    text: e.toString(),
                    duration: 1000,
                    backgroundColor: 'red',
                    // action: {
                    //   text: 'UNDO',
                    //   textColor: 'green',
                    //   onPress: () => { /* Do something. */ },
                    // },
                });
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
    }

    return (
        <>
            <StatusBar backgroundColor={constants.colors.darkGreen} />
            <View style={[commonStyle.container, homeStyle.container]}>
                <Image source={constants.icons.logo} resizeMode='contain' style={{ width: widthPercentageToDP(60), height: widthPercentageToDP(60) }} />
                <Text style={homeStyle.textReadyPlay}>Ready?? Play!!!</Text>
                <Text style={homeStyle.textTapEnter}>tap here to enter</Text>
                <Image source={constants.icons.downArrow} style={{height:widthPercentageToDP(20)}} resizeMode='contain' />
                <TouchableOpacity
                    disabled={isLoading == false ? true : false}
                    onPress={() => { utils.navigateTo(navigation,isMembership==true?'Dashboard':'MyMembership') }}
                    activeOpacity={1}
                    style={homeStyle.tennisBall}>
                    <Image resizeMode="contain" style={{ height: widthPercentageToDP(15), width: widthPercentageToDP(15) }} source={constants.icons.tennisBall} />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Home