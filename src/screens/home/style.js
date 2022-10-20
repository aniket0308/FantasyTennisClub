import { StyleSheet } from 'react-native'
import { constants } from '../../common/constant'

const homeStyle = StyleSheet.create({
    container: {
        backgroundColor: constants.colors.darkGreen,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textReadyPlay: {
        color: constants.colors.white,
        fontWeight: '400',
        fontSize: 32,
        textAlign: 'center',
        marginTop: -50,
        height:80,
        fontFamily:constants.fonts.exo2Regular
    },
    textTapEnter:{
        fontSize:16,
        marginTop:60,
        color: constants.colors.white,
        fontWeight: '400',
        textAlign: 'center',
    },
    tennisBall:{
        marginTop:15
    }
})

export default homeStyle