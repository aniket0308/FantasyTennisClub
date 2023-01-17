import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import PushNotification from "react-native-push-notification";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import { getAllPicksFormApi } from "../../redux/slice/auth";
import myPicksStyle from "./style";

const MyPicks = ({ route, navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState()
    const dispatch = useDispatch()

    const particularDayPick = data?.data?.days.find((i) => {
        if (route?.params?.item) {
            if (route.params?.item?.id == i?.id) {
                return i
            }
        }
    })


    const getAllPickFromAPi = async () => {
        let tournamentId = await AsyncStorage.getItem('@TournamentId')
        const pickObj = {
            token: await AsyncStorage.getItem('@Token'),
            setIsLoading: setIsLoading,
            setRefresh: setRefresh,
            setData: setData
        }
        //calling Api For Getting picks
        await utils.callApiGet(`api/v1/tournaments/${tournamentId}/my-picks`, pickObj)
    }

    useEffect(() => {
        getAllPickFromAPi()
    }, [])

    const renderAllPickData = ({ item, index }) => {
        return (
            <>
                <View style={[myPicksStyle.viewTitle, { marginTop: index != 0 ? 10 : 0 }]}>
                    {
                        route.params == "All" && <Text style={myPicksStyle.txtDay}>{item.day}</Text>
                    }
                </View>
                {
                    item?.matches.map((matchItem, matchIndex) => {
                        console.log('match Item', matchItem);
                        return (
                            route.params == 'All'
                                ? <View style={{ backgroundColor: constants.colors.white, paddingHorizontal: 10, paddingTop: matchIndex == 0 ? 10 : 0, paddingBottom: 10 }}>
                                    <Text style={myPicksStyle.txtMyPick}>My Pick:  {matchItem.my_pick}</Text>
                                </View>
                                : <>
                                    <View style={[myPicksStyle.viewTitle, { marginTop: matchIndex != 0 ? 10 : 0 }]}>
                                        <Text style={myPicksStyle.txtDay}>{matchItem && matchItem?.match}</Text>
                                    </View>
                                    <View style={{ backgroundColor: constants.colors.white, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10 }}>
                                        <Text style={[myPicksStyle.txtMyPick, { color: constants.colors.black, fontSize: 14 }]}>{matchItem?.title}</Text>
                                        <Text style={[myPicksStyle.txtMyPick, { color: constants.colors.black, fontSize: 14 }]}>Winner:  {matchItem && matchItem?.winner}</Text>
                                        <Text style={[myPicksStyle.txtMyPick, { marginTop: 10 }]}>My Pick:  {matchItem && matchItem?.my_pick}</Text>
                                    </View>
                                </>
                        )

                    })
                }
            </>
        )
    }

    return (
        <View style={myPicksStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                refresh={refresh}
                navigation={navigation}
                title={'MY PICKS'}
                subTitle={particularDayPick?.day}
                titleStyle={{ alignSelf: 'center', fontSize: 22 }}
                subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                rightIcon={constants.icons.shapeBell}
                checkLength={true}
                onPressRightIcon={async () => {
                    const token = await AsyncStorage.getItem('@Token')
                    utils.callApi('api/v1/announcements/member/read-all', { token }, 'allNotificationRead')
                    if (Platform.OS == 'ios') {
                        PushNotificationIOS.getApplicationIconBadgeNumber(number => {
                            console.log('what is number beta incrementer', number);
                            PushNotificationIOS.setApplicationIconBadgeNumber(0);
                        });
                    } else {
                        PushNotification.removeAllDeliveredNotifications()
                        await AsyncStorage.removeItem('@count')
                    }
                    utils.navigateTo(navigation, constants.screens.notification)
                }
                }
                mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10 }}
                resizeMode='stretch'
                rightIconStyle={{ height: widthPercentageToDP(6), width: widthPercentageToDP(6), marginTop: -10 }}
                showBackArrow={true}
                onPressLeftIcon={() => navigation.goBack()}
            />
            {
                isLoading == true
                    ? <FlatList
                        refreshControl={
                            <RefreshControl
                                title='Loading...'
                                tintColor={constants.colors.darkBlue}
                                colors={[constants.colors.darkBlue]}
                                titleColor={constants.colors.darkBlue}
                                size='large'
                                refreshing={refresh}
                                onRefresh={() => {
                                    setRefresh(true)
                                    getAllPickFromAPi()
                                }}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 20 }}
                        data={data?.data?.days?.length > 0 && route?.params == 'All' ? data?.data?.days : route?.params != 'All' && [particularDayPick]?.length > 0 ? [particularDayPick] : []}
                        renderItem={renderAllPickData}
                    />
                    : <Loader />
            }

        </View>
    )
}

export default MyPicks