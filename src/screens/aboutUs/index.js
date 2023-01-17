import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import aboutUsStyle from "./style";
import RenderHtml from 'react-native-render-html';
import { useDispatch } from "react-redux";
import { aboutUs } from "../../redux/slice/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { utils } from "../../common";

const AboutUs = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data,setData]=useState()
    const dispatch=useDispatch()

    //get AboutUs From API
    const getAboutUsFromApi = async () => {
        const seasonObj = {
            token: await AsyncStorage.getItem('@Token'),
            setIsLoading: setIsLoading,
            setRefresh: setRefresh,
            setData: setData
        }
        //calling Api For Getting about
        await utils.callApiGet(`api/v1/page/about`, seasonObj)
    }

    useEffect(() => {
        getAboutUsFromApi()
    }, [])

    return (
        <View style={aboutUsStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: '85%' }}
                showBackArrow={true}
                title={'About Fantasy Tennis Club'}
                titleStyle={{ marginTop: 5, marginBottom: -3 }}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <View style={aboutUsStyle.txtView}>
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
                                    getAboutUsFromApi()
                                }} />}
                        bounces={true}
                        style={{ flex: 1 }}>
                        <RenderHtml
                            source={{ html: `${data?.data?.content}` }}
                        />
                    </ScrollView>
                    : <Loader />
                }
            </View>
        </View>
    )
}

export default AboutUs