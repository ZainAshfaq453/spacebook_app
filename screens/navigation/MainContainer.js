import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import CreateUserScreen from "../UserCreationScreen";
import LoginUserScreen from "../LoginUserAccount";
// import SettingsScreen from "./screens/SettingsScreen";

//Screen names
const userName = "Create User";
const loginName = "Login User";
// const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={userName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === userName) {
              iconName = focused ? "arrow-up-circle" : "home-outline";
            } else if (rn === loginName) {
              iconName = focused ? "list" : "list-outline";
            } // else if (rn === settingsName) {
            //   iconName = focused ? "settings" : "settings-outline";
            // }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 4, fontSize: 15 },
          style: { padding: 10, height: 90 },
        }}
      >
        <Tab.Screen name={userName} component={CreateUserScreen} />
        <Tab.Screen name={loginName} component={LoginUserScreen} />
        {/* <Tab.Screen name={detailsName} component={DetailsScreen} />
        <Tab.Screen name={settingsName} component={SettingsScreen} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
