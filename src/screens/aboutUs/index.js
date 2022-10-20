import React from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import aboutUsStyle from "./style";

const AboutUs = ({ navigation }) => {
    return (
        <View style={aboutUsStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: '85%' }}
                showBackArrow={true}
                title={'About Fantasy Tennis Club'}
                titleStyle={{ marginTop: 5, marginBottom: -3 }}
                onPressLeftIcon={()=>navigation.goBack()}
            />
            <View style={aboutUsStyle.txtView}>
            <ScrollView bounces={false} style={{flex:1}}>
                <Text style={aboutUsStyle.txt}>
                    Fantasy Tennis Club was founded in 2019 by real Tennis Players who enjoy and are passionate about the game of Tennis.
                </Text>
                <Text style={[aboutUsStyle.txt, { marginVertical: 20 }]}>
                    Our experts are professional tennis players that enjoy and love the game of tennis and like to share their views on styles, discuss rivalries and talk tennis.
                </Text>
                <Text style={aboutUsStyle.txt}>
                    Fantasy Tennis Club was created to promote the interaction of a fiery Tennis community.
                </Text>
                <View style={[commonStyle.row, { marginTop: 30 }]}>
                    <Text style={[aboutUsStyle.txt]}>
                        Our Mission:   Enhance the tennis experience of our members by becoming part of an interactive community.
                    </Text>
                </View>
            </ScrollView>
            </View>
        </View>
    )
}

export default AboutUs