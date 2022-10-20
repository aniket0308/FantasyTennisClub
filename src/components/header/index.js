import React from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import headerStyle from "./style";

const Header = ({ title, subTitle, showBackArrow, titleStyle, onPressLeftIcon, subTitleStyle, rightIcon, viewHeaderStyle, rightIconStyle,
    mainViewHeaderStyle, resizeMode, onPressRightIcon
}) => {
    return (
        <View style={[headerStyle.headerView, mainViewHeaderStyle]}>
            {showBackArrow == true
                ? <View style={[headerStyle.imgBackView, viewHeaderStyle]}>
                    <TouchableOpacity style={{ alignSelf: 'center', padding: 5 }} activeOpacity={1} onPress={onPressLeftIcon}>
                        <Image
                            style={headerStyle.imgBack}
                            source={constants.icons.backArrow}
                            resizeMode='contain' />
                    </TouchableOpacity>
                    <View style={commonStyle.column}>
                        <Text style={[headerStyle.txtTitle, titleStyle]}>{title}</Text>
                        <Text style={[headerStyle.txtSubTitle, subTitleStyle]}>{subTitle}</Text>
                    </View>
                    {
                        rightIcon
                        && <TouchableOpacity style={headerStyle.rightIconTouchableShow} activeOpacity={1} onPress={onPressRightIcon}>
                            <Image
                                style={[headerStyle.imgBack, { tintColor: constants.colors.black }, rightIconStyle]}
                                source={rightIcon}
                                resizeMode='contain' />
                        </TouchableOpacity>
                    }
                </View>
                : <>
                    <Text style={[headerStyle.txtTitle, titleStyle]}>{title}</Text>
                    <Text style={[headerStyle.txtSubTitle, subTitleStyle]}>{subTitle}</Text>
                    {
                        rightIcon
                        && <TouchableOpacity style={headerStyle.rightIconTouchable} activeOpacity={1} onPress={onPressRightIcon}>
                            <Image
                                style={[headerStyle.imgBack, { tintColor: constants.colors.black }, rightIconStyle]}
                                source={rightIcon}
                                resizeMode={resizeMode || 'contain'} />
                        </TouchableOpacity>
                    }
                </>
            }
        </View>
    )
}

export default Header