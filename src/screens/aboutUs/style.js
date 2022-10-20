import { StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const aboutUsStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: constants.colors.backGroundLight,
        paddingHorizontal: 10
    },
    txt: {
        fontFamily: constants.fonts.nuntinoRegular,
        fontSize: 16,
        color: constants.colors.black,
        fontWeight:"400"
    },
    txtView: {
        backgroundColor: constants.colors.white,
        paddingHorizontal: 20,
        marginHorizontal: -10,
        flex: 1,
        marginBottom: 25,
        paddingVertical:30
    }
})

export default aboutUsStyle