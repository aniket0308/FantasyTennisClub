import { StyleSheet, Dimensions } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { constants } from '../../common/constant'

const loginStyle = StyleSheet.create({
    container: {
        backgroundColor: constants.colors.backGroundLight,
    },
    imgLogo: {
        height:widthPercentageToDP(70),
        width: widthPercentageToDP(70),
        alignSelf: 'center',
        marginBottom: 20
    },
    footer: {
        flexDirection: 'row',
        justifyContent:'center',
        paddingVertical:20,
        backgroundColor:constants.colors.backGroundLight
    },
    txtNewToFantasy: {
        fontSize: 16,
        color: constants.colors.grey,
        fontWeight: '500',
    },
    txtSignUp: {
        fontSize: 16,
        color: constants.colors.darkGreen,
        fontWeight: '500'
    },

})

export default loginStyle