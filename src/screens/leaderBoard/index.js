import React from "react";
import { FlatList, Image, Platform, SafeAreaView, Text, TextInput, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import SearchBar from "../../components/searchBar";
import leaderBoardStyle from "./style";

//Leaderboard Screen
const LeaderBoard = ({route}) => {

    const tempDataArray = [
        {
            title: [
                {
                    title: 'Contact', name: [
                        { name: 'Jonna Olegea', },
                        { name: 'Gullerimo Cosson' },
                        { name: 'Oswaldo' }
                    ]
                },
                { title: 'Total', score: [20, 300, 5] },
                { title: 'Day1', score: [20, 300, 5] },
                { title: 'Day2', score: [0, 0, 5] },
                { title: 'Day3', score: [10, 30, 5] },
                { title: 'Day4', score: [20, 300, 5] },
                { title: 'Day5', score: [0, 0, 5] },
                { title: 'Day6', score: [20, 300, 5] },
                { title: 'Day7', score: [20, 300, 5] },
                { title: 'Day8', score: [20, 300, 50] },
                { title: 'Day9', score: [100, 300, 5] },
            ]
        }
    ]

    //renderLeaderboard function
    const leaderBoard = ({ item, index }) => {
        return (
            <View style={{ padding: 5 }}>
                <Text style={[leaderBoardStyle.txtTitle, { marginRight: index == 0 ? 20 : 10, textAlign: index != 0 ? 'center' : "left" }]}
                >{item.title}</Text>
                {item?.name != undefined
                    && item?.name.map((item, index) => {
                        return (
                            <Text style={leaderBoardStyle.txtName}>{item.name}</Text>
                        )
                    })
                }
                {item?.score != undefined &&
                    item?.score.map((item, index) => {
                        return (
                            <Text style={leaderBoardStyle.txtScore}>{item}</Text>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <>
            <View style={leaderBoardStyle.mainContainer}>
                <SafeAreaView />
                <Header
                    title={route.params}
                    subTitle={'View Horizontal'}
                    titleStyle={{ alignSelf: 'center', fontSize: 22 }}
                    subTitleStyle={{ alignSelf: 'center', color: constants.colors.darkGreen }}
                    rightIcon={constants.icons.participant}
                    mainViewHeaderStyle={{ paddingBottom: 10, paddingTop: 10 }}
                    resizeMode='stretch'
                    rightIconStyle={{ height: 40, width: 60, alignSelf: 'center',marginTop:-10 }}
                />
            </View>
            <View style={leaderBoardStyle.mainViewScore}>
                <SearchBar />
                <FlatList
                    horizontal={true}
                    scrollEnabled={true}
                    bounces={false}
                    data={tempDataArray[0].title != [] || tempDataArray[0].title != undefined ? tempDataArray[0]?.title : []}
                    contentContainerStyle={{ flexDirection: 'row' }}
                    style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10 }}
                    renderItem={leaderBoard}
                    key={(item) => item}
                    keyExtractor={item => item}
                />
                <View style={leaderBoardStyle.ViewConsolation}>
                    <Text style={leaderBoardStyle.consolation}>Consolation</Text>
                </View>
            </View>
        </>
    )
}

export default LeaderBoard