import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";

const searchStyle = StyleSheet.create({
    mainContainer: {
        borderRadius: 6,
        paddingVertical: Platform.OS == 'ios' ? widthPercentageToDP(3) : widthPercentageToDP(0),
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: constants.colors.lightestBlue,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:10
    }
})

export default searchStyle