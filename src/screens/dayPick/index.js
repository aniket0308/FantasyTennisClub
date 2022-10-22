import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { constants } from "../../common/constant";
import { Button } from "../../components";
import CardWithImage from "../../components/cardWithImage";
import dayPickStyle from "./style";

const DayPick = ({ route, navigation }) => {

    const [isSubmit, setIsSubmit] = useState(false)

    //rendering Selection DropDown Function
    const renderSelectionDropdown = ({ item, index }) => {
        return (
            <>
                <View style={dayPickStyle.txtViewSelectionStyle}>
                    <Text style={dayPickStyle.selectionTxtStyle}>Day 02 Match 1</Text>
                </View>
                <SelectDropdown
                    buttonStyle={dayPickStyle.selectionButtonStyle}
                    data={['Player-1', "Player-2"]}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index)
                    }}
                    defaultButtonText='Drop Down with picks'
                    buttonTextStyle={dayPickStyle.selectionButtonTxtStyle}
                    rowTextStyle={{ textAlign: 'left', marginLeft: 20 }}
                    dropdownStyle={dayPickStyle.dropDownStyle}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
            </>
        )
    }

    return (
        <View style={dayPickStyle.mainContainer}>
            <StatusBar backgroundColor={constants.colors.backGroundLight} barStyle='dark-content' />
            <SafeAreaView />
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginTop: 10, marginLeft: -5 }}>
                <Image style={{ height: 20, width: 20, tintColor: constants.colors.darkGreen }} source={constants.icons.backArrow} />
            </TouchableOpacity>
            <Text style={dayPickStyle.txtDay}>Day {route.params <= 9 ? `0${route.params}` : route.params}</Text>
            <Text style={dayPickStyle.txtSubmit}>{isSubmit == false ? 'Submit your picks below' : '‌‌Your Picks have been entered successfully!'}</Text>
            <ScrollView
                scrollEnabled={isSubmit == true ? false : true}
                bounces={false}
                style={{ marginBottom: 25 }}
                contentContainerStyle={{ justifyContent: 'center', flex: isSubmit == false ? 0 : 1 }}
                showsVerticalScrollIndicator={false} >
                {isSubmit == false
                    ? <>
                        <View style={{ marginVertical: 30 }}>
                            <CardWithImage
                                containerStyle={{ backgroundColor: constants.colors.labelColor }}
                                labelTitle={'Player 1 vs Player 2'}
                                label={'Day 01 Match 1'}
                                labelStyle={dayPickStyle.labelStyle}
                                titleStyle={dayPickStyle.titleStyle}
                            />
                            <CardWithImage
                                containerStyle={{ backgroundColor: constants.colors.labelColor, marginVertical: 12 }}
                                labelTitle={'Player 1 vs Player 2'}
                                label={'Day 01 Match 1'}
                                labelStyle={dayPickStyle.labelStyle}
                                titleStyle={dayPickStyle.titleStyle}
                            />
                            <CardWithImage
                                containerStyle={{ backgroundColor: constants.colors.labelColor }}
                                labelTitle={'Player 1 vs Player 2'}
                                label={'Day 01 Match 1'}
                                labelStyle={dayPickStyle.labelStyle}
                                titleStyle={dayPickStyle.titleStyle}
                            />
                            <FlatList
                                data={[1, 2, 3]}
                                renderItem={renderSelectionDropdown}
                                key={(item) => item}
                                keyExtractor={item => item}
                            />
                        </View>
                        <Button
                            titleText={'Submit'}
                            btnStyle={{ width: '100%' }}
                            onPress={() => setIsSubmit(true)}
                        />
                    </>
                    : <>
                        <View style={{ marginVertical: 30, justifyContent: 'center', }}>
                            <CardWithImage
                                containerStyle={{ backgroundColor: constants.colors.labelColor }}
                                labelTitle={'User Selection'}
                                label={'Day 01 Match 1'}
                                labelStyle={dayPickStyle.labelStyle}
                                titleStyle={dayPickStyle.titleStyle}
                            />
                            <CardWithImage
                                containerStyle={{ backgroundColor: constants.colors.labelColor, marginVertical: 12 }}
                                labelTitle={'User Selection'}
                                label={'Day 01 Match 1'}
                                labelStyle={dayPickStyle.labelStyle}
                                titleStyle={dayPickStyle.titleStyle}
                            />
                            <CardWithImage
                                containerStyle={{ backgroundColor: constants.colors.labelColor }}
                                labelTitle={'User Selection'}
                                label={'Day 01 Match 1'}
                                labelStyle={dayPickStyle.labelStyle}
                                titleStyle={dayPickStyle.titleStyle}
                            />
                        </View>
                    </>
                }
            </ScrollView >
        </View>
    )
}

export default DayPick