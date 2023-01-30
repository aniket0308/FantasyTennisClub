import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, BackHandler, Image, Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import PushNotification from "react-native-push-notification";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import dashboardStyle from "./style";

//Dashboard Of Screen Or Say Home Screen
const DashBoardHome = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [days, setDays] = useState()
    const [data, setData] = useState()

    const getDays = async () => {
        const getDaysObj = {
            token: await AsyncStorage.getItem('@Token'),
            setIsLoading: setIsLoading,
            setRefresh: setRefresh,
            setDays: setDays
        }
        //calling Api For Getting Days
        await utils.callApiGet(`api/v1/member-dashboard`, getDaysObj)
    }

    const getAnnouncement = async (filter) => {
        const announcementObj = {
            token: await AsyncStorage.getItem('@Token'),
            setIsLoading: setIsLoading,
            setRefresh: setRefresh,
            setData: setData,
        }
        await utils.callApiGet(`api/v1/announcements/general${filter == true ? '/all' : ''}`, announcementObj)
    }

    useEffect(() => {
        getDays()
        getAnnouncement(false)
    }, [refresh])

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getDays()
            getAnnouncement(false)
        });
        return focusHandler;
    }, [navigation]);

    // useEffect(() => {
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    //         Alert.alert(
    //                     "Fantasy Tennis Club",
    //                     'Are you sure you want to exit?',
    //                     [
    //                         { text: "OK", onPress: () => BackHandler.exitApp()},
    //                         { text: "CANCEL", onPress: () => {} }
    //                     ]
    //                 )
    //                 return true
    //     })
    //     return () => backHandler.remove()

    // }, []);

    useEffect(() => {
        getDays()
        getAnnouncement(false)
    }, [])

    const tempData = [
        {
            score: '105 / 23',
            title: 'Leaderboard'
        },
        {
            score: '105 / 23',
            title: 'Consolation'
        },
        {
            score: '5',
            title: 'Season Ranking'
        },
        {
            title: 'MY PICKS'
        },
        {
            title: 'PRIZES'
        },
        {
            icon: constants.icons.whatsApp,
            title: 'WhatsApp'
        }

    ]

    //Rendering Data In Flatlist
    const renderItem = (item, index) => {
        return (
            <TouchableOpacity
            activeOpacity={1}
                onPress={() => {
                    if(days?.data != undefined){
                        if (item.icon) {
                            utils.navigateTo(navigation, constants.screens.joinWhatsApp, days.data.whatsapp_group_link)
                        } else {
                            utils.navigateTo(
                                navigation,
                                item.title == 'MY PICKS'
                                    ? constants.screens.selectionDays
                                    : item.title == 'PRIZES'
                                        ? constants.screens.prizes
                                        : item.title == 'Leaderboard'
                                            ? 'Leaderboard'
                                            : 'Consolation',
                                item.title == 'PRIZES' ? days.data.description : item.title
                            )
                        }
                    }
                }
                }
                style={[dashboardStyle.touchableView, {
                    marginTop: index != 0 || index != 1 ? 10 : 0,
                }]}
            >
                {
                    days?.data == undefined &&item?.score
                    ?<ActivityIndicator color={constants.colors.darkBlue} />
                    :item?.score
                    && <Text style={dashboardStyle.txtScore}>{days != undefined && days?.data != undefined && days?.data[item?.title == 'Leaderboard' ? 'leaderboard' : item?.title == 'Consolation' ? 'consolation' : 'season_ranking']}</Text>
                }
                {
                    item.icon
                    && <Image style={{ alignSelf: 'center', height: widthPercentageToDP(10), width: widthPercentageToDP(10) }} source={constants.icons.whatsApp} />
                }
                <Text style={[dashboardStyle.txtTitle, { fontSize: index == 3 || index == 4 ? 20 : 14, }]} >{item.title}</Text>
            </TouchableOpacity>
        )
    }

    //rendering Insights data in flatlist
    const renderInsightData = (item, index) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={[dashboardStyle.viewInsights, { backgroundColor: index == 0 ? '#F5F8FA' : constants.colors.white, marginTop: index != 0 ? 10 : 0 }]}>
                <Text style={dashboardStyle.txtInsights} >{item.title}</Text>
                <RenderHTML
                    source={{ html: `${item?.description}` }}
                />
            </TouchableOpacity>
        )
    }

    return (
        <>
            <View style={dashboardStyle.maincontainer}>
                <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
                <SafeAreaView />
                <Header
                    refresh={refresh}
                    title={'Dashboard'}
                    subTitle={days?.data?.title}
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
                    resizeMode='contain'
                    rightIconStyle={{ height: widthPercentageToDP(6), width: widthPercentageToDP(6), marginTop: -10 }}
                    navigation={navigation}
                />
                {isLoading == true
                    && <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={() => {
                                    setRefresh(true)
                                    getDays()
                                    getAnnouncement(false)
                                }}
                                title='Loading...'
                                tintColor={constants.colors.darkBlue}
                                colors={[constants.colors.darkBlue]}
                                titleColor={constants.colors.darkBlue}
                                size='large'
                            />
                        }
                        style={{ marginBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        bounces={true}
                    >
                        <View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                {
                                    tempData != undefined && tempData.map((item, index) => {
                                        return (
                                            renderItem(item, index)
                                        )
                                    })
                                }
                            </View>
                            <View style={[commonStyle.row, { justifyContent: 'space-between', marginVertical: 20, alignItems: 'center' }]}>
                                <Text style={dashboardStyle.txtGeneral}>General Anouncements:</Text>
                                <TouchableOpacity onPress={() => utils.navigateTo(navigation, constants.screens.announcements, { initial: false })}>
                                    <Text style={[dashboardStyle.txtGeneral, { fontSize: 16 }]}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                data != undefined && data?.data?.length > 0 &&
                                data?.data.map((i, index) => {
                                    return renderInsightData(i, index)
                                })
                            }
                        </View>
                    </ScrollView >
                }
                {
                    isLoading == false
                    && <Loader />
                }
            </View >
        </>
    )
}

export default DashBoardHome;