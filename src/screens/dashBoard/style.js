import { Platform, StyleSheet } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { constants } from "../../common/constant"

const dashboardStyle = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: constants.colors.backGroundLight,
        paddingHorizontal: 10
    },
    subTitleStyle: {
        alignSelf: 'center',
        marginLeft: -25,
        fontSize: widthPercentageToDP(5),
        color: constants.colors.darkGreen,
        marginTop: 3,
        fontWeight: '600'
    },
    titleStyle: {
        alignSelf: 'center',
        fontSize: widthPercentageToDP(10),
        marginLeft: -25
    },
    touchableView: {
        justifyContent: 'center',
        borderWidth: 2,
        width:'48%',
        backgroundColor: constants.colors.white,
        paddingVertical: 8,
        borderRadius: 6,
        borderColor: constants.colors.darkGreen
    },
    txtScore: {
        alignSelf: 'center',
        color: constants.colors.darkGreen,
        fontSize: 20,
        fontWeight: '600',
        fontFamily:constants.fonts.notoSansRegular,
        marginBottom:Platform.OS=="android"?0:5
    },
    txtTitle: {
        alignSelf: 'center',
        fontSize:14,
        color: constants.colors.darkGreen,
        fontFamily:constants.fonts.notoSansRegular
    },
    txtGeneral: {
        fontSize: 20,
        color: constants.colors.darkGreen,
        fontWeight: '600',
        fontFamily:constants.fonts.notoSansBold
    },
    txtInsights: {
        color: constants.colors.darkBlue,
        fontSize: 16,
        fontWeight: '600',
        fontFamily:constants.fonts.nuntinoRegular
    },
    txtText: {
        color: constants.colors.labelColor,
        marginTop: 5,
        fontSize: 12,
        fontWeight: '400',
        fontFamily:constants.fonts.nuntinoRegular
    },
    viewInsights: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: constants.colors.white,
        borderRadius: 6
    }
})

export default dashboardStyle