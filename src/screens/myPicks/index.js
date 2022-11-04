import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import myPicksStyle from "./style";

const MyPicks = ({ route, navigation }) => {

    const [myAllPicks,setMyAllPicks]=useState()
console.log('my All Picks',myAllPicks);
    const getAllPickFromAPi=async()=>{
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
            then((json) => setMyAllPicks(json.data.days)).
            catch(e => console.log('What Is Error In Get Api', e))
    }

    useEffect(()=>{
        getAllPickFromAPi()
    },[])

    const renderAllPickData = ({ item, index }) => {
        console.log('what is Item',item);
        return (
            <>
                <View style={[myPicksStyle.viewTitle, { marginTop: index != 0 ? 10 : 0 }]}>
                    {
                        route.params == "All"
                            ? <Text style={myPicksStyle.txtDay}>{item.day}</Text>
                            : <Text style={myPicksStyle.txtDay}>Match {index + 1}</Text>
                    }
                </View>
                <View style={{ backgroundColor: constants.colors.white, padding: 10 }}>
                    {route.params == 'All'
                        ?
                        item?.matches.map((item,index)=>{
                            return <Text style={myPicksStyle.txtMyPick}>My Pick:  {item.my_pick}</Text>
                        })
                        //  <>
                        //     <Text style={[myPicksStyle.txtMyPick, { marginVertical: 10 }]}>My Pick:  William Barbara</Text>
                        //     <Text style={myPicksStyle.txtMyPick}>My Pick:  William Barbara</Text>
                        // </>
                        : <>
                            <Text style={[myPicksStyle.txtMyPick, { color: constants.colors.black, fontSize: 14 }]}>William Barbara v/s Thomas Sarah</Text>
                            <Text style={[myPicksStyle.txtMyPick, { color: constants.colors.black, fontSize: 14 }]}>Winner:  Thomas Sarah</Text>
                            <Text style={[myPicksStyle.txtMyPick,{marginTop:10}]}>My Pick:  William Barbara</Text>
                        </>
                    }
                </View>
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
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 20 }}
                data={myAllPicks?.length>0?myAllPicks:[]}
                renderItem={renderAllPickData}
            />
        </View>
    )
}

export default MyPicks