import "react-native-gesture-handler";

import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const localHost = "localhost";
const phoneIP = "192.168.1.24";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      first_name: "",
      last_name: "",
      email: "",
      password: "",

      token: "",
      accountID: 0,
      accountImage: "",
    };
  }
  componentDidMount() {
    this.accountDetails();
  }
  accountDetails = async () => {
    const accountID = await AsyncStorage.getItem("@id");
    const token = await AsyncStorage.getItem("@session_token");
    return fetch("http://" + localHost + ":3333/api/1.0.0/user/" + accountID, {
      headers: {
        "content-Type": "application/json",
        "X-Authorization": token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          alert(
            "Error: Refer to Spacebook server command line for more details "
          );
        }
      })
      .then((responseJSON) => {
        this.setState({
          email: responseJSON.email,
          first_name: responseJSON.first_name,
          last_name: responseJSON.last_name,
        });
      })
      .catch((test) => {
        console.log(test);
      });
  };
  accountDetailsUpdate = async () => {
    const accountID = await AsyncStorage.getItem("@id");
    const token = await AsyncStorage.getItem("@session_token");
    let userDetails = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };
    return fetch("http://" + localHost + ":3333/api/1.0.0/user/" + accountID, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("User Account details have been updated");
        } else {
          alert(
            "Error: Refer to Spacebook server command line for more details "
          );
        }
      })
      .catch((test) => {
        console.log(test);
      });
  };

  render() {
    return (
      <SafeAreaView>
        <Text>Change User Account Details</Text>
        <TextInput
          placeholder="First Name"
          onChangeText={(first_name) => this.setState({ first_name })}
          value={this.state.first_name}
        />
        <TextInput
          placeholder="Last Name"
          onChangeText={(last_name) => this.setState({ last_name })}
          value={this.state.last_name}
        />
        <TextInput
          placeholder="E-Mail address"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          //secureTextEntry={true}
        />
        <Button
          title="Change account details"
          onPress={() => this.accountDetailsUpdate()}
        />
      </SafeAreaView>
    );
  }
}

export default HomePage;
