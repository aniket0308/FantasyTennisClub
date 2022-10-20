import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";

const selectionDayStyle = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: constants.colors.backGroundLight,
        paddingHorizontal:10
    },
    touchableMainView: {
        flexDirection: 'row-reverse',
        flexWrap: 'wrap-reverse',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop:30,
    },
    touchItem: {
        height: widthPercentageToDP(18),
        width: widthPercentageToDP(18),
        borderWidth: 2,
        backgroundColor: constants.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: constants.colors.darkGreen,
        borderRadius: 6
    },
    TxtDay: {
        fontSize: 14,
        fontWeight: '400',
        color: constants.colors.darkGreen,
        fontFamily:constants.fonts.notoSansRegular,
        marginTop:Platform.OS=="android"? -10:0
    },
    txtWhichDay: {
        fontSize: 25,
        fontWeight: '600',
        color: constants.colors.darkGreen,
        fontFamily:constants.fonts.notoSansRegular
    },
    touchableAllPicks:{backgroundColor:constants.colors.white,
        borderWidth:2,
        borderRadius:6,
        paddingVertical:20,
        paddingHorizontal:30,
        borderColor:constants.colors.darkGreen
    },
    touchableAllPicks:{
        backgroundColor:constants.colors.white,
        alignSelf:'center',
        borderWidth:2,
        borderRadius:6,
        borderColor:constants.colors.darkGreen,
        padding:20
    },
    txtAllPicks:{
        fontFamily:constants.fonts.nuntinoLight,
        color:constants.colors.darkGreen,
        fontSize:20,
        fontWeight:'600'
    }
})

export default selectionDayStyle