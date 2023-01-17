import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler, FlatList, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import PushNotification from "react-native-push-notification";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { FullWindowOverlay } from "react-native-screens";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import { getNotifications } from "../../redux/slice/auth";
import notificationStyle from "./style";

const Notification = ({ navigation,route }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data,setData]=useState()
    const dispatch=useDispatch()

    //function for getting notification
    const getNotification = async() => {
        const token= await AsyncStorage.getItem('@Token')
        await utils.callApiGet(`api/v1/announcements/member`, {setIsLoading,setData,token},'getNotification')
    }

    const readAllNotification=async()=>{
        const token = await AsyncStorage.getItem('@Token')
        utils.callApi('api/v1/announcements/member/read-all', { token }, 'allNotificationRead')
    }

    useEffect(() => {
        getNotification()
        readAllNotification()
    }, [])

    useEffect(() => {
        getNotification()
        readAllNotification()
    }, [route.params])

    useEffect(() => {
        getNotification()
    }, [isLoading])

    //Render Notification Function
    const renderNotification = ({ item, index }) => {
        return (
            <TouchableOpacity 
            onPress={async()=>{
                const token= await AsyncStorage.getItem('@Token')
                if((data?.data?.notifications?.length>0 || data != undefined||data!='')&& data?.success==true){
                    setIsLoading(false)
                    utils.callApi(`api/v1/announcements/read/${item?.id}`,{token,setIsLoading},'notificationRead')
                }
                Alert.alert(
                    "Fantasy Tennis Club",
                    `To send a message go to 'Account' then 'Contact us'.`,
                )
            }} style={[commonStyle.row, {padding:5, marginTop:index==0?40:20,justifyContent:'center'}]}>
                <View style={commonStyle.row}>
                    <View style={notificationStyle.viewCircle}>
                        <Text style={notificationStyle.txtFtc}>FTC</Text>
                    </View>
                    <View style={[commonStyle.column, { justifyContent: 'center', marginLeft: 20 }]}>
                        <Text style={[notificationStyle.txtFtc, { color: constants.colors.darkBlue, fontWeight: '600' }]}>{item?.title}</Text>
                        {/* <Text style={[notificationStyle.txtFtc, { color: constants.colors.labelColor, fontWeight: '400', fontSize: 12, marginTop: 5,width:widthPercentageToDP(60) }]}>{item?.description}</Text> */}
                        <RenderHTML
                        baseStyle={{width:widthPercentageToDP(58)}}
                            source={{ html: `${item?.description}` }}
                        />
                    </View>
                </View>
                <Text style={[notificationStyle.txtFtc, { color: constants.colors.black, fontWeight: '400', fontSize: 12, marginTop: 5, alignSelf: 'center' }]}>{item?.time_ago}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={notificationStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: '85%' }}
                showBackArrow={true}
                title={'Member Notifications'}
                titleStyle={{ marginTop: 5, marginBottom: -3 }}
                onPressLeftIcon={() => {
                    if(route?.params?.fromBackground == true){
                        utils.navigateTo(navigation,constants.screens.dashBoard)
                    }else{
                        navigation.goBack()
                    }
                }}
                navigation={navigation}
            />
            {

                data?.data == null || data?.data?.length == 0 || data?.data == undefined
                    ?<View style={{justifyContent:'center',flex:1,alignItems:'center'}}> 
                    <Text style={{fontSize:25,color:constants.colors.darkBlue,fontWeight:'600'}}>{data?.message}</Text>
                    </View>
                    : <FlatList
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        style={notificationStyle.flatListView}
                        data={data?.data?.notifications}
                        renderItem={renderNotification}
                    />
            }
            {
                isLoading == false && <Loader />
            }
        </View>
    )
}

export default Notification