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

//Stacks Of Screen To Navigate
const stack = createNativeStackNavigator()
const bottomTab = createBottomTabNavigator()

// Stack Inside DashBoard
const StackInstideDashBoard = () => {
    return (
        <stack.Navigator initialRouteName="DashBoard">
            <stack.Screen options={{ headerShown: false }} name="DashBoard" component={DashBoardHome} />
            <stack.Screen options={{ headerShown: false }} name="Announcements" component={Announcments} />
            <stack.Screen options={{ headerShown: false }} name="SelectionDays" component={SelectionDays} />
            <stack.Screen options={{ headerShown: false }} name="MyPicks" component={MyPicks} />
            <stack.Screen options={{ headerShown: false }} name="JoinWhatsApp" component={JoinWhatsApp} />
            <stack.Screen options={{ headerShown: false }} name="Prizes" component={Prizes} />
        </stack.Navigator>
    )
}

//Stack inside Selection Day Tab
const StackInstideSelectionDay = () => {
    return (
        <stack.Navigator initialRouteName="SelectionDays">
            <stack.Screen options={{ headerShown: false }} name="SelectionDays" component={SelectionDays} /> 
            <stack.Screen options={{ headerShown: false }} name="DayPick" component={DayPick} />
        </stack.Navigator>
    )
}

//Stack Inside Account Tab
const StackInsideAccount = () => {
    return (
        <stack.Navigator initialRouteName="Account">
            <stack.Screen options={{ headerShown: false }} name="Account" component={Account} /> 
            <stack.Screen options={{ headerShown: false }} name="ChangePassword" component={ChangePassword} />
            <stack.Screen options={{ headerShown: false }} name="AboutUs" component={AboutUs} />
            <stack.Screen options={{ headerShown: false }} name="MemberShip" component={MemberShip} />
            <stack.Screen options={{ headerShown: false }} name="BuyMemberShip" component={BuyMemberShip} />
            <stack.Screen options={{ headerShown: false }} name="Notification" component={Notification} />
            <stack.Screen options={{ headerShown: false }} name="PrivateGroupDetails" component={PrivateGroupDetails} />
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
                                <View>
                                    <Image
                                        source={constants.icons.home}
                                        resizeMode='contain'
                                        style={{
                                            tintColor: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            alignSelf: 'center'
                                        }}
                                    />
                                    <Text
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
                                <View>
                                    <Image
                                        source={constants.icons.selectionDays}
                                        resizeMode='contain'
                                        style={{
                                            tintColor: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            alignSelf: 'center'
                                        }}
                                    />
                                    <Text
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
                    name="LeaderBoard"
                    component={LeaderBoard} />
                <bottomTab.Screen
                    options={{
                        headerShown: false, tabBarIcon: ({ focused }) => {
                            return (
                                <View>
                                    <Image
                                        source={constants.icons.rules}
                                        style={{
                                            tintColor: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            alignSelf: 'center'
                                        }}
                                        resizeMode='contain'
                                    />
                                    <Text
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
                    component={Rules} />
                <bottomTab.Screen
                    options={{
                        headerShown: false, tabBarIcon: ({ focused }) => {
                            return (
                                <View style={{ left: -10 }}>
                                    <Image
                                        source={constants.icons.account}
                                        style={{
                                            tintColor: focused ? constants.colors.darkGreen : constants.colors.bottomTabLight,
                                            alignSelf: 'center'
                                        }}
                                        resizeMode='contain'
                                    />
                                    <Text
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
                <stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                <stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
                <stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
            </stack.Navigator>
        </NavigationContainer>
    )
}

//Navigation After Authentication Or Say Login
export const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <stack.Navigator initialRouteName="Home">
                <stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                <stack.Screen options={{ headerShown: false }} name="Dashboard" component={BottomTab} />
            </stack.Navigator>
        </NavigationContainer >
    )
}