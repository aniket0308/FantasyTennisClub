import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";

const leaderBoardStyle = StyleSheet.create({
    mainContainer: {
        backgroundColor: constants.colors.backGroundLight,
    },
    consolation: {
        color: constants.colors.darkGreen,
        fontWeight: '600',
        fontSize: 22,
        alignSelf: 'flex-end',
        fontFamily:constants.fonts.notoSansBold
    },
    ViewConsolation: {
        position: 'absolute',
        backgroundColor: constants.colors.backGroundLight,
        bottom: 0,
        padding: 10,
        right: 0,
        width: '100%'
    },
    txtTitle: {
        fontSize: 15,
        color: constants.colors.black,
        fontWeight: '600',
        marginBottom: 10,
        fontFamily: constants.fonts.notoSansBold
    },
    txtScore: {
        textAlign: 'center',
        fontWeight: '400',
        marginBottom: 10,
        color: constants.colors.black,
        fontFamily: constants.fonts.notoSansRegular,
        fontSize: 12
    },
    mainViewScore: {
        flex: 1,
        backgroundColor: constants.colors.white
    },
    txtName: {
        marginBottom: 10,
        color: constants.colors.black,
        fontFamily: constants.fonts.notoSansRegular,
        fontSize: 12,
        maxWidth:widthPercentageToDP(25)
    }
})

export default leaderBoardStyle