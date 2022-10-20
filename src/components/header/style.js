import { Platform, StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { constants } from '../../common/constant'

const headerStyle = StyleSheet.create({
    headerView: {
        paddingVertical:10,
        backgroundColor: constants.colors.backGroundLight,

    },
    txtTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: constants.colors.darkGreen,
        fontFamily:constants.fonts.notoSansBold,
    },
    txtSubTitle: {
        fontSize: widthPercentageToDP(4),
        fontWeight: '600',
        color: constants.colors.grey,
        fontFamily:constants.fonts.notoSansBold,
        marginTop:Platform.OS=='android'?-10:0
    },
    imgBack: {
        height: 20,
        width: 20,
        tintColor: constants.colors.darkGreen,
        alignSelf: 'center'
    },
    imgBackView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: widthPercentageToDP(70),

    },
    rightIconTouchable: {
        alignSelf: 'center',
        padding: 10,
        position: 'absolute',
        right: 10,
        top: 20
    },
    rightIconTouchableShow: {
        alignSelf: 'center',
        padding:5
    }
})

export default headerStyle