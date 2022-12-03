import React, { useEffect, useState } from "react";
import { Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import PushNotificationService from "../../pushNotification/pushNotification";
import { getAnnouncements, getDays } from "../../redux/slice/auth";
import dashboardStyle from "./style";

//Dashboard Of Screen Or Say Home Screen
const DashBoardHome = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [days, setDays] = useState()
    const [data, setData] = useState()
    const dispatch = useDispatch()

    let notification = new PushNotificationService()

    useEffect(() => {
        dispatch(getDays({ setIsLoading, setRefresh, setDays }))
        dispatch(getAnnouncements({ setIsLoading, setRefresh, setData }))
    }, [refresh])

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
                onPress={() => {
                    if(item.icon){
                        utils.navigateTo(navigation,constants.screens.joinWhatsApp,days.data.whatsapp_group_link)
                    }else{
                        utils.navigateTo(
                            navigation,
                            item.title == 'MY PICKS'
                                ? constants.screens.selectionDays
                                    : item.title == 'PRIZES'
                                        ? constants.screens.prizes
                                        : item.title == 'Leaderboard'
                                            ? 'Leaderboard'
                                            : 'Consolation',
                            item.title=='PRIZES'?days.data.description:item.title
                        )
                    }
                    // notification.localNotification()
                }
                }
                style={[dashboardStyle.touchableView, {
                    marginTop: index != 0 || index != 1 ? 10 : 0,
                    // marginLeft: index % 2 == 0 ? 0 : 25,
                }]}
            >
                {
                    item?.score 
                    && <Text style={dashboardStyle.txtScore}>{days?.data[item?.title == 'Leaderboard' ? 'leaderboard' : item?.title == 'consolation' ? 'consolation' : 'season_ranking']}</Text>
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
                onPress={() => utils.navigateTo(navigation, constants.screens.announcements)}
                style={[dashboardStyle.viewInsights, { backgroundColor: index == 0 ? '#F5F8FA' : constants.colors.white, marginTop: index != 0 ? 10 : 0 }]}>
                <Text style={dashboardStyle.txtInsights} >{item.title}</Text>
                <Text
                    numberOfLines={index != 0 ? 3 : 10}
                    style={dashboardStyle.txtText} >{item.description}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <View style={dashboardStyle.maincontainer}>
                <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
                <SafeAreaView />
                <Header
                    title={'Dashboard'}
                    subTitle={days?.data?.title}
                    titleStyle={{ alignSelf: 'center', fontSize: 22 }}
                    subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                    rightIcon={constants.icons.shapeBell}
                    onPressRightIcon={() => utils.navigateTo(navigation, constants.screens.notification)}
                    mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10 }}
                    resizeMode='contain'
                    rightIconStyle={{ height: widthPercentageToDP(6), width: widthPercentageToDP(6), marginTop: -10 }}
                />
                {isLoading == true
                    && <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={() => {
                                    setRefresh(true)
                                    dispatch(getDays({ setIsLoading, setRefresh, setDays }))
                                    dispatch(getAnnouncements({ setIsLoading, setRefresh, setData }))
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
                                    tempData.map((item, index) => {
                                        return (
                                            renderItem(item, index)
                                        )
                                    })
                                }
                            </View>
                            <View style={[commonStyle.row, { justifyContent: 'space-between', marginVertical: 20, alignItems: 'center' }]}>
                                <Text style={dashboardStyle.txtGeneral}>General Anouncements:</Text>
                                <TouchableOpacity onPress={() => utils.navigateTo(navigation, constants.screens.announcements)}>
                                    <Text style={[dashboardStyle.txtGeneral, { fontSize: 16 }]}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            {
                                data?.data?.length > 0 &&
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