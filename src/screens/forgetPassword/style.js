import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";

const forgotPasswordStyle=StyleSheet.create({
    container:{
        backgroundColor:constants.colors.backGroundLight
    },
    imgLogo: {
        height: widthPercentageToDP(60),
        width: widthPercentageToDP(60),
        alignSelf: 'center',
        marginBottom: 20
    },
})

export default forgotPasswordStyle