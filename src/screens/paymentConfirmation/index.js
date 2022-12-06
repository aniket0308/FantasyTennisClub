import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Button } from "../../components";

const PaymentConfirmation = ({ route, navigation }) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: constants.colors.backGroundLight }}>
            <TouchableOpacity
            onPress={()=>navigation.goBack()}
            style={{position:'absolute',top:0,left:0,padding:30}}>
            <Image
            style={{height:widthPercentageToDP(6),width:widthPercentageToDP(6),tintColor:'#1D7A48'}}
            source={constants.icons.backArrow}
            />
            </TouchableOpacity>
            <Image source={route.params?.success == true ? constants.icons.paymentSuccess : constants.icons.paymentFailed} style={{ height: widthPercentageToDP(30), width: widthPercentageToDP(30) }} resizeMode='contain' />
            <Text style={{ color: 'black', fontSize: 24, fontWeight: '600', fontFamily: constants.fonts.notoSansRegular }}>{route.params?.success == true ? 'Payment Successfull' : 'Payment Failed'}</Text>
            <Text style={{ color: 'black', fontSize: 14, fontWeight: '600', fontFamily: constants.fonts.nuntinoRegular, textAlign: 'center' }}>{route.params?.message}</Text>
            <Button
                btnStyle={{ marginVertical: 30 }}
                titleText={route.params?.success == true ? 'Next' : 'Enter Payment'}
            />
        </View>
    )
}

export default PaymentConfirmation