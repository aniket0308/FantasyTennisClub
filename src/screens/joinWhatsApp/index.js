import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import RenderHTML from "react-native-render-html";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Snackbar from "react-native-snackbar";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Button, Header } from "../../components";
import Loader from "../../components/loader";
import joinWhatsAppStyle from "./style";

const JoinWhatsApp = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [etiquete, setEtiquete] = useState({})

    const getEtiquete = async () => {
        const token = await AsyncStorage.getItem('@Token')
        fetch('https://fantasytennisclub.com/admin/api/v1/page/whatsapp-group', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }).
            then((response) => response.json()).
            then((json) => {
                if (json?.success == true) {
                    setIsLoading(true)
                }
                setEtiquete(json)
            }).
            catch(e => {
                Snackbar.show({
                    text: e.toString(),
                    duration: 1000,
                    backgroundColor: 'red',
                    // action: {
                    //   text: 'UNDO',
                    //   textColor: 'green',
                    //   onPress: () => { /* Do something. */ },
                    // },
                });
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
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
                onPressRightIcon={() => utils.navigateTo(navigation, constants.screens.notification)}
                onPressLeftIcon={() => navigation.goBack()}
            />
            {
                isLoading == true
                    ? <>
                        <View style={[joinWhatsAppStyle.viewEtiquites, { backgroundColor: '#F5F8FA' }]}>
                            <Text style={joinWhatsAppStyle.txtEtiquite} >Etiquete:</Text>
                            <RenderHTML
                            source={{ html:`${etiquete?.data&&etiquete?.data?.content}`}}
                            />
                            {/* <Text
                                style={[joinWhatsAppStyle.txtText, { textAlign: 'auto' }]} >
                                    {etiquete}
                            </Text> */}
                        </View>
                        <View style={joinWhatsAppStyle.viewAgreeEtiquites}>
                            <Text style={joinWhatsAppStyle.txtAgree}>I agree to the etiquete</Text>
                            <Button
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