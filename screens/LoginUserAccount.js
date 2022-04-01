import React, { Component, useState, useContext } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  SafeAreaView,
} from "react-native";

import AsyncStorge from "@react-native-async-storage/async-storage";
const localHost = "localhost";
const phoneIP = "192.168.1.24";

class UserLogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      token: "",
      email: "",
      password: "",
    };
  }

  // POST ALLOW A USER TO LOGIN
  userAccountLogin = async () => {
    console.log("login function called");
    return fetch("http://" + localHost + ":3333/api/1.0.0/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          return response.json();
        } else {
          alert(
            "Error: Refer to Spacebook server command line for more details "
          );
        }
      })
      .then(async (responseJSON) => {
        this.setState({ token: responseJSON.token });

        await AsyncStorge.setItem("@session_token", responseJSON.token).catch(
          (error) => {
            console.log(error);
            return;
          }
        );
        await AsyncStorge.setItem("@id", JSON.stringify(responseJSON.id)).catch(
          (error) => {
            console.log(error);
            return;
          }
        );

        //changes values in MainContainer constructor once auth has been successful

        this.props.accountID(responseJSON.id);
        this.props.userSignedIn(true);

        const test = this.props.accountID(responseJSON.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log("login page has been reached");
    return (
      <SafeAreaView>
        <TextInput
          style={styles.box}
          placeholder="Enter E-Mail"
          onChangeText={(email) => this.setState({ email: email })}
        />
        <TextInput
          style={styles.box}
          placeholder="Enter Password"
          onChangeText={(password) => this.setState({ password: password })}
          secureTextEntry={true}
        />
        <Button
          title="Login"
          color="green"
          login={this.userAccountLogin}
          onPress={this.userAccountLogin}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  box: { borderWidth: 0.75, padding: 5, marginBottom: 2 },
});

export default UserLogInScreen;
