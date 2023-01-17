import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import React, { useEffect, useState } from "react";
import { Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import PushNotification from "react-native-push-notification";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import SearchBar from "../../components/searchBar";
import { getTournamentParticipants } from "../../redux/slice/auth";
import prizeStyle from "./style";

const Prizes = ({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(route?.params)
    const [searchResult, setSearchResult] = useState('')
    const [data, setData] = useState()
    const [refresh, setRefresh] = useState(false)
    const dispatch = useDispatch()

    const getAllTournamentParticipants = async () => {
        const tournamentId = await AsyncStorage.getItem('@TournamentId')
        const token = await AsyncStorage.getItem('@Token')
        await utils.callApiGet(`api/v1/tournaments/${tournamentId}/participations`, { setIsLoading, setData, token })
    }

    useEffect(() => {
        getAllTournamentParticipants()
    }, [])

    return (
        <View style={prizeStyle.mainContiner}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                navigation={navigation}
                refresh={refresh}
                showBackArrow={true}
                title={'Event Details'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                rightIcon={constants.icons.shapeBell}
                checkLength={true}
                rightIconStyle={{ height: widthPercentageToDP(6), width: widthPercentageToDP(6) }}
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
                onPressLeftIcon={() => navigation.goBack()}
                lengthStyle={{ top: 5 }}
            />
            <View style={{ backgroundColor: constants.colors.white, flex: 1, marginBottom: 25 }}>
                <ScrollView
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
                                setTimeout(() => {
                                    setRefresh(false)
                                }, 1000)
                            }}
                        />
                    }
                    bounces={true} showsVerticalScrollIndicator={false} >
                    {/* <Text style={prizeStyle.txtMemberParticipate}>Members Participating</Text>
                    <SearchBar
                    onChangeText={(search)=>setSearchResult(search)}
                    /> */}
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        {/* {
                            data?.data?.length > 0
                            && data?.data.map((item) => {
                                if (searchResult != '') {
                                    if (item?.name.toLowerCase().includes(searchResult)) {
                                        return <Text style={prizeStyle.txtName}>{item?.name}</Text>
                                    }
                                }else{
                                    return <Text style={prizeStyle.txtName}>{item?.name}</Text>
                                }
                            })
                        } */}
                        {
                            description && isLoading == true
                            && <RenderHTML
                                source={{ html: `${description}` }}
                            />
                        }
                    </View>
                </ScrollView>
            </View>
            {isLoading == false && <Loader />}
        </View>
    )
}

export default Prizes