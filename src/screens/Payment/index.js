import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { constants } from "../../common/constant";
import { Button, FloatingInput, Header } from "../../components";
import PaymementStyle from "./style";
import { useDispatch } from "react-redux";
import { doPaymentFromCard } from "../../redux/slice/auth";
import Snackbar from "react-native-snackbar";
import RNAuthorizeNet from "react-native-reliantid-authorize-net";
import Loader from '../../components/loader'


const Payment = ({ route, navigation }) => {

    const [cardNumber, setCardNumber] = useState('')
    const [month, setMonth] = useState('')
    const [cvc, setCvc] = useState('')
    const [year, setYear] = useState('')
    const [nameOnCard, setNameOnCard] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()
    const tempObj = route?.params?.item
    const price = route?.params?.price

    const tournamentIdArr = tempObj?.tournaments?.length>0?tempObj?.tournaments.map((item, index) => {
        return item.tournament_id
    }):tempObj?.length>0 ? tempObj.map((item)=>{
        return item?.tournament_id
    }):[tempObj?.tournament_id]

    var count=0
    var totalPrice= tempObj?.length>0 && tempObj.map((item)=>{
        count=count+item?.price
        return count
    })


    const doPayment = async () => {
        setIsLoading(true)
        RNAuthorizeNet.getTokenWithRequestForCard({
            LOGIN_ID: "833MhxBA",
            CLIENT_KEY: "6hnN99UnEeHa67vwzS267g8jZRML3uGnT76heKW8daZkqGQAa65P2R6H8E78AX7N",
            CARD_NO: cardNumber,
            EXPIRATION_MONTH: month,
            EXPIRATION_YEAR: year,
            CVV_NO: cvc,
        }, true,
            (res, response) => {
                dispatch(doPaymentFromCard({ dataValue: response?.DATA_VALUE, dataDescriptor: response?.DATA_DESCRIPTOR, amount:price, membership_type:route.params.item?.length>0?1:tempObj?.membership_type, tournamentIdArr, navigation,setIsLoading }))
            }
        )
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
                        maxLength={4}
                    />
                    <FloatingInput
                        textInputStyle={{ marginTop: 0, width: widthPercentageToDP(23) }}
                        mandatoryField={true}
                        headerText={'CVC'}
                        value={cvc}
                        onChangeText={(e) => setCvc(e)}
                        keyboardType='phone-pad'
                        maxLength={3}
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
            {isLoading == true
                && <Loader />
            }
        </View>
    )
}

export default Payment