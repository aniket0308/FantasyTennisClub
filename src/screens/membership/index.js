import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, Header } from "../../components";
import membershipStyle from "./style";

const MemberShip = ({ route, navigation }) => {

    const dispatch = useDispatch()
    const [, setRender] = useState({})
    let tempArr = route?.params?.tournamentArr
    var count = 0;
    const totalPrice = tempArr?.length > 0 &&
        tempArr.map((item, index) => {
            if (tempArr.indexOf(item) == index) {
                count = count + parseInt(item?.price)
            }
            return count
        })

    return (
        <View style={membershipStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Header
                    viewHeaderStyle={{ width: widthPercentageToDP(70) }}
                    showBackArrow={true}
                    title={'Membership Cart'}
                    titleStyle={{ marginTop: 5, marginBottom: -10 }}
                    onPressLeftIcon={async () => {
                        if (tempArr?.length > 0) {
                            let tempCartArr = tempArr.map((i) => {
                                return i.tournament_id
                            })
                            AsyncStorage.setItem('@membership', JSON.stringify(tempCartArr))
                        }
                        navigation.goBack()
                    }}
                />
                {route?.params?.isCart != true && route.params?.isLoggedIn != true
                    && <TouchableOpacity
                        onPress={async () => {
                            if (route?.params?.item?.membership_type == 0) {
                                await AsyncStorage.setItem('@membership', JSON.stringify(route.params?.item?.tournament_id))
                                navigation.goBack()
                            }
                        }}
                        style={membershipStyle.addButtonView}>
                        {
                            route?.params?.tournamentArr?.length > 0
                            && <View style={{ backgroundColor: 'red', height: 13, width: 13, position: 'absolute', top: 2, right: 0, borderRadius: 5 }} />
                        }
                        <Text style={membershipStyle.plusIcon}>+</Text>
                    </TouchableOpacity>
                }
            </View>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 25 }}>
                <View style={[commonStyle.row, { justifyContent: 'space-between', marginHorizontal: 10, marginTop: 100 }]}>
                    <Text style={membershipStyle.txtOrder}>#4523015</Text>
                    <Text style={membershipStyle.txtActive}>Active</Text>
                </View>
                <Text style={membershipStyle.txtDate}>{route?.params?.item?.tournamentArr ? route?.params?.item?.item?.start_date : route?.params?.item?.start_date}</Text>
                <View style={{ marginTop: 30 }}>
                    <Text style={[membershipStyle.txtDate, { fontSize: 14 }]}>Payment method</Text>
                    <Text style={[membershipStyle.txtDate, { fontSize: 15, color: constants.colors.black }]}>Credit Card</Text>
                </View>
                <View style={membershipStyle.border} />
                {
                    tempArr &&
                    tempArr?.length > 0
                    && tempArr.map((item, index) => {
                        return (
                            <View style={[commonStyle.row, { justifyContent: 'space-between', marginRight: 10, alignItems: 'center' }]}>
                                <Text numberOfLines={1} style={[membershipStyle.txtDate, { width: widthPercentageToDP(route.params.isCart == true ? 70 : 80), fontSize: 15, color: constants.colors.black }]}>{item?.title} x 1</Text>
                                <Text style={[membershipStyle.txtDate, { width: widthPercentageToDP(10), fontSize: 15, color: constants.colors.black }]}>${item?.price}</Text>
                                {route.params.isCart == true &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (tempArr.length != 1) {
                                                tempArr.splice(index, 1)
                                             setRender({})
                                            } else {
                                                tempArr.splice(index, 1)
                                                AsyncStorage.removeItem('@membership')
                                                navigation.goBack()
                                            }
                                            setRender({})
                                        }}
                                        style={{ padding: 5, marginTop: -3 }}
                                    >
                                        <Image resizeMode="contain" style={{ height: widthPercentageToDP(4), width: widthPercentageToDP(4), tintColor: "red" }} source={constants.icons.delete} />
                                        {/* <Text style={[membershipStyle.txtDate, { fontSize: 15, color: constants.colors.black }]}>-</Text> */}
                                    </TouchableOpacity>
                                }
                            </View>
                        )
                    })
                }
                {route.params?.isCart != true &&
                    <View style={[commonStyle.row, { justifyContent: 'space-between', marginRight: 10, alignItems: 'center' }]}>
                        {
                            route.params?.item?.membership_type == 0 && <>
                                <Text numberOfLines={1} style={[membershipStyle.txtDate, { width: widthPercentageToDP(route.params.isCart == true ? 70 : 80), fontSize: 15, color: constants.colors.black }]}>{route.params?.item?.title} x 1</Text>
                                <Text style={[membershipStyle.txtDate, { width: widthPercentageToDP(10), fontSize: 15, color: constants.colors.black }]}>${route.params?.item?.price}</Text>
                            </>}
                        {route.params.isCart == true &&
                            <TouchableOpacity
                                onPress={() => {
                                    if (tempArr.length != 1) {
                                        tempArr.splice(index, 1)
                                    } else {
                                        // tempArr.splice(index, 1)
                                        // let tempCartArr = []
                                        // AsyncStorage.removeItem('@membership')
                                        // navigation.goBack()
                                    }
                                    setRender({})
                                }}
                                style={{ padding: 5, marginTop: -3 }}
                            >
                                <Image resizeMode="contain" style={{ height: widthPercentageToDP(4), width: widthPercentageToDP(4), tintColor: "red" }} source={constants.icons.delete} />
                                {/* <Text style={[membershipStyle.txtDate, { fontSize: 15, color: constants.colors.black }]}>-</Text> */}
                            </TouchableOpacity>
                        }
                    </View>
                }
                {
                    route?.params?.item && route?.params?.item?.tournaments &&
                    <View style={[commonStyle.row, { justifyContent: 'space-between', marginRight: 10 }]}>
                        <Text numberOfLines={1} style={[membershipStyle.txtDate, { width: widthPercentageToDP(route.params.isCart == true ? 70 : 80), fontSize: 15, color: constants.colors.black }]}>{route?.params?.item?.title} x 1</Text>
                        <Text style={[membershipStyle.txtDate, { width: widthPercentageToDP(10), fontSize: 15, color: constants.colors.black }]}>${route?.params?.item?.price}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                // tempArr.splice(index)
                            }}
                        >
                            {route.params.isCart == true && <Text style={[membershipStyle.txtDate, { fontSize: 15, color: constants.colors.black }]}>-</Text>}
                        </TouchableOpacity>
                    </View>
                }
                {
                    route?.params?.item && route?.params?.item?.sub_title
                    && <Text style={[membershipStyle.txtDate, { marginBottom: 16 }]}>{route?.params?.item?.sub_title}</Text>
                }
                {route?.params?.item?.tournaments &&
                    route?.params?.item?.tournaments?.length > 0
                    && route?.params?.item?.tournaments.map((item) => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                                <Text style={[membershipStyle.txtDate, { fontSize: 13, color: constants.colors.black }]}>{item?.title}</Text>
                                <Text style={[membershipStyle.txtDate, { fontSize: 13, color: constants.colors.black }]}>${item?.price}</Text>
                            </View>
                        )
                    })
                }
                {
                    route?.params?.item?.tournament_total &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={[membershipStyle.txtDate, { fontSize: 13, color: constants.colors.black }]}>Tournament Total</Text>
                        <Text style={[membershipStyle.txtDate, { fontSize: 13, color: constants.colors.black }]}>${route?.params?.item?.tournament_total}</Text>
                    </View>
                }
                {
                    route?.params?.item?.season_discount
                    && <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={[membershipStyle.txtDate, { fontSize: 13, color: 'red' }]}>Season Discount</Text>
                        <Text style={[membershipStyle.txtDate, { fontSize: 13, color: 'red' }]}>${route?.params?.item?.season_discount}</Text>
                    </View>
                }
                <View style={membershipStyle.border} />
                <View style={[commonStyle.row, { justifyContent: 'space-between', marginRight: 10 }]}>
                    <Text style={[membershipStyle.txtDate, { fontSize: 18, color: constants.colors.black, fontWeight: '700' }]}>Total</Text>
                    <Text style={[membershipStyle.txtDate, { fontSize: 18, color: constants.colors.black, fontWeight: '700' }]}>${route?.params?.tournamentArr?.length > 0 ? route.params?.item ? totalPrice[tempArr?.length - 1] + route.params?.item?.price : totalPrice[tempArr?.length - 1] : route?.params?.item?.price}</Text>
                </View>
                <Button
                    onPress={() => {
                        navigation.navigate('Payment', { item: tempArr?.length > 0 ? [...route?.params?.tournamentArr, route?.params?.item] : route?.params.item, price: route?.params?.tournamentArr?.length > 0 ? route.params?.item ? totalPrice[tempArr?.length - 1] + route.params?.item?.price : totalPrice[tempArr?.length - 1] : route?.params?.item?.price })
                    }
                    }
                    titleText={'Place Order'}
                    btnStyle={{ marginTop: 50, width: '100%' }}
                />
            </ScrollView>
        </View>
    )
}
export default MemberShip

