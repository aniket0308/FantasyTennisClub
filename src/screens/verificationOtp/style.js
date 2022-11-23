import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

const verificationStyle=StyleSheet.create({
    imgLogo: {
        height:widthPercentageToDP(70),
        width: widthPercentageToDP(70),
        alignSelf: 'center',
        marginBottom: 20
    },
})

export default verificationStyle