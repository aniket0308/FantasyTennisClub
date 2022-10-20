import {StyleSheet} from 'react-native'
import { constants } from '../../common/constant'

const signUpStyle=StyleSheet.create({
    container:{
        backgroundColor:constants.colors.backGroundLight
    },
    footer: {
        flexDirection: 'row',
        paddingTop:20,
        paddingBottom:23,
        width:'100%',
        backgroundColor:constants.colors.backGroundLight,
        justifyContent:'center'
    },
    txtNewToFantasy: {  
        fontSize: 16,
        color: constants.colors.grey,
        fontWeight: '500'
    },
    txtSignUp: {
        fontSize: 16,
        color: constants.colors.darkGreen,
        fontWeight: '500'
    },
})

export default signUpStyle