import React, { useEffect, useState } from "react";
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import selectionDayStyle from "./style";

//SelectionDays Screen
const SelectionDays = ({ route, navigation }) => {

    const [myPicks, setMyPicks] = useState('')
console.log('sddsds',myPicks);
    const tempArr = [
        { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 },
        { day: 11 }, { day: 12 }, { day: 13 }, { day: 14, icon: constants.icons.winnerCup }
    ]
    console.log('gfgfd',route);

    useEffect(() => {
        if(route?.params!= undefined){
            const { passData } = route?.params
            if(passData){
                setMyPicks(passData)
            }else if(!passData){
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
                onPressLeftIcon={() => navigation.goBack()}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 25 }} bounces={false}>
                <View style={selectionDayStyle.touchableMainView}>
                    {
                        tempArr.map((item, index) => {
                            return (
                                <TouchableOpacity 
                                onPress={()=>utils.navigateTo(navigation,route.params==undefined?constants.screens.dayPick:constants.screens.myPicks,item.day && item.day )}
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
                                        item.icon
                                            ? <>
                                                <Image style={{ marginBottom: Platform.OS == "android" ? 10 : 0 }} source={item.icon} resizeMode='contain' />
                                                <Text style={selectionDayStyle.TxtDay}>Day</Text>
                                            </> : <>
                                                <Text style={[selectionDayStyle.txtWhichDay, { color: item.day < 6 ? constants.colors.white : constants.colors.darkGreen }]} >{item.day}</Text>
                                                <Text style={[selectionDayStyle.TxtDay, { color: item.day < 6 ? constants.colors.white : constants.colors.darkGreen }]}>Day</Text>
                                            </>
                                    }
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                {myPicks == 'MY PICKS'
                    && <TouchableOpacity 
                    onPress={()=>utils.navigateTo(navigation,constants.screens.myPicks,'All')}
                    style={selectionDayStyle.touchableAllPicks}>
                        <Text style={selectionDayStyle.txtAllPicks}>All PICKS</Text>
                    </TouchableOpacity> 
                }
            </ScrollView>
        </View>
    )
}

export default SelectionDays