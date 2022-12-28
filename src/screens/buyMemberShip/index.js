import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Snackbar from 'react-native-snackbar';
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import { addTournamenrMembership, deleteAllMembership, getMembershipTournament } from "../../realm/realmOperations";
import { checkAuthentication, logout } from "../../redux/slice/auth";
import { store } from "../../redux/store";
import membershipStyle from "../membership/style";
import buyMemberShipStyle from "./style";

const BuyMemberShip = ({ navigation, route }) => {

    const [memberShip, setMemberShip] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [membershipArr, setMembershipArr] = useState([])

    let tempArr = []

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
            then(async (response) => {
                if (response.status == 401) {
                    // const keys = await AsyncStorage.getAllKeys()
                    // const cacheKeys = keys.filter(k => k.indexOf('CACHE.KEY.') !== -1)
                    // console.log('what are cache keys',cacheKeys);
                    // if (cacheKeys.length) {
                    //     await AsyncStorage.multiRemove(cacheKeys)
                    // }
                    await AsyncStorage.clear()
                    store.dispatch(logout())
                }
                return response.json()
            }).
            then((json) => {
                if (json.success == true) {
                    setIsLoading(true)
                }
                setRefresh(false)
                setMemberShip(json?.data)
                store.dispatch(checkAuthentication({ data: json.data, token, isRegisteredFirstTime: false }))
            }).
            catch(e => {
                // Snackbar.show({
                //     text: e.toString(),
                //     duration: 1000,
                //     backgroundColor: 'red',
                // });
                setRefresh(false)
                setIsLoading(false)
                console.log('What Is Error In Getfdfdf Api', e)
            })
    }

    const getMembershipDetails = async () => {
        let checkMembershipExist = await getMembershipTournament()
        setMembershipArr(checkMembershipExist)
    }

    useEffect(() => {
        getMembershipDetails()
        getAllMemberShips()
    }, [])

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getMembershipDetails()
            getAllMemberShips()
        });
        return focusHandler;
    }, [navigation]);

    //Render Function For Membership
    const renderMemberShip = (item, index) => {
        return (
            <TouchableOpacity
                onPress={async () => {

                    if (item?.action == 'create_group' || item?.action == 'join_group') {
                        utils.navigateTo(navigation, constants.screens.privateGroupDetails, { goBackUrgent: item?.action == 'create_group' ? true : false, item })
                    }
                    else if (item?.membership_type == 1) {
                        deleteAllMembership()
                        utils.navigateTo(navigation, item?.action == 'create_group' || item?.action == 'join_group' ? constants.screens.privateGroupDetails : constants.screens.membership, { isSeason: true, item })
                    }
                    else {
                        let checkMembershipExist = await getMembershipTournament()
                        const userId = await AsyncStorage.getItem('@userId')
                        if (checkMembershipExist?.length > 0) {
                            let FilteringMembership = checkMembershipExist.find((i) => {
                                if(item?.tournament_id==i?.tournament_id&&i?.userId==userId){
                                    console.log(item?.tournament_id==i?.tournament_id);
                                    return item
                                }
                            })
                            if (FilteringMembership?.tournament_id == item?.tournament_id&&FilteringMembership?.userId==userId) {
                                Alert.alert(
                                    "Fantasy Tennis Club",
                                    'membership Already Added',
                                )
                            } else {
                                addTournamenrMembership(item)
                                utils.navigateTo(navigation, item?.action == 'create_group' || item?.action == 'join_group' ? constants.screens.privateGroupDetails : constants.screens.membership, { isSeason: false })
                            }

                        } else {
                            addTournamenrMembership(item)
                            utils.navigateTo(navigation, item?.action == 'create_group' || item?.action == 'join_group' ? constants.screens.privateGroupDetails : constants.screens.membership, { isSeason: false })
                        }
                    }
                }
                }
                style={[buyMemberShipStyle.touchable, { marginRight: index % 2 != 0 ? 0 : 30, paddingHorizontal: 10 }]}>
                <Image style={{ alignSelf: 'center', height: widthPercentageToDP(18), width: widthPercentageToDP(18) }} source={{ uri: item?.banner_image_url }} />
                <View>
                    <Text numberOfLines={2} style={buyMemberShipStyle.text}>{item?.tournament ? item?.tournament : item.title}</Text>
                    <Text numberOfLines={2} style={[buyMemberShipStyle.text, { marginTop: -5 }]}>{item?.price && `$${item?.price}`}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={membershipStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView style={{ backgroundColor: constants.colors.backGroundLight }} />
            <Header
                title='Buy Membership'
                subTitle='Select from below'
                titleStyle={{ width: widthPercentageToDP(route?.params?.showBackArrow == true ? 70 : widthPercentageToDP(50)) }}
                mainViewHeaderStyle={{ paddingHorizontal: 10, width: widthPercentageToDP(95) }}
                showBackArrow={route?.params?.showBackArrow == true ? true : false}
                rightIcon={constants.icons.cart}
                onPressLeftIcon={() => { navigation.goBack() }}
                isCartHavingThings={membershipArr?.length == 0 ? false : true}
                onPressRightIcon={async () => {
                    let tempMembershipArr = membershipArr.map((i) => {
                        return parseInt(i)
                    })
                    if (membershipArr?.length > 0) {
                        utils.navigateTo(navigation, constants.screens.membership, { isSeason: false })
                    }
                }}
            />
            {isLoading == true
                ? <ScrollView
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
                                getAllMemberShips()
                            }} />}
                    showsVerticalScrollIndicator={false} style={{ marginBottom: 25 }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: widthPercentageToDP(3) }}>
                        {
                            memberShip?.length > 0
                            && memberShip.map((item, index) => {
                                return renderMemberShip(item, index)
                            })
                        }
                    </View>
                </ScrollView>
                : <Loader />
            }
        </View>
    )
}

export default BuyMemberShip