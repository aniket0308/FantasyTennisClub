import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
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
    const [match1, setMatch1] = useState()
    const [match2, setMatch2] = useState()
    const [match3, setMatch3] = useState()
    const dispatch=useDispatch()
    const particularDay = matches?.find(item => 'day ' + route?.params == item?.tournament_day)
    console.log('Matches===>', match1,' .    ',match2,' .     ',match3);

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
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
    }

    useEffect(() => {
        getAllMatchesOfParticulatDay()
    }, [])

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
                        if (index == 0) {
                            const match=item?.players.find(i=>i?.player==selectedItem&&i)
                            setMatch1(match)
                        } else if (index == 1) {
                            const match=item?.players.find(i=>i?.player==selectedItem&&i)
                            setMatch2(match)
                        } else {
                            const match=item?.players.find(i=>i?.player==selectedItem&&i)
                            setMatch3(match)
                        }
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginTop: 10, marginLeft: -5 }}>
                <Image style={{ height: 20, width: 20, tintColor: constants.colors.darkGreen }} source={constants.icons.backArrow} />
            </TouchableOpacity>
            <Text style={dayPickStyle.txtDay}>Day {route.params <= 9 ? `0${route.params}` : route.params}</Text>
            <Text style={dayPickStyle.txtSubmit}>{isSubmit == false ? 'Submit your picks below' : '‌‌Your Picks have been entered successfully!'}</Text>
            <ScrollView
                scrollEnabled={isSubmit == true ? false : true}
                bounces={false}
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
                                    // console.log(particularDay?.matches[0]);
                                    dispatch(savePicks({match1,match2,match3}))
                                    // setIsSubmit(true)
                                }}
                            />}
                    </>
                    : <>
                        <View style={{ marginVertical: 30, justifyContent: 'center', }}>
                            <CardWithImage
                                containerStyle={{ backgroundColor: constants.colors.labelColor }}
                                labelTitle={'User Selection'}
                                label={'Day 01 Match 1'}
                                labelStyle={dayPickStyle.labelStyle}
                                titleStyle={dayPickStyle.titleStyle}
                            />
                            <CardWithImage
                                containerStyle={{ backgroundColor: constants.colors.labelColor, marginVertical: 12 }}
                                labelTitle={'User Selection'}
                                label={'Day 01 Match 1'}
                                labelStyle={dayPickStyle.labelStyle}
                                titleStyle={dayPickStyle.titleStyle}
                            />
                            <CardWithImage
                                containerStyle={{ backgroundColor: constants.colors.labelColor }}
                                labelTitle={'User Selection'}
                                label={'Day 01 Match 1'}
                                labelStyle={dayPickStyle.labelStyle}
                                titleStyle={dayPickStyle.titleStyle}
                            />
                        </View>
                    </>
                }
            </ScrollView >
            {isLoading == false && <Loader />}
        </View>
    )
}

export default DayPick