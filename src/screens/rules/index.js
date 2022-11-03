import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import rulesStyle from "./style";

//Rules Screen
const Rules = () => {

    const [rules, setRules] = useState([])
    const [faq, setFaq] = useState([])

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
            then((json) => setRules(json)).
            catch(e => console.log('What Is Error In Get Api', e))
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
            then((json) => setFaq(json)).
            catch(e => console.log('What Is Error In Get Api', e))
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
                <Text
                    style={[rulesStyle.txtText, { textAlign: 'auto' }]} >{rules?.data?.content}</Text>
            </View>
        )
    }

    const RenderFaq = () => {
        return (
            <View style={[rulesStyle.viewRules, { backgroundColor: '#F5F8FA', marginTop: 20 }]}>
                <Text style={rulesStyle.txtRules} >{faq?.data?.title}</Text>
                <Text
                    style={[rulesStyle.txtText, { textAlign: 'auto' }]} >{faq?.data?.content}</Text>
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
            />
            {
                rules?.length != 0
                && <RenderRules />
            }
            {
                faq.length != 0
                && <RenderFaq />
            }
        </View>
    )
}

export default Rules