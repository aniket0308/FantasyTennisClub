import { StyleSheet } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { constants } from "../../common/constant"

const buyMemberShipStyle = StyleSheet.create({
    mainContainer: {
        backgroundColor: constants.colors.backGroundLight,
        padding: 10,
        flex: 1
    },
    touchable: {
        backgroundColor: constants.colors.white,
        padding: 0,
        marginTop: 20,
        borderColor: constants.colors.darkBlue,
        borderWidth: 2,
        borderRadius: 6,
        height: widthPercentageToDP(40),
        width: widthPercentageToDP(40),
        justifyContent:'center',
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 14,
        fontFamily: constants.fonts.nuntinoRegular,
        fontWeight: '600',
        color: constants.colors.darkBlue,
        width:'100%'
    },
})

export default buyMemberShipStyle