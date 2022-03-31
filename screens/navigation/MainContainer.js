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
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import { PropTypes } from "react";

import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import CreateUserScreen from "../UserCreationScreen";
import LoginUserScreen from "../LoginUserAccount";
import HomeScreen from "../HomePage.js";
import PostPage from "../PostPage.js";
import FriendPage from "../FriendPage.js";
// import SettingsScreen from "./screens/SettingsScreen";

const userName = "Create User";
const loginName = "Login User";
const homeName = "Home Page";
const postName = "Post Page";
const friendName = "Friend Page";
// const settingsName = "Settings";

const Tab = createBottomTabNavigator();

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountID: 0,
      // Always set at false when starting
      userSignedIn: true,
    };
  }
  accountID = (id) => {
    this.setState({
      accountID: id,
    });
  };
  userSignedIn = (bool) => {
    this.setState({
      userSignedIn: bool,
    });
  };

  render() {
    return (
      <NavigationContainer>
        {/* Easy method to determine screen flow if user is not logged in, log in & create user screen will be displayed */}
        {this.state.userSignedIn === true ? (
          <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === homeName) {
                  iconName = focused ? "home" : "home-outline";
                } else if (rn === postName) {
                  iconName = focused ? "add-circle" : "add-circle-outline";
                } else if (rn === friendName) {
                  iconName = focused ? "person-add" : "person-add-outline";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: "red",
              inactiveTintColor: "grey",
              labelStyle: { paddingBottom: 4, fontSize: 15 },
              style: { Top: 10, height: 200 },
            }}
          >
            <Tab.Screen
              name={homeName}
              children={(props) => (
                <HomeScreen
                  {...props}
                  accountID={this.accountID}
                  accountInfo={this.state}
                  userSignedIn={this.userSignedIn}
                />
              )}
            />
            <Tab.Screen
              name={friendName}
              children={(props) => (
                <FriendPage
                  {...props}
                  accountID={this.accountID}
                  accountInfo={this.state}
                  userSignedIn={this.userSignedIn}
                />
              )}
            />

            <Tab.Screen
              name={postName}
              children={(props) => (
                <PostPage
                  {...props}
                  accountID={this.accountID}
                  accountInfo={this.state}
                />
              )}
            />
          </Tab.Navigator>
        ) : (
          <Tab.Navigator
            initialRouteName={userName}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let rn = route.name;

                if (rn === userName) {
                  iconName = focused ? "create" : "create-outline";
                } else if (rn === loginName) {
                  iconName = focused ? "log-in" : "log-in-outline";
                }
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
            <Tab.Screen
              name={loginName}
              children={(props) => (
                <LoginUserScreen
                  {...props}
                  accountID={this.accountID}
                  accountInfo={this.state}
                  userSignedIn={this.userSignedIn}
                />
              )}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

export default MainContainer;
