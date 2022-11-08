import React from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import SearchBar from "../../components/searchBar";
import prizeStyle from "./style";

const Prizes = ({ navigation }) => {
    return (
        <View style={prizeStyle.mainContiner}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                showBackArrow={true}
                title={'EVENT DETAILS'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                rightIcon={constants.icons.shapeBell}
                onPressRightIcon={()=>utils.navigateTo(navigation,constants.screens.notification)}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <View style={{ backgroundColor: constants.colors.white,flex:1,marginBottom:25 }}>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false} >
                <Text style={prizeStyle.txtMemberParticipate}>Members Participating</Text>
                <SearchBar />
                <View style={{ marginTop: 10, marginLeft: 10 }}>
                    <Text style={prizeStyle.txtName}>Guillermo Cosson</Text>
                    <Text style={[prizeStyle.txtName, { marginVertical: 5 }]}>Joanna Oleaga</Text>
                    <Text style={prizeStyle.txtName}>Joanna Oleaga</Text>
                </View>
                <Text style={[prizeStyle.txtMemberParticipate, { marginVertical: 10 }]}>Prize Breakdown</Text>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={prizeStyle.txtName}>
                        - Winner takes 60% of the purse
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        - Second place takes 20%
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        - Consolation takes 12.5%
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        - Third place takes 7.5%
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        Season Accumulative Purse = $307
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        Prize distribution based on funds collected
                    </Text>
                </View>
                <Text style={[prizeStyle.txtMemberParticipate, { marginVertical: 10 }]}>Special Awards</Text>
                <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
                    <Text style={prizeStyle.txtName}>
                        - Free game for scoring 4 points in Day 9
                    </Text>
                    <Text style={prizeStyle.txtName}>
                        - Fee game for the most double faults (with no walk overs)
                    </Text>
                </View>
            </ScrollView>
            </View>
        </View>
    )
}

export default Prizes