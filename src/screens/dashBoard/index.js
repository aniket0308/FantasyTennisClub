import React from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import dashboardStyle from "./style";

//Dashboard Of Screen Or Say Home Screen
const DashBoardHome = ({ navigation }) => {

    const tempInsightsData = [
        {
            insights: 'Insights for Wimbledon Day 12:',
            text: `•N. DJOKOVIC is favorite with 92.4% of members picks while C. NORRIE got 7.6%
•E. MERTENS/S. ZHANG was chosen 70.6% and D. COLLINS/D. KRAWCZYK 29.4%
•B. KREJCIKOVA/K. SINIAKOVA received 77.1% support and L. KICHENOK/J. OSTAPENKO earned 22.9%
            `
        },
        {
            insights: 'Insights for Wimbledon Day 11:',
            text: `•N. DJOKOVIC is favorite with 92.4% of members picks while C. NORRIE got 7.6%
•E. MERTENS/S. ZHANG was chosen 70.6% and D. COLLINS/D. KRAWCZYK 29.4%
•B. KREJCIKOVA/K. SINIAKOVA received 77.1% support and L. KICHENOK/J. OSTAPENKO earned 22.9%
            `
        },
        {
            insights: 'Insights for Wimbledon Day 10:',
            text: `•N. DJOKOVIC is favorite with 92.4% of members picks while C. NORRIE got 7.6%
•E. MERTENS/S. ZHANG was chosen 70.6% and D. COLLINS/D. KRAWCZYK 29.4%
•B. KREJCIKOVA/K. SINIAKOVA received 77.1% support and L. KICHENOK/J. OSTAPENKO earned 22.9%
            `
        }
    ]

    const tempData = [
        {
            score: '105 / 23',
            title: 'Leaderboard'
        },
        {
            score: '105 / 23',
            title: 'Consolation'
        },
        {
            score: '5',
            title: 'Season Ranking'
        },
        {
            title: 'MY PICKS'
        },
        {
            title: 'PRIZES'
        },
        {
            icon: constants.icons.whatsApp,
            title: 'WhatsApp'
        }

    ]

    //Rendering Data In Flatlist
    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => utils.navigateTo(
                    navigation,
                    item.title == 'MY PICKS'
                        ? constants.screens.selectionDays
                        : item.icon
                            ? constants.screens.joinWhatsApp
                            : item.title == 'PRIZES'
                                ? constants.screens.prizes
                                : constants.screens.leaderBoard,
                    item.title,
                )}
                style={[dashboardStyle.touchableView, {
                    marginTop: index != 0 || index != 1 ? 10 : 0,
                    marginLeft: index % 2 == 0 ? 0 : 25
                }]}
            >
                {
                    item.score
                    && <Text style={dashboardStyle.txtScore}>{item.score}</Text>
                }
                {
                    item.icon
                    && <Image style={{ alignSelf: 'center' }} source={constants.icons.whatsApp} />
                }
                <Text style={[dashboardStyle.txtTitle, { fontSize: index == 3 || index == 4 ? 20 : 14, }]} >{item.title}</Text>
            </TouchableOpacity>
        )
    }

    //rendering Insights data in flatlist
    const renderInsightData = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => utils.navigateTo(navigation, constants.screens.announcements)}
                style={[dashboardStyle.viewInsights, { backgroundColor: index == 0 ? '#F5F8FA' : constants.colors.white, marginTop: index != 0 ? 10 : 0 }]}>
                <Text style={dashboardStyle.txtInsights} >{item.insights}</Text>
                <Text
                    numberOfLines={index != 0 ? 3 : 10}
                    style={dashboardStyle.txtText} >{item.text}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={dashboardStyle.maincontainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                title={'Dashboard'}
                subTitle={'US OPEN'}
                titleStyle={{ alignSelf: 'center', fontSize: 22 }}
                subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                rightIcon={constants.icons.shapeBell}
                mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10 }}
                resizeMode='stretch'
                rightIconStyle={{ alignSelf: 'center' }}
            />

            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View>
                    <FlatList
                    style={{marginBottom:25}}
                        scrollEnabled={false}
                        data={tempData}
                        numColumns={2}
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        renderItem={renderItem}
                        key={(item) => item}
                        keyExtractor={item => item}
                    />

                    <View style={[commonStyle.row, { justifyContent: 'space-between', marginVertical: 20, alignItems: 'center' }]}>
                        <Text style={dashboardStyle.txtGeneral}>General Anouncements:</Text>
                        <Text onPress={() => utils.navigateTo(navigation, constants.screens.announcements)} style={[dashboardStyle.txtGeneral, { fontSize: 16 }]}>See All</Text>
                    </View>
                    <FlatList
                        style={{ marginBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        data={tempInsightsData}
                        renderItem={renderInsightData}
                        key={(item) => item}
                        keyExtractor={item => item}
                    />
                </View>
            </ScrollView >
        </View >
    )
}

export default DashBoardHome;