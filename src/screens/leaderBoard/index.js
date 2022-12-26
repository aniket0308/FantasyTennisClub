import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Platform, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import leaderBoardStyle from "./style";
import { utils } from "../../common";
import SearchBar from "../../components/searchBar";
import { useDispatch } from "react-redux";
import { getTournamentLeaderBoard } from "../../redux/slice/auth";

//Leaderboard Screen
const LeaderBoard = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [data, setData] = useState()
    const dispatch = useDispatch()

    const getTournamentLeaderBoards = async () => {
        const tournamentId = await AsyncStorage.getItem('@TournamentId')
        const token = await AsyncStorage.getItem('@Token')
        utils.callApiGet(`api/v1/tournaments/${tournamentId}/leaderboard`, { setData, setIsLoading, navigation, token }, 'Leaderboard')
    }

    useEffect(() => {
        getTournamentLeaderBoards()
    }, [])

    //renderLeaderboard function
    const leaderBoard = ({ item, index }) => {
        if (item?.error == true) {
            setIsLoading(false)
            // Alert.alert(
            //     "Fantasy Tennis Club",
            //     item?.message,
            //     [
            //         { text: "OK", onPress: () => navigation.goBack() }
            //     ]
            // );
        }
        return (
            <View style={{ padding: 5, flexDirection: 'row' }}>
                {
                    item?.data?.header.map((headerItem, headerIndex) => {
                        return (
                            <View style={{ flexDirection: 'column' }}>
                                <Text
                                    style={[leaderBoardStyle.txtTitle,
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
                                                        style={[leaderBoardStyle.txtScore, { marginLeft: headerItem == 'Contact' ? 0 : 10, fontWeight: dataItem?.highlight == true ? '900' : 'normal', maxWidth: '100%' }]}>
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
                                                        style={[leaderBoardStyle.txtScore, { marginLeft: headerItem == 'Contact' ? 0 : 10, fontWeight: dataItem?.highlight == true ? '900' : 'normal', maxWidth: '100%' }]}>
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
            <View style={leaderBoardStyle.mainContainer}>
                <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
                <SafeAreaView />
                <Header
                    showBackArrow={true}
                    onPressLeftIcon={() => navigation.goBack()}
                    title={'Leaderboard'}
                    subTitle={'View Horizontal'}
                    titleStyle={{ alignSelf: 'center', fontSize: 22 }}
                    subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                    rightIcon={constants.icons.participant}
                    mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10, paddingRight: 5 }}
                    resizeMode='stretch'
                    onPressRightIcon={() => utils.navigateTo(navigation, 'GroupLeaderBoard')}
                    rightIconStyle={{ tintColor: '#23587B', height: widthPercentageToDP(16), width: widthPercentageToDP(16), alignSelf: 'center' }}
                    rightIconTitleStyle={{ color: '#23587B', fontFamily: constants.fonts.nuntinoRegular, fontSize: 10, fontWeight: '600' }}
                />
            </View>
            <View style={leaderBoardStyle.mainViewScore}>
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
                            directionalLockEnabled={true}
                            contentContainerStyle={{ flexDirection: 'row' }}
                            style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}
                            renderItem={leaderBoard}
                            key={(item) => item}
                            keyExtractor={item => item}

                        />
                        : <></>
                    }
                </ScrollView>
                {isLoading==false&&<Loader />}
                <TouchableOpacity onPress={() => utils.navigateTo(navigation, 'Consolation', 'Consolation')} style={leaderBoardStyle.ViewConsolation}>
                    <Text style={leaderBoardStyle.consolation}>Consolation</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default LeaderBoard