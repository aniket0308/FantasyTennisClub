import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, Header } from "../../components";
import membershipStyle from "./style";

const MemberShip = ({ route, navigation }) => {

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
                    onPressLeftIcon={() => navigation.goBack()}
                />
                <TouchableOpacity style={membershipStyle.addButtonView}>
                    <Text style={membershipStyle.plusIcon}>+</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 25 }}>
                <View style={[commonStyle.row, { justifyContent: 'space-between', marginHorizontal: 10, marginTop: 100 }]}>
                    <Text style={membershipStyle.txtOrder}>#4523015</Text>
                    <Text style={membershipStyle.txtActive}>Active</Text>
                </View>
                <Text style={membershipStyle.txtDate}>{route?.params?.start_date}</Text>
                <View style={{ marginTop: 30 }}>
                    <Text style={[membershipStyle.txtDate, { fontSize: 14 }]}>Payment method</Text>
                    <Text style={[membershipStyle.txtDate, { fontSize: 15, color: constants.colors.black }]}>Credit Card</Text>
                </View>
                <View style={membershipStyle.border} />
                <View style={[commonStyle.row, { justifyContent: 'space-between', marginRight: 10 }]}>
                    <Text style={[membershipStyle.txtDate, { fontSize: 15, color: constants.colors.black }]}>{route?.params?.title} x 1</Text>
                    <Text style={[membershipStyle.txtDate, { fontSize: 15, color: constants.colors.black }]}>${route?.params?.price}</Text>
                </View>
                <Text style={[membershipStyle.txtDate, { marginBottom: 16 }]}>2023 Season</Text>
                {
                    route?.params?.tournaments?.length > 0
                    && route?.params?.tournaments.map((item) => {
                        return (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                                <Text style={[membershipStyle.txtDate, { fontSize: 13, color: constants.colors.black }]}>{item?.title}</Text>
                                <Text style={[membershipStyle.txtDate, { fontSize: 13, color: constants.colors.black }]}>${item?.price}</Text>
                            </View>
                        )
                    })

                }
                {
                    route?.params?.tournament_total &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={[membershipStyle.txtDate, { fontSize: 13, color: constants.colors.black }]}>Tournament Total</Text>
                        <Text style={[membershipStyle.txtDate, { fontSize: 13, color: constants.colors.black }]}>${route?.params?.tournament_total}</Text>
                    </View>
                }
                {
                    route?.params?.season_discount
                    && <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
                        <Text style={[membershipStyle.txtDate, { fontSize: 13, color: 'red' }]}>Season Discount</Text>
                        <Text style={[membershipStyle.txtDate, { fontSize: 13, color: 'red' }]}>${route?.params?.season_discount}</Text>
                    </View>
                }
                <View style={membershipStyle.border} />
                <View style={[commonStyle.row, { justifyContent: 'space-between', marginRight: 10 }]}>
                    <Text style={[membershipStyle.txtDate, { fontSize: 18, color: constants.colors.black, fontWeight: '700' }]}>Total</Text>
                    <Text style={[membershipStyle.txtDate, { fontSize: 18, color: constants.colors.black, fontWeight: '700' }]}>${route?.params?.price}</Text>
                </View>
                <Button
                onPress={()=>navigation.navigate('Payment',{item:route.params})}
                    titleText={'Place Order'}
                    btnStyle={{ marginTop: 50, width: '100%' }}
                />
            </ScrollView>
        </View>
    )
}
export default MemberShip

