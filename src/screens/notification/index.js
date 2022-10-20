import React from "react";
import { FlatList, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import notificationStyle from "./style";

const Notification = ({ navigation }) => {

    //Render Notification Function
    const renderNotification=({item,index})=>{
        return(
            <View style={[commonStyle.row, { justifyContent: 'space-between' ,marginTop:40}]}>
                    <View style={commonStyle.row}>
                        <View style={notificationStyle.viewCircle}>
                            <Text style={notificationStyle.txtFtc}>FTC</Text>
                        </View>
                        <View style={[commonStyle.column, { justifyContent: 'center', marginLeft: 20 }]}>
                            <Text style={[notificationStyle.txtFtc, { color: constants.colors.darkBlue, fontWeight: '600' }]}>System Admin</Text>
                            <Text style={[notificationStyle.txtFtc, { color: constants.colors.labelColor, fontWeight: '400', fontSize: 12, marginTop: 5 }]}>Remember to submit your picks</Text>
                        </View>
                    </View>
                    <Text style={[notificationStyle.txtFtc, { color: constants.colors.black, fontWeight: '400', fontSize: 12, marginTop: 5 ,alignSelf:'center'}]}>5 minutes</Text>
                </View>
        )
    }

    return (
        <View style={notificationStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: '68%' }}
                showBackArrow={true}
                title={'Notifications'}
                titleStyle={{ marginTop: 5, marginBottom: -3 }}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <FlatList
            showsVerticalScrollIndicator={false}
            bounces={false}
            style={notificationStyle.flatListView}
            data={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}
            renderItem={renderNotification}
            />
        </View>
    )
}

export default Notification