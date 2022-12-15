import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";

const forgotPasswordStyle=StyleSheet.create({
    container:{
        backgroundColor:constants.colors.backGroundLight
    },
    imgLogo: {
        height: widthPercentageToDP(20),
        width: widthPercentageToDP(50),
        alignSelf: 'center',
        marginBottom:30,
        marginTop:10
    },
})

export default forgotPasswordStyle