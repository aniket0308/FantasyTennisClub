import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Snackbar from "react-native-snackbar";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import selectionDayStyle from "./style";

//SelectionDays Screen
const SelectionDays = ({ route, navigation }) => {

    const [myPicks, setMyPicks] = useState('')
    const [days, setDays] = useState()
    const [isLoading, setIsLoading] = useState(false)

    console.log('asasasas', days?.data?.days);

    const tempArr = [
        { day: 14, icon: constants.icons.winnerCup }, { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 },
        { day: 11 }, { day: 12 }, { day: 13 }
    ]
    const tempArr1 = [
        { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 6 }, { day: 5 }, { day: 4 },
        { day: 3 }, { day: 2 }, { day: 1 }, { day: 14, icon: constants.icons.winnerCup }
    ]
    const getDays = async () => {
        const token = await AsyncStorage.getItem('@Token')
        fetch('https://fantasytennisclub.com/admin/api/v1/member-dashboard', {
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
                setDays(json)
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
        getDays()
    }, [])

    useEffect(() => {
        if (route?.params != undefined) {
            const { passData } = route?.params
            if (passData) {
                setMyPicks(passData)
            } else if (!passData) {
                setMyPicks(route?.params)
            }
        }
    }, [route?.params])
    return (
        <View style={selectionDayStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                showBackArrow={true}
                title={'My Picks'}
                titleStyle={{ fontSize: 22 }}
                viewHeaderStyle={{ width: '100%' }}
                rightIcon={constants.icons.shapeBell}
                onPressRightIcon={() => utils.navigateTo(navigation, constants.screens.notification)}
                onPressLeftIcon={() => navigation.goBack()}
            />
            {isLoading == false
                ? <Loader />
                : <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 25 }} bounces={false}>
                    <View style={selectionDayStyle.touchableMainView}>
                        {days?.data?.days?.length > 0
                            && days?.data?.days.reverse().map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => utils.navigateTo(navigation, route.params == undefined ? constants.screens.dayPick : constants.screens.myPicks, item.tournament_day.split(' ')[1])}
                                        style={[
                                            selectionDayStyle.touchItem,
                                            {
                                                backgroundColor: item.day < 6 ? constants.colors.labelColor : constants.colors.white,
                                                marginTop: index != 0 || index != 1 ? 20 : 0,
                                                marginRight: index + 1 % 4 == 0 ? 10 : 10,
                                                marginLeft: index + 1 % 2 == 0 ? 0 : 10
                                            }
                                        ]}>
                                        {
                                            item.tournament_day.split(' ')[1] == '14'
                                                ? <>
                                                    <Image style={{ marginBottom: Platform.OS == "android" ? 10 : 0, height: widthPercentageToDP(10), width: widthPercentageToDP(12) }} source={constants.icons.winnerCup} resizeMode='contain' />
                                                    <Text style={[selectionDayStyle.TxtDay]}>Day 14</Text>
                                                </> : <>
                                                    <Text style={[selectionDayStyle.txtWhichDay, { color: item.day < 6 ? constants.colors.white : constants.colors.darkGreen }]} >{item.tournament_day.split(' ')[1]}</Text>
                                                    <Text style={[selectionDayStyle.TxtDay, { color: item.day < 6 ? constants.colors.white : constants.colors.darkGreen }]}>Day</Text>
                                                </>
                                        }
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {myPicks == 'MY PICKS'&&isLoading==true
                        && <TouchableOpacity
                            onPress={() => utils.navigateTo(navigation, constants.screens.myPicks, 'All')}
                            style={selectionDayStyle.touchableAllPicks}>
                            <Text style={selectionDayStyle.txtAllPicks}>All PICKS</Text>
                        </TouchableOpacity>
                    }
                </ScrollView>
            }
        </View>
    )
}

export default SelectionDays