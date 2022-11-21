import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Platform, SafeAreaView, Text, TextInput, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Snackbar from 'react-native-snackbar';
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import leaderBoardStyle from "./style";
import { utils } from "../../common";
import SearchBar from "../../components/searchBar";

//Leaderboard Screen
const LeaderBoard = ({ route, navigation }) => {
    const [leaderBoardTournament, setLeaderBordTournament] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [searchResult,setSearchResult]=useState('')
    const [tournamentId,setTournamentId]=useState()

    const getTournamentId=async()=>{
        const token = await AsyncStorage.getItem('@Token')
        fetch('https://fantasytennisclub.com/admin/api/v1/member-dashboard', {
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
                setTournamentId(json?.data?.id)
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
                console.log('What Is Error In Get Api', e)
            })
    }

    const getTournamentLeaderBoard = async () => {
        const token = await AsyncStorage.getItem('@Token')
        fetch(`https://fantasytennisclub.com/admin/api/v1/tournaments/${tournamentId}/leaderboard`, {
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
        getTournamentId()
        if(tournamentId!=undefined){
            getTournamentLeaderBoard()
        }
    }, [])

    useEffect(() => {
        if(tournamentId!=undefined){
            getTournamentLeaderBoard()
        }
    }, [tournamentId])

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
                                        marginRight:20,
                                    }]}
                                >{headerItem}</Text>
                                {
                                    item?.data?.data.map((dataItem, dataIndex) => {
                                        if(searchResult!=''){
                                            if(dataItem.member.toLowerCase().includes(searchResult)){
                                                return(
                                                    <Text
                                                    style={[leaderBoardStyle.txtScore,{marginLeft:headerItem=='Contact'?0:10,fontWeight:dataItem?.highlight==true?'900':null}]}>
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
                                                    style={[leaderBoardStyle.txtScore,{marginLeft:headerItem=='Contact'?0:10,fontWeight:dataItem?.highlight==true?'900':null}]}>
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
                    onPressRightIcon={()=>utils.navigateTo(navigation,'GroupLeaderBoard')}
                    rightIconStyle={{tintColor:'#23587B', height: widthPercentageToDP(7), width: widthPercentageToDP(7), alignSelf: 'center' }}
                    rightIconTitle='Private group'
                    rightIconTitleStyle={{color:'#23587B',fontFamily:constants.fonts.nuntinoRegular,fontSize:10,fontWeight:'600'}}
                />
            </View>
            <View style={leaderBoardStyle.mainViewScore}>
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
                <View style={leaderBoardStyle.ViewConsolation}>
                    <Text onPress={() => utils.navigateTo(navigation,'Consolation','Consolation')} style={leaderBoardStyle.consolation}>Consolation</Text>
                </View>
            </View>
        </>
    )
}

export default LeaderBoard