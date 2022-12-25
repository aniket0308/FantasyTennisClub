import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import SearchBar from "../../components/searchBar";
import { getSeasonLeaderBoard } from "../../redux/slice/auth";
import consolationStyle from "../consolation/style";


//season LeaderBoard
const seasonLeaderBoard = ({ route, navigation }) => {
    const [leaderBoardTournament, setLeaderBordTournament] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState()
    const dispatch = useDispatch()

    //Function For Getting Season Leaderboard
    const getTournamentLeaderBoard = async () => {
        dispatch(getSeasonLeaderBoard({ setIsLoading, setRefresh, setData }))
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
                                    style={[consolationStyle.txtTitle,
                                    {
                                        marginRight: 20,
                                    }]}
                                >{headerItem}</Text>
                                {
                                    item?.data?.leaderboard_data.map((dataItem, dataIndex) => {
                                        if (searchResult != '') {
                                            if (dataItem.member.toLowerCase().includes(searchResult)) {
                                                return (
                                                    <Text
                                                        style={[consolationStyle.txtScore, { alignSelf: 'flex-start', marginLeft: headerIndex != 0 ? 5 : 0, maxWidth: 150 }]}>
                                                        {
                                                            headerIndex == 0
                                                                ? dataItem.member
                                                                : headerIndex == 1
                                                                    ? dataItem.total
                                                                    : [dataItem.tournament].map((i, ind) => {
                                                                        return i[headerItem]
                                                                    })
                                                        }
                                                    </Text>
                                                )
                                            }
                                        } else {
                                            return (
                                                <Text
                                                    style={[consolationStyle.txtScore, { alignSelf: 'flex-start', marginLeft: headerIndex != 0 ? 5 : 0, maxWidth: 150 }]}>
                                                    {
                                                        headerIndex == 0
                                                            ? dataItem.member
                                                            : headerIndex == 1
                                                                ? dataItem.total
                                                                : [dataItem.tournament].map((i, ind) => {
                                                                    return i[headerItem]
                                                                })
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
            <View style={consolationStyle.mainContainer}>
                <SafeAreaView />
                <Header
                    showBackArrow={true}
                    onPressLeftIcon={() => navigation.goBack()}
                    title={'Season Ranking'}
                    titleStyle={{ alignSelf: 'center', fontSize: 22, marginTop: 8 }}
                    mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10, width: widthPercentageToDP(75) }}
                    resizeMode='stretch'
                    rightIconStyle={{ tintColor: '#23587B', height: widthPercentageToDP(16), width: widthPercentageToDP(16), alignSelf: 'center', marginTop: 10 }}
                    rightIconTitleStyle={{ color: '#23587B', fontFamily: constants.fonts.nuntinoRegular, fontSize: 10, fontWeight: '600' }}
                />
            </View>
            <View style={[consolationStyle.mainViewScore]}>
                <SearchBar
                    onChangeText={(searchResult) => setSearchResult(searchResult)}
                />
                <ScrollView bounces={false}>
                    {isLoading == true
                        ? <FlatList
                            refreshControl={
                                <RefreshControl
                                    title='Loading...'
                                    tintColor={constants.colors.darkBlue}
                                    colors={[constants.colors.darkBlue]}
                                    titleColor={constants.colors.darkBlue}
                                    size='large'
                                    refreshing={refresh}
                                    onRefresh={() => {
                                        setRefresh(true)
                                        getTournamentLeaderBoard()
                                    }}
                                />
                            }
                            horizontal={true}
                            scrollEnabled={true}
                            bounces={false}
                            data={[data]}
                            contentContainerStyle={{ flexDirection: 'row', marginBottom: 25 }}
                            style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}
                            renderItem={leaderBoard}
                            key={(item) => item}
                            keyExtractor={item => item}
                        />
                        : <></>
                    }
                </ScrollView>
                {isLoading==false&&<Loader />}
                <View style={consolationStyle.ViewConsolation}>
                    {/* <Text style={consolationStyle.consolation}>Consolation</Text> */}
                </View>
            </View>
        </>
    )
}

export default seasonLeaderBoard