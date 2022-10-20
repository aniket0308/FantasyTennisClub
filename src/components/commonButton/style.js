import { StyleSheet } from 'react-native'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import { constants } from '../../common/constant'

const buttonStyle = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        paddingVertical: 17,
        backgroundColor: constants.colors.commonButtonColor,
        width: widthPercentageToDP(80),
        alignSelf: 'center',
        borderRadius: 6
    },
    txtStyle: {
        fontSize: 18,
        fontWeight: '800',
        color: constants.colors.white
    }
})

export default buttonStyle