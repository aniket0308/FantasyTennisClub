import { StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const myMembershipStyle=StyleSheet.create({
    mainContainer:{
        backgroundColor:constants.colors.backGroundLight,
        flex:1,
        padding:10
    },
    labelStyle: {
        fontFamily: constants.fonts.nuntinoRegular,
        fontSize: 14,
        fontWeight: '600',
        color: constants.colors.grey
    },
    titleStyle: {
        fontFamily: constants.fonts.nuntinoRegular,
        fontSize: 10,
        fontWeight: '600',
        color: constants.colors.white
    },
})

export default myMembershipStyle