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
  } catch (e) {}
  console.log(value);
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
  // buttonPress = () => {
  //   console.log("button as been pressed");
  //   Alert.alert("button has been pressed");
  // };

  //POST Add a new user
  addUser = () => {
    let to_send = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };

    return fetch("http://" + localHost + ":3333/api/1.0.0/user", {
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
        console.log(response);
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
          style={styles.box}
          placeholder="Enter first name"
          onChangeText={(first_name) => this.setState({ first_name })}
          value={this.state.first_name}
        />
        <TextInput
          style={styles.box}
          placeholder="Enter surname"
          onChangeText={(last_name) => this.setState({ last_name })}
          value={this.state.last_name}
        />
        <TextInput
          style={styles.box}
          placeholder="Enter email"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.box}
          placeholder="Enter password."
          // secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Add" onPress={this.addUser} color="green" />

        {/* <Text>{this.state.first_name}</Text>
        <Text>{this.state.last_name}</Text>
        <Text>{this.state.email}</Text>
      <Text>{this.state.password}</Text> */}
      </SafeAreaView>
    );
  }
}

class Screen extends Component {
  render() {
    return (
      <View>
        <CreateUserAccount></CreateUserAccount>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  box: { borderWidth: 0.75, padding: 5, marginBottom: 2 },
});

export default Screen;
