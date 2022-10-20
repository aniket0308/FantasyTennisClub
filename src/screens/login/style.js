import { StyleSheet, Dimensions } from 'react-native'
import { constants } from '../../common/constant'

const loginStyle = StyleSheet.create({
    container: {
        backgroundColor: constants.colors.backGroundLight,
    },
    imgLogo: {
        height: 180,
        width: 180,
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