import React from "react"
import { Image, TextInput, View } from "react-native"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { constants } from "../../common/constant"
import searchStyle from "./style"

const SearchBar=()=>{
return(
    <View style={searchStyle.mainContainer}>
    <View style={{ flexDirection: 'row' }}>
        <Image
            style={{ height: 20, width: 20, alignSelf: 'center' }}
            source={constants.icons.search}
            resizeMode='contain'
        />
        <TextInput
            style={{ width: widthPercentageToDP(60), marginLeft: 10, fontSize: 16 }}
            placeholder="search"
        />
    </View>
    <Image
        style={{ height: 20, width: 20, alignSelf: 'center' }}
        source={constants.icons.filter}
        resizeMode='contain'
    />
</View>
)
}

export default SearchBar