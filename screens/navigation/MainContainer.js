import "react-native-gesture-handler";

import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import CreateUserScreen from "../UserCreationScreen";
import LoginUserScreen from "../LoginUserAccount";
// import SettingsScreen from "./screens/SettingsScreen";

const userName = "Create User";
const loginName = "Login User";
// const settingsName = "Settings";

const Tab = createBottomTabNavigator();

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userAccountID: 0,
      userSignedIn: false,
    };
  }
  accountID = (id) => {
    this.setState({
      userAccountID: id,
    });
  };
  userSignedIn = (bool) => {
    this.setState({
      userSignedIn: bool,
    });
    console.log("setLoggedIn fucntion value:" + { isLoggedIn });
  };

  render() {
    return (
      <NavigationContainer>
        {/* Easy method to determine screen flow if user is not logged in, log in & create user screen will be displayed */}
        {this.state.userSignedIn === true ? (
          <Tab.Navigator
            initialRouteName={userName}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === userName) {
                  iconName = focused
                    ? "arrow-up-circle"
                    : "arrow-up-circle-outline";
                } else if (rn === loginName) {
                  iconName = focused ? "list" : "list-outline";
                } // else if (rn === settingsName) {
                //   iconName = focused ? "settings" : "settings-outline";
                // }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "grey",
              labelStyle: { paddingBottom: 4, fontSize: 15 },
              style: { padding: 10, height: 90 },
            }}
          >
            <Tab.Screen name={userName} component={CreateUserScreen} />
            <Tab.Screen name={loginName} component={LoginUserScreen} />
          </Tab.Navigator>
        ) : (
          <Tab.Navigator
            initialRouteName={userName}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === userName) {
                  iconName = focused ? "home" : "home-outline";
                } else if (rn === loginName) {
                  iconName = focused ? "list" : "list-outline";
                } // else if (rn === settingsName) {
                //   iconName = focused ? "settings" : "settings-outline";
                // }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: "tomato",
              inactiveTintColor: "grey",
              labelStyle: { paddingBottom: 4, fontSize: 15 },
              style: { padding: 10, height: 90 },
            }}
          >
            <Tab.Screen name={userName} component={CreateUserScreen} />
            <Tab.Screen name={loginName} component={LoginUserScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
      // Return bracket
    );
  }
}

export default MainContainer;
