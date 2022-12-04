import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Button, FloatingInput, Header } from "../../components";
import PaymementStyle from "./style";
import { useDispatch } from "react-redux";
import { doPaymentFromCard } from "../../redux/slice/auth";
import Snackbar from "react-native-snackbar";
// import RNAuthorizeNet from "react-native-reliantid-authorize-net";


const Payment = ({ route, navigation }) => {

    const [cardNumber, setCardNumber] = useState('')
    const [month, setMonth] = useState('')
    const [cvc, setCvc] = useState('')
    const [year, setYear] = useState('')
    const [nameOnCard, setNameOnCard] = useState('')

    const dispatch = useDispatch()
    const tempObj = route?.params?.item

    console.log('tempObj====', tempObj);


    const doPayment = async () => {
    //     RNAuthorizeNet.getTokenWithRequestForCard({
    //         LOGIN_ID: "833MhxBA",
    //         CLIENT_KEY: "6hnN99UnEeHa67vwzS267g8jZRML3uGnT76heKW8daZkqGQAa65P2R6H8E78AX7N",
    //         CARD_NO: "4007000000027",
    //         EXPIRATION_MONTH: "05",
    //         EXPIRATION_YEAR: "24",
    //         CVV_NO: "089",
    //     },true,
    //     (res,response)=>{
    //         console.log('ddfd',response);
    //     }
    //    )

        // // await getTokenWithRequestForCard({
        // //     env: AuthorizeNetEnv.PRODUCTION, //AuthorizeNetEnv.PRODUCTION
        // //     cardValues: {
        // //         loginID: '833MhxBA',
        // //         clientKey: '6hnN99UnEeHa67vwzS267g8jZRML3uGnT76heKW8daZkqGQAa65P2R6H8E78AX7N',
        // //         // cardNumber: '4007 0000 0002 7',
        // //         cardNumber: cardNumber,
        // //         // cardCVV: '089',
        // //         cardCVV: cvc,
        // //         expirationYear: year,
        // //         expirationMonth: month,
        // //         // zipCode: '...', //Optional
        // //         // cardHolderName: '...' //Optional
        // //     },
        // // }).then((response) => {
        // //     dispatch(doPaymentFromCard({ data_value: response?.dataValue, data_descriptor: response?.dataDescriptor, amount: tempObj?.price, membership_type: tempObj?.membership_type }))
        // // }).catch(e => {
        // //     Snackbar.show({
        // //         text: e.text,
        // //         duration: 1000,
        // //         backgroundColor: 'red',
        // //     })
        // });
    }

    return (
        <View style={PaymementStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <Header
                viewHeaderStyle={{ width: widthPercentageToDP(70) }}
                showBackArrow={true}
                title={'Enter Payment'}
                titleStyle={{ marginTop: 5, marginBottom: -10 }}
                onPressLeftIcon={() => navigation.goBack()}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ width: widthPercentageToDP(50) }} resizeMode='contain' source={constants.icons.cards} />
                <FloatingInput
                    textInputStyle={{ marginTop: -35 }}
                    mandatoryField={true}
                    headerText={'Card Number'}
                    value={cardNumber}
                    onChangeText={(e) => setCardNumber(e)}
                    keyboardType='phone-pad'
                    maxLength={16}

                />
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <FloatingInput
                        textInputStyle={{ marginTop: 0, width: widthPercentageToDP(23) }}
                        mandatoryField={true}
                        headerText={'Month'}
                        value={month}
                        onChangeText={(e) => setMonth(e)}
                        keyboardType='phone-pad'
                        maxLength={2}
                    />
                    <FloatingInput
                        textInputStyle={{ marginTop: 0, width: widthPercentageToDP(23), marginHorizontal: 20 }}
                        mandatoryField={true}
                        headerText={'Year'}
                        value={year}
                        onChangeText={(e) => setYear(e)}
                        keyboardType='phone-pad'
                    />
                    <FloatingInput
                        textInputStyle={{ marginTop: 0, width: widthPercentageToDP(23) }}
                        mandatoryField={true}
                        headerText={'CVC'}
                        value={cvc}
                        onChangeText={(e) => setCvc(e)}
                        keyboardType='phone-pad'
                    />
                </View>
                <FloatingInput
                    textInputStyle={{ marginTop: 0 }}
                    mandatoryField={true}
                    headerText={'Name on Card'}
                    value={nameOnCard}
                    onChangeText={(e) => setNameOnCard(e)}
                />
                <Button
                    // disabled={isLoading == true ? true : false}
                    titleText='Pay'
                    btnStyle={{ marginTop: 50 }}
                    onPress={() => {
                        doPayment()
                        // navigation.navigate('PaymentConfirmation')
                    }}
                />
            </View>
        </View>
    )
}

export default Payment