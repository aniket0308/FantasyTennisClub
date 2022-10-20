import { StyleSheet } from "react-native";
import { constants } from "../common/constant";

const navigationStyle = StyleSheet.create({
    mainBackgroundView: {
        backgroundColor: constants.colors.backGroundLight,
        borderRadius: 30,
        padding: 5,
        justifyContent: 'center'
    },
    imageView: {
        justifyContent: 'center',
        backgroundColor: constants.colors.darkBlue,
        height: 50,
        width: 50,
        borderRadius: 30,
        alignSelf: 'center'
    },
    img: {
        height: 40,
        width: 40,
        alignSelf: 'center'
    }

})

export default navigationStyle