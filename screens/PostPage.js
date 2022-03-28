import "react-native-gesture-handler";

import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const localHost = "localhost";
const phoneIP = "192.168.1.24";

class VisiblePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      user_post_ID: 0,
      userPostText: [],
    };
  }
  getAccountID = async () => {
    const test = AsyncStorage.getItem("@id");
    console.log(test);
    await AsyncStorage.getItem("@id")
      .then((data) => this.setState({ userAccountID: data }))
      .catch((error) => console.log(error));
  };
  getAccountToken = async () => {
    await AsyncStorage.getItem("@session_token")
      .then((data) => this.setState({ token: data }))
      .catch((error) => console.log(error));
  };
  async componentDidMount() {
    await this.getAccountID();
    await this.getAccountToken();
    await this.getUserPosts();
  }
  //GET all of the users posts
  getUserPosts = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const accountID = await AsyncStorage.getItem("@id");
    console.log(token, accountID);
    this.setState({ userPostText: [] });
    return fetch(
      "http://" +
        localHost +
        ":3333/api/1.0.0/user/" +
        this.props.accountInfo.accountID +
        "/post",
      {
        method: "GET",
        headers: { "X-Authorization": token },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("SIUUUU");
        } else {
          alert(
            "Error: Refer to Spacebook server command line for more details "
          );
        }
      })
      .then((responseJson) => this.setState({ userPostText: responseJson }))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <SafeAreaView>
        <Text>Testing Page</Text>
      </SafeAreaView>
    );
  }
}
export default VisiblePosts;
