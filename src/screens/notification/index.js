import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import { getNotifications } from "../../redux/slice/auth";
import notificationStyle from "./style";

const Notification = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data,setData]=useState()
    const dispatch=useDispatch()

    //function for getting notification
    const getNotification = async() => {
        const token= await AsyncStorage.getItem('@Token')
        utils.callApiGet(`api/v1/announcements/member`, {setIsLoading,setData,token})
    }

    useEffect(() => {
        getNotification()
    }, [])

    //Render Notification Function
    const renderNotification = ({ item, index }) => {
        return (
            <View style={[commonStyle.row, { justifyContent: 'space-between', marginTop: 40 }]}>
                <View style={commonStyle.row}>
                    <View style={notificationStyle.viewCircle}>
                        <Text style={notificationStyle.txtFtc}>FTC</Text>
                    </View>
                    <View style={[commonStyle.column, { justifyContent: 'center', marginLeft: 20 }]}>
                        <Text style={[notificationStyle.txtFtc, { color: constants.colors.darkBlue, fontWeight: '600' }]}>{item?.title}</Text>
                        <Text style={[notificationStyle.txtFtc, { color: constants.colors.labelColor, fontWeight: '400', fontSize: 12, marginTop: 5 }]}>{item?.description}</Text>
                    </View>
                </View>
                <Text style={[notificationStyle.txtFtc, { color: constants.colors.black, fontWeight: '400', fontSize: 12, marginTop: 5, alignSelf: 'center' }]}>{item?.time_ago}</Text>
            </View>
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
                onPressLeftIcon={() => navigation.goBack()}
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
                        data={data?.data}
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