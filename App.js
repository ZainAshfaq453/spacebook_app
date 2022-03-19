import "react-native-gesture-handler";

import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CreateUserAccount from "./components/createUserAccount.js";

//const Stack = createStackNavigator;
class App extends Component {
  render() {
    return (
      <SafeAreaView>
        <Text>Testing</Text>
        <CreateUserAccount></CreateUserAccount>
      </SafeAreaView>
    );
  }
}

export default App;
/*
export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>testing for update in github</Text>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
  },
});
*/
