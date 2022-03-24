import "react-native-gesture-handler";

import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { StackRouter } from "react-navigation";
// import { Alert } from "react-native-web";

//import CreateUserAccount from "./components/CreateUserAccount.js";
//import HomeScreen from "./screens/StackNavigator.js";

import MainContainer from "./screens/navigation/MainContainer";

function App() {
  return <MainContainer> </MainContainer>;
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
