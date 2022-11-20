import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Snackbar from "react-native-snackbar";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Button, Header } from "../../components";
import CardWithImage from "../../components/cardWithImage";
import Loader from "../../components/loader";
import { logout } from "../../redux/slice/auth";
import forgotPasswordStyle from "../forgetPassword/style";
import membershipStyle from "../membership/style";
import myMembershipStyle from "./style";

const MyMembership = ({ navigation, route }) => {

    const [memberShip, setMemberShip] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch=useDispatch()

    const getAllMemberShips = async () => {
        const token = await AsyncStorage.getItem('@Token')
        //calling api for Membership
        fetch('https://fantasytennisclub.com/admin/api/v1/user/my-membership', {
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
                <View style={{ marginHorizontal: 15, marginTop: 20 }}>
                    {
                    route?.params==false
                            ? <Image style={forgotPasswordStyle.imgLogo} source={constants.icons.logo} />
                            : <View style={{ backgroundColor: constants.colors.lightestBlue, padding: 15, borderRadius: 6, marginBottom: 20 }}>
                                <Text style={{ alignSelf: 'center', textAlign: 'center', fontFamily: constants.fonts.notoSansRegular, color: 'green', fontWeight: '600', fontSize: 16 }}>Your current membership does not have access to current event</Text>
                                <Text style={{ alignSelf: 'center', fontFamily: constants.fonts.notoSansRegular, color: 'grey', fontWeight: '400', fontSize: 12, marginTop: 10 }}>•	Access to the Platform will be granted during the dates when your membership is active</Text>
                            </View>
                    }
                    {memberShip?.length > 0 &&
                        memberShip.map((item, index) => {
                            console.log('item', item);
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
                    {route?.params!==false
                        && isLoading == true
                        &&<>
                        <Button
                            titleText={'Update Membership'}
                            btnStyle={{ width: '100%' }}
                            onPress={() => utils.navigateTo(navigation, constants.screens.buyMemberShip)}
                        />
                        <Button
                            titleText={'Logout'}
                            btnStyle={{ width: '100%',marginTop:10 }}
                            onPress={() => dispatch(logout())}
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