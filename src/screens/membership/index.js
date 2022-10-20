import React from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, Header } from "../../components";
import membershipStyle from "./style";

const MemberShip = ({ navigation }) => {
    return (
        <View style={membershipStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: '75%' }}
                showBackArrow={true}
                title={'Membership Cart'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                onPressLeftIcon={()=>navigation.goBack()}
            />
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 25 }}>
                <View style={[commonStyle.row, { justifyContent: 'space-between', marginHorizontal: 10, marginTop: 100 }]}>
                    <Text style={membershipStyle.txtOrder}>#4523015</Text>
                    <Text style={membershipStyle.txtActive}>Active</Text>
                </View>
                <Text style={membershipStyle.txtDate}>12 April, 2022</Text>
                <View style={{ marginTop: 30 }}>
                    <Text style={[membershipStyle.txtDate, { fontSize: 14 }]}>Payment method</Text>
                    <Text style={[membershipStyle.txtDate, { fontSize: 15, color: constants.colors.black }]}>Credit Card</Text>
                </View>
                <View style={membershipStyle.border} />
                <View style={[commonStyle.row, { justifyContent: 'space-between', marginRight: 10 }]}>
                    <Text style={[membershipStyle.txtDate, { fontSize: 15, color: constants.colors.black }]}>Season Membership x 1</Text>
                    <Text style={[membershipStyle.txtDate, { fontSize: 15, color: constants.colors.black }]}>$80</Text>
                </View>
                <Text style={membershipStyle.txtDate}>2023 Season</Text>
                <View style={membershipStyle.border} />
                <View style={[commonStyle.row, { justifyContent: 'space-between', marginRight: 10 }]}>
                    <Text style={[membershipStyle.txtDate, { fontSize: 18, color: constants.colors.black, fontWeight: '700' }]}>Total</Text>
                    <Text style={[membershipStyle.txtDate, { fontSize: 18, color: constants.colors.black, fontWeight: '700' }]}>$80</Text>
                </View>
                <Button
                    titleText={'Place Order'}
                    btnStyle={{ marginTop: 100 }}
                />
            </ScrollView>
        </View>
    )
}
export default MemberShip

