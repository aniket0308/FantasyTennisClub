import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import CardWithImage from "../../components/cardWithImage";
import Loader from "../../components/loader";
import { isLoaderVisible, logout } from "../../redux/slice/auth";
import accountStyle from "./style";

//Account Screen
const Account = ({ navigation }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [, setRender] = useState({})
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const tempArr = ['My Memberships', 'Change password', 'Contact us', 'Member Notifications', 'About us', 'Logout']

    useEffect(() => {
        const willFocusSubscription = navigation.addListener("focus", () => setRender({}));
        return () => willFocusSubscription
    }, []);

    const getData = async () => {
        try {
            const nameValue = await AsyncStorage.getItem('@Name')
            const emailValue = await AsyncStorage.getItem('@Email')
            const mobileValue = await AsyncStorage.getItem('@MobileNumber')
            if (nameValue !== null && emailValue !== '' && mobileValue !== '') {
                // value previously stored
                setName(nameValue)
                setEmail(emailValue)
                setMobileNumber(mobileValue)
            } else {
                null
            }
        } catch (e) {
            // error reading value
            console.log('Error In Getting Item: r', e);
        }
    }

    useEffect(() => {
        getData()
    })

    return (
        <View style={accountStyle.mainContiner}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Text style={accountStyle.txtMemberAcc} >Member Account</Text>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={{ paddingBottom: 30 }}
            >
                <View style={[commonStyle.row, { justifyContent: 'space-between' }]}>
                    <View style={[commonStyle.column, { marginLeft: 10, marginTop: 10 }]}>
                        <Text style={accountStyle.txtName}>{name != '' ? name : 'Joanna Oleaga'}</Text>
                        <View style={[commonStyle.row, { marginVertical: 10 }]}>
                            <Image resizeMode='contain' style={accountStyle.img} source={constants.icons.mail} />
                            <Text numberOfLines={1} style={accountStyle.txtSmallName}>{email != '' ? email : ""}</Text>
                        </View>
                        <View style={[commonStyle.row, { marginTop: -5 }]}>
                            <Image resizeMode='contain' style={accountStyle.img} source={constants.icons.call} />
                            <Text style={accountStyle.txtSmallName}>+{mobileNumber != '' ? mobileNumber : '17133608496'}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => utils.navigateTo(navigation, constants.screens.changePassword, { editProfile: 'editProfile', name, mobileNumber, email })}
                            style={accountStyle.touchableEditPro}>
                            <Text style={{ alignSelf: 'center', color: constants.colors.white }} >Edit profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    {
                        tempArr.map((item, index) => {
                            return (
                                <CardWithImage
                                    // disabled={isLoading == false ? false : true}
                                    onPress={() => {
                                        item == 'Change password'
                                            ? utils.navigateTo(navigation, constants.screens.changePassword, 'changePassword')
                                            : item == 'About us'
                                                ? utils.navigateTo(navigation, constants.screens.aboutUs)
                                                : item == 'My Memberships'
                                                    ? utils.navigateTo(navigation, 'MyMembership', false)
                                                    : item == 'Member Notifications'
                                                        ? utils.navigateTo(navigation, constants.screens.notification)
                                                        : item == 'Contact us'
                                                            ? utils.navigateTo(navigation, constants.screens.changePassword, 'contactUs')
                                                            : null

                                        if (item == 'Logout') {
                                            setIsLoading(true)
                                            utils.callApi('api/v1/logout', { setIsLoading: setIsLoading }, 'logout')
                                        }
                                    }}
                                    containerStyle={{ marginBottom: 10, backgroundColor: item == 'Logout' ? constants.colors.darkBlue : constants.colors.cardColor }}
                                    titleStyle={{ color: item == 'Logout' ? constants.colors.white : constants.colors.black }}
                                    imgStyle={{ tintColor: item == 'Logout' ? constants.colors.white : constants.colors.grey }}
                                    title={item}
                                    rightIcon={constants.icons.whiteBackArrow}
                                />
                            )
                        })
                    }
                </View>
                {isLoading == true && <Loader />}
            </ScrollView>
        </View>
    )
}

export default Account