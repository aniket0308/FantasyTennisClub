import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Image, Platform, RefreshControl, SafeAreaView, Text, TextInput, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import SearchBar from "../../components/searchBar";
import Loader from "../../components/loader";
import consolationStyle from "./style";
import Snackbar from 'react-native-snackbar';

//Leaderboard Screen
const Consolation = ({ route, navigation }) => {
    const [leaderBoardTournament, setLeaderBordTournament] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult, setSearchResult] = useState('')
    const [refresh, setRefresh] = useState(false)

    const getTournamentLeaderBoard = async () => {
        const token = await AsyncStorage.getItem('@Token')
        fetch(
            route.params == 'Season Ranking'
                ? 'https://fantasytennisclub.com/admin/api/v1/season-leaderboard'
                : route.params == 'Consolation'
                    ? 'https://fantasytennisclub.com/admin/api/v1/tournaments/1/group/consolation-leaderboard'
                    : 'https://fantasytennisclub.com/admin/api/v1/tournaments/1/consolation-leaderboard', {
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
                    setRefresh(false)
                    setIsLoading(true)
                }

                if (json.data == null) {
                    setIsLoading(false)
                    Alert.alert(
                        "Fantasy Tennis Club",
                        json?.message,
                        [
                            { text: "OK", onPress: () => navigation.goBack() }
                        ]
                    );
                }
                setLeaderBordTournament(json)
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
                setRefresh(false)
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
                                        :
                                        item?.data?.data.map((dataItem, dataIndex) => {
                                            return (
                                                <Text
                                                    style={[consolationStyle.txtScore, { marginLeft: headerItem == 'Contact' ? 0 : 10 }]}>
                                                    {
                                                        headerIndex == 0
                                                            ? dataItem.member
                                                            : headerIndex == 1
                                                                ? dataItem.total
                                                                : dataItem.days_point[(headerIndex - 1).toString()]
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
                    subTitle={route?.params == 'Season Ranking' ? '' : 'View Horizontal'}
                    titleStyle={{ alignSelf: 'center', fontSize: 22, marginTop: 8 }}
                    subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                    rightIcon={constants.icons.participant}
                    mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10 }}
                    resizeMode='stretch'
                    rightIconStyle={{ tintColor: '#23587B', height: widthPercentageToDP(7), width: widthPercentageToDP(7), alignSelf: 'center' }}
                    rightIconTitle='Private group'
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
                        data={[leaderBoardTournament]}
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