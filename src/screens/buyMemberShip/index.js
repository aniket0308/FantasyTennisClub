import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Snackbar from 'react-native-snackbar';
import { useSelector } from "react-redux";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import membershipStyle from "../membership/style";
import buyMemberShipStyle from "./style";

const BuyMemberShip = ({ navigation, route }) => {

    const [memberShip, setMemberShip] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const  [refresh,setRefresh]=useState(false)
    const selectorAuth=useSelector(state=>state.auth)

     console.log('what is authSelsdsds',selectorAuth?.membershipData[0]?.membershipTournamentData)


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
                    setIsLoading(true)
                }
                setRefresh(false)
                setMemberShip(json?.data)
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
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
    }

    useEffect(() => {
        getAllMemberShips()
    }, [])

    useEffect(() => {
        const focusHandler = navigation.addListener('focus', () => {
            getAllMemberShips()
        });
        return focusHandler;
    }, [navigation]);

    const dataArr = [
        {
            icon: constants.icons.calander,
            text: 'Season$80'
        },
        {
            icon: constants.icons.tennisMembership,
            text: 'ATP Event$15'
        },
        {
            icon: constants.icons.map,
            text: 'Australian Open$25'
        },
        {
            icon: constants.icons.effilTower,
            text: 'Wimbledon$25'

        },
        {
            icon: constants.icons.Rackets,
            text: 'Roland Garros$25'
        },
        {
            icon: constants.icons.elizabeth,
            text: 'Wimbledon$25'
        },
        {
            icon: constants.icons.profileMembership,
            text: 'Organize Private Group'
        },
        {
            icon: constants.icons.groupProfile,
            text: 'Join Private Group'
        }
    ]

    //Render Function For Membership
    const renderMemberShip = (item, index) => {
        console.log('item.tournament_id',item.tournament_id,'==',selectorAuth?.membershipData[0]?.membershipTournamentData?.tournament_id);
        return (
            <TouchableOpacity
            disabled={selectorAuth?.membershipData[0]?.membershipTournamentData?.tournament_id==item.tournament_id?true:false}
                onPress={() => utils.navigateTo(navigation, item.title == 'Organize Private Group' || item.title == 'Join Private Group' ? constants.screens.privateGroupDetails : constants.screens.membership, item)}
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
                titleStyle={{ width: widthPercentageToDP(route?.params?.showBackArrow == true ? 70 : null) }}
                mainViewHeaderStyle={{ paddingHorizontal: 10, width: widthPercentageToDP(95) }}
                showBackArrow={route?.params?.showBackArrow == true ? true : false}
                rightIcon={constants.icons.cart}
                onPressLeftIcon={() => { navigation.goBack() }}
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