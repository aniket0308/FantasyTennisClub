import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import Snackbar from "react-native-snackbar";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import notificationStyle from "./style";

const Notification = ({ navigation }) => {

    const [notification, setNotification] = useState()
    const [isLoading, setIsLoading] = useState(false)

    //function for getting notification
    const getNotification = async () => {
        const token = await AsyncStorage.getItem('@Token')
        fetch('https://fantasytennisclub.com/admin/api/v1/announcements/member', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }).
            then((response) => response.json()).
            then((json) => {
                if (json.success == true) {
                    setIsLoading(true)
                }
                setNotification(json)
            }).
            catch(e => {
                Snackbar.show({
                    text: e.toString(),
                    duration: 1000,
                    backgroundColor: 'red',
                    // action: {
                    //   text: 'UNDO',
                    //   textColor: 'green',
                    //   onPress: () => { /* Do something. */ },
                    // },
                });
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
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
                <Text style={[notificationStyle.txtFtc, { color: constants.colors.black, fontWeight: '400', fontSize: 12, marginTop: 5, alignSelf: 'center' }]}>5 minutes</Text>
            </View>
        )
    }

    return (
        <View style={notificationStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: '68%' }}
                showBackArrow={true}
                title={'Notifications'}
                titleStyle={{ marginTop: 5, marginBottom: -3 }}
                onPressLeftIcon={() => navigation.goBack()}
            />
            {
                notification?.data == null || notification?.data?.length == 0 || notification?.data == undefined
                    ? <Text>No Notification</Text>
                    : <FlatList
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        style={notificationStyle.flatListView}
                        data={notification?.data}
                        renderItem={renderNotification}
                    />
            }
        </View>
    )
}

export default Notification