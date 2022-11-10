import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Platform, SafeAreaView, Text, TextInput, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Snackbar from 'react-native-snackbar';
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import groupLeaderBoardStyle from "./style";
import { utils } from "../../common";
import SearchBar from "../../components/searchBar";

//GroupLeaderBoard Screen
const GroupLeaderBoard = ({ route, navigation }) => {
    const [leaderBoardTournament, setLeaderBordTournament] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult,setSearchResult]=useState('')

    const getTournamentLeaderBoard = async () => {
        const token = await AsyncStorage.getItem('@Token')
        fetch('https://fantasytennisclub.com/admin/api/v1/tournaments/1/group/leaderboard', {
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
                setLeaderBordTournament(json)
            }).
            catch(e => {
                Snackbar.show({
                    text: e.toString(),
                    duration: 1000,
                    backgroundColor:'red',
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
        getTournamentLeaderBoard()
    }, [])

    //renderLeaderboard function
    const leaderBoard = ({ item, index }) => {
        return (
            <View style={{ padding: 5, flexDirection: 'row' }}>
                {
                    item?.data?.header.map((headerItem, headerIndex) => {
                        return (
                            <View style={{ flexDirection: 'column' }}>
                                <Text
                                    style={[groupLeaderBoardStyle.txtTitle,
                                    {
                                        marginRight:20,
                                    }]}
                                >{headerItem}</Text>
                                {
                                    item?.data?.data.map((dataItem, dataIndex) => {
                                        if(searchResult!=''){
                                            if(dataItem.member.toLowerCase().includes(searchResult)){
                                                return(
                                                    <Text
                                                    style={[groupLeaderBoardStyle.txtScore,{marginLeft:headerItem=='Contact'?0:10}]}>
                                                    {
                                                        headerIndex == 0
                                                            ? dataItem.member
                                                            : headerIndex == 1
                                                                ? dataItem.total
                                                                : dataItem.days_point[(headerIndex - 1).toString()]
                                                    }
                                                </Text>
                                                )
                                            }
                                        }else{
                                            return (
                                                <Text
                                                    style={[groupLeaderBoardStyle.txtScore,{marginLeft:headerItem=='Contact'?0:10}]}>
                                                    {
                                                        headerIndex == 0
                                                            ? dataItem.member
                                                            : headerIndex == 1
                                                                ? dataItem.total
                                                                : dataItem.days_point[(headerIndex - 1).toString()]
                                                    }
                                                </Text>
                                            )
                                        }
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <>
            <View style={groupLeaderBoardStyle.mainContainer}>
                <SafeAreaView />
                <Header
                    showBackArrow={true}
                    viewHeaderStyle={{width:"78%"}}
                    onPressLeftIcon={() => navigation.goBack()}
                    title={'Group Leaderboard'}
                    titleStyle={{ marginTop: 5 }}
                    subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                    mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10 }}
                    resizeMode='stretch'
                    rightIconStyle={{ height: widthPercentageToDP(10), width: widthPercentageToDP(15), alignSelf: 'center' }}
                />
            </View>
            <View style={groupLeaderBoardStyle.mainViewScore}>
                <SearchBar
                onChangeText={(searchResult)=>setSearchResult(searchResult)}
                />
                {isLoading == true
                    ? <FlatList
                        horizontal={true}
                        scrollEnabled={true}
                        bounces={false}
                        data={[leaderBoardTournament]}
                        contentContainerStyle={{ flexDirection: 'row' }}
                        style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}
                        renderItem={leaderBoard}
                        key={(item) => item}
                        keyExtractor={item => item}
                    />
                    : <Loader />
                }
                <View style={groupLeaderBoardStyle.ViewConsolation}>
                    <Text onPress={() => utils.navigateTo(navigation,'Consolation','Consolation')} style={groupLeaderBoardStyle.consolation}>Consolation</Text>
                </View>
            </View>
        </>
    )
}

export default GroupLeaderBoard