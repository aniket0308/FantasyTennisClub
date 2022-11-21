import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Snackbar from "react-native-snackbar";
import { useDispatch } from "react-redux";
import { constants } from "../../common/constant";
import { Button } from "../../components";
import CardWithImage from "../../components/cardWithImage";
import Loader from "../../components/loader";
import { savePicks } from "../../redux/slice/auth";
import dayPickStyle from "./style";

const DayPick = ({ route, navigation }) => {

    const [isSubmit, setIsSubmit] = useState(false)
    const [matches, setMatches] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [match, setMatch] = useState()
    const [selectedPlayer, setSelectedPlayer] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [tempArr, setTempArr] = useState([])
    const [objects, setObjects] = useState({})
    const dispatch = useDispatch()
    const particularDay = matches?.find(item => 'day ' + route?.params == item?.tournament_day)
    console.log('What is particular day', particularDay);
    // let a=[0,1,2,3].
    if (objects != undefined) {
        Object.keys(objects).forEach(key => {
            if (objects[key] === undefined) {
                delete objects[key];
            }
        });
    }
    console.log('OBJECYSSSSS,ob', objects);
    console.log('OBJECYSSSSS,ob', selectedPlayer);
    //get Particular Day Match
    const getAllMatchesOfParticulatDay = async () => {
        const token = await AsyncStorage.getItem('@Token')

        // get Particular Day Match
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
                    setRefresh(false)
                    setIsLoading(true)
                }
                setMatches(json?.data?.days)
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
        getAllMatchesOfParticulatDay()
    }, [isSubmit])

    //rendering Selection DropDown Function
    const renderSelectionDropdown = (item, index) => {
        return (
            <>
                <View style={dayPickStyle.txtViewSelectionStyle}>
                    <Text style={dayPickStyle.selectionTxtStyle}>{`${item?.title ? item?.title : item?.match_title}`}</Text>
                </View>
                <SelectDropdown
                    buttonStyle={dayPickStyle.selectionButtonStyle}
                    data={[item?.players[0]?.player, item?.players[1]?.player]}
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
            <Text style={dayPickStyle.txtDay}>Day {route.params <= 9 ? `0${route.params}` : route.params}</Text>
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
                                            labelTitle={`${item?.players[0]?.player} vs ${item?.players[1]?.player}`}
                                            label={`${item?.title ? item?.title : item?.match_title}`}
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
                                onPress={() => {
                                    setIsLoading(false)
                                    dispatch(savePicks({ matches: objects, submit: () => setIsSubmit(true), isLoading: () => setIsLoading(true),day:particularDay?.id,tournament_id:particularDay?.tournament_id }))
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
                    </>
                }
            </ScrollView >
            {isLoading == false && <Loader />}
        </View>
    )
}

export default DayPick