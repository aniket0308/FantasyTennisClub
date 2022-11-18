import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { widthPercentageToDP } from "react-native-responsive-screen";
import SelectDropdown from "react-native-select-dropdown";
import Snackbar from "react-native-snackbar";
import { useDispatch, useSelector } from "react-redux";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, FloatingInput, Header } from "../../components";
import CardWithImage from "../../components/cardWithImage";
import Loader from "../../components/loader";
import { joinPrivateGroup, oganizePrivateGroup } from "../../redux/slice/auth";
import { isLoaderNotVisibleProfile, isLoaderVisibleProfile } from "../../redux/slice/profile";
import privateGroupDetailsStyle from "./style";

const PrivateGroupDetails = ({ route, navigation }) => {

    const [fullName, setFullName] = useState('')
    const [groupFullName, setGroupFullName] = useState('')
    const [groupEmail, setGroupEmail] = useState('')
    const [groupContact, setGroupContact] = useState('')
    const [groupEvents, setGroupEvents] = useState('')
    const [groupParticipant, setGroupParticipant] = useState('')
    const [loggedInUserName, setLoggedInUserName] = useState('')
    const [membership, setMemberShip] = useState()
    const [tournamentId, setTournamentId] = useState()

    const isLoading = useSelector(state => state?.profile?.isLoading)
    const dispatch = useDispatch()

    const getDetails = async () => {
        const name = await AsyncStorage.getItem('@Name')
        setFullName(name)
        const email = await AsyncStorage.getItem('@Email')
        setGroupEmail(email)
        const mobileNumber = await AsyncStorage.getItem('@MobileNumber')
        setGroupContact(mobileNumber)
    }

    const getLoggedInUserName = async () => {
        const name = await AsyncStorage.getItem('@Name')
        setLoggedInUserName(name)
    }

    const getAllMemberShips = async () => {
        const token = await AsyncStorage.getItem('@Token')
        //calling api for Membership
        fetch('https://fantasytennisclub.com/admin/api/v1/membership/all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }).
            then((response) => response.json()).
            then((json) => {
                ;
                if (json.success == true) {
                    dispatch(isLoaderNotVisibleProfile())
                }
                setMemberShip(json?.data[0].tournaments)
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
                dispatch(isLoaderNotVisibleProfile())
                console.log('What Is Error In Get Api', e)
            })
    }

    useEffect(() => {
        getAllMemberShips()
        getLoggedInUserName()
        getDetails()
    }, [])

    const clearAllData = () => {
        setFullName('')
        setGroupEmail('')
        setGroupContact('')
        setGroupEvents('')
        setGroupParticipant('')
    }

    return (
        <View style={privateGroupDetailsStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView style={{ backgroundColor: constants.colors.backGroundLight }} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginTop: 10 }}>
                <Image style={{ height: 20, width: 20, tintColor: constants.colors.darkGreen }} source={constants.icons.backArrow} />
            </TouchableOpacity>
            <Header
                title={route.params?.title == 'Organize Private Group' ? 'Private Group Details' : 'Join Private Group'}
                subTitle='Complete your details below'
                mainViewHeaderStyle={{ paddingHorizontal: 10 }}
                showBackArrow={false}
            />
            {route.params?.title != 'Organize Private Group'
                ? <View style={{ marginVertical: 50 }}>
                    <CardWithImage
                        containerStyle={{ backgroundColor: constants.colors.labelColor, width: widthPercentageToDP(85), alignSelf: 'center' }}
                        labelTitle={loggedInUserName}
                        label={'Member name'}
                        labelStyle={privateGroupDetailsStyle.labelStyle}
                        titleStyle={privateGroupDetailsStyle.titleStyle}
                    />
                    <FloatingInput
                        textInputStyle={{ width: widthPercentageToDP(85), marginTop: 10, height: widthPercentageToDP(20) }}
                        headerText={'Enter Group Name as provided by Group Admin'}
                        onChangeText={(nameTxt) => { setGroupFullName(nameTxt) }}
                        value={groupFullName}
                    />
                </View>
                : <KeyboardAwareScrollView
                    style={{ marginBottom: 20 }}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    bounces={false} >
                    <FloatingInput
                        textInputStyle={{ width: '85%', marginTop: 10, }}
                        headerText={'Group Admin Full Name'}
                        onChangeText={(nameTxt) => { setFullName(nameTxt) }}
                        value={fullName}
                    />
                    <FloatingInput
                        headerText={'Group Admin E-mail'}
                        textInputStyle={{ marginTop: 15 }}
                        onChangeText={(emailTxt) => { setGroupEmail(emailTxt) }}
                        value={groupEmail}
                        autoCapitalize='none'
                    />
                    <FloatingInput
                        headerText={'Group Admin Mobile number'}
                        textInputStyle={{ marginTop: 15 }}
                        onChangeText={(groupContact) => { setGroupContact(groupContact) }}
                        value={groupContact}
                        keyboardType='phone-pad'
                    />
                    <SelectDropdown
                        buttonStyle={privateGroupDetailsStyle.selectionButtonStyle}
                        data={membership}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                        }}
                        defaultButtonText='Events'
                        buttonTextStyle={privateGroupDetailsStyle.selectionButtonTxtStyle}
                        rowTextStyle={{ textAlign: 'left', marginLeft: 20, alignSelf: 'center', color: 'black' }}
                        dropdownStyle={privateGroupDetailsStyle.dropDownStyle}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            setGroupEvents(selectedItem?.tournament_id)
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            if (groupEvents == '') {
                                return membership[0]?.tournament
                            } else {
                                return selectedItem?.tournament
                            }
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item?.tournament
                        }}
                    />
                    <FloatingInput
                        headerText={'Number of Participants'}
                        textInputStyle={{ marginTop: 15 }}
                        onChangeText={(groupParticipant) => { setGroupParticipant(groupParticipant) }}
                        value={groupParticipant}
                        autoCapitalize='none'
                    />
                    <Text style={privateGroupDetailsStyle.txt}>Minimum Charge for a Private group is $50</Text>
                </KeyboardAwareScrollView>
            }
            <Button
                onPress={() => {
                    if (route.params?.title != 'Organize Private Group') {
                        dispatch(isLoaderVisibleProfile())
                        dispatch(joinPrivateGroup({ groupFullName, dispatch, clearAllData }))
                    } else {
                        dispatch(isLoaderVisibleProfile())
                        dispatch(oganizePrivateGroup({ fullName, groupEmail, groupContact, groupEvents, groupParticipant, dispatch, clearAllData }))
                    }

                }}
                titleText={route.params?.title != 'Organize Private Group' ? 'Join Group' : 'Submit'}
                btnStyle={{ width: '90%', marginBottom: 15, marginTop: 30 }}
            />
            {/* {
                route.params?.title == 'Organize Private Group'
                    ? <Text style={[privateGroupDetailsStyle.txt, { textAlign: 'center', width: "70%" }]}>Request Sent! once confirmed,You will be contacted by one of our tennis
                        experts within 24 hours</Text>
                    : <Text style={[privateGroupDetailsStyle.txt, { textAlign: 'center', width: "70%" }]}>Request Sent! once confirmed,You will be added to the private group
                        (allow 24 hours processing timing)</Text>

            } */}
            {isLoading == true && <Loader />}
        </View>
    )
}

export default PrivateGroupDetails