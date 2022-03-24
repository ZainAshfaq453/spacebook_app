import React, { Component, useState, useContext } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";

import AsyncStorge from "@react-native-async-storage/async-storage";

class UserLogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      email: "",
      password: "",
    };
  }

  userAccountLogin = async () => {
    console.log("login function called");
    return fetch("http://192.168.1.24:3333/api/1.0.0/login", {
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
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          throw "Invalid email or password, please try again!";
        } else if (response.status === 500) {
          throw "Server error!";
        } else {
          throw "Error, please try again!";
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

        this.props.setLoggedIn(true);
        this.props.selectedUserId(responseJSON.id);
        test = this.props.selectedUserId(responseJSON.id);
        console.log("Login page info" + { test });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    console.log("login page has been reached");
    return (
      <View>
        <TextInput
          placeholder="E-Mail"
          onChangeText={(email) => this.setState({ email: email })}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => this.setState({ password: password })}
          secureTextEntry={true}
        />
        <Button
          title="Login"
          login={this.userAccountLogin}
          onPress={this.login}
        />
        <Text>Not Got An Account? Sign Up Above!</Text>
      </View>
    );
  }
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "top",
//     paddingTop: 20,
//     borderWidth: 0,
//     borderColor: "black",
//   },
//   instructions: {
//     color: "#888",
//     fontSize: 18,
//     marginHorizontal: 15,
//     marginBottom: 10,
//   },
//   text: {
//     fontSize: 15,
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "#4267B2",
//     paddingTop: 30,
//   },
//   button: {
//     backgroundColor: "#4267B2",
//     padding: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 20,
//     color: "#fff",
//   },
//   input: {
//     fontSize: 20,
//     color: "#fff",
//   },
// });

export default UserLogInScreen;
