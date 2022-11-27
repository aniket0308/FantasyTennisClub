import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { constants } from "../../common/constant";
import Loader from "../../components/loader";
import SearchBar from "../../components/searchBar";
import { getSavedPicks } from "../../redux/slice/auth";
import dayPickStyle from "../dayPick/style";
import leaderBoardStyle from "../leaderBoard/style";
import selectionDayStyle from "../selectionDays/style";

const LockedScreen = ({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [data,setData]=useState()
    const dispatch=useDispatch()

    //function for getting save member picks
    const getSaveMemberPicks = async () => {
        const tournamentId = await AsyncStorage.getItem('@TournamentId')
        dispatch(getSavedPicks({setData,setIsLoading,tournamentId,tournament_day:route?.params?.tournament_day}))
    }

    const getMemberPickRender = ({ item, index }) => {
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
                                    item?.data?.members_picks.map((dataItem, dataIndex) => {
                                        if (searchResult != '') {
                                            if (dataItem.member.toLowerCase().includes(searchResult)) {
                                                return (
                                                    <Text
                                                        style={[leaderBoardStyle.txtScore, { marginLeft: headerItem == 'Contact' ? 0 : 10, fontWeight: dataItem?.highlight == true ? '900' : null }]}>
                                                        {
                                                            headerIndex == 0
                                                                ? dataItem.member
                                                                : dataItem[route?.params?.item?.matches[headerIndex-1]?.id]
                                                        }
                                                    </Text>
                                                )
                                            }
                                        } else {
                                            return (
                                                <Text
                                                    style={[leaderBoardStyle.txtScore]}>
                                                    {
                                                        headerIndex == 0
                                                            ? dataItem.member
                                                            : dataItem[route?.params?.item?.matches[headerIndex - 1]?.id]
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

    useEffect(() => {
        getSaveMemberPicks()
    }, [])

    return (
        <View style={selectionDayStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginTop: 10, marginLeft: -5 }}>
                <Image style={{ height: 20, width: 20, tintColor: constants.colors.darkGreen }} source={constants.icons.backArrow} />
            </TouchableOpacity>
            <Text style={dayPickStyle.txtDay}>Day {route.params.tournament_day <= 9 ? `0${route.params.tournament_day}` : route.params.tournament_day}</Text>
            <Text style={dayPickStyle.txtSubmit}>Member Picks</Text>
            <View style={[leaderBoardStyle.mainViewScore, { marginHorizontal: -10 }]}>
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
                        renderItem={getMemberPickRender}
                        key={(item) => item}
                        keyExtractor={item => item}
                    />
                    : <Loader />
                }
            </View>
        </View>
    )
}

export default LockedScreen