import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Platform, SafeAreaView, Text, TextInput, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useToast } from "react-native-toast-notifications";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import SearchBar from "../../components/searchBar";
import Loader from "../../components/loader";
import leaderBoardStyle from "./style";

//Leaderboard Screen
const LeaderBoard = ({ route, navigation }) => {
    const [leaderBoardTournament, setLeaderBordTournament] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    const getTournamentLeaderBoard = async () => {
        const token = await AsyncStorage.getItem('@Token')
        fetch('https://fantasytennisclub.com/admin/api/v1/tournaments/1/leaderboard', {
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
                toast.show(e.toString(), {
                    type: 'danger',
                    placement: 'top'
                })
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
                                    style={[leaderBoardStyle.txtTitle,
                                    {
                                        marginRight: index == 0 ? 20 : 10,
                                        textAlign: index != 0 ? 'center' : "left"
                                    }]}
                                >{headerItem}</Text>
                                {
                                    item?.data?.data.map((dataItem, dataIndex) => {
                                        return (
                                            <Text
                                                style={headerIndex == 0 ? leaderBoardStyle.txtName : leaderBoardStyle.txtScore}>
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
            <View style={leaderBoardStyle.mainContainer}>
                <SafeAreaView />
                <Header
                    showBackArrow={true}
                    onPressLeftIcon={() => navigation.goBack()}
                    title={'Leaderboard'}
                    subTitle={'View Horizontal'}
                    titleStyle={{ alignSelf: 'center', fontSize: 22, }}
                    subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                    rightIcon={constants.icons.participant}
                    mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10 }}
                    resizeMode='stretch'
                    rightIconStyle={{ height: widthPercentageToDP(10), width: widthPercentageToDP(15), alignSelf: 'center' }}
                />
            </View>
            <View style={leaderBoardStyle.mainViewScore}>
                <SearchBar />
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
                <View style={leaderBoardStyle.ViewConsolation}>
                    <Text style={leaderBoardStyle.consolation}>Consolation</Text>
                </View>
            </View>
        </>
    )
}

export default LeaderBoard