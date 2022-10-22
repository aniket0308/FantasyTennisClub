import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { Button, FloatingInput, Header } from "../../components";
import CardWithImage from "../../components/cardWithImage";
import privateGroupDetailsStyle from "./style";

const PrivateGroupDetails = ({ route, navigation }) => {

    const [fullName, setFullName] = useState('')
    const [groupFullName, setGroupFullName] = useState('')
    const [groupEmail, setGroupEmail] = useState('')
    const [groupContact, setGroupContact] = useState('')
    const [groupEvents, setGroupEvents] = useState('')
    const [groupParticipant, setGroupParticipant] = useState('')

    return (
        <View style={privateGroupDetailsStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView style={{ backgroundColor: constants.colors.backGroundLight }} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginTop: 10 }}>
                <Image style={{ height: 20, width: 20, tintColor: constants.colors.darkGreen }} source={constants.icons.backArrow} />
            </TouchableOpacity>
            <Header
                title={route.params == 'Organize Private Group' ? 'Private Group Details' : 'Join Private Group'}
                subTitle='Complete your details below'
                mainViewHeaderStyle={{ paddingHorizontal: 10 }}
                showBackArrow={false}
            />
            {route.params != 'Organize Private Group'
                ? <>
                    <CardWithImage
                        containerStyle={{ backgroundColor: constants.colors.labelColor, width: widthPercentageToDP(90), alignSelf: 'center' }}
                        labelTitle={'Member name'}
                        label={'Joanna Oleaga'}
                        labelStyle={privateGroupDetailsStyle.labelStyle}
                        titleStyle={privateGroupDetailsStyle.titleStyle}
                    />
                    <FloatingInput
                        textInputStyle={{ width: '95%', marginTop: 10, height: widthPercentageToDP(20) }}
                        headerText={'Enter Group Name as provided by Group Admin'}
                        onChangeText={(nameTxt) => { setFullName(nameTxt) }}
                        value={fullName}
                    />
                </>
                : <KeyboardAwareScrollView
                    style={{ marginBottom: 20 }}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    bounces={false} >
                    <FloatingInput
                        textInputStyle={{ width: '85%', marginTop: 10, }}
                        headerText={'Group Admin Full Namen'}
                        onChangeText={(nameTxt) => { setFullName(nameTxt) }}
                        value={fullName}
                    />
                    <FloatingInput
                        headerText={'Group Admin E-mail'}
                        textInputStyle={{ marginTop: 15 }}
                        onChangeText={(emailTxt) => { setGroupEmail(emailTxt) }}
                        value={groupEmail}
                        autoCapitalize='none'
                    />
                    <FloatingInput
                        headerText={'Group Admin Mobile number'}
                        textInputStyle={{ marginTop: 15 }}
                        onChangeText={(groupContact) => { setGroupContact(groupContact) }}
                        value={groupContact}
                        keyboardType='phone-pad'
                    />
                    <FloatingInput
                        headerText={'Event'}
                        textInputStyle={{ marginTop: 15 }}
                        onChangeText={(groupEvents) => { setGroupEvents(groupEvents) }}
                        value={groupEvents}
                        autoCapitalize='none'
                    />
                    <FloatingInput
                        headerText={'Number of Participants'}
                        textInputStyle={{ marginTop: 15 }}
                        onChangeText={(groupParticipant) => { setGroupParticipant(groupParticipant) }}
                        value={groupParticipant}
                        autoCapitalize='none'
                    />
                    <Text style={privateGroupDetailsStyle.txt}>Minimum Charge for a Private group is $50</Text>
                    <Button
                        titleText={route.params != 'Organize Private Group' ? 'Join Group' : 'Submit'}
                        btnStyle={{ width: '90%', marginBottom: 15, marginTop: 30 }}
                    />
                    <Text style={[privateGroupDetailsStyle.txt, { textAlign: 'center' }]}>You will be contacted by one of our tennis
                        experts within 24 hours</Text>
                </KeyboardAwareScrollView>
            }
        </View>
    )
}

export default PrivateGroupDetails