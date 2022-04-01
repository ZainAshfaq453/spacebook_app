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

  // GET a users profile pic

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
  //PATCH change account details endpoint
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
  // POST add a new post
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
  // POST logout endpint
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
        <View style={styles.container}>
          <Image
            style={{
              // resizeMode: "contain",
              height: 150,
              width: 150,
            }}
            source={{ uri: this.state.accountImage }}
          />
        </View>
        <View style={styles.textBox}>
          <Text>Change User Account Details</Text>
          <TextInput
            style={styles.box}
            placeholder="First Name"
            onChangeText={(first_name) => this.setState({ first_name })}
            value={this.state.first_name}
          />
          <TextInput
            style={styles.box}
            placeholder="Last Name"
            onChangeText={(last_name) => this.setState({ last_name })}
            value={this.state.last_name}
          />
          <TextInput
            style={styles.box}
            placeholder="E-Mail address"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.box}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            //secureTextEntry={true}
          />
          <Button
            title="Change account details"
            onPress={() => this.accountDetailsUpdate()}
          />
        </View>

        <TextInput
          multiline={true}
          numberOfLines={5}
          placeholder="Create a new spacebook post"
          style={styles.postBox}
          ref={(val) => {
            this.userPost = val;
          }}
          onChangeText={(userPost) => this.setState({ userPost })}
          value={this.state.userPost}
        />

        <Button
          title="Submit your post"
          color="green"
          onPress={() => this.accountPost(this.state.accountID)}
        />

        <Button
          title="logout"
          color="red"
          onPress={() => {
            this.userAccountLogout();
          }}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  postBox: {
    padding: 0.5,
    borderWidth: 1,
    margin: 5,
    borderColor: "green",
  },
  box: { borderWidth: 0.75, padding: 5, marginBottom: 2 },
  textBox: {
    flex: 1,

    // alignItems: "center",
    justifyContent: "center",

    padding: 15,
    margin: 5,
  },
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    padding: 15,
    margin: 5,
  },
});

export default HomePage;
