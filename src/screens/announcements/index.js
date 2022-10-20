import React from "react"
import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native"
import { constants } from "../../common/constant"
import { Header } from "../../components"
import announcementStyle from "./style"

const Announcments = ({ navigation }) => {

    //renderinf Announcements
    const renderAnnouncments = ({ item, index }) => {
        return (
            <View style={[announcementStyle.viewInsights, { backgroundColor: index == 0 ? '#F5F8FA' : constants.colors.white, marginTop: index != 0 ? 10 : 0 }]}>
                <Text style={announcementStyle.txtInsights} >Insights for Wimbledon Day: {index + 1}</Text>
                <Text
                    // numberOfLines={index != 0 ? 3 : 10}
                    style={announcementStyle.txtText} >
                    •N. DJOKOVIC is favorite with 92.4% of members picks while C. NORRIE got 7.6%
                    •E. MERTENS/S. ZHANG was chosen 70.6% and D. COLLINS/D. KRAWCZYK 29.4%
                    •B. KREJCIKOVA/K. SINIAKOVA received 77.1% support and L. KICHENOK/J. OSTAPENKO earned 22.9%
                </Text>
            </View>
        )
    }

    return (
        <View style={announcementStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                showBackArrow={true}
                title={'Announcements'}
                titleStyle={{ marginTop:5,marginBottom:-10}}
                viewHeaderStyle={{ width: '100%' }}
                rightIcon={constants.icons.shapeBell}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <FlatList
            style={{marginBottom:20}}
                showsVerticalScrollIndicator={false}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
                renderItem={renderAnnouncments}
                key={(item) => item}
                keyExtractor={item => item}
            />
        </View>
    )
}
export default Announcments