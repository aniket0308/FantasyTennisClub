import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { constants } from "../../common/constant"
import cardWithImageStyle from "./style"

const CardWithImage = ({ title, containerStyle, titleStyle, imgStyle, rightIcon,label,labelTitle,labelStyle,onPress ,disabled}) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={[cardWithImageStyle.mainContainer, containerStyle]}>
            {
                label
                && <View>
                    <Text style={[cardWithImageStyle.txtTitle, labelStyle]}>{label}</Text>
                    <Text style={[cardWithImageStyle.txtTitle, titleStyle]}>{labelTitle}</Text>
                </View>
            }
            <Text style={[cardWithImageStyle.txtTitle, titleStyle]}>{title}</Text>
            {rightIcon
                && <Image style={[imgStyle, { alignSelf: 'center', height: 15, width: 15 }]} source={rightIcon} resizeMode='contain' />
            }
        </TouchableOpacity>
    )
}

export default CardWithImage