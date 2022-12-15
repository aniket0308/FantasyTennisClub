import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Button, Header } from "../../components";
import CardWithImage from "../../components/cardWithImage";
import Loader from "../../components/loader";
import { getMyMembership, logout } from "../../redux/slice/auth";
import forgotPasswordStyle from "../forgetPassword/style";
import membershipStyle from "../membership/style";
import myMembershipStyle from "./style";

const MyMembership = ({ navigation, route }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState()
    const dispatch = useDispatch()

    const getAllMemberShips = async () => {
        dispatch(getMyMembership({ setIsLoading, setData }))
    }

    useEffect(() => {
        getAllMemberShips()
    }, [])

    return (
        <View style={myMembershipStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
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
                <View style={{ marginHorizontal: 15, }}>
                    {
                        route?.params == false
                            ? <Image style={forgotPasswordStyle.imgLogo} source={constants.icons.logo} />
                            : <View style={{ backgroundColor: constants.colors.lightestBlue, padding: 15, borderRadius: 6, marginBottom: 20 }}>
                                <Text style={{ alignSelf: 'center', textAlign: 'center', fontFamily: constants.fonts.notoSansRegular, color: 'green', fontWeight: '600', fontSize: 16 }}>Your current membership does not have access to current event</Text>
                                <Text style={{ alignSelf: 'center', fontFamily: constants.fonts.notoSansRegular, color: 'grey', fontWeight: '400', fontSize: 12, marginTop: 10 }}>•	Access to the Platform will be granted during the dates when your membership is active</Text>
                            </View>
                    }
                    {data?.data?.length > 0 &&
                        data?.data.map((item, index) => {
                            return (
                                item.title != 'Join Private Group' && item.title != 'Organize Private Group'
                                && < CardWithImage
                                    containerStyle={{ backgroundColor: constants.colors.white, marginBottom: 15 }}
                                    labelTitle={item.is_member}
                                    label={item?.tournament}
                                    labelStyle={myMembershipStyle.labelStyle}
                                    titleStyle={membershipStyle.titleStyle}
                                />
                            )
                        })
                    }
                    {route?.params !== false
                        && isLoading == true
                        && <>
                            <Button
                                titleText={'Update Membership'}
                                btnStyle={{ width: '100%' }}
                                onPress={() => utils.navigateTo(navigation, constants.screens.buyMemberShip,{showBackArrow:true})}
                            />
                            <Button
                                titleText={'Logout'}
                                btnStyle={{ width: '100%', marginTop: 10 }}
                                onPress={() => {
                                    setIsLoading(true)
                                    dispatch(logout({setIsLoading}))
                                }}
                            />
                        </>
                    }
                </View>
            </ScrollView>
            {isLoading == false && <Loader />}
        </View>
    )
}

export default MyMembership