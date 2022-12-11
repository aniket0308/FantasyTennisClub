import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Button } from "../../components";

const PaymentConfirmation = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isMembership, setIsMembership] = useState()
    const [, setRender] = useState({})

    console.log('check ismembership', isMembership);
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
            then(async (response) => {
                if (response.status == 401) {
                    await AsyncStorage.clear()
                }
                return response.json()
            }).
            then(async (json) => {
                if (json?.success == true) {
                    setIsLoading(true)
                    await AsyncStorage.removeItem('@RegisterFirstTIme')
                    setIsMembership(json?.data?.is_member)
                    setRender({})
                } else {
                    setIsAuthentication()
                }
            }).
            catch(e => {
                // Snackbar.show({
                //   text: e.toString(),
                //   duration: 1000,
                //   backgroundColor: 'red',
                // });
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
    }

    useEffect(() => {
        checkMemberShip()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: constants.colors.backGroundLight }}>
            {
                route.params?.success == false
                && <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ position: 'absolute', top: 0, left: 0, padding: 30 }}>
                    <Image
                        style={{ height: widthPercentageToDP(6), width: widthPercentageToDP(6), tintColor: '#1D7A48' }}
                        source={constants.icons.backArrow}
                    />
                </TouchableOpacity>
            }
            <Image source={route.params?.success == true ? constants.icons.paymentSuccess : constants.icons.paymentFailed} style={{ height: widthPercentageToDP(30), width: widthPercentageToDP(30) }} resizeMode='contain' />
            <Text style={{ color: 'black', fontSize: 24, fontWeight: '600', fontFamily: constants.fonts.notoSansRegular }}>{route.params?.success == true ? 'Payment Successfull' : 'Payment Failed'}</Text>
            <Text style={{ color: 'black', fontSize: 14, fontWeight: '600', fontFamily: constants.fonts.nuntinoRegular, textAlign: 'center' }}>{route.params?.message}</Text>
            <Button
                onPress={() => route.params?.success == true ? navigation.navigate(isMembership == true ? 'Dashboard' : 'Home') : navigation.goBack()}
                btnStyle={{ marginVertical: 30 }}
                titleText={route.params?.success == true ? 'Next' : 'Enter Payment'}
            />
        </View>
    )
}

export default PaymentConfirmation