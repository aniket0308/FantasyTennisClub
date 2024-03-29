import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import React, { useEffect, useState } from "react"
import { BackHandler, FlatList, Platform, RefreshControl, SafeAreaView, StatusBar, Text, View } from "react-native"
import PushNotification from "react-native-push-notification";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { constants } from "../../common/constant"
import { Header } from "../../components"
import Loader from "../../components/loader"
import { getAnnouncements } from "../../redux/slice/auth";
import announcementStyle from "./style"

const Announcments = ({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState()
    const dispatch = useDispatch()

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
        getAnnouncement(true)
        if (route?.params?.exit == true) {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { BackHandler.exitApp() })
            return () => backHandler.remove()
        }
    }, [])

    //rendering Announcements
    const renderAnnouncments = ({ item, index }) => {
        return (
            <View style={[announcementStyle.viewInsights, { backgroundColor: index == 0 ? '#F5F8FA' : constants.colors.white, marginTop: index != 0 ? 10 : 0 }]}>
                <Text style={announcementStyle.txtInsights} >{item?.title}</Text>
                <RenderHTML
                    source={{ html: `${item?.description}` }}/>
            </View>
        )
    }

    return (
        <View style={announcementStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
            navigation={navigation}
            refresh={refresh}
                showBackArrow={true}
                title={'Announcements'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                viewHeaderStyle={{ width: '100%' }}
                rightIcon={constants.icons.shapeBell}
                checkLength={true}
                onPressRightIcon={async () => {
                    const token = await AsyncStorage.getItem('@Token')
                    utils.callApi('api/v1/announcements/member/read-all', { token }, 'allNotificationRead')
                    if (Platform.OS == 'ios') {
                        PushNotificationIOS.getApplicationIconBadgeNumber(async number => {
                            console.log('what is number beta incrementer', number);
                            PushNotificationIOS.setApplicationIconBadgeNumber(0);
                            await AsyncStorage.removeItem('@count')
                        });
                    } else {
                        PushNotification.removeAllDeliveredNotifications()
                        await AsyncStorage.removeItem('@count')
                        PushNotification.setApplicationIconBadgeNumber(0)
                    }
                    utils.navigateTo(navigation, constants.screens.notification)
                }
                }
                onPressLeftIcon={() => {
                    if(route?.params?.fromBackground == true){
                        navigation.navigate(constants.screens.dashBoard)
                    }else{
                        navigation.goBack()
                    }
                }}
                rightIconStyle={{ height: widthPercentageToDP(6), width: widthPercentageToDP(6) }}
                lengthStyle={{top:5}}
            />
            {
                isLoading == true
                && <FlatList
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
                                getAnnouncement(true)
                            }} />}
                    style={{ marginBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    data={data?.data?.length > 0 ? data?.data : []}
                    renderItem={renderAnnouncments}
                    key={(item) => item}
                    keyExtractor={item => item}
                />
            }
            {
                isLoading == false
                && <Loader />
            }
        </View>
    )
}
export default Announcments