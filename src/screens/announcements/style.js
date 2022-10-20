import { StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const announcementStyle=StyleSheet.create({
    mainContainer:{
        flex:1,
        backgroundColor:constants.colors.backGroundLight,
        paddingHorizontal:10
    },
    txtInsights: {
        color: constants.colors.darkBlue,
        fontSize: 16,
        fontWeight: '600',
        fontFamily:constants.fonts.nuntinoRegular
    },
    txtText: {
        color: constants.colors.labelColor,
        marginTop: 5,
        fontSize: 12,
        fontWeight: '400',
        fontFamily:constants.fonts.nuntinoRegular
    },
    viewInsights: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: constants.colors.white,
        borderRadius: 6
    }
})

export default announcementStyle