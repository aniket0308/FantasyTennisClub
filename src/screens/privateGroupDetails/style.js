import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";

const privateGroupDetailsStyle = StyleSheet.create({
    mainContainer: {
        backgroundColor: constants.colors.backGroundLight,
        flex: 1,
        padding: 10
    },
    titleStyle: {
        fontFamily: constants.fonts.nuntinoRegular,
        fontSize: 17,
        fontWeight: '600',
        color: constants.colors.white
    },
    labelStyle: {
        fontFamily: constants.fonts.nuntinoRegular,
        fontSize: 10,
        fontWeight: '600',
        color: constants.colors.white
    },
    txt:{
        alignSelf:'center',
        fontFamily:constants.fonts.nuntinoRegular,
        fontSize:14,
        fontWeight:'600',
        color:constants.colors.labelColor,
    }
})

export default privateGroupDetailsStyle