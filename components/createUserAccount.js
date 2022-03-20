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

const localHost = "localhost";
const phoneIP = "192.168.1.24";

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem("@storage_Key", value);
  } catch (e) {
    // saving error
  }
  console.log(value);
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("@storage_Key");
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};
class CreateUserAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,

      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  }
  buttonPress = () => {
    console.log("button as been pressed");
    Alert.alert("button has been pressed");
  };
  addUser = () => {
    Alert.alert("button press");
    let to_send = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };
    //console.log(to_send);
    //console.log(JSON.stringify(to_send))

    return fetch("http://" + phoneIP + ":3333/api/1.0.0/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(to_send),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        storeData(responseJson.token);
      })
      .then((response) => {
        Alert.alert("User account added");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <SafeAreaView>
        <Text>Create A User Account</Text>

        <TextInput
          placeholder="Enter first name"
          onChangeText={(first_name) => this.setState({ first_name })}
          value={this.state.first_name}
        />
        <TextInput
          placeholder="Enter surname"
          onChangeText={(last_name) => this.setState({ last_name })}
          value={this.state.last_name}
        />
        <TextInput
          placeholder="Enter email"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="Enter password."
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Add" onPress={this.addUser} />

        <Text>{this.state.first_name}</Text>
        <Text>{this.state.last_name}</Text>
        <Text>{this.state.email}</Text>
        <Text>{this.state.password}</Text>
      </SafeAreaView>
    );
  }
}

export default CreateUserAccount;
