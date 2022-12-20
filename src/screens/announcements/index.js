import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react"
import { BackHandler, FlatList, RefreshControl, SafeAreaView, StatusBar, Text, View } from "react-native"
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
        utils.callApiGet(`api/v1/announcements/general${filter == true ? '/all' : ''}`, announcementObj)
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
                showBackArrow={true}
                title={'Announcements'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                viewHeaderStyle={{ width: '100%' }}
                rightIcon={constants.icons.shapeBell}
                checkLength={true}
                onPressRightIcon={() => utils.navigateTo(navigation, constants.screens.notification)}
                onPressLeftIcon={() => navigation.goBack()}
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