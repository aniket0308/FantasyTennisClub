import { Platform, StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const dayPickStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: constants.colors.backGroundLight,
        paddingHorizontal: 20
    },
    txtDay: {
        fontFamily: constants.fonts.notoSansBold,
        fontWeight: '600',
        fontSize: 36,
        marginTop: 0,
        color: constants.colors.black
    },
    txtSubmit: {
        fontSize: 17,
        fontFamily: constants.fonts.nuntinoRegular,
        fontWeight: '600',
        color: constants.colors.grey,
        marginTop: Platform.OS == "android" ? -5 : 0,
        marginBottom:10
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
    selectionButtonStyle: {
        backgroundColor: constants.colors.lightestBlue,
        width: '100%',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        height: 35
    },
    txtViewSelectionStyle: {
        backgroundColor: constants.colors.lightestBlue,
        paddingLeft: 15,
        paddingTop: 15,
        marginTop: 15,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6
    },
    selectionTxtStyle: {
        color: constants.colors.labelColor,
        fontSize: 10,
        fontWeight: '600',
        fontFamily: constants.fonts.nuntinoRegular
    },
    selectionButtonTxtStyle: {
        textAlign: 'left',
        fontSize: 17,
        fontFamily: constants.fonts.nuntinoRegular,
        fontWeight: '600',
        color: constants.colors.black,
        marginTop: -10
    },
    dropDownStyle: {
        borderBottomRightRadius: 6,
        borderBottomLeftRadius: 6,
        marginTop: -5
    }
})

export default dayPickStyle