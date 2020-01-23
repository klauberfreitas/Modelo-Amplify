import React from "react";

import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Ionicons } from "@expo/vector-icons";

// Auth stack screen imports
import AuthLoadingScreen from "../screens/auth/AuthLoadingScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import SignInScreen from "../screens/auth/SignInScreen";
import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen";
import NewPasswordScreen from "../screens/auth/NewPasswordScreen";

// App stack screen imports
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Amplify imports and config
import Amplify from "@aws-amplify/core";
import config from "../aws-exports";
Amplify.configure(config);

const AuthStack = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    SignUp: SignUpScreen,
    SignIn: SignInScreen,
    ForgetPassword: ForgetPasswordScreen,
    NewPassword: NewPasswordScreen
  },
  {
    headerMode: "screen",
    headerLayoutPreset: "left"
  }
);

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  Settings: { screen: SettingsScreen }
});

const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen }
});

const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
  Profile: { screen: ProfileScreen },
  ForgetPassword: { screen: ForgetPasswordScreen }
});

// Configurações do AppTabNavigator | Ícones, tamanho, cores
const configurations = {
  Home: {
    screen: HomeStack,
    tabBarLabel: "Home",
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Ionicons style={{ fontSize: 26, color: tintColor }} name="ios-home" />
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          style={{ fontSize: 26, color: tintColor }}
          name="ios-person"
        />
      )
    }
  },
  Settings: {
    screen: SettingsStack,
    navigationOptions: {
      tabBarLabel: "Settings",
      tabBarIcon: ({ tintColor }) => (
        <Ionicons
          style={{ fontSize: 26, color: tintColor }}
          name="ios-settings"
        />
      )
    }
  }
};

const options = {
  tabBarPosition: "bottom",
  swipeEnabled: true,
  animationEnabled: true,
  navigationOptions: {
    tabBarVisible: true
  },
  tabBarOptions: {
    showLabel: false,
    activeTintColor: "#fff",
    headerTintColor: "#000",
    inactiveTintColor: "rgba(255,255,255,0.3)",
    style: {
      backgroundColor: "#161616",
      height: 50,
      borderTopWidth: 0,
      borderTopColor: "#D3D3D3"
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: "bold",
      marginBottom: 6
      //marginTop: 12
    },
    indicatorStyle: {
      height: 0
    },
    showIcon: true
  }
};

// Menu inferior do aplicativo (BottomTabNavigator)
const AppTabNavigator = createBottomTabNavigator(configurations, options);
export default createSwitchNavigator(
  {
    Authloading: AuthLoadingScreen, //Tela de carregamento
    Auth: AuthStack, //Telas de autenticação
    App: AppTabNavigator //Telas do aplicativo após autenticação
  },
  {
    initialRouteName: "Authloading" //Rota inicial
  }
);
