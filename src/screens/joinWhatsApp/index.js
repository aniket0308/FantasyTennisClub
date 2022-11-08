import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Button, Header } from "../../components";
import joinWhatsAppStyle from "./style";

const JoinWhatsApp = ({ navigation }) => {
    return (
        <View style={joinWhatsAppStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                showBackArrow={true}
                title={'Join WhatsApp Group'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                rightIcon={constants.icons.shapeBell}
                onPressRightIcon={()=>utils.navigateTo(navigation,constants.screens.notification)}
                onPressLeftIcon={()=>navigation.goBack()}
            />
            <View style={[joinWhatsAppStyle.viewEtiquites, { backgroundColor: '#F5F8FA' }]}>
                <Text style={joinWhatsAppStyle.txtEtiquite} >Etiquete:</Text>
                <Text
                    style={[joinWhatsAppStyle.txtText, { textAlign: 'auto' }]} >
                    •	We are excited to announce our new Fantasy Tennis Club WhatsApp account with the goal to enhance member interaction during the event.

                    •	Same as with line calls, we trust the common sense of our members to keep the dialog focused on tennis related topics.

                    •	But just in case someone calls ‘Out!’ a ball that lands in the middle of the court…  A moderator to ask ‘Are you sure?’ is available.

                    •	Group will be created and active one day before the grand slam and will be closed one day after the final.

                </Text>
            </View>
            <View style={joinWhatsAppStyle.viewAgreeEtiquites}>
                <Text style={joinWhatsAppStyle.txtAgree}>I agree to the etiquete</Text>
                <Button
                titleText={'Join Group'}
                btnStyle={{width:'90%',marginVertical:10}}
                />
            </View>
        </View>
    )
}

export default JoinWhatsApp