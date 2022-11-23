import React, { useEffect, useRef } from "react";
import { Text, TouchableOpacity, Animated, View, TextInput, Image } from 'react-native'
//third party lib
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { constants } from "../../common/constant";
import floatingInputStyles from "./style";

const FloatingInput = ({ textInputStyle, isEditable, onInputPress, headerStyle, value, headerText,
    passwordInput = false, refs, textStyle, keyboardType, returnKeyType, multiline, numberOfLines,
    blurOnSubmit, isTextIncluded = false, labelTextIncluded, rightIcon, rightIconStyle, autoCapitalize,
    secureTextEntry, hideIcon = false, onChangeText, onTxtPress, onHideShow, onSubmitRef, textIsEditable
}) => {
    const moveText = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (value !== "") {
            moveTextTop();
        } else if (value === "") {
            moveTextBottom();
        }
    }, [value])

    const onFocusHandler = () => {
        if (value !== "") {
            moveTextTop();
        }
    };

    const onBlurHandler = () => {
        if (value === "") {
            moveTextBottom();
        }
    };

    const moveTextTop = () => {
        Animated.timing(moveText, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const moveTextBottom = () => {
        Animated.timing(moveText, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const yVal = moveText.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 7],
    });

    const animStyle = {
        transform: [
            {
                translateY: yVal,
            },
        ],
    };

    return (
        <>
            <TouchableOpacity
                disabled={isEditable}
                onPress={onInputPress}
                style={[floatingInputStyles.viewContainer, textInputStyle]}>
                <Animated.View style={[floatingInputStyles.animatedStyle, { top: value == '' ? 5 : 1 }, animStyle,]}>
                    <Text
                        style={{
                            ...floatingInputStyles.headertxt,
                            ...headerStyle,
                            fontSize: value != '' ? wp(3) : wp(4.2),
                        }}>
                        {headerText}
                    </Text>
                </Animated.View>
                {
                    !passwordInput
                        ? <>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    onPressIn={onInputPress}
                                    ref={refs}
                                    value={value}
                                    autoCompleteType='off'
                                    onChangeText={onChangeText}
                                    style={{ ...floatingInputStyles.textInput, ...textStyle, paddingBottom: value != '' ? wp(2.5) : wp(3.5), paddingTop: value != '' ? wp(4.5) : wp(3.5) }}
                                    keyboardType={keyboardType ? keyboardType : "default"}
                                    returnKeyType={returnKeyType ? returnKeyType : "default"}
                                    multiline={multiline}
                                    numberOfLines={numberOfLines != null ? numberOfLines : 1}
                                    onFocus={onFocusHandler}
                                    onBlur={onBlurHandler}
                                    blurOnSubmit
                                    editable={textIsEditable}
                                    autoCapitalize={autoCapitalize}
                                    onSubmitEditing={onSubmitRef}
                                />
                                {isTextIncluded
                                    && <TouchableOpacity>
                                        <Text style={floatingInputStyles.lblRighText}>{labelTextIncluded}</Text>
                                    </TouchableOpacity>
                                }
                                {rightIcon
                                    && <TouchableOpacity style={floatingInputStyles.lblRighText} onPress={() => onHideShow()}>
                                        <Image
                                            source={rightIcon}
                                            resizeMode={'contain'}
                                            style={[floatingInputStyles.eye, rightIconStyle]} />
                                    </TouchableOpacity>
                                }
                            </View>
                        </>
                        : <View style={[floatingInputStyles.inputView, { flexDirection: 'row' }]}>
                            <TextInput
                                value={value}
                                autoCompleteType='off'
                                style={{ ...floatingInputStyles.insideText, paddingBottom: value != '' ? wp(2.5) : wp(3.5), paddingTop: value != '' ? wp(4.5) : wp(3.5) }}
                                keyboardType={keyboardType ? keyboardType : "default"}
                                returnKeyType={returnKeyType ? returnKeyType : "default"}
                                onChangeText={onChangeText}
                                secureTextEntry={secureTextEntry}
                                onFocus={onFocusHandler}
                                onBlur={onBlurHandler}
                                blurOnSubmit
                                autoCapitalize={autoCapitalize}
                                onSubmitEditing={onSubmitRef}
                                editable={textIsEditable}
                            />
                            {
                                hideIcon == true &&
                                < TouchableOpacity style={floatingInputStyles.eyeWrapper} onPress={onHideShow}>
                                    <Image
                                        source={secureTextEntry ? constants.icons.hiddenEye : constants.icons.eye}
                                        resizeMode={'contain'}
                                        style={floatingInputStyles.eye}
                                    />
                                </TouchableOpacity>
                            }
                        </View>
                }
            </TouchableOpacity >
            {isTextIncluded
                &&<TouchableOpacity onPress={onTxtPress}>
                    <Text style={floatingInputStyles.lblRighText}>{labelTextIncluded}</Text>
                </TouchableOpacity> 
            }
        </>
    )
}

export default FloatingInput