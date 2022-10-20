import React from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import myPicksStyle from "./style";

const MyPicks = ({ route, navigation }) => {

    const renderAllPickData = ({ item, index }) => {
        return (
            <>
                <View style={[myPicksStyle.viewTitle, { marginTop: index != 0 ? 10 : 0 }]}>
                    {
                        route.params == "All"
                            ? <Text style={myPicksStyle.txtDay}>Day {index + 1 <= 9 ? `0${index + 1}` : index + 1}</Text>
                            : <Text style={myPicksStyle.txtDay}>Match {index + 1}</Text>
                    }
                </View>
                <View style={{ backgroundColor: constants.colors.white, padding: 10 }}>
                    {route.params == 'All'
                        ? <>
                            <Text style={myPicksStyle.txtMyPick}>My Pick:  William Barbara</Text>
                            <Text style={[myPicksStyle.txtMyPick, { marginVertical: 10 }]}>My Pick:  William Barbara</Text>
                            <Text style={myPicksStyle.txtMyPick}>My Pick:  William Barbara</Text>
                        </>
                        : <>
                            <Text style={[myPicksStyle.txtMyPick, { color: constants.colors.black, fontSize: 14 }]}>William Barbara v/s Thomas Sarah</Text>
                            <Text style={[myPicksStyle.txtMyPick, { color: constants.colors.black, fontSize: 14 }]}>Winner:  Thomas Sarah</Text>
                            <Text style={[myPicksStyle.txtMyPick,{marginTop:10}]}>My Pick:  William Barbara</Text>
                        </>
                    }
                </View>
            </>
        )
    }

    return (
        <View style={myPicksStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                title={'MY PICKS'}
                subTitle={route.params != String && route.params <= 9 ? `0${route.params}` : route.params}
                titleStyle={{ alignSelf: 'center', fontSize: 22 }}
                subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                rightIcon={constants.icons.shapeBell}
                mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10 }}
                resizeMode='stretch'
                rightIconStyle={{ alignSelf: 'center' }}
                showBackArrow={true}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 20 }}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                renderItem={renderAllPickData}
            />
        </View>
    )
}

export default MyPicks