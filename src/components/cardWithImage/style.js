import { StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const cardWithImageStyle = StyleSheet.create({
    mainContainer: {
        backgroundColor: constants.colors.cardColor,
        padding: 15,
        borderRadius:12,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    txtTitle:{
        fontSize:19,
        fontWeight:'600',
        color:constants.colors.black,
        fontFamily:constants.fonts.nuntinoRegular

    },
    imgStyle:{tintColor:'white'}
})

export default cardWithImageStyle