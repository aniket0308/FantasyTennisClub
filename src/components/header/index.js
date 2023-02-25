import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { utils } from "../../common";
import { commonStyle } from "../../common/commonStyle";
import { constants } from "../../common/constant";
import { store } from "../../redux/store";
import headerStyle from "./style";

const Header = ({ title, subTitle, showBackArrow, titleStyle, onPressLeftIcon, subTitleStyle, rightIcon, viewHeaderStyle, rightIconStyle,
    mainViewHeaderStyle, resizeMode, onPressRightIcon, rightIconTitle, rightIconTitleStyle, isCartHavingThings, lengthStyle, checkLength,navigation,
    refresh
}) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [,setRender]=useState({})
    const notiState=store.getState()
    const [length,setLength]=useState()

    const getNotification = async () => {
        const token = await AsyncStorage.getItem('@Token')
        token!=null&&utils.callApiGet(`api/v1/announcements`, { setIsLoading, setData,token })
    }

    const getLength=async()=>{
        await AsyncStorage.getItem('@count').then(async(count)=>{
            setLength(count)
        })
    }
    useEffect(() => {
        getNotification()
        getLength()
    }, [])

    useEffect(() => {
        getNotification()
        getLength()
    }, [refresh])

    useEffect(() => {
        if(navigation!=undefined){
            const focusHandler = navigation.addListener('focus', () => {
                getNotification()
                getLength()
            });
            return focusHandler;
        }
    }, [navigation]);

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
                            {length > 0 && checkLength == true && <View style={[{ backgroundColor: 'red', height: 10, width: 10, borderRadius: 10, position: 'absolute', right: 6, top: -6 }, lengthStyle]} />}
                            <Image
                                style={[headerStyle.imgBack, { tintColor: constants.colors.black }, rightIconStyle]}
                                source={rightIcon}
                                resizeMode='contain' />
                            {
                                isCartHavingThings == true
                                && <View style={{ backgroundColor: 'red', height: 10, width: 10, position: 'absolute', top: 2, right: 0, borderRadius: 5 }} />
                            }
                            {
                                rightIconTitle
                                && <Text style={rightIconTitleStyle}>{rightIconTitle}</Text>
                            }
                        </TouchableOpacity>
                    }
                </View>
                : <>
                    <Text style={[headerStyle.txtTitle, titleStyle]}>{title}</Text>
                    <Text style={[headerStyle.txtSubTitle, subTitleStyle]}>{subTitle}</Text>
                    {
                        rightIcon
                        && <TouchableOpacity style={headerStyle.rightIconTouchable} activeOpacity={1} onPress={onPressRightIcon}>
                            { length > 0&& checkLength == true && <View style={[{ backgroundColor: 'red', height: 10, width: 10, borderRadius: 10, position: 'absolute', right: 10 }, lengthStyle]} />}
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