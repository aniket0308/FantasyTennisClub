import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native";
import { utils } from "../../common";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import Loader from "../../components/loader";
import rulesStyle from "./style";
import Snackbar from 'react-native-snackbar';
import RenderHtml from 'react-native-render-html';
import { widthPercentageToDP } from "react-native-responsive-screen";

//Rules Screen
const Rules = ({ navigation }) => {

    const [rules, setRules] = useState([])
    const [faq, setFaq] = useState([])
    const [rulesLoading, setRulesLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    //Function For Getting Rules From Api
    const getRulesFromApi = async () => {
        const token = await AsyncStorage.getItem('@Token')
        fetch('https://fantasytennisclub.com/admin/api/v1/page/rules', {
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
                    setRulesLoading(true)
                }
                setRules(json)
            }).
            catch(e => {
                Snackbar.show({
                    text: e.toString(),
                    duration: 1000,
                    backgroundColor:'red',
                    // action: {
                    //   text: 'UNDO',
                    //   textColor: 'green',
                    //   onPress: () => { /* Do something. */ },
                    // },
                  });
                setRulesLoading(false)
                console.log('What Is Error In Get Api', e)
            })
    }

    //get Faq From Api
    const getFaqFromApi = async () => {
        const token = await AsyncStorage.getItem('@Token')
        //calling api for FAQS
        fetch('https://fantasytennisclub.com/admin/api/v1/page/faqs', {
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
                setFaq(json)
            }).
            catch(e => {
                Snackbar.show({
                    text: e.toString(),
                    duration: 1000,
                    backgroundColor:'red',
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
        getRulesFromApi()
        getFaqFromApi()
    }, []);

    //Function For Rendering Rules
    const RenderRules = () => {
        return (
            <View style={[rulesStyle.viewRules, { backgroundColor: '#F5F8FA' }]}>
                <Text style={rulesStyle.txtRules} >{rules?.data?.title}</Text>
                <RenderHtml
                source={{ html:`${rules?.data?.content}`}}
                />
                {/* <Text
                    style={[rulesStyle.txtText, { textAlign: 'auto' }]} >{rules?.data?.content}</Text> */}
            </View>
        )
    }

    const RenderFaq = () => {
        return (
            <View style={[rulesStyle.viewRules, { backgroundColor: '#F5F8FA', marginTop: 20 }]}>
                <Text style={rulesStyle.txtRules} >Frequently Asked Questions:</Text>
                <RenderHtml
                source={{ html:`${faq?.data?.content}`}}
                />
                {/* <Text
                    style={[rulesStyle.txtText, { textAlign: 'auto' }]} >{faq?.data?.content}</Text> */}
            </View>
        )
    }

    return (
        <View style={rulesStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                showBackArrow={true}
                title={'Rules and FAQs'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                rightIcon={constants.icons.shapeBell}
                onPressRightIcon={()=>utils.navigateTo(navigation,constants.screens.notification)}
                onPressLeftIcon={() => navigation.goBack()}
            />
            {isLoading == true && rulesLoading == true
                ? <ScrollView style={{ marginBottom: 25 }}>
                    {
                        rules?.length != 0
                        && <RenderRules />
                    }
                    {
                        faq.length != 0
                        && <RenderFaq />
                    }
                </ScrollView>
                : <Loader />
            }
        </View>
    )
}

export default Rules