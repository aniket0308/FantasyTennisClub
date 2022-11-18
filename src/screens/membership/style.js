import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";

const membershipStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: constants.colors.backGroundLight,
        padding: 10
    },
    txtOrder: {
        fontFamily: constants.fonts.nuntinoRegular,
        fontWeight: '700',
        fontSize: 17,
        color: constants.colors.black,
        alignSelf: 'center'
    },
    txtActive: {
        fontFamily: constants.fonts.nuntinoRegular,
        fontWeight: '700',
        fontSize: 13,
        color: constants.colors.darkGreen,
        alignSelf: 'center'
    },
    txtDate: {
        fontFamily: constants.fonts.nuntinoRegular,
        fontSize: 14,
        color: constants.colors.labelColor,
        alignSelf: 'flex-start',
        fontWeight: '600',
        marginLeft: 10
    },
    border: {
        borderBottomColor: constants.colors.labelColor,
        borderBottomWidth: 1,
        marginTop: 50,
        marginBottom: 20,
        marginHorizontal: 10
    },
    addButtonView: {
        backgroundColor: constants.colors.darkGreen,
        height: widthPercentageToDP(10),
        width: widthPercentageToDP(10),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    plusIcon: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'
    }
})

export default membershipStyle