import { StyleSheet } from "react-native";
import { constants } from "../../common/constant";

const joinWhatsAppStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: constants.colors.backGroundLight,
        paddingHorizontal: 10
    },
    txtText: {
        color: constants.colors.labelColor,
        marginTop: 5,
        fontSize: 12,
        fontWeight: '400',
        fontFamily: constants.fonts.nuntinoRegular
    },
    viewEtiquites: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: constants.colors.white,
        borderRadius: 6
    },
    txtEtiquite: {
        color: constants.colors.darkBlue,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: constants.fonts.nuntinoRegular
    },
    viewAgreeEtiquites: {
        bottom: 25,
        position: 'absolute',
        alignSelf: 'center',
        width:'100%'
    },
    txtAgree:{
        fontSize:22,
        fontFamily:constants.fonts.notoSansRegular,
        fontWeight:'600',
        alignSelf:'center',
        color:constants.colors.darkGreen
    }
})

export default joinWhatsAppStyle