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
                title={myPicks=='MY PICKS'?'My Picks':'Selection Days'}
                titleStyle={{ fontSize: 22,marginTop:10 }}
                viewHeaderStyle={{ width: '100%' }}
                rightIcon={constants.icons.shapeBell}
                rightIconStyle={{height:widthPercentageToDP(6),width:widthPercentageToDP(6) ,marginTop:-10}}
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
                                        onPress={() => utils.navigateTo(navigation,item?.is_lock_form==1?'LockedScreen':route.params == undefined ? constants.screens.dayPick : constants.screens.myPicks,item?.is_lock_form==1?{item,tournament_day:item.tournament_day.split(' ')[1]}:item.tournament_day.split(' ')[1])}
                                        style={[
                                            selectionDayStyle.touchItem,
                                            {
                                                backgroundColor: item.is_consolation_day == true&&myPicks!=='MY PICKS' ? constants.colors.labelColor : constants.colors.white,
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
                                                    <Text style={[selectionDayStyle.txtWhichDay, { color: item.is_consolation_day == true&&myPicks!=='MY PICKS' ? constants.colors.white : constants.colors.darkGreen }]} >{item.tournament_day.split(' ')[1]}</Text>
                                                    <Text style={[selectionDayStyle.TxtDay, { color: item.is_consolation_day == true&&myPicks!=='MY PICKS' ? constants.colors.white : constants.colors.darkGreen }]}>Day</Text>
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