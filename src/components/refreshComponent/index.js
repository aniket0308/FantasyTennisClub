import React from "react";
import { RefreshControl } from "react-native";
import { constants } from "../../common/constant";

const RefreshControlPull = ({refreshing,onRefresh}) => {
    return (
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            title='Loading...'
            tintColor={constants.colors.darkBlue}
            titleColor={constants.colors.darkBlue}
        />
    )
}

export default RefreshControlPull