import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import SearchBar from "../../components/searchBar";
import prizeStyle from "./style";

const Prizes = ({ navigation }) => {

    const [isLoading,setIsLoading]=useState(false)
    const [participant,setParticipants]=useState()

    const getAllTournamentParticipants=async()=>{
        const token = await AsyncStorage.getItem('@Token')
        //calling api for Getting Participants
        fetch('https://fantasytennisclub.com/admin/api/v1/tournaments/1/participations', {
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

    useEffect(()=>{
        getAllTournamentParticipants()
    },[])

    return (
        <View style={prizeStyle.mainContiner}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                showBackArrow={true}
                title={'EVENT DETAILS'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                rightIcon={constants.icons.shapeBell}
                onPressRightIcon={()=>utils.navigateTo(navigation,constants.screens.notification)}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <View style={{ backgroundColor: constants.colors.white,flex:1,marginBottom:25 }}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
                <Text style={prizeStyle.txtMemberParticipate}>Members Participating</Text>
                <SearchBar />
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    {
                        participant?.length>0
                        &&participant.map((item)=>{
                            return <Text style={prizeStyle.txtName}>{item?.name}</Text>
                        })
                    }
                </View>
                <Text style={[prizeStyle.txtMemberParticipate, { marginVertical: 10 }]}>Prize Breakdown</Text>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={prizeStyle.txtName}>
                        - Winner takes 60% of the purse
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        - Second place takes 20%
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        - Consolation takes 12.5%
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        - Third place takes 7.5%
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        Season Accumulative Purse = $307
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        Prize distribution based on funds collected
                    </Text>
                </View>
                <Text style={[prizeStyle.txtMemberParticipate, { marginVertical: 10 }]}>Special Awards</Text>
                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                    <Text style={prizeStyle.txtName}>
                        - Free game for scoring 4 points in Day 9
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        - Fee game for the most double faults (with no walk overs)
                    </Text>
                </View>
            </ScrollView>
            </View>
            {isLoading==false&&<Loader/>}
        </View>
    )
}

export default Prizes