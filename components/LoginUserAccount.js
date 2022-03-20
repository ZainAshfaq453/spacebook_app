import "react-native-gesture-handler";

import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

/*
class loginUserAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //isLoading: true,

      email: "",
      password: "",
      token: "",
    };
  }
}

export default loginUserAccount;
*/
