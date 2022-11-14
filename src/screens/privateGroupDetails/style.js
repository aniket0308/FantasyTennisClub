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
      selectionButtonStyle: {
        marginTop:15,
        backgroundColor: constants.colors.white,
        width: '85%',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        height: widthPercentageToDP(15),
        alignSelf:'center',
        // paddingVertical:30
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
    },
    selectionButtonTxtStyle: {
        textAlign: 'left',
        fontSize: 17,
        fontFamily: constants.fonts.nuntinoRegular,
        fontWeight: '600',
        color: constants.colors.grey,
    },
    dropDownStyle: {
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        marginTop: -5
    }
})

export default privateGroupDetailsStyle