import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import React, { useEffect, useState } from "react";
import { Alert, Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import PushNotification from "react-native-push-notification";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import { getDays } from "../../redux/slice/auth";
import selectionDayStyle from "./style";

//SelectionDays Screen
const SelectionDays = ({ route, navigation }) => {

    const [myPicks, setMyPicks] = useState('')
    const [days, setDays] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    function reverseArr() {
        var ret = new Array;
        for (var i = days?.data?.days.length - 1; i >= 0; i--) {
            ret.push(days?.data?.days[i]);
        }
        return ret;
    }
    const reverseDays = reverseArr()

    const getDays = async () => {
        const token = await AsyncStorage.getItem('@Token')
        utils.callApiGet(`api/v1/member-dashboard`, { setIsLoading, setDays, token })
    }

    useEffect(() => {
        getDays()
    }, [])

    useEffect(() => {
        if (route?.params != undefined) {
            const { passData } = route?.params
            if (passData) {
                setMyPicks(passData)
            } else if (!passData) {
                setMyPicks(route?.params)
            }
        }
    }, [route?.params])
    return (
        <View style={selectionDayStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                showBackArrow={true}
                title={myPicks == 'MY PICKS' ? 'My Picks' : 'Selection Days'}
                titleStyle={{ fontSize: 22, marginTop: 10 }}
                viewHeaderStyle={{ width: '100%' }}
                rightIcon={constants.icons.shapeBell}
                checkLength={true}
                rightIconStyle={{ height: widthPercentageToDP(6), width: widthPercentageToDP(6), marginTop: -10 }}
                onPressRightIcon={async () => {
                    const token = await AsyncStorage.getItem('@Token')
                    utils.callApi('api/v1/announcements/member/read-all', { token }, 'allNotificationRead')
                    if (Platform.OS == 'ios') {
                        PushNotificationIOS.getApplicationIconBadgeNumber(number => {
                            console.log('what is number beta incrementer', number);
                            PushNotificationIOS.setApplicationIconBadgeNumber(0);
                        });
                    } else {
                        PushNotification.getApplicationIconBadgeNumber(n => {
                            PushNotification.setApplicationIconBadgeNumber(0)
                        })
                    }
                    utils.navigateTo(navigation, constants.screens.notification)
                }
                }
                onPressLeftIcon={() => navigation.goBack()}
            />
            {isLoading == false
                ? <Loader />
                : <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, justifyContent: 'center' }} style={{ marginBottom: 25 }} bounces={false}>
                    <View style={selectionDayStyle.touchableMainView}>
                        {days?.data?.days?.length > 0
                            && reverseDays?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() =>
                                            item?.alert_message && myPicks != 'MY PICKS'
                                                ? Alert.alert(
                                                    "Fantasy Tennis Club",
                                                    item?.alert_message,
                                                )
                                                : utils.navigateTo(navigation, item?.is_lock_form == 1 && myPicks != 'MY PICKS'
                                                    ? 'LockedScreen'
                                                    : route.params == undefined
                                                        ? constants.screens.dayPick
                                                        : constants.screens.myPicks,
                                                    item?.is_lock_form == 1
                                                        ? { item, tournament_day: item?.id }
                                                        : { item })
                                        }
                                        style={[
                                            selectionDayStyle.touchItem,
                                            {
                                                backgroundColor: item.is_consolation_day == true && myPicks !== 'MY PICKS' ? constants.colors.labelColor : constants.colors.white,
                                                marginTop: index != 0 || index != 1 ? 20 : 0,
                                                marginRight: index + 1 % 4 == 0 ? 10 : 10,
                                                marginLeft: index + 1 % 2 == 0 ? 0 : 10
                                            }
                                        ]}>
                                        {
                                            item?.is_last_day == true
                                                ? <>
                                                    <Image style={{ marginBottom: Platform.OS == "android" ? 10 : 0, height: widthPercentageToDP(10), width: widthPercentageToDP(12) }} source={constants.icons.winnerCup} resizeMode='contain' />
                                                    <Text style={[selectionDayStyle.TxtDay]}>{item?.tournament_champ}</Text>
                                                </> : <>
                                                    <Text style={[selectionDayStyle.txtWhichDay, { color: item.is_consolation_day == true && myPicks !== 'MY PICKS' ? constants.colors.white : constants.colors.darkGreen }]} >{item.tournament_day.split(' ')[1]}</Text>
                                                    <Text style={[selectionDayStyle.TxtDay, { color: item.is_consolation_day == true && myPicks !== 'MY PICKS' ? constants.colors.white : constants.colors.darkGreen }]}>Day</Text>
                                                </>
                                        }
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {myPicks == 'MY PICKS' && isLoading == true
                        && <TouchableOpacity
                            onPress={() => utils.navigateTo(navigation, constants.screens.myPicks, 'All')}
                            style={selectionDayStyle.touchableAllPicks}>
                            <Text style={selectionDayStyle.txtAllPicks}>All PICKS</Text>
                        </TouchableOpacity>
                    }
                </ScrollView>
            }
        </View>
    )
}

export default SelectionDays