import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useToast } from "react-native-toast-notifications";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import membershipStyle from "../membership/style";
import buyMemberShipStyle from "./style";

const BuyMemberShip = ({ navigation }) => {

    const [memberShip, setMemberShip] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

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
                if (json.success == true) {
                    setIsLoading(true)
                }
                setMemberShip(json?.data)
            }).
            catch(e => {
                toast.show(e.toString(), {
                    type: 'danger',
                    placement: 'top'
                })
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
    }

    useEffect(() => {
        getAllMemberShips()
    }, [])

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
    const renderMemberShip = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => utils.navigateTo(navigation, item.text == 'Organize Private Group' || item.text == 'Join Private Group' ? constants.screens.privateGroupDetails : constants.screens.membership, item.text)}
                style={[buyMemberShipStyle.touchable, { marginRight: index % 2 != 0 ? 0 : 30 }]}>
                <Image style={{ alignSelf: 'center', height: widthPercentageToDP(22), width: widthPercentageToDP(22) }} source={{ uri: item?.banner_image_url }} />
                <Text numberOfLines={2} style={buyMemberShipStyle.text}>{item?.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={membershipStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView style={{ backgroundColor: constants.colors.backGroundLight }} />
            <Header
                title='Become a Member'
                subTitle='Complete your details below'
                mainViewHeaderStyle={{ paddingHorizontal: 20 }}
                showBackArrow={false}
                rightIcon={constants.icons.cart}
            />
            {isLoading == true
                ? <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 25 }}>
                    <FlatList
                        data={memberShip?.length > 0 ? memberShip : []}
                        numColumns={2}
                        style={{ flexDirection: 'row', marginBottom: 25, alignSelf: 'center' }}
                        renderItem={renderMemberShip}
                        key={(item) => item.id}
                        keyExtractor={item => item}
                    />
                </ScrollView>
                : <Loader/>
            }
        </View>
    )
}

export default BuyMemberShip