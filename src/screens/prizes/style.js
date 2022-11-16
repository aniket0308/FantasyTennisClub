import { StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const prizeStyle=StyleSheet.create({
    mainContiner:{
        flex:1,
        backgroundColor:constants.colors.backGroundLight,
        paddingHorizontal:10
    },
    txtMemberParticipate:{
        color:constants.colors.darkGreen,
        fontSize:22,
        fontWeight:'600',
        fontFamily:constants.fonts.notoSansRegular,
        alignSelf:'center'
    },
    txtName:{
        marginTop:5,
        fontSize:12,
        fontFamily:constants.fonts.notoSansRegular,
        color:constants.colors.black,
        fontWeight:'400'
    }
})

export default prizeStyle