import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import CardWithImage from "../../components/cardWithImage";
import membershipStyle from "../membership/style";
import myMembershipStyle from "./style";

const MyMembership = ({ navigation }) => {
    return (
        <View style={myMembershipStyle.mainContainer}>
            <Header
                viewHeaderStyle={{ width: '78%' }}
                titleStyle={{ marginTop: 5, marginBottom: -3 }}
                title={'My Memberships'}
                mainViewHeaderStyle={{ paddingHorizontal: 10 }}
                showBackArrow={true}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={{marginBottom:20}}>
            <Image
                style={{ alignSelf: 'center', marginTop: 10, height: widthPercentageToDP(35), width: widthPercentageToDP(35) }}
                source={constants.icons.profileImage}
                resizeMode='contain'
            />
            <View style={{marginHorizontal:15,marginTop:20}}>
                {
                    [1,2,3,4,5,6,7].map((item,index)=>{
                        return(
                            <CardWithImage
                                containerStyle={{ backgroundColor: constants.colors.white,marginBottom:15 }}
                                labelTitle={'No'}
                                label={'Season Membership - 2023'}
                                labelStyle={myMembershipStyle.labelStyle}
                                titleStyle={membershipStyle.titleStyle}
                            />
                        )
                    })
                }
            </View>
            </ScrollView>
        </View>
    )
}

export default MyMembership