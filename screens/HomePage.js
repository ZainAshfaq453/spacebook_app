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

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userPost: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",

      token: "",
      userAccountID: 0,
      accountImage: "",
    };
  }
  // componentDidMount() {
  //   this.accountDetails();
  // }
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
  userSignedIn = (bool) => {
    this.setState({
      userSignedIn: bool,
    });
  };
  getAccountImage = async () => {
    const accountID = await AsyncStorage.getItem("@id");
    const token = await AsyncStorage.getItem("@session_token");
    console.log("This is userAccountImage token" + token);
    console.log("This is state token" + this.state.token);
    return fetch(
      "http://127.0.0.1:3333/api/1.0.0/user/" + accountID + "/photo",
      {
        method: "GET",
        headers: { "X-Authorization": this.state.token },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("Image has been loaded");
          return response.blob();
        } else {
          alert("Image not loaded");
        }
      })
      .then((blob) =>
        this.setState({ accountImage: URL.createObjectURL(blob) })
      )
      .catch((error) => console.log(error));
  };

  async componentDidMount() {
    await this.getAccountID();
    await this.getAccountToken();
    await this.getAccountImage();
    await this.accountDetails();
  }
  //Get user information
  accountDetails = async () => {
    const accountID = await AsyncStorage.getItem("@id");
    const token = await AsyncStorage.getItem("@session_token");
    console.log("This is userAccountImage token" + token);
    console.log("This is state token" + this.state.token);
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
  // change account details endpoint
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
  // add a new post
  accountPost = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const accountID = await AsyncStorage.getItem("@id");
    console.log("Steve " + token);
    console.log("Steve " + accountID);
    return fetch(
      "http://localhost:3333/api/1.0.0/user/" + accountID + "/post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
        body: JSON.stringify({
          text: this.state.userPost,
        }),
      }
    )
      .then((response) => {
        console.log("User post account ID is" + this.state.accountID);
        if (response.status === 201) {
          alert("Post has been made");
          console.log("SIUUUU");
        } else {
          alert(
            "Error: Refer to Spacebook server command line for more details "
          );
        }
      })
      .catch((error) => console.log(error));
  };
  // logout endpint
  userAccountLogout = async () => {
    const tok = AsyncStorage.getItem("@session_token");
    console.log(tok);
    await AsyncStorage.getItem("@session_token")
      .then((data) => this.setState({ token: data }))
      .catch((error) => console.log(error));
    return fetch("http://localhost:3333/api/1.0.0/logout", {
      method: "POST",
      headers: { "X-Authorization": this.state.token },
    })
      .then(async (response) => {
        if (response.status === 200) {
          alert("You have successfully logged out");
          await AsyncStorage.removeItem("@session_token")
            .then((data) => this.userSignedIn(false))
            .catch((error) => console.log(error));
        } else {
          alert(
            "Error: Refer to Spacebook server command line for more details "
          );
        }
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <SafeAreaView>
        <View>
          <Image
            style={{
              // flex: 1,
              resizeMode: "contain",
              height: 50,
              width: 50,
            }}
            source={{ uri: this.state.accountImage }}
          />
        </View>
        <Button title="Change account profile pic" />

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
        <Button
          title="testing alert"
          onPress={() => alert("You have clicked test button")}
        />
        <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder="Create a new post"
          style={styles.postBox}
          ref={(val) => {
            this.userPost = val;
          }}
          onChangeText={(userPost) => this.setState({ userPost })}
          value={this.state.userPost}
        />
        <Button
          title="Submit your post"
          onPress={() => this.accountPost(this.state.accountID)}
        />

        <Text>Sign Ouaaat</Text>
        <Button
          title="logout"
          onPress={() => {
            this.userAccountLogout();
          }}
        />

        <Text>Post</Text>
        {/* </TouchableOpacity> */}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  postBox: {
    padding: 10,
    borderWidth: 3,
    margin: 5,
    borderColor: "green",
  },
});

export default HomePage;
