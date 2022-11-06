import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import myPicksStyle from "./style";

const MyPicks = ({ route, navigation }) => {

    const [myAllPicks, setMyAllPicks] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const particularDayPick = myAllPicks?.filter((i) => {
        if (`day ${route.params}` == i.day) {
            return i
        }
    })

    const getAllPickFromAPi = async () => {
        const token = await AsyncStorage.getItem('@Token')
        //calling api for FAQS
        fetch('https://fantasytennisclub.com/admin/api/v1/tournaments/1/my-picks', {
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
                setMyAllPicks(json.data.days)
            }).
            catch(e => {
                toast.show(e.toString(), {
                    type: 'danger',
                    placement: 'top'
                })
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
    }

    useEffect(() => {
        getAllPickFromAPi()
    }, [])

    const renderAllPickData = ({ item, index }) => {
        return (
            <>
                <View style={[myPicksStyle.viewTitle, { marginTop: index != 0 ? 10 : 0 }]}>
                    {
                        route.params == "All" && <Text style={myPicksStyle.txtDay}>{item.day}</Text>
                    }
                </View>
                {
                    item?.matches.map((matchItem, matchIndex) => {
                        console.log('match Item', matchItem);
                        return (
                            route.params == 'All'
                                ? <View style={{ backgroundColor: constants.colors.white, paddingHorizontal: 10, paddingTop: matchIndex == 0 ? 10 : 0, paddingBottom: 10 }}>
                                    <Text style={myPicksStyle.txtMyPick}>My Pick:  {matchItem.my_pick}</Text>
                                </View>
                                : <>
                                    <View style={[myPicksStyle.viewTitle, { marginTop: matchIndex != 0 ? 10 : 0 }]}>
                                        <Text style={myPicksStyle.txtDay}>{matchItem && matchItem?.match}</Text>
                                    </View>
                                    <View style={{ backgroundColor: constants.colors.white, paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10 }}>
                                        <Text style={[myPicksStyle.txtMyPick, { color: constants.colors.black, fontSize: 14 }]}>{matchItem && matchItem?.players && matchItem?.players[0].player} v/s {matchItem && matchItem?.players && matchItem?.players[1]?.player}</Text>
                                        <Text style={[myPicksStyle.txtMyPick, { color: constants.colors.black, fontSize: 14 }]}>Winner:  {matchItem && matchItem?.winner}</Text>
                                        <Text style={[myPicksStyle.txtMyPick, { marginTop: 10 }]}>My Pick:  {matchItem && matchItem?.my_pick}</Text>
                                    </View>
                                </>
                        )

                    })
                }
            </>
        )
    }

    return (
        <View style={myPicksStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                title={'MY PICKS'}
                subTitle={route.params != String && route.params <= 9 ? `0${route.params}` : route.params}
                titleStyle={{ alignSelf: 'center', fontSize: 22 }}
                subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                rightIcon={constants.icons.shapeBell}
                mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10 }}
                resizeMode='stretch'
                rightIconStyle={{ alignSelf: 'center' }}
                showBackArrow={true}
                onPressLeftIcon={() => navigation.goBack()}
            />
            {
                isLoading == true
                    ? <FlatList
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: 20 }}
                        data={myAllPicks?.length > 0 && route?.params == 'All' ? myAllPicks : route?.params != 'All' && particularDayPick?.length > 0 ? particularDayPick : []}
                        renderItem={renderAllPickData}
                    />
                    : <Loader />
            }

        </View>
    )
}

export default MyPicks