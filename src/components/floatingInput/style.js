import { Platform, StyleSheet } from 'react-native';
//third party lib
import { scale, verticalScale } from 'react-native-size-matters';
import { widthPercentageToDP as wp ,heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { constants } from '../../common/constant';
const floatingInputStyles = StyleSheet.create({
    viewContainer: {
        backgroundColor: constants.colors.white,
        width: wp(80),
        alignSelf: "center",
        borderRadius: wp(2),
        paddingVertical: Platform.OS == "ios" ? wp(0.6) : 0,
        height:60,
    },
    headertxt: {
        color: constants.colors.labelColor,
        alignSelf: 'flex-start',
        fontSize: wp(12),
        marginBottom:20
    },
    animatedStyle: {
        top: 5,
        left: 14,
        position: 'absolute',
    },
    textInput: {
        width: wp(82),
        alignSelf: 'center',
        fontSize: wp(4.2),
        margin: wp(1),
        marginBottom: 0,
        padding: wp(5),
        paddingLeft: wp(2.5),
        color: 'black',
    },
    lblRighText: {
        // position: "absolute",
        right: 16,
        alignSelf: "flex-end",
        color: constants.colors.darkGreen,
        fontSize: 14,
        opacity: 1,
        marginRight:25,
        marginTop:5,
        fontWeight:'700'

    },
    eye: {
        width: scale(22),
        height: verticalScale(22),
        alignSelf: 'center',
        zIndex: 1,
        tintColor:constants.colors.grey
    },
    eyeWrapper: {
        padding: 5,
        marginRight: 10,
        justifyContent: 'center'
    },
    inputView: {
        width: wp(80),
        alignSelf: 'center',
        margin: wp(1),
        marginBottom: 0,
    },
    insideText: {
        fontSize: wp(4.2),
        padding: wp(4),
        paddingLeft: wp(1),
        flex: 1,
        color: 'black',
        marginLeft:10
    },

})

export default floatingInputStyles