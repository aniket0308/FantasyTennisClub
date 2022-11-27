import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import SearchBar from "../../components/searchBar";
import { getTournamentParticipants } from "../../redux/slice/auth";
import prizeStyle from "./style";

const Prizes = ({ navigation,route }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [description, setDescription] = useState(route?.params)
    const [searchResult, setSearchResult] = useState('')
    const [data,setData]=useState()
    const dispatch=useDispatch()

    const getAllTournamentParticipants = async () => {
        const tournamentId = await AsyncStorage.getItem('@TournamentId')
        dispatch(getTournamentParticipants({setIsLoading,setData,tournamentId}))
    }

    useEffect(() => {
            getAllTournamentParticipants()
    }, [])

    return (
        <View style={prizeStyle.mainContiner}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                showBackArrow={true}
                title={'Event Details'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                rightIcon={constants.icons.shapeBell}
                rightIconStyle={{height:widthPercentageToDP(6),width:widthPercentageToDP(6)}}
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
                            data?.data?.length > 0
                            && data?.data.map((item) => {
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
                            description && isLoading==true
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