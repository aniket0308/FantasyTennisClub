import { StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const notificationStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: constants.colors.backGroundLight,
        paddingHorizontal: 10
    },
    viewCircle: {
        backgroundColor: constants.colors.lightestBlue,
        padding: 15,
        borderRadius: 50,
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtFtc: {
        fontFamily: constants.fonts.nuntinoRegular,
        color: constants.colors.labelColor,
        fontSize: 14,
        fontWeight: '500'
    },
    flatListView: {
        backgroundColor: constants.colors.white,
        marginBottom: 25,
        marginHorizontal: -10,
        paddingHorizontal: 20
    }
})

export default notificationStyle