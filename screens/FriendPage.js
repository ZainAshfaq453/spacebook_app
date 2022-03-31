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

const asyncGetData = async (itemName) => {
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
      search_in: "all",
      textSearch: "",
      arraySearch: [],
      searchLimt: 0,
      offset: 0,
    };
  }

  componentDidMount() {
    console.log("componentDidMount function called");
    asyncGetData("@id")
      .then((tok) => this.setState({ userID: parseInt(tok) }))
      .then(() => {
        this.getUserFriendList();
        this.getRequests();
      });
  }

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

  getSearchUsers = async () => {
    const token = await AsyncStorage.getItem("@session_token");
    const textSearch = this.state.textSearch;
    const maxSearchLimit = this.state.searchLimt;
    const search_in = this.state.search_in;
    const offset = this.state.offset;
    textSearch.replace(" ", "%");

    return fetch(
      "http://localhost:3333/api/1.0.0/search?q=" +
        textSearch +
        "&search_in=" +
        search_in +
        "&limit=" +
        maxSearchLimit +
        "&offset=" +
        offset,
      {
        headers: {
          "X-Authorization": token,
        },
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((responseJson) => {
        this.setState({ arraySearch: responseJson });
      })
      .catch((fault) => {
        console.log(fault);
      });
  };
  //POST friend request

  sendFriendRequest = async () => {
    const token = await AsyncStorage.getItem("@session_token");

    const friendID = this.state.userFriendID;

    return fetch(
      "http://localhost:3333/api/1.0.0/user/" + friendID + "/friends",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      }
    )
      .then((resp) => {
        console.log(resp.status);
        if (resp.status === 201) {
          alert("You have sent a friend request");
        } else {
          alert("Error, please check spacebook server command line");
        }
      })

      .catch((fault) => {
        console.log(fault);
      });
  };

  //POST accept request

  acceptFriendRequest = async (userID) => {
    const token = await AsyncStorage.getItem("@session_token");

    const link = "http://localhost:3333/api/1.0.0/friendrequests/" + userID;

    return fetch(link, {
      method: "post",
      headers: {
        "X-Authorization": token,
      },
    })
      .then(() => {
        this.getRequests();
      })
      .catch((fault) => {
        console.log(fault);
      });
  };

  render() {
    return (
      <View>
        <Text style={styles.border}>Search Spacebook users</Text>
        <TextInput
          style={styles.box}
          placeholder="Search spacebook users here"
          onChangeText={(textSearch) => this.setState({ textSearch })}
        />
        <Text>Friends or All</Text>
        <TextInput
          style={styles.box}
          placeholder="Please 'friends'or 'all'"
          onChangeText={(search_in) => this.setState({ search_in })}
        />
        <Text>Max number of searches</Text>
        <TextInput
          style={styles.box}
          placeholder="Please enter number here"
          onChangeText={(maxSearchLimit) => this.setState({ maxSearchLimit })}
        />
        <Text>number of offset item</Text>
        <TextInput
          style={styles.box}
          placeholder="Please enter number here"
          onChangeText={(offset) => this.setState({ offset })}
        />
        <Button onPress={() => this.getSearchUsers()} title="Find" />
        <FlatList
          data={this.state.arraySearch}
          renderItem={({ item }) => (
            <View>
              <Text>
                ID: {item.user_id}, Name: {item.user_givenname}{" "}
                {item.user_familyname}
              </Text>
            </View>
          )}
        />
        {/* //HERHHEHEHE */}
        <Text style={styles.border}>Send friend request:</Text>
        <TextInput
          onChangeText={(userFriendID) => this.setState({ userFriendID })}
          style={styles.box}
          placeholder="Please enter a user ID"
        />
        <Button
          onPress={() => this.sendFriendRequest()}
          title="Friend request"
        />
        <Text style={styles.border}>Friend list:</Text>
        <FlatList
          data={this.state.friendArray}
          renderItem={({ item }) => (
            <View>
              <Text>
                ID: {item.user_id}, Name: {item.user_givenname}{" "}
                {item.user_familyname}
              </Text>
            </View>
          )}
        />

        <Text style={styles.border}>Outstanding Friend requests:</Text>
        <FlatList
          data={this.state.arrayOfFriendRequests}
          renderItem={({ item }) => (
            <View>
              <Text>
                ID: {item.user_id}, Name: {item.first_name} {item.last_name}
              </Text>
              <Button
                title="Accept Friend Request"
                onPress={() => this.acceptFriendRequest(item.user_id)}
              />
            </View>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  border: { fontSize: 20, marginTop: 5, padding: 4 },
  box: { borderWidth: 2, padding: 5, marginBottom: 2 },
  container: { marginBottom: 8 },
});

export default userFriendPage;
