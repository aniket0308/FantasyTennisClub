import { StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const myPicksStyle=StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:constants.colors.backGroundLight,
        paddingHorizontal:10
    },
    viewTitle:{
        backgroundColor:constants.colors.darkGreen,
        paddingHorizontal:10
    },
    txtDay:{
        color:constants.colors.white,
        fontWeight:'600',
        fontSize:12,
        fontFamily:constants.fonts.nuntinoRegular
    },
    txtMyPick:{
        color:constants.colors.darkGreen,
        fontWeight:'600',
        fontSize:16,
        fontFamily:constants.fonts.nuntinoRegular
    }
})

export default myPicksStyle