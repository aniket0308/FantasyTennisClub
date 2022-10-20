import React from "react";
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import CardWithImage from "../../components/cardWithImage";
import accountStyle from "./style";

//Account Screen
const Account = ({ navigation }) => {

    const tempArr = ['My Memberships', 'Change password', 'Contact us', 'Notifications', 'About us', 'Logout']

    return (
        <View style={accountStyle.mainContiner}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Text style={accountStyle.txtMemberAcc} >Member Account</Text>
            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={{ paddingBottom: 30 }}
            >
                <View style={commonStyle.row}>
                    <Image
                        style={{ alignSelf: 'center', marginTop: 10 }}
                        source={constants.icons.profileImage}
                        resizeMode='contain'
                    />
                    <View style={[commonStyle.column, { marginLeft: 10, marginTop: 10 }]}>
                        <Text style={accountStyle.txtName}>Joanna Oleaga</Text>
                        <View style={[commonStyle.row, { marginVertical: 10 }]}>
                            <Image resizeMode='contain' style={{ alignSelf: 'center', marginRight: 5 }} source={constants.icons.mail} />
                            <Text style={accountStyle.txtSmallName}>joaoleaga@gmail.com</Text>
                        </View>
                        <View style={[commonStyle.row, { marginTop: -5 }]}>
                            <Image resizeMode='contain' style={{ alignSelf: 'center', marginRight: 5 }} source={constants.icons.call} />
                            <Text style={accountStyle.txtSmallName}>+17133608496</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => utils.navigateTo(navigation, constants.screens.changePassword, 'editProfile')}
                            style={accountStyle.touchableEditPro}>
                            <Text style={{ alignSelf: 'center', color: constants.colors.white }} >Edit profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    {
                        tempArr.map((item, index) => {
                            return (
                                <CardWithImage
                                    onPress={() => {
                                        item == 'Change password'
                                            ? utils.navigateTo(navigation, constants.screens.changePassword)
                                            : item == 'About us'
                                                ? utils.navigateTo(navigation, constants.screens.aboutUs)
                                                : item == 'My Memberships'
                                                    ? utils.navigateTo(navigation, constants.screens.membership)
                                                    :item == 'Notifications' 
                                                    ?utils.navigateTo(navigation, constants.screens.notification)
                                                    :item == 'Contact us' 
                                                    ?utils.navigateTo(navigation, constants.screens.changePassword,'contactUs')
                                                    :null
                                    }}
                                    containerStyle={{ marginBottom: 10, backgroundColor: item == 'Logout' ? constants.colors.darkBlue : constants.colors.cardColor }}
                                    titleStyle={{ color: item == 'Logout' ? constants.colors.white : constants.colors.black }}
                                    imgStyle={{ tintColor: item == 'Logout' ? constants.colors.white : constants.colors.grey }}
                                    title={item}
                                    rightIcon={constants.icons.rightArrow}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Account