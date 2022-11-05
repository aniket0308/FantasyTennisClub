import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";

//Common Loader
const Loader = () => {
    return (
        <View style={{position:'absolute',alignSelf:'center',justifyContent:"flex-end",backgroundColor:constants.colors.darkBlue,top:'50%'}}>
                <View style={{ justifyContent: 'center', backgroundColor: 'white', opacity: 0.8, height: widthPercentageToDP(20), width: widthPercentageToDP(20) }}>
                    <ActivityIndicator size='large' color={constants.colors.darkBlue} />
                    <Text style={{ alignSelf: 'center', color: constants.colors.darkBlue }}>Loading</Text>
                </View>
        </View>
    )
}

export default Loader