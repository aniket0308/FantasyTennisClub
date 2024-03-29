import React from "react";
import { TouchableOpacity, Text } from 'react-native'
import buttonStyle from "./style";


//Common Button Component
const Button = ({ btnStyle, txtStyle, onPress, titleText,disabled }) => {
    return (
        <TouchableOpacity
            style={[buttonStyle.buttonContainer, btnStyle]}
            disabled={disabled}
            onPress={onPress} >
            <Text style={[buttonStyle.txtStyle, txtStyle]}>{titleText}</Text>
        </TouchableOpacity>
    )
}

export default Button;