/**
 * @class Tasks
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

import * as firebase from "firebase";

class Tasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: ""
    };

    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    try {
      let user = await firebase.auth().currentUser;

      this.setState({
        uid: user.uid
      })
    } catch(error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await firebase.auth().signOut();

      this.props.navigator.push({
        name: "Login"
      })
    }
    catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <View>
        <Text>Welcome Home</Text>
        <Text>Hello UserId: {this.state.uid}</Text>
        <Button
          onPress={this.logout}
          title="Logout"
          color="#841584"
          accessibilityLabel="logout"
        />
      </View>
    )
  }
}

export default Tasks;
