import "react-native-gesture-handler";
import React, { Component } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateUserAccount from "./CreateUserAccount.js";
import LoginUserAccount from "./LoginUserAccount.js";

const Tab = createBottomTabNavigator();

const localHost = "localhost";
const phoneIP = "192.168.1.24";

class NavigationTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      selectedUserId: 0,
    };
  }
  setLoggedIn = (value) => {
    this.setState({
      isLoggedIn: value,
    });
    console.log("setLoggedIn fucntion value:" + { isLoggedIn });
  };

  selectedUserId = (value) => {
    this.setState({
      selectedUserId: value,
    });
    console.log("selectedUserId fucntion value:" + { selectedUserId });
  };

  render() {
    console.log("Tab naviagor called");
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Login">
          <Tab.Screen
            name="Login"
            children={(props) => (
              <LoginPage
                {...props}
                userData={this.state}
                setLoggedIn={this.setLoggedIn}
                selectedUserId={this.selectedUserId}
              />
            )}
          />
          <Tab.Screen name="Signup" component={CreateUserAccount}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default NavigationTab;
