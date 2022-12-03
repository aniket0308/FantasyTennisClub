import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Image, Text, View } from "react-native"
import { constants } from "../common/constant"
import Account from "../screens/account"
import ForgotPassword from "../screens/forgetPassword"
import Home from "../screens/home"
import Login from "../screens/login"
import Rules from "../screens/rules"
import SelectionDays from "../screens/selectionDays"
import SignUp from "../screens/signup"
import LeaderBoard from "../screens/leaderBoard"
import { widthPercentageToDP } from "react-native-responsive-screen"
import { isIphoneX } from 'react-native-iphone-x-helper'
import DashBoardHome from "../screens/dashBoard"
import Announcments from "../screens/announcements"
import MyPicks from "../screens/myPicks"
import DayPick from "../screens/dayPick"
import JoinWhatsApp from "../screens/joinWhatsApp"
import Prizes from "../screens/prizes"
import ChangePassword from "../screens/changePassword"
import AboutUs from "../screens/aboutUs"
import MemberShip from "../screens/membership"
import Notification from "../screens/notification"
import navigationStyle from "./style"
import BuyMemberShip from "../screens/buyMemberShip"
import PrivateGroupDetails from "../screens/privateGroupDetails"
import Consolation from "../screens/consolation"
import MyMembership from "../screens/myMembership"
import GroupLeaderBoard from "../screens/groupLeaderBoard"
import OtpVerification from "../screens/verificationOtp"
import LockedScreen from "../screens/lockedScreen"
import seasonLeaderBoard from "../screens/seasonLeaderBoard"
import Payment from "../screens/Payment"
import PaymentConfirmation from "../screens/paymentConfirmation"

//Stacks Of Screen To Navigate
const stack = createNativeStackNavigator()
const bottomTab = createBottomTabNavigator()

// Stack Inside DashBoard
const StackInstideDashBoard = () => {
    return (
        <stack.Navigator initialRouteName="DashBoard">
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="DashBoard" component={DashBoardHome} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Announcements" component={Announcments} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="SelectionDays" component={SelectionDays} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="MyPicks" component={MyPicks} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="JoinWhatsApp" component={JoinWhatsApp} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Prizes" component={Prizes} />
            <stack.Screen options={{ headerShown: false }} name="Consolation" component={Consolation} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Notification" component={Notification} />
            <stack.Screen options={{ headerShown: false,orientation:'all' }} name="GroupLeaderBoard" component={GroupLeaderBoard} />
            <stack.Screen options={{ headerShown: false,orientation:'all' }} name="Leaderboard" component={LeaderBoard} />
        </stack.Navigator>
    )
}

//Stack inside Selection Day Tab
const StackInstideSelectionDay = () => {
    return (
        <stack.Navigator initialRouteName="SelectionDays">
            <stack.Screen options={{ headerShown: false }} name="SelectionDays" component={SelectionDays} />
            <stack.Screen options={{ headerShown: false }} name="DayPick" component={DayPick} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Notification" component={Notification} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="LockedScreen" component={LockedScreen} />
        </stack.Navigator>
    )
}

//Stack inside Leaderboard Tab
const StackInstideLeaderboard = () => {
    return (
        <stack.Navigator initialRouteName="LeaderBoard">
            <stack.Screen options={{ headerShown: false,orientation:'all' }} name="Consolation" component={Consolation} />
            <stack.Screen options={{ headerShown: false,orientation:'all' }} name="GroupLeaderBoard" component={GroupLeaderBoard} />
            <stack.Screen options={{ headerShown: false,orientation:'all' }} name="LeaderBoard" component={LeaderBoard} />
            <stack.Screen options={{ headerShown: false,orientation:'all' }} name="seasonLeaderBoard" component={seasonLeaderBoard} />
        </stack.Navigator>
    )
}


//Stack Inside Account Tab
const StackInsideAccount = () => {
    return (
        <stack.Navigator initialRouteName="Account">
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Account" component={Account} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="ChangePassword" component={ChangePassword} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="AboutUs" component={AboutUs} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="MemberShip" component={MemberShip} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="MyMembership" component={MyMembership} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Notification" component={Notification} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="PrivateGroupDetails" component={PrivateGroupDetails} />
        </stack.Navigator>
    )
}

//Stack Inside Rules
const StackInsideRules = () => {
    return (
        <stack.Navigator initialRouteName="Rules">
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Rules" component={Rules} />
            <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Notifications" component={Notification} />
        </stack.Navigator>
    )
}

//Bottom Tab Used For Bottom Navigation
const BottomTab = ({ navigation }) => {
    return (
        <>
            <bottomTab.Navigator
                screenOptions={{ tabBarHideOnKeyboard: true, tabBarShowLabel: false, tabBarStyle: { height: isIphoneX() ? widthPercentageToDP(22) : widthPercentageToDP(15) } }}
                initialRouteName="Dashboard">
                <bottomTab.Screen
                    options={{
                        headerShown: false, tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{paddingVertical:20}}>
                                    <Image
                                        source={constants.icons.home}
                                        resizeMode='contain'
                                        style={{
                                            tintColor: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            alignSelf: 'center',
                                            height: widthPercentageToDP(7),
                                            width: widthPercentageToDP(7)
                                        }}
                                    />
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 10,
                                            color: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            fontWeight: '600',
                                            textAlign: 'center'
                                        }}>
                                        Home
                                    </Text>
                                </View>
                            )
                        }
                    }}
                    name="Dashboard"
                    component={StackInstideDashBoard} />
                <bottomTab.Screen
                    options={{
                        headerShown: false, tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{paddingVertical:20}}>
                                    <Image
                                        source={constants.icons.selectionDays}
                                        resizeMode='contain'
                                        style={{
                                            tintColor: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            alignSelf: 'center',
                                            height: widthPercentageToDP(7),
                                            width: widthPercentageToDP(7)
                                        }}
                                    />
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 10,
                                            color: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            fontWeight: '600',
                                            textAlign: 'center',
                                        }}>
                                        Selection Days
                                    </Text>
                                </View>
                            )
                        }
                    }}
                    name="SelectionDays"
                    component={StackInstideSelectionDay} />
                <bottomTab.Screen
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ bottom: 18, left: 5 }}>
                                    <View style={navigationStyle.mainBackgroundView} >
                                        <View style={navigationStyle.imageView}>
                                            <Image
                                                resizeMode='contain'
                                                style={navigationStyle.img}
                                                source={constants.icons.tennisBall} />
                                        </View>
                                    </View>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 10,
                                            color: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            fontWeight: '600',
                                            textAlign: 'center',
                                        }}>
                                        Leaderboard
                                    </Text>
                                </View>
                            )
                        }
                    }}
                    name="GroupLeaderBoard"
                    component={StackInstideLeaderboard} />
                <bottomTab.Screen
                    options={{
                        headerShown: false, tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{paddingVertical:20}}>
                                    <Image
                                        source={constants.icons.rules}
                                        style={{
                                            tintColor: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            alignSelf: 'center',
                                            height: widthPercentageToDP(7),
                                            width: widthPercentageToDP(7)
                                        }}
                                        resizeMode='contain'
                                    />
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 10,
                                            color: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            fontWeight: '600',
                                            textAlign: 'center',
                                        }}>
                                        Rules
                                    </Text>
                                </View>
                            )
                        }
                    }}
                    name="Rules"
                    component={StackInsideRules} />
                <bottomTab.Screen
                    options={{
                        headerShown: false, tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{paddingVertical:20,marginLeft:-10}}>
                                    <Image
                                        source={constants.icons.account}
                                        style={{
                                            tintColor: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            alignSelf: 'center',
                                            height: widthPercentageToDP(7),
                                            width: widthPercentageToDP(7)

                                        }}
                                        resizeMode='contain'
                                    />
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 10,
                                            color: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            fontWeight: '600',
                                            textAlign: 'center',
                                        }}>
                                        Account
                                    </Text>
                                </View>
                            )
                        }
                    }}
                    name="Account"
                    component={StackInsideAccount} />
            </bottomTab.Navigator>
        </>
    )
}

//Navigation Before Authentication Or Say Login
export const RootNavigator = () => {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName="Login">
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Login" component={Login} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="SignUp" component={SignUp} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="ForgotPassword" component={ForgotPassword} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="BuyMemberShip" component={BuyMemberShip} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="ChangePassword" component={ChangePassword} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="OtpVerification" component={OtpVerification} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

//Navigation After Authentication Or Say Login
export const AuthNavigator = () => {
    return (
        <NavigationContainer >
            <stack.Navigator initialRouteName='Home'>
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Home" component={Home} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Dashboard" component={BottomTab} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="BuyMemberShip" component={BuyMemberShip} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="PrivateGroupDetails" component={PrivateGroupDetails} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="MemberShip" component={MemberShip} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="MyMembership" component={MyMembership} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Payment" component={Payment} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="PaymentConfirmation" component={PaymentConfirmation} />
            </stack.Navigator>
        </NavigationContainer >
    )
}

//Navigation After Authentication Or Say Login
export const RegisterFirstTime = () => {
    return (
        <NavigationContainer >
            <stack.Navigator initialRouteName='BuyMemberShip'>
                {/* <stack.Screen options={{ headerShown: false }} name="Home" component={Home} /> */}
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Dashboard" component={BottomTab} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="BuyMemberShip" component={BuyMemberShip} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="MyMembership" component={MyMembership} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="PrivateGroupDetails" component={PrivateGroupDetails} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="MemberShip" component={MemberShip} />
                <stack.Screen options={{ headerShown: false, orientation: 'portrait' }} name="Payment" component={Payment} />
            </stack.Navigator>
        </NavigationContainer >
    )
}