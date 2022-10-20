import { StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const accountStyle = StyleSheet.create({
    mainContiner: {
        flex: 1,
        backgroundColor: constants.colors.backGroundLight,
        paddingHorizontal: 20,
        paddingBottom:20
    },
    txtMemberAcc: {
        color: constants.colors.darkGreen,
        fontWeight: '600',
        fontSize: 22,
        alignSelf: 'center',
        marginVertical: 20,
        fontFamily:constants.fonts.notoSansBold
    },
    txtName: {
        fontSize: 24,
        color: constants.colors.black,
        fontWeight: '600',
        fontFamily:constants.fonts.nuntinoRegular,
    },
    txtSmallName: {
        fontSize: 16,
        color: constants.colors.grey,
        fontWeight: '400',
        fontFamily:constants.fonts.nuntinoRegular,
        
    },
    touchableEditPro: {
        backgroundColor: constants.colors.darkBlue,
        width: '50%',
        padding: 2,
        marginTop: 15,
        borderRadius:4
    }
})

export default accountStyle