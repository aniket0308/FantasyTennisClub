import React, { useEffect, useState } from "react";
import { Platform, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import rulesStyle from "./style";
import RenderHtml from 'react-native-render-html';
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { getFaq, getRules } from "../../redux/slice/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

//Rules Screen
const Rules = ({ navigation }) => {

    const [faq, setFaq] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState()
    const dispatch = useDispatch()

    //Function For Getting Rules From Api
    const getRulesFromApi = async () => {
        const seasonObj = {
            token: await AsyncStorage.getItem('@Token'),
            setIsLoading: setIsLoading,
            setRefresh: setRefresh,
            setData: setData
        }
        //calling Api For Getting about
        await utils.callApiGet(`api/v1/page/rules`, seasonObj)
    }

    //get Faq From Api
    const getFaqFromApi = async () => {
        const seasonObj = {
            token: await AsyncStorage.getItem('@Token'),
            setIsLoading: setIsLoading,
            setRefresh: setRefresh,
            setFaq: setFaq
        }
        await utils.callApiGet(`api/v1/page/faqs`, seasonObj)
    }

    useEffect(() => {
        getRulesFromApi()
        getFaqFromApi()
    }, []);

    //Function For Rendering Rules
    const RenderRules = () => {
        return (
            <View style={[rulesStyle.viewRules, { backgroundColor: '#F5F8FA' }]}>
                <Text style={rulesStyle.txtRules} >{data?.data?.title}</Text>
                <RenderHtml
                    source={{ html: `${data?.data?.content}` }}
                />
            </View>
        )
    }

    const RenderFaq = () => {
        return (
            <View style={[rulesStyle.viewRules, { backgroundColor: '#F5F8FA', marginTop: 20 }]}>
                <Text style={rulesStyle.txtRules} >{faq?.data?.title}</Text>
                <RenderHtml
                    source={{ html: `${faq?.data?.content}` }}
                />
            </View>
        )
    }

    return (
        <View style={rulesStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                navigation={navigation}
                refresh={refresh}
                showBackArrow={true}
                title={'Rules and FAQs'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                rightIcon={constants.icons.shapeBell}
                checkLength={true}
                rightIconStyle={{ height: widthPercentageToDP(6), width: widthPercentageToDP(6) }}
                onPressRightIcon={async () => {
                    const token = await AsyncStorage.getItem('@Token')
                    utils.callApi('api/v1/announcements/member/read-all', { token }, 'allNotificationRead')
                    utils.navigateTo(navigation, constants.screens.notification)
                }
                }
                onPressLeftIcon={() => navigation.goBack()}
                lengthStyle={{ top: 5 }}
            />
            {isLoading == true
                ? <ScrollView
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
                                getFaqFromApi()
                                getRulesFromApi()
                            }}
                        />
                    }
                    style={{ marginBottom: 25 }}>
                    {
                        data != undefined
                        && <RenderRules />
                    }
                    {
                        faq != undefined
                        && <RenderFaq />
                    }
                </ScrollView>
                : <Loader />
            }
        </View>
    )
}

export default Rules