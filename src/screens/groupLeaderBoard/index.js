import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import groupLeaderBoardStyle from "./style";
import { utils } from "../../common";
import SearchBar from "../../components/searchBar";
import { useDispatch } from "react-redux";

//GroupLeaderBoard Screen
const GroupLeaderBoard = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [data, setData] = useState('')
    const dispatch = useDispatch()

    const getTournamentLeaderBoard = async () => {
        const tournamentId = await AsyncStorage.getItem('@TournamentId')
        const token = await AsyncStorage.getItem('@Token')
       await utils.callApiGet(`api/v1/tournaments/${tournamentId}/group/leaderboard`, { setData, setIsLoading, token })
    }


    useEffect(() => {
        getTournamentLeaderBoard()
    }, [])

    //renderLeaderboard function
    const leaderBoard = ({ item, index }) => {
        if (item?.error == true) {
            setIsLoading(false)
            Alert.alert(
                "Fantasy Tennis Club",
                item?.message,
                [
                    { text: "OK", onPress: () => navigation.goBack() }
                ]
            );
        }
        return (
            <View style={{ padding: 5, flexDirection: 'row' }}>
                {
                    item?.data?.header.map((headerItem, headerIndex) => {
                        return (
                            <View style={{ flexDirection: 'column' }}>
                                <Text
                                    style={[groupLeaderBoardStyle.txtTitle,
                                    {
                                        marginRight: 20,
                                    }]}
                                >{headerItem}</Text>
                                {
                                    item?.data?.data.map((dataItem, dataIndex) => {
                                        if (searchResult != '') {
                                            if (dataItem.member.toLowerCase().includes(searchResult)) {
                                                return (
                                                    <Text
                                                        numberOfLines={1}
                                                        style={[groupLeaderBoardStyle.txtScore, { marginLeft: headerItem == 'Contact' ? 0 : 10, fontWeight: dataItem?.highlight == true ? '900' : 'normal', maxWidth: '100%' }]}>
                                                        {
                                                            headerIndex == 0
                                                                ? dataItem.member
                                                                : headerIndex == 1
                                                                    ? dataItem.total
                                                                    : dataItem.days_point[(headerIndex - 2).toString()]
                                                        }
                                                    </Text>
                                                )
                                            }
                                        } else {
                                            return (
                                                <Text
                                                    numberOfLines={1}
                                                    style={[groupLeaderBoardStyle.txtScore, { marginLeft: headerItem == 'Contact' ? 0 : 10, fontWeight: dataItem?.highlight == true ? '900' : 'normal', maxWidth: '100%' }]}>
                                                    {
                                                        headerIndex == 0
                                                            ? dataItem.member
                                                            : headerIndex == 1
                                                                ? dataItem.total
                                                                : dataItem.days_point[(headerIndex - 2).toString()]
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
                    viewHeaderStyle={{ width: widthPercentageToDP(78) }}
                    onPressLeftIcon={() => navigation.goBack()}
                    title={'Private Group Leaderboard'}
                    titleStyle={{ marginTop: 8, }}
                    subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                    mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10 }}
                    resizeMode='stretch'
                    rightIconStyle={{ height: widthPercentageToDP(10), width: widthPercentageToDP(15), alignSelf: 'center' }}
                />
            </View>
            <View style={groupLeaderBoardStyle.mainViewScore}>
                <SearchBar
                    onChangeText={(searchResult) => setSearchResult(searchResult)}
                />
                <ScrollView style={{marginBottom:25}} bounces={false}>
                {isLoading == true
                    ? <FlatList
                        horizontal={true}
                        scrollEnabled={true}
                        bounces={false}
                        data={[data]}
                        contentContainerStyle={{ flexDirection: 'row' }}
                        style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}
                        renderItem={leaderBoard}
                        key={(item) => item}
                        keyExtractor={item => item}
                    />
                    : <></>
                }
                </ScrollView>
                {isLoading==false&&<Loader/>}
                <TouchableOpacity onPress={() => utils.navigateTo(navigation, 'Consolation', 'Private Group Consolation')} style={groupLeaderBoardStyle.ViewConsolation}>
                    <Text style={groupLeaderBoardStyle.consolation}>Consolation</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default GroupLeaderBoard