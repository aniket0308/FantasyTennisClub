import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import SearchBar from "../../components/searchBar";
import prizeStyle from "./style";

const Prizes = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [participant, setParticipants] = useState()
    const [description, setDescription] = useState()
    const [searchResult, setSearchResult] = useState('')
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
                    setIsLoading(false)
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
    

    const getAllTournamentParticipants = async () => {
        const token = await AsyncStorage.getItem('@Token')
        //calling api for Getting Participants
        fetch(`https://fantasytennisclub.com/admin/api/v1/tournaments/${tournamentId}/participations`, {
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
                setParticipants(json.data)
            }
            ).
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
                setIsLoading(false)
                console.log('What Is Error In Get Api', e.toString())
            })
    }

    const getDescription = async () => {
        const token = await AsyncStorage.getItem('@Token')
        //calling api for Getting Participants
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
                setDescription(json?.data?.description)
            }
            ).
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
                setIsLoading(false)
                console.log('What Is Error In Get Api', e.toString())
            })
    }

    useEffect(() => {
        getTournamentId()
        if(tournamentId!=undefined){
            getAllTournamentParticipants()
            getDescription()
        }
    }, [])

    useEffect(() => {
        if(tournamentId!=undefined){
            getAllTournamentParticipants()
            getDescription()
        }
    }, [tournamentId])

    return (
        <View style={prizeStyle.mainContiner}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                showBackArrow={true}
                title={'Event Details'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                rightIcon={constants.icons.shapeBell}
                onPressRightIcon={() => utils.navigateTo(navigation, constants.screens.notification)}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <View style={{ backgroundColor: constants.colors.white, flex: 1, marginBottom: 25 }}>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
                    <Text style={prizeStyle.txtMemberParticipate}>Members Participating</Text>
                    <SearchBar
                    onChangeText={(search)=>setSearchResult(search)}
                    />
                    <View style={{ marginTop: 10, marginLeft: 10 }}>
                        {
                            participant?.length > 0
                            && participant.map((item) => {
                                if (searchResult != '') {
                                    if (item?.name.toLowerCase().includes(searchResult)) {
                                        return <Text style={prizeStyle.txtName}>{item?.name}</Text>
                                    }
                                }else{
                                    return <Text style={prizeStyle.txtName}>{item?.name}</Text>
                                }
                            })
                        }
                        {
                            description
                            && <RenderHTML
                                source={{ html: `${description}` }}
                            />
                        }
                    </View>
                </ScrollView>
            </View>
            {isLoading == false && <Loader />}
        </View>
    )
}

export default Prizes