import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, RefreshControl, SafeAreaView, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import SearchBar from "../../components/searchBar";
import Loader from "../../components/loader";
import consolationStyle from "./style";
import { useDispatch } from "react-redux";
import { getConsolationLeaderBoard, getGroupConsolationLeaderBoard, getSeasonLeaderBoard } from "../../redux/slice/auth";
import { utils } from "../../common";

//Leaderboard Screen
const Consolation = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState()
    const dispatch = useDispatch()

    const getTournamentLeaderBoard = async () => {
        const token= await AsyncStorage.getItem('@Token')
        const tournamentId = await AsyncStorage.getItem('@TournamentId')
        if (route.params == 'Season Ranking') {
            utils.callApiGet(`api/v1/season-leaderboard`, { setIsLoading, setRefresh, setData,token })
        } else if (route.params == 'Consolation') {
            utils.callApiGet(`api/v1/tournaments/${tournamentId}/consolation-leaderboard`, { setIsLoading, setRefresh, setData,token })
        }
        else {
            utils.callApiGet(`api/v1/tournaments/${tournamentId}/group/consolation-leaderboard`, { setIsLoading, setRefresh, setData,token })
        }
    }
    
    useEffect(() => {
        if (route.params == 'Season Ranking') {
            getTournamentLeaderBoard()
        } else {
            getTournamentLeaderBoard()
        }
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
                {item.data!=null&&
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
                                    route.params == 'Season Ranking'
                                        ?
                                        item?.data?.leaderboard_data.map((dataItem, dataIndex) => {
                                            if (searchResult != '') {
                                                if (dataItem.member.toLowerCase().includes(searchResult)) {
                                                    return (
                                                        <Text
                                                            style={[consolationStyle.txtScore, { alignSelf: 'flex-start', marginLeft: headerIndex != 0 ? 5 : 0, maxWidth: 150,fontWeight: dataItem?.highlight == true ? '900' : 'normal' }]}>
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
                                                        style={[consolationStyle.txtScore, { alignSelf: 'flex-start', marginLeft: headerIndex != 0 ? 5 : 0, maxWidth: 150,fontWeight: dataItem?.highlight == true ? '900' : 'normal' }]}>
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
                                        :
                                        item?.data?.data.map((dataItem, dataIndex) => {
                                            return (
                                                <Text
                                                    style={[consolationStyle.txtScore, { marginLeft: headerItem == 'Contact' ? 0 : 10,fontWeight: dataItem?.highlight == true ? '900' : 'normal' }]}>
                                                    {
                                                        headerIndex == 0
                                                            ? dataItem.member
                                                            : headerIndex == 1
                                                                ? dataItem.total
                                                                : dataItem.days_point[(headerIndex - 2).toString()]
                                                    }
                                                </Text>
                                            )
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
                    title={route?.params == undefined ? '' : route?.params}
                    subTitle={route?.params == 'Season Ranking' ? '' : 'View Horizontal '}
                    titleStyle={{ alignSelf: 'center', fontSize: 22, marginTop: 8 }}
                    subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                    rightIcon={route?.params == 'Season Ranking' ? '' : constants.icons.participant}
                    mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10, width: route.params == 'Season Ranking' ? widthPercentageToDP(75) : null }}
                    resizeMode='stretch'
                    rightIconStyle={{ tintColor: '#23587B', height: widthPercentageToDP(16), width: widthPercentageToDP(16), alignSelf: 'center', marginTop: 10 }}
                    rightIconTitleStyle={{ color: '#23587B', fontFamily: constants.fonts.nuntinoRegular, fontSize: 10, fontWeight: '600' }}
                />
            </View>
            <View style={consolationStyle.mainViewScore}>
                <SearchBar
                    onChangeText={(searchResult) => setSearchResult(searchResult)}
                />
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
                        contentContainerStyle={{ flexDirection: 'row' }}
                        style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}
                        renderItem={leaderBoard}
                        key={(item) => item}
                        keyExtractor={item => item}
                    />
                    : <Loader />
                }
                <View style={consolationStyle.ViewConsolation}>
                    {/* <Text style={consolationStyle.consolation}>Consolation</Text> */}
                </View>
            </View>
        </>
    )
}

export default Consolation