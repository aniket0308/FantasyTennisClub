import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Button } from "../../components";
import CardWithImage from "../../components/cardWithImage";
import Loader from "../../components/loader";
import { getDays, savePicks, sendPicksToEmail } from "../../redux/slice/auth";
import dayPickStyle from "./style";

const DayPick = ({ route, navigation }) => {

    const [isSubmit, setIsSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [match, setMatch] = useState()
    const [selectedPlayer, setSelectedPlayer] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [tempArr, setTempArr] = useState([])
    const [objects, setObjects] = useState({})
    const [days, setDays] = useState()
    const dispatch = useDispatch()
    const particularDay = days?.data?.days?.find(item => route?.params?.item?.id == item?.id)
    if (objects != undefined) {
        Object.keys(objects).forEach(key => {
            if (objects[key] === undefined) {
                delete objects[key];
            }
        });
    }
    //get Particular Day Match
    const getAllMatchesOfParticulatDay = async () => {
        const token = await AsyncStorage.getItem('@Token')
        await utils.callApiGet(`api/v1/member-dashboard`, { setIsLoading, setDays, setRefresh, token })
    }

    useEffect(() => {
        getAllMatchesOfParticulatDay()
    }, [isSubmit])

    //rendering Selection DropDown Function
    const renderSelectionDropdown = (item, index) => {
        return (
            <>
                <View style={dayPickStyle.txtViewSelectionStyle}>
                    <Text style={dayPickStyle.selectionTxtStyle}>{particularDay?.is_last_day == true ? `${particularDay?.tournament_day} ${particularDay?.matches[index]?.match_title}` : `${item?.title ? item?.title : item?.match_title}`}</Text>
                </View>
                <SelectDropdown
                    buttonStyle={dayPickStyle.selectionButtonStyle}
                    // data={[item?.players[index]?.player, item?.players[1]?.player]}
                    data={
                        particularDay?.is_last_day == true ?
                            item?.players.map((item, index) => {
                                return item.player
                            })
                            : [item?.players[0]?.player, item?.players[1]?.player]
                    }
                    onSelect={(selectedItem, selectedindex) => {
                        const matchId = item?.players.find(i => i?.player == selectedItem && i)
                        const obj = {
                            'id': matchId?.id,
                            'tournament_day_match_id': matchId?.tournament_day_match_id
                        }
                        tempArr[index] = obj
                        selectedPlayer[index] = selectedItem
                        selectedPlayer.push(selectedPlayer)
                        tempArr.push(tempArr)
                        setMatch(tempArr)
                        var object = match?.reduce(
                            (obj, item) => Object.assign(obj, { [item.tournament_day_match_id]: item.id }), {});
                        setObjects(object)
                    }}
                    defaultButtonText='Drop Down with picks'
                    buttonTextStyle={dayPickStyle.selectionButtonTxtStyle}
                    rowTextStyle={{ textAlign: 'left', marginLeft: 20 }}
                    dropdownStyle={dayPickStyle.dropDownStyle}
                    buttonTextAfterSelection={(selectedItem, sindex) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
            </>
        )
    }

    return (
        <View style={dayPickStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <TouchableOpacity onPress={() => isSubmit == true ? setIsSubmit(false) : navigation.goBack()} style={{ padding: 5, marginTop: 10, marginLeft: -5 }}>
                <Image style={{ height: 20, width: 20, tintColor: constants.colors.darkGreen }} source={constants.icons.backArrow} />
            </TouchableOpacity>
            <Text style={dayPickStyle.txtDay}>{particularDay?.tournament_day}</Text>
            {
                particularDay?.is_last_day == true
                && <Text style={{ color: 'black', fontFamily: constants.fonts.notoSansBold, fontSize: 20, marginTop: 0, marginBottom: 5 }}>Tournament Champions</Text>
            }
            <Text style={dayPickStyle.txtSubmit}>{isSubmit == false ? 'Submit your picks below' : '‌‌Your Picks have been entered successfully!'}</Text>
            <ScrollView
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
                            getAllMatchesOfParticulatDay()
                        }}
                    />
                }
                scrollEnabled={isSubmit == true ? false : true}
                bounces={true}
                style={{ marginBottom: 25 }}
                contentContainerStyle={{ justifyContent: 'center', flex: isSubmit == false ? 0 : 1 }}
                showsVerticalScrollIndicator={false} >
                {isSubmit == false
                    ? <>
                        <View style={{ marginVertical: 30 }}>
                            {
                                particularDay?.matches.map((item, index) => {
                                    return (
                                        <CardWithImage
                                            containerStyle={{ backgroundColor: constants.colors.labelColor, marginBottom: 10 }}
                                            labelTitle={particularDay?.is_last_day == true ? item?.title : `${item?.players[0]?.player} vs ${item?.players[1]?.player}`}
                                            label={particularDay?.is_last_day == true ? `champion 0${index + 1}` : `${item?.title ? item?.title : item?.match_title}`}
                                            labelStyle={dayPickStyle.labelStyle}
                                            titleStyle={dayPickStyle.titleStyle}
                                        />
                                    )
                                })
                            }
                            {
                                particularDay?.matches.map((item, index) => {
                                    return renderSelectionDropdown(item, index)
                                })
                            }
                        </View>
                        {isLoading == true
                            && <Button
                                // disabled={}
                                titleText={'Submit'}
                                btnStyle={{ width: '100%' }}
                                onPress={async() => {
                                    console.log('objects===>', objects);
                                    setIsLoading(false)
                                    const token = await AsyncStorage.getItem('@Token')
                                    //calling Api For Saving Picks
                                    utils.callApi(`api/v1/tournaments/${particularDay?.tournament_id}/${particularDay?.id}/save-members-picks`, { match:objects, token, isLoading, setIsLoading, setIsSubmit }, 'savePick')
                                }}
                            />}
                    </>
                    : <>
                        {
                            particularDay?.matches.map((item, index) => {
                                return (
                                    <CardWithImage
                                        containerStyle={{ backgroundColor: constants.colors.labelColor, marginBottom: 10 }}
                                        labelTitle={`${selectedPlayer[index]}`}
                                        label={`${item?.title ? item?.title : item?.match_title}`}
                                        labelStyle={dayPickStyle.labelStyle}
                                        titleStyle={dayPickStyle.titleStyle}
                                    />
                                )
                            })
                        }
                        {isLoading == true
                            && <Button
                                // disabled={}
                                titleText={'Send to email'}
                                btnStyle={{ width: '100%' }}
                                onPress={async() => {
                                    setIsLoading(false)
                                    // dispatch(sendPicksToEmail({ tournament_id: particularDay?.tournament_id, day_id: particularDay?.id, navigation }))
                                    const sendEmailObj = {
                                        token: await AsyncStorage.getItem('@Token'),
                                        tournament_id: particularDay?.tournament_id,
                                        day_id: particularDay?.id,
                                        navigation: navigation
                                    }
                                    //calling Api For Sending Email
                                    utils.callApi(`api/v1/send-picks-mail`, sendEmailObj, 'sendPickEmail')
                                }}
                            />}
                    </>
                }
            </ScrollView >
            {isLoading == false && <Loader />}
        </View>
    )
}

export default DayPick