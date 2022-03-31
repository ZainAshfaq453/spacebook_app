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
  FlatList,
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
      postMessage: "",
      accountID: 0,
      first_name: "",
      last_name: "",
      email: "",
      user_post_ID: 0,
      userPostText: [],
      Likes: 0,
      Time: "",
      Text: "",
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
    await this.getSelectedtUserPosts();
    await this.getPostList();
    await this.deleteSelectedPost();
  }
  getPostList = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const accountID = await AsyncStorage.getItem("@id");

    const link =
      "http://" + localHost + ":3333/api/1.0.0/user/" + accountID + "/post";
    return fetch(link, {
      headers: {
        "X-Authorization": token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log(response.status);
          throw "Something went wrong";
        }
      })
      .then((responseJson) => {
        this.setState({ userPostText: responseJson });
        console.log("post array: ", responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //GET selected users posts
  getSelectedtUserPosts = async () => {
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
          return response.json();
        } else {
          alert(
            "Error: Refer to Spacebook server command line for more details "
          );
        }
      })
      .then(
        (responseJson) =>
          this.setState({
            userPostText: responseJson,
            first_name: responseJson,
            last_name: responseJson,
            likes: responseJson,
            Time: responseJson.timestamp,
            Text: responseJson,
          }),
        console.log("testing get post time" + this.state.Time)
      )
      .catch((error) => console.log(error));
  };
  //DELETE user post
  deleteSelectedPost = async (userID, postID) => {
    const token = await AsyncStorage.getItem("@session_token");
    const accountID = await AsyncStorage.getItem("@id");

    return fetch(
      "http://" +
        localHost +
        ":3333/api/1.0.0/user/" +
        userID +
        "/post/" +
        postID,
      {
        method: "delete",
        headers: {
          "X-Authorization": token,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          alert("Post has been deleted, please refresh the page");
          this.setState({
            accountID: 0,
            first_name: "",
            last_name: "",

            Likes: 0,
            Time: "",
            Text: "",
          });
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };
  // PATCH user post
  updateAccountPost = async (postID, msg) => {
    const token = await AsyncStorage.getItem("@session_token");
    const accountID = await AsyncStorage.getItem("@id");
    var url =
      "http://" +
      localHost +
      ":3333/api/1.0.0/user/" +
      accountID +
      "/post/" +
      postID;
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": token,
      },
      body: JSON.stringify({
        text: msg,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Post has been made")
        }  else {
          alert("ERROR: Check spacebook api command line for more details" )
        }
      })
      .then((resp) => {
        console.log(resp);
        this.getPosts();
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <SafeAreaView>
        <Text>Testing Page: {this.state.Time}</Text>
        <FlatList
          data={this.state.userPostText}
          renderItem={({ item }) => (
            <View>
              <Text>
                Name: {item.author.first_name} ,Post ID {item.post_id},
              </Text>
              <Text>Text:{item.text}</Text>
              <Text>
                User Account ID: {item.author.user_id}, Likes: {item.numLikes}
              </Text>
              <Text>Time Stamp:{item.timestamp}</Text>
              <Button
                title="Refresh Posts"
                onPress={() =>
                  this.getSelectedtUserPosts(item.author.user_id, item.post_id)
                }
              />
              <Button
                title="Delete Post Above"
                onPress={() =>
                  this.deleteSelectedPost(item.author.user_id, item.post_id)
                }
              />
              <TextInput
                multiline={true}
                numberOfLines={5}
                placeholder="Edit Post"
                style={styles.multiline}
                onChangeText={(text) => {
                  this.setState({ postMessage: text });
                }}
                value={this.state.postMessage}
              />

              <Button
                title="update post above"
                onPress={() =>
                  this.updateAccountPost(item.post_id, this.state.postMessage)
                }
              />
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  multiline: {
    borderWidth: 0.5,
    borderColor: "green",
    padding: 2,
    marginVertical: 5,
  },
});
export default VisiblePosts;
