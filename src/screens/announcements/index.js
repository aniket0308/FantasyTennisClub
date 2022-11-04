import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native"
import { constants } from "../../common/constant"
import { Header } from "../../components"
import announcementStyle from "./style"

const Announcments = ({ navigation }) => {

    const [announcements, setAnnouncements] = useState()

    const getAllAnnouncements = async () => {
        const token = await AsyncStorage.getItem('@Token')
        //calling api for Announcements
        fetch('https://fantasytennisclub.com/admin/api/v1/announcements/general/all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }).
            then((response) => response.json()).
            then((json) => setAnnouncements(json.data)).
            catch(e => console.log('What Is Error In Get Api', e))
    }

    useEffect(() => {
        getAllAnnouncements()
    }, [])

    //rendering Announcements
    const renderAnnouncments = ({ item, index }) => {
        return (
            <View style={[announcementStyle.viewInsights, { backgroundColor: index == 0 ? '#F5F8FA' : constants.colors.white, marginTop: index != 0 ? 10 : 0 }]}>
                <Text style={announcementStyle.txtInsights} >{item?.title}</Text>
                <Text
                    // numberOfLines={index != 0 ? 3 : 10}
                    style={announcementStyle.txtText} >
                    {item.description}
                </Text>
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
                onPressLeftIcon={() => navigation.goBack()}
            />
            <FlatList
                style={{ marginBottom: 20 }}
                showsVerticalScrollIndicator={false}
                data={announcements?.length > 0 ? announcements : []}
                renderItem={renderAnnouncments}
                key={(item) => item}
                keyExtractor={item => item}
            />
        </View>
    )
}
export default Announcments