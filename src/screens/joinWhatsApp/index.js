import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import React, { useEffect, useState } from "react";
import { Alert, Linking, Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import PushNotification from "react-native-push-notification";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Snackbar from "react-native-snackbar";
import { useDispatch } from "react-redux";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Button, Header } from "../../components";
import Loader from "../../components/loader";
import { getEtiquites } from "../../redux/slice/auth";
import joinWhatsAppStyle from "./style";

const JoinWhatsApp = ({ navigation,route }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [joinWhatsApp,setJoinWhatsApp]=useState(route?.params)
    const [data,setData]=useState()
    const dispatch=useDispatch()

    const getEtiquete = async () => {
        utils.callApiGet(`api/v1/page/whatsapp-group`, {setIsLoading,setData,token:await AsyncStorage.getItem('@Token')})
    }

    useEffect(() => {
        getEtiquete()
    }, [])

    return (
        <View style={joinWhatsAppStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                showBackArrow={true}
                title={'Join WhatsApp Group'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                rightIcon={constants.icons.shapeBell}
                checkLength={true}
                rightIconStyle={{height:widthPercentageToDP(6),width:widthPercentageToDP(6)}}
                onPressRightIcon={async() => {
                        const token=await AsyncStorage.getItem('@Token')
                        utils.callApi('api/v1/announcements/member/read-all',{token},'allNotificationRead')
                        if (Platform.OS == 'ios') {
                            PushNotificationIOS.getApplicationIconBadgeNumber(number => {
                                console.log('what is number beta incrementer', number);
                                PushNotificationIOS.setApplicationIconBadgeNumber(0);
                            });
                        } else {
                           PushNotification.removeAllDeliveredNotifications()
                        }
    
                        utils.navigateTo(navigation, constants.screens.notification)}
                    }
                onPressLeftIcon={() => navigation.goBack()}
                lengthStyle={{top:5}}
            />
            {
                isLoading == true
                    ? <>
                        <View style={[joinWhatsAppStyle.viewEtiquites, { backgroundColor: '#F5F8FA' }]}>
                            <Text style={joinWhatsAppStyle.txtEtiquite} >{data?.data && data?.data?.title}:</Text>
                            <RenderHTML
                            source={{ html:`${data?.data&&data?.data?.content}`}}
                            />
                        </View>
                        <View style={joinWhatsAppStyle.viewAgreeEtiquites}>
                            <Text style={joinWhatsAppStyle.txtAgree}>I agree to the etiquette</Text>
                            <Button
                            onPress={async()=>{
                                if(joinWhatsApp==''||joinWhatsApp==null||joinWhatsApp==undefined){
                                    Alert.alert("Whatsapp group not created yet")
                                }else{
                                    await Linking.openURL(joinWhatsApp);
                                }
                            }}
                                titleText={'Join Group'}
                                btnStyle={{ width: '90%', marginVertical: 10 }}
                            />
                        </View>
                    </>
                    : <Loader />
            }
        </View>
    )
}

export default JoinWhatsApp