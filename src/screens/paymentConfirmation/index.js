import React from "react";
import { Image, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Button } from "../../components";

const PaymentConfirmation=({route,navigation})=>{
return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:constants.colors.backGroundLight}}>
        <Image source={constants.icons.paymentSuccess} style={{height:widthPercentageToDP(50),width:widthPercentageToDP(50)}} resizeMode='contain' />
        <Text style={{color:'black',fontSize:24,fontWeight:'600',fontFamily:constants.fonts.notoSansRegular}}>Payment Successfull</Text>
        <Button
        btnStyle={{marginVertical:30}}
        titleText={'Next'}
        />
    </View>
)
}

export default PaymentConfirmation