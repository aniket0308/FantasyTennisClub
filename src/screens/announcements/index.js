import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, Text, View } from "react-native"
import { useToast } from "react-native-toast-notifications"
import { constants } from "../../common/constant"
import { Header } from "../../components"
import Loader from "../../components/loader"
import announcementStyle from "./style"

const Announcments = ({ navigation }) => {

    const [announcements, setAnnouncements] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
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
            then((json) => {
                if (json.success == true) {
                    setIsLoading(true)
                }
                setAnnouncements(json.data)
            }).
            catch(e =>{
                toast.show(e.toString(), {
                    type: 'danger',
                    placement: 'top'
                })
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
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
            {
                isLoading == true
                && <FlatList
                    style={{ marginBottom: 20 }}
                    showsVerticalScrollIndicator={false}
                    data={announcements?.length > 0 ? announcements : []}
                    renderItem={renderAnnouncments}
                    key={(item) => item}
                    keyExtractor={item => item}
                />
            }
            {
                    isLoading == false
                    && <Loader/>
            }
        </View>
    )
}
export default Announcments