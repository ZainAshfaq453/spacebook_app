import "react-native-gesture-handler";
import React, { Component } from "react";

import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableHighlight,
} from "react-native";
import { FlatList, Switch } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getASyncData = async (itemName) => {
  try {
    const polo = await AsyncStorage.getItem(itemName);
    if (polo !== null) {
      return polo;
    }
  } catch (a) {}
};

class userFriendPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 0,
      userFriendID: 0,
      friendArray: [],
      arrayOfFriendRequests: [],
      arraySearch: [],
      textSearch: "",
      search_in: "all",
      searchLimt: 0,
      offset: 0,
    };
  }

  componentDidMount() {
    console.log("component mounted");
    getASyncData("@id")
      .then((tok) => this.setState({ userID: parseInt(tok) }))
      .then(() => {
        this.getUserFriendList();
        this.getRequests();
      });
  }
  //GET friend list endpoint
  getUserFriendList = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const accountID = await AsyncStorage.getItem("@id");

    return fetch(
      "http://localhost:3333/api/1.0.0/user/" + accountID + "/friends",
      {
        headers: {
          "X-Authorization": token,
        },
      }
    )
      .then((resp) => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          console.log(resp.status);
          alert("User friend list fault");
        }
      })
      .then((respJson) => {
        this.setState({ friendArray: respJson });
      })
      .catch((fault) => {
        console.log(fault);
      });
  };

  //GET all outstanding friend requests

  getRequests = async () => {
    const token = await AsyncStorage.getItem("@session_token");

    return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
      headers: {
        "X-Authorization": token,
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((responseJson) => {
        this.setState({ arrayOfFriendRequests: responseJson });
      })
      .catch((fault) => {
        console.log(fault);
      });
  };

  render() {
    return (
      <SafeAreaView>
        <Text>Testing 1234</Text>
      </SafeAreaView>
    );
  }
}

class Screen extends Component {
  render() {
    return (
      <View>
        <userFriendPage></userFriendPage>
      </View>
    );
  }
}

export default Screen;
