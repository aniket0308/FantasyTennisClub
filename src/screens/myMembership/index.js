import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Snackbar from "react-native-snackbar";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Button, Header } from "../../components";
import CardWithImage from "../../components/cardWithImage";
import Loader from "../../components/loader";
import membershipStyle from "../membership/style";
import myMembershipStyle from "./style";

const MyMembership = ({ navigation }) => {

    const [memberShip, setMemberShip] = useState()
    const [isLoading, setIsLoading] = useState(false)

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
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
    }

    useEffect(() => {
        getAllMemberShips()
    }, [])

    return (
        <View style={myMembershipStyle.mainContainer}>
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: '78%' }}
                titleStyle={{ marginTop: 5, marginBottom: -3 }}
                title={'My Memberships'}
                mainViewHeaderStyle={{ paddingHorizontal: 10 }}
                showBackArrow={true}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={{ marginBottom: 20 }}>
                <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                    <View style={{ backgroundColor: constants.colors.lightestBlue, padding: 15, borderRadius: 6, marginBottom: 20 }}>
                        <Text style={{ alignSelf: 'center', textAlign: 'center', fontFamily: constants.fonts.notoSansRegular, color: 'green', fontWeight: '600', fontSize: 16 }}>Your current membership does not have access to current event</Text>
                        <Text style={{ alignSelf: 'center', fontFamily: constants.fonts.notoSansRegular, color: 'grey', fontWeight: '400', fontSize: 12, marginTop: 10 }}>•	Access to the Platform will be granted during the dates when your membership is active</Text>
                    </View>
                    {memberShip?.length > 0 &&
                        memberShip.map((item, index) => {
                            return (
                                item.title != 'Join Private Group' && item.title != 'Organize Private Group'
                                && < CardWithImage
                                    containerStyle={{ backgroundColor: constants.colors.white, marginBottom: 15 }}
                                    labelTitle={'No'}
                                    label={item?.title}
                                    labelStyle={myMembershipStyle.labelStyle}
                                    titleStyle={membershipStyle.titleStyle}
                                />
                            )
                        })
                    }
                    {
                        isLoading == true
                        && <Button
                            titleText={'Update Membership'}
                            btnStyle={{ width: '100%' }}
                            onPress={() => utils.navigateTo(navigation, constants.screens.buyMemberShip)}
                        />
                    }
                </View>
            </ScrollView>
            {isLoading == false && <Loader />}
        </View>
    )
}

export default MyMembership