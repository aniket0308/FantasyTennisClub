import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import groupLeaderBoardStyle from "./style";
import { utils } from "../../common";
import SearchBar from "../../components/searchBar";
import { useDispatch } from "react-redux";
import { getLeaderBoard } from "../../redux/slice/auth";

//GroupLeaderBoard Screen
const GroupLeaderBoard = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [data, setData] = useState('')
    const dispatch = useDispatch()

    const getTournamentLeaderBoard = async () => {
        const tournamentId = await AsyncStorage.getItem('@TournamentId')
        dispatch(getLeaderBoard({ setData, setIsLoading, tournamentId }))
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
                                        marginRight: 20,
                                    }]}
                                >{headerItem}</Text>
                                {
                                    item?.data?.data.map((dataItem, dataIndex) => {
                                        if (searchResult != '') {
                                            if (dataItem.member.toLowerCase().includes(searchResult)) {
                                                return (
                                                    <Text
                                                        style={[groupLeaderBoardStyle.txtScore, { marginLeft: headerItem == 'Contact' ? 0 : 10 }]}>
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
                                                    style={[groupLeaderBoardStyle.txtScore, { marginLeft: headerItem == 'Contact' ? 0 : 10 }]}>
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
                    title={'Group Leaderboard'}
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
                    : <Loader />
                }
                <TouchableOpacity onPress={() => utils.navigateTo(navigation, 'Consolation', 'Group Consolation')} style={groupLeaderBoardStyle.ViewConsolation}>
                    <Text style={groupLeaderBoardStyle.consolation}>Consolation</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default GroupLeaderBoard