import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import aboutUsStyle from "./style";

const AboutUs = ({ navigation }) => {

    const [aboutUs, setAboutUs] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    //get AboutUs From API
    const getAboutUsFromApi = async () => {
        const token = await AsyncStorage.getItem('@Token')
        //calling api for FAQS
        fetch('https://fantasytennisclub.com/admin/api/v1/page/about', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        }).
            then((response) => response.json()).
            then((json) => {
                if (json.success == true) {
                    setIsLoading(true)
                }
                setAboutUs(json)
            }).
            catch(e => {
                toast.show(e.toString(), {
                    type: 'danger',
                    placement: 'top'
                })
                setIsLoading(false)
                console.log('What Is Error In Get Api', e)
            })
    }

    useEffect(() => {
        getAboutUsFromApi()
    }, [])

    return (
        <View style={aboutUsStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: '85%' }}
                showBackArrow={true}
                title={'About Fantasy Tennis Club'}
                titleStyle={{ marginTop: 5, marginBottom: -3 }}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <View style={aboutUsStyle.txtView}>
                {isLoading == true
                    ? <ScrollView bounces={false} style={{ flex: 1 }}>
                        {/* <Text style={aboutUsStyle.txt}>
                    Fantasy Tennis Club was founded in 2019 by real Tennis Players who enjoy and are passionate about the game of Tennis.
                </Text>
                <Text style={[aboutUsStyle.txt, { marginVertical: 20 }]}>
                    Our experts are professional tennis players that enjoy and love the game of tennis and like to share their views on styles, discuss rivalries and talk tennis.
                </Text>
                <Text style={aboutUsStyle.txt}>
                    Fantasy Tennis Club was created to promote the interaction of a fiery Tennis community.
                </Text>
                <View style={[commonStyle.row, { marginTop: 30 }]}>
                    <Text style={[aboutUsStyle.txt]}>
                        Our Mission:   Enhance the tennis experience of our members by becoming part of an interactive community.
                    </Text>
                </View> */}
                        <Text style={aboutUsStyle.txt}>
                            {aboutUs?.data?.content}
                        </Text>
                    </ScrollView>
                    : <Loader />
                }
            </View>
        </View>
    )
}

export default AboutUs