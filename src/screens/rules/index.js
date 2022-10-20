import React from "react";
import { FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";
import { constants } from "../../common/constant";
import { Header } from "../../components";
import rulesStyle from "./style";

//Rules Screen
const Rules = () => {

    const rulesArr = [
        {
            title: 'Rules:',
            text: `Played during the 4 Grand Slams.  Fantasy matches are primarily on the men’s draw but will include women's, doubles, and mixed events.
During each selection day, three (3) Tennis matches will be posted for members to analyze and choose winners.  This is for each day of play (includes day and night sessions).
On each Selection Day, before the first match starts, members must select and put forward the three (3) players who they think will win their matches. 
           
Following the completion of all matches on a Selection Day.  Members will earn one (1) point for every picked winner.  If a member successfully picks all three (3) matches; then an extra point is given for a maximum of four (4) points on a given selection day.
           
Members that end up with the same number of points will go into a Tie Breaker.`
        },
        {
            title: 'Frequently Asked Questions:',
            text: `What happens if I forget to enter selections for a Fantasy Tennis match?

o This translates into a ‘Walk Over’ the same way as in tennis competition.  Which will result in a score of zero (0).
       
o But do not worry, you are still able to enter picks at the next Selection Day and carry on playing.
       
How many selection days does each Grand Slam have?
       
o The Australian Open, Wimbledon and US Open Challenge all have thirteen (13) Selection Days.  This is to accommodate selections at the later stages of the tournament.
       
• I sent my selections but changed my mind, can I update my picks?
       
o Yes, as long as it happens during the selection window timeframe.  (e.g. Selection Day Form is active).
       
o Members can complete and re-submit new picks using the same link used for the initial selection. 
       
o The system will take the latest pics as your valid picks and will discard any previous entries.`
        }

    ]

    //Function For Rendering Rules
    const renderRules = ({ item, index }) => {
        return (
            <View style={[rulesStyle.viewRules, { backgroundColor: '#F5F8FA', marginTop: index != 0 ? 20 : 0 }]}>
                <Text style={rulesStyle.txtRules} >{item.title}</Text>
                <Text
                    style={[rulesStyle.txtText, { textAlign: 'auto' }]} >{item.text}</Text>
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
                titleStyle={{ marginTop:5,marginBottom:-10}}
                rightIcon={constants.icons.shapeBell}
            />
            <FlatList
                bounces={false}
                style={{ marginBottom: 20 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                data={rulesArr}
                renderItem={renderRules}
                key={(item) => item}
                keyExtractor={item => item}
            />
        </View>
    )
}

export default Rules